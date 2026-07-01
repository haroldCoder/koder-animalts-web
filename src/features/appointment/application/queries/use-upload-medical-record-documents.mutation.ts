import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpAppointmentRepository } from "../../infrastructure/http";
import { UploadMedicalRecordDocumentsUseCase } from "../use-cases";

const httpAppointmentRepository = new HttpAppointmentRepository();
const uploadMedicalRecordDocumentsUseCase = new UploadMedicalRecordDocumentsUseCase(httpAppointmentRepository);

export const useUploadMedicalRecordDocumentsMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ medicalRecordId, files }: { medicalRecordId: string; files: File[] }) =>
            uploadMedicalRecordDocumentsUseCase.execute(medicalRecordId, files),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["appointments"]
            });
        }
    });
};
