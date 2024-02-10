"use client";

import { Button } from "@/components/ui/button";
import { columns, people } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";

export default function Home() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch(`https://65c70e85e7c384aada6e25cb.mockapi.io/users`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((users) => {
        setUserData([...users]);
        console.log(users);
      });
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-start">
          <div className="flex gap-8">
            <Button variant="destructive">Delete</Button>
            <Button variant="outline">Add</Button>
          </div>
        </div>
        <DataTable columns={columns} data={userData} />
      </div>
    </>
  );
}
