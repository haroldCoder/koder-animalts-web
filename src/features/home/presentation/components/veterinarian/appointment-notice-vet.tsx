import { BellRing } from "lucide-react"
import { CardNotice } from "../card-notice"
import { useGetAppointmentsByUserId } from "@/features/appointment/application/queries"
import { useAuth } from "@/common/hooks"
import { useAppointmentNotice } from "../../hooks"
import { Error, Loading } from "@/common/presentation/components"

export const AppointmentNoticeVet = () => {
    const { user } = useAuth()
    const { data, isLoading, error } = useGetAppointmentsByUserId(user!)

    const { appointmentsData } = useAppointmentNotice(data)

    return (
        <section>
            <div className="w-full flex gap-4 items-center">
                <h2 className="text-2xl font-bold text-text-2">
                    Citas Próximas
                </h2>
                <BellRing className="w-6 h-6 text-main" />
            </div>
            <div className="flex justify-center gap-3">
                {
                    isLoading ? (
                        <Loading />
                    ) : error ? (
                        <Error message="Error al cargar las citas" />
                    ) : appointmentsData.length === 0 ? (
                        <div className="text-center text-text-2 text-base">¡No hay citas próximas agendadas!</div>
                    ) : (
                        appointmentsData.map((appointment) => (
                            <CardNotice key={appointment.id} data={appointment}>
                                <div className="flex flex-col mt-3">
                                    <p className="text-base text-text-2">Dueño: <span className="font-medium text-main">{appointment.ownerName}</span></p>
                                </div>
                            </CardNotice>
                        ))
                    )
                }
            </div>
        </section>
    )
}