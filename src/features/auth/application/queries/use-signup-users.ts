import { HttpAuthRepository } from "@/features/auth/infrastructure/http/http-auth.repository";
import { SignupUseCase } from "../use-cases";
import { useMutation } from "@tanstack/react-query";
import { SignupResponseEntity } from "../../infrastructure/entities";

const authRepository = new HttpAuthRepository();
const signupUseCase = new SignupUseCase(authRepository);

export const useSignupUsers = () => {
    return useMutation({
        mutationFn: ({ email, password, name, image }: { email: string, password: string, name: string, image: string | File | null }) => {
            return signupUseCase.execute(email, password, name, image);
        },
        onSuccess: (data: SignupResponseEntity) => {
            localStorage.setItem('user', JSON.stringify(data.data));
        }
    });
}