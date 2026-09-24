import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { AppointmentsAndHistoryView } from './appointments-and-history-view'
import { makePastAppointments, makeUpcomingAppointments } from '@/stories/mocks'
import { makeOwner, makeVeterinarian } from '@/stories/mocks/user.factory'
import { withMainLayout, withMockAppointments } from '@/stories/decorators'

/**
 * Pantalla principal del módulo de citas y su historial clínico.
 * Gestiona la navegación por pestañas según el rol del usuario conectado:
 * - Para **Veterinario**: Pestañas de "Próximas", "Historial de Citas", "Historial Médico",
 *   además del botón de acceso directo "Agendar Cita".
 * - Para **Dueño de Mascota (Owner)**: Vista simplificada enfocada en "Próximas" citas.
 */
const meta = {
  title: 'Features/Appointment/AppointmentsAndHistoryView',
  component: AppointmentsAndHistoryView,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Integra `useAvailableTabs` para controlar las pestañas permitidas según el rol y renderiza dinámicamente `UpcomingAppointment`, `AppointmentHistory`, `ScheduleAppointmentForm` o `MedicalRecordView`.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppointmentsAndHistoryView>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Vista completa para Veterinario: pestaña "Próximas" activa por defecto
 * con botón para agendar y selector de pestañas completo.
 */
export const VeterinarianUpcomingView: Story = {
  decorators: [
    withMainLayout(makeVeterinarian()),
    withMockAppointments({
      mode: 'success',
      appointments: makeUpcomingAppointments(4),
    }),
  ],
}

/**
 * Interacción: El veterinario hace clic en "Historial de Citas"
 * para revisar las atenciones previas finalizadas o canceladas.
 */
export const SwitchToHistoryTab: Story = {
  decorators: [
    withMainLayout(makeVeterinarian()),
    withMockAppointments({
      mode: 'success',
      appointments: makePastAppointments(3),
    }),
  ],
  play: async ({ canvas }) => {
    const historyTab = canvas.getByRole('button', { name: /historial de citas/i })
    await userEvent.click(historyTab)

    await expect(
      canvas.getByRole('heading', { name: /historial de citas/i, level: 1 })
    ).toBeInTheDocument()
  },
}

/**
 * Interacción: El veterinario hace clic en el botón superior "Agendar Cita",
 * abriendo el formulario integrado `ScheduleAppointmentForm`.
 */
export const OpenScheduleForm: Story = {
  decorators: [
    withMainLayout(makeVeterinarian()),
    withMockAppointments({
      mode: 'success',
      appointments: makeUpcomingAppointments(2),
    }),
  ],
  play: async ({ canvas }) => {
    const scheduleButton = canvas.getByRole('button', { name: /agendar cita/i })
    await userEvent.click(scheduleButton)

    await expect(
      await canvas.findByRole('heading', { name: /nueva cita/i, level: 2 })
    ).toBeInTheDocument()
  },
}

/**
 * Vista para Dueño (Owner): Pestañas de gestión médica e historial no permitidas,
 * sin botón superior de agendar directo. Muestra únicamente sus citas programadas.
 */
export const OwnerUpcomingView: Story = {
  decorators: [
    withMainLayout(makeOwner()),
    withMockAppointments({
      mode: 'success',
      appointments: makeUpcomingAppointments(2),
    }),
  ],
}

/**
 * Vista sin citas agendadas: estado vacío en la pestaña activa.
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
