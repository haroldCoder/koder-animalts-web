import { FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyFiltersProps {
    handleClearFilters: () => void;
    hasActiveFilters: boolean;
}

export const EmptyFilters = ({ handleClearFilters, hasActiveFilters }: EmptyFiltersProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed rounded-xl bg-muted/10">
            <FileText className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-foreground">No se encontraron documentos</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                Intenta cambiar los filtros o el término de búsqueda para encontrar lo que necesitas.
            </p>
            {hasActiveFilters && (
                <Button variant="outline" size="sm" onClick={handleClearFilters} className="mt-4">
                    Restablecer filtros
                </Button>
            )}
        </div>
    )
}