export interface IAuthRepository {
    login(email: string, password: string): Promise<any>;
    signup(email: string, password: string, name: string, image: string | File | null): Promise<any>;
}