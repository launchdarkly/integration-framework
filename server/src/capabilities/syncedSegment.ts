import {
  LaunchDarklyIntegrationsManifest,
  RequestParser,
} from '../../../manifest.schema';
import pointer from 'jsonpointer';
import { AppError, HttpStatus, createLogger } from '../utils';
import { Response } from 'express';
import HandleBars from 'handlebars';

const logger = createLogger('synced-segment');

enum ContextKind {
  User = 'user',
}

enum MembershipStatus {
  include = 'include',
  exclude = 'exclude',
  useBooleanFlag = 'useBooleanFlag',
  useInclusionMatcher = 'userInclusionMatcher',
}

export type SyncedSegmentBatch = {
  userId: string;
  cohortName: string;
  cohortId: string;
  cohortUrl?: string;
  value: boolean;
};

export type SyncedSegment = {
  environmentId: string;
  contextKind: string;
  batch: SyncedSegmentBatch[];
};

export type SyncedSegmentResponseContext = {
  requestBody: string;
  statusCode: number;
  errorMessage: string;
  projectKey: string;
  environmentKey: string;
  segmentKey: string;
  segmentUrl: string;
};

/**
 * Handles parsing a synced segment request for the specified integration key
 *
 * @param res Express.Response
 * @param integrationKey string
 * @param manifest LaunchDarklyIntegrationsManifest
 * @param body Object
 */
export const handleSyncSegmentRequest = async (
  res: Response,
  integrationKey: string,
  manifest: LaunchDarklyIntegrationsManifest,
  body: any
) => {
  try {
    const parsedSegment = await parseSyncSegmentRequest(manifest, body);

    const parsedSegKey = `${integrationKey}-${parsedSegment.batch[0]?.cohortId}`;
    const respContext = createResponseContext(
      body,
      200,
      parsedSegment.environmentId,
      parsedSegKey
    );

    logger.log(`\nNew Segment Key: ${parsedSegKey}`);
    logger.log(
      `Request Parser Result: ${JSON.stringify(parsedSegment, null, 2)}`
    );

    const jsonRes = parseJsonResponseBody(respContext, manifest);
    res.status(respContext.statusCode).json(jsonRes);
  } catch (err) {
    if (!(err instanceof AppError)) {
      logger.log(err);
    }

    const respContext = createResponseContext(
      body,
      (err as AppError).status || 500,
      '',
      '',
      (err as AppError).message
    );
    const jsonRes = parseJsonResponseBody(respContext, manifest);
    res.status(respContext.statusCode).json(jsonRes);
  }
};

/**
 * Create response context to be used by handlebar to generate the response body defined in the integration manifest
 * @param body
 * @param statusCode
 * @param envKey
 * @param segKey
 * @param error
 * @returns
 */
const createResponseContext = (
  body: any,
  statusCode: number,
  envKey: string,
  segKey: string,
  error?: string
) => ({
  requestBody: body,
  statusCode,
  errorMessage: error || '',
  projectKey: 'default',
  environmentKey: envKey,
  segmentKey: segKey,
  segmentUrl: `https://app.launchdarkly.com/default/production/segments/${segKey}/targeting`,
});

/**
 * Parse the response body defined in the manifest
 * @param ctx
 * @param manifest
 * @returns
 */
const parseJsonResponseBody = (
  ctx: SyncedSegmentResponseContext,
  manifest: LaunchDarklyIntegrationsManifest
) => {
  const responseTemplate =
    manifest.capabilities?.syncedSegment?.jsonResponseBody;
  if (!responseTemplate) {
    return undefined;
  }

  const template = HandleBars.compile(responseTemplate);
  return JSON.parse(template(ctx));
};

/**
 * Parse the request path definitions from the manifest
 * @param manifest
 * @param body
 * @returns
 */
