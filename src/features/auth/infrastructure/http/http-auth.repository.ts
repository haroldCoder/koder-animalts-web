import { apiClient } from "@/common";
import { IAuthRepository } from "../../domain/repositories";
import { LoginResponseEntity, SignupResponseEntity } from "../entities";

export class HttpAuthRepository implements IAuthRepository {
    constructor() { }

    async login(email: string, password: string): Promise<LoginResponseEntity> {
        const response = await apiClient.post<LoginResponseEntity>('/auth/login', {
            body: {
                email,
                password
            }
        });

        return response;
    }

    async signup(email: string, password: string, name: string, image: string | File | null): Promise<SignupResponseEntity> {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('name', name);
        if (image) {
            formData.append('image', image);
        }

        const response = await apiClient.post<SignupResponseEntity>('/auth/signup', {
            body: formData
        });

        return response;
    }
}