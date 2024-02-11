"use client";

import * as React from "react";

import { Trash2, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
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

export default function RowActions({ rowProp, tableProp, userProp }) {
  const [name, setName] = React.useState(userProp.name);
  const [admissionNo, setAdmissionNo] = React.useState(userProp.admission_no);
  const [amount, setAmount] = React.useState(userProp.amount);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" className="h-8 w-8 p-0">
            <span className="sr-only">Edit</span>
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
                defaultValue={userProp.name}
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
                defaultValue={userProp.admission_no}
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
                defaultValue={userProp.amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="submit"
                onClick={() =>
                  tableProp.options.meta.edit(
                    userProp.id,
                    name,
                    admissionNo,
                    amount
                  )
                }
              >
                Edit
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button
        variant="destructive"
        className="h-8 w-8 p-0"
        onClick={() => tableProp.options.meta.delete(userProp.id)}
      >
        <span className="sr-only">Delete</span>
        <Trash2 className="h-4 w-4" />
      </Button>
    </>
  );
}
