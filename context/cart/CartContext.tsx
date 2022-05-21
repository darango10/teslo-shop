import { createContext } from "react";
import { ICartProduct } from "../../interfaces";

interface ContextProps {
  cart: ICartProduct[];
  addProductToCart: (newProduct: ICartProduct) => void;
  updateCartQuantity: (newProduct: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
