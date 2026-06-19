import { appointmentLastVisitMockData } from "../data";
import { Button } from "@/components/ui/button";
import { Download, FileText, Stethoscope, Building2 } from "lucide-react";

export const AppointmentLastVisit = () => {
    // Tomamos solo las últimas 4 visitas
    const visits = appointmentLastVisitMockData.slice(0, 4);

    return (
        <section className="px-4 mx-14 mt-10 mb-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-2">Últimas Visitas</h2>
                <Button className="bg-transparent text-main hover:bg-main-light shadow-none cursor-pointer">
                    Ver más visitas
                </Button>
            </div>

            <div className="flex flex-col gap-4">
                {visits.map((visit) => (
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
                                <h3 className="text-lg font-bold text-text-1">
                                    {visit.petName}
                                </h3>
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
