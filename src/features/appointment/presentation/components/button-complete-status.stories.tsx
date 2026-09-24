import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { ButtonCompleteStatus } from './button-complete-status'
import { AppointmentStatusEnum } from '../../domain/enums'
import { UserRole } from '@/features/user'
import { makeAppointment } from '@/stories/mocks'
import { withMockAppointments } from '@/stories/decorators'
import { CheckCheck } from 'lucide-react'

/**
 * Botón de acción rápida para marcar una cita como completada.
 * Incluye tooltip informativo, estado de carga mientras se actualiza la API,
 * y despacho de notificaciones toast de éxito o error.
 */
const meta = {
  title: 'Features/Appointment/ButtonCompleteStatus',
  component: ButtonCompleteStatus,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Utiliza `useUpdateStatusAppointment` para invocar la mutación de cambio de estado a `COMPLETED`. Enmarca el botón con un `Tooltip` de ayuda contextual.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
    withMockAppointments(),
  ],
} satisfies Meta<typeof ButtonCompleteStatus>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Estado por defecto: icono de check en verde con tooltip "Marcar como completada".
 */
export const Default: Story = {
  args: {
    appointment: makeAppointment({
      id: 'appt-1',
      status: AppointmentStatusEnum.SCHEDULED,
    }),
    user: { role: UserRole.veterinary },
  },
}

/**
 * Contenido personalizado: botón con texto explicativo además del icono.
 */
export const WithCustomContent: Story = {
  args: {
    appointment: makeAppointment({
      id: 'appt-2',
      status: AppointmentStatusEnum.SCHEDULED,
    }),
    user: { role: UserRole.veterinary },
    content: (
      <span className="flex items-center gap-1.5 font-medium">
        <CheckCheck className="w-3.5 h-3.5" />
        <span>Completar consulta</span>
      </span>
    ),
  },
}

/**
 * Interacción: Al hacer clic, se despacha la mutación y se muestra el toast de éxito.
 */
export const ClickToComplete: Story = {
  args: {
    appointment: makeAppointment({
      id: 'appt-3',
      status: AppointmentStatusEnum.SCHEDULED,
    }),
    user: { role: UserRole.veterinary },
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button')
    await expect(button).toBeEnabled()
    await userEvent.click(button)
  },
}

/**
 * Variante en tema oscuro.
 */
export const DarkTheme: Story = {
  parameters: {
    theme: 'dark',
  },
  args: {
    appointment: makeAppointment({
      id: 'appt-4',
      status: AppointmentStatusEnum.SCHEDULED,
    }),
    user: { role: UserRole.veterinary },
  },
}
