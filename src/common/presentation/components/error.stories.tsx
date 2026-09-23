import type { Meta, StoryObj } from '@storybook/react-vite'
import { Error } from './error'

/**
 * Estado de error de una consulta: icono en rojo más el mensaje.
 * Se usa en las vistas que fallan al traer datos (`AppointmentsList`,
 * `UpcomingAppointment`, `MedicalRecordView`, `OwnerPetsView`).
 */
const meta = {
  title: 'Common/Error',
  component: Error,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Mensaje de error centrado con icono. El componente no envuelve nada: el centrado vertical depende del contenedor padre.',
      },
    },
  },
  argTypes: {
    message: { control: 'text' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof Error>

export default meta
type Story = StoryObj<typeof meta>

/** Caso habitual: un mensaje corto que cabe en una línea. */
export const Default: Story = {
  args: {
    message: 'No se pudieron cargar las citas. Intenta de nuevo.',
  },
}

/** Mensaje largo, como el que devuelve el backend al fallar una petición. */
export const LongMessage: Story = {
  args: {
    message:
      'No fue posible obtener el historial médico de la mascota. La sesión pudo haber expirado o el servicio no está disponible en este momento, vuelve a intentarlo en unos minutos.',
  },
}

/** El espacio disponible lo controla quien lo usa: aquí se le da altura y fondo. */
export const InsideContainerWithHeight: Story = {
  args: {
    message: 'No hay conexión con el servidor.',
    className: 'h-64 w-full bg-destructive/5 rounded-xl',
  },
}
