import { useMutation } from '@tanstack/react-query';
import { IUser } from '@/types/authType';
import { registerUserAPI } from '@/api/auth';
import { RegisterUserReqDTO } from '@/api/dtos/authDTO';
import { useAuthStore } from '@/store/auth/authStore';

export const useRegisterUser = () => {
  const { setUser, setIsLogin } = useAuthStore();

  return useMutation<IUser, Error, RegisterUserReqDTO>({
    mutationFn: async (userData: RegisterUserReqDTO) => {
      return await registerUserAPI(userData);
    },
    onSuccess: (user) => {
      setUser(user);
      setIsLogin(true);
    },
    onError: (error: any) => {
      console.error('Registration failed:', error.message);
    },
  });
};
