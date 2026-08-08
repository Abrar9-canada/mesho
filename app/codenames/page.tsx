'use client';

import React, { useState, useEffect } from 'react';

// تعريف واجهة الكارت
interface CardItem {
  id: string;
  name: string;
}

// تعريف واجهة حالة اللعبة
interface GameState {
  red: CardItem[];
  blue: CardItem[];
  yellow: CardItem[];
  black: CardItem[];
}

// قائمة الكلمات الأساسية
const baseWords: string[] = [
  "مشمش","جهل","مزرعة","ببغاء","قمر","ساعة","سفارة","نادل","خوارزمية","كتاب",
  "سيارة","حكومة","طائرة","يخت","مخلل","رياضة","بلايستيشن","سلحفاة","مدرسة","بحر",
  "كمبيوتر","مناقش","هاتف","تلفاز","تمر هندي","قطة","مدينة","جبل","نهر","شمس",
  "برق","ريح","صحراء","غابة","قارب","طاولة","كرسي","نافذة","باب","شارع",
  "مطار","مستشفى","جامعة","مكتبة","مفتاح","قفل","نقود","ذهب","فضة","حديد",
  "نار","ثلج","مطر","سحاب","رمل","صخرة","نجمة","فضاء","كوكب","مجرة",
  "روبوت","إنترنت","تطبيق","لعبة","فريق","مدرب","هدف","ملعب","كرة","بطولة",
  "سباق","كاميرا","تصوير","فيلم","مسرح","موسيقى","غناء","بيانو","جيتار","طبلة",
  "ضوء","ظل","ليل","نهار","صمت","ضجيج","هدوء","حركة","وقت","تاريخ",
  "ذاكرة","فكرة","حلم","واقع","خيال","ذكاء","علم","تجربة","معادلة","مختبر",
  "كويت","خبرة","مقابلة","جراحة","زحل","أقحوان","داعش","مسدس","كللب","غريبة",
  "كريستيانو","لبلاب","بدروم","شيفروليه","وظيفة","شركة","ميزانية","بوليس","طبيب","سؤال",
  "قلم","دفتر","محفظة","شاشة","لوحة","سماعة","ملابس","عطر","طريق","حديقة",
  "عصائر","تفاح","موز","برتقال","فراولة","بطيخ","أسد","نمر","فهد","ذئب"
];

const wordsList: CardItem[] = Array.from({ length: 200 }, (_, i) => 
  baseWords.map(word => ({
    id: `${word}_${i}`,
    name: word
  }))
).flat();

