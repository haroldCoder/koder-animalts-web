import { FileX2 } from "lucide-react";

interface EmptyRequestsProps {
    role: "owner" | "veterinary";
}

export const EmptyRequests = ({ role }: EmptyRequestsProps) => {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            <FileX2 className="text-muted-foreground size-24 mb-6 opacity-20" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No hay solicitudes de citas</h3>
            <p className="text-muted-foreground text-center max-w-md">
                {role === "veterinary" ? (
                    <>
                        Parece que todavía no has recibido ninguna solicitud de citas. Cuando los tutores envíen solicitudes, aparecerán aquí.
                    </>
                ) : (
                    <>
                        No hay solicitudes de citas. ¡Envía una solicitud!
                    </>
                )}
            </p>
        </div>
    );
};