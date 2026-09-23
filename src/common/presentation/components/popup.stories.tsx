import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Popup } from './popup'

interface PopupDemoProps {
  title?: string
  isClosable?: boolean
  children?: ReactNode
}

/**
 * `Popup` es un componente controlado (`isOpen` + `onClose`), así que la story
 * necesita un contenedor con estado para poder abrirlo y cerrarlo de verdad.
 */
const PopupDemo = ({ title, isClosable, children }: PopupDemoProps) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={() => setIsOpen(true)}>Abrir popup</Button>

      <Popup isOpen={isOpen} onClose={() => setIsOpen(false)} title={title} isClosable={isClosable}>
        {children}
      </Popup>
    </div>
  )
}

/**
 * Modal propio del proyecto: portal a `document.body`, bloqueo del scroll de
 * fondo, cierre con la X o clic en el backdrop. `CardDocument` y
 * `MedicalRecordSucess` lo reutilizan.
 */
const meta = {
  title: 'Common/Popup',
  component: PopupDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Se renderiza en un portal y bloquea el scroll del body. El contenido va por `children`; si no se pasa `title` muestra "Visualizar".',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    isClosable: { control: 'boolean' },
    children: { control: false },
  },
} satisfies Meta<typeof PopupDemo>

export default meta
type Story = StoryObj<typeof meta>

/** Caso habitual: título propio y contenido corto. */
export const OpenWithTitle: Story = {
  args: {
    title: 'Detalle de la cita',
    children: (
      <p className="text-sm text-muted-foreground">
        Cita de control dermatológico para Max el 24 de octubre a las 10:30 a.m.
      </p>
    ),
  },
}

/** Sin `title`: el encabezado cae al texto por defecto "Visualizar". */
export const DefaultTitle: Story = {
  args: {
    children: (
      <p className="text-sm text-muted-foreground">Documento adjunto del registro médico.</p>
    ),
  },
}

/** `isClosable={false}`: se oculta la X, el único cierre es el backdrop. */
export const WithoutCloseButton: Story = {
  args: {
    title: 'Subiendo documentos',
    isClosable: false,
    children: <p className="text-sm text-muted-foreground">Espera mientras se procesan los archivos.</p>,
  },
}

/**
 * Caso real ya detectado en citas: notas clínicas extensas.
 * Sirve para verificar que el contenido largo no empuje el cierre fuera de vista.
 */
export const LongContent: Story = {
  args: {
    title: 'Notas de la consulta',
    children: (
      <div className="space-y-3 text-sm text-muted-foreground">
        <p>
          El paciente ingresa por prurito intenso en la zona dorsal y extremidades anteriores desde
          hace dos semanas. El tutor refiere lamido constante en los espacios interdigitales.
        </p>
        <p>
          Constantes vitales en rangos normales: temperatura 38.6 °C, frecuencia cardíaca 95 lpm,
          mucosas rosadas con tiempo de llenado capilar menor a 2 segundos. Se evidencian lesiones
          eritematosas papulares con costras secundarias a rascado traumático en región lumbo-sacra.
        </p>
        <p>
          Plan terapéutico: baños medicados con clorhexidina al 3 % dos veces por semana durante
          cuatro semanas, oclacitinib 5.4 mg cada 12 horas por 14 días y transición estricta a dieta
          hipoalergénica de proteína hidrolizada por mínimo 8 semanas.
        </p>
        <p>
          Próximo control en 21 días para evaluar respuesta terapéutica. Si el prurito empeora o hay
          inflamación auricular con exudado, acudir de inmediato a urgencias.
        </p>
      </div>
    ),
  },
}

/** Con `isOpen={false}` no renderiza nada y libera el scroll del body. */
export const Closed: Story = {
  args: {
    title: 'Contenido oculto',
    children: <p>Este contenido no se ve porque el popup está cerrado.</p>,
  },
  render: (args) => (
    <div className="flex flex-col items-center gap-3 text-center">
      <Popup isOpen={false} onClose={() => {}} title={args.title}>
        {args.children}
      </Popup>
      <p className="text-sm text-muted-foreground">
        Story cerrada: el modal no monta nada en el DOM.
      </p>
    </div>
  ),
}
