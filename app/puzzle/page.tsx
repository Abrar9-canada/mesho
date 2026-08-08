'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PuzzlePage() {
  const router = useRouter();
  const [answer, setAnswer] = useState<string>('');
  const [msg, setMsg] = useState<string>('');
  const [isShaking, setIsShaking] = useState<boolean>(false);

  const checkAnswer = () => {
    const cleanAnswer = answer.trim().toLowerCase();

    if (cleanAnswer === 'keyboard') {
      setMsg('✨ إجابة صحيحة! جاري الانتقال...');
      setTimeout(() => {
        router.push('/'); // الانتقال للصفحة الرئيسية
      }, 600);
    } else {
      setMsg('❌ ليتك راقد');
      triggerShake();
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  return (
    <div dir="rtl" className="m-0 font-sans bg-[#140021] text-white flex justify-center items-center h-screen text-center overflow-hidden">
      
      <div className={`bg-[#22003a] p-[30px] rounded-[15px] w-[320px] shadow-[0_0_20px_rgba(255,154,213,0.3)] transition-all duration-300 ${isShaking ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}>
        
        <h2 className="text-xl font-bold mb-4">🧠 وقت الألغاز</h2>

        <p className="text-sm text-pink-200 mb-2">كم وقت استغرق انشاء هذا الموقع ؟</p>

        <input 
          type="text" 
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="الجواب" 
          className="w-full p-2.5 mt-3 rounded-[10px] border-none bg-[#140021] text-white text-center outline-none focus:ring-2 focus:ring-[#ff9ad5]"
        />

        <button 
          onClick={checkAnswer}
          className="mt-4 p-2.5 w-full border-none rounded-[10px] bg-[#ff9ad5] text-[#140021] font-bold cursor-pointer hover:opacity-90 transition-all">
          Submit
        </button>

        {/* زر العودة للصفحة الرئيسية */}
        <button 
          onClick={() => router.push('/')}
          className="mt-2.5 p-2 w-full border border-[#ff9ad5]/40 rounded-[10px] bg-transparent text-[#ff9ad5] font-semibold text-xs cursor-pointer hover:bg-[#ff9ad5]/10 transition-all">
          🔙 العودة للرئيسية
        </button>

        <p className={`mt-3 text-sm font-semibold min-h-[20px] ${msg.includes('صحيحة') ? 'text-green-400' : 'text-red-400'}`}>
          {msg}
        </p>

      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>

    </div>
  );
}