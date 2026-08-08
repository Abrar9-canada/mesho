'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CategoryGroup {
  category: string;
  words: string[];
}

interface WordItem {
  id: number;
  text: string;
  selected: boolean;
}

const hugeCategoriesPool: CategoryGroup[] = [
  { category: "أعضاء وجه الإنسان", words: ["فم", "عين", "اذن", "كف"] },
  { category: "أعضاء داخلية", words: ["قلب", "كبد", "رئة", "معدة"] },
  { category: "أطراف وعظام", words: ["إصبع", "ساق", "ذراع", "جمجمة"] },
  { category: "فواكه صيفية", words: ["مشمش", "رمان", "بطيخ", "شمام"] },
  { category: "فواكه استوائية", words: ["مانجو", "اناناس", "بابايا", "كيوي"] },
  { category: "فواكه حمضية", words: ["نارنج", "ليمون", "برتقال", "يوسفي"] },
  { category: "توتيات ومكسرات", words: ["توت", "فراولة", "بندق", "لوز"] },
  { category: "أشكال هندسية", words: ["دائرة", "مربع", "مثلث", "معين"] },
  { category: "ألوان أساسية", words: ["أحمر", "أزرق", "أصفر", "أخضر"] },
  { category: "ألوان فرعية", words: ["برتقالي", "بنفسجي", "وردي", "رمادي"] },
  { category: "خضار ورقية وجذرية", words: ["ثوم", "بقدونس", "بصل", "خيار"] },
  { category: "بهارات وتوابل", words: ["كمون", "فلفل", "كزبرة", "كركم"] },
  { category: "بقوليات", words: ["عدس", "حمص", "فول", "فاصوليا"] },
  { category: "حيوانات مفترسة", words: ["أسد", "نمر", "فهد", "ذئب"] },
  { category: "حيوانات أليفة", words: ["قطة", "كلب", "أرنب", "حمار"] },
  { category: "حيوانات الصحراء", words: ["جمل", "ضبع", "ثعلب", "يربوع"] },
  { category: "طيور", words: ["صقر", "نسر", "عصفور", "حمامة"] },
  { category: "ظواهر جوية", words: ["برق", "رعد", "مطر", "سحاب"] },
  { category: "تضاريس الأرض", words: ["جبل", "نهر", "صحراء", "وادي"] },
  { category: "عناصر الفضاء", words: ["قمر", "شمس", "نجمة", "كوكب"] },
  { category: "أجهزة تقنية", words: ["هاتف", "كمبيوتر", "شاشة", "سماعة"] },
  { category: "ألعاب فيديو وترفيه", words: ["بلايستيشن", "روبوت", "تطبيق", "لعبة"] },
  { category: "رياضات جماعية", words: ["كرة", "فريق", "مدرب", "ملعب"] },
  { category: "ألعاب قوى وسباقات", words: ["سباق", "بطولة", "هدف", "ميدالية"] },
  { category: "أدوات كتابة ومكتبية", words: ["قلم", "دفتر", "محفظة", "كتاب"] },
  { category: "مهن طبية وعلمية", words: ["طبيب", "جراح", "مختبر", "معادلة"] },
  { category: "وسائل مواصلات", words: ["سيارة", "طائرة", "يخت", "قطار"] },
  { category: "مرافق عامة", words: ["مستشفى", "مدرسة", "مكتبة", "مطار"] }
];

