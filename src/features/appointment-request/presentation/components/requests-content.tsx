import { useAuth } from "@/common/hooks";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetAppointmentRequestsByUserId } from "@/features/appointment-request/application";
import { Bell, Circle, ClipboardClock } from "lucide-react";
import { useContext, useMemo } from "react";
import { RequestAppointmentCard } from "./request-appointment-card";
import { AppointmentRequestStatus } from "@/features/appointment-request/domain";
import { MainLayoutContext } from "@/common/presentation/layout";
import { UserRole } from "@/features/user";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const RequestContent = () => {
    const { user } = useAuth();
    const { user: userSession } = useContext(MainLayoutContext)!;

    const filterStatus = useMemo(() => {
        if (userSession.role === UserRole.owner) return [AppointmentRequestStatus.APPROVED, AppointmentRequestStatus.PENDING, AppointmentRequestStatus.CANCELLED];
        return [AppointmentRequestStatus.PENDING];
    }, []);

    const { data } = useGetAppointmentRequestsByUserId(user!, {
        status: filterStatus
    });


    const requestsData = useMemo(() => {
        if (!data) return [];
        return data;
    }, [data]);

    return (
        <Dialog>
            <DialogTrigger>
                <Tooltip>
                    <TooltipTrigger>
                        <Button className={"mx-5 cursor-pointer relative"} variant="outline" size="lg">
                            {
                                requestsData.length > 0 && (
                                    <Circle className={"absolute -top-1 -right-1 fill-main text-main"} />
                                )
                            }
                            <Bell />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className={"dark:bg-bg-dark-3 dark:text-white"}>
                        <p>Solicitudes de cita</p>
                    </TooltipContent>
                </Tooltip>
            </DialogTrigger>
            <DialogContent className={"p-5 md:!max-w-[700px]"}>
                <DialogHeader className="mb-5">
                    <DialogTitle className={"flex items-center gap-2"}>
                        <ClipboardClock />
                        Solicitudes de cita
                    </DialogTitle>
                </DialogHeader>
                <ScrollArea className={"max-h-[300px]"}>
                    {
                        requestsData.map((request) => (
                            <RequestAppointmentCard userRole={userSession.role} key={request.id} request={request} />
                        ))
                    }
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}