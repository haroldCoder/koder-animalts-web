import { useMutation } from "@tanstack/react-query";
import { HttpAuthRepository } from "@/features/auth/infrastructure/http/http-auth.repository";
import { AuthResponseDto } from "@/features/auth/domain/entities";
import { UserRole } from "@/features/user";

export interface RegisterOwnerMutationParams {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    image?: string | null;
}

const httpAuthRepository = new HttpAuthRepository();

export const useRegisterOwnerMutation = () => {
    return useMutation<AuthResponseDto, Error, RegisterOwnerMutationParams>({
        mutationFn: async ({ name, email, password, phone, address, image }) => {
            return await httpAuthRepository.signup(
                email,
                password,
                name,
                image,
                UserRole.owner,
                phone,
                address
            );
        },
    });
};
