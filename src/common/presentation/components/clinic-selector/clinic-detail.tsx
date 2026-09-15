import { ClinicOption } from "../../interfaces";
import { Building2, Mail, MapPin, Phone } from "lucide-react";

interface ClinicDetailProps {
    clinic: ClinicOption;
}

export const ClinicDetail = ({ clinic }: ClinicDetailProps) => {
    const { address, phone, email } = clinic.aditional || {};
    const hasAnyInfo = Boolean(address || phone || email);

    return (
        <div className="flex flex-col gap-3 p-3.5">
            {/* Header: Clinic Name & Icon */}
            <div className="flex items-start gap-2.5">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Building2 className="size-4" />
                </div>
                <div className="flex flex-col min-w-0">
                    <h4 className="text-sm font-semibold text-foreground truncate">
                        {clinic.label}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                        Información de la sede
                    </span>
                </div>
            </div>

            <div className="h-px bg-border/60" />

            {/* Info details */}
            {hasAnyInfo ? (
                <div className="flex flex-col gap-2.5 text-xs">
                    {address && (
                        <div className="flex items-start gap-2 text-muted-foreground">
                            <MapPin className="size-3.5 shrink-0 text-primary mt-0.5" />
                            <span className="break-words leading-tight">{address}</span>
                        </div>
                    )}
                    {phone && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="size-3.5 shrink-0 text-primary" />
                            <a
                                href={`tel:${phone}`}
                                className="hover:text-foreground transition-colors hover:underline"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {phone}
                            </a>
                        </div>
                    )}
                    {email && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="size-3.5 shrink-0 text-primary" />
                            <a
                                href={`mailto:${email}`}
                                className="break-all hover:text-foreground transition-colors hover:underline"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {email}
                            </a>
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-xs text-muted-foreground italic">
                    Sin información de contacto adicional
                </p>
            )}
        </div>
    );
};