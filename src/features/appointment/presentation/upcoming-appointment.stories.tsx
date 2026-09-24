import type { Meta, StoryObj } from '@storybook/react-vite'
import { UpcomingAppointment } from './upcoming-appointment'
import { makeUpcomingAppointments } from '@/stories/mocks'
import { makeOwner, makeVeterinarian } from '@/stories/mocks/user.factory'
import { withMainLayout, withMockAppointments } from '@/stories/decorators'

/**
 * Vista de próximas citas veterinarias.
 * Muestra el filtro de fecha límite (`DatePicker`) y la lista de citas programadas
 * ordenadas cronológicamente (`AppointmentCard`).
 *
 * Incluye estados para carga, error y lista vacía cuando no hay consultas agendadas.
 */
const meta = {
  title: 'Features/Appointment/UpcomingAppointment',
  component: UpcomingAppointment,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Consulta citas dentro de un rango de fechas futuras mediante `useGetAppointmentsByUserId` y `useDateSetter`. Renderiza cada cita con `AppointmentCard`, adaptando las acciones al rol del usuario en `MainLayoutContext`.',
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
} satisfies Meta<typeof UpcomingAppointment>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Veterinario con próximas citas asignadas:
 * Las tarjetas de citas pasadas o del día permiten marcarlas como completadas.
 */
export const AsVeterinarian: Story = {
  decorators: [
    withMainLayout(makeVeterinarian()),
    withMockAppointments({
      mode: 'success',
      appointments: makeUpcomingAppointments(3),
    }),
  ],
}

/**
 * Dueño de mascota (Owner) revisando sus próximas citas:
 * Muestra las citas agendadas de sus mascotas sin botones de gestión clínica.
 */
export const AsOwner: Story = {
  decorators: [
    withMainLayout(makeOwner()),
    withMockAppointments({
      mode: 'success',
      appointments: makeUpcomingAppointments(2),
    }),
  ],
}

/**
 * Sin próximas citas: muestra el estado vacío invitando a agendar una consulta.
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
 * Estado de carga: spinner mientras se consulta la agenda con el backend.
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
 * Error al cargar próximas citas.
 */
export const ErrorState: Story = {
  decorators: [
    withMainLayout(makeVeterinarian()),
    withMockAppointments({
      mode: 'error',
      message: 'Fallo al recuperar las próximas citas del calendario.',
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
      appointments: makeUpcomingAppointments(3),
    }),
  ],
}
