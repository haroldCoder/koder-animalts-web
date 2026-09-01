import { VaccinationStatus } from "../../domain/enums";

interface GetStatusLabel {
    label: string,
    color: string
}

export const getStatusLabel = (status: VaccinationStatus): GetStatusLabel => {
    switch (status) {
        case VaccinationStatus.DONE:
            return { label: 'Realizada', color: 'bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300' };
        case VaccinationStatus.PENDING:
            return { label: 'Pendiente', color: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400' };
        case VaccinationStatus.CANCELLED:
            return { label: 'Cancelada', color: 'bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-300' };
        default:
            return { label: '-', color: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400' };
    }
}
