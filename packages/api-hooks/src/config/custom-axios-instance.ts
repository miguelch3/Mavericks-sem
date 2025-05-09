import { useSessionStore } from '@mavericks/store';
import { APIHandledError } from '@mavericks/types';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { APIEndpoints } from '@/api-hooks/utils/endpoints';

type RequestParams<T = unknown> = {
  url: string;
  urlParams?: Record<string, string>;
  payload?: T;
  config?: AxiosRequestConfig;
};

export class CustomAxiosInstance {
  private axios: AxiosInstance;

  private baseUrl: string;

  private customHeaders?: Record<string, string>;

  public constructor(baseUrl: string, customHeaders?: Record<string, string>) {
    this.baseUrl = baseUrl;
    this.customHeaders = customHeaders;

    this.axios = this.createAxiosInstance();
  }

  private createAxiosInstance(): AxiosInstance {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...this.customHeaders,
    };

    return axios.create({
      baseURL: this.baseUrl,
      headers,
    });
  }

  private static replaceUrlParams(
    url: string,
    params: Record<string, string>
  ): string {
    let newUrl = url;

    Object.keys(params).forEach((key) => {
      const param = params[key];
      if (!param) {
        throw new Error(`URL Constructor: No value was given for ${key}`);
      }
      newUrl = newUrl.replace(`:${key}`, param);
    });
    return newUrl;
  }

  private async executeRequest<T>(
    method: 'get' | 'post' | 'patch' | 'put' | 'delete',
    { url, urlParams, payload, config }: RequestParams
  ): Promise<T> {
    // Interpolate URL with urlParams
    const interpolatedUrl = CustomAxiosInstance.replaceUrlParams(
      url,
      urlParams ?? {}
    );

    // Token
    const { token } = useSessionStore.getState();

    // Request
    try {
      const response = await this.axios.request<T>({
        method,
        url: interpolatedUrl,
        data: payload,
        headers: {
          ...this.customHeaders,
          ...config?.headers,
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        ...config,
      });
      return response.data;
    } catch (error) {
      throw APIHandledError.fromAxiosError(error);
    }
  }

  public async get<T>(params: RequestParams): Promise<T> {
    return this.executeRequest<T>('get', params);
  }

  public async post<T>(params: RequestParams): Promise<T> {
    return this.executeRequest<T>('post', params);
  }

  public async patch<T>(params: RequestParams): Promise<T> {
    return this.executeRequest<T>('patch', params);
  }

  public async put<T>(params: RequestParams): Promise<T> {
    return this.executeRequest<T>('put', params);
  }

  public async delete<T>(params: RequestParams): Promise<T> {
    return this.executeRequest<T>('delete', params);
  }

  public patchIrisData<T>(
    params: Pick<RequestParams, 'payload' | 'config'>
  ): Promise<T> {
    try {
      const { leadId } = useSessionStore.getState();
      const url = CustomAxiosInstance.replaceUrlParams(
        APIEndpoints.PATCH_LEAD_INFORMATION,
        { leadId }
      );

      const { payload, config } = params;

      return this.executeRequest<T>('patch', {
        url,
        urlParams: { leadId },
        payload,
        config,
      });
    } catch (error) {
      throw APIHandledError.fromAxiosError(error);
    }
  }

  public setCustomHeaders(customHeaders: Record<string, string>): void {
    this.customHeaders = customHeaders;
  }
}
