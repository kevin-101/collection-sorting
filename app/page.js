"use client";

import firebaseApp from "@/firebase/config";

import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";

export default function Home() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const db = getFirestore(firebaseApp);

  useEffect(() => {
    const usersRef = collection(db, "users");

    const q = query(usersRef, orderBy("amount", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });

      setUserData(data);
      setIsLoading(false);
    });

    return () => {
      unsubscribe && unsubscribe();
    };
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
