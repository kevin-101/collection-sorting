"use client";

import * as React from "react";
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import getDocument from "@/firebase/firestore/getData";
import addData from "@/firebase/firestore/addData";
import updateData from "@/firebase/firestore/updateData";
import deleteData from "@/firebase/firestore/deleteData";

export function DataTable({ columns, data, setData, isLoading }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    autoResetPageIndex: false,
    meta: {
      edit: async (id, name, admission_no, amount) => {
        const newField = {
          name: name,
          admission_no: admission_no,
          amount: Number(amount),
        };

        const { res, error } = await updateData("users", id, newField);

        if (error) {
          return console.log(error);
        }
        const { result, err } = await getDocument("users");

        if (err) {
          return console.log(err);
        }
        console.log(result);
        setData([...result]);
      },
      delete: async (id) => {
        await deleteData("users", id);

        const { result, err } = await getDocument("users");

        if (err) {
          return console.log(err);
        }
        console.log(result);
        setData([...result]);
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // data for adding new fields
  const [name, setName] = React.useState("");
  const [admissionNo, setAdmissionNo] = React.useState("");
  const [amount, setAmount] = React.useState("");

  const deleteSelected = async () => {
    if (table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()) {
      const rows = table.getSelectedRowModel().rows;
      const ids = rows.map((row) => row.original.id);
      console.log(ids);

      ids.forEach((id) => {
        deleteData("users", id);
      });

      const { result, err } = await getDocument("users");

      if (err) {
        return console.log(err);
      }
      console.log(result);
      setData([...result]);

      if (rows) {
        table.resetRowSelection();
      }
      console.log("deleted");
    }
  };

  const handleAdd = async () => {
    if (name && admissionNo && amount) {
      const newField = {
        name: name,
        admission_no: admissionNo,
        amount: Number(amount),
      };

      const { res, error } = await addData("users", newField);

      // setData((prev) => [...prev, newField]);
      setName("");
      setAdmissionNo("");
      setAmount("");

      if (error) {
        return console.log(error);
      }
      const { result, err } = await getDocument("users");

      if (err) {
        return console.log(err);
      }
      console.log(result);
      setData([...result]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-start">
        <div className="flex gap-8">
          <Button variant="destructive" onClick={deleteSelected}>
            Delete
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Field</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Admission No
                  </Label>
                  <Input
                    id="admission-no"
                    className="col-span-3"
                    onChange={(e) => setAdmissionNo(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    className="col-span-3"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit" onClick={handleAdd}>
                    Add
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center pb-4">
          <Input
            placeholder="Search..."
            value={table.getColumn("name")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
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
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
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
              ) : (
                <TableRow>
                  {isLoading ? (
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Loading...
                    </TableCell>
                  ) : (
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
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
    </div>
  );
}
