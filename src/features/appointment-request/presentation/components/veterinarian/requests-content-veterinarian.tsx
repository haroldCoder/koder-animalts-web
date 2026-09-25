import { useAuth } from "@/common/hooks";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetAppointmentRequestsByUserId } from "@/features/appointment-request/application";
import { Bell, Circle, ClipboardClock } from "lucide-react";
import { useMemo } from "react";
import { RequestAppointmentCard } from "../request-appointment-card";
import { UserRole } from "@/features/user";
import { AppointmentRequestStatus } from "@/features/appointment-request/domain";

interface RequestContentVeterinaria {
    userRole: UserRole
}

export const RequestContentVeterinarian = ({ userRole }: RequestContentVeterinaria) => {
    const { user } = useAuth();
    const { data } = useGetAppointmentRequestsByUserId(user!, userRole, {
        status: [AppointmentRequestStatus.PENDING]
    });

    const requestsData = useMemo(() => {
        if (!data) return [];
        return data;
    }, [data]);

    return (
        <Dialog>
            <DialogTrigger>
                <Button className={"mx-5 cursor-pointer relative"} variant="outline" size="lg">
                    {
                        requestsData.length > 0 && (
                            <Circle className={"absolute -top-1 -right-1 fill-main text-main"} />
                        )
                    }
                    <Bell />
                </Button>
            </DialogTrigger>
            <DialogContent className={"p-5 md:!max-w-[700px]"}>
                <DialogHeader className="mb-5">
                    <DialogTitle className={"flex items-center gap-2"}>
                        <ClipboardClock />
                        Solicitudes de cita
                    </DialogTitle>
                </DialogHeader>
                <ScrollArea>
                    {
                        requestsData.map((request) => (
                            <RequestAppointmentCard key={request.id} request={request} />
                        ))
                    }
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}