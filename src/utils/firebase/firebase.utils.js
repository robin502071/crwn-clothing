import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  // 建立一個 collection 實例，同 doc 方法
  // 在 firestore 沒有參照就會創造一個新的
  const collectionRef = collection(db, collectionKey);
  // 建立 batch 實例
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async () => {
  // 2. 建立 categories 的 collection 實例
  const collectionRef = collection(db, 'categories');
  // 3. 得到 query 查詢 => 呼叫 query(collection 實例)
  const q = query(collectionRef);
  // 4. await getDocs(query)
  const querySnapShot = await getDocs(q);
  // 5. querySnapShot.docs 可以得到一個陣列，我們要的資料都在裡頭，但還是要再處理
  const categoryMap = querySnapShot.docs.reduce((acc, docSnapShot) => {
    // 6. docSnapShot.data() 才是我們真正要的那一筆 document 物件
    const { title, items } = docSnapShot.data();
    // 7. 將我們需要的資料合併成一個大物件
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  // 如果使用者不存在
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('建立使用者失敗' + error.message);
    }
  }

  // 如果使用者存在直接回傳 userDocRef
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
