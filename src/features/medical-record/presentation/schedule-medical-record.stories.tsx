import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { ScheduleMedicalRecord } from './schedule-medical-record'
import { makePets } from '@/stories/mocks'
import { makeVeterinarian } from '@/stories/mocks/user.factory'
import { withMainLayout, withMockMedicalRecords } from '@/stories/decorators'

/**
 * Formulario para registrar una nueva consulta o atención en el historial médico.
 * Permite seleccionar el paciente (`PetSelector`), el tipo de atención clínica
 * (`MedicalRecordTypeSelector`), la fecha de la visita (`DatePickerVisit`),
 * el motivo de la consulta, diagnóstico, tratamiento prescrito y notas adicionales.
 */
const meta = {
  title: 'Features/MedicalRecord/ScheduleMedicalRecord',
  component: ScheduleMedicalRecord,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Utiliza React Hook Form y despacha la mutación con `useScheduleAppointmentMutation`. Carga los pacientes de la clínica con `useGetPetsByVeterinarianClinic`.',
      },
    },
  },
  decorators: [
    withMainLayout(makeVeterinarian()),
    (Story) => (
      <div className="w-full max-w-4xl p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ScheduleMedicalRecord>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Formulario limpio listo para la captura de una nueva consulta.
 */
export const Default: Story = {
  decorators: [
    withMockMedicalRecords({
      modePets: 'success',
      pets: makePets(4),
    }),
  ],
}

/**
 * Interacción: El usuario escribe el motivo, diagnóstico y tratamiento de la consulta.
 */
export const FilledForm: Story = {
  decorators: [
    withMockMedicalRecords({
      modePets: 'success',
      pets: makePets(4),
    }),
  ],
  play: async ({ canvas }) => {
    const reasonInput = canvas.getByPlaceholderText(/chequeo anual, dolor de estómago/i)
    await userEvent.type(reasonInput, 'Revisión por otitis externa bilateral')
    await expect(reasonInput).toHaveValue('Revisión por otitis externa bilateral')

    const notesTextarea = canvas.getByPlaceholderText(/información adicional relevante/i)
    await userEvent.type(notesTextarea, 'Paciente con molestia en oreja izquierda desde hace 2 días.')
    await expect(notesTextarea).toHaveValue('Paciente con molestia en oreja izquierda desde hace 2 días.')

    const diagnosisTextarea = canvas.getByPlaceholderText(/detalles sobre el diagnóstico/i)
    await userEvent.type(diagnosisTextarea, 'Otitis bacteriana por Malassezia')
    await expect(diagnosisTextarea).toHaveValue('Otitis bacteriana por Malassezia')

    const treatmentTextarea = canvas.getByPlaceholderText(/receta médica, medicamentos recomendados/i)
    await userEvent.type(treatmentTextarea, 'Gotas óticas cada 12 horas por 10 días')
    await expect(treatmentTextarea).toHaveValue('Gotas óticas cada 12 horas por 10 días')
  },
}

/**
 * Validación: Al enviar el formulario sin completar los campos obligatorios,
 * se destacan los mensajes de error en pantalla.
 */
export const ValidationErrors: Story = {
  decorators: [
    withMockMedicalRecords({
      modePets: 'success',
      pets: makePets(3),
    }),
  ],
  play: async ({ canvas }) => {
    const submitButton = canvas.getByRole('button', { name: /^guardar$/i })
    await userEvent.click(submitButton)

    await expect(
      await canvas.findByText(/el motivo de la visita es requerido/i)
    ).toBeInTheDocument()
  },
}

/**
 * Mientras se consultan las mascotas registradas en la clínica.
 */
export const LoadingPets: Story = {
  decorators: [
    withMockMedicalRecords({
      modePets: 'loading',
    }),
  ],
}

/**
 * Variante en tema oscuro.
 */
export const DarkTheme: Story = {
  parameters: {
    theme: 'dark',
  },
  decorators: [
    withMockMedicalRecords({
      modePets: 'success',
      pets: makePets(4),
    }),
  ],
}
