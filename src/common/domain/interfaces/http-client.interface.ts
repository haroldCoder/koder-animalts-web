export interface HttpRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  body?: any;
}

export interface HttpClient {
  get<T>(path: string, options?: HttpRequestOptions): Promise<T>;
  post<T>(path: string, options?: HttpRequestOptions): Promise<T>;
  put<T>(path: string, options?: HttpRequestOptions): Promise<T>;
  patch<T>(path: string, options?: HttpRequestOptions): Promise<T>;
  delete<T>(path: string, options?: HttpRequestOptions): Promise<T>;
}
