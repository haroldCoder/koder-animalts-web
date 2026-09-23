import type { Meta, StoryObj } from '@storybook/react-vite'
import { ClinicDetail } from './clinic-detail'
import { makeClinicOption, makeClinicOptions, makeClinicWithoutContact } from '@/stories/mocks'

/**
 * Detalle de contacto de una clínica. Se muestra dentro del popover de
 * `ClinicSelector`, por eso el ancho de la story imita el del popover (256px).
 */
const meta = {
  title: 'Common/ClinicDetail',
  component: ClinicDetail,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Si no hay dirección, teléfono ni correo, cae al texto "Sin información de contacto adicional".',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-64 rounded-lg border border-border bg-popover shadow-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ClinicDetail>

export default meta
type Story = StoryObj<typeof meta>

/** Clínica con los tres datos de contacto. */
export const Complete: Story = {
  args: {
    clinic: makeClinicOption(),
  },
}

/** Clínica sin datos de contacto: estado que ya existe en el backend. */
export const WithoutContactInfo: Story = {
  args: {
    clinic: makeClinicWithoutContact(),
  },
}

/** Dirección y correo largos: se valida el `break-all` del correo y el ancho fijo. */
export const LongData: Story = {
  args: {
    clinic: makeClinicOption({
      label: 'Clínica Veterinaria Especializada en Animales Exóticos y Silvestres',
      aditional: {
        address: 'Calle 134 # 72-45, Torre Empresarial Los Nogales, Local 305, Bogotá D.C.',
        phone: '+57 601 555 0134 ext. 102',
        email: 'servicioalcliente.especialidades@veterinariaexoticos.com',
      },
    }),
  },
}

/** Segunda clínica del listado, para comparar el render con datos distintos. */
export const SecondClinic: Story = {
  args: {
    clinic: makeClinicOptions(2)[1],
  },
}

/** Variante oscura del detalle. */
export const DarkTheme: Story = {
  args: {
    clinic: makeClinicOption(),
  },
  parameters: {
    theme: 'dark',
  },
}
