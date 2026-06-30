export interface DocumentResponseDto {
    statusCode: number;
    message: string;
    data: Array<{
        id: string;
        title: string;
        fileUrl: string;
        fileKey: string | null;
        fileSize: number | null;
        fileType: string | null;
        category: string | null;
        petId: string | null;
        clinicId: string | null;
        medicalRecordId: string | null;
        createdAt: Date;
        medicalRecord: {
            pet: {
                name: string;
            },
            veterinarian: {
                user: {
                    name: string;
                }
            }
        }
    }>
}