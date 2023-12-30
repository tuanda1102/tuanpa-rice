export interface IOrder {
  id: string;
  name: string;
  foodName: string;
  price: string;
  status: 'TRUE' | 'FALSE';
  menuId: string;
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
