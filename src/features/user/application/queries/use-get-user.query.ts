import { useQuery } from "@tanstack/react-query";
import { HttpUserRepository } from "../../infrastructure/http";
import { GetUserUseCase } from "../use-cases";
import { UserEntity } from "../../domain/entities";

const userRepository = new HttpUserRepository();
const getUserUseCase = new GetUserUseCase(userRepository);

export const useGetUser = (userId: string | undefined) => {
    return useQuery<UserEntity | null, Error>({
        queryKey: ["user", userId],
        queryFn: () => getUserUseCase.execute(userId!),
        enabled: !!userId,
    });
};
