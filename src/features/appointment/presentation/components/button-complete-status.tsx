import { AppointmentEntity } from "@/features/appointment/domain/entities";
import { UserRole } from "@/features/user";
import { Button } from "@/components/ui/button";
import { Loading } from "@/common/presentation/components";
import { AppointmentStatusEnum } from "../../domain/enums";
import { useUpdateStatusAppointment } from "../hooks";
import { Check } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ButtonCompleteStatusProps {
    appointment: AppointmentEntity;
    user: { role: UserRole };
    content?: React.ReactNode;
}

export const ButtonCompleteStatus: React.FC<ButtonCompleteStatusProps> = ({ appointment, user, content }) => {
    const { handleUpdateCompletedStatus, isPending } = useUpdateStatusAppointment();

    return (
        <Button
            variant="outline"
            disabled={isPending}
            className="h-8 px-2.5 cursor-pointer text-xs text-emerald-600 border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950/40 gap-1.5"
            onClick={() => handleUpdateCompletedStatus(appointment, AppointmentStatusEnum.COMPLETED, user?.role)}
        >
            {isPending ? <Loading /> : (
                <>
                    <Tooltip>
                        <TooltipTrigger className={"cursor-pointer"}>
                            {content ?? <Check size={16} />}
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Marcar como completada</p>
                        </TooltipContent>
                    </Tooltip>
                </>
            )}
        </Button>
    )
}