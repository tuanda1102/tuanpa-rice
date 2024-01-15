export interface IMenu {
  id: string;
  title: string;
  description: string | null;
  price: int;
  priceSale?: int;
  image: string | null;
  menuLink: string | null;
  isDeleted: boolean;
  isBlocked?: boolean;
  isSamePrice?: boolean;
  isClosed?: boolean;
  createdByUser: string;
  avatarThumbnail: string | null;
  createdAt: Date;
  updatedAt: Date;
}
