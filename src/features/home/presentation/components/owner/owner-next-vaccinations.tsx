import { routes } from "@/common/presentation/constants"
import { useGetAllVaccinationsQuery } from "@/features/vaccination/application/queries"
import { ArrowRight } from "lucide-react"
import { useAuth } from "@/common/hooks"
import { useMemo } from "react"
import { Loading, NotFoundVaccinations } from "@/common/presentation/components"
import { CardVaccination } from "../card-vaccination"
import { VaccinationStatus } from "@/features/vaccination/domain/enums"
import { useDateSetter } from "@/common/presentation/hooks"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"


export const OwnerNextVaccinations = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { startDateString, endDateString } = useDateSetter(0, 7);

    const { data: vaccinations, isLoading } = useGetAllVaccinationsQuery(user!, {
        startDate: startDateString,
        endDate: endDateString,
        status: [VaccinationStatus.PENDING]
    })


    const vaccinationsList = useMemo(() => {
        if (!vaccinations?.vaccinations) return [];

        return vaccinations.vaccinations.slice(0, 5);
    }, [vaccinations])

    return (
        <div className="flex flex-col gap-5 w-full">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-text-2">Vacunas Próximas</h2>
                <Button
                    disabled={isLoading || vaccinations?.vaccinations.length === 0}
                    onClick={() => navigate(`${routes.vaccinations.link}?startDate=${startDateString}&endDate=${endDateString}`)}
                    className="bg-transparent text-main hover:bg-main-light shadow-none cursor-pointer flex items-center gap-1"
                >
                    Ver todas <ArrowRight className="w-4 h-4" />
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {
                    isLoading ? (
                        <Loading />
                    ) :
                        vaccinationsList.length === 0 ? (
                            <div className="col-span-2">
                                <NotFoundVaccinations
                                    description="No hay vacunas pendientes por aplicar en los próximos 7 días"
                                />
                            </div>
                        ) : (
                            vaccinationsList.map((vacc) => (
                                <CardVaccination key={vacc.id} vaccination={vacc} />
                            ))
                        )
                }
            </div>
        </div>
    )
}
