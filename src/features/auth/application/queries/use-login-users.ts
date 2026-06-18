import { HttpAuthRepository } from "@/features/auth/infrastructure/http/http-auth.repository";
import { LoginUseCase } from "../use-cases";
import { useMutation } from "@tanstack/react-query";
import { LoginResponseEntity } from "../../infrastructure/entities";

const authRepository = new HttpAuthRepository();
const loginUseCase = new LoginUseCase(authRepository);

export const useLoginUser = () => {
    return useMutation({
        mutationFn: ({ email, password }: { email: string, password: string }) => {
            return loginUseCase.execute(email, password);
        },
        onSuccess: (data: LoginResponseEntity) => {
            localStorage.setItem('user', JSON.stringify(data.data));
        }
    });
}