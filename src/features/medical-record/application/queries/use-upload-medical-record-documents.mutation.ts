import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpMedicalRecordRepository } from "../../infrastructure/http";
import { UploadMedicalRecordDocumentsUseCase } from "../use-cases";

const httpMedicalRecordRepository = new HttpMedicalRecordRepository();
const uploadMedicalRecordDocumentsUseCase = new UploadMedicalRecordDocumentsUseCase(httpMedicalRecordRepository);

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
