import { APIErrorCode } from './api-error-codes';
import type { HayesErrorResponse } from './hayes-error-response';

type HayesIrisErrorMapping = {
  condition: (error: HayesErrorResponse) => boolean;
  message: string;
  code: APIErrorCode;
};

export const HayesIrisErrorMappings: HayesIrisErrorMapping[] = [
  {
    condition: (error: HayesErrorResponse) => error.statusCode === 500,
    message: 'Internal Server Error',
    code: APIErrorCode.INTERNAL_SERVER_ERROR,
  },
  {
    condition: (error: HayesErrorResponse) =>
      error.message.includes('Invalid Phone Number'),
    message: 'Invalid Phone Number',
    code: APIErrorCode.INVALID_PHONE_NUMBER,
  },
  {
    condition: (error: HayesErrorResponse) =>
      error.message.includes('Invalid ABA number'),
    message: 'Invalid ABA number',
    code: APIErrorCode.INVALID_ABA_NUMBER,
  },
];
