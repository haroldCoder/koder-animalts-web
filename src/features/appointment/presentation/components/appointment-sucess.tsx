import { Popup } from "@/common/presentation/components";
import { Spinner } from "@/components/ui/spinner";

export const AppointmentSucess = ({ isOpen }: { isOpen: boolean }) => {
    return (
        <Popup isOpen={isOpen} isClosable={false}>
            <div className="flex flex-col items-center gap-4 p-8 bg-card rounded-2xl border border-border shadow-2xl animate-in scale-in duration-300">
                <Spinner className="size-12 text-primary" />
                <div className="text-center">
                    <h3 className="text-lg font-semibold">Programando Cita...</h3>
                    <p className="text-sm text-muted-foreground">Guardando los detalles en el expediente del paciente.</p>
                </div>
            </div>
        </Popup>
    )
}
