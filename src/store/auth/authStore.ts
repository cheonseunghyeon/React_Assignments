import { registerUserAPI } from '@/api/auth';
import { IUser } from '@/types/authType';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  user: IUser | null;
  setUser: (user: IUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLogin: false,

      user: null,

      setUser: (user) => set({ user }),

      setIsLogin: (isLogin) => set({ isLogin }),

      logout: () => {
        set({ isLogin: false, user: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
