import { UserEntity } from "../../domain";

export interface UserTypeResponseDto {
    statusCode: number;
    data: {
        user: UserEntity,
        userType: string
    };
}