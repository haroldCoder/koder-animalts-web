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
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationDto } from "@/common/interfaces";
import { Loading } from "./loading";

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

    const rangeStart = pagination ? (pagination.page - 1) * pagination.limit + 1 : 0;
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
                <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200/50 dark:border-gray-800/50">
                    <span className="text-xs text-gray-500 font-medium">
                        Mostrando {rangeStart}–{rangeEnd} de{" "}
                        <span className="text-gray-700 dark:text-gray-300 font-semibold">
                            {pagination.total}
                        </span>{" "}
                        resultados &nbsp;·&nbsp; Página{" "}
                        <span className="text-gray-700 dark:text-gray-300 font-semibold">
                            {pagination.page}
                        </span>{" "}
                        de{" "}
                        <span className="text-gray-700 dark:text-gray-300 font-semibold">
                            {pagination.totalPages}
                        </span>
                    </span>
                    <Pagination className="mx-0 w-auto">
                        <PaginationContent>
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
                                    className={!canPreviousPage ? "pointer-events-none opacity-50 cursor-not-allowed" : "cursor-pointer"}
                                />
                            </PaginationItem>
                            <PaginationItem>
                                {Array.from({ length: pagination.totalPages }, (_, index) => (
                                    <PaginationLink className={`${pagination.page === index + 1 ? "bg-main text-white" : ""} cursor-pointer`} key={index} href="#" onClick={(e) => {
                                        e.preventDefault();
                                        pagination.onPageChange(index + 1);
                                    }}>
                                        {index + 1}
                                    </PaginationLink>
                                ))}
                            </PaginationItem>
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
                                    className={!canNextPage ? "pointer-events-none opacity-50 cursor-not-allowed" : "cursor-pointer"}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
}