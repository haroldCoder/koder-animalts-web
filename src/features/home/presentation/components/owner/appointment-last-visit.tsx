import { useAuth } from "@/common/hooks";
import { Button } from "@/components/ui/button";
import { useGetAppointmentsByUserId } from "@/features/appointment/application/queries";
import { useMemo } from "react";
import { AppointmentEntity } from "@/features/appointment/domain/entities";
import { Loading } from "@/common/presentation/components";
import { VisitCard } from "../visit-card";
import { useNavigate } from "react-router-dom";
import { routes } from "@/common/presentation/constants";
import { AppointmentLastVisitEmpty } from "../appointment-last-visit-empty";
import { useDateSetter } from "@/common/presentation/hooks";
import { SortOrder } from "@/common/domain/enums";

export const AppointmentLastVisit = () => {
    const { user } = useAuth();

    const { endDateString } = useDateSetter(0, -1);
    const { data: appointments, isLoading } = useGetAppointmentsByUserId(user!, {
        endDate: endDateString,
        sortOrder: SortOrder.DESC
    });
    const navigation = useNavigate();

    const appointmentData = useMemo(() => {
        return appointments?.slice(0, 4);
    }, [appointments]);

    return (
        <section className="px-4 mx-14 mt-10 mb-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-2">Últimas Visitas</h2>
                <Button disabled={appointmentData?.length === 0} onClick={() => navigation(`${routes.history.link}`)} className="bg-transparent text-main hover:bg-main-light shadow-none cursor-pointer">
                    Ver más visitas
                </Button>
            </div>

            {
                appointmentData?.length === 0 ? (
                    <AppointmentLastVisitEmpty />
                ) : (
                    <div className="flex flex-col gap-4">
                        {isLoading ? <Loading /> : appointmentData?.map((visit: AppointmentEntity) => (
                            <VisitCard key={visit.id} visit={visit} />
                        ))}
                    </div>
                )
            }
        </section >
    );
};
