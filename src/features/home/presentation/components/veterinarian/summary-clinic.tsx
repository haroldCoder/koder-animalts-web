import { useAuth } from '@/common/hooks';
import { useGetSummaryClinic } from '@/features/clinics/application/queries';
import { ClinicSummaryEntity } from '@/features/clinics/domain/entities';
import { PawPrint, Users, Building2 } from 'lucide-react';
import { useMemo } from 'react';

export const SummaryClinic = () => {
    const { user } = useAuth()
    const { data, isLoading } = useGetSummaryClinic(user!);


    const summaryData: ClinicSummaryEntity | null = useMemo(() => {
        if (!data) return null;
        return data;
    }, [data]);

    if (isLoading) return null;
    if (!summaryData) return null;

    return (
        <section className="px-4 sm:mx-14 mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-text-1 mb-4 sm:mb-6">Resumen de la clínica</h2>

            <div className="bg-bg-2 p-4 sm:p-5 rounded-2xl border border-border-1">
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                    <div className="w-10 h-10 bg-main-light text-main rounded-xl flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-xs text-text-3 uppercase tracking-widest font-medium">Clínica</p>
                        <h1 className="text-xl sm:text-2xl font-bold text-text-1 leading-tight break-words">{summaryData.clinicName}</h1>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Total pets */}
                    <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-bg-1 border border-border-1 rounded-2xl hover:bg-bg-2 transition-all">
                        <div className="w-12 h-12 min-w-[3rem] bg-main-light text-main rounded-xl flex items-center justify-center shrink-0">
                            <PawPrint className="w-6 h-6" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-2xl sm:text-3xl font-bold text-text-1">{summaryData.totalPets}</p>
                            <p className="text-xs sm:text-sm text-text-3 font-medium mt-0.5 truncate">Total de mascotas</p>
                        </div>
                    </div>

                    {/* Total owners */}
                    <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-bg-1 border border-border-1 rounded-2xl hover:bg-bg-2 transition-all">
                        <div className="w-12 h-12 min-w-[3rem] bg-main-light text-main rounded-xl flex items-center justify-center shrink-0">
                            <Users className="w-6 h-6" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-2xl sm:text-3xl font-bold text-text-1">{summaryData.totalOwners}</p>
                            <p className="text-xs sm:text-sm text-text-3 font-medium mt-0.5 truncate">Total de dueños</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
