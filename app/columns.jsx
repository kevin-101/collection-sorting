"use client";

import { ArrowUpDown, Trash2, Pencil, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import updateData from "@/firebase/firestore/updateData";
import RowActions from "@/components/row-actions";

// let name;
// let admission_no;
// let amount;

// const handleEdit = (id, name, admission_no, amount) => {
//   const newField = {
//     name: name,
//     admission_no: admission_no,
//     amount: amount,
//   };

//   const { result, error } = updateData("users", id, newField);

//   if (error) {
//     return console.log(error);
//   }
//   console.log(result);
// };

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
        <>
          <div className="flex gap-2">
            <RowActions rowProp={row} tableProp={table} userProp={user} />
            {/* <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <Pencil className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Field</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      className="col-span-3"
                      defaultValue={user.name}
                      onChange={(e) => (name = e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Admission No
                    </Label>
                    <Input
                      id="admission-no"
                      className="col-span-3"
                      defaultValue={user.admission_no}
                      onChange={(e) => (admission_no = e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Amount
                    </Label>
                    <Input
                      id="amount"
                      className="col-span-3"
                      defaultValue={user.amount}
                      onChange={(e) => {
                        amount = e.target.value;
                      }}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="submit" onClick={() => handleEdit(user.id)}>
                      Edit
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button
              variant="destructive"
              className="h-8 w-8 p-0"
              onClick={() => table.options.meta.delete(row.index)}
            >
              <span className="sr-only">Open menu</span>
              <Trash2 className="h-4 w-4" />
            </Button> */}
          </div>
        </>
      );
    },
  },
];
