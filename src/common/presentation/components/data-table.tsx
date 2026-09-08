import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
} from "@tanstack/react-table";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationDto } from "@/common/interfaces";
import { Loading } from "./loading";
import { getPageNumbers } from "../utils";

interface TablePaginationProps extends PaginationDto {
    onPageChange: (page: number) => void;
}

interface DataTableProps<TData> {
    columns: ColumnDef<TData>[];
    data: TData[];
    styles?: string;
    pagination?: TablePaginationProps;
    isLoading?: boolean;
}

export function DataTable<TData>({
    columns,
    data,
    styles,
    pagination,
    isLoading,
}: DataTableProps<TData>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const canPreviousPage = pagination ? pagination.hasPrev : false;
    const canNextPage = pagination ? pagination.hasNext : false;

    const rangeStart = pagination && pagination.total > 0 ? (pagination.page - 1) * pagination.limit + 1 : 0;
    const rangeEnd = pagination ? Math.min(pagination.page * pagination.limit, pagination.total) : 0;



    return (
        <div className="flex flex-col gap-4">
            <Table className={`${styles} `}>
                <TableHeader className="table-header">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody className="table-body">
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                <Loading />
                            </TableCell>
                        </TableRow>
                    ) : (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {pagination && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 px-3 sm:px-4 py-3 border-t border-gray-200/50 dark:border-gray-800/50">
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium text-center sm:text-left order-2 sm:order-1">
                        <span>
                            Mostrando <span className="text-gray-700 dark:text-gray-200 font-semibold">{rangeStart}–{rangeEnd}</span> de{" "}
                            <span className="text-gray-700 dark:text-gray-200 font-semibold">{pagination.total}</span>
                        </span>
                        <span className="hidden sm:inline">
                            {" "}resultados &nbsp;·&nbsp; Página{" "}
                            <span className="text-gray-700 dark:text-gray-200 font-semibold">{pagination.page}</span> de{" "}
                            <span className="text-gray-700 dark:text-gray-200 font-semibold">{pagination.totalPages}</span>
                        </span>
                    </div>

                    <Pagination className="mx-0 w-auto justify-center sm:justify-end order-1 sm:order-2">
                        <PaginationContent className="gap-1 sm:gap-1.5">
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    text="Anterior"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (canPreviousPage) {
                                            pagination.onPageChange(pagination.page - 1);
                                        }
                                    }}
                                    className={!canPreviousPage ? "pointer-events-none opacity-40 cursor-not-allowed" : "cursor-pointer"}
                                />
                            </PaginationItem>

                            {/* Indicador compacto para mobile */}
                            <PaginationItem className="sm:hidden">
                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 px-2.5 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-md select-none">
                                    {pagination.page} / {pagination.totalPages}
                                </span>
                            </PaginationItem>

                            {/* Números de página inteligentes para pantallas medianas/grandes */}
                            {getPageNumbers(pagination).map((item, idx) => {
                                if (item === "ellipsis-start" || item === "ellipsis-end") {
                                    return (
                                        <PaginationItem key={`${item}-${idx}`} className="hidden sm:inline-block">
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    );
                                }
                                const pageNum = item as number;
                                const isCurrent = pagination.page === pageNum;
                                return (
                                    <PaginationItem key={pageNum} className="hidden sm:inline-block">
                                        <PaginationLink
                                            href="#"
                                            isActive={isCurrent}
                                            className={`${isCurrent
                                                    ? "bg-main text-white hover:bg-main hover:text-white"
                                                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                                } cursor-pointer min-w-9 h-9 text-xs sm:text-sm`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (!isCurrent) {
                                                    pagination.onPageChange(pageNum);
                                                }
                                            }}
                                        >
                                            {pageNum}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            })}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    text="Siguiente"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (canNextPage) {
                                            pagination.onPageChange(pagination.page + 1);
                                        }
                                    }}
                                    className={!canNextPage ? "pointer-events-none opacity-40 cursor-not-allowed" : "cursor-pointer"}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
}