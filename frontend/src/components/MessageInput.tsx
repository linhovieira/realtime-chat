import useKeyboardSound from '../hooks/use-keyboard-sound.ts';
import { useRef, useState } from 'react';
import { useChatStore } from '../stores/use-chat.store.ts';
import toast from 'react-hot-toast';
import { ImageIcon, SendIcon, XIcon } from 'lucide-react';

function MessageInput() {
   const { sendMessage, isSoundEnabled } = useChatStore();
   const { playRandomKeyStrokeSound } = useKeyboardSound();
   const [text, setText] = useState<string>('');
   const [image, setImage] = useState<string | null>(null);

   const fileInputRef = useRef<HTMLInputElement>(null);

   const handlerImageChange = (e: any) => {
      const file = e.target.files[0];

      if (!file)
         return;

      if (!file.type.startsWith('image/')) {
         toast.error('Only images are allowed');
         return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => setImage(reader.result as string);
      reader.readAsDataURL(file);
   }

   const handlerTextChange = (e: any) => {
      setText(e.target.value);
      if (isSoundEnabled)
         playRandomKeyStrokeSound();
   }

   const handlerSendMessage = (e: any) => {
      e.preventDefault();

      if (!text.trim() && !image)
         return;

      if (isSoundEnabled)
         playRandomKeyStrokeSound();

      sendMessage({ text: text.trim(), image: image });
      setText('');
      removeImage();
   }
   
   const removeImage = () => {
      setImage(null);
      if (fileInputRef.current)
         fileInputRef.current.value = '';
   }

   return (
      <div className="p-4 border-t border-slate-700/50">
         {
            image && (
               <div className="max-w-3xl mx-auto mb-3 flex items-center">
                  <div className="relative">
                     <img src={ image } alt="Preview" className="size-20 object-cover rounded-lg border border-slate-700" />
                     <button type="button" className="absolute -top-2 -right-2 size-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700" onClick={ removeImage }>
                        <XIcon className="size-4" />
                     </button>
                  </div>
               </div>
            )
         }
         <form className="max-w-3xl mx-auto flex space-x-4" onSubmit={ handlerSendMessage }>
            <input type="text" placeholder="Type your message..." className="input input-bordered flex-1" value={ text } onChange={ handlerTextChange } />
            <input type="file" accept="image/*" className="hidden" ref={ fileInputRef } onChange={ handlerImageChange } />
            <button type="button" className={ `bg-slate-800/50 text-slate-400 hover:text-slate-200 rounded-lg px-4 transition-colors ${ image ? 'text-cyan-500': '' }` } onClick={ () => fileInputRef.current?.click() }>
               <ImageIcon className="size-5" />
            </button>
            <button type="submit" className="cursor-pointer bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg px-4 py-2 font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed" disabled={ !text.trim() && !image }>
               <SendIcon className="size-5" />
            </button>
         </form>
      </div>
   );
}

export default MessageInput;