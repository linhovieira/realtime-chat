import { create } from 'zustand';
import { axiosInstance } from '../libs/axios.ts';
import type { AuthStore } from '../models/auth-store.type.ts';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';
import { useChatStore } from "./use-chat.store.ts";

const SOCKET_URL = 'https://localhost:3000';

export const useAuthStore = create<AuthStore>((set, get) => {
   return {
      logged: undefined,
      isLogged: false,
      isCheckingProfile: false,
      isSigningUp: false,
      isLogin: false,
      socket: undefined,
      onlineUsers: [],

      checkProfile: async () => {
         set({ isCheckingProfile: true });
         try {
            const response = await axiosInstance.get('/user/profile');
            set({ isLogged: true, logged: response.data });
            get().connectSocket();
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
            get().connectSocket();
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
            get().connectSocket();
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
            useChatStore.getState().selectedUser = undefined;
            set({ isLogged: false, logged: undefined });
            get().disconnectSocket();
            toast.success('Logged out successfully!');
         } catch (error: any) {
            toast.error(`Error logout account! Error: ${ error.response.data.message }`);
         }
      },

      connectSocket: () => {
         const { logged } = get();
         if (!logged || get().socket?.connected)
            return;

         const ioSocket = io(SOCKET_URL, { withCredentials: true });
         ioSocket.connect();

         set({ socket: ioSocket });

         ioSocket.on('user-connected', (userIds: string[]) => {
            set({ onlineUsers: userIds });
         });
      },

      disconnectSocket: () => {
         const { socket } = get();
         if (!socket || !socket.connected)
            return;

         socket.disconnect();
         set({ socket: undefined, onlineUsers: [] });
      }
   };
});