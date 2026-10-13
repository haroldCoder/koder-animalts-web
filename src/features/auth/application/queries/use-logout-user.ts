import { HttpAuthRepository } from "@/features/auth/infrastructure/http/http-auth.repository";
import { LogoutUseCase } from "../use-cases";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const authRepository = new HttpAuthRepository();
const logoutUseCase = new LogoutUseCase(authRepository);

export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => logoutUseCase.execute(),
    onSettled: () => {
      queryClient.clear();
      navigate("/auth");
    },
  });
};
