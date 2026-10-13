import { HttpAuthRepository } from "@/features/auth/infrastructure/http/http-auth.repository";
import { LoginUseCase } from "../use-cases";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authSessionStorage } from "../../infrastructure/storage";
import { AuthResponseDto } from "../../domain/entities";

const authRepository = new HttpAuthRepository();
const loginUseCase = new LoginUseCase(authRepository);

export const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponseDto, Error, { email: string; password: string }>({
    mutationFn: ({ email, password }) => {
      return loginUseCase.execute(email, password);
    },
    onSuccess: (response) => {
      if (response?.data?.accessToken && response?.data?.user) {
        authSessionStorage.saveSession(
          response.data.accessToken,
          response.data.refreshToken,
          response.data.user
        );
        queryClient.clear();
      }
    },
  });
};