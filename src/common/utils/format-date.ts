import { format } from "date-fns";

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
    static format(date: Date | string, formatStr: string = "dd/MM/yyyy"): string {
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
}