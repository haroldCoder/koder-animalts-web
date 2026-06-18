import { FetchHttpClient } from './fetch-http-client';

// En desarrollo usa URL relativa para que el proxy de Vite intercepte las peticiones y evite CORS.
// En producción, define VITE_API_URL con la URL completa del backend.
const API_URL = import.meta.env.VITE_API_URL || '';

export const apiClient = new FetchHttpClient(API_URL);
