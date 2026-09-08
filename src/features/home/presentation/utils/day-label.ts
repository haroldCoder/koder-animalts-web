import { dateIsToday } from "./date-is-today";
import { dateIsTomorrow } from "./date-is-tomorrow";

export const dayLabel = (date: Date) => {
    const dateObj = new Date(date);

    if (dateIsToday(dateObj)) return "Hoy"
    if (dateIsTomorrow(dateObj)) return "Mañana"
}