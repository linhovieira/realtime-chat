import type { User } from './user.type.ts';

export interface ChatStore {
   allContacts: Array<any>;
   chats: Array<User>;
   messages: Array<any>;
   activatedTab: string;
   selectedUser: User | undefined;
   isUsersLoading: boolean;
   isMessagesLoading: boolean;
   isSoundEnabled: boolean;

   toggleSound: () => void;
   setActiveTab: (tab: string) => void;
   setSelectedUser: (user: User | undefined) => void;

   getAllContacts: () => void;
   getMyChatPartners: () => void;

   getMessagesByUserId: (userId: string) => void;
   sendMessage: (message: any) => void;

   subscribeToMessages: () => void;
   unsubscribeFromMessages: () => void;
}