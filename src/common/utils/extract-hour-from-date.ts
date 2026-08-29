export const extractHourFromDate = (date: Date | string) => {
    if (!date) return "";

    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return "";
    return dateObj.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
}
