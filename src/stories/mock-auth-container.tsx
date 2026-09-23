import { useEffect, type ReactNode } from 'react'
import { apiClient } from '@/common/infrastructure/http/api-client'
import { HttpException } from '@/common/domain/exceptions'

export interface MockAuthConfig {
  mode: 'success' | 'error' | 'pending'
  message?: string
  statusCode?: number
  delayMs?: number
}

interface MockAuthContainerProps {
  config: MockAuthConfig
  children: ReactNode
}

/**
 * Contenedor que intercepta apiClient.post durante el ciclo de vida
 * de la story y restaura la función original al desmontarse.
 */
export const MockAuthContainer = ({ config, children }: MockAuthContainerProps) => {
  const { mode, message, statusCode, delayMs } = config

  useEffect(() => {
    const originalPost = apiClient.post.bind(apiClient)

    if (mode === 'pending') {
      apiClient.post = () => new Promise(() => {})
    } else if (mode === 'error') {
      apiClient.post = async () => {
        if (delayMs) {
          await new Promise((resolve) => setTimeout(resolve, delayMs))
        }
        throw new HttpException(
          statusCode ?? 400,
          'Error simulado',
          { message: message ?? 'Error en la petición de autenticación' }
        )
      }
    } else if (mode === 'success') {
      apiClient.post = async <T,>() => {
        if (delayMs) {
          await new Promise((resolve) => setTimeout(resolve, delayMs))
        }
        return {
          statusCode: 200,
          message: 'OK',
          data: 'mock-jwt-token-session',
        } as unknown as T
      }
    }

    return () => {
      apiClient.post = originalPost
    }
  }, [mode, message, statusCode, delayMs])

  return <>{children}</>
}
