import React, { FC, useEffect, useReducer } from "react";
import Cookie from "js-cookie";
import axios from "axios";

import { CartContext, cartReducer } from "./";
import { ICartProduct } from "@/interfaces/cart";
import { pepireyesApi } from "@/axiosApi";
import { IOrder } from "@/interfaces/order";

export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  delivery: number;
  total: number;
  location?: Location;
  shippingAddress?: ShippingAddress;
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
export interface FormData  {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  city: string;
  commune: string;
  phone: string;
};

interface CartProviderProps {
  children: React.ReactNode;
}

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  delivery: 0,
  total: 0,
  shippingAddress: undefined,
  location: undefined,
};

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  // Efecto
  useEffect(() => {
    try {
      const cookieProducts = Cookie.get("cart")
        ? JSON.parse(Cookie.get("cart")!)
        : [];
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: cookieProducts,
      });
    } catch (error) {
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: [],
      });
    }
  }, []);
  // Efecto
  useEffect(() => {
    try {
      const cookieCost = Cookie.get("delivery")
        ? Number(Cookie.get("delivery"))
        : 0;
      dispatch({
        type: "[Cost] - LoadCost from cookies | storage",
        payload: cookieCost,
      });
      state.total = state.delivery + state.subTotal;
    } catch (error) {
      dispatch({
        type: "[Cost] - LoadCost from cookies | storage",
        payload: 0,
      });
    }
  }, [state.delivery]);

  useEffect(() => {
    if (Cookie.get("firstName")) {
      const shippingAddress = {
        firstName: Cookie.get("firstName") || "",
        lastName: Cookie.get("lastName") || "",
        address: Cookie.get("address") || "",
        address2: Cookie.get("address2") || "",
        city: Cookie.get("city") || "",
        commune: Cookie.get("commune") || "",
        phone: Cookie.get("phone") || "",
      };
      dispatch({
        type: "[Cart] - LoadAddress from Cookies",
        payload: shippingAddress,
      });
    }
  }, []);

  useEffect(() => {
    if (state.cart.length > 0) {
      Cookie.set("cart", JSON.stringify(state.cart));
    }
  }, [state.cart]);

  useEffect(() => {
    if (state.delivery > 0) {
      Cookie.set("delivery", String(state.delivery));
      state.total = state.delivery + state.subTotal
    }
  }, [state.total, state.delivery]);

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    );
    const subTotal = state.cart.reduce(
      (prev, current) => current.quantity * current.price + prev,
      0
    );
    const delivery = Number(Cookie.get("cost")) | 0;
    const orderSummary = {
      numberOfItems,
      subTotal,
      delivery,
      total: subTotal + delivery,
    };
    dispatch({ type: "[Cart] - Update order summary", payload: orderSummary });
  }, [state.cart]);

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some((p) => p._id === product._id);
    if (!productInCart)
      return dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart, product],
      });

    const productInCartButDifferentSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    );
    if (!productInCartButDifferentSize)
      return dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart, product],
      });

    // Acumular
    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      // if (p.size !== product.size) return p;

      // Actualizar la cantidad
      p.quantity += product.quantity;
      return p;
    });

    dispatch({
      type: "[Cart] - Update products in cart",
      payload: updatedProducts,
    });
  };

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: "[Cart] - Change cart quantity", payload: product });
  };
  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: "[Cart] - Remove product in cart", payload: product });
  };
  const removeAllCartProduct = () => {
    dispatch({ type: "[Cart] - Remove all product in cart", payload: [] });
  };
  
  const updateAddress = ( address: ShippingAddress ) => {
    Cookie.set('firstName',address.firstName);
    Cookie.set("lastName", address.lastName);
    Cookie.set("address", address.address);
    Cookie.set("address2", address.address2 || "");
    Cookie.set("city", address.city);
    Cookie.set("commune", address.commune);
    Cookie.set("phone", address.phone);

    dispatch({ type: "[Cart] - Update Address", payload: address });
  };
  const updateDelivey = (delivery: number) => {
    Cookie.set("delivery", String(delivery));

    dispatch({ type: "[Cost] - Update Delivery", payload: delivery });
    state.total = state.delivery + state.subTotal;
  };
  const saveLocation = (location: any, places: any) => {
    const customLocation: Location = {
      lat: location?.lat || 0,
      lng: location?.lng || 0,
      address: places[0].name || "",
      commune: places[0].address_components[3].long_name || "",
      city: places[0].vicinity || "",
      googleAddressId: places[0].id || "",
    };


    Cookie.set("address", places[0].name);
    Cookie.set("city", places[0].vicinity);
    Cookie.set("commune", places[0].address_components[3].long_name);
    Cookie.set("googleAddressId", places[0].id);

   
    dispatch({
      type: "[Cart] - SHIPPING_ADDRESS_MAP_LOCATION",
      payload: customLocation,
    });
    
  };

  const createOrder = async (): Promise<{
    hasError: boolean;
    message: string;
  }> => {
    if (!state.shippingAddress) {
      throw new Error("No hay dirección de entrega");
    }

    const body: IOrder = {
      orderItems: state.cart.map((p) => ({
        ...p,
        size: p.size!,
      })),
      shippingAddress: state.shippingAddress,
      numberOfItems: state.numberOfItems,
      subTotal: state.subTotal,
      delivery: state.delivery,
      total: state.total,
      isPaid: false,
    };

    try {
      const { data } = await pepireyesApi.post<IOrder>("/orders", body);

      dispatch({ type: "[Cart] - Order complete" });

      return {
        hasError: false,
        message: data._id!,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
      return {
        hasError: true,
        message: "Error no controlado, hable con el administrador",
      };
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        updateCartQuantity,
        removeCartProduct,
        removeAllCartProduct,
        updateAddress,
        saveLocation,
        updateDelivey,
        // Orders
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
