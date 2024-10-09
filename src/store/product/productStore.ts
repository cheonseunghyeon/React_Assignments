import {
  IProduct,
  NewProductDTO,
  PaginatedProductsDTO,
} from '@/api/dtos/productDTO';
import { addProductAPI, fetchProducts } from '@/api/product';
import { ProductFilter } from '@/types/productType';
import { create } from 'zustand';

interface ProductState {
  items: IProduct[];
  hasNextPage: boolean;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  loadProducts: (
    filter: ProductFilter,
    pageSize: number,
    page: number,
    isInitial: boolean
  ) => Promise<void>;
  addProduct: (product: NewProductDTO) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  items: [],
  hasNextPage: true,
  isLoading: false,
  error: null,
  totalCount: 0,

  loadProducts: async (
    filter: ProductFilter,
    pageSize: number,
    page: number,
    isInitial: boolean
  ) => {
    set({ isLoading: true });
    try {
      const result: PaginatedProductsDTO = await fetchProducts(
        filter,
        pageSize,
        page
      );

      set((state) => ({
        items: isInitial
          ? result.products
          : [...state.items, ...result.products],
        hasNextPage: result.hasNextPage,
        totalCount: result.totalCount,
        isLoading: false,
        error: null,
      }));
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message,
      });
    }
  },

  addProduct: async (productData: NewProductDTO) => {
    set({ isLoading: true });
    try {
      const newProduct: IProduct = await addProductAPI(productData);

      set((state) => ({
        items: [newProduct, ...state.items],
        totalCount: state.totalCount + 1,
        isLoading: false,
        error: null,
      }));
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message,
      });
    }
  },
}));
