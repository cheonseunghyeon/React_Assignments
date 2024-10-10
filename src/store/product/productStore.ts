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
  setAdd: (newProduct: IProduct) => void;
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
  setAdd: (newProduct: IProduct) =>
    set((state) => ({
      items: [newProduct, ...state.items],
      totalCount: state.totalCount + 1,
      error: null,
    })),

  loadProducts: async (
    filter: ProductFilter,
    pageSize: number,
    page: number,
    isInitial: boolean
  ) => {
    set({ isLoading: true }); // 1. 로딩 상태를 true로 설정합니다.

    try {
      const result: PaginatedProductsDTO = await fetchProducts(
        filter,
        pageSize,
        page
      ); // 2. API 호출을 비동기로 수행합니다.

      // 3. API 결과를 상태에 병합하여 업데이트합니다.
      set((state) => ({
        items: isInitial
          ? result.products // isInitial이 true일 경우 새로운 데이터로 덮어씁니다.
          : [...state.items, ...result.products], // 아닐 경우 기존 데이터와 병합합니다.
        hasNextPage: result.hasNextPage,
        totalCount: result.totalCount,
        isLoading: false, // 4. 로딩 상태를 false로 변경합니다.
        error: null, // 에러 초기화
      }));
    } catch (error: any) {
      // 5. 에러 발생 시 상태에 에러 메시지를 저장합니다.
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
