import { BellRing } from "lucide-react"
import { CardNotice } from "../card-notice"
import { useGetAppointmentsByUserId } from "@/features/appointment/application/queries"
import { useAuth } from "@/common/hooks"
import { useAppointmentNotice } from "../../hooks"
import { Error, Loading } from "@/common/presentation/components"
import { useGetAllVaccinationsQuery } from "@/features/vaccination/application/queries"
import { CardVaccination } from "../card-vaccination"
import { useDateSetter } from "@/common/presentation/hooks"
import { ScrollArea } from "@/components/ui/scroll-area"

export const AppointmentNoticeVet = () => {
    const { user } = useAuth()
    const { startDateString, endDateString } = useDateSetter(0, 1);
    const { data, isLoading, error } = useGetAppointmentsByUserId(user!)
    const { data: vaccinationsData, isLoading: vaccinationsIsLoading, error: vaccinationsError } = useGetAllVaccinationsQuery(user!, {
        startDate: startDateString,
        endDate: endDateString,
    });

    const { appointmentsData } = useAppointmentNotice(data)

    return (
        <section>
            <div className="w-full flex gap-4 items-center">
                <h2 className="text-2xl font-bold text-text-2">
                    Citas Próximas
                </h2>
                <BellRing className="w-6 h-6 text-main" />
            </div>
            <div className="flex justify-center gap-3 mt-7">
                {
                    isLoading || vaccinationsIsLoading ? (
                        <Loading />
                    ) : error || vaccinationsError ? (
                        <Error message="Error al cargar las citas" />
                    ) : appointmentsData.length === 0 && vaccinationsData?.vaccinations?.length === 0 ? (
                        <div className="text-center text-text-2 text-base">¡No hay citas ni vacunaciones próximas agendadas!</div>
                    ) : (
                        <ScrollArea className="h-[440px] pr-7" thumbClassName="bg-main">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {appointmentsData.map((appointment) => (
                                    <CardNotice key={appointment.id} data={appointment}>
                                        <div className="flex flex-col mt-3">
                                            <p className="text-base text-text-2">Dueño: <span className="font-medium text-main">{appointment.ownerName}</span></p>
                                        </div>
                                    </CardNotice>
                                ))}

                                {vaccinationsData?.vaccinations?.map((vaccination) => (
                                    <CardVaccination key={vaccination.id} vaccination={vaccination} />
                                ))}
                            </div>
                        </ScrollArea>
                    )
                }
            </div>
        </section>
    )
}