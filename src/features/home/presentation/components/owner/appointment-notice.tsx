import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BellRing } from "lucide-react";
import { useMemo } from "react";
import { dateIsToday, dateIsTomorrow } from "../../utils";
import { useGetAppointmentsByUserId } from "@/features/appointment/application/queries";
import { useAuth } from "@/common/hooks";
import { Loading } from "@/common/presentation/components";
import { useAppointmentNotice } from "../../hooks";
import { CardNotice } from "../card-notice";


export const AppointmentNotice = () => {
    const { user } = useAuth();
    const { data: appointments, isLoading } = useGetAppointmentsByUserId(user!);

    const { appointmentsData: notices } = useAppointmentNotice(appointments);

    if (notices.length === 0 && !isLoading) return <p className="text-lg text-center font-medium text-green-600">¡Estamos al dia con tus citas! 🙌</p>;

    return (
        <section className="px-4 mx-14 mt-6 flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-text-2 mb-4 flex items-center gap-2">
                <BellRing className="w-5 h-5 text-main" />
                Avisos Importantes
            </h2>
            {
                isLoading ? (
                    <Loading />
                ) : (
                    <div className="flex gap-5 overflow-x-auto pb-4">
                        {notices.map((appointment) => (
                            <CardNotice key={appointment.id} data={appointment} />
                        ))}
                    </div>
                )
            }
        </section>
    );
};
