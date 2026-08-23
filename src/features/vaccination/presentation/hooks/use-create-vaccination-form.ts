import { useForm } from "react-hook-form";
import { CreateVaccinationEntity } from "../../domain/entities";

interface CreateVaccinationFormValues {
    vaccineName: string;
    petId: string;
    medicalRecordId: string;
    dateAdministered: string;
    nextDueDate: string;
    lotNumber: string;
    userId: string;
}

export const useCreateVaccinationForm = () => {
    const form = useForm<CreateVaccinationFormValues>({
        defaultValues: {
            vaccineName: "",
            petId: "",
            medicalRecordId: "",
            dateAdministered: "",
            nextDueDate: "",
            lotNumber: "",
            userId: ""
        },
    });

    const { register, handleSubmit: rawHandleSubmit, control, formState: { errors }, watch } = form;

    const handleSubmit = (onSubmit: (data: CreateVaccinationEntity) => void) => {
        return rawHandleSubmit((data) => {
            const vaccination: CreateVaccinationEntity = {
                vaccineName: data.vaccineName,
                medicalRecordId: data.medicalRecordId,
                dateAdministered: data.dateAdministered,
                nextDueDate: data.nextDueDate,
                lotNumber: data.lotNumber,
                userId: data.userId
            };
            onSubmit(vaccination);
        });
    };

    return { form, register, handleSubmit, control, errors, watch };
}