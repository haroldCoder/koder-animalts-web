import { useEffect, useMemo, type ReactNode } from 'react'
import { apiClient } from '@/common/infrastructure/http/api-client'
import { HttpException } from '@/common/domain/exceptions'
import type { HttpRequestOptions } from '@/common/domain/interfaces'
import type { VaccinationEntity } from '@/features/vaccination/domain/entities'
import type { PetEntity } from '@/features/pet/domain/entities'
import type { PaginationDto } from '@/common/interfaces'
import {
  makePets,
  makeVaccinations,
  toVaccinationRawResponse,
} from './mocks'

export interface MockVaccinationConfig {
  /** Estado de la consulta de vacunas: éxito con datos, vacío, cargando o error. */
  mode?: 'success' | 'empty' | 'loading' | 'error'
  /** Lista de vacunas devueltas cuando `mode` sea 'success'. */
  vaccinations?: VaccinationEntity[]
  /** Metadatos de paginación opcionales para la tabla. */
  pagination?: Partial<PaginationDto>
  /** Estado de la consulta de mascotas (dueño o veterinario). */
  modePets?: 'success' | 'empty' | 'loading' | 'error'
  /** Mascotas devueltas por la API al consultar pacientes o carrusel. */
  pets?: PetEntity[]
  /** Estado de la consulta de expedientes médicos (para el diálogo de creación). */
  modeMedicalRecords?: 'success' | 'empty' | 'loading' | 'error'
  /** Mensaje de error personalizado para `mode: 'error'`. */
  message?: string
  /** Código de estado HTTP para simular fallos (ej. 500, 404). */
  statusCode?: number
  /** Retardo artificial opcional en milisegundos. */
  delayMs?: number
  /** ID de usuario que `useAuth()` devolverá al leer `localStorage.user`. */
  userId?: string
}

interface MockVaccinationContainerProps {
  config?: MockVaccinationConfig
  children: ReactNode
}

/**
 * Intercepta las llamadas de `apiClient` (`get`, `post`, `put`) relacionadas
 * con el módulo de vacunas, mascotas y expedientes médicos, y configura `localStorage.user`
 * para que los hooks `useAuth()`, `useGetAllVaccinationsQuery`, `useGetPetsByOwnerUserId`,
 * `useGetPetsByVeterinaryUserId`, `useGetMedicalRecordsByUserId`,
 * `useRegisterVaccination` y `useUpdateStatusVaccination` funcionen de manera
 * predecible y sin backend activo.
 *
 * Los mocks se instalan de forma síncrona antes del primer render para evitar race conditions
 * con React Query.
 */
export const MockVaccinationContainer = ({
  config = {},
  children,
}: MockVaccinationContainerProps) => {
  const {
    mode = 'success',
    vaccinations = makeVaccinations(6),
    pagination,
    modePets = 'success',
    pets = makePets(4),
    modeMedicalRecords = 'success',
    message = 'Error en el servicio de vacunación',
    statusCode = 500,
    delayMs,
    userId = 'mock-user-vac-123',
  } = config

  const originals = useMemo(() => {
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

      if (path.includes('/vaccination/user/')) {
        if (mode === 'loading') return new Promise(() => {})
        if (mode === 'error') throw new HttpException(statusCode, message, { message })
        if (mode === 'empty')
          return toVaccinationRawResponse([], pagination) as unknown as T
        return toVaccinationRawResponse(vaccinations, pagination) as unknown as T
      }

      if (path.includes('/vaccination/')) {
        if (mode === 'loading') return new Promise(() => {})
        if (mode === 'error') throw new HttpException(statusCode, message, { message })
        const singleVac = vaccinations[0] ?? makeVaccinations(1)[0]
        return {
          statusCode: 200,
          data: {
            id: singleVac.id,
            vaccineName: singleVac.name,
            dateAdministered:
              singleVac.date instanceof Date
                ? singleVac.date.toISOString()
                : String(singleVac.date),
            nextDueDate: singleVac.nextDate
              ? singleVac.nextDate instanceof Date
                ? singleVac.nextDate.toISOString()
                : String(singleVac.nextDate)
              : '',
            lotNumber: singleVac.lotNumber ?? '',
            status: singleVac.status,
            createdAt: new Date().toISOString(),
            medicalRecordId: singleVac.medicalRecordId,
            petName: singleVac.petName,
          },
        } as unknown as T
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

      if (path.includes('/medical-record/')) {
        if (modeMedicalRecords === 'loading') return new Promise(() => {})
        if (modeMedicalRecords === 'error')
          throw new HttpException(statusCode, 'Error al consultar expedientes médicos', {
            message: 'Error al consultar expedientes médicos',
          })
        if (modeMedicalRecords === 'empty')
          return { statusCode: 200, data: [] } as unknown as T

        const data = pets.slice(0, 3).map((p, idx) => ({
          id: `mr-${idx + 1}`,
          visitDate: new Date(Date.now() - (idx + 1) * 7 * 24 * 60 * 60 * 1000).toISOString(),
          type: 'CONSULTATION',
          reasonForVisit: 'Chequeo preventivo y control de vacunación',
          diagnosis: 'Paciente en óptimas condiciones de salud',
          treatment: 'Continuar con el esquema regular',
          notes: 'Peso adecuado, mucosas rosadas',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          petId: p.id,
          veterinarianId: 'vet-001',
          vaccinations: [],
          pet: {
            id: p.id,
            name: p.name,
            mainImage: p.image,
            owner: {
              id: 'owner-1',
              user: {
                name: 'Laura Gómez',
              },
            },
          },
          veterinarian: {
            id: 'vet-001',
            user: {
              name: 'Dr. Carlos Mendoza',
            },
            clinic: {
              id: 'clinic-1',
              name: 'Clínica Veterinaria Central',
            },
          },
          documentIds: [],
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

      if (path.includes('/vaccination/register')) {
        return {
          statusCode: 201,
          message: 'Vacuna registrada exitosamente',
          data: { id: 'new-vac-id' },
        } as unknown as T
      }

      return originalPost<T>(path, options)
    }

    // ── PUT ──────────────────────────────────────────────────────────────────
    apiClient.put = async <T,>(path: string, options?: HttpRequestOptions): Promise<T> => {
      if (delayMs) {
        await new Promise((resolve) => setTimeout(resolve, delayMs))
      }

      if (path.includes('/vaccination/status/')) {
        return {
          statusCode: 200,
          message: 'Estado de vacuna actualizado exitosamente',
        } as unknown as T
      }

      return originalPut<T>(path, options)
    }

    return { originalGet, originalPost, originalPut, storedUser }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
