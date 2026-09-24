import type { MedicalRecordEntity } from '@/features/medical-record/domain/entities'
import { ConsultationType } from '@/features/medical-record/domain/enums'
import type { MedicalRecordResponseDto } from '@/features/medical-record/infrastructure/dtos'
import { PET_PHOTOS } from './pet.factory'

interface MedicalRecordFixture {
  reasonForVisit: string
  diagnosis: string
  treatment: string
  notes: string
  type: ConsultationType
  petName: string
  petPhoto: string
  daysOffset: number
  documentIds?: string[]
}

const MEDICAL_RECORD_FIXTURES: MedicalRecordFixture[] = [
  {
    reasonForVisit: 'Control dermatológico y rascado frecuente en lomo y orejas',
    diagnosis: 'Dermatitis alérgica por picadura de pulga (DAPP) leve',
    treatment: 'Pipeta antiparasitaria externa mensual y champú de avena coloidal 2 veces por semana',
    notes: 'Piel con eritema moderado en zona lumbar. Se indica control en 15 días si persiste el prurito.',
    type: ConsultationType.CONSULTATION,
    petName: 'Max',
    petPhoto: PET_PHOTOS.beagle,
    daysOffset: -3,
    documentIds: ['doc-receta-1', 'doc-foto-lesion-1'],
  },
  {
    reasonForVisit: 'Vacunación séxtuple de refuerzo anual y desparasitación interna',
    diagnosis: 'Paciente clínicamente sano apto para inmunización',
    treatment: 'Aplicación subcutánea de vacuna séxtuple y comprimido antiparasitario de amplio espectro',
    notes: 'Temperatura 38.4 °C, ganglios palpables normales, hidratación adecuada. Sin reacciones adversas inmediatas.',
    type: ConsultationType.VACCINATION,
    petName: 'Toby',
    petPhoto: PET_PHOTOS.golden,
    daysOffset: -12,
  },
  {
    reasonForVisit: 'Procedimiento programado de profilaxis y limpieza dental ultrasónica',
    diagnosis: 'Enfermedad periodontal grado II con acumulación de cálculo y halitosis',
    treatment: 'Detartraje supragingival y pulido coronario con flúor bajo anestesia inhalatoria',
    notes: 'Extracciones dentales no requeridas. Recuperación anestésica rápida y sin complicaciones.',
    type: ConsultationType.SURGERY,
    petName: 'Rocky',
    petPhoto: PET_PHOTOS.frenchBulldog,
    daysOffset: -25,
    documentIds: ['doc-consentimiento-qx', 'doc-analitica-prequirurgica'],
  },
  {
    reasonForVisit: 'Atención de urgencia por ingestión accidental de cuerpo extraño de goma',
    diagnosis: 'Cuerpo extraño en cámara gástrica confirmado mediante radiografía simple',
    treatment: 'Emesis inducida con apomorfina, recuperación del objeto y protector de mucosa gástrica',
    notes: 'Emesis exitosa en 10 minutos. Paciente monitoreado durante 3 horas y dado de alta estable.',
    type: ConsultationType.EMERGENCY,
    petName: 'Simba',
    petPhoto: PET_PHOTOS.borderCollie,
    daysOffset: -35,
    documentIds: ['doc-rx-gastrica-1'],
  },
  {
    reasonForVisit: 'Chequeo geriátrico con análisis de sangre y orina preventivo',
    diagnosis: 'Hemograma completo y perfil bioquímico en rangos normales para la edad',
    treatment: 'Suplemento nutricional con condroprotectores y ácidos grasos omega-3',
    notes: 'Excelente estado corporal (índice 5/9). Mantener dieta senior baja en fósforo.',
    type: ConsultationType.LAB_RESULTS,
    petName: 'Luna',
    petPhoto: PET_PHOTOS.catBicolor,
    daysOffset: -50,
    documentIds: ['doc-panel-bioquimico', 'doc-hemograma-completo'],
  },
  {
    reasonForVisit: 'Monitoreo postquirúrgico y fluidoterapia continua de soporte',
    diagnosis: 'Gastroenteritis aguda deshidratante en resolución favorable',
    treatment: 'Ringer lactato IV a tasa de mantenimiento y antiemético parenteral',
    notes: 'Paciente tolera dieta blanda húmeda sin regurgitaciones. Diuresis positiva conservada.',
    type: ConsultationType.HOSPITALIZATION,
    petName: 'Zeus',
    petPhoto: PET_PHOTOS.goldenPuppy,
    daysOffset: -70,
    documentIds: ['doc-hoja-hospitalizacion'],
  },
]

