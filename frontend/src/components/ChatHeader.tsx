import { useChatStore } from '../stores/use-chat.store.ts';
import { XIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useAuthStore } from '../stores/use-auth.store.ts';

function ChatHeader() {
   const { selectedUser, setSelectedUser } = useChatStore();
   const { onlineUsers } = useAuthStore();
   
   useEffect(() => {
      const handlerEscKey = (event: any) => {
         if (event.key === 'Escape') {
            setSelectedUser(undefined);
         }
      };
      window.addEventListener('keydown', handlerEscKey);
      return () => window.removeEventListener('keydown', handlerEscKey);
   }, [setSelectedUser]);

   return (
      <div className="flex justify-between items-center bg-slate-800/50 border-b border-late-700/50 max-h-[84px] px-6 flex-1">
         <div className="flex items-center space-x-3">
            <div className={ `avatar ${ onlineUsers.includes(selectedUser?._id as string) ? 'avatar-online' : 'avatar-offline' }` }>
               <div className="w-12 rounded-full">
                  <img src={ selectedUser?.profilePicture || '/avatar.png' } alt={ selectedUser?.fullName } />
               </div>
            </div>
            <div>
               <h3 className="text-slate-200 font-medium">{ selectedUser?.fullName }</h3>
               <p className="text-slate-400 text-sm">{ onlineUsers.includes(selectedUser?._id as string) ? 'Online' : 'Offline' }</p>
            </div>
         </div>
         <button type="button" onClick={ () => setSelectedUser(undefined) }>
            <XIcon className="size-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
         </button>
      </div>
   );
}

export default ChatHeader;