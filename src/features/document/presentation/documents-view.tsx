import { useState, useMemo } from 'react'
import { startOfDay, endOfDay } from 'date-fns'
import {
    FileText,
    User,
    X,
    Search,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { mockDocuments } from './data'
import { AppliedFilter, CardDocument, DatePicker, EmptyFilters } from './components'


export const DocumentsView = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [appliedDocumentName, setAppliedDocumentName] = useState("")
    const [appliedVeterinarianName, setAppliedVeterinarianName] = useState("")
    const [startDate, setStartDate] = useState<Date | undefined>()
    const [endDate, setEndDate] = useState<Date | undefined>()

    const filteredDocuments = useMemo(() => {
        return mockDocuments.filter(doc => {
            if (appliedDocumentName && !doc.name.toLowerCase().includes(appliedDocumentName.toLowerCase())) {
                return false
            }
            if (appliedVeterinarianName && !doc.veterinarian.toLowerCase().includes(appliedVeterinarianName.toLowerCase())) {
                return false
            }
            if (startDate && doc.date < startOfDay(startDate)) {
                return false
            }
            if (endDate && doc.date > endOfDay(endDate)) {
                return false
            }
            return true
        })
    }, [appliedDocumentName, appliedVeterinarianName, startDate, endDate])

    const hasActiveFilters = !!(appliedDocumentName || appliedVeterinarianName || startDate || endDate || searchQuery)

    const handleClearFilters = () => {
        setSearchQuery("")
        setAppliedDocumentName("")
        setAppliedVeterinarianName("")
        setStartDate(undefined)
        setEndDate(undefined)
    }

    return (
        <div className="w-full flex flex-col gap-6 p-6">
            {/* Header / Title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
                <div className="w-full sm:w-1/2">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Documentos Médicos</h1>
                    <p className="text-sm mt-2 text-muted-foreground">Aqui puedes buscar los documentos de tus mascotas, por nombre de documeto o veterinario, y/o tambien puedes filtrar por fecha.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 md:justify-end">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-60">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Buscar..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 h-9 w-full bg-background"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        setAppliedDocumentName(searchQuery)
                                        setAppliedVeterinarianName("")
                                    }
                                }}
                            />
                        </div>
                        <Button
                            variant={appliedDocumentName ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                                setAppliedDocumentName(searchQuery)
                                setAppliedVeterinarianName("")
                            }}
                            className="h-9 gap-1.5 cursor-pointer"
                        >
                            <FileText className="h-4 w-4" />
                            <span className="hidden sm:inline">Doc</span>
                        </Button>
                        <Button
                            variant={appliedVeterinarianName ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                                setAppliedVeterinarianName(searchQuery)
                                setAppliedDocumentName("")
                            }}
                            className="h-9 gap-1.5 cursor-pointer"
                        >
                            <User className="h-4 w-4" />
                            <span className="hidden sm:inline">Vet</span>
                        </Button>
                    </div>

                    <DatePicker
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                    />

                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClearFilters}
                            className="h-9 gap-1.5 text-muted-foreground hover:text-foreground cursor-pointer"
                        >
                            <X className="h-4 w-4" />
                            <span>Limpiar</span>
                        </Button>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {(appliedDocumentName || appliedVeterinarianName || startDate || endDate) && (
                    <AppliedFilter
                        appliedDocumentName={appliedDocumentName}
                        setAppliedDocumentName={setAppliedDocumentName}
                        appliedVeterinarianName={appliedVeterinarianName}
                        setAppliedVeterinarianName={setAppliedVeterinarianName}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                    />
                )}

                {filteredDocuments.length === 0 ? (
                    <EmptyFilters handleClearFilters={handleClearFilters} hasActiveFilters={hasActiveFilters} />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredDocuments.map((doc) => (
                            <CardDocument key={doc.id} documentFile={doc} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}