import { CalendarCheck2, CheckCircle2, PawPrint, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface NotFoundAppoinmentsNoticeProps {
    message?: string;
    description?: string;
    badgeText?: string;
    showAction?: boolean;
    actionText?: string;
    actionHref?: string;
    onAction?: () => void;
    className?: string;
}

export const NotFoundAppoinmentsNotice = ({
    message = "¡Estamos al día con tus citas! 🙌",
    description = "No tienes citas pendientes programadas para las próximas horas. Te avisaremos cuando se acerque tu siguiente visita.",
    badgeText = "Todo al día",
    showAction = false,
    actionText = "Ver próximas citas",
    actionHref,
    onAction,
    className,
}: NotFoundAppoinmentsNoticeProps) => {
    const navigate = useNavigate();

    const handleAction = () => {
        if (onAction) {
            onAction();
        } else if (actionHref) {
            navigate(actionHref);
        }
    };

    return (
        <div
            className={cn(
                "relative overflow-hidden w-full max-w-xl mx-auto rounded-3xl border border-main/20 bg-gradient-to-b from-main-light/90 via-white to-main-light/30 p-6 sm:p-8 text-center shadow-xs transition-all duration-300 hover:shadow-md dark:border-main/20 dark:from-muted/30 dark:via-card dark:to-card",
                className
            )}
        >
            <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-main/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-main/10 blur-2xl" />

            <PawPrint className="pointer-events-none absolute top-4 right-5 w-12 h-12 text-main/5 -rotate-12 select-none" />
            <PawPrint className="pointer-events-none absolute bottom-4 left-5 w-10 h-10 text-main/5 rotate-12 select-none" />

            <div className="relative mx-auto mb-4 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-main/20 via-main/10 to-orange-100 shadow-inner border border-main/20 text-main group transition-transform duration-300 hover:scale-105">
                <CalendarCheck2 className="h-8 w-8 sm:h-10 sm:w-10 text-main transition-transform duration-300 group-hover:scale-110" />

                <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm ring-2 ring-white dark:ring-card">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                </span>
            </div>

            <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-main/10 px-3 py-1 text-xs font-semibold text-main">
                <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-main/60 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-main" />
                </span>
                {badgeText}
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-text-1 tracking-tight">
                {message}
            </h3>

            {description && (
                <p className="mt-2 text-sm text-text-2 max-w-md mx-auto leading-relaxed">
                    {description}
                </p>
            )}

            {showAction && (
                <div className="mt-5 flex justify-center">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAction}
                        className="rounded-xl border-main/30 text-main hover:bg-main hover:text-white transition-all shadow-none cursor-pointer"
                    >
                        {actionText}
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                </div>
            )}
        </div>
    );
};