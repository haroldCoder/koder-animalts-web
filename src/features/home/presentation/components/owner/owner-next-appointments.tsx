import { AppointmentCard } from "../appointments";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { useAuth } from "@/common/hooks";
import { useGetAppointmentsByUserId } from "@/features/appointment/application/queries";
import { appointmentNext } from "@/features/appointment/domain/utils";
import { Error, Loading } from "@/common/presentation/components";
import { useNavigate } from "react-router-dom";
import { routes } from "@/common/presentation/constants";

export const OwnerNextAppointments = () => {
    const { user } = useAuth();
    const navigation = useNavigate();

    const {
        data,
        isLoading,
        error
    } = useGetAppointmentsByUserId(user!);

    const appointmentsData = useMemo(() => {
        if (!data) return [];
        return appointmentNext(data?.slice(0, 3));
    }, [data])

    return (
        <section className="mt-10 mb-10 max-w-[80vw]">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-2">Próximas citas</h2>
                <Button disabled={appointmentsData.length === 0} onClick={() => navigation(`${routes.appointments.link}`)} className="bg-transparent text-main hover:bg-main-light shadow-none cursor-pointer">
                    Ver todas <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>

            {isLoading ? (
                <Loading />
            ) : error ? (
                <Error message="Error al cargar las citas" />
            ) : appointmentsData.length === 0 ? (
                <div className="text-center text-text-2 text-base">¡No hay próximas citas agendadas!</div>
            ) : (
                <div className="px-7 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                    {appointmentsData.map((appointment) => (
                        <AppointmentCard key={appointment.id} appointment={appointment} />
                    ))}
                </div>
            )}
        </section >
    )
}
