import { useMutation } from "@tanstack/react-query";
import { HttpSelectUserRepository } from "@/features/select-user/infrastructure/http";
import { SelectOwnerUseCase } from "../use-cases";

const selectUserRepository = new HttpSelectUserRepository();
const selectOwnerUseCase = new SelectOwnerUseCase(selectUserRepository);

export const useSelectOwner = () => {
    return useMutation({
        mutationFn: ({ userId, phone, address }: { userId: string; phone: string; address: string }) => {
            return selectOwnerUseCase.execute(userId, phone, address);
        },
    });
};
