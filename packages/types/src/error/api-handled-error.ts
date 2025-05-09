import { AxiosError } from 'axios';

import { APIErrorCode } from './api-error-codes';
import type { HayesErrorResponse } from './hayes-error-response';
import { HayesErrorResponseSchema } from './hayes-error-response';
import { HayesIrisErrorMappings } from './iris-error-mappings';

export class APIHandledError extends Error {
  public code: APIErrorCode;

  public constructor(message: string, code: APIErrorCode) {
    super(message);
    this.code = code;
  }

  private static mapHayesErrorToAPIError(
    hayesError: HayesErrorResponse
  ): APIHandledError | null {
    const matchingError = HayesIrisErrorMappings.find((mapping) =>
      mapping.condition(hayesError)
    );

    if (matchingError) {
      return new APIHandledError(matchingError.message, matchingError.code);
    }

    return null;
  }

  public static fromAxiosError(error: unknown): APIHandledError {
    if (!(error instanceof AxiosError)) {
      const e = error as Error;
      return new APIHandledError(
        e?.message ?? 'Unknown Error',
        APIErrorCode.UNEXPECTED_ERROR
      );
    }

    const parseHayesError = HayesErrorResponseSchema.safeParse(
      error?.response?.data
    );

    if (parseHayesError.success) {
      const { data: hayesError } = parseHayesError;
      const errorFromIris = this.mapHayesErrorToAPIError(hayesError);

      if (!errorFromIris) {
        return new APIHandledError(hayesError.message, hayesError.error);
      }

      return errorFromIris;
    }

    const errorData = error?.response?.data as HayesErrorResponse | null;
    const errorCode = errorData?.error ?? null;
    const errorMessage = errorData?.message ?? error.message;

    return new APIHandledError(
      `API error code is unknown [${errorCode} | ${errorMessage}]`,
      APIErrorCode.UNEXPECTED_ERROR
    );
  }
}
