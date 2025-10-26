import BorderAnimateContainer from '../components/BorderAnimateContainer.tsx';
import { LoaderIcon, LockIcon, MailIcon, MessageCircleIcon } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import { useAuthStore } from '../stores/use-auth.store.ts';
import { Link } from 'react-router';

function LoginPage() {
   const [formData, setFormData] = useState({ email: '', password: '' });
   const { login, isLogin } = useAuthStore();

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      login(formData);
   }

   return (
      <div className="w-full flex items-center justify-center p-4 bg-slate-900">
         <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
            <BorderAnimateContainer>
               <div className="w-full flex flex-col md:flex-row">
                  <div className="md:w-full p-8 flex items-center justify-center md:border-r border-slate-600/30">
                     <div className="w-full max-w-md">
                        <div className="text-center mb-8">
                           <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                           <h2 className="text-2xl font-bold text-slate-200 mb-2">Welcome Back</h2>
                           <p className="text-slate-400">Login to access your account</p>
                        </div>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                           <div>
                              <label htmlFor="fieldEmail" className="auth-input-label">E-Mail</label>
                              <div className="relative">
                                 <MailIcon className="auth-input-icon" />
                                 <input id="fieldEmail" type="email" placeholder="johnjoe@gmail.com" className="input" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                              </div>
                           </div>
                           <div>
                              <label htmlFor="fieldPassword" className="auth-input-label">Password</label>
                              <div className="relative">
                                 <LockIcon className="auth-input-icon" />
                                 <input id="fieldPassword" type="password" placeholder="Enter your password" className="input" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                              </div>
                           </div>
                           <button type="submit" className="auth-btn" disabled={isLogin}>
                              { isLogin ? (<LoaderIcon className="w-full h-5 animate-spin text-center" />) : ("Sign In") }
                           </button>
                        </form>
                        <div className="mt-6 text-center">
                           <Link to="/sign-up" className="auth-link">Don't have an account? Sign Up</Link>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="hidden md:w-full md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
                  <div>
                     <img src="/login.png" alt="People using mobile devices" className="w-full h-auto object-contain" />
                     <div className="mt-6 text-center">
                        <h3 className="text-xl font-medium text-cyan-400">Connect Anytime, Anywhere</h3>
                        <div className="mt-4 flex justify-center gap-4">
                           <span className="auth-badge">Secure</span>
                           <span className="auth-badge">Fast</span>
                           <span className="auth-badge">Reliable</span>
                        </div>
                     </div>
                  </div>
               </div>
            </BorderAnimateContainer>
         </div>
      </div>
   );
}

export default LoginPage;