import { useChatStore } from '../stores/use-chat.store.ts';

function ActiveTabSwitch() {
   const { activatedTab, setActiveTab } = useChatStore();

   return (
      <div role="tablist" className="tabs bg-transparent p-2 m-2">
         <button type="button" role="tab" className={ `w-1/2 tab ${ activatedTab === 'chats'? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400' }` } onClick={ () => setActiveTab('chats') }>Chats</button>
         <button type="button" role="tab" className={ `w-1/2 tab ${ activatedTab === 'contacts'? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400' }` } onClick={ () => setActiveTab('contacts') }>Contacts</button>
      </div>
   );
}

export default ActiveTabSwitch;