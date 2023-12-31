import { ISize, IUser } from "./";

export interface IOrder {
  _id?: string;
  user?: IUser | string;
  orderItems: IOrderItem[];
  shippingAddress: ShippingAddress;
  paymentResult?: string;

  numberOfItems: number;
  subTotal: number;
delivery: number;
  total: number;

  isPaid: boolean;
  paidAt?: string;
  status?: number;
  session_id?: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface IOrderItem {
  _id: string;
  title: string;
  size: ISize;
  quantity: number;
  slug: string;
  image: string;
  price: number;
}
export interface Location {
  lat: number;
  lng: number;
  address?: string;
  name?: string;
  city?: string;
  commune?: string;
  googleAddressId?: string;
}
export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  city: string;
  commune: string;
  phone: string;
}
