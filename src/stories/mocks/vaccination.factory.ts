import type { VaccinationEntity } from '@/features/vaccination/domain/entities'
import { VaccinationStatus } from '@/features/vaccination/domain/enums'
import type { ResponseVaccinationsDto } from '@/features/vaccination/infrastructure/dtos'
import type { PaginationDto } from '@/common/interfaces'

interface VaccinationFixture {
  name: string
  petName: string
  lotNumber: string
  status: VaccinationStatus
  daysOffset: number
  nextDaysOffset?: number
}

const VACCINATION_FIXTURES: VaccinationFixture[] = [
  {
    name: 'Rabia (Rabisin)',
    petName: 'Max',
    lotNumber: 'LOT-9042-XB',
    status: VaccinationStatus.DONE,
    daysOffset: -120,
    nextDaysOffset: 245,
  },
  {
    name: 'Séxtuple Canina (DHPPi/L)',
    petName: 'Toby',
    lotNumber: 'LOT-8821-CV',
    status: VaccinationStatus.DONE,
    daysOffset: -30,
    nextDaysOffset: 335,
  },
  {
    name: 'Triple Felina (FVRCP)',
    petName: 'Luna',
    lotNumber: 'LOT-7341-MK',
    status: VaccinationStatus.PENDING,
    daysOffset: 5,
    nextDaysOffset: 370,
  },
  {
    name: 'Leucemia Felina (FeLV)',
    petName: 'Sasha',
    lotNumber: 'LOT-5120-QZ',
    status: VaccinationStatus.DONE,
    daysOffset: -60,
    nextDaysOffset: 305,
  },
  {
    name: 'Tos de las Perreras (Bordetella KC)',
    petName: 'Simba',
    lotNumber: 'LOT-4490-PL',
    status: VaccinationStatus.PENDING,
    daysOffset: 12,
    nextDaysOffset: 377,
  },
  {
    name: 'Parvovirus Canino Monovalente',
    petName: 'Zeus',
    lotNumber: 'LOT-6019-RT',
    status: VaccinationStatus.DONE,
    daysOffset: -15,
    nextDaysOffset: 165,
  },
  {
    name: 'GiardiaVax Preventiva',
    petName: 'Rocky',
    lotNumber: 'LOT-3312-GH',
    status: VaccinationStatus.CANCELLED,
    daysOffset: -10,
    nextDaysOffset: 355,
  },
  {
    name: 'Coronavirus Canino',
    petName: 'Bruno',
    lotNumber: 'LOT-2299-TY',
    status: VaccinationStatus.PENDING,
    daysOffset: 20,
    nextDaysOffset: 385,
  },
]

/**
 * Crea una vacuna con datos realistas coherentes con el dominio.
 */
export const makeVaccination = (
  overrides: Partial<VaccinationEntity> = {},
  index = 0
): VaccinationEntity => {
  const fixture = VACCINATION_FIXTURES[index % VACCINATION_FIXTURES.length]
  const date = new Date()
  date.setDate(date.getDate() + fixture.daysOffset)
  date.setHours(9 + (index % 5), (index % 2) * 30, 0, 0)

  let nextDate: Date | undefined
  if (fixture.nextDaysOffset !== undefined) {
    nextDate = new Date()
    nextDate.setDate(nextDate.getDate() + fixture.nextDaysOffset)
    nextDate.setHours(10, 0, 0, 0)
  }

  return {
    id: `vac-${index + 1}`,
    name: fixture.name,
    date: date.toISOString(),
    nextDate: nextDate ? nextDate.toISOString() : undefined,
    lotNumber: fixture.lotNumber,
    status: fixture.status,
    petName: fixture.petName,
    medicalRecordId: `med-rec-${index + 1}`,
    ...overrides,
  }
}

/**
 * Lista de vacunas generadas con IDs estables.
 */
export const makeVaccinations = (
  count = 6,
  overrides: Partial<VaccinationEntity> = {}
): VaccinationEntity[] =>
  Array.from({ length: count }, (_, index) => makeVaccination(overrides, index))

