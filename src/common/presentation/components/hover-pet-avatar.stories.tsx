import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { HoverPetAvatar } from './hover-pet-avatar'
import { makePets } from '@/stories/mocks'

const [max, luna, rocky, nala] = makePets(4)

/**
 * Avatar de mascota con foto real que abre un popover con la imagen ampliada
 * al pasar el mouse. Se usa dentro de listas y selects (`PetSelector`).
 */
const meta = {
  title: 'Common/HoverPetAvatar',
  component: HoverPetAvatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'El popover se abre con `onMouseEnter` y no recibe clics (`pointer-events-none`), pensado para ítems de listas seleccionables. El avatar cae al fallback de iniciales si la foto no carga; el `img` del popover no tiene fallback (si la URL falla queda roto).',
      },
    },
  },
  argTypes: {
    src: { control: 'text' },
    name: { control: 'text' },
  },
} satisfies Meta<typeof HoverPetAvatar>

export default meta
type Story = StoryObj<typeof meta>

/** Con foto: el avatar la muestra en miniatura. */
export const WithPhoto: Story = {
  args: {
    src: max.image,
    name: max.name,
  },
}

/**
 * Popover abierto con `play`: se ve la foto real ampliada (176px).
 * El popover se monta en un portal, así que se consulta sobre `document.body`.
 */
export const PopoverWithPhoto: Story = {
  args: {
    src: rocky.image,
    name: rocky.name,
  },
  play: async ({ canvas }) => {
    await userEvent.hover(canvas.getByRole('button'))

    await expect(await within(document.body).findByText(rocky.name)).toBeTruthy()
  },
}

/** Sin foto: cae al fallback de iniciales en el avatar y a la huella 🐾 en el popover. */
export const WithoutPhoto: Story = {
  args: {
    name: luna.name,
  },
}

/** Nombre largo: valida el truncado dentro del popover de 176px. */
export const LongName: Story = {
  args: {
    src: max.image,
    name: 'Rocky Balboa de la Casa Restrepo Villalobos',
  },
}

/** Varias mascotas seguidas, como aparecen en los ítems de `PetSelector`. */
export const InsideList: Story = {
  args: {
    src: nala.image,
    name: nala.name,
  },
  render: (args) => (
    <ul className="w-72 divide-y divide-border rounded-xl border border-border bg-background">
      {[max, luna, rocky, nala].map((pet) => (
        <li key={pet.id} className="flex items-center gap-2 px-3 py-2 text-sm">
          <HoverPetAvatar name={pet.name} src={pet.image} />
          <span className="truncate">
            {pet.name} · {pet.species}
          </span>
        </li>
      ))}
      <li className="flex items-center gap-2 px-3 py-2 text-sm">
        <HoverPetAvatar name={args.name} />
        <span className="truncate">{args.name} (sin foto)</span>
      </li>
    </ul>
  ),
}

/** Variante oscura del avatar y del popover. */
export const DarkTheme: Story = {
  args: {
    src: max.image,
    name: max.name,
  },
  parameters: {
    theme: 'dark',
  },
}
