import { IProduct, PaginatedProductsDTO } from '@/api/dtos/productDTO';

import { create } from 'zustand';

interface ProductState {
  items: IProduct[];
  hasNextPage: boolean;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  setAdd: (newProduct: IProduct) => void;
  setProductsState: (data: PaginatedProductsDTO) => void;
  appendProducts: (newProducts: IProduct[]) => void;
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

  appendProducts: (newProducts: IProduct[]) =>
    set((state) => ({
      items: [...state.items, ...newProducts],
    })),

  setProductsState: (data: PaginatedProductsDTO) =>
    set({
      hasNextPage: data.hasNextPage,
      totalCount: data.totalCount,
    }),
}));
