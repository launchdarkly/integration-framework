import express from 'express';
import {
  AppError,
  HttpStatus,
  getManifest,
  sendError as sendErrorResponse,
} from './utils';
import { handleSyncSegmentRequest } from './capabilities/syncedSegment';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/v2/segment-targets/:integrationKey', async (req, res) => {
  const key = req.params.integrationKey;

  const body = req.body;
  if (!body) {
    return sendErrorResponse(
      res,
      new AppError(HttpStatus.badRequest, `no json payload found in request`)
    );
  }

  const integration = getManifest(key);
  if (!integration) {
    return sendErrorResponse(
      res,
      new AppError(HttpStatus.notFound, `integration with key ${key} not found`)
    );
  }

  try {
    await handleSyncSegmentRequest(res, key, integration, body);
  } catch (err) {
    const isApiError = !!(err as AppError).status;
    return sendErrorResponse(
      res,
      new AppError(
        (err as AppError).status ?? HttpStatus.internalError,
        (err as AppError).message ?? `error occurred while processing request`,
        isApiError ? undefined : err
      )
    );
  }
});

app.all('*', (_, res) => {
  return sendErrorResponse(res, new AppError(HttpStatus.notFound, `not found`));
});

app.listen(port, () => {
  console.log(`Validation app listening on port ${port}`);
});
