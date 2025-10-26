import { type FormEvent, useState } from 'react';
import { useAuthStore } from '../stores/use-auth.store.ts';
import BorderAnimateContainer from '../components/BorderAnimateContainer.tsx';
import { LoaderIcon, LockIcon, MailIcon, MessageCircleIcon, UserIcon } from 'lucide-react';
import { Link } from 'react-router';

function SignUpPage() {
   const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
   const { signUp, isSigningUp } = useAuthStore();

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      signUp(formData);
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
                           <h2 className="text-2xl font-bold text-slate-200 mb-2">Create Account</h2>
                           <p className="text-slate-400">Sign up for a new account</p>
                        </div>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                           <div>
                              <label htmlFor="fieldFullName" className="auth-input-label">Full Name</label>
                              <div className="relative">
                                 <UserIcon className="auth-input-icon" />
                                 <input id="fieldFullName" type="text" placeholder="John Joe" className="input" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                              </div>
                           </div>
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
                           <button type="submit" className="auth-btn" disabled={isSigningUp}>
                              { isSigningUp ? (<LoaderIcon className="w-full h-5 animate-spin text-center" />) : ("Create Account") }
                           </button>
                        </form>
                        <div className="mt-6 text-center">
                           <Link to="/login" className="auth-link">Already have an account? Login</Link>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="hidden md:w-full md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
                  <div>
                     <img src="/signup.png" alt="People using mobile devices" className="w-full h-auto object-contain" />
                     <div className="mt-6 text-center">
                        <h3 className="text-xl font-medium text-cyan-400">Start Your Journey Today</h3>
                        <div className="mt-4 flex justify-center gap-4">
                           <span className="auth-badge">Free</span>
                           <span className="auth-badge">Easy Setup</span>
                           <span className="auth-badge">Private</span>
                        </div>
                     </div>
                  </div>
               </div>
            </BorderAnimateContainer>
         </div>
      </div>
   );
}

export default SignUpPage;