import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { ScheduleAppointmentForm } from './schedule-appointment-form'
import { makePets } from '@/stories/mocks'
import { makeVeterinarian } from '@/stories/mocks/user.factory'
import { withMainLayout, withMockAppointments } from '@/stories/decorators'

/**
 * Formulario para agendar una nueva cita veterinaria.
 * Permite seleccionar el paciente (`PetSelector` con foto y preview interactivo),
 * elegir fecha y hora (`DateTimePicker`), registrar el motivo de la consulta
 * e incluir notas u observaciones clínicas previas.
 *
 * Dispone de validaciones en vivo mediante React Hook Form y despacho
 * de la mutación a través de `useScheduleAppointmentMutation`.
 */
const meta = {
  title: 'Features/Appointment/ScheduleAppointmentForm',
  component: ScheduleAppointmentForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Utiliza React Hook Form para la captura y validación. Carga automáticamente los pacientes de la clínica con `useGetPetsByVeterinarianClinic` y despacha `useScheduleAppointmentMutation` notificando con Sonner Toast.',
      },
    },
  },
  decorators: [
    withMainLayout(makeVeterinarian()),
    (Story) => (
      <div className="w-full max-w-2xl p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ScheduleAppointmentForm>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Estado inicial limpio: listo para la captura de datos con pacientes disponibles en el selector.
 */
export const Default: Story = {
  decorators: [
    withMockAppointments({
      modePets: 'success',
      pets: makePets(5),
    }),
  ],
}

/**
 * Formulario completado con motivo y observaciones clínicas.
 */
export const FilledForm: Story = {
  decorators: [
    withMockAppointments({
      modePets: 'success',
      pets: makePets(4),
    }),
  ],
  play: async ({ canvas }) => {
    const reasonInput = canvas.getByPlaceholderText(/Chequeo anual, dolor de estómago/i)
    const notesTextarea = canvas.getByPlaceholderText(/Algún síntoma, historial previo/i)

    await userEvent.type(
      reasonInput,
      'Control dermatológico por prurito y eritema estacional'
    )
    await userEvent.type(
      notesTextarea,
      'El paciente presenta rascado frecuente en orejas y lomo desde hace 4 días.'
    )

    await expect(reasonInput).toHaveValue(
      'Control dermatológico por prurito y eritema estacional'
    )
    await expect(notesTextarea).toHaveValue(
      'El paciente presenta rascado frecuente en orejas y lomo desde hace 4 días.'
    )
  },
}

/**
 * Validación de errores: al intentar enviar el formulario sin los campos obligatorios,
 * se destacan los errores de validación (motivo requerido, paciente requerido).
 */
export const ValidationErrors: Story = {
  decorators: [
    withMockAppointments({
      modePets: 'success',
      pets: makePets(3),
    }),
  ],
  play: async ({ canvas }) => {
    const submitButton = canvas.getByRole('button', { name: /agendar cita/i })
    await userEvent.click(submitButton)

    await expect(
      await canvas.findByText('El motivo es requerido')
    ).toBeInTheDocument()
  },
}

/**
 * Mientras se consultan las mascotas registradas del veterinario.
 */
export const LoadingPets: Story = {
  decorators: [
    withMockAppointments({
      modePets: 'loading',
    }),
  ],
}

/**
 * Sin pacientes registrados en la clínica aún.
 */
export const WithoutPets: Story = {
  decorators: [
    withMockAppointments({
      modePets: 'empty',
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
    withMockAppointments({
      modePets: 'success',
      pets: makePets(4),
    }),
  ],
}
