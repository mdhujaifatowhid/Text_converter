import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, Type, Sparkles, RefreshCcw, Share2 } from 'lucide-react';
import { transformText, styles } from './utils/fontUtils';

export default function App() {
  const [inputText, setInputText] = useState('Type something fancy...');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] font-sans selection:bg-black selection:text-white">
      {/* Marquee Header */}
      <div className="bg-black text-white py-2 marquee-container border-b-2 border-black">
        <div className="marquee-content inline-flex gap-8 font-mono text-xs uppercase tracking-widest">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex items-center gap-2">
              <Sparkles size={12} /> GLYPH FANCY FONT STYLIST <Sparkles size={12} /> UNICODE MAGIC
            </span>
          ))}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Input */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-7xl md:text-8xl leading-[0.85] uppercase"
              >
                Style <br />
                <span className="text-white [-webkit-text-stroke:2px_black]">Your</span> <br />
                Text
              </motion.h1>
              <p className="text-lg font-medium opacity-60 max-w-sm">
                Transform plain characters into artistic Unicode expressions. Instant copy, zero hassle.
              </p>
            </div>

            <div className="relative group">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full h-48 brutalist-border bg-white p-6 text-2xl font-medium focus:outline-none resize-none transition-all group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                placeholder="Type here..."
              />
              <div className="absolute -bottom-3 -right-3 bg-black text-white p-2 brutalist-border">
                <Type size={20} />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setInputText('')}
                className="brutalist-button flex items-center gap-2"
              >
                <RefreshCcw size={18} /> Clear
              </button>
              <button 
                className="brutalist-button flex items-center gap-2 bg-black text-white hover:bg-white hover:text-black"
              >
                <Share2 size={18} /> Share Tool
              </button>
            </div>
          </div>

          {/* Right Column: Previews */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-6">
              <AnimatePresence mode="popLayout">
                {styles.map((style, index) => {
                  const transformed = transformText(inputText || 'Preview', style.id);
                  return (
                    <motion.div
                      layout
                      key={style.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative brutalist-border bg-white p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest opacity-40">
                          {style.name}
                        </span>
                        <div className="text-2xl md:text-3xl break-all">
                          {transformed}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleCopy(transformed, style.id)}
                        className={`brutalist-button flex items-center justify-center gap-2 min-w-[120px] ${
                          copiedId === style.id ? 'bg-green-400' : 'bg-white'
                        }`}
                      >
                        {copiedId === style.id ? (
                          <>
                            <Check size={18} /> Copied
                          </>
                        ) : (
                          <>
                            <Copy size={18} /> Copy
                          </>
                        )}
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-black bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-display text-4xl uppercase">Glyph</div>
          <div className="flex gap-8 font-mono text-xs uppercase tracking-tighter">
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">API</a>
            <a href="#" className="hover:underline">Github</a>
            <a href="#" className="hover:underline">Privacy</a>
          </div>
          <div className="text-xs font-mono opacity-40">
            © 2026 GLYPH LABS. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}
