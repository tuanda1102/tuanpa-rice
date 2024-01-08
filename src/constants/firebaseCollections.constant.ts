import { collection } from 'firebase/firestore';

import { firebaseDB } from '@/config/firebase.config';

export const UsersCollectionRef = collection(firebaseDB, 'users');
export const MenuCollectionRef = collection(firebaseDB, 'menu');
export const OrdersCollectionRef = collection(firebaseDB, 'orders');
