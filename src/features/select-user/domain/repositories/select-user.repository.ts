export interface ISelectUserRepository {
    selectOwner(userId: string, phone: string, address: string): Promise<void>;
    selectVeterinary(userId: string, clinicId: string, phone: string, speciality?: string): Promise<void>;
}