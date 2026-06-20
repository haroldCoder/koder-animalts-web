import { useContext } from "react";
import { MainLayoutContext } from "../layout";
import { UserRole } from "@/features/user/domain/enums";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export const Header = () => {
    const { user } = useContext(MainLayoutContext)!;
    const navigation = useNavigate();

    const logout = () => {
        localStorage.removeItem('user');
        navigation('/auth');
    }

    return (
        <header className="flex justify-between py-4 px-6 bg-background border-b">
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">A</span>
                </div>
                <div>
                    <h1 className="text-xl font-bold text-amber-500">Dashboard</h1>
                    <p className="text-sm text-muted-foreground">
                        Bienvenido, {user.role == UserRole.veterinary && 'Dr.'} {user.name}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-10">
                <Avatar className={"w-10 h-10 "}>
                    <AvatarImage src={user.image ?? ""} />
                    <AvatarFallback className={"bg-amber-500 text-white"}>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button className={"cursor-pointer px-8"} onClick={() => logout()}>Logout</Button>
            </div>
        </header>
    );
};