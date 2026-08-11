import { RotateCcwIcon } from "lucide-react"

export const AppointmentLastVisitEmpty = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-3 text-text-2 text-base">
            <RotateCcwIcon size={40} />
            <span className="font-medium">¡No hay visitas anteriores!</span>
        </div>
    )
}