import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpSelectUserRepository } from "@/features/select-user/infrastructure/http";
import { SelectVeterinaryUseCase } from "../use-cases";

const selectUserRepository = new HttpSelectUserRepository();
const selectVeterinaryUseCase = new SelectVeterinaryUseCase(selectUserRepository);

export const useSelectVeterinary = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, clinicId, phone, speciality }: { userId: string; clinicId: string; phone: string; speciality?: string }) => {
            return selectVeterinaryUseCase.execute(userId, clinicId, phone, speciality);
        },
        onSuccess: (_, { userId }) => {
            queryClient.invalidateQueries({ queryKey: ["user", userId] });
        }
    });
};
