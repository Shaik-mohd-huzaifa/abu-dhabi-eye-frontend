// Import the functions you need from the SDKs you need
/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtuz5AtXF6g1H0Bfid6JppckQE_Xjlyt4",
  authDomain: "abu-dhabi-eye-6d006.firebaseapp.com",
  projectId: "abu-dhabi-eye-6d006",
  storageBucket: "abu-dhabi-eye-6d006.firebasestorage.app",
  messagingSenderId: "878430301568",
  appId: "1:878430301568:web:7165523f7383a3e0862565",
  measurementId: "G-PBT29BB880"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocument = async (collectionkey, objectToAdd) => {
  const collectionRef = collection(db, collectionkey);
  const batch = writeBatch(db);

  objectToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  batch.commit();
  console.log("done");
};

// export const getCategoriesAndData = async () => {
//   // const collectionRef = collection(db, "categories");
//   // const q = query(collectionRef);

//   // const querySnapShot = await getDocs(q);
//   // const categoryMap = querySnapShot.docs.reduce((acc, docSnapShot) => {
//   //   const { title, items } = docSnapShot.data();
//   //   acc[title.toLowerCase()] = items;
//   //   return acc;
//   // }, {});

//   // return categoryMap;
//   const collectionRef = collection(db, "categories");
//   const q = query(collectionRef);

//   const querySnapshot = await getDocs(q);
//   return querySnapshot.docs.map((doc) => doc.data());
// };

export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  // console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot.exists());
  // console.log(userSnapshot);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("Error Occured during User Creation", error);
    }
  }

  return userDocRef;
};

export const signupWithUserEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signinWithUserEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const userSignOut = async () => await signOut(auth);

export const onAuthUserStateChanged = (callback) => {
  onAuthStateChanged(auth, callback);
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);