import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface DateTimePickerProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  required?: boolean
  /** Si true, deshabilita fechas pasadas (útil para citas futuras) */
  disablePast?: boolean
}

export function DateTimePicker<T extends FieldValues>({
  control,
  name,
  required = false,
  disablePast = false,
}: DateTimePickerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required }}
      render={({ field: { value, onChange } }) => {
        const currentDate = value ? new Date(value) : new Date();

        const updateTime = (time: string) => {
          const [hours, minutes] = time.split(":").map(Number);
          const date = value ? new Date(value) : new Date();
          date.setHours(hours);
          date.setMinutes(minutes);
          date.setSeconds(0);
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
              <CalendarIcon className="h-4 w-4 shrink-0" />
              {value
                ? format(currentDate, "PPP 'a las' hh:mm a", { locale: es })
                : "Selecciona fecha y hora"}
            </PopoverTrigger>
            <PopoverContent className="p-4 w-auto">
              <Calendar
                mode="single"
                selected={currentDate}
                onSelect={(date) => {
                  if (!date) return;
                  date.setHours(currentDate.getHours());
                  date.setMinutes(currentDate.getMinutes());
                  onChange(date);
                }}
                locale={es}
                disabled={disablePast ? (d) => d < new Date() : undefined}
              />
              <div className="mt-3 border-t pt-3">
                <label className="text-xs text-muted-foreground">Hora</label>
                <input
                  type="time"
                  value={format(currentDate, "HH:mm")}
                  onChange={(e) => updateTime(e.target.value)}
                  className="mt-1 h-9 w-full rounded-md border px-3 bg-background text-sm text-center"
                />
              </div>
            </PopoverContent>
          </Popover>
        );
      }}
    />
  );
}
