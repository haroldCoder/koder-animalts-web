import { DocumentEntity, QueriesDocumentEntity } from "../entities";

export interface DocumentRepository {
    getDocumentsByUserId(userId: string, queries: QueriesDocumentEntity): Promise<DocumentEntity[]>
}