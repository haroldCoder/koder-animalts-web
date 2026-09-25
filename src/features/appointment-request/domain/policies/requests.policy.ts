import { UserRole } from "@/features/user";

export class RequestPolicy {
    static canViewRequests(userRole: UserRole): boolean {
        return userRole === UserRole.veterinary;
    }
}