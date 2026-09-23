import type { Meta, StoryObj } from '@storybook/react-vite'
import { Loading } from './loading'

/**
 * Indicador de carga usado por las consultas: `AppointmentsList`,
 * `UpcomingAppointment`, `MedicalRecordView`, `OwnerPetsView`,
 * `DataTable` (en la fila de carga) y `ClinicSelector` (en escala reducida).
 */
const meta = {
  title: 'Common/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Spinner centrado. El color se pasa por clase de Tailwind (`color`) y el tamaño por `className`.',
      },
    },
  },
  argTypes: {
    color: { control: 'text' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof Loading>

export default meta
type Story = StoryObj<typeof meta>

/** Valor por defecto: color de marca (`text-main`). */
export const Default: Story = {}

/** Color de acento, por ejemplo dentro de un contenedor secundario. */
export const CustomColor: Story = {
  args: {
    color: 'text-muted-foreground',
  },
}

/** Tamaño reducido, tal como lo renderiza `ClinicSelector` dentro del select. */
export const SmallInline: Story = {
  args: {
    className: 'scale-75',
  },
}

/** Centrado ocupando el alto disponible: el caso de las vistas de página. */
export const FullHeight: Story = {
  args: {
    className: 'h-40 w-full border border-dashed border-border rounded-xl',
  },
}
