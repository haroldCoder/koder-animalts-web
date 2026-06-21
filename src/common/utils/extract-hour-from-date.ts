export const extractHourFromDate = (date: Date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
}