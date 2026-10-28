import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Compass, Tag, Layers, ArrowRight, CornerDownLeft } from 'lucide-react';
import { searchAll } from '../utils/search';
import { GlobalSearchResult } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (url: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onSelectResult }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GlobalSearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const res = searchAll(query);
    setResults(res);
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          // trigger open
        }
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          onSelectResult(results[selectedIndex].url);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, onSelectResult]);

  if (!isOpen) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Documento': return <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'Artigo': return <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'Área CINE': return <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      default: return <Tag className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-16 px-4 sm:px-6">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative border-b border-slate-200 dark:border-slate-800 px-4 py-3.5 flex items-center">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar por artigos, leis, domínios CINE, QNQ, faculdades..."
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-700 rounded"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800">
          {query.trim().length >= 2 && results.length === 0 && (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm font-medium">Nenhum resultado encontrado para &quot;{query}&quot;</p>
              <p className="text-xs text-slate-400 mt-1">Tente pesquisar por palavras como &quot;Artigo 4&quot;, &quot;Nível 7&quot;, &quot;CINE 06&quot;, &quot;Ciência da Computação&quot; ou &quot;Quelimane&quot;.</p>
            </div>
          )}

          {query.trim().length < 2 && (
            <div className="py-8 px-4 text-xs text-slate-400 space-y-3">
              <div className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                Sugestões de Pesquisa Frequentes:
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'Artigo 4 Decreto 43',
                  'Nível 7 QNQ',
                  'CINE 06 TIC',
                  'Licenciatura 4 anos',
                  'Faculdade de Educação',
                  'Engenharia de Software',
                  'Acreditação CNAQ'
                ].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.map((res, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <div
                key={res.id}
                onClick={() => {
                  onSelectResult(res.url);
                  onClose();
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`p-3 rounded-lg cursor-pointer transition-colors flex items-start justify-between ${
                  isSelected
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-start space-x-3 overflow-hidden">
                  <div className="mt-0.5 shrink-0">{getCategoryIcon(res.category)}</div>
                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        {res.category}
                      </span>
                      {res.matchedField && (
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">
                          • {res.matchedField}
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {res.title}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                      {res.snippet}
                    </p>
                  </div>
                </div>

                <div className="ml-3 shrink-0 flex items-center self-center text-slate-400">
                  {isSelected && <CornerDownLeft className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="border-t border-slate-200 dark:border-slate-800 px-4 py-2 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center space-x-3">
            <span><kbd className="font-mono">↑↓</kbd> Navegar</span>
            <span><kbd className="font-mono">↵</kbd> Abrir</span>
            <span><kbd className="font-mono">ESC</kbd> Fechar</span>
          </div>
          <div>
            <span>Pesquisa instantânea em 9 documentos e 153 artigos</span>
          </div>
        </div>
      </div>
    </div>
  );
};
