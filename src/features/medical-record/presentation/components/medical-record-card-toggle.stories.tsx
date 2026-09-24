import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { MedicalRecordCardToggle } from './medical-record-card-toggle'
import { ConsultationType } from '../../domain/enums'
import { makeMedicalRecord } from '@/stories/mocks'
import { makeOwner, makeVeterinarian } from '@/stories/mocks/user.factory'
import { withMainLayout, withMockMedicalRecords } from '@/stories/decorators'

/**
 * Tarjeta expandible para visualizar un expediente clínico individual.
 * Incluye encabezado con fecha, tipo de consulta con badge de color distintivo,
 * avatar de la mascota, motivo de la visita y botón desplegable.
 *
 * Al expandirse muestra:
 * - Diagnóstico médico
 * - Tratamiento y prescripciones
 * - Observaciones clínicas adicionales
 * - Zona para subir o consultar documentos y estudios clínicos
 * - Botón de redirección a vacunas asociadas
 */
const meta = {
  title: 'Features/MedicalRecord/MedicalRecordCardToggle',
  component: MedicalRecordCardToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Presenta la información estructurada de una atención clínica con acordeón interactivo y sección de documentos adjuntos.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl p-6">
        <Story />
      </div>
    ),
    withMockMedicalRecords(),
  ],
} satisfies Meta<typeof MedicalRecordCardToggle>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Consulta médica general (colapsada por defecto).
 */
export const ConsultationCollapsed: Story = {
  decorators: [withMainLayout(makeVeterinarian())],
  args: {
    medicalRecord: makeMedicalRecord({
      type: ConsultationType.CONSULTATION,
      reasonForVisit: 'Control dermatológico y rascado frecuente',
      diagnosis: 'Dermatitis alérgica por pulgas (DAPP)',
      treatment: 'Pipeta mensual y champú de avena',
    }, 0),
    isExpandedInitially: false,
  },
}

/**
 * Tarjeta expandida inicialmente mostrando el contenido clínico completo.
 */
export const ExpandedInitially: Story = {
  decorators: [withMainLayout(makeVeterinarian())],
  args: {
    medicalRecord: makeMedicalRecord({
      type: ConsultationType.CONSULTATION,
      isExpandedInitially: true,
    } as any, 0),
    isExpandedInitially: true,
  },
}

/**
 * Procedimiento quirúrgico (`SURGERY`).
 */
export const SurgeryVariant: Story = {
  decorators: [withMainLayout(makeVeterinarian())],
  args: {
    medicalRecord: makeMedicalRecord({
      type: ConsultationType.SURGERY,
      reasonForVisit: 'Limpieza dental profiláctica bajo anestesia',
      diagnosis: 'Enfermedad periodontal grado II',
      treatment: 'Detartraje supragingival y pulido con flúor',
    }, 2),
    isExpandedInitially: true,
  },
}

/**
 * Atención de urgencia médica (`EMERGENCY`).
 */
export const EmergencyVariant: Story = {
  decorators: [withMainLayout(makeVeterinarian())],
  args: {
    medicalRecord: makeMedicalRecord({
      type: ConsultationType.EMERGENCY,
      reasonForVisit: 'Ingestión de cuerpo extraño',
      diagnosis: 'Cuerpo extraño en estómago confirmado con rayos X',
      treatment: 'Emesis inducida y protector de mucosa',
    }, 3),
    isExpandedInitially: true,
  },
}

/**
 * Vista para Dueño de Mascota (`OWNER`): no muestra controles de subida de archivos restringidos.
 */
export const AsOwner: Story = {
  decorators: [withMainLayout(makeOwner())],
  args: {
    medicalRecord: makeMedicalRecord({
      type: ConsultationType.CONSULTATION,
    }, 1),
    isExpandedInitially: true,
  },
}

/**
 * Interacción: El usuario hace clic en el encabezado de la tarjeta para alternar entre expandido y colapsado.
 */
export const ToggleClick: Story = {
  decorators: [withMainLayout(makeVeterinarian())],
  args: {
    medicalRecord: makeMedicalRecord({}, 0),
    isExpandedInitially: false,
  },
  play: async ({ canvas }) => {
    const cardHeader = canvas.getByRole('article').firstElementChild as HTMLElement
    await expect(cardHeader).toBeInTheDocument()
    await userEvent.click(cardHeader)

    await expect(await canvas.findByText(/diagnóstico/i)).toBeInTheDocument()
  },
}

/**
 * Variante en tema oscuro.
 */
export const DarkTheme: Story = {
  parameters: {
    theme: 'dark',
  },
  decorators: [withMainLayout(makeVeterinarian())],
  args: {
    medicalRecord: makeMedicalRecord({}, 0),
    isExpandedInitially: true,
  },
}
