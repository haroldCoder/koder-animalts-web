import type { AppointmentDataDto } from '@/features/appointment/domain/dtos'
import { AppointmentStatusEnum } from '@/features/appointment/domain/enums'
import { PET_PHOTOS } from './pet.factory'

interface AppointmentFixture {
  reason: string
  notes?: string
  petName: string
  petPhoto: string
  veterinarianName: string
  clinicName: string
  ownerName: string
  status: AppointmentStatusEnum
  daysOffset: number
}

const APPOINTMENT_FIXTURES: AppointmentFixture[] = [
  {
    reason: 'Consulta de control dermatológico y vacunación anual',
    notes: 'Paciente alerta y responsivo. Se administra refuerzo de vacuna séxtuple.',
    petName: 'Max',
    petPhoto: PET_PHOTOS.beagle,
    veterinarianName: 'Dr. Carlos Mendoza',
    clinicName: 'Clínica Veterinaria Central',
    ownerName: 'Laura Gómez',
    status: AppointmentStatusEnum.SCHEDULED,
    daysOffset: 2,
  },
  {
    reason: 'Vacunación séxtuple y desparasitación interna preventiva',
    notes: 'Aplicación de pastilla antiparasitaria oral, buen peso corporal.',
    petName: 'Luna',
    petPhoto: PET_PHOTOS.catBicolor,
    veterinarianName: 'Dr. Carlos Mendoza',
    clinicName: 'Clínica Veterinaria Central',
    ownerName: 'Laura Gómez',
    status: AppointmentStatusEnum.SCHEDULED,
    daysOffset: 5,
  },
  {
    reason: 'Revisión posquirúrgica de esterilización y retiro de puntos',
    notes: 'Cicatrización limpia sin signos de inflamación ni exudado. Alta médica otorgada.',
    petName: 'Toby',
    petPhoto: PET_PHOTOS.golden,
    veterinarianName: 'Dr. Carlos Mendoza',
    clinicName: 'Clínica Veterinaria Central',
    ownerName: 'Laura Gómez',
    status: AppointmentStatusEnum.COMPLETED,
    daysOffset: -3,
  },
  {
    reason: 'Limpieza dental profunda por profilaxis ultrasónica',
    notes: 'Profilaxis completada bajo sedación sin incidencias. Encías sanas.',
    petName: 'Rocky',
    petPhoto: PET_PHOTOS.frenchBulldog,
    veterinarianName: 'Dr. Carlos Mendoza',
    clinicName: 'Clínica Veterinaria Central',
    ownerName: 'Laura Gómez',
    status: AppointmentStatusEnum.COMPLETED,
    daysOffset: -10,
  },
  {
    reason: 'Evaluación ortopédica por claudicación en miembro posterior derecho',
    notes: 'Cita cancelada por el tutor debido a mejoría espontánea.',
    petName: 'Simba',
    petPhoto: PET_PHOTOS.borderCollie,
    veterinarianName: 'Dr. Carlos Mendoza',
    clinicName: 'Clínica Veterinaria Central',
    ownerName: 'Laura Gómez',
    status: AppointmentStatusEnum.CANCELLED,
    daysOffset: -5,
  },
  {
    reason: 'Control pediátrico de cachorro y plan nutricional',
    notes: 'Cachorro en óptimo estado de crecimiento, peso en curva adecuada.',
    petName: 'Zeus',
    petPhoto: PET_PHOTOS.goldenPuppy,
    veterinarianName: 'Dr. Carlos Mendoza',
    clinicName: 'Clínica Veterinaria Central',
    ownerName: 'Laura Gómez',
    status: AppointmentStatusEnum.SCHEDULED,
    daysOffset: 8,
  },
]

/**
 * Crea una cita con datos realistas y coherentes (nombre de mascota, foto, veterinario, etc.).
 */
