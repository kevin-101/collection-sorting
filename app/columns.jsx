"use client";

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const people = [
  {
    id: "728ed52f",
    amount: 100,
    name: "Kevin",
    admission_no: "12234",
  },
  {
    id: "489e1d42",
    amount: 125,
    name: "Tinu",
    admission_no: "142134",
  },
  {
    id: "0203942",
    amount: 234,
    name: "Bernard",
    admission_no: "1231134",
  },
  {
    id: "3653636",
    amount: 234,
    name: "Bernard",
    admission_no: "1231134",
  },
  {
    id: "2342545",
    amount: 234,
    name: "Bernard",
    admission_no: "1231134",
  },
  {
    id: "2354535",
    amount: 234,
    name: "Bernard",
    admission_no: "1231134",
  },
  {
    id: "235252",
    amount: 234,
    name: "Bernard",
    admission_no: "1231134",
  },
  {
    id: "2535253",
    amount: 234,
    name: "Bernard",
    admission_no: "1231134",
  },
  {
    id: "132423",
    amount: 234,
    name: "Bernard",
    admission_no: "1231134",
  },
  {
    id: "141414",
    amount: 234,
    name: "Bernard",
    admission_no: "1231134",
  },
  {
    id: "132e114",
    amount: 234,
    name: "Bernard",
    admission_no: "1231134",
  },
];

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "admission_no",
    header: "Admission No",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("admission_no")}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => user.delete()}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
