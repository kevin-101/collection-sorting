import { firebaseApp } from "../config";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default async function updateData(coll, id, data) {
  let docRef = doc(db, coll, id);

  console.log(id);

  let result = null;
  let error = null;

  try {
    result = await updateDoc(docRef, data);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
