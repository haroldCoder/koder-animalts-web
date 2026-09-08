export const dateIsTomorrow = (date: Date) => {
    if (!date) return false;
    const d = new Date(date);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return d.getUTCDate() === tomorrow.getUTCDate() &&
        d.getUTCMonth() === tomorrow.getUTCMonth() &&
        d.getUTCFullYear() === tomorrow.getUTCFullYear();
}