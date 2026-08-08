'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface GameItem {
  name: string;
  file: string;
  desc: string;
}

export default function MeshoLobby() {
  const [gameId, setGameId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    if (!storedUser) {
      router.push('/');
      return;
    }
    setUserName(storedUser);

    let storedId = localStorage.getItem("gameId");
    if (!storedId) {
      storedId = Date.now() + Math.random().toString(36).substring(2);
      localStorage.setItem("gameId", storedId);
    }
    setGameId(storedId);
  }, [router]);

  const games: GameItem[] = [
    { name: "Codenames", file: "codenames", desc: "لعبة التجسس والكلمات الجماعية" },
    { name: "قول بس لا تقول", file: "say_no_say", desc: "لعبة الحماس والتحدي بدون كلمات محظورة" },
    { name: "روابط", file: "connections", desc: "لعبة تجميع الكلمات المتشابهة وتحدي الذكاء" },
    { name: "مواجهة العائلات", file: "family_feud", desc: "لعبة التحدي والأسئلة الجماعية العائلية الحماسية" },
    { name: "قريباً ... 🚧", file: "#", desc: "ألعاب جديدة ممتعة في الطريق إليكِ" }
  ];

  const handleGameClick = (file: string) => {
    if (file !== "#") {
      window.location.href = `/${file}?id=${gameId}`;
    } else {
      alert("هذه اللعبة قيد التطوير، انتظرونا قريباً! ✨");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    router.push('/');
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#0d021a] text-white font-sans flex flex-col justify-between">
      {/* رأس الصفحة */}
      <header className="py-6 px-4 bg-[#18052c] border-b border-purple-500/30 shadow-[0_0_20px_rgba(255,154,213,0.15)] flex flex-col sm:flex-row items-center justify-between gap-4 relative">
        <div className="text-center sm:text-right">
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300">
            ⚡🎮 صالة ألعاب Mesho
          </h1>
          <p className="text-gray-400 text-sm mt-1">منصتك الجماعية المفضلة لقضاء أمتع الأوقات مع الأصدقاء</p>
        </div>

        <div className="flex items-center gap-3 bg-purple-950/40 border border-purple-500/20 px-4 py-2 rounded-2xl">
          <span className="text-sm text-pink-300 font-bold">أهلاً، {userName} ✨</span>
          <button 
            onClick={handleLogout}
            className="bg-purple-950/80 border border-purple-500/40 hover:bg-purple-900 transition text-pink-300 text-xs px-3 py-1.5 rounded-xl cursor-pointer">
            خروج 🚪
          </button>
        </div>
      </header>

      {/* قائمة الألعاب */}
      <main className="container mx-auto p-6 max-w-4xl flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-center">
        {games.map((game, index) => (
          <div
            key={index}
            onClick={() => handleGameClick(game.file)}
            className="bg-[#18052c]/80 border border-purple-500/30 p-6 rounded-2xl text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:border-pink-400 hover:shadow-[0_0_25px_rgba(255,154,213,0.3)] flex flex-col justify-between min-h-[180px]"
          >
            <div>
              <h3 className="text-xl font-bold text-pink-300 mb-2">{game.name}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{game.desc}</p>
            </div>
            <span className="mt-4 text-xs font-semibold bg-purple-950/80 border border-purple-500/40 text-pink-300 py-1.5 px-3 rounded-xl self-center">
              {game.file !== "#" ? "ابدأ اللعب 🚀" : "قريباً 🔒"}
            </span>
          </div>
        ))}
      </main>

      {/* تذييل الصفحة */}
      <footer className="text-center py-4 text-xs text-gray-500 border-t border-purple-900/40">
        جميع الحقوق محفوظة © 2026 - Mesho Games
      </footer>
    </div>
  );
}