import { Button } from "@/components/ui/button";
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
                <span className=" font-bold">{vaccination.name}</span>
            )
        }
    },
    {
        accessorKey: "date",
        header: "Fecha",
    },
    {
        accessorKey: "nextDate",
        header: "Próxima Fecha",
    },
    {
        accessorKey: "lotNumber",
        header: "Número LOT",
    },
    {
        accessorKey: "medicalRecordId",
        header: "Cita",
        cell: ({ row }) => {
            const vaccination = row.original
            if (vaccination.medicalRecordId) return <ButtonRedirectMedicalRecord medicalRecordId={vaccination.medicalRecordId} />
        }
    },
    {
        accessorKey: "petName",
        header: "Mascota",
    },
];
