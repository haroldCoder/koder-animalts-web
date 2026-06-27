export interface DocumentEntity {
    id: string;
    name: string;
    veterinarian: string;
    date: Date;
    petName: string;
    fileUrl: string;
    type: 'PDF' | 'Imagen' | 'Receta' | 'Resultado';
    size: string;
}