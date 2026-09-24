import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppointmentsList } from './appointments-list'
import { makeAppointments } from '@/stories/mocks'
import { withMockAppointments } from '@/stories/decorators'

/**
 * Listado plano de citas registradas para un usuario.
 * Presenta cada cita con su motivo, fecha completa formateada en español,
 * nombre del veterinario tratante, clínica, badge de estado y notas clínicas.
 *
 * Incluye estados automáticos para carga (`Loading`), error (`Error`) y lista vacía.
 */
const meta = {
  title: 'Features/Appointment/AppointmentsList',
  component: AppointmentsList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Consume `useAuth` y `useGetAppointmentsByUserId` para consultar las citas del usuario actual. Muestra un estado vacío descriptivo si no hay registros.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppointmentsList>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Caso habitual: listado con varias citas programadas y completadas.
 */
export const WithAppointments: Story = {
  decorators: [
    withMockAppointments({
      mode: 'success',
      appointments: makeAppointments(4),
    }),
  ],
}

/**
 * Cita única registrada.
 */
export const SingleAppointment: Story = {
  decorators: [
    withMockAppointments({
      mode: 'success',
      appointments: makeAppointments(1),
    }),
  ],
}

/**
 * Sin citas: Muestra el estado vacío con icono de calendario y mensaje orientador.
 */
export const EmptyState: Story = {
  decorators: [
    withMockAppointments({
      mode: 'empty',
    }),
  ],
}

/**
 * Estado de carga: Muestra el indicador `Loading` centrado mientras se obtienen los datos.
 */
export const LoadingState: Story = {
  decorators: [
    withMockAppointments({
      mode: 'loading',
    }),
  ],
}

/**
 * Error de servidor: Muestra el mensaje de error con alerta visual.
 */
export const ErrorState: Story = {
  decorators: [
    withMockAppointments({
      mode: 'error',
      message: 'No se pudo sincronizar el listado de citas con el servidor.',
      statusCode: 500,
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
      mode: 'success',
      appointments: makeAppointments(3),
    }),
  ],
}
