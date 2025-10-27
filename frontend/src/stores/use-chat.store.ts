import { create } from 'zustand';
import type { ChatStore } from '../models/chat-store.type.ts';
import { axiosInstance } from '../libs/axios.ts';
import toast from 'react-hot-toast';
import { useAuthStore } from './use-auth.store.ts';

export const useChatStore = create<ChatStore>((set, get) => ({
   allContacts: [],
   chats: [],
   messages: [],
   activatedTab: 'chats',
   selectedUser: undefined,
   isUsersLoading: false,
   isMessagesLoading: false,
   isSoundEnabled: localStorage.getItem('isSoundEnabled') === 'true',

   toggleSound: () => {
      localStorage.setItem('isSoundEnabled', String(!get().isSoundEnabled));
      set({ isSoundEnabled: !get().isSoundEnabled });
   },

   setActiveTab: (tab) => set({ activatedTab: tab }),

   setSelectedUser: (user) => set({ selectedUser: user }),

   getAllContacts: async () => {
      set({ isUsersLoading: true });
      try {
         const response = await axiosInstance.get('/message/contacts');
         set({ allContacts: response.data });
      } catch (error: any) {
         toast.error(`Error get contacts! Error: ${ error.response.data.message }`);
      } finally {
         set({ isUsersLoading: false });
      }
   },

   getMyChatPartners: async () => {
      set({ isUsersLoading: true });
      try {
         const response = await axiosInstance.get('/message/chats');
         set({ chats: response.data });
      } catch (error: any) {
         toast.error(`Error get chat partners! Error: ${ error.response.data.message }`);
      } finally {
         set({ isUsersLoading: false });
      }
   },

   getMessagesByUserId: async (userId: string) => {
      set({ isMessagesLoading: true });
      try {
         const response = await axiosInstance.get(`/message/${userId}`);
         set({ messages: response.data });
      } catch (error: any) {
         toast.error(`Error get message from ${userId}! Error: ${ error.response.data.message }`);
      } finally {
         set({ isMessagesLoading: false });
      }
   },

   sendMessage: async (data: any) => {
      const { selectedUser, messages } = get();
      const { logged } = useAuthStore.getState();

      const tempId = `temp-${Date.now()}`;

      const optimisticMessage = {
         _id: tempId,
         senderId: logged?._id,
         receiverId: selectedUser?._id,
         text: data.text,
         image: data.image,
         createdAt: new Date().toISOString(),
         isOptimistic: true,
      };

      set({ messages: [...messages, optimisticMessage] });

      try {
         const response = await axiosInstance.post(`/message/send/${selectedUser?._id}`, data);
         set({ messages: [...messages, response.data] });
         toast.success('Message sent successfully!');
      } catch (error: any) {
         set({ messages: messages });
         toast.error(`Error send message from ${selectedUser?._id}! Error: ${ error.response.data.message }`);
      }
   },

   subscribeToMessages: () => {
      const { selectedUser, isSoundEnabled } = get();
      if (!selectedUser)
         return;

      const socket = useAuthStore.getState().socket;
      if (!socket)
         return;

      socket.on('messages', (content: any) => {
         const isMessageSentFromSelectedUser = content.senderId === selectedUser?._id;
         if (!isMessageSentFromSelectedUser)
            return;

         const currentMessages = get().messages;
         set({ messages: [...currentMessages, content] });

         if (isSoundEnabled) {
            const notificationSound = new Audio('/sounds/notification.mp3');
            notificationSound.currentTime = 0;
            notificationSound.play().catch((error) => toast.error('Error playing notification sound! Error: ' + error.message));
         }
      });
   },

   unsubscribeFromMessages: () => {
      const socket = useAuthStore.getState().socket;
      if (!socket)
         return;

      socket.off('messages');
   }
}));