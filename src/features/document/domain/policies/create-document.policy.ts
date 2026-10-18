import { UserRole } from "@/features/user";

export class CreateDocumentPolicy {
    canCreateDocument(userRole: UserRole): boolean {
        return userRole === UserRole.veterinary;
    }
}