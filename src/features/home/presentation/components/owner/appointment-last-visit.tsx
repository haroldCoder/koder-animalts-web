import { useAuth } from "@/common/hooks";
import { Button } from "@/components/ui/button";
import { Download, FileText, Stethoscope, Building2 } from "lucide-react";
import { useGetAppointmentsByUserId } from "@/features/appointment/application/queries";
import { useMemo } from "react";
import { AppointmentEntity } from "@/features/appointment/domain/entities";
import { Loading } from "@/common/presentation/components";

export const AppointmentLastVisit = () => {
    const { user } = useAuth();
    const { data: appointments, isLoading } = useGetAppointmentsByUserId(user!);

    const appointmentData = useMemo(() => {
        return appointments?.filter((appointment: AppointmentEntity) => {
            const visitDate = new Date(appointment.date);
            const diffInDays = (visitDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
            return diffInDays <= 7;
        }).slice(0, 4);
    }, [appointments]);

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
                    <article
                        key={visit.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-bg-1 border border-border-1 rounded-2xl hover:bg-bg-2 transition-all gap-4 sm:gap-0"
                    >
                        <div className="flex items-center gap-6">
                            {/* Icono representativo */}
                            <div className="w-12 h-12 min-w-[3rem] bg-main-light text-main rounded-xl flex items-center justify-center">
                                <FileText className="w-6 h-6" />
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-lg font-bold text-text-1">
                                        {visit.petName}
                                    </h3>
                                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                        {visit.type}
                                    </span>
                                    <span className="text-sm text-text-3">
                                        {new Date(visit.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-text-2 mt-1 font-medium">
                                    <span className="flex items-center gap-1.5">
                                        <Stethoscope className="w-4 h-4 text-main" />
                                        {visit.veterinaryName}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Building2 className="w-4 h-4 text-main" />
                                        {visit.clinicName}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Button className="w-full sm:w-auto flex items-center gap-2 bg-main text-white hover:bg-main-hover transition-colors rounded-xl px-4 py-2 cursor-pointer shadow-sm">
                            <Download className="w-4 h-4" />
                            Documentos
                        </Button>
                    </article>
                ))}
            </div>
        </section>
    );
};
