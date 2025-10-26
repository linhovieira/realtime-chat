import { useChatStore } from '../stores/use-chat.store.ts';
import { useAuthStore } from '../stores/use-auth.store.ts';
import { useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader.tsx';
import NoChatHistoryPlaceholder from './NoChatHistoryPlaceholder.tsx';
import MessageInput from './MessageInput.tsx';
import MessagesLoadingSkeleton from './MessagesLoadingSkeleton.tsx';

function ChatContainer() {
   const { selectedUser, getMessagesByUserId, messages, isMessagesLoading } = useChatStore();
   const { logged } = useAuthStore();
   const messageRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (!selectedUser)
         return;
      getMessagesByUserId(selectedUser?._id);
   }, [selectedUser, getMessagesByUserId]);

   useEffect(() => {
      if (messageRef.current)
         messageRef.current.scrollIntoView({ behavior: 'smooth' });
   }, [messageRef]);

   return (
      <>
         <ChatHeader />
         <div className="flex-1 px-6 overflow-y-auto py-8">
            {
               (messages.length > 0 && !isMessagesLoading) ?
                  (
                     <div className="max-w-3xl mx-auto space-y-6">
                        {
                           messages.map((message) => (
                              <div key={ message._id } className={ `chat ${ message.senderId === logged?._id ? 'chat-end' : 'chat-start' }` }>
                                 <div className={ `chat-bubble relative ${ message.senderId === logged?._id ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-200' }` }>
                                    { message.image && (<img src={ message.image } alt="Shared Image" className="rounded-lg h-48 object-cover" /> ) }
                                    { message.text && (<p className="mt-2">{ message.text }</p>) }
                                    <p className="text-sm mt-1 opacity-75 flex items-center gap-1">
                                       { new Date(message.createdAt).toLocaleString([], { hour: '2-digit', minute: '2-digit' }) }
                                    </p>
                                 </div>
                              </div>
                           ))
                        }
                        <div ref={messageRef}></div>
                     </div>
                  ) :
                  (
                     isMessagesLoading ?
                        ( <MessagesLoadingSkeleton /> ) :
                        ( <NoChatHistoryPlaceholder name={ selectedUser?.fullName } /> )
                  )
            }
         </div>
         <MessageInput />
      </>
   );
}

export default ChatContainer;