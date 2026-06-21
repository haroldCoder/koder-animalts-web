import { dateIsToday } from "./date-is-today";

export const dayLabel = (date: Date) => {
    const dateObj = new Date(date);
    return dateIsToday(dateObj) ? "hoy" : "mañana";
}