import firebaseApp from "../config";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default async function deleteData(coll, id) {
  let docRef = doc(db, coll, id);

  console.log(id);

  let result = null;
  let error = null;

  try {
    result = await deleteDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