/**
 * Vacunas pendientes (por aplicar o programadas).
 */
export const makePendingVaccinations = (count = 3): VaccinationEntity[] => {
  return [
    makeVaccination(
      {
        id: 'vac-pending-1',
        name: 'Triple Felina (FVRCP)',
        petName: 'Luna',
        status: VaccinationStatus.PENDING,
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      2
    ),
    makeVaccination(
      {
        id: 'vac-pending-2',
        name: 'Tos de las Perreras (Bordetella KC)',
        petName: 'Simba',
        status: VaccinationStatus.PENDING,
        date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      },
      4
    ),
    makeVaccination(
      {
        id: 'vac-pending-3',
        name: 'Coronavirus Canino',
        petName: 'Bruno',
        status: VaccinationStatus.PENDING,
        date: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
      },
      7
    ),
  ].slice(0, count)
}

/**
 * Vacunas aplicadas con éxito (`DONE`).
 */
export const makeDoneVaccinations = (count = 3): VaccinationEntity[] => {
  return [
    makeVaccination(
      {
        id: 'vac-done-1',
        name: 'Rabia (Rabisin)',
        petName: 'Max',
        status: VaccinationStatus.DONE,
        date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      },
      0
    ),
    makeVaccination(
      {
        id: 'vac-done-2',
        name: 'Séxtuple Canina (DHPPi/L)',
        petName: 'Toby',
        status: VaccinationStatus.DONE,
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
      1
    ),
    makeVaccination(
      {
        id: 'vac-done-3',
        name: 'Leucemia Felina (FeLV)',
        petName: 'Sasha',
        status: VaccinationStatus.DONE,
        date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      },
      3
    ),
  ].slice(0, count)
}

/**
 * Vacunas canceladas.
 */
export const makeCancelledVaccinations = (count = 2): VaccinationEntity[] => {
  return [
    makeVaccination(
      {
        id: 'vac-cancelled-1',
        name: 'GiardiaVax Preventiva',
        petName: 'Rocky',
        status: VaccinationStatus.CANCELLED,
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      6
    ),
    makeVaccination(
      {
        id: 'vac-cancelled-2',
        name: 'Refuerzo Quíntuple Felina',
        petName: 'Kira',
        status: VaccinationStatus.CANCELLED,
        date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      },
      7
    ),
  ].slice(0, count)
}

/**
 * Convierte un arreglo de `VaccinationEntity` a la estructura de respuesta cruda
 * devuelta por el endpoint `/vaccination/user/:userId` (`ResponseVaccinationsDto`).
 */
export const toVaccinationRawResponse = (
  vaccinations: VaccinationEntity[],
  paginationOverrides: Partial<PaginationDto> = {}
): ResponseVaccinationsDto => {
  const total = paginationOverrides.total ?? vaccinations.length
  const page = paginationOverrides.page ?? 1
  const limit = paginationOverrides.limit ?? 6
  const totalPages = paginationOverrides.totalPages ?? Math.ceil(total / limit)

  return {
    statusCode: 200,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
      ...paginationOverrides,
    },
    data: vaccinations.map((v, i) => ({
      id: v.id || `vac-${i + 1}`,
      vaccineName: v.name,
      dateAdministered: v.date instanceof Date ? v.date.toISOString() : String(v.date),
      nextDueDate: v.nextDate
        ? v.nextDate instanceof Date
          ? v.nextDate.toISOString()
          : String(v.nextDate)
        : '',
      lotNumber: v.lotNumber ?? '',
      status: v.status,
      createdAt: new Date().toISOString(),
      medicalRecordId: v.medicalRecordId || `mr-${i + 1}`,
      medicalRecord: {
        pet: {
          name: v.petName,
        },
      },
      veterinarian: {
        id: 'vet-001',
        name: 'Dr. Carlos Mendoza',
      },
    })),
  }
}
