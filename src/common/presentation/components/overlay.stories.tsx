import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Loading } from './loading'
import { Overlay } from './overlay'

interface OverlayDemoProps {
  children?: ReactNode
  className?: string
}

/**
 * `Overlay` es controlado (`isOpen` + `onClose`), así que la story usa un
 * contenedor con estado para poder abrirlo y cerrarlo.
 */
const OverlayDemo = ({ children, className }: OverlayDemoProps) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={() => setIsOpen(true)}>Abrir overlay</Button>

      <Overlay isOpen={isOpen} onClose={() => setIsOpen(false)} className={className}>
        {children}
      </Overlay>
    </div>
  )
}

/**
 * Capa de bloqueo con backdrop: se usa mientras una acción está en curso.
 * `BackdropMutationPet` y `UpdateStatus` lo montan con un spinner dentro.
 */
const meta = {
  title: 'Common/Overlay',
  component: OverlayDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Portal a `document.body`, bloquea el scroll de fondo y cierra al hacer clic en el backdrop. Solo debe envolver contenido no interactivo mientras hay una operación pendiente.',
      },
    },
  },
  argTypes: {
    className: { control: 'text' },
    children: { control: false },
  },
} satisfies Meta<typeof OverlayDemo>

export default meta
type Story = StoryObj<typeof meta>

/** Caso más común en la app: bloqueo con spinner (crear mascota, cambiar estatus). */
export const WithSpinner: Story = {
  args: {
    children: <Loading color="text-white" className="h-24" />,
  },
}

/** Con un panel que explica la operación en curso. */
export const WithMessage: Story = {
  args: {
    children: (
      <div className="flex flex-col items-center gap-3 rounded-xl bg-background p-6 shadow-xl">
        <Loading />
        <p className="text-sm font-medium text-foreground">Guardando los cambios…</p>
        <p className="text-xs text-muted-foreground">No cierres esta ventana</p>
      </div>
    ),
  },
}

/** `className` permite ajustar el ancho del contenido que se superpone. */
export const CustomClassName: Story = {
  args: {
    className: 'w-[min(90vw,420px)]',
    children: (
      <div className="rounded-xl border border-border bg-background p-5 text-sm text-muted-foreground">
        Panel al 90 % del ancho del viewport, con máximo de 420px.
      </div>
    ),
  },
}

/** Con `isOpen={false}` no monta nada en el DOM. */
export const Closed: Story = {
  args: {
    children: <Loading color="text-white" />,
  },
  render: (args) => (
    <div className="flex flex-col items-center gap-3 text-center">
      <Overlay isOpen={false} onClose={() => {}}>
        {args.children}
      </Overlay>
      <p className="text-sm text-muted-foreground">Story cerrada: el overlay no monta nada.</p>
    </div>
  ),
}