const parseSyncSegmentRequest = async (
  manifest: LaunchDarklyIntegrationsManifest,
  body: any
): Promise<SyncedSegment> => {
  const capability = manifest.capabilities?.syncedSegment;
  if (!capability) {
    throw new AppError(
      HttpStatus.badRequest,
      'integration does not support synced segment capability'
    );
  }

  if (!capability.requestParser) {
    throw new AppError(
      HttpStatus.badRequest,
      'integration is missing the required requestParser property'
    );
  }

  const result: SyncedSegment = {
    environmentId: '',
    contextKind: ContextKind.User,
    batch: [],
  };

  const parser = capability.requestParser;

  result.environmentId = getFieldValue<string>(
    body,
    parser.environmentIdPath,
    true,
    'environmentIdPath'
  );

  const contextKind = getFieldValue<string>(
    body,
    parser.contextKindPath,
    false,
    'contextKindPath'
  );
  if (contextKind) {
    result.contextKind = contextKind;
  }

  const cohortId = getFieldValue(
    body,
    parser.cohortIdPath,
    true,
    'cohordIdPath'
  );
  const cohortName = getFieldValue(
    body,
    parser.cohortNamePath,
    true,
    'cohortNamePath'
  );
  const cohortUrl = getFieldValue(
    body,
    parser.cohortUrlPath,
    false,
    'cohortUrlPath'
  );

  const batchedRecords: SyncedSegmentBatch[] = [];

  if (parser.memberArrayPath && !parser.arrayInclusion) {
    const memberArray = getFieldValue<any[]>(
      body,
      parser.memberArrayPath,
      true,
      'memberArrayPath'
    );
    const memberArrayBatch = parseBatchArray({
      memberArray,
      parser,
      cohortId,
      cohortName,
      cohortUrl,
      status: MembershipStatus.useBooleanFlag,
    });
    batchedRecords.push(...memberArrayBatch);
  }

  if (parser.arrayInclusion) {
    const memberArray = getFieldValue<any[]>(
      body,
      parser.memberArrayPath,
      true,
      'memberArrayPath'
    );
    const shouldInclude = getArrayMembershipStatus(
      parser,
      body,
      MembershipStatus.useInclusionMatcher
    );
    const memberArrayBatch = parseBatchArray({
      memberArray,
      parser,
      cohortId,
      cohortName,
      cohortUrl,
      status: shouldInclude
        ? MembershipStatus.include
        : MembershipStatus.exclude,
    });
    batchedRecords.push(...memberArrayBatch);
  }

  if (parser.addMemberArrayPath) {
    const memberArray =
      getFieldValue<any[]>(
        body,
        parser.addMemberArrayPath,
        false,
        'addMemberArrayPath'
      ) ?? [];
    const memberArrayBatch = parseBatchArray({
      memberArray,
      parser,
      cohortId,
      cohortName,
      cohortUrl,
      status: MembershipStatus.include,
    });
    batchedRecords.push(...memberArrayBatch);
  }

  if (parser.removeMemberArrayPath) {
    const memberArray =
      getFieldValue<any[]>(
        body,
        parser.removeMemberArrayPath,
        false,
        'removeMemberArrayPath'
      ) ?? [];
    const memberArrayBatch = parseBatchArray({
      memberArray,
      parser,
      cohortId,
      cohortName,
      cohortUrl,
      status: MembershipStatus.exclude,
    });
    batchedRecords.push(...memberArrayBatch);
  }

  result.batch = batchedRecords;

  return result;
};

type ParseArryParams = {
  memberArray: any[];
  parser: RequestParser;
  cohortId: string;
  cohortName: string;
  cohortUrl: string;
  status: MembershipStatus;
};
const parseBatchArray = (params: ParseArryParams): SyncedSegmentBatch[] => {
  const batch: SyncedSegmentBatch[] = [];

  if (!params.parser.memberArrayParser) {
    throw new AppError(
      HttpStatus.badRequest,
      `could not find memberArrayParser in the integration's synced segment manifest capability`
    );
  }

  if (!Array.isArray(params.memberArray)) {
    throw new AppError(
      HttpStatus.badRequest,
      `parsed value for member array is not an array`
    );
  }

  const memberParser = params.parser.memberArrayParser;
  for (const member of params.memberArray) {
    const membershipStatus = getArrayMembershipStatus(
      params.parser,
      member,
      params.status
    );

    const memberId = getFieldValue(member, memberParser.memberIdPath, true, "memberIdPath");
    const cohortIdOverride = getFieldValue(
      member,
      memberParser.cohortIdPath,
      false,
      "cohortIdPath"
    );
    const cohortNameOverride = getFieldValue(
      member,
      memberParser.cohortNamePath,
      false,
      "cohortNamePath"
    );

    const record: SyncedSegmentBatch = {
      userId: memberId,
      cohortId: cohortIdOverride ? cohortIdOverride : params.cohortId,
      cohortName: cohortNameOverride ? cohortNameOverride : params.cohortName,
      cohortUrl: params.cohortUrl,
      value: membershipStatus,
    };

    batch.push(record);
  }

  return batch;
};

const getArrayMembershipStatus = (
  rp: RequestParser,
  payload: any,
  status: MembershipStatus
): boolean => {
  if (status === MembershipStatus.include) {
    return true;
  }

  if (status === MembershipStatus.exclude) {
    return false;
  }

  if (status === MembershipStatus.useBooleanFlag) {
    return getFieldValue<boolean>(
      payload,
      rp.memberArrayParser.booleanMembershipPath,
      true,
      "booleanMembershipPath"
    );
  }

  if (status === MembershipStatus.useInclusionMatcher) {
    const inclusionValue = getFieldValue(
      payload,
      rp.arrayInclusion?.path,
      true,
      "arrayInclusionPath.path"
    );
    const regex = new RegExp(rp.arrayInclusion?.matcher || '');
    return regex.test(inclusionValue);
  }

  throw new AppError(
    HttpStatus.internalError,
    'unknown segment membership status'
  );
};

/**
 * Returns the value of the json pointer from the payload
 * @param payload
 * @param jsonPtr
 * @param required
 * @param fieldName
 * @returns
 */
const getFieldValue = <T = string>(
  payload: any,
  jsonPtr: string | undefined,
  required?: boolean,
  fieldName?: string
): T => {
  if (!jsonPtr) {
    return undefined as T;
  }

  logger.log(`Processing ptr: '${jsonPtr}' ${fieldName ? `for manifest field: '${fieldName}'` : ''}`);

  const value = pointer.get(payload, jsonPtr);
  if (!value && required) {
    throw new AppError(
      HttpStatus.badRequest,
      `could not find path ${jsonPtr} in request payload`
    );
  }

  return value;
};
