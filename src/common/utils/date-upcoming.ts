export const getDateUpcoming = (date: Date) => {
    const today = new Date();
    return date.getTime() >= today.getTime();
};