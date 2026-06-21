import { useAuth } from "@/common/hooks";
import { Loading } from "@/common/presentation/components";
import { Button } from "@/components/ui/button";
import { useGetAppointmentsByUserId } from "@/features/appointment/application/queries";
import { AppointmentEntity } from "@/features/appointment/domain/entities";
import { useMemo } from "react";
import { VisitCard } from "../visit-card";

export const VisitCardVet = () => {
    const { user: vetId } = useAuth();
    const { data, isLoading } = useGetAppointmentsByUserId(vetId!);

    const appointmentData = useMemo(() => {
        return data?.filter((appointment: AppointmentEntity) => {
            const visitDate = new Date(appointment.date);
            const diffInDays = (visitDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
            return diffInDays <= 7;
        }).slice(0, 4);
    }, [data]);

    return (
        <section className="px-4 mx-14 mt-10 mb-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-2">Últimas Visitas</h2>
                <Button className="bg-transparent text-main hover:bg-main-light shadow-none cursor-pointer">
                    Ver más visitas
                </Button>
            </div>

            <div className="flex flex-col gap-4">
                {isLoading ? <Loading /> : appointmentData?.map((visit: AppointmentEntity) => (
                    <VisitCard key={visit.id} visit={visit} />
                ))}
            </div>
        </section>
    )
}