import { APIErrorCode } from './api-error-codes';
import { APIHandledError } from './api-handled-error';

type ErrorType = 'info' | 'error' | 'warning';
export class ClientFormError {
  public code?: APIErrorCode;

  public type?: ErrorType;

  public params?: Record<string, string | number>;

  public constructor(
    code?: APIErrorCode,
    type?: ErrorType,
    params?: Record<string, string | number>
  ) {
    this.code = code;
    this.params = params;
    this.type = type || 'error';
  }

  public static fromAPIHandledError(error: unknown): ClientFormError {
    if (!(error instanceof APIHandledError)) {
      return new ClientFormError(APIErrorCode.UNEXPECTED_ERROR);
    }

    return new ClientFormError(error.code);
  }

  public get isValid(): boolean {
    return !!this.code;
  }
}
