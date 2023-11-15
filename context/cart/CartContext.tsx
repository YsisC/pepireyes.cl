import { createContext } from "react";
import { ICartProduct, ShippingAddress } from "../../interfaces";
import { Location } from './CartProvider';

interface ContextProps {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  delivery: number;
  total: number;
  location?: Location;
  shippingAddress?: ShippingAddress;

  // Methods
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
  updateAddress: (address: ShippingAddress) => void;
  saveLocation: (location: Location, place: any) => void;
  // Orders
  createOrder: () => Promise<{ hasError: boolean; message: string }>;
}

export const CartContext = createContext({} as ContextProps);
