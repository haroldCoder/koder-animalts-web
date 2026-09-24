import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { UpdateStatus } from './update-status'
import { VaccinationStatus } from '../../domain/enums'
import { makeOwner, makeVeterinarian } from '@/stories/mocks/user.factory'
import { withMainLayout, withMockVaccinations } from '@/stories/decorators'

/**
 * Selector desplegable para actualizar el estado de una vacuna individual
 * (`PENDING`, `DONE`, `CANCELLED`).
 * Respeta la política `VaccinationStatusPolicy`:
 * - El estado `DONE` es terminal y bloquea el selector.
 * - Los dueños (`OWNER`) no pueden reactivar vacunas canceladas.
 */
const meta = {
  title: 'Features/Vaccination/UpdateStatus',
  component: UpdateStatus,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Utiliza `useUpdateStatusVaccination` para actualizar el estado en el backend, notificando con Sonner Toast y bloqueándose según los permisos del usuario activo.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8 w-60">
        <Story />
      </div>
    ),
    withMockVaccinations(),
  ],
  argTypes: {
    currentStatus: {
      control: 'select',
      options: [
        VaccinationStatus.PENDING,
        VaccinationStatus.DONE,
        VaccinationStatus.CANCELLED,
      ],
      description: 'Estado actual de la vacuna',
    },
    id: { control: 'text' },
  },
} satisfies Meta<typeof UpdateStatus>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Estado pendiente visto por un veterinario: selector habilitado para cambiar a `DONE` o `CANCELLED`.
 */
export const PendingAsVeterinarian: Story = {
  decorators: [withMainLayout(makeVeterinarian())],
  args: {
    id: 'vac-1',
    currentStatus: VaccinationStatus.PENDING,
  },
}

/**
 * Estado completado / aplicada (`DONE`): selector deshabilitado por política de inmutabilidad médica.
 */
export const DoneStatusDisabled: Story = {
  decorators: [withMainLayout(makeVeterinarian())],
  args: {
    id: 'vac-2',
    currentStatus: VaccinationStatus.DONE,
  },
}

/**
 * Estado cancelado visto por un dueño (`OWNER`): selector deshabilitado según las políticas de acceso.
 */
export const CancelledAsOwnerDisabled: Story = {
  decorators: [withMainLayout(makeOwner())],
  args: {
    id: 'vac-3',
    currentStatus: VaccinationStatus.CANCELLED,
  },
}

/**
 * Interacción: El veterinario abre el selector para ver las opciones disponibles.
 */
export const ClickToOpenOptions: Story = {
  decorators: [withMainLayout(makeVeterinarian())],
  args: {
    id: 'vac-4',
    currentStatus: VaccinationStatus.PENDING,
  },
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('combobox')
    await expect(trigger).toBeEnabled()
    await userEvent.click(trigger)
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
    id: 'vac-5',
    currentStatus: VaccinationStatus.PENDING,
  },
}