/**
 * Crea una entidad de expediente médico realista.
 */
export const makeMedicalRecord = (
  overrides: Partial<MedicalRecordEntity> = {},
  index = 0
): MedicalRecordEntity => {
  const fixture = MEDICAL_RECORD_FIXTURES[index % MEDICAL_RECORD_FIXTURES.length]
  const date = new Date()
  date.setDate(date.getDate() + fixture.daysOffset)
  date.setHours(10 + (index % 6), (index % 2) * 30, 0, 0)

  return {
    id: `mr-${index + 1}`,
    reasonForVisit: fixture.reasonForVisit,
    date,
    notes: fixture.notes,
    diagnosis: fixture.diagnosis,
    treatment: fixture.treatment,
    type: fixture.type,
    clinicName: 'Clínica Veterinaria Central',
    petName: fixture.petName,
    veterinaryName: 'Dr. Carlos Mendoza',
    petPhoto: fixture.petPhoto,
    ownerName: 'Laura Gómez',
    clinicId: 'clinic-001',
    petId: `pet-${index + 1}`,
    veterinaryId: 'vet-001',
    ownerId: 'owner-001',
    documentIds: fixture.documentIds ?? [],
    vaccinationsIds: fixture.type === ConsultationType.VACCINATION ? [`vac-${index + 1}`] : [],
    ...overrides,
  }
}

/**
 * Arreglo de expedientes médicos con IDs estables.
 */
export const makeMedicalRecords = (
  count = 4,
  overrides: Partial<MedicalRecordEntity> = {}
): MedicalRecordEntity[] =>
  Array.from({ length: count }, (_, index) => makeMedicalRecord(overrides, index))

/**
 * Convierte expedientes médicos al formato de respuesta crudo de la API (`MedicalRecordResponseDto`).
 */
export const toMedicalRecordRawResponse = (
  records: MedicalRecordEntity[]
): MedicalRecordResponseDto => ({
  statusCode: 200,
  data: records.map((rec) => ({
    id: rec.id,
    visitDate: rec.date instanceof Date ? rec.date.toISOString() : String(rec.date),
    type: rec.type,
    reasonForVisit: rec.reasonForVisit,
    diagnosis: rec.diagnosis ?? '',
    treatment: rec.treatment ?? '',
    notes: rec.notes ?? '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    petId: rec.petId,
    veterinarianId: rec.veterinaryId,
    vaccinations: (rec.vaccinationsIds ?? []).map((vId) => ({
      id: vId,
      vaccineName: 'Séxtuple Canina',
      dateAdministered: rec.date instanceof Date ? rec.date.toISOString() : String(rec.date),
      nextDueDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      lotNumber: 'LOT-9021-X',
      createdAt: new Date().toISOString(),
      medicalRecordId: rec.id,
    })) as [any],
    pet: {
      id: rec.petId,
      name: rec.petName,
      mainImage: rec.petPhoto,
      owner: {
        id: rec.ownerId ?? 'owner-001',
        user: {
          name: rec.ownerName ?? 'Laura Gómez',
        },
      },
    },
    veterinarian: {
      id: rec.veterinaryId,
      user: {
        name: rec.veterinaryName,
      },
      clinic: {
        id: rec.clinicId,
        name: rec.clinicName,
      },
    },
    documentIds: rec.documentIds ?? [],
  })),
})
