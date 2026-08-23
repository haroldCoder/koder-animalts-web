import { VaccinationEntity } from "../../domain/entities";
import { ColumnDef } from "@tanstack/react-table";
import { ButtonRedirectMedicalRecord } from "../components";

export const columnsTable: ColumnDef<VaccinationEntity>[] = [
    {
        accessorKey: "name",
        header: "Vacuna",
        cell: ({ row }) => {
            const vaccination = row.original
            return (
                <span className="font-bold text-main">{vaccination.name}</span>
            )
        }
    },
    {
        accessorKey: "date",
        header: "Fecha",
        cell: ({ row }) => {
            return (
                <span className="text-gray-600 dark:text-gray-300 font-medium">
                    {row.original.date.toString()}
                </span>
            )
        }
    },
    {
        accessorKey: "nextDate",
        header: "Próxima Fecha",
        cell: ({ row }) => {
            const nextDate = row.original.nextDate;
            const isMissing = nextDate === "-";
            return (
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${isMissing ? 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400' : 'bg-main/10 text-main border border-main/20'}`}>
                    {nextDate?.toString()}
                </span>
            )
        }
    },
    {
        accessorKey: "lotNumber",
        header: "Número LOT",
        cell: ({ row }) => {
            return (
                <span className="font-mono text-xs text-gray-500">
                    {row.original.lotNumber}
                </span>
            )
        }
    },
    {
        accessorKey: "medicalRecordId",
        header: "Historial Médico",
        cell: ({ row }) => {
            const vaccination = row.original
            if (vaccination.medicalRecordId) return <ButtonRedirectMedicalRecord medicalRecordId={vaccination.medicalRecordId} />
            return <span className="text-gray-400">-</span>
        }
    },
    {
        accessorKey: "petName",
        header: "Mascota",
        cell: ({ row }) => (
            <span className="font-semibold">{row.original.petName}</span>
        )
    },
];
