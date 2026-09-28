import { UserRole } from "@/features/user";

export class RequestPolicy {
    static canModifyRequest(userRole: UserRole): boolean {
        return userRole === UserRole.veterinary;
    }

    static isCurrentVeterinary(currentVeterinary: boolean, userRole: UserRole): boolean {
        return currentVeterinary && userRole === UserRole.veterinary;
    }

    static canFilterStatus(userRole: UserRole): boolean {
        return userRole === UserRole.owner;
    }
}