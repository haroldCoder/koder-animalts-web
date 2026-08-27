export class formatDate {
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
}