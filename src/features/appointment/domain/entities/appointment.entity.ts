export interface AppointmentEntity {
    id: string,
    nextDate: Date,
    vaccineName: string,
    dateAdministered: Date,
    lotNumber: string,
    petName: string,
    veterinaryName: string,
}