export default function ConnectionsGame() {
  const router = useRouter();
  const [currentPuzzle, setCurrentPuzzle] = useState<{ groups: CategoryGroup[] }>({ groups: [] });
  const [words, setWords] = useState<WordItem[]>([]);
  const [solvedGroups, setSolvedGroups] = useState<CategoryGroup[]>([]);
  const [mistakes, setMistakes] = useState<number>(4);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const generateRandomPuzzle = () => {
    const shuffledPool = [...hugeCategoriesPool].sort(() => Math.random() - 0.5);
    const selectedGroups = shuffledPool.slice(0, 4);
    
    const allWords = selectedGroups.flatMap(g => g.words);
    const shuffledWords: WordItem[] = allWords.sort(() => Math.random() - 0.5).map((word, idx) => ({
      id: idx,
      text: word,
      selected: false
    }));

    setCurrentPuzzle({ groups: selectedGroups });
    setWords(shuffledWords);
    setSolvedGroups([]);
    setMistakes(4);
    setMessage('');
  };

  useEffect(() => {
    if (!localStorage.getItem("userName")) {
      router.push('/');
      return;
    }
    generateRandomPuzzle();
  }, [router]);

  const handleCardClick = (id: number) => {
    setWords(words.map(w => {
      if (w.id === id && !solvedGroups.some(g => g.words.includes(w.text))) {
        const selectedCount = words.filter(item => item.selected).length;
        if (!w.selected && selectedCount >= 4) return w; 
        return { ...w, selected: !w.selected };
      }
      return w;
    }));
  };

  const handleDeselectAll = () => {
    setWords(words.map(w => ({ ...w, selected: false })));
  };

  const handleCheck = () => {
    const selectedWords = words.filter(w => w.selected).map(w => w.text);
    if (selectedWords.length !== 4) {
      setMessage('يرجى اختيار 4 كلمات بدقة!');
      setTimeout(() => setMessage(''), 2500);
      return;
    }

    const matchedGroup = currentPuzzle.groups.find(group => 
      group.words.every(w => selectedWords.includes(w)) &&
      !solvedGroups.some(sg => sg.category === group.category)
    );

    if (matchedGroup) {
      const newSolved = [...solvedGroups, matchedGroup];
      setSolvedGroups(newSolved);
      setWords(words.map(w => w.selected ? { ...w, selected: false } : w));
      
      if (newSolved.length === currentPuzzle.groups.length) {
        setMessage('🎉 مبروك! لقد فزت واكتشفت جميع المجموعات!');
      }
    } else {
      const remainingMistakes = mistakes - 1;
      setMistakes(remainingMistakes);
      
      setWords(words.map(w => ({ ...w, selected: false })));
      
      setMessage('❌ إجابة خاطئة، انتبه للقلوب!');
      setTimeout(() => setMessage(''), 2500);

      if (remainingMistakes <= 0) {
        setMessage('💔 انتهت المحاولات! حظاً أوفر في المرة القادمة.');
      }
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#0d021a] text-white p-4 md:p-8 font-sans flex flex-col items-center justify-between">
      
      <header className="w-full max-w-4xl flex justify-between items-center bg-[#18052c] border border-purple-500/30 p-4 rounded-2xl shadow-lg mb-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎮</span>
          <h1 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300">
            روابط
          </h1>
        </div>
        <button 
          onClick={() => router.push('/lobby')}
          className="bg-purple-950/80 border border-purple-500/50 hover:bg-purple-900 transition text-pink-300 text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 font-bold shadow-md cursor-pointer">
          🏠 العودة للصالة
        </button>
      </header>

      <main className="w-full max-w-3xl flex flex-col items-center flex-grow">
        
        <div className="bg-[#18052c] border border-purple-500/30 px-6 py-2.5 rounded-full mb-6 flex items-center gap-3 shadow-md">
          <span className="text-sm text-gray-300">الأخطاء المتبقية:</span>
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <span key={i} className={`text-lg transition-transform duration-300 ${i < mistakes ? 'scale-110' : 'scale-95 grayscale opacity-40'}`}>
                {i < mistakes ? '❤️' : '💔'}
              </span>
            ))}
          </div>
        </div>

        {message && (
          <div className="bg-purple-900/90 border border-pink-500 text-pink-200 px-6 py-2.5 rounded-xl mb-4 text-sm font-bold animate-pulse shadow-lg text-center">
            {message}
          </div>
        )}

        <div className="w-full space-y-3 mb-6">
          {solvedGroups.map((group, index) => (
            <div key={index} className="bg-purple-950/80 border border-pink-500/50 p-4 rounded-2xl text-center shadow-lg animate-fade-in">
              <h3 className="text-pink-300 font-bold text-base mb-1">{group.category}</h3>
              <p className="text-sm text-gray-300">{group.words.join(' ، ')}</p>
            </div>
          ))}
        </div>

        {words.length > 0 && solvedGroups.length < currentPuzzle.groups.length && mistakes > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mb-6">
            {words
              .filter(w => !solvedGroups.some(g => g.words.includes(w.text)))
              .map(wordObj => (
                <button
                  key={wordObj.id}
                  onClick={() => handleCardClick(wordObj.id)}
                  className={`p-5 rounded-2xl border text-center font-bold text-sm md:text-base transition-all shadow-lg min-h-[90px] flex items-center justify-center cursor-pointer ${
                    wordObj.selected 
                      ? 'bg-pink-600 border-pink-300 scale-95 shadow-[0_0_15px_rgba(236,72,153,0.6)]' 
                      : 'bg-[#18052c] border-purple-500/40 hover:border-pink-400 text-gray-100'
                  }`}
                >
                  {wordObj.text}
                </button>
              ))}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-3 w-full mb-6">
          <button 
            onClick={handleCheck}
            disabled={mistakes <= 0 || solvedGroups.length === currentPuzzle.groups.length}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition px-6 py-3 rounded-xl font-bold shadow-md text-sm disabled:opacity-50 cursor-pointer">
            ✓ تحقق
          </button>
          <button 
            onClick={handleDeselectAll}
            className="bg-purple-900/80 border border-purple-500/50 hover:bg-purple-800 transition px-6 py-3 rounded-xl font-bold shadow-md text-sm cursor-pointer">
            ⮡ إلغاء التحديد
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-3 w-full">
          <button 
            onClick={() => setShowModal(true)}
            className="bg-purple-950/80 border border-purple-500/40 hover:bg-purple-900 transition px-5 py-2.5 rounded-xl text-xs font-bold text-pink-300 flex items-center gap-1.5 cursor-pointer">
            ❓ طريقة اللعب
          </button>
          <button 
            onClick={generateRandomPuzzle}
            className="bg-purple-950/80 border border-purple-500/40 hover:bg-purple-900 transition px-5 py-2.5 rounded-xl text-xs font-bold text-pink-300 flex items-center gap-1.5 cursor-pointer">
            🔄 لعبة جديدة
          </button>
        </div>

      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#18052c] border border-purple-500/50 rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 left-4 bg-purple-900/80 hover:bg-purple-800 text-pink-300 w-8 h-8 rounded-full flex items-center justify-center font-bold cursor-pointer">
              ✕
            </button>
            
            <div className="flex items-center gap-2 mb-6 justify-center">
              <span className="text-xl">🎮</span>
              <h2 className="text-xl font-extrabold text-pink-300">طريقة اللعب</h2>
            </div>

            <div className="space-y-4 text-sm">
              <div className="bg-purple-950/60 border border-purple-500/30 p-3.5 rounded-xl flex items-center gap-3">
                <span className="text-lg">🎯</span>
                <p>اختر 4 كلمات تنتمي إلى نفس المجموعة</p>
              </div>
              <div className="bg-purple-950/60 border border-purple-500/30 p-3.5 rounded-xl flex items-center gap-3">
                <span className="text-lg">✅</span>
                <p>اضغط &quot;تحقق&quot; للتأكد من اختيارك</p>
              </div>
              <div className="bg-purple-950/60 border border-purple-500/30 p-3.5 rounded-xl flex items-center gap-3">
                <span className="text-lg">💡</span>
                <p>لديك 4 محاولات فقط وتتحول القلوب إلى منكسرة عند الخطأ</p>
              </div>
              <div className="bg-purple-950/60 border border-purple-500/30 p-3.5 rounded-xl flex items-center gap-3">
                <span className="text-lg">🏆</span>
                <p>اكتشف جميع المجموعات الأربع للفوز!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="text-center py-4 text-xs text-gray-500 border-t border-purple-900/40 w-full mt-6">
        جميع الحقوق محفوظة © 2026 - Mesho Games
      </footer>

    </div>
  );
}