import { AppointmentEntity } from "@/features/appointment/domain/entities";
import { Calendar, Syringe, User } from "lucide-react";

interface AppointmentCardProps {
    appointment: AppointmentEntity;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
    const dateObj = new Date(appointment.nextDate);

    const formattedDay = new Intl.DateTimeFormat('es-ES', { day: '2-digit' }).format(dateObj);
    const formattedMonth = new Intl.DateTimeFormat('es-ES', { month: 'short' }).format(dateObj).replace('.', '');
    const formattedTime = new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit' }).format(dateObj);

    return (
        <article className="flex flex-col sm:flex-row gap-4 p-5 bg-bg-1 border border-border-1 rounded-2xl hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
            <div className="flex flex-col items-center justify-center w-[70px] min-w-[70px] bg-main-light rounded-xl p-2 text-main">
                <Calendar className="w-5 h-5 mb-1" />
                <span className="text-xl font-black leading-none">{formattedDay}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">{formattedMonth}</span>
            </div>

            <div className="flex flex-col justify-center flex-1">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="text-lg font-bold text-text-1 leading-tight">{appointment.vaccineName}</h3>
                    <span className="bg-bg-2 text-text-2 px-3 py-1 rounded-full text-xs font-bold shadow-sm whitespace-nowrap">
                        {formattedTime}
                    </span>
                </div>
                <p className="text-sm text-text-2 mt-1">
                    Mascota: <span className="text-text-1 font-bold">{appointment.petName}</span>
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-text-3 font-medium">
                    <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-main" />
                        {appointment.veterinaryName}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Syringe className="w-3.5 h-3.5 text-main" />
                        Lote: {appointment.lotNumber}
                    </span>
                </div>
            </div>
        </article>
    );
};
