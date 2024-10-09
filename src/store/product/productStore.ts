import { registerUserAPI } from "@/api/auth";
import { IProduct, PaginatedProductsDTO } from "@/api/dtos/productDTO";
import { fetchProducts } from "@/api/product";
import { IUser } from "@/types/authType";
import { ProductFilter } from "@/types/productType";
import { create } from "zustand";

interface AuthState {
  items: IProduct[];
  hasNextPage: boolean;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
}

export const useAuthStore = create<AuthState>((set) => ({
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

      // set((state) => ({

      // }));
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message,
      });
    }
  },
}));
