import { Spinner } from "@/components/ui/spinner";

export const BackdropMutationPet = () => {
    return (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-50 flex items-center justify-center rounded-xl animate-in fade-in duration-300">
            <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-card border border-border/80 shadow-2xl max-w-sm w-full mx-4 text-center">
                <div className="relative flex items-center justify-center size-16 rounded-full bg-main/10 border border-main/20">
                    <Spinner className="size-8 text-main" />
                </div>
                <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground">Registrando Mascota</h3>
                    <p className="text-sm text-muted-foreground">Estamos guardando los datos del paciente en el sistema...</p>
                </div>
            </div>
        </div>
    )
}

