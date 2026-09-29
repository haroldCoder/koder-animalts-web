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
import { EmptyRequests } from "./requests-empty";
import { RequestPolicy } from "../../domain/policies";
import { FilterStatus } from "./owner/filter-status";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const RequestContent = () => {
    const { user } = useAuth();
    const { user: userSession } = useContext(MainLayoutContext)!;
    const [filterStatusOwner, setFilterStatusOwner] = useState<AppointmentRequestStatus[]>([AppointmentRequestStatus.APPROVED, AppointmentRequestStatus.PENDING, AppointmentRequestStatus.REJECTED]);

    const filterStatus = useMemo(() => {
        if (userSession.role === UserRole.owner) return filterStatusOwner;
        return [AppointmentRequestStatus.PENDING];
    }, [userSession.role, filterStatusOwner]);

    const { data, isLoading } = useGetAppointmentRequestsByUserId(user!, {
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
                {
                    RequestPolicy.canFilterStatus(userSession.role) && (
                        <FilterStatus value={filterStatusOwner} handleChange={(value) => {
                            setFilterStatusOwner(value);
                        }} />
                    )
                }
                <ScrollArea className={"max-h-[300px]"}>
                    {
                        isLoading ? (
                            Array.from({ length: 4 }).map((_, index) => (
                                <Skeleton key={index} className="w-full h-16 rounded-md mb-4" />
                            ))
                        ) :
                            requestsData.length === 0 ? (
                                <EmptyRequests role={userSession.role == UserRole.owner ? "owner" : "veterinary"} />
                            ) : (
                                requestsData.map((request) => (
                                    <RequestAppointmentCard userRole={userSession.role} key={request.id} request={request} />
                                ))
                            )
                    }
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}