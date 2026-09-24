import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppointmentHistory } from './appointment-history'
import { makePastAppointments } from '@/stories/mocks'
import { makeOwner, makeVeterinarian } from '@/stories/mocks/user.factory'
import { withMainLayout, withMockAppointments } from '@/stories/decorators'

/**
 * Historial de citas pasadas.
 * Muestra las citas anteriores a la fecha actual en orden descendente,
 * destacando citas completadas y canceladas mediante `AppointmentCard`.
 *
 * Incluye estados para carga, error y estado vacío cuando aún no existen consultas previas.
 */
const meta = {
  title: 'Features/Appointment/AppointmentHistory',
  component: AppointmentHistory,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Utiliza `useDateSetter(0, -1)` y `useGetAppointmentsByUserId` con orden descendente para mostrar el histórico clínico de atenciones finalizadas o canceladas.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-4xl mx-auto p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppointmentHistory>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Historial con citas finalizadas y canceladas visto por un Veterinario.
 */
export const WithPastAppointments: Story = {
  decorators: [
    withMainLayout(makeVeterinarian()),
    withMockAppointments({
      mode: 'success',
      appointments: makePastAppointments(3),
    }),
  ],
}

/**
 * Historial visto por el Dueño de mascota (Owner).
 */
export const AsOwner: Story = {
  decorators: [
    withMainLayout(makeOwner()),
    withMockAppointments({
      mode: 'success',
      appointments: makePastAppointments(2),
    }),
  ],
}

/**
 * Sin historial: nuevo paciente o clínica sin registros pasados aún.
 */
export const EmptyState: Story = {
  decorators: [
    withMainLayout(makeVeterinarian()),
    withMockAppointments({
      mode: 'empty',
    }),
  ],
}

/**
 * Estado de carga inicial mientras se consulta el historial.
 */
export const LoadingState: Story = {
  decorators: [
    withMainLayout(makeVeterinarian()),
    withMockAppointments({
      mode: 'loading',
    }),
  ],
}

/**
 * Error al obtener el historial.
 */
export const ErrorState: Story = {
  decorators: [
    withMainLayout(makeVeterinarian()),
    withMockAppointments({
      mode: 'error',
      message: 'Ocurrió un error al cargar el registro de citas pasadas.',
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
    withMainLayout(makeVeterinarian()),
    withMockAppointments({
      mode: 'success',
      appointments: makePastAppointments(3),
    }),
  ],
}
