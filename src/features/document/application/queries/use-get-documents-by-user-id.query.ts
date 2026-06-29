import { useQuery } from "@tanstack/react-query";
import { HttpDocumentRepository } from "../../infrastructure/http";
import { GetDocumentsByUserIdUseCase } from "../use-cases";
import { DocumentEntity, QueriesDocumentEntity } from "../../domain/entities";

const documentRepository = new HttpDocumentRepository();
const getDocumentsByUserIdUseCase = new GetDocumentsByUserIdUseCase(documentRepository);

export const useGetDocumentsByUserId = (userId: string, queries: QueriesDocumentEntity) => {
  return useQuery<DocumentEntity[], Error>({
    queryKey: ["documents", "user", userId, queries],
    queryFn: () => getDocumentsByUserIdUseCase.execute(userId, queries),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};
