import { Navigate, Route, Routes } from 'react-router';
import { useEffect } from 'react';
import { useAuthStore } from './stores/use-auth.store.ts';
import ChatPage from './pages/ChatPage.tsx';
import SignUpPage from './pages/SignUpPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import LoaderPage from './components/LoaderPage.tsx';
import { Toaster } from 'react-hot-toast';

function App() {
   const { checkProfile, isLogged, isCheckingProfile } = useAuthStore();

   useEffect(() => {
      checkProfile();
   }, [checkProfile]);

   if (isCheckingProfile) {
      return (
         <LoaderPage/>
      )
   }

   return (
      <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
         <div className="absolute inset-0 bg-[linear-gradient(to_right, #4f4f4f2e_1px, transparent_1px), linear-gradient(to_bottom, #4f4f4f2e_1px, transparent_1px)] bg-[size:14px_24px]" />
         <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
         <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

         <Routes>
            <Route path="/" element={ isLogged ? <ChatPage /> : <Navigate to={'/login'} /> } />
            <Route path="/login" element={ !isLogged ? <LoginPage /> : <Navigate to={'/'} /> } />
            <Route path="/sign-up" element={ !isLogged ? <SignUpPage /> : <Navigate to={'/'} /> } />
         </Routes>

         <Toaster />
      </div>
   )
}

export default App
