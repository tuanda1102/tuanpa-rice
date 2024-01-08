export interface IMenu {
  id: string;
  title: string;
  description: string | null;
  price: int;
  image: string | null;
  menuLink: string | null;
  isDeleted: boolean;
  createdByUser: string;
  avatarThumbnail: string | null;
  createdAt: Date;
  updatedAt: Date;
}
