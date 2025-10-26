import { useChatStore } from '../stores/use-chat.store.ts';
import { XIcon } from 'lucide-react';
import { useEffect } from "react";

function ChatHeader() {
   const { selectedUser, setSelectedUser } = useChatStore();
   
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
            <div className="avatar avatar-online">
               <div className="w-12 rounded-full">
                  <img src={ selectedUser?.profilePicture || '/avatar.png' } alt={ selectedUser?.fullName } />
               </div>
            </div>
            <div>
               <h3 className="text-slate-200 font-medium">{ selectedUser?.fullName }</h3>
               <p className="text-slate-400 text-sm">Online</p>
            </div>
         </div>
         <button type="button" onClick={ () => setSelectedUser(undefined) }>
            <XIcon className="size-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
         </button>
      </div>
   );
}

export default ChatHeader;