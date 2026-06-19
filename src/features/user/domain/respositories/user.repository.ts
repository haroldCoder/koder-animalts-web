import { UserEntity } from "../entities";

export interface UserRepository {
    getUser(userId: string): Promise<UserEntity | null>;
}
