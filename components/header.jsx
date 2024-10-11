"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";

import Link from "next/link";
import { toast } from "sonner";

export default function Header() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  // check whether admin is logged in or not
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  });

  return (
    <>
      <div className="w-full flex justify-end pt-2 px-6">
        {isSignedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer w-12 h-12">
                <AvatarImage src="" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  auth.signOut();
                  toast.success("Logged out");
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild>
            <Link href="/login">Admin Login</Link>
          </Button>
        )}
      </div>
      <Separator className="mb-8 mt-2" />
    </>
  );
}
