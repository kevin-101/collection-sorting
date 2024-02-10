"use client";

import { columns } from "./columns";
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
      <DataTable columns={columns} data={userData} setData={setUserData} />
    </>
  );
}
