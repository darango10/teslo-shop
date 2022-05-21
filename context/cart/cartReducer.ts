import { ICartProduct } from "../../interfaces";
import { CartState } from "./CartProvider";

type CartActionType =
  | {
      type: "[CART] - LoadCart from cookies | storage";
      payload: ICartProduct[];
    }
  | {
      type: "[CART] - Update products in cart";
      payload: ICartProduct[];
    }
  | {
      type: "[CART] - Change cart quantity";
      payload: ICartProduct;
    };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "[CART] - LoadCart from cookies | storage":
      console.log(action.payload);
      return {
        ...state,
        cart: [...action.payload],
      };

    case "[CART] - Update products in cart":
      return {
        ...state,
        cart: [...action.payload],
      };

    case "[CART] - Change cart quantity":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;
          return action.payload;
        }),
      };

    default:
      return state;
  }
};
