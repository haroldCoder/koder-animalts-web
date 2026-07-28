import { useContext } from "react";
import { MainLayoutContext } from "../layout";
import { UserRole } from "@/features/user/domain/enums";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavMenu } from "./nav-menu";
import { routes } from "../constants";

export const Header = () => {
    const { user } = useContext(MainLayoutContext)!;
    const navigation = useNavigate();
    const location = useLocation();

    const logout = () => {
        localStorage.removeItem('user');
        navigation('/auth');
    }


    const currentRoute = Object.values(routes).find(r => r.link === location.pathname) as { label: string };

    const pageTitle = currentRoute?.label || "Dashboard";

    return (
        <header className="flex items-center justify-between py-3 lg:py-4 px-4 lg:px-6 bg-background border-b relative z-40">
            <div className="flex items-center gap-2 lg:gap-3">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-amber-500 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-sm lg:text-base">A</span>
                </div>
                <div className="min-w-0">
                    <h1 className="text-lg lg:text-xl font-bold text-amber-500 truncate">{pageTitle}</h1>
                    <p className="text-xs lg:text-sm text-muted-foreground truncate hidden sm:block">
                        Bienvenido, {user.role == UserRole.veterinary && 'Dr.'} {user.name}
                    </p>
                </div>
            </div>

            <NavMenu />

            <div className="flex items-center gap-3 lg:gap-6">
                <Avatar className="w-8 h-8 lg:w-10 lg:h-10">
                    <AvatarImage src={user.image ?? ""} />
                    <AvatarFallback className="bg-amber-500 text-white text-xs lg:text-sm">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button size="sm" className="cursor-pointer px-4 lg:px-8 text-xs lg:text-sm" onClick={() => logout()}>Logout</Button>
            </div>
        </header>
    );
};