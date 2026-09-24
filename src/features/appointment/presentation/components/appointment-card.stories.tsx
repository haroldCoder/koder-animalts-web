import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { AppointmentCard } from './appointment-card'
import { AppointmentStatusEnum } from '../../domain/enums'
import { makeAppointment } from '@/stories/mocks'
import { makeOwner, makeVeterinarian } from '@/stories/mocks/user.factory'
import { withMainLayout, withMockAppointments } from '@/stories/decorators'

/**
 * Tarjeta individual de cita veterinaria.
 * Muestra el bloque de calendario con día y mes, motivo de consulta,
 * hora programada, nombre de la mascota, badge de estado y botón para ver detalles en pop-up.
 *
 * Cuando el usuario es Veterinario y la cita agendada ya ha transcurrido,
 * habilita además el botón de acción rápida para marcar la cita como completada.
 */
const meta = {
  title: 'Features/Appointment/AppointmentCard',
  component: AppointmentCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente base para el listado de citas. Consume `MainLayoutContext` para evaluar los permisos del rol mediante `UpdateStatusPolicy` y renderiza `AppointmentPopUp` al pulsar el botón "Ver".',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[620px] p-2">
        <Story />
      </div>
    ),
    withMockAppointments(),
  ],
} satisfies Meta<typeof AppointmentCard>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Cita programada vista por un Veterinario: la fecha ya ocurrió (hace 2 horas),
 * por lo que se muestra el botón verde para marcar la cita como completada.
 */
export const ScheduledAsVeterinarian: Story = {
  decorators: [withMainLayout(makeVeterinarian())],
  args: {
    appointment: makeAppointment({
      status: AppointmentStatusEnum.SCHEDULED,
      date: new Date(Date.now() - 2 * 60 * 60 * 1000), // Hace 2 horas
      reason: 'Consulta de control dermatológico y vacunación anual',
      petName: 'Max',
    }),
  },
}

/**
 * Cita programada a futuro vista por un Dueño (Owner):
 * No se muestra el botón de completar cita (restringido a veterinarios).
 */
export const ScheduledAsOwner: Story = {
  decorators: [withMainLayout(makeOwner())],
  args: {
    appointment: makeAppointment({
      status: AppointmentStatusEnum.SCHEDULED,
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Dentro de 3 días
      reason: 'Vacunación séxtuple y desparasitación interna preventiva',
      petName: 'Luna',
    }),
  },
}

/**
 * Cita con estado COMPLETADA:
 * Barra lateral y badge verde esmeralda ("Completada").
 */
export const Completed: Story = {
  decorators: [withMainLayout(makeVeterinarian())],
  args: {
    appointment: makeAppointment({
      status: AppointmentStatusEnum.COMPLETED,
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      reason: 'Revisión posquirúrgica y retiro de suturas',
      petName: 'Toby',
    }),
  },
}

/**
 * Cita con estado CANCELADA:
 * Barra lateral y badge rojo ("Cancelada").
 */
export const Cancelled: Story = {
  decorators: [withMainLayout(makeVeterinarian())],
  args: {
    appointment: makeAppointment({
      status: AppointmentStatusEnum.CANCELLED,
      date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      reason: 'Evaluación ortopédica por claudicación',
      petName: 'Simba',
    }),
  },
}

/**
 * Interacción: Al hacer clic en el botón con icono de ojo ("Ver"),
 * se abre el diálogo modal `AppointmentPopUp` con el detalle completo.
 */
export const OpenDetailPopup: Story = {
  decorators: [withMainLayout(makeVeterinarian())],
  args: {
    appointment: makeAppointment({
      status: AppointmentStatusEnum.SCHEDULED,
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      reason: 'Control pediátrico de cachorro y revisión nutricional',
      petName: 'Zeus',
      notes: 'Traer carnet físico de vacunas previas.',
    }),
  },
  play: async ({ canvas }) => {
    // Busca el botón con el icono de ojo
    const eyeButton = canvas.getByRole('button')
    await userEvent.click(eyeButton)

    // Base UI Dialog renderiza en document.body
    const dialogTitle = await within(document.body).findByText(
      /Control pediátrico de cachorro/i
    )
    await expect(dialogTitle).toBeInTheDocument()
  },
}

/**
 * Caso sin nombre de mascota asociado (ej. cita de primera vez en registro).
 */
export const WithoutPetName: Story = {
  decorators: [withMainLayout(makeVeterinarian())],
  args: {
    appointment: makeAppointment({
      petName: undefined,
      reason: 'Consulta general de orientación previa a adopción',
    }),
  },
}

/**
 * Motivo muy extenso: verifica el truncado o ajuste multilinea en pantallas móviles y de escritorio.
 */
export const LongReasonText: Story = {
  decorators: [withMainLayout(makeVeterinarian())],
  args: {
    appointment: makeAppointment({
      reason:
        'Evaluación integral por episodios recurrentes de vómito bilioso matutino, inapetencia progresiva y sospecha de intolerancia alimentaria a proteína avícola común',
      petName: 'Rocky',
    }),
  },
}

/**
 * Variante en tema oscuro.
 */
export const DarkTheme: Story = {
  decorators: [withMainLayout(makeVeterinarian())],
  parameters: {
    theme: 'dark',
  },
  args: {
    appointment: makeAppointment({
      status: AppointmentStatusEnum.SCHEDULED,
      date: new Date(Date.now() + 24 * 60 * 60 * 1000),
      reason: 'Control odontológico y valoración de sarro dental',
      petName: 'Max',
    }),
  },
}
