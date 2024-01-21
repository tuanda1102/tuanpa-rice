import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  updateDoc,
  addDoc,
  getDocs,
  collection,
  doc,
  deleteDoc,
  query,
  orderBy,
  getDoc,
  collectionGroup,
  where,
  writeBatch,
} from 'firebase/firestore';

import { MenuCollectionRef } from '@/constants/firebaseCollections.constant';
import { type IMenu } from '@/types/menu';
import { firebaseDB } from '@/config/firebase.config';
import { type IOrder, type IUpdateOrder } from '@/types/order';
import appToast from '@/utils/toast.util';

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
      queryClient.invalidateQueries(['get-menus']);
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
      queryClient.invalidateQueries(['get-menus']);
    },
  });
};
/**
 * Lấy menus
 */
const getMenus = async () => {
  const menu = await getDocs(
    query(MenuCollectionRef, orderBy('createdAt', 'desc')),
  );
  const menuList = menu.docs.map((elem) => ({
    ...elem.data(),
    id: elem.id,
  })) as IMenu[];
  return menuList;
};

export const useMenus = () => {
  const { data: menuList, ...queryOptions } = useQuery({
    queryKey: ['get-menus'],
    queryFn: getMenus,
  });

  return { menuList, ...queryOptions };
};

/**
 * Lấy menu
 */

const getMenu = async (menuId: string) => {
  const menuRef = doc(firebaseDB, 'menu', menuId);
  const docSnap = await getDoc(menuRef);

  if (docSnap.exists()) {
    // Trả về dữ liệu menu nếu tìm thấy
    return docSnap.data();
  }
  return {};
};

export const useMenu = (menuId: string) => {
  return useQuery({
    queryKey: ['get-menu'],
    queryFn: () => getMenu(menuId),
  });
};

/**
 * Update menu
 */

interface IUpdateMenu {
  menuId: string;
  body: Partial<IMenu>;
}

const updateMenu = async (data: IUpdateMenu) => {
  const menuRef = doc(firebaseDB, 'menu', data.menuId);
  const res = await updateDoc(menuRef, data.body);
  return res;
};

export const useUpdateMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMenu,
    onSuccess() {
      queryClient.invalidateQueries(['get-menus']);
    },
  });
};
/**
 * Xóa menu
 */

interface IDeleteMenu {
  menuId: string;
}

const deleteMenu = async (data: IDeleteMenu) => {
  const res = await deleteDoc(doc(MenuCollectionRef, data.menuId));
  return res;
};

export const useDeleteMenu = () => {
  return useMutation({
    mutationFn: deleteMenu,
  });
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
 * Get all order
 */

const getAllOrders = async () => {
  const orderedRef = collectionGroup(firebaseDB, 'ordered');
  const orderSnapshot = await getDocs(orderedRef);

  const allOrder = orderSnapshot.docs.map((order) => ({
    id: order.id,
    ...order.data(),
  })) as IOrder[];
  return allOrder;
};

export const useGetAllOrders = () => {
  const { data: allOrders = [], ...queryOptions } = useQuery({
    queryKey: ['get-all-orders'],
    queryFn: getAllOrders,
  });

  return { allOrders, ...queryOptions };
};

/**
 * update all order
 */

const updateAllOrders = async (userEmail: string) => {
  const orderedRef = collectionGroup(firebaseDB, 'ordered');
  const orderSnapshot = await getDocs(
    query(
      orderedRef,
      where('userEmail', '==', userEmail),
      where('status', '==', false),
    ),
  );

  const batch = writeBatch(firebaseDB);

  orderSnapshot.forEach((orderMissing) => {
    const orderRef = orderMissing.ref;
    batch.update(orderRef, { status: true });
  });

  await batch.commit();
};

export const useUpdateAllOrders = () => {
  const queryClient = useQueryClient();
  const { data: allOrders = [], ...queryOptions } = useMutation({
    mutationFn: updateAllOrders,
    onSuccess() {
      queryClient.invalidateQueries(['get-all-orders']);
      appToast({
        type: 'success',
        props: {
          text: 'Thanh toán thành công!',
        },
      });
    },
    onError() {
      appToast({
        type: 'error',
        props: {
          text: 'Thử lại dùm mình nhá thất bại ruifiii !!!!',
        },
      });
    },
  });

  return { allOrders, ...queryOptions };
};

/**
 * Get Menu detail by ID
 */
const getOrderedListById = async (menuId: string) => {
  const orderedRef = collection(firebaseDB, 'menu', menuId, 'ordered');
  const menuDetail = await getDocs(
    query(orderedRef, orderBy('createdAt', 'asc')),
  );
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
