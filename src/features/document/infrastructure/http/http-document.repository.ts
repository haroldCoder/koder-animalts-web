import { DocumentRepository } from "../../domain/repositories";
import { apiClient } from "@/common";
import { DocumentEntity, QueriesDocumentEntity } from "../../domain/entities";
import { DocumentResponseDto } from "../dtos";
import { CategoryDocument } from "../../domain/types";

export class HttpDocumentRepository implements DocumentRepository {

  async getDocumentsByUserId(userId: string, queries: QueriesDocumentEntity): Promise<DocumentEntity[]> {
    const response = await apiClient.get<DocumentResponseDto>(`/document/user/${userId}`, {
      params: {
        startDate: queries.startDate?.toISOString() ?? "",
        endDate: queries.endDate?.toISOString() ?? "",
        documentName: queries.documentName ?? "",
        veterinarianName: queries.veterinarianName ?? "",
        medicalRecordId: queries.medicalRecordId ?? "",
      }
    });
    return response.data.map((document) => {
      return {
        fileUrl: document.fileUrl,
        id: document.id,
        createdAt: document.createdAt,
        name: document.title,
        veterinarian: document.medicalRecord?.veterinarian.user.name ?? "",
        petName: document.medicalRecord?.pet.name ?? "",
        date: document.createdAt,
        size: document.fileSize ?? 0,
        type: document.fileType as CategoryDocument,
      }
    });
  }
}