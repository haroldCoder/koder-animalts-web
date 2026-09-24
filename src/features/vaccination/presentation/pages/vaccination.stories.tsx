import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { Vaccination } from './vaccination'
import {
  makeCancelledVaccinations,
  makeDoneVaccinations,
  makePendingVaccinations,
  makeVaccinations,
  makePets,
} from '@/stories/mocks'
import { makeOwner, makeVeterinarian } from '@/stories/mocks/user.factory'
import { withMainLayout, withMockVaccinations } from '@/stories/decorators'

/**
 * Pantalla principal del módulo de vacunación de mascotas.
 * Gestiona el control, historial y programación de dosis según el rol:
 * - Para **Veterinario**: Permite registrar nuevas vacunas (`CreateVaccinationDialog`),
 *   modificar el estado de aplicación en la tabla (`UpdateStatus`) y consultar el expediente médico asociado.
 * - Para **Dueño de Mascota (Owner)**: Permite filtrar por mascota mediante `CarouselSelectPet`,
 *   revisar próximas fechas y estados de vacunación con permisos restringidos de modificación.
 */
const meta = {
  title: 'Features/Vaccination/Vaccination',
  component: Vaccination,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Consulta el registro de vacunas con `useGetAllVaccinationsQuery` y las mascotas con `useGetPetsByOwnerUserId`. Integra filtros dinámicos por estado (`FilterStatus`), diálogo de creación y tabla paginada con acciones contextuales.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background text-foreground">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Vaccination>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Vista para Veterinario con vacunas registradas:
 * Muestra el botón superior "Agregar Vacuna", la tabla completa con el selector
 * de estado habilitado y accesos directos al historial médico.
 */
export const AsVeterinarian: Story = {
  decorators: [
    withMainLayout(makeVeterinarian()),
    withMockVaccinations({
      mode: 'success',
      vaccinations: makeVaccinations(6),
    }),
  ],
}

/**
 * Vista para Dueño de Mascota (Owner):
 * Presenta el carrusel de mascotas en la cabecera del contenedor para filtrar
 * por paciente, sin botón de creación de vacunas y con permisos de solo lectura
 * o restringidos según la política del sistema.
 */
export const AsOwner: Story = {
  decorators: [
    withMainLayout(makeOwner()),
    withMockVaccinations({
      mode: 'success',
      pets: makePets(4),
      vaccinations: makeVaccinations(4),
    }),
  ],
}

/**
 * Filtro por estado activo: muestra dosis pendientes por aplicar.
 */
export const PendingVaccinations: Story = {
  decorators: [
    withMainLayout(makeVeterinarian()),
    withMockVaccinations({
      mode: 'success',
      vaccinations: makePendingVaccinations(3),
    }),
  ],
}

/**
 * Historial de vacunas completadas / administradas (`DONE`).
 */
export const CompletedVaccinations: Story = {
  decorators: [
    withMainLayout(makeVeterinarian()),
    withMockVaccinations({
      mode: 'success',
      vaccinations: makeDoneVaccinations(4),
    }),
  ],
}

/**
 * Registro de vacunas canceladas.
 */
export const CancelledVaccinations: Story = {
  decorators: [
    withMainLayout(makeVeterinarian()),
    withMockVaccinations({
      mode: 'success',
      vaccinations: makeCancelledVaccinations(2),
    }),
  ],
}

/**
 * Estado vacío para Veterinario:
 * Muestra `NotFoundVaccinations` invitando a registrar la primera vacuna
 * con el botón de acción integrado.
 */
export const EmptyStateVeterinarian: Story = {
  decorators: [
    withMainLayout(makeVeterinarian()),
    withMockVaccinations({
      mode: 'empty',
    }),
  ],
}

/**
 * Estado vacío para Dueño:
 * Muestra el estado vacío informativo sin el botón de registrar vacuna.
 */
export const EmptyStateOwner: Story = {
  decorators: [
    withMainLayout(makeOwner()),
    withMockVaccinations({
      mode: 'empty',
      pets: makePets(2),
    }),
  ],
}

/**
 * Estado de carga: renderiza la tabla con skeleton o indicadores mientras
 * se obtienen los datos de la API.
 */
export const LoadingState: Story = {
  decorators: [
    withMainLayout(makeVeterinarian()),
    withMockVaccinations({
      mode: 'loading',
    }),
  ],
}

/**
 * Interacción: El veterinario abre el diálogo "Agregar Vacuna" desde la cabecera.
 */
export const OpenCreateDialog: Story = {
  decorators: [
    withMainLayout(makeVeterinarian()),
    withMockVaccinations({
      mode: 'success',
      vaccinations: makeVaccinations(4),
      pets: makePets(3),
    }),
  ],
  play: async ({ canvas }) => {
    const addButton = canvas.getByRole('button', { name: /agregar vacuna/i })
    await expect(addButton).toBeInTheDocument()
    await userEvent.click(addButton)

    await expect(
      await canvas.findByRole('heading', { name: /registrar nueva vacuna/i, level: 2 })
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
    withMockVaccinations({
      mode: 'success',
      vaccinations: makeVaccinations(5),
    }),
  ],
}
