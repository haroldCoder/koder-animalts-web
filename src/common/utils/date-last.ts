export const getDateLast = (date: Date) => {
    const today = new Date();
    const diffInDays = (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    return diffInDays <= 7;
};