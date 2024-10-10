import { useMutation } from '@tanstack/react-query';
import { IProduct, NewProductDTO } from '@/api/dtos/productDTO';
import { addProductAPI } from '@/api/product';
import { useProductStore } from '@/store/product/productStore';

export const useAddProduct = () => {
  const { setAdd } = useProductStore();

  return useMutation<IProduct, Error, NewProductDTO>({
    mutationFn: async (productData: NewProductDTO) => {
      return await addProductAPI(productData);
    },
    onSuccess: (newProduct) => {
      setAdd(newProduct);
    },
    onError: (error: any) => {
      console.error('Product addition failed:', error.message);
    },
  });
};
