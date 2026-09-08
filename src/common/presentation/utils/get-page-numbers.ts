import { PaginationDto } from "@/common/interfaces";

export const getPageNumbers = (pagination: PaginationDto) => {
    if (!pagination || pagination.totalPages <= 0) return [];
    const { page, totalPages } = pagination;

    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis-start" | "ellipsis-end")[] = [];
    pages.push(1);

    if (page > 3) {
        pages.push("ellipsis-start");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (page < totalPages - 2) {
        pages.push("ellipsis-end");
    }

    pages.push(totalPages);
    return pages;
};