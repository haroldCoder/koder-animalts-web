import { useContext } from "react";
import { MainLayoutContext } from "../layout";
import { UserRole } from "@/features/user/domain/enums";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ownerLinks, veterinaryLinks } from "../constants";

export const NavMenu = () => {
    const { user } = useContext(MainLayoutContext)!;
    const location = useLocation();

    const links = user.role === UserRole.veterinary ? veterinaryLinks : ownerLinks;

    return (
        <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => {
                const isActive = location.pathname.endsWith(link.path);
                return (
                    <Link
                        key={link.name}
                        to={link.path}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                            isActive
                                ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-500"
                                : "text-muted-foreground hover:border-b-2 hover:border-b-main-hover hover:bg-muted hover:text-foreground"
                        )}
                    >
                        {link.icon}
                        <span>{link.name}</span>
                    </Link>
                );
            })}
        </nav>
    );
};
