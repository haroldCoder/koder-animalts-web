import { DocumentEntity, QueriesDocumentEntity } from "../../domain/entities";
import { DocumentRepository } from "../../domain/repositories";

export class GetDocumentsByUserIdUseCase {
  constructor(private readonly documentRepository: DocumentRepository) { }

  async execute(userId: string, queries: QueriesDocumentEntity): Promise<DocumentEntity[]> {
    return this.documentRepository.getDocumentsByUserId(userId, queries);
  }
}
