import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { CreateVaccinationDialog } from './create-vaccination-dialog'
import { makePets } from '@/stories/mocks'
import { makeVeterinarian } from '@/stories/mocks/user.factory'
import { withMainLayout, withMockVaccinations } from '@/stories/decorators'

/**
 * Diálogo modal para registrar una nueva vacuna para un paciente.
 * Requiere vincular la vacuna a una mascota (`PetSelector`) y seleccionar
 * un expediente médico de consulta o atención previa.
 *
 * Incluye campos para nombre de vacuna, fecha de aplicación, próxima dosis recomendada
 * y número de lote opcional para trazabilidad.
 */
const meta = {
  title: 'Features/Vaccination/CreateVaccinationDialog',
  component: CreateVaccinationDialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Utiliza React Hook Form y React Query para la consulta de pacientes (`useGetPetsByVeterinaryUserId`) y expedientes médicos (`useGetMedicalRecordsByUserId`), despachando la mutación con `useRegisterVaccination`.',
      },
    },
  },
  decorators: [
    withMainLayout(makeVeterinarian()),
    (Story) => (
      <div className="p-12 flex justify-center items-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CreateVaccinationDialog>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Estado cerrado por defecto: renderiza el botón de acción principal "Agregar Vacuna".
 */
export const Default: Story = {
  decorators: [
    withMockVaccinations({
      modePets: 'success',
      pets: makePets(4),
    }),
  ],
}

/**
 * Interacción: El usuario abre el diálogo modal para ver los campos del formulario.
 */
export const OpenDialog: Story = {
  decorators: [
    withMockVaccinations({
      modePets: 'success',
      pets: makePets(4),
    }),
  ],
  play: async ({ canvas }) => {
    const triggerButton = canvas.getByRole('button', { name: /agregar vacuna/i })
    await userEvent.click(triggerButton)

    await expect(
      await canvas.findByRole('heading', {
        name: /registrar nueva vacuna/i,
        level: 2,
      })
    ).toBeInTheDocument()
  },
}

/**
 * Estado mientras se consultan las mascotas registradas en la clínica.
 */
export const LoadingPets: Story = {
  decorators: [
    withMockVaccinations({
      modePets: 'loading',
    }),
  ],
}

/**
 * Sin pacientes registrados: el selector de mascotas se mostrará vacío.
 */
export const WithoutPets: Story = {
  decorators: [
    withMockVaccinations({
      modePets: 'empty',
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
    withMockVaccinations({
      modePets: 'success',
      pets: makePets(4),
    }),
  ],
}
