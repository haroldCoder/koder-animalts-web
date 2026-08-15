import { useContext } from "react";
import { MainLayoutContext } from "../layout";
import { UserRole } from "@/features/user/domain/enums";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ownerLinks, veterinaryLinks } from "../constants";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const NavMenu = () => {
    const { user } = useContext(MainLayoutContext)!;
    const location = useLocation();

    const links = user.role === UserRole.veterinary ? veterinaryLinks : ownerLinks;

    return (
        <>
            <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:z-auto lg:bg-transparent lg:border-t-0 shadow-[0_-5px_15px_-10px_rgba(0,0,0,0.1)] lg:shadow-none transition-all lg:flex-1 lg:min-w-0 lg:mx-4">
                <ScrollArea className="w-full">
                    <div className="flex min-w-full w-max md:justify-center lg:justify-start xl:justify-end items-center gap-2 px-4 py-3 lg:p-0 lg:gap-1">
                        {links.map((link) => {
                            const isActive = location.pathname.endsWith(link.path);
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={cn(
                                        "flex flex-col lg:flex-row items-center justify-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 lg:py-2.5 rounded-xl lg:rounded-md text-[10px] lg:text-sm font-medium transition-all lg:transition-colors min-w-[64px] lg:min-w-0 shrink-0",
                                        isActive
                                            ? "text-amber-600 bg-amber-50 dark:bg-amber-500/20 lg:bg-amber-100 lg:text-amber-700 dark:text-amber-500 shadow-sm lg:shadow-none scale-105 lg:scale-100"
                                            : "text-muted-foreground hover:bg-muted/60 lg:hover:bg-muted hover:text-foreground hover:scale-105 lg:hover:scale-100"
                                    )}
                                >
                                    <span className={cn("transition-transform", isActive ? "scale-110 lg:scale-100" : "")}>{link.icon}</span>
                                    <span className="font-semibold lg:font-medium whitespace-nowrap">{link.name}</span>
                                </Link>
                            );
                        })}
                        {/* Espaciador al final para que el último item no quede pegado al borde al hacer scroll */}
                        <div className="w-5 h-5 shrink-0 lg:hidden" aria-hidden="true" />
                    </div>
                    <ScrollBar orientation="horizontal" className="hidden lg:flex [&_[data-slot=scroll-area-thumb]]:bg-main translate-y-5" />
                </ScrollArea>
            </nav>
            {/* Indicador visual de scroll (sombra difuminada) */}
            <div className="fixed bottom-0 right-0 z-[51] w-12 h-[68px] bg-gradient-to-l from-background to-transparent pointer-events-none lg:hidden" aria-hidden="true" />
        </>
    );
};
