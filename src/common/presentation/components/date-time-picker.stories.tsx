import type { Meta, StoryObj } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import { DateTimePicker } from './date-time-picker'

interface DateTimePickerDemoProps {
  initialValue?: Date
  required?: boolean
  disablePast?: boolean
}

/**
 * `DateTimePicker` es un `Controller` de react-hook-form: recibe `control` y
 * `name`, así que la story monta un formulario mínimo con el campo `date`.
 */
const DateTimePickerDemo = ({
  initialValue,
  required = false,
  disablePast = false,
}: DateTimePickerDemoProps) => {
  const { control } = useForm<{ date: Date | undefined }>({
    defaultValues: { date: initialValue },
  })

  return (
    <div className="w-80">
      <DateTimePicker control={control} name="date" required={required} disablePast={disablePast} />
    </div>
  )
}

/**
 * Selector de fecha y hora en un solo popover: calendario en español más un
 * input de hora. Se usa al agendar citas y al programar registros médicos.
 */
const meta = {
  title: 'Common/DateTimePicker',
  component: DateTimePickerDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'El disparador muestra "Selecciona fecha y hora" mientras el campo está vacío. Con `required` aplica la regla de validación en el formulario padre; el componente no pinta el mensaje de error.',
      },
    },
  },
  argTypes: {
    initialValue: { control: 'date' },
    required: { control: 'boolean' },
    disablePast: { control: 'boolean' },
  },
} satisfies Meta<typeof DateTimePickerDemo>

export default meta
type Story = StoryObj<typeof meta>

/** Campo vacío: el disparador queda en modo placeholder. */
export const Empty: Story = {}

/** Con fecha y hora ya definidas (cita existente). */
export const WithValue: Story = {
  args: {
    initialValue: new Date('2026-10-24T15:30:00'),
  },
}

/** Campo obligatorio del formulario de agendamiento. */
export const Required: Story = {
  args: {
    required: true,
  },
}

/** `disablePast` bloquea los días anteriores a hoy en el calendario. */
export const DisablePastDates: Story = {
  args: {
    disablePast: true,
    initialValue: new Date('2026-10-24T09:00:00'),
  },
}

/** Hora en la madrugada: valida el formato `hh:mm a` en español. */
export const EarlyMorning: Story = {
  args: {
    initialValue: new Date('2026-10-24T07:05:00'),
  },
}

/** Variante oscura del popover y del calendario. */
export const DarkTheme: Story = {
  args: {
    initialValue: new Date('2026-10-24T15:30:00'),
  },
  parameters: {
    theme: 'dark',
  },
}
