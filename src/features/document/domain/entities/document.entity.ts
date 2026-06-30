import { CategoryDocument } from "../types";

export interface DocumentEntity {
    id: string;
    name: string;
    veterinarian: string;
    date: Date;
    petName: string;
    fileUrl: string;
    type: CategoryDocument;
    size: number;
}