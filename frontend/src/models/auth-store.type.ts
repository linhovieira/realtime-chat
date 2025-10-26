import type { User } from './user.type.ts';

export interface AuthStore {
   logged: User | undefined;
   isLogged: boolean;
   isCheckingProfile: boolean;
   isSigningUp: boolean;
   isLogin: boolean;

   checkProfile: () => void;
   updateProfile: (data: any) => void;
   signUp: (data: { fullName: string, email: string, password: string }) => void;
   login: (data: { email: string, password: string }) => void;
   logout: () => void;
}