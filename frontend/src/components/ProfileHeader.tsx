import { useState, useRef } from 'react';
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from 'lucide-react';
import { useAuthStore } from '../stores/use-auth.store.ts';
import { useChatStore } from '../stores/use-chat.store.ts';
import toast from 'react-hot-toast';

const mouseClickSound = new Audio('/sounds/mouse-click.mp3');

function ProfileHeader() {
   const { logout, logged, updateProfile } = useAuthStore();
   const { isSoundEnabled, toggleSound } = useChatStore();
   const [selectedImage, setSelectedImage] = useState<string | null>(null);

   const fileInputRef = useRef<HTMLInputElement>(null);

   const handlerImageUpload = (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
         const base64Image = reader.result as string;
         setSelectedImage(base64Image);
         updateProfile({ profilePicture: base64Image });
      };
   }

   const handlerSound = () => {
      mouseClickSound.currentTime = 0;
      mouseClickSound.play().catch((error) => toast.error(error.message));
      toggleSound();
   };

   return (
      <div className="p-6 border-b border-slate-700/50">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="avatar avatar-online">
                  <button type="button" className="size-14 rounded-full overflow-hidden relative group" onClick={ () => fileInputRef.current?.click() }>
                     <img src={ selectedImage || logged?.profilePicture || '/avatar.png' } alt="Profile Picture" className="size-full object-cover"/>
                     <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                        <span className="text-white text-xs">Change</span>
                     </div>
                  </button>
                  <input type="file" accept="image/*" className="hidden" ref={ fileInputRef } onChange={ handlerImageUpload } />
               </div>
               <div>
                  <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">{ logged?.fullName }</h3>
                  <p className="text-slate-400 text-sm">Online</p>
               </div>
            </div>
            <div className="flex gap-4 items-center">
               <button type="button" className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" onClick={ handlerSound }>
                  { isSoundEnabled ? (<Volume2Icon className="size-5" />) : (<VolumeOffIcon className="size-5" />)}
               </button>
               <button type="button" className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" onClick={ logout }>
                  <LogOutIcon className="size-5" />
               </button>
            </div>
         </div>
      </div>
   );
}

export default ProfileHeader;