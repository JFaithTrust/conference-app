"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserType } from "@/types";
import { getAllUsers } from "@/fetch_api/fetchUsers";
import { useRouter } from "next/navigation";


export function DataTableDemo() {
  const [allUsers, setAllUsers] = useState<UserType[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  useEffect(() => {
    const getUsers = async () => {
      const data = await getAllUsers("USER");
      setAllUsers(data);
    };
    getUsers();
  }, []);

  const columns: ColumnDef<UserType>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-left pl-3">Id</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left font-medium pl-3">{row.getValue("id")}</div>
        );
      },
    },
    {
      accessorKey: "fullName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-0"
          >
            Full Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("fullName")}</div>
      ),
    },
    {
      accessorKey: "phoneNumber",
      header: () => {
        return (
          <Button variant="ghost" className="px-0">
            Phone Number
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("phoneNumber")}</div>
      ),
    },
    // {
    //   accessorKey: "email",
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //         className="px-0"
    //       >
    //         Email
    //         <ArrowUpDown className="ml-2 h-4 w-4" />
    //       </Button>
    //     );
    //   },
    //   cell: ({ row }) => (
    //     <div className="lowercase">{row.getValue("email")}</div>
    //   ),
    // },
    {
      accessorKey: "userStatus",
      header: ({ column }) => {
        return (
          <Button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            variant="ghost"
            className="w-full"
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div
            className={`capitalize text-white rounded-2xl text-center py-2 w-[120px] mx-auto ${
              row.getValue("userStatus") === "ACTIVE"
                ? "bg-typegreen"
                : "bg-typered"
            }`}
          >
            {row.getValue("userStatus")}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: allUsers,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="flex items-center py-4 justify-end">
        <Input
          placeholder="Search..."
          value={(table.getColumn("fullName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("fullName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-2xl border bg-mainwhite">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="bg-mainwhite rounded-t-2xl py-5"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="table-row-group gap-2">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} onClick={() => router.push(`/dashboard/users/${row.getValue("id")}`)} className="cursor-pointer">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>No results.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          {table.getPageOptions().map((page) => (
            <Button
              key={page}
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(page)}
            >
              {page + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

const Users = () => {
  return (
    <div className="flex flex-col gap-y-[18px] px-[30px]">
      <DataTableDemo />
    </div>
  );
};

export default Users;
