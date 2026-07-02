import { VaccinationEntity } from "../../domain/entities";
import { ColumnDef } from "@tanstack/react-table";

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
        accessorKey: "iotNumber",
        header: "Número IOT",
    },
    {
        accessorKey: "medicalRecordName",
        header: "Expediente",
    },
    {
        accessorKey: "petName",
        header: "Mascota",
    },
];
