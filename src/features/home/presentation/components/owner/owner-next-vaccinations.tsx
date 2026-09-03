import { routes } from "@/common/presentation/constants"
import { useGetAllVaccinationsQuery } from "@/features/vaccination/application/queries"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "@/common/hooks"
import { useMemo } from "react"
import { Loading } from "@/common/presentation/components"
import { CardVaccination } from "../card-vaccination"


export const OwnerNextVaccinations = () => {
    const { user } = useAuth();

    const startDateString = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 1);

        return d
    }, []);

    const endDateString = useMemo(() => {
        const d = new Date();
        d.setDate(d.getDate() + 7);
        d.setHours(23, 59, 59, 999);
        return d;
    }, []);

    const { data: vaccinations, isLoading } = useGetAllVaccinationsQuery(user!, {
        startDate: startDateString,
        endDate: endDateString
    })

    const vaccinationsList = useMemo(() => {
        if (!vaccinations?.vaccinations) return [];

        return vaccinations.vaccinations.slice(0, 5);
    }, [vaccinations])

    return (
        <div className="flex flex-col gap-5 w-[79rem]">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-text-2">Vacunas Próximas</h2>
                <Link to={`${routes.vaccinations.link}?startDate=${startDateString}&endDate=${endDateString}`} className="bg-transparent text-main hover:bg-main-light shadow-none cursor-pointer flex items-center">Ver todas <ArrowRight className="w-4 h-4" /></Link>
            </div>

            <div className=" grid grid-cols-2 gap-5">
                {
                    isLoading ? (
                        <Loading />
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
