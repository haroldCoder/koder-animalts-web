import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { MedicalRecordView } from './medical-record-view'
import { makeMedicalRecords, makePets } from '@/stories/mocks'
import { makeOwner, makeVeterinarian } from '@/stories/mocks/user.factory'
import { withMainLayout, withMockMedicalRecords } from '@/stories/decorators'

/**
 * Pantalla principal del historial médico clínico de mascotas.
 * Permite filtrar por paciente y rango de fechas, consultar diagnósticos,
 * tratamientos aplicados, prescripciones y documentos adjuntos.
 *
 * - Para **Veterinario**: Permite registrar nuevas atenciones clínicas con el botón "Nuevo Registro"
 *   y subir o gestionar documentación médica.
 * - Para **Dueño de Mascota (Owner)**: Permite revisar el historial cronológico y descargar recetas o informes.
 */
const meta = {
  title: 'Features/MedicalRecord/MedicalRecordView',
  component: MedicalRecordView,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Consulta el historial clínico con `useGetMedicalRecordsByUserId` y mascotas con `useGetPetsByVeterinaryUserId` o `useGetPetsByOwnerUserId`. Muestra tarjetas interactivas colapsables (`MedicalRecordCardToggle`) y selector de filtros.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background text-foreground py-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MedicalRecordView>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Vista para Veterinario con expedientes registrados:
 * Muestra el botón superior "Nuevo Registro", el selector de mascotas de la clínica
 * y la lista de atenciones con badges de tipo (Consulta, Cirugía, Vacunación, Urgencia).
 */
export const AsVeterinarian: Story = {
  decorators: [
    withMainLayout(makeVeterinarian()),
    withMockMedicalRecords({
      mode: 'success',
      records: makeMedicalRecords(5),
      pets: makePets(4),
    }),
  ],
}

/**
 * Vista para Dueño de Mascota (Owner):
 * Sin botón para agregar nuevos registros, enfocado en la consulta del historial
 * clínico de sus mascotas.
 */
export const AsOwner: Story = {
  decorators: [
    withMainLayout(makeOwner()),
    withMockMedicalRecords({
      mode: 'success',
      records: makeMedicalRecords(3),
      pets: makePets(3),
    }),
  ],
}

/**
 * Estado vacío cuando no existen expedientes registrados para los filtros actuales.
 */
export const EmptyState: Story = {
  decorators: [
    withMainLayout(makeVeterinarian()),
    withMockMedicalRecords({
      mode: 'empty',
      pets: makePets(3),
    }),
  ],
}

/**
 * Estado de carga inicial mientras se recuperan los datos del servidor.
 */
export const LoadingState: Story = {
  decorators: [
    withMainLayout(makeVeterinarian()),
    withMockMedicalRecords({
      mode: 'loading',
    }),
  ],
}

/**
 * Error al obtener el historial clínico desde la API.
 */
export const ErrorState: Story = {
  decorators: [
    withMainLayout(makeVeterinarian()),
    withMockMedicalRecords({
      mode: 'error',
      message: 'No fue posible sincronizar el historial médico de la clínica.',
    }),
  ],
}

/**
 * Interacción: El veterinario hace clic en "Nuevo Registro", desplegando el formulario de atención.
 */
export const OpenNewRecordForm: Story = {
  decorators: [
    withMainLayout(makeVeterinarian()),
    withMockMedicalRecords({
      mode: 'success',
      records: makeMedicalRecords(3),
      pets: makePets(4),
    }),
  ],
  play: async ({ canvas }) => {
    const newRecordButton = canvas.getByRole('button', { name: /nuevo registro/i })
    await expect(newRecordButton).toBeInTheDocument()
    await userEvent.click(newRecordButton)

    await expect(
      await canvas.findByRole('heading', {
        name: /agregar historial medico/i,
        level: 1,
      })
    ).toBeInTheDocument()
  },
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
    withMockMedicalRecords({
      mode: 'success',
      records: makeMedicalRecords(4),
      pets: makePets(4),
    }),
  ],
}
