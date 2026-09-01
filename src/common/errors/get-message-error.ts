import { HttpException } from "../domain/exceptions";

export const getMessageError = (err: any): string => {
    const errorMessage = err instanceof HttpException
        ? (err.payload?.message || err.message)
        : err.message;

    return errorMessage;
}