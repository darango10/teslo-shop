import useSWR, { SWRConfiguration } from "swr";
import { IProduct } from "../interfaces";

export const useProduct = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<IProduct[]>(`/api${url}`, config);

  return {
    products: data ?? [],
    isLoading: !data && !error,
    isError: error,
  };
};

export const usePrice = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<{ price: number }>(`/api${url}`, config);

  return {
    price: data?.price,
    isLoading: !data && !error,
    isError: error,
  };
};
