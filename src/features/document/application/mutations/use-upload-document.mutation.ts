import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpDocumentRepository } from "../../infrastructure/http";
import { UploadDocumentUseCase } from "../use-cases";
import { CreateDocumentParams } from "../../domain/repositories";

const httpDocumentRepository = new HttpDocumentRepository();
const uploadDocumentUseCase = new UploadDocumentUseCase(httpDocumentRepository);

export const useUploadDocumentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateDocumentParams) =>
      uploadDocumentUseCase.execute(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["document"],
      });
    },
  });
};