export default function MeshoCodenames() {
  const [gameState, setGameState] = useState<GameState>({ red: [], blue: [], yellow: [], black: [] });
  const [allCards, setAllCards] = useState<CardItem[]>([]);
  const [turn, setTurn] = useState<'red' | 'blue'>('red');
  const [copiedMsg, setCopiedMsg] = useState<string>('');

  const generateNewGame = () => {
    const shuffled: CardItem[] = [...wordsList].sort(() => 0.5 - Math.random()).slice(0, 25);
    
    const newGame: GameState = {
      red: shuffled.slice(0, 8),
      blue: shuffled.slice(8, 16),
      yellow: shuffled.slice(16, 24),
      black: shuffled.slice(24, 25)
    };

    setGameState(newGame);
    setAllCards([...shuffled].sort(() => 0.5 - Math.random()));
    setTurn('red');
    setCopiedMsg('');
  };

  useEffect(() => {
    generateNewGame();
  }, []);

  const getCardType = (cardObj: CardItem | undefined) => {
    if (!cardObj) return { label: '', color: 'bg-purple-900/40' };
    if (gameState.red.some((c: CardItem) => c.id === cardObj.id)) return { label: '🔴 أحمر', color: 'bg-red-600/80 border-red-400' };
    if (gameState.blue.some((c: CardItem) => c.id === cardObj.id)) return { label: '🔵 أزرق', color: 'bg-blue-600/80 border-blue-400' };
    if (gameState.yellow.some((c: CardItem) => c.id === cardObj.id)) return { label: '🟡 أصفر', color: 'bg-yellow-600/80 border-yellow-400' };
    if (gameState.black.some((c: CardItem) => c.id === cardObj.id)) return { label: '⚫ قاتل', color: 'bg-gray-900 border-gray-600' };
    return { label: '', color: 'bg-purple-900/40' };
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsg(`تم نسخ ${type} بنجاح! 📋`);
    setTimeout(() => setCopiedMsg(''), 3000);
  };

  const spyText = (() => {
    let header = `لعبة كود نيمز\n-----------------------\nخريطة الكلمات للجواسيس (الشارح)\n`;
    let rows: string[] = [];
    for (let i = 0; i < 8; i++) {
      const redWord = gameState.red[i]?.name ? `${gameState.red[i].name} 🔴` : '';
      const blueWord = gameState.blue[i]?.name ? `${gameState.blue[i].name} 🔵` : '';
      rows.push(`(${redWord} | ${blueWord})`);
    }
    
    let extraYellow = gameState.yellow.map((w: CardItem) => `(${w.name} 🟡)`).join('\n');
    let extraBlack = gameState.black.map((w: CardItem) => `(${w.name} ⚫️)`).join('\n');

    return header + rows.join('\n') + (extraYellow ? '\n' + extraYellow : '') + (extraBlack ? '\n' + extraBlack : '');
  })();

  const playersText = `لعبة كود نيمز\n-----------------------\nخريطة الكلمات للاعبين (العملاء)\n` +
    allCards.map((c: CardItem, idx: number) => `${idx + 1}) ${c.name}`).join('\n');

  const redTeamText = `كلمات جواسيس الفريق الأحمر 🔴:\n` + 
    gameState.red.map((c: CardItem, idx: number) => `${idx + 1}) ${c.name}`).join('\n');
  
  const blueTeamText = `كلمات جواسيس الفريق الأزرق 🔵:\n` + 
    gameState.blue.map((c: CardItem, idx: number) => `${idx + 1}) ${c.name}`).join('\n');

  return (
    <div dir="rtl" className="min-h-screen bg-[#0d021a] text-white p-4 md:p-8 font-sans">
      
      {/* رأس الصفحة مع زر العودة للصالة */}
      <header className="flex justify-between items-center bg-[#18052c] border border-purple-500/30 p-4 rounded-2xl shadow-lg mb-6">
        <h1 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300">
          🎮 Mesho - Codenames
        </h1>
        
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-xs bg-purple-900/60 border border-purple-500/40 px-3 py-1.5 rounded-full text-pink-300">
            لوحة تحكم المضيف
          </span>
          <a 
            href="/" 
            className="bg-purple-950/80 border border-purple-500/50 hover:bg-purple-900 transition text-pink-300 text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 font-bold shadow-md">
            🏠 العودة للصالة
          </a>
        </div>
      </header>

      {copiedMsg && (
        <div className="bg-emerald-600/90 text-center py-2 rounded-xl mb-4 text-sm font-bold animate-pulse shadow-lg">
          {copiedMsg}
        </div>
      )}

      {/* الأزرار العلوية */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <button 
          onClick={generateNewGame}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition p-3 rounded-xl font-bold shadow-md flex items-center justify-center gap-2">
          🔄 بدء لعبة جديدة
        </button>
        <button 
          onClick={() => copyToClipboard(spyText, 'خريطة الجواسيس')}
          className="bg-purple-900/80 border border-purple-500/50 hover:bg-purple-800 transition p-3 rounded-xl font-bold shadow-md flex items-center justify-center gap-2">
          📋 نسخ خريطة الجواسيس
        </button>
        <button 
          onClick={() => copyToClipboard(playersText, 'كلمات اللاعبين')}
          className="bg-purple-900/80 border border-purple-500/50 hover:bg-purple-800 transition p-3 rounded-xl font-bold shadow-md flex items-center justify-center gap-2">
          👥 نسخ كلمات اللاعبين
        </button>
      </div>

      {/* أزرار نسخ كلمات الفريقين بشكل منفصل */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <button 
          onClick={() => copyToClipboard(redTeamText, 'كلمات جواسيس الفريق الأحمر')}
          className="bg-red-900/80 border border-red-500/50 hover:bg-red-800 transition p-3 rounded-xl font-bold shadow-md flex items-center justify-center gap-2">
          🔴 نسخ كلمات جواسيس الفريق الأحمر
        </button>
        <button 
          onClick={() => copyToClipboard(blueTeamText, 'كلمات جواسيس الفريق الأزرق')}
          className="bg-blue-900/80 border border-blue-500/50 hover:bg-blue-800 transition p-3 rounded-xl font-bold shadow-md flex items-center justify-center gap-2">
          🔵 نسخ كلمات جواسيس الفريق الأزرق
        </button>
      </div>

      <div className="bg-[#18052c] border border-purple-500/30 p-4 rounded-2xl mb-6 flex flex-wrap justify-between items-center gap-4">
        <div>
          <span className="text-gray-400 text-sm block">الدور الحالي:</span>
          <span className={`font-bold text-lg ${turn === 'red' ? 'text-red-400' : 'text-blue-400'}`}>
            {turn === 'red' ? '🔴 الفريق الأحمر' : '🔵 الفريق الأزرق'}
          </span>
        </div>
        <div className="flex gap-4 text-sm">
          <span className="bg-red-950/60 border border-red-500/30 px-3 py-1 rounded-lg">الحمر: {gameState.red.length}</span>
          <span className="bg-blue-950/60 border border-blue-500/30 px-3 py-1 rounded-lg">الزرق: {gameState.blue.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {allCards.map((cardObj: CardItem, index: number) => {
          const info = getCardType(cardObj);
          return (
            <div 
              key={index} 
              className={`p-5 rounded-2xl border text-center shadow-lg flex flex-col items-center justify-center min-h-[100px] transition transform hover:scale-105 ${info.color}`}>
              <span className="text-lg font-bold tracking-wide">{cardObj?.name}</span>
              <span className="text-xs mt-2 opacity-80 bg-black/30 px-2 py-0.5 rounded">{info.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}