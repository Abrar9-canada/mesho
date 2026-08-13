'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MeshoHome() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('الرجاء إدخال اسمكِ للبدء! ✨');
      return;
    }
    // حفظ الاسم في التخزين المحلي ليقبله اللوبي
    localStorage.setItem('userName', name.trim());
    // الانتقال للوبي
    router.push('/lobby');
  };

  return (
    <main dir="rtl" className="min-h-screen bg-[#0d021a] text-white font-sans flex flex-col justify-between items-center p-6 md:p-12 relative overflow-hidden selection:bg-pink-400 selection:text-[#0d021a]">
      
      {/* تأثيرات إضاءة خلفية */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* رأس الصفحة */}
      <header className="w-full max-w-5xl flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-pink-500"></span>
          </span>
          <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300">
            ⚡ Mesho Games
          </h1>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <section className="w-full max-w-md text-center z-10 my-auto py-12 flex flex-col items-center">
        
        <div className="w-24 h-24 mb-6 rounded-3xl bg-[#18052c] border border-purple-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(255,154,213,0.2)]">
          <span className="text-4xl">🎮</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
          منصة <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300">Mesho</span>
        </h2>

        <p className="text-gray-400 text-sm md:text-base mb-8">
          اكتبي اسمكِ وانطلقي لتجربة أمتع الألعاب الجماعية!
        </p>

        {/* نموذج إدخال الاسم وزر هيا بنا */}
        <form onSubmit={handleStart} className="w-full flex flex-col gap-4">
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="اكتبي اسمكِ هنا..."
            className="w-full px-5 py-4 rounded-2xl bg-[#18052c] border border-purple-500/40 text-white placeholder-gray-500 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 text-center text-lg transition"
          />

          <button 
            type="submit"
            className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-black text-lg shadow-[0_0_25px_rgba(255,154,213,0.4)] hover:shadow-[0_0_35px_rgba(255,154,213,0.7)] hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          >
            <span>هيا بنا</span>
            <span className="transform group-hover:-translate-x-1 transition duration-300">🚀</span>
          </button>
        </form>

      </section>

      {/* تذييل الصفحة */}
      <footer className="w-full max-w-5xl text-center text-xs text-gray-500 z-10 border-t border-purple-900/40 pt-6">
        جميع الحقوق محفوظة © 2026 - Mesho Games
      </footer>

    </main>
  );
}