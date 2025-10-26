import { useChatStore } from '../stores/use-chat.store.ts';
import BorderAnimateContainer from '../components/BorderAnimateContainer.tsx';
import ProfileHeader from '../components/ProfileHeader.tsx';
import ActiveTabSwitch from '../components/ActiveTabSwitch.tsx';
import ChatList from '../components/ChatList.tsx';
import ContactList from '../components/ContactList.tsx';
import ChatContainer from '../components/ChatContainer.tsx';
import NoConversationPlaceHolder from '../components/NoConversationPlaceholder.tsx';

function ChatPage() {
   const { activatedTab, selectedUser } = useChatStore();

   return (
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
         <BorderAnimateContainer>
            <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
               <ProfileHeader />
               <ActiveTabSwitch />
               <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  { activatedTab === 'chats' ? (<ChatList />) : (<ContactList/>) }
               </div>
            </div>
            <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
               { selectedUser ? (<ChatContainer />) : (<NoConversationPlaceHolder />) }
            </div>
         </BorderAnimateContainer>
      </div>
   );
}

export default ChatPage;