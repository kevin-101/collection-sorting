import firebaseApp from "../config";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default async function addData(coll, data) {
  let collectionRef = collection(db, coll);

  let result = null;
  let error = null;

  try {
    result = await addDoc(collectionRef, data);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
