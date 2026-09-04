import { useAuth } from "@/common/hooks";
import { Loading } from "@/common/presentation/components";
import { useGetAppointmentsByUserId } from "@/features/appointment/application/queries";
import { AppointmentEntity } from "@/features/appointment/domain/entities";
import { useMemo } from "react";
import { VisitCard } from "../visit-card";
import { AppointmentLastVisitEmpty } from "../appointment-last-visit-empty";
import { useDateSetter } from "@/common/presentation/hooks";
import { SortOrder } from "@/common/domain/enums";
import { Link } from "react-router-dom";
import { routes } from "@/common/presentation/constants";

export const AppointmentLastVisitVet = () => {
    const { user: vetId } = useAuth();
    const { endDateString } = useDateSetter(0, -1);
    const { data, isLoading } = useGetAppointmentsByUserId(vetId!, {
        endDate: endDateString,
        sortOrder: SortOrder.DESC
    });

    const appointmentData = useMemo(() => {
        if (!data) return [];
        return data?.slice(0, 4);
    }, [data]);


    return (
        <section className="px-4 mx-14 mt-10 mb-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-2">Últimas Visitas</h2>
                <Link to={`${routes.appointments.link}?tab=HISTORY`} className="bg-transparent text-main hover:bg-main-light shadow-none cursor-pointer">
                    Ver más visitas
                </Link>
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
        </section>
    )
}