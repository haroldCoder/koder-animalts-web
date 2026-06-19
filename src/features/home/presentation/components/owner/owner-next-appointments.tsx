import { appointmentMockData } from "@/features/appointment/presentation/data";
import { AppointmentCard } from "../appointments";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";

export const OwnerNextAppointments = () => {
    const appointmentsData = useMemo(() => {
        return appointmentMockData.slice(0, 3);
    }, [])

    return (
        <section className="mt-10 mb-10 max-w-[80vw]">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-2">Próximas citas</h2>
                <Button className="bg-transparent text-main hover:bg-main-light shadow-none cursor-pointer">
                    Ver todas <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>

            <div className="px-7 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                {appointmentsData.map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
            </div>
        </section>
    )
}
