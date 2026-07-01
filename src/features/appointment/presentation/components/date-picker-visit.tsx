import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Control, FieldErrors, Controller } from "react-hook-form";
import { ScheduleAppointmentFormValues } from "../interfaces";

interface DatePickerVisitProps {
    control: Control<ScheduleAppointmentFormValues>;
    errors: FieldErrors<ScheduleAppointmentFormValues>;
}

export const DatePickerVisit = ({ control, errors }: DatePickerVisitProps) => {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1.5">
                Fecha de la Visita <span className="text-destructive">*</span>
            </label>
            <Controller
                control={control}
                name="visitDate"
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => {
                    const currentDate = value
                        ? new Date(value)
                        : new Date();


                    const updateTime = (time: string) => {

                        const [hours, minutes] = time.split(":").map(Number);

                        const date = value
                            ? new Date(value)
                            : new Date();


                        date.setHours(hours);
                        date.setMinutes(minutes);
                        date.setSeconds(0);
                        date.setMilliseconds(0);


                        onChange(date);

                    };

                    return (
                        <Popover>

                            <PopoverTrigger
                                className={cn(
                                    "flex h-10 w-full items-center gap-2 rounded-lg border px-3 text-sm",
                                    value && "font-medium"
                                )}
                            >
                                <CalendarIcon className="h-4 w-4" />

                                {value
                                    ? format(currentDate, "PPP 'a las' hh:mm a", { locale: es })
                                    : "Selecciona fecha y hora"
                                }

                            </PopoverTrigger>


                            <PopoverContent className="p-4">

                                <Calendar
                                    mode="single"
                                    selected={currentDate}
                                    onSelect={(date) => {

                                        if (!date) return;

                                        date.setHours(
                                            currentDate.getHours()
                                        );

                                        date.setMinutes(
                                            currentDate.getMinutes()
                                        );

                                        onChange(date);
                                    }}
                                    locale={es}
                                />


                                <div className="mt-4">

                                    <label className="text-sm">
                                        Hora
                                    </label>


                                    <input
                                        type="time"
                                        value={format(currentDate, "HH:mm")}
                                        onChange={(e) =>
                                            updateTime(e.target.value)
                                        }
                                        className="
                                mt-2
                                h-10
                                w-full
                                rounded-md
                                border
                                px-3
                                bg-bg-dark-2
                                text-text-3
                                text-center
                            "
                                    />

                                </div>


                            </PopoverContent>

                        </Popover>
                    );
                }}
            />
            {errors.visitDate && (
                <span className="text-xs text-destructive">La fecha de la visita es requerida</span>
            )}
        </div>
    )
}
