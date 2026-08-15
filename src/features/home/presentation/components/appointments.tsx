import { AppointmentDataDto } from "@/features/appointment/domain/dtos";
import { AppointmentCard } from "@/features/appointment/presentation/components";

interface AppointmentsProps {
    appointment: AppointmentDataDto;
}

export const Appointments: React.FC<AppointmentsProps> = ({ appointment }) => {
    return (
        <article className="flex flex-col sm:flex-row gap-4 p-5 bg-bg-1 border border-border-1 rounded-2xl hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
            <AppointmentCard appointment={appointment} />
        </article>
    );
};
