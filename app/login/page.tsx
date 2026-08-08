'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [key, setKey] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<string>('');
  const [isShaking, setIsShaking] = useState<boolean>(false);

  const handleEnter = () => {
    const trimmedKey = key.trim();

    if (trimmedKey === '') {
      triggerError('⚠️ الرجاء إدخال كلمة المرور أولاً');
      return;
    }

    if (trimmedKey === '1234') {
      // كلمة المرور صحيحة
      const gameId = (Date.now() + Math.floor(Math.random() * 100000)).toString();
      localStorage.setItem('gameId', gameId);

      setMessageType('success');
      setMessage('✨ كلمة المرور صحيحة، جاري الدخول...');
      
      // التوجيه إلى الصفحة الرئيسية عن طريق المسار '/'
      setTimeout(() => {
        router.push('/'); 
      }, 600);

    } else {
      // كلمة المرور خاطئة
      setMessageType('error');
      setMessage('❌ كلمة المرور غير صحيحة، جاري التحويل...');
      triggerShake();
      
      setTimeout(() => {
        router.push('/puzzle'); // التوجيه لصفحة الألغاز
      }, 800);
    }
  };

  const triggerError = (text: string) => {
    setMessageType('error');
    setMessage(text);
    triggerShake();
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEnter();
    }
  };

  return (
    <div dir="rtl" className="relative min-h-screen bg-[radial-gradient(circle_at_center,#18052c_0%,#0d021a_100%)] text-white flex justify-center items-center overflow-hidden font-sans">
      
      <div className="absolute w-[300px] h-[300px] bg-pink-500/15 blur-[80px] rounded-full z-0"></div>

      <div className={`relative z-10 bg-[#18052c]/85 backdrop-blur-md border border-pink-500/20 p-10 rounded-[28px] text-center w-[380px] shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(236,72,153,0.15)] animate-[fadeIn_0.8s_ease-out] ${isShaking ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}>
        
        <div className="text-[45px] mb-4 animate-[bounce_2s_infinite]">
          ☕
        </div>

        <h2 className="text-[22px] font-extrabold bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text text-transparent mb-6">
          أهلاً بك في صالة بيتكم
        </h2>

        <div className="relative mb-5">
          <input 
            type="password" 
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="أدخل كلمة المرور" 
            autoComplete="off"
            className="w-full py-3.5 px-4 bg-[#0d021a]/60 border border-purple-500/30 rounded-2xl text-white text-center text-base outline-none transition-all duration-300 focus:border-pink-500 focus:shadow-[0_0_15px_rgba(236,72,153,0.3)] placeholder:text-white/40"
          />
        </div>

        <button 
          onClick={handleEnter}
          className="w-full py-3.5 border-none rounded-2xl bg-gradient-to-br from-pink-500 to-purple-700 text-white text-base font-bold cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(236,72,153,0.4)] hover:opacity-95 hover:-translate-y-0.5 active:translate-y-0">
          دخول
        </button>
        
        <div className={`mt-4 text-xs font-semibold min-h-[20px] transition-all duration-300 ${messageType === 'error' ? 'text-red-400' : 'text-green-400'}`}>
          {message}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
      `}</style>
    </div>
  );
}