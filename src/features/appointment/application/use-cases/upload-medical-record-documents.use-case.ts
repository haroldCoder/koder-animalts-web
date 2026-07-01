import { IAppointmentRepository } from "../../domain/repositories";

export class UploadMedicalRecordDocumentsUseCase {
    constructor(private readonly appointmentRepository: IAppointmentRepository) { }

    async execute(id: string, files: File[]): Promise<void> {
        try {
            if (!id) throw new Error("El id del registro médico es requerido");
            if (!files || files.length === 0) throw new Error("Debe seleccionar al menos un archivo");

            return await this.appointmentRepository.uploadDocuments(id, files);
        } catch (error) {
            console.error('Error in UploadMedicalRecordDocumentsUseCase:', error);
            throw error;
        }
    }
}
