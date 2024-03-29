import firebase_app from "../config";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function getDocument(coll) {
  let collectionRef = collection(db, coll);

  let result = null;
  let error = null;

  try {
    const q = query(collectionRef, orderBy("amount", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      result = querySnapshot.map((doc) => ({ ...doc.data(), id: doc.id }));
    });
    // const querySnapshot = await getDocs(q);
    // result = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log(result);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
