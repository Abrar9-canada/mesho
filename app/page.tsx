'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const correctPassword = "1234"; 

    if (password === correctPassword) {
      setMessage('كلمة المرور صحيحة، جاري الدخول... ✨');
      
      localStorage.setItem("userName", "User"); 
      localStorage.setItem("roomAuth", "true");
      localStorage.setItem("gameId", (Date.now() + Math.floor(Math.random() * 100000)).toString());

      setTimeout(() => {
        router.push('/lobby');
      }, 1000);
    } else {
      setMessage('كلمة المرور غير صحيحة، جاري تحويلك لصفحة الألغاز... ❌');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);

      // التوجيه إلى صفحة الألغاز في حال كانت كلمة المرور خاطئة
      setTimeout(() => {
        router.push('/puzzle');
      }, 1000);
    }
  };

  return (
    <div dir="rtl" className="relative min-h-screen bg-[radial-gradient(circle_at_center,#18052c_0%,#0d021a_100%)] text-white flex flex-col items-center justify-center p-4 font-sans overflow-hidden">
      
      <div className="absolute w-[300px] h-[300px] bg-pink-500/15 blur-[80px] rounded-full z-0"></div>

      <div className={`relative z-10 w-full max-w-md bg-[#18052c]/85 backdrop-blur-md border border-pink-500/40 rounded-[28px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(236,72,153,0.15)] text-center ${isShaking ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}>
        
        <div className="text-[45px] mb-4 animate-[bounce_2s_infinite]">
          ☕
        </div>

        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300 mb-6">
          أهلاً بك في صالة بيتكم
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="أدخل كلمة المرور..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            className="w-full bg-[#0d021a]/60 border border-purple-500/50 rounded-2xl px-4 py-3.5 text-center text-white outline-none transition-all duration-300 focus:border-pink-500 focus:shadow-[0_0_15px_rgba(236,72,153,0.3)] placeholder:text-white/40"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition py-3.5 rounded-2xl font-bold shadow-[0_4px_15px_rgba(236,72,153,0.4)] cursor-pointer">
            دخول
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm font-bold text-pink-300 animate-pulse">
            {message}
          </p>
        )}
      </div>

      <style jsx global>{`
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
      `}</style>
    </div>
  );
}