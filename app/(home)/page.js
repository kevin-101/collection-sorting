"use client";

import { firebaseApp, auth } from "@/firebase/config";

import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { adminColumns, userColumns } from "../columns";
import { DataTable } from "../data-table";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const colllection = "users"; // collection in firebase being used by the table
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false); // admin login state

  const db = getFirestore(firebaseApp);

  // check whether admin is logged in or not
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  });

  useEffect(() => {
    setIsLoading(true);
    const tableRef = collection(db, colllection); // reference to the collection to read from

    const q = query(tableRef, orderBy("amount", "desc"));
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
  }, [colllection]);

  return (
    <div className="px-6">
      {isSignedIn ? (
        <DataTable
          columns={adminColumns}
          data={userData}
          collection={colllection}
          isLoading={isLoading}
          isAdmin={isSignedIn}
        />
      ) : (
        <DataTable
          columns={userColumns}
          data={userData}
          collection={colllection}
          isLoading={isLoading}
          isAdmin={isSignedIn}
        />
      )}
    </div>
  );
}
