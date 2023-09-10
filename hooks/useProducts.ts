// components/useProducts.tsx

import useSWR, { SWRConfiguration } from 'swr';
import { IProduct } from '../interfaces';
import { pepireyesApi } from '../axiosApi';

// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json());
export const fetcher = (url: string) => pepireyesApi.get(url).then((res) => res.data);

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<IProduct[]>(url, fetcher, config);

  return {
    products: data || [],
    isLoading: !error && !data,
    isError: error
  };
};
