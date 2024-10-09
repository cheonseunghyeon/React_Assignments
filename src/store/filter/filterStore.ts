import { ALL_CATEGORY_ID } from "@/constants";
import { create } from "zustand";

interface FilterState {
  minPrice: number;
  maxPrice: number;
  title: string;
  categoryId: string;
  setMinPrice: (minPrice: number) => void;
  setMaxPrice: (maxPrice: number) => void;
  setTitle: (title: string) => void;
  setCategoryId: (categoryId: string) => void;
  resetFilter: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  minPrice: 0,
  maxPrice: 0,
  title: "",
  categoryId: ALL_CATEGORY_ID,

  setMinPrice: (minPrice: number) => set(() => ({ minPrice })),
  setMaxPrice: (maxPrice: number) => set(() => ({ maxPrice })),
  setTitle: (title: string) => set(() => ({ title })),
  setCategoryId: (categoryId: string) => set(() => ({ categoryId })),

  resetFilter: () =>
    set(() => ({
      minPrice: 0,
      maxPrice: 0,
      title: "",
      categoryId: ALL_CATEGORY_ID,
    })),
}));
