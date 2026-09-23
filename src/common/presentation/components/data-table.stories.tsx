import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ColumnDef } from '@tanstack/react-table'
import { fn } from 'storybook/test'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTable } from './data-table'

interface VaccinationRow {
  id: string
  pet: string
  vaccine: string
  appliedAt: string
  status: 'Aplicada' | 'Programada' | 'Cancelada'
}

const rows: VaccinationRow[] = [
  { id: 'vac-1', pet: 'Max', vaccine: 'Séxtuple', appliedAt: '12/09/2026', status: 'Aplicada' },
  { id: 'vac-2', pet: 'Luna', vaccine: 'Antirrábica', appliedAt: '18/09/2026', status: 'Aplicada' },
  { id: 'vac-3', pet: 'Rocky', vaccine: 'Leucemia felina', appliedAt: '24/09/2026', status: 'Programada' },
  { id: 'vac-4', pet: 'Nala', vaccine: 'Tos de las perreras', appliedAt: '24/09/2026', status: 'Cancelada' },
  { id: 'vac-5', pet: 'Simba', vaccine: 'Polivalente', appliedAt: '29/09/2026', status: 'Programada' },
]

const statusVariant: Record<VaccinationRow['status'], 'default' | 'secondary' | 'destructive'> = {
  Aplicada: 'default',
  Programada: 'secondary',
  Cancelada: 'destructive',
}

const columns: ColumnDef<VaccinationRow>[] = [
  { accessorKey: 'pet', header: 'Mascota' },
  { accessorKey: 'vaccine', header: 'Vacuna' },
  { accessorKey: 'appliedAt', header: 'Fecha' },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => (
      <Badge variant={statusVariant[row.original.status]}>{row.original.status}</Badge>
    ),
  },
  {
    id: 'actions',
    cell: () => (
      <Button size="sm" variant="outline">
        Ver historial
      </Button>
    ),
  },
]

/**
 * Tabla genérica sobre TanStack Table. La usan `Vaccination` y la vista de
 * documentos: recibe `columns` y `data` ya construidos por la página,
 * más una paginación opcional.
 */
const meta = {
  title: 'Common/DataTable',
  component: DataTable<VaccinationRow>,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Sin `pagination` no se pinta el pie de la tabla. Con `data` vacío la tabla muestra solo el encabezado: el mensaje de "no hay resultados" lo aporta la página (por ejemplo `NotFoundVaccinations`).',
      },
    },
  },
  argTypes: {
    columns: { control: false },
    data: { control: false },
    styles: { control: 'text' },
    isLoading: { control: 'boolean' },
    pagination: { control: false },
  },
} satisfies Meta<typeof DataTable<VaccinationRow>>

export default meta
type Story = StoryObj<typeof meta>

/** Resultados con paginación en una página intermedia. */
export const WithPagination: Story = {
  args: {
    columns,
    data: rows,
    pagination: {
      total: 42,
      page: 2,
      limit: 5,
      totalPages: 9,
      hasNext: true,
      hasPrev: true,
      onPageChange: fn(),
    },
  },
}

/** Primera página: "Anterior" deshabilitado. */
export const FirstPage: Story = {
  args: {
    columns,
    data: rows,
    pagination: {
      total: 42,
      page: 1,
      limit: 5,
      totalPages: 9,
      hasNext: true,
      hasPrev: false,
      onPageChange: fn(),
    },
  },
}

/** Última página: "Siguiente" deshabilitado y el rango corto (41–42 de 42). */
export const LastPage: Story = {
  args: {
    columns,
    data: rows.slice(0, 2),
    pagination: {
      total: 42,
      page: 9,
      limit: 5,
      totalPages: 9,
      hasNext: false,
      hasPrev: true,
      onPageChange: fn(),
    },
  },
}

/** Muchas páginas: `getPageNumbers` inserta elipsis a ambos lados. */
export const ManyPagesWithEllipsis: Story = {
  args: {
    columns,
    data: rows,
    pagination: {
      total: 120,
      page: 6,
      limit: 10,
      totalPages: 12,
      hasNext: true,
      hasPrev: true,
      onPageChange: fn(),
    },
  },
}

/** Una sola página: sin números adicionales. */
export const SinglePage: Story = {
  args: {
    columns,
    data: rows,
    pagination: {
      total: 5,
      page: 1,
      limit: 10,
      totalPages: 1,
      hasNext: false,
      hasPrev: false,
      onPageChange: fn(),
    },
  },
}

/** Sin paginación: la tabla completa se muestra sin pie. */
export const WithoutPagination: Story = {
  args: {
    columns,
    data: rows,
  },
}

/** Estado de carga: una fila con el spinner ocupa todo el ancho. */
export const Loading: Story = {
  args: {
    columns,
    data: [],
    isLoading: true,
    pagination: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
      hasNext: false,
      hasPrev: false,
      onPageChange: fn(),
    },
  },
}

/** Sin datos: solo se pinta el encabezado. */
export const EmptyData: Story = {
  args: {
    columns,
    data: [],
    pagination: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
      hasNext: false,
      hasPrev: false,
      onPageChange: fn(),
    },
  },
}

/** `styles` se concatena al `className` de la `Table`: sirve para anchos mínimos. */
export const WithCustomStyles: Story = {
  args: {
    columns,
    data: rows,
    styles: 'min-w-[720px]',
  },
}

/** Variante oscura de encabezado, filas y pie de paginación. */
export const DarkTheme: Story = {
  args: {
    columns,
    data: rows,
    pagination: {
      total: 42,
      page: 2,
      limit: 5,
      totalPages: 9,
      hasNext: true,
      hasPrev: true,
      onPageChange: fn(),
    },
  },
  parameters: {
    theme: 'dark',
  },
}
