import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCM193TivrAAFh1HApQuWYXSYc5xgKXyDU',
  authDomain: 'tuanpa-rice.firebaseapp.com',
  projectId: 'tuanpa-rice',
  storageBucket: 'tuanpa-rice.appspot.com',
  messagingSenderId: '542929420568',
  appId: '1:542929420568:web:f8d678170d1607bf969e6d',
  measurementId: 'G-ZHNBCNEX5D',
};

const app = initializeApp(firebaseConfig);
export const firebaseDB = getFirestore(app);
