import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppointmentEntity } from "@/features/appointment/domain/entities";
import { dayLabel } from "../utils";
import { extractHourFromDate } from "@/common/utils";

interface CardNoticeProps {
    data: AppointmentEntity;
    children?: React.ReactNode;
}

export const CardNotice = ({ data, children }: CardNoticeProps) => {
    return (
        <article className="w-52 min-w-[13rem] flex flex-col items-center text-center p-5 bg-main-light/60 border border-main/20 rounded-2xl hover:shadow-md hover:bg-main-light transition-all cursor-pointer">
            <div className="text-center mt-3 mb-6 bg-bg-white-3 px-4 py-2 rounded-full">
                <p className="text-sm font-semibold text-text-2">{extractHourFromDate(data.date)}</p>
            </div>
            <Avatar className="w-20 h-20 shadow-sm border-2 border-main mb-4">
                <AvatarImage
                    src={data.petPhoto}
                    alt={data.petName}
                    className="object-cover"
                />
                <AvatarFallback className="bg-main text-white font-bold text-xl">
                    {data.petName.charAt(0)}
                </AvatarFallback>
            </Avatar>

            <p className="text-sm font-medium text-text-1 leading-snug">
                ¡A <span className="font-bold text-main">{data.petName}</span> le toca su cita <span className="font-bold">{dayLabel(data.date)}</span>!
            </p>

            <span className="mt-3 text-[11px] font-bold uppercase tracking-wider text-main bg-main/10 px-2 py-1 rounded-md">
                {data.reasonForVisit}
            </span>

            {children}
        </article>
    )
}
