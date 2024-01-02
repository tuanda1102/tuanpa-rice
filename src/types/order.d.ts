import { type ISelectOptions } from '@/types/select';

export interface IOrder {
  id: string;
  name: string | ISelectOptions | null;
  foodName: string;
  price: string;
  status: string | ISelectOptions | null;
  menuId: string;
  isDeleted?: 'TRUE' | 'FALSE';
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IMenu {
  id?: string;
  title: string;
  price?: number;
  menuLink?: string;
  image?: string | FileList;
  isDeleted?: 'TRUE' | 'FALSE';
  createdAt?: Date | string;
  uploadedAt?: Date | string;
}

export interface IOrderSchema extends Omit<IOrder, 'id' | 'price' | 'menuId'> {}
