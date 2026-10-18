import { DocumentEntity, QueriesDocumentEntity } from "../entities";
import { CategoryDocument } from "../types";

export interface CreateDocumentParams {
    title: string;
    category?: CategoryDocument | string;
    file: File;
    petId?: string;
    clinicId?: string;
    medicalRecordId?: string;
    veterinarianId?: string;
    ownerReadable?: boolean;
}

export interface DocumentRepository {
    getDocumentsByUserId(userId: string, queries: QueriesDocumentEntity): Promise<DocumentEntity[]>;
    uploadDocument(params: CreateDocumentParams): Promise<DocumentEntity>;
}