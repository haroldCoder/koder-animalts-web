import { DocumentEntity } from "../../domain/entities";
import { CreateDocumentParams, DocumentRepository } from "../../domain/repositories";

export class UploadDocumentUseCase {
  constructor(private readonly documentRepository: DocumentRepository) {}

  async execute(params: CreateDocumentParams): Promise<DocumentEntity> {
    return this.documentRepository.uploadDocument(params);
  }
}
