import { HttpClient, HttpRequestOptions } from '@/common/domain/interfaces';
import { HttpException, NetworkException } from '@/common/domain/exceptions';

export class FetchHttpClient implements HttpClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  }

  private async request<T>(
    method: string,
    path: string,
    options: HttpRequestOptions = {}
  ): Promise<T> {
    const url = this.buildUrl(path, options.params);
    const headers = this.buildHeaders(options.headers, options.body);
    const body = this.buildBody(options.body);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body,
      });

      if (!response.ok) {
        let payload: any;
        try {
          payload = await response.json();
        } catch {
          try {
            payload = await response.text();
          } catch {
            payload = null;
          }
        }

        throw new HttpException(
          response.status,
          response.statusText || `HTTP Request failed with status ${response.status}`,
          payload
        );
      }

      if (response.status === 204) {
        return null as unknown as T;
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return (await response.json()) as T;
      }

      return (await response.text()) as unknown as T;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new NetworkException(
        error instanceof Error ? error.message : 'Unknown network error occurred',
        error
      );
    }
  }

  private buildUrl(path: string, params?: Record<string, string | number | boolean>): string {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const isRelative = !this.baseUrl;

    // new URL() requires an absolute URL; use origin as temporary base for relative mode
    const base = isRelative ? window.location.origin : this.baseUrl;
    const url = new URL(`${base}${cleanPath}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    // Return relative URL when no baseUrl was provided (proxy mode)
    if (isRelative) {
      return `${url.pathname}${url.search}`;
    }

    return url.toString();
  }

  private buildHeaders(customHeaders?: Record<string, string>, body?: any): Headers {
    const headers = new Headers();

    if (body !== undefined) {
      if (body instanceof FormData) {
        // Fetch sets the boundary automatically
      } else if (typeof body === 'object') {
        headers.set('Content-Type', 'application/json');
      }
    }

    headers.set('Accept', 'application/json');

    if (customHeaders) {
      Object.entries(customHeaders).forEach(([key, value]) => {
        headers.set(key, value);
      });
    }

    return headers;
  }

  private buildBody(body?: any): BodyInit | undefined {
    if (body === undefined) {
      return undefined;
    }

    if (
      body instanceof FormData ||
      body instanceof URLSearchParams ||
      body instanceof Blob ||
      body instanceof ArrayBuffer
    ) {
      return body;
    }

    if (typeof body === 'object') {
      return JSON.stringify(body);
    }

    return String(body);
  }

  async get<T>(path: string, options?: HttpRequestOptions): Promise<T> {
    return this.request<T>('GET', path, options);
  }

  async post<T>(path: string, options?: HttpRequestOptions): Promise<T> {
    return this.request<T>('POST', path, options);
  }

  async put<T>(path: string, options?: HttpRequestOptions): Promise<T> {
    return this.request<T>('PUT', path, options);
  }

  async patch<T>(path: string, options?: HttpRequestOptions): Promise<T> {
    return this.request<T>('PATCH', path, options);
  }

  async delete<T>(path: string, options?: HttpRequestOptions): Promise<T> {
    return this.request<T>('DELETE', path, options);
  }
}
