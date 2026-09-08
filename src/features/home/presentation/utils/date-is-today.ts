export const dateIsToday = (date: Date) => {
    if (!date) return false;
    const d = new Date(date);
    const today = new Date();
    return d.getUTCDate() === today.getUTCDate() &&
        d.getUTCMonth() === today.getUTCMonth() &&
        d.getUTCFullYear() === today.getUTCFullYear();
};