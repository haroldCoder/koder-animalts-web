import { Activity } from "lucide-react"

interface NotFoundVaccinationsProps {
    createVaccinationDialog?: () => React.ReactNode;
    description?: string;
}

export const NotFoundVaccinations = ({ createVaccinationDialog, description }: NotFoundVaccinationsProps) => {
    return (
        <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 bg-main/10 rounded-full flex items-center justify-center mb-6">
                <Activity className="w-10 h-10 text-main opacity-80" />
            </div>
            <h3 className="text-xl font-bold mb-2">No hay vacunas registradas</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">{description}</p>
            {createVaccinationDialog && createVaccinationDialog()}
        </div>
    )
}
