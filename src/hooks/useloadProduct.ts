import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/api/product';
import { ProductFilter } from '@/types/productType';
import { useProductStore } from '@/store/product/productStore';
import { PaginatedProductsDTO } from '@/api/dtos/productDTO';
import { useEffect } from 'react';

const fetchProductData = async (
  filter: ProductFilter,
  pageSize: number,
  page: number
): Promise<PaginatedProductsDTO> => {
  return await fetchProducts(filter, pageSize, page);
};

export const useLoadProduct = (
  filter: ProductFilter,
  pageSize: number,
  page: number
) => {
  const { appendProducts, setProductsState } = useProductStore();

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ['products', filter, pageSize, page],
    queryFn: () => fetchProductData(filter, pageSize, page),
  });

  useEffect(() => {
    if (data) {
      appendProducts(data.products);
      setProductsState(data);
    }
  }, [data, appendProducts, setProductsState]);

  return { data, error, isLoading, isFetching };
};
