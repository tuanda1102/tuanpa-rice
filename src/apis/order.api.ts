import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  updateDoc,
  addDoc,
  getDocs,
  collection,
  doc,
  deleteDoc,
} from 'firebase/firestore';

import { MenuCollectionRef } from '@/constants/firebaseCollections.constant';
import { type IMenu } from '@/types/menu';
import { firebaseDB } from '@/config/firebase.config';
import { type IOrder, type IUpdateOrder } from '@/types/order';

/**
 * Thêm menu
 */
const addMenu = async (data: Partial<IMenu>) => {
  const res = await addDoc(MenuCollectionRef, data);
  return res;
};

export const useAddMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMenu,
    onSuccess() {
      queryClient.invalidateQueries(['get-menu']);
    },
  });
};

const updateOrder = async (data: IUpdateOrder) => {
  const orderDoc = doc(
    firebaseDB,
    'menu',
    data.menuId,
    'ordered',
    data.idOrder,
  );
  const res = await updateDoc(orderDoc, data.body);
  return res;
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(['get-menu']);
    },
  });
};
/**
 * Lấy menu
 */
const getMenu = async () => {
  const menu = await getDocs(MenuCollectionRef);
  return menu.docs.map((elem) => ({ ...elem.data(), id: elem.id })) as IMenu[];
};

export const useMenu = () => {
  const { data: menuList, ...queryOptions } = useQuery({
    queryKey: ['get-menu'],
    queryFn: getMenu,
  });

  return { menuList, ...queryOptions };
};

/**
 * Thêm đơn order
 */
interface IAddOrder {
  menuId: string;
  body: Partial<IOrder>;
}

const addOrder = async (data: IAddOrder) => {
  const orderedRef = collection(firebaseDB, 'menu', data.menuId, 'ordered');

  const res = await addDoc(orderedRef, data.body);
  return res;
};

export const useAddOrder = () => {
  return useMutation({
    mutationFn: addOrder,
  });
};

/**
 * Get Menu detail by ID
 */
const getOrderedListById = async (menuId: string) => {
  const orderedRef = collection(firebaseDB, 'menu', menuId, 'ordered');
  const menuDetail = await getDocs(orderedRef);
  return menuDetail.docs.map((elem) => ({
    ...elem.data(),
    id: elem.id,
  })) as IOrder[];
};

export const useGetOrderedListById = (menuId: string) => {
  const { data: orderedList, ...queryOptions } = useQuery({
    queryKey: ['get-menu-by-id', menuId],
    queryFn: () => getOrderedListById(menuId),
    enabled: !!menuId,
  });

  return { orderedList, ...queryOptions };
};

/**
 * Delete order by ID
 */
interface IDeleteOrder {
  menuId: string;
  orderId: string;
}

const deleteOrderById = async (data: IDeleteOrder) => {
  const orderedRef = collection(firebaseDB, 'menu', data.menuId, 'ordered');
  const res = await deleteDoc(doc(orderedRef, data.orderId));

  return res;
};

export const useDeleteOrderById = () => {
  return useMutation({
    mutationFn: deleteOrderById,
  });
};
