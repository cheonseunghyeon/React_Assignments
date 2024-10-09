import { registerUserAPI } from "@/api/auth";
import { IUser } from "@/types/authType";
import { create } from "zustand";

interface AuthState {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  user: IUser | null;
  setUser: (user: IUser) => void;
  registerStatus: "idle" | "loading" | "succeeded" | "failed";
  registerError: string | null;
  registerUser: (userData: {
    email: string;
    password: string;
    name: string;
  }) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: false,
  user: null,
  registerStatus: "idle",
  registerError: null,
  setIsLogin: (isLogin) => set({ isLogin }),
  setUser: (user) => set({ user }),
  registerUser: async ({ email, password, name }) => {
    set({ registerStatus: "loading" });
    try {
      const user = await registerUserAPI({ email, password, name });
      set({
        user,
        isLogin: true,
        registerStatus: "succeeded",
        registerError: null,
      });
    } catch (error: any) {
      set({
        registerStatus: "failed",
        registerError: error.message || "Registration failed",
      });
    }
  },

  logout: () => {
    set({ isLogin: false, user: null });
  },
}));
