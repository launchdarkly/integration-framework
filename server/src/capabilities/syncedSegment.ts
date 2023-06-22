import {
  LaunchDarklyIntegrationsManifest,
  RequestParser,
} from '../../../manifest.schema';
import pointer from 'jsonpointer';
import { AppError, HttpStatus } from '../utils';

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
  batch: SyncedSegmentBatch[];
};

export const handleSyncSegmentRequest = async (
  integrationKey: string,
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
    batch: [],
  };

  const parser = capability.requestParser;

  result.environmentId = getFieldValue<string>(
    body,
    parser.environmentIdPath,
    true
  );

  const cohortId = getFieldValue(body, parser.cohortIdPath, true);
  const cohortName = getFieldValue(body, parser.cohortNamePath, true);
  const cohortUrl = getFieldValue(body, parser.cohortUrlPath, false);

  const batchedRecords: SyncedSegmentBatch[] = [];

  if (parser.memberArrayPath && !parser.arrayInclusion) {
    const memberArray = getFieldValue<any[]>(
      body,
      parser.memberArrayPath,
      true
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
      true
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
    // this is only required if removeMemberArrayPath is specified
    const memberArray = getFieldValue<any[]>(
      body,
      parser.addMemberArrayPath,
      !!parser.removeMemberArrayPath
    );
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
    // this is only required if addMemberArrayPath is specified
    const memberArray = getFieldValue<any[]>(
      body,
      parser.removeMemberArrayPath,
      !!parser.addMemberArrayPath
    );
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

    const memberId = getFieldValue(member, memberParser.memberIdPath, true);
    const cohortIdOverride = getFieldValue(
      member,
      memberParser.cohortIdPath,
      false
    );
    const cohortNameOverride = getFieldValue(
      member,
      memberParser.cohortNamePath,
      false
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
      true
    );
  }

  if (status === MembershipStatus.useInclusionMatcher) {
    const inclusionValue = getFieldValue(
      payload,
      rp.arrayInclusion?.path,
      true
    );
    const inclusionPattern = getFieldValue(
      payload,
      rp.arrayInclusion?.matcher,
      true
    );

    const regex = new RegExp(inclusionPattern);
    return regex.test(inclusionValue);
  }

  throw new AppError(
    HttpStatus.internalError,
    'unknown segment membership status'
  );
};

const getFieldValue = <T = string>(
  payload: any,
  jsonPtr: string | undefined,
  required?: boolean
): T => {
  if (!jsonPtr) {
    return undefined as T;
  }

  const value = pointer.get(payload, jsonPtr);
  if (!value && required) {
    throw new AppError(
      HttpStatus.badRequest,
      `could not find path ${jsonPtr} in request payload`
    );
  }

  return value;
};