export const makeAppointment = (
  overrides: Partial<AppointmentDataDto> = {},
  index = 0
): AppointmentDataDto => {
  const fixture = APPOINTMENT_FIXTURES[index % APPOINTMENT_FIXTURES.length]
  const date = new Date()
  date.setDate(date.getDate() + fixture.daysOffset)
  date.setHours(10 + (index % 6), (index % 2) * 30, 0, 0)

  return {
    id: `appt-${index + 1}`,
    date,
    reason: fixture.reason,
    notes: fixture.notes,
    petId: `pet-${index + 1}`,
    veterinarianId: 'vet-001',
    status: fixture.status,
    petName: fixture.petName,
    veterinarianName: fixture.veterinarianName,
    clinicName: fixture.clinicName,
    ownerName: fixture.ownerName,
    petPhoto: fixture.petPhoto,
    ...overrides,
  }
}

/**
 * Lista de citas con IDs estables.
 */
export const makeAppointments = (
  count = 3,
  overrides: Partial<AppointmentDataDto> = {}
): AppointmentDataDto[] =>
  Array.from({ length: count }, (_, index) => makeAppointment(overrides, index))

/**
 * Citas pasadas (historial): estados COMPLETED y CANCELLED con fechas anteriores a hoy.
 */
export const makePastAppointments = (count = 3): AppointmentDataDto[] => {
  return [
    makeAppointment(
      {
        id: 'appt-past-1',
        status: AppointmentStatusEnum.COMPLETED,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        reason: 'Revisión posquirúrgica y retiro de suturas',
        notes: 'Cicatrización limpia sin complicaciones. Paciente dado de alta.',
      },
      2
    ),
    makeAppointment(
      {
        id: 'appt-past-2',
        status: AppointmentStatusEnum.CANCELLED,
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        reason: 'Consulta médica general por estornudos leves',
        notes: 'Cancelada por el propietario.',
      },
      4
    ),
    makeAppointment(
      {
        id: 'appt-past-3',
        status: AppointmentStatusEnum.COMPLETED,
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        reason: 'Limpieza dental y profilaxis ultrasónica',
        notes: 'Procedimiento realizado con éxito.',
      },
      3
    ),
  ].slice(0, count)
}

/**
 * Citas próximas: estado SCHEDULED con fechas posteriores a hoy.
 */
export const makeUpcomingAppointments = (count = 3): AppointmentDataDto[] => {
  return [
    makeAppointment(
      {
        id: 'appt-upcoming-1',
        status: AppointmentStatusEnum.SCHEDULED,
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        reason: 'Consulta de control dermatológico y vacunación anual',
      },
      0
    ),
    makeAppointment(
      {
        id: 'appt-upcoming-2',
        status: AppointmentStatusEnum.SCHEDULED,
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        reason: 'Vacunación séxtuple y desparasitación interna',
      },
      1
    ),
    makeAppointment(
      {
        id: 'appt-upcoming-3',
        status: AppointmentStatusEnum.SCHEDULED,
        date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
        reason: 'Chequeo pediátrico y revisión de esquema de vacunación',
      },
      5
    ),
  ].slice(0, count)
}

/**
 * Convierte un arreglo de `AppointmentDataDto` a la respuesta cruda esperada por `apiClient.get`.
 */
export const toAppointmentRawResponse = (appointments: AppointmentDataDto[]) => ({
  statusCode: 200,
  data: appointments.map((appt) => ({
    id: appt.id,
    date: appt.date instanceof Date ? appt.date.toISOString() : String(appt.date),
    reason: appt.reason,
    notes: appt.notes,
    petId: appt.petId,
    veterinarianId: appt.veterinarianId,
    status: appt.status,
    pet: {
      id: appt.petId,
      name: appt.petName,
      mainImage: appt.petPhoto,
      owner: {
        user: {
          name: appt.ownerName,
        },
      },
    },
    veterinarian: {
      id: appt.veterinarianId,
      user: {
        name: appt.veterinarianName,
      },
      clinic: {
        name: appt.clinicName,
      },
    },
  })),
})
