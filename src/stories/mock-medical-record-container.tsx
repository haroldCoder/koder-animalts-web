import { useEffect, useMemo, type ReactNode } from 'react'
import { apiClient } from '@/common/infrastructure/http/api-client'
import { HttpException } from '@/common/domain/exceptions'
import type { HttpRequestOptions } from '@/common/domain/interfaces'
import type { MedicalRecordEntity } from '@/features/medical-record/domain/entities'
import type { PetEntity } from '@/features/pet/domain/entities'
import {
  makeMedicalRecords,
  makePets,
  toMedicalRecordRawResponse,
} from './mocks'

export interface MockMedicalRecordConfig {
  /** Estado de la consulta de expedientes: éxito con datos, vacío, cargando o error. */
  mode?: 'success' | 'empty' | 'loading' | 'error'
  /** Lista de expedientes clínicos devueltos cuando `mode` sea 'success'. */
  records?: MedicalRecordEntity[]
  /** Estado de la consulta de mascotas del usuario/clínica. */
  modePets?: 'success' | 'empty' | 'loading' | 'error'
  /** Mascotas devueltas por la API al consultar pacientes para los filtros y selector. */
  pets?: PetEntity[]
  /** Mensaje de error personalizado para `mode: 'error'`. */
  message?: string
  /** Código de estado HTTP para simular fallos (ej. 500, 404). */
  statusCode?: number
  /** Retardo artificial opcional en milisegundos. */
  delayMs?: number
  /** ID de usuario que `useAuth()` devolverá al leer `localStorage.user`. */
  userId?: string
}

interface MockMedicalRecordContainerProps {
  config?: MockMedicalRecordConfig
  children: ReactNode
}

/**
 * Intercepta las llamadas de `apiClient` (`get`, `post`) relacionadas
 * con el módulo de expediente médico y mascotas, e inicializa `localStorage.user`
 * para que los componentes y vistas (`MedicalRecordView`, `ScheduleMedicalRecord`,
 * `MedicalRecordCardToggle`, `UploadDocuments`) funcionen sin backend activo.
 */
export const MockMedicalRecordContainer = ({
  config = {},
  children,
}: MockMedicalRecordContainerProps) => {
  const {
    mode = 'success',
    records = makeMedicalRecords(4),
    modePets = 'success',
    pets = makePets(4),
    message = 'Error en el servicio de expedientes médicos',
    statusCode = 500,
    delayMs,
    userId = 'mock-user-mr-123',
  } = config

  const originals = useMemo(() => {
    const storedUser = localStorage.getItem('user')
    localStorage.setItem('user', JSON.stringify(userId))

    const originalGet = apiClient.get.bind(apiClient)
    const originalPost = apiClient.post.bind(apiClient)

    // ── GET ──────────────────────────────────────────────────────────────────
    apiClient.get = async <T,>(path: string, options?: HttpRequestOptions): Promise<T> => {
      if (delayMs) {
        await new Promise((resolve) => setTimeout(resolve, delayMs))
      }

      if (path.includes('/medical-record/')) {
        if (mode === 'loading') return new Promise(() => {})
        if (mode === 'error') throw new HttpException(statusCode, message, { message })
        if (mode === 'empty') return toMedicalRecordRawResponse([]) as unknown as T
        return toMedicalRecordRawResponse(records) as unknown as T
      }

      if (path.includes('/pet/')) {
        if (modePets === 'loading') return new Promise(() => {})
        if (modePets === 'error')
          throw new HttpException(statusCode, 'Error al consultar mascotas', {
            message: 'Error al consultar mascotas',
          })
        if (modePets === 'empty') return { statusCode: 200, data: [] } as unknown as T

        const data = pets.map((p) => ({
          id: p.id,
          name: p.name,
          birthDate:
            p.birthdate instanceof Date ? p.birthdate.toISOString() : String(p.birthdate),
          mainImage: p.image,
          breed: p.breed,
          isActive: p.isActive,
          species: p.species,
          weight: p.weight,
          microchip: p.microchip,
          color: p.color,
          iaImage: p.iaImage,
          images: p.images ?? [],
          clinicName: p.clinicName,
        }))
        return { statusCode: 200, data } as unknown as T
      }

      return originalGet<T>(path, options)
    }

    // ── POST ─────────────────────────────────────────────────────────────────
    apiClient.post = async <T,>(path: string, options?: HttpRequestOptions): Promise<T> => {
      if (delayMs) {
        await new Promise((resolve) => setTimeout(resolve, delayMs))
      }

      if (path.includes('/medical-record/register')) {
        return {
          statusCode: 201,
          message: 'Expediente médico registrado con éxito',
          data: { id: 'new-mr-id' },
        } as unknown as T
      }

      if (path.includes('/medical-record/upload') || path.includes('/upload')) {
        return {
          statusCode: 200,
          message: 'Documentos subidos con éxito',
        } as unknown as T
      }

      return originalPost<T>(path, options)
    }

    return { originalGet, originalPost, storedUser }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    return () => {
      apiClient.get = originals.originalGet
      apiClient.post = originals.originalPost

      if (originals.storedUser !== null) {
        localStorage.setItem('user', originals.storedUser)
      } else {
        localStorage.removeItem('user')
      }
    }
  }, [originals])

  return <>{children}</>
}
