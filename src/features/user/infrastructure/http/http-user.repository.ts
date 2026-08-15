import { apiClient } from "@/common/infrastructure/http/api-client";
import { UserEntity } from "../../domain/entities";
import { UserRepository } from "../../domain/respositories";
import { UserTypeResponseDto } from "../dtos";

export class HttpUserRepository implements UserRepository {
    async getUser(userId: string): Promise<UserEntity | null> {
        try {
            const response = await apiClient.get<UserTypeResponseDto>(`/users/${userId}/role`);
            return response.data.user;
        } catch (error) {
            const err = error as { statusCode?: number; message?: string };
            if (err.statusCode === 400 || err.statusCode === 404) {
                return null;
            }
            console.error('Error fetching user info:', error);
            throw error;
        }
    }
}
