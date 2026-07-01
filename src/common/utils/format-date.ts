export class formatDate {
    static formattedDay(date: Date): string {
        const day = new Intl.DateTimeFormat("es-ES", { day: "2-digit" }).format(date);
        return day;
    }

    static formattedMonth(date: Date): string {
        const month = new Intl.DateTimeFormat("es-ES", { month: "short" }).format(date).replace(".", "");
        return month;
    }

    static formattedYear(date: Date): string {
        const year = new Intl.DateTimeFormat("es-ES", { year: "numeric" }).format(date);
        return year;
    }
}