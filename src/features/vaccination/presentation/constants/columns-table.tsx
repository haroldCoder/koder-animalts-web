import { VaccinationEntity } from "../../domain/entities";
import { ColumnDef } from "@tanstack/react-table";
import { ButtonRedirectMedicalRecord, UpdateStatus } from "../components";
import { extractHourFromDate } from "@/common/utils";
import { FormatDate } from "@/common/utils/format-date";
import { getStatusLabel } from "../utils";

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
            const vaccination = row.original;
            const isMissing = vaccination.date === "-";

            return (
                <span className="text-gray-600 dark:text-gray-300 font-medium">
                    {FormatDate.format(new Date(vaccination.date), "dd/MM/yyyy")} {isMissing ? "" : "- " + extractHourFromDate(new Date(vaccination.date))}
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
                    {isMissing ? "-" : FormatDate.format(new Date(nextDate!), "dd/MM/yyyy")} {isMissing ? "" : "- " + extractHourFromDate(new Date(nextDate as string))}
                </span>
            )
        }
    },
    {
        accessorKey: "lotNumber",
        header: "Número LOT",
        cell: ({ row }) => {
            const lotNumber = row.original.lotNumber;
            return (
                <span className="font-mono text-xs text-gray-500">
                    {lotNumber || "-"}
                </span>
            )
        }
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => {
            const vaccination = row.original;
            const { label, color } = getStatusLabel(vaccination.status)
            return (
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${color}`}>
                    {label}
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
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            const vaccination = row.original
            return (
                <div className="flex gap-2">
                    <UpdateStatus id={vaccination.id} currentStatus={vaccination.status} />
                </div>
            )
        }
    }
];
