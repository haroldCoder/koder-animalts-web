import { CreateDocumentParams, DocumentRepository } from "../../domain/repositories";
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
      };
    });
  }

  async uploadDocument(params: CreateDocumentParams): Promise<DocumentEntity> {
    const formData = new FormData();
    formData.append("title", params.title);
    formData.append("file", params.file);
    if (params.category) formData.append("category", params.category);
    if (params.petId) formData.append("petId", params.petId);
    if (params.clinicId) formData.append("clinicId", params.clinicId);
    if (params.medicalRecordId) formData.append("medicalRecordId", params.medicalRecordId);
    if (params.veterinarianId) formData.append("veterinarianId", params.veterinarianId);
    if (params.ownerReadable !== undefined) {
      formData.append("ownerReadable", String(params.ownerReadable));
    }

    const response = await apiClient.post<any>("/document/register", {
      body: formData,
    });

    const doc = response.data;
    return {
      id: doc?.id || "",
      name: doc?.title || params.title,
      veterinarian: doc?.medicalRecord?.veterinarian?.user?.name || "",
      date: doc?.createdAt ? new Date(doc.createdAt) : new Date(),
      petName: doc?.medicalRecord?.pet?.name || "",
      fileUrl: doc?.fileUrl || "",
      type: (doc?.fileType || params.category || "PDF") as CategoryDocument,
      size: doc?.fileSize || params.file.size,
    };
  }
}