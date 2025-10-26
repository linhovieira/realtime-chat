import { create } from 'zustand';
import { axiosInstance } from '../libs/axios.ts';
import type { AuthStore } from '../models/auth-store.type.ts';
import toast from "react-hot-toast";

export const useAuthStore = create<AuthStore>((set) => {
   return {
      logged: undefined,
      isLogged: false,
      isCheckingProfile: false,
      isSigningUp: false,
      isLogin: false,

      checkProfile: async () => {
         set({ isCheckingProfile: true });
         try {
            const response = await axiosInstance.get('/user/profile');
            set({ isLogged: true, logged: response.data });
         } catch (error: any) {
            console.debug(`Error checking profile! Error: ${error.response.data.message}`);
            set({ logged: undefined });
         } finally {
            set({ isCheckingProfile: false });
         }
      },

      updateProfile: async (data: any) => {
         try {
            const response = await axiosInstance.put('/user/update-profile', data);
            set({ isLogged: true, logged: response.data });
            toast.success('Profile updated successfully!');
         } catch (error: any) {
            toast.error(`Error update profile account! Error: ${ error.response.data.message }`);
         }
      },

      signUp: async (data: any) => {
         set({ isSigningUp: true });
         try {
            const response = await axiosInstance.post('/authentication/signup', data);
            set({ isLogged: true, logged: response.data });
            toast.success('Account created successfully!');
         } catch (error: any) {
            toast.error(`Error creating account! Error: ${ error.response.data.message }`);
         } finally {
            set({ isSigningUp: false });
         }
      },

      login: async (data: any) => {
         set({ isLogin: true });
         try {
            const response = await axiosInstance.post('/authentication/login', data);
            set({ isLogged: true, logged: response.data });
            toast.success('Logged in successfully!');
         } catch (error: any) {
            toast.error(`Error login account! Error: ${ error.response.data.message }`);
         } finally {
            set({ isLogin: false });
         }
      },

      logout: async () => {
         try {
            await axiosInstance.post('/authentication/logout');
            set({ isLogged: false, logged: undefined });
            toast.success('Logged out successfully!');
         } catch (error: any) {
            toast.error(`Error logout account! Error: ${ error.response.data.message }`);
         }
      }
   };
});