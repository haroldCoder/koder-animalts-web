export function formatTimeAgo(dateInput: Date | string): string {
    const date = new Date(dateInput);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "Hoy o muy reciente";
    if (diffDays === 1) return "Ayer";
    if (diffDays < 30) return `Hace ${diffDays} días`;
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return "Hace 1 mes";
    if (diffMonths < 12) return `Hace ${diffMonths} meses`;
    const diffYears = Math.floor(diffDays / 365);
    return diffYears === 1 ? "Hace 1 año" : `Hace ${diffYears} años`;
}
