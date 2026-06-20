import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BellRing } from "lucide-react";
import { useMemo } from "react";
import { dateIsToday, dateIsTomorrow } from "../../utils";
import { useGetAppointmentsByUserId } from "@/features/appointment/application/queries";
import { useAuth } from "@/common/hooks";
import { Loading } from "@/common/presentation/components";


export const AppointmentNotice = () => {
    const { user } = useAuth();
    const { data: appointments, isLoading } = useGetAppointmentsByUserId(user!);

    const notices = useMemo(() => {
        if (!appointments) return [];
        return appointments.filter(app => {
            const dateObj = new Date(app.date);
            return dateIsToday(dateObj) || dateIsTomorrow(dateObj);
        });
    }, [appointments]);

    if (isLoading) return <Loading />;

    if (notices.length === 0) return <p className="text-lg text-center font-medium text-green-600">¡Estamos al dia con tus citas! 🙌</p>;

    return (
        <section className="px-4 mx-14 mt-6 flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-text-2 mb-4 flex items-center gap-2">
                <BellRing className="w-5 h-5 text-main" />
                Avisos Importantes
            </h2>
            <div className="flex gap-5 overflow-x-auto pb-4">
                {notices.map((appointment) => {
                    const dateObj = new Date(appointment.date);
                    const dayLabel = dateIsToday(dateObj) ? "hoy" : "mañana";

                    return (
                        <article
                            key={appointment.id}
                            className="w-52 min-w-[13rem] flex flex-col items-center text-center p-5 bg-main-light/60 border border-main/20 rounded-2xl hover:shadow-md hover:bg-main-light transition-all cursor-pointer"
                        >
                            <Avatar className="w-20 h-20 shadow-sm border-2 border-main mb-4">
                                <AvatarImage
                                    src="https://res.cloudinary.com/koderx/image/upload/v1781802192/koder-animalts/users/iwpgb34jvcbkezvb68yi.jpg"
                                    alt={appointment.petName}
                                    className="object-cover"
                                />
                                <AvatarFallback className="bg-main text-white font-bold text-xl">
                                    {appointment.petName.charAt(0)}
                                </AvatarFallback>
                            </Avatar>

                            <p className="text-sm font-medium text-text-1 leading-snug">
                                ¡A <span className="font-bold text-main">{appointment.petName}</span> le toca su cita <span className="font-bold">{dayLabel}</span>!
                            </p>

                            <span className="mt-3 text-[11px] font-bold uppercase tracking-wider text-main bg-main/10 px-2 py-1 rounded-md">
                                {appointment.reasonForVisit}
                            </span>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};
