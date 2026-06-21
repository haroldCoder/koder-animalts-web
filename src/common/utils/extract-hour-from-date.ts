export const extractHourFromDate = (date: Date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
}