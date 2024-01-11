export interface IOrder {
  id: string;
  userEmail: string | null;
  foodName: string;
  price: number | null;
  status: boolean;
  menuId: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdateOrder {
  menuId: string;
  idUser: string;
  body: Partial<IOrder>;
}
export interface IOrderSchema extends Omit<IOrder, 'id' | 'price' | 'menuId'> {}
