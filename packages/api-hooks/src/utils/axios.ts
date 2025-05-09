import { config } from '@/api-hooks/config/client';
import { CustomAxiosInstance } from '@/api-hooks/config/custom-axios-instance';

export const axios = new CustomAxiosInstance(config.api.baseUrl);
