import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppointmentPopUp } from './appointment-pop-up'
import { AppointmentDataDto } from '../../domain/dtos'
import { AppointmentStatusEnum } from '../../domain/enums'
import { MainLayoutContext } from '@/common/presentation/layout'
import { UserRole } from '@/features/user/domain/enums'
import { Dialog } from '@/components/ui/dialog'

const mockVetUser = {
  name: 'Dr. Carlos Mendoza',
  email: 'carlos.mendoza@koderanimalts.com',
  role: UserRole.veterinary,
}

const mockOwnerUser = {
  name: 'Laura Gómez',
  email: 'laura.gomez@gmail.com',
  role: UserRole.owner,
}

const baseAppointment: AppointmentDataDto = {
  id: 'appt-test-101',
  date: new Date('2026-10-24T15:30:00.000Z'),
  reason: 'Consulta de control dermatológico y vacunación anual',
  status: AppointmentStatusEnum.SCHEDULED,
  petId: 'pet-001',
  petName: 'Max',
  petPhoto: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=300&q=80',
  veterinarianId: 'vet-001',
  veterinarianName: 'Dr. Carlos Mendoza',
  clinicName: 'Clínica Veterinaria Central',
  ownerName: 'Laura Gómez',
  notes: 'El paciente se encuentra en buen estado general.',
}

const meta: Meta<typeof AppointmentPopUp> = {
  title: 'Features/Appointment/AppointmentPopUp',
  component: AppointmentPopUp,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <MainLayoutContext.Provider value={{ user: mockVetUser }}>
        <Dialog open={true}>
          <Story />
        </Dialog>
      </MainLayoutContext.Provider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof AppointmentPopUp>

/**
 * Caso habitual: Notas cortas de 1 o 2 oraciones.
 */
export const ShortNotes: Story = {
  args: {
    appointment: {
      ...baseAppointment,
      notes: 'Paciente alerta y responsivo. Se administra refuerzo de vacuna séxtuple sin complicaciones inmediatas.',
    },
  },
}

/**
 * Caso crítico: Notas muy extensas (más de 350 palabras y múltiples párrafos).
 * Permite evaluar si el contenido desborda la altura de la pantalla (100vh)
 * y si oculta o empuja los botones inferiores de "Cancelar cita" / "Marcar como completada".
 */
export const VeryLongNotesMultiParagraph: Story = {
  args: {
    appointment: {
      ...baseAppointment,
      notes: `Historial detallado de la consulta:
El paciente ingresa a consulta presentando prurito intenso en la zona dorsal y extremidades anteriores desde hace aproximadamente dos semanas. El tutor refiere que ha observado lamido constante en los espacios interdigitales y pérdida localizada de pelo. 

Durante el examen físico general se constatan constantes vitales dentro de rangos normales: temperatura 38.6°C, frecuencia cardíaca 95 lpm, mucosas rosadas con tiempo de llenado capilar menor a 2 segundos. A la inspección dermatológica se evidencian lesiones eritematosas papulares con costras secundarias a rascado traumático en región lumbo-sacra. Se toma raspado cutáneo y citología por cinta adhesiva revelando presencia moderada de Malassezia spp. y bacterias cocáceas compatibles con pioderma superficial secundario.

Plan terapéutico indicado:
1. Baños medicados con champú de clorhexidina al 3% y ketoconazol al 2% dos veces por semana durante 4 semanas continuas, dejando actuar el producto durante al menos 10 minutos antes del enjuague abundante.
2. Tratamiento sistémico con oclacitinib 5.4 mg cada 12 horas por 14 días, reduciendo posteriormente a una dosis diaria por 14 días adicionales según respuesta clínica.
3. Transición estricta a dieta hipoalergénica de proteína hidrolizada durante mínimo 8 semanas para descartar dermatitis atópica o hipersensibilidad alimentaria. Se instruye expresamente al tutor de no administrar premios, golosinas caseras ni sobras de mesa.

Próximo control programado en 21 días para evaluación de lesiones y respuesta terapéutica. Si el prurito empeora o se observa inflamación auricular con exudado, acudir de inmediato a urgencias.`,
    },
  },
}

/**
 * Caso de desbordamiento horizontal: Cadena continua sin espacios ni saltos de línea (ej. URL larga o token).
 * Permite verificar si la etiqueta <p> colapsa el ancho del modal de 425px.
 */
export const UnbrokenLongWordNotes: Story = {
  args: {
    appointment: {
      ...baseAppointment,
      notes:
        'https://veterinary-records.internal.koderanimalts.com/diagnostic-reports/full-analysis-results-archive-2026-pet-id-001-sample-99887766554433221100-laboratory-pathology-specimen-eval.pdf?session_token=abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ_VERY_LONG_STRING_WITHOUT_SPACES',
    },
  },
}

/**
 * Caso con saltos de línea y viñetas para verificar formato legible.
 */
export const NotesWithLineBreaks: Story = {
  args: {
    appointment: {
      ...baseAppointment,
      notes: `Instrucciones post-operatorias:
- Ayuno de agua y comida por 4 horas más.
- Mantener collar isabelino 24/7.
- Aplicar spray antiséptico cada 12 horas en la herida.
- Meloxicam 0.5 ml vía oral cada 24 horas por 3 días.
- Retiro de puntos en 10 días hábiles.`,
    },
  },
}

/**
 * Caso sin notas: Evalúa el renderizado cuando `notes` es undefined.
 */
export const WithoutNotes: Story = {
  args: {
    appointment: {
      ...baseAppointment,
      notes: undefined,
    },
  },
}

/**
 * Caso con rol de Dueño (Owner): Permite validar cómo se ven las acciones para el cliente vs veterinario.
 */
export const AsOwnerUser: Story = {
  decorators: [
    (Story) => (
      <MainLayoutContext.Provider value={{ user: mockOwnerUser }}>
        <Dialog open={true}>
          <Story />
        </Dialog>
      </MainLayoutContext.Provider>
    ),
  ],
  args: {
    appointment: {
      ...baseAppointment,
      notes: 'Notas visibles para el dueño: Recordar traer la cartilla de vacunación física en la próxima visita.',
    },
  },
}
