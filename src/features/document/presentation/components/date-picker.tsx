import { format } from "date-fns"
import { LucideCalendar } from "lucide-react"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { es } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"

interface DatePickerProps {
    startDate?: Date;
    endDate?: Date;
    setStartDate?: (date?: Date) => void;
    setEndDate?: (date?: Date) => void;
}

export function DatePicker({ startDate, endDate, setStartDate, setEndDate }: DatePickerProps) {

    return (
        <div className="flex items-center gap-2">
            <Popover>
                <PopoverTrigger className={cn(
                    "flex h-9 w-[135px] cursor-pointer items-center gap-2 rounded-lg border border-input bg-background px-3 text-left text-xs text-muted-foreground outline-none transition-colors hover:bg-muted/50 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                    startDate && "text-foreground font-medium border-primary/50"
                )}>
                    <LucideCalendar className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">
                        {startDate ? format(startDate, "dd/MM/yyyy") : "Fecha inicio"}
                    </span>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        locale={es}
                    />
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger className={cn(
                    "flex h-9 w-[135px] cursor-pointer items-center gap-2 rounded-lg border border-input bg-background px-3 text-left text-xs text-muted-foreground outline-none transition-colors hover:bg-muted/50 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                    endDate && "text-foreground font-medium border-primary/50"
                )}>
                    <LucideCalendar className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">
                        {endDate ? format(endDate, "dd/MM/yyyy") : "Fecha final"}
                    </span>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        locale={es}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}