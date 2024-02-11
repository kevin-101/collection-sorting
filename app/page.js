"use client";

import getDocument from "@/firebase/firestore/getData";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";

export default function Home() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUsers = async () => {
    const { result, error } = await getDocument("users");

    if (error) {
      setIsLoading(false);
      return console.log(error);
    }
    console.log(result);
    setUserData([...result]);
    setIsLoading(false);
  };

  useEffect(() => {
    getUsers();
    // fetch(`https://65c70e85e7c384aada6e25cb.mockapi.io/users`, {
    //   method: "GET",
    //   headers: { "content-type": "application/json" },
    // })
    //   .then((res) => {
    //     if (res.ok) {
    //       return res.json();
    //     }
    //   })
    //   .then((users) => {
    //     setUserData([...users]);
    //     setIsLoading(false);
    //     console.log(users);
    //   });
  }, []);

  return (
    <>
      <DataTable
        columns={columns}
        data={userData}
        setData={setUserData}
        isLoading={isLoading}
      />
    </>
  );
}
