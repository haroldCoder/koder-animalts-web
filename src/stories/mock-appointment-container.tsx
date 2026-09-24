import { useEffect, useMemo, type ReactNode } from 'react'
import { apiClient } from '@/common/infrastructure/http/api-client'
import { HttpException } from '@/common/domain/exceptions'
import type { HttpRequestOptions } from '@/common/domain/interfaces'
import type { AppointmentDataDto } from '@/features/appointment/domain/dtos'
import type { PetEntity } from '@/features/pet/domain/entities'
import {
  makePets,
  makeUpcomingAppointments,
  toAppointmentRawResponse,
} from './mocks'

export interface MockAppointmentConfig {
  /** Estado de la consulta de citas: éxito con datos, vacío, cargando o error. */
  mode?: 'success' | 'empty' | 'loading' | 'error'
  /** Citas que responderá la API cuando `mode` sea 'success'. */
  appointments?: AppointmentDataDto[]
  /** Estado de la consulta de mascotas del veterinario (para el selector de agendar). */
  modePets?: 'success' | 'empty' | 'loading' | 'error'
  /** Mascotas devueltas por la API al consultar pacientes. */
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

interface MockAppointmentContainerProps {
  config?: MockAppointmentConfig
  children: ReactNode
}

/**
 * Intercepta las llamadas de `apiClient` (`get`, `post`, `put`) relacionadas
 * con el módulo de citas y mascotas, y configura `localStorage.user` para
 * que los hooks `useAuth()`, `useGetAppointmentsByUserId`, `useGetPetsByVeterinarianClinic`,
 * `useScheduleAppointmentMutation` y `useUpdateAppointmentStatusMutation`
 * funcionen de manera predecible y sin backend activo.
 *
 * Los mocks se instalan de forma **síncrona** antes del primer render para
 * evitar la race condition con React Query, que despacha las queries inmediatamente
 * al montar el componente. El `useEffect` solo se encarga de la limpieza.
 */
export const MockAppointmentContainer = ({
  config = {},
  children,
}: MockAppointmentContainerProps) => {
  const {
    mode = 'success',
    appointments = makeUpcomingAppointments(3),
    modePets = 'success',
    pets = makePets(4),
    message = 'Error en el servicio de citas',
    statusCode = 500,
    delayMs,
    userId = 'mock-user-appt-123',
  } = config

  // Guardamos las referencias originales UNA SOLA VEZ por montaje.
  // useMemo se ejecuta sincrónicamente durante el render, antes de que
  // React Query pueda disparar sus queries.
  const originals = useMemo(() => {
    // Configurar localStorage para que useAuth() no retorne null
    const storedUser = localStorage.getItem('user')
    localStorage.setItem('user', JSON.stringify(userId))

    const originalGet = apiClient.get.bind(apiClient)
    const originalPost = apiClient.post.bind(apiClient)
    const originalPut = apiClient.put.bind(apiClient)

    // ── GET ──────────────────────────────────────────────────────────────────
    apiClient.get = async <T,>(path: string, options?: HttpRequestOptions): Promise<T> => {
      if (delayMs) {
        await new Promise((resolve) => setTimeout(resolve, delayMs))
      }

      if (path.includes('/appointment/user/')) {
        if (mode === 'loading') return new Promise(() => {})
        if (mode === 'error') throw new HttpException(statusCode, message, { message })
        if (mode === 'empty') return toAppointmentRawResponse([]) as unknown as T
        return toAppointmentRawResponse(appointments) as unknown as T
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
          images: [] as string[],
          clinicName: p.clinicName,
        }))
        return { statusCode: 200, data } as unknown as T
      }

      if (path.includes('/medical-record/')) {
        return { statusCode: 200, data: [] } as unknown as T
      }

      return originalGet<T>(path, options)
    }

    // ── POST ─────────────────────────────────────────────────────────────────
    apiClient.post = async <T,>(path: string, options?: HttpRequestOptions): Promise<T> => {
      if (delayMs) {
        await new Promise((resolve) => setTimeout(resolve, delayMs))
      }
      if (path.includes('/appointment/register')) {
        return {
          statusCode: 201,
          message: 'Cita agendada correctamente',
          data: { id: 'new-mock-appt-id' },
        } as unknown as T
      }
      return originalPost<T>(path, options)
    }

    // ── PUT ──────────────────────────────────────────────────────────────────
    apiClient.put = async <T,>(path: string, options?: HttpRequestOptions): Promise<T> => {
      if (delayMs) {
        await new Promise((resolve) => setTimeout(resolve, delayMs))
      }
      if (path.includes('/appointment/')) {
        return {
          statusCode: 200,
          message: 'Estado de cita actualizado correctamente',
        } as unknown as T
      }
      return originalPut<T>(path, options)
    }

    return { originalGet, originalPost, originalPut, storedUser }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // ^ Dependencias vacías intencionadas: los mocks se instalan una vez por
  //   montaje del componente. Cambios en `config` dentro de la misma story
  //   no requieren re-instalar los interceptors.

  // Limpieza al desmontar
  useEffect(() => {
    return () => {
      apiClient.get = originals.originalGet
      apiClient.post = originals.originalPost
      apiClient.put = originals.originalPut

      if (originals.storedUser !== null) {
        localStorage.setItem('user', originals.storedUser)
      } else {
        localStorage.removeItem('user')
      }
    }
  }, [originals])

  return <>{children}</>
}
