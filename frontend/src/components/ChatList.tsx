import { useChatStore } from '../stores/use-chat.store.ts';
import { useEffect } from 'react';
import UsersLoadingSkeleton from './UsersLoadingSkeleton.tsx';
import NoChatsFound from './NoChatsFound.tsx';
import { useAuthStore } from '../stores/use-auth.store.ts';

function ChatList() {
   const { getMyChatPartners, isUsersLoading, chats, setSelectedUser } = useChatStore();
   const { onlineUsers } = useAuthStore();

   useEffect(() => {
      getMyChatPartners();
   }, [getMyChatPartners]);

   if (isUsersLoading) {
      return ( <UsersLoadingSkeleton /> );
   }

   if (chats.length === 0) {
      return ( <NoChatsFound /> );
   }

   return (
      <>
         {
            chats.map((chat) => (
               <div key={chat._id} className="bg-cyan-500/10 p-4 rounded-lg mb-2 cursor-pointer hover:bg-cyan-500/20 transition-colors" onClick={ () => setSelectedUser(chat) }>
                  <div className="flex items-center gap-3">
                     <div className={ `avatar ${ onlineUsers.includes(chat._id) ? 'avatar-online' : 'avatar-offline' }` }>
                        <div className="size-12 rounded-full">
                           <img src={ chat.profilePicture || '/avatar.png' } alt={ chat.fullName } />
                        </div>
                     </div>
                     <h4 className="text-slate-200 font-medium truncate">{ chat.fullName }</h4>
                  </div>
               </div>
            ))
         }
      </>
   );
}

export default ChatList;