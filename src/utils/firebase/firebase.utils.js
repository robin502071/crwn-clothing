import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCtIONL9cEIXntjElT-w7gGXK9JG_NzN8w',
  authDomain: 'crwn-clothing-db-2a895.firebaseapp.com',
  projectId: 'crwn-clothing-db-2a895',
  storageBucket: 'crwn-clothing-db-2a895.appspot.com',
  messagingSenderId: '758180544862',
  appId: '1:758180544862:web:eeb130b62cb76c1186cfcf',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot);
  // console.log(userSnapshot.exists());

  // 如果使用者不存在
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('建立使用者失敗' + error.message);
    }
  }

  // 如果使用者存在直接回傳 userDocRef
  return userDocRef;
};
