import { HttpAuthRepository } from "@/features/auth/infrastructure/http/http-auth.repository";
import { SignupUseCase } from "../use-cases";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authSessionStorage } from "../../infrastructure/storage";
import { AuthResponseDto } from "../../domain/entities";

const authRepository = new HttpAuthRepository();
const signupUseCase = new SignupUseCase(authRepository);

export interface SignupMutationParams {
  email: string;
  password: string;
  name: string;
  image: string | File | null;
  role?: string;
  phone?: string;
  address?: string;
  clinicId?: string;
  specialty?: string;
}

export const useSignupUsers = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponseDto, Error, SignupMutationParams>({
    mutationFn: ({
      email,
      password,
      name,
      image,
      role,
      phone,
      address,
      clinicId,
      specialty,
    }) => {
      return signupUseCase.execute(
        email,
        password,
        name,
        image,
        role,
        phone,
        address,
        clinicId,
        specialty
      );
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