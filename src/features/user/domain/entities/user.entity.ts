import { UserRole } from "../enums";

export interface UserEntity {
    name: string;
    email: string;
    role: UserRole;
    image: string;
}
