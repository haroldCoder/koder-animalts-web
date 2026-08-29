import { format } from "date-fns";
import { extractHourFromDate } from "./extract-hour-from-date";

export class FormatDate {
    static formattedDay(date: Date): string {
        return new Intl.DateTimeFormat("es-ES", { day: "2-digit", timeZone: "UTC" }).format(date);
    }
    static formattedMonth(date: Date): string {
        return new Intl.DateTimeFormat("es-ES", { month: "short", timeZone: "UTC" }).format(date).replace(".", "");
    }
    static formattedYear(date: Date): string {
        return new Intl.DateTimeFormat("es-ES", { year: "numeric", timeZone: "UTC" }).format(date);
    }

    static formattedDate(date: Date): string {
        return this.formattedDay(date) + " " + this.formattedMonth(date) + ", " + this.formattedYear(date);
    }

    /**
     * Formatea una fecha usando date-fns con zona horaria UTC para evitar
     * que la fecha se retrase un día por diferencia de zona horaria local.
     *
     * @param date  Fecha a formatear
     * @param formatStr Cadena de formato de date-fns (ej. "dd/MM/yyyy", "yyyy-MM-dd")
     * @returns Fecha formateada en UTC
     */
    static format(date: Date | string, formatStr: string = "dd/MM/yyyy HH:mm:ss"): string {
        const d = typeof date === "string" ? new Date(date) : date;
        // Construimos una fecha desplazada al offset UTC para que date-fns
        // la interprete sin conversión local
        const utcDate = new Date(
            d.getUTCFullYear(),
            d.getUTCMonth(),
            d.getUTCDate(),
            d.getUTCHours(),
            d.getUTCMinutes(),
            d.getUTCSeconds(),
        );

        return format(utcDate, formatStr);
    }

    /**
     * Formatea y retorna únicamente la fecha limpia (por defecto dd/MM/yyyy).
     */
    static onlyDate(date?: Date | string | null, formatStr: string = "dd/MM/yyyy"): string | null {
        if (!date) return null;
        try {
            return this.format(date, formatStr);
        } catch {
            return null;
        }
    }

    /**
     * Extrae y retorna únicamente la hora limpia (ej. "04:30 PM" o "16:30").
     */
    static onlyTime(date?: Date | string | null, fallback: string = "--:--"): string {
        if (!date) return fallback;
        const result = extractHourFromDate(date);
        return result || fallback;
    }
}