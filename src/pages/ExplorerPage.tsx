import React, { useState, useMemo, useEffect } from 'react';
import { 
  Compass, 
  Search, 
  Filter, 
  Copy, 
  Check, 
  FileText, 
  Share2, 
  ExternalLink, 
  Bookmark, 
  CheckCircle2, 
  AlertCircle,
  Layers,
  BookOpen
} from 'lucide-react';
import { allLawArticles } from '../data/laws';
import { documentsCatalog } from '../data/documents';
import { LawArticle, DocumentItem } from '../types';

interface ExplorerPageProps {
  onNavigate: (route: string) => void;
  onOpenCitation: (doc: DocumentItem, article?: LawArticle) => void;
}

export const ExplorerPage: React.FC<ExplorerPageProps> = ({ onNavigate, onOpenCitation }) => {
  const [selectedDocId, setSelectedDocId] = useState<string>('todos');
  const [selectedChapter, setSelectedChapter] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Read URL query params if any
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('?')) {
      const params = new URLSearchParams(hash.split('?')[1]);
      const doc = params.get('doc');
      const art = params.get('art');
      if (doc) setSelectedDocId(doc);
      if (art) {
        setTimeout(() => {
          const el = document.getElementById(art);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  }, []);

  const chapters = useMemo(() => {
    const list = selectedDocId === 'todos' 
      ? allLawArticles 
      : allLawArticles.filter(a => a.docId === selectedDocId);
    
    const unique = Array.from(new Set(list.map(a => `${a.chapterNumber}: ${a.chapterTitle}`)));
    return unique.filter(Boolean);
  }, [selectedDocId]);

  const filteredArticles = useMemo(() => {
    return allLawArticles.filter(art => {
      if (selectedDocId !== 'todos' && art.docId !== selectedDocId) return false;
      
      if (selectedChapter !== 'todos') {
        const chapLabel = `${art.chapterNumber}: ${art.chapterTitle}`;
        if (chapLabel !== selectedChapter) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchNum = String(art.number) === q || `artigo ${art.number}`.includes(q);
        const matchTitle = art.title.toLowerCase().includes(q);
        const matchText = art.officialText.toLowerCase().includes(q);
        const matchSum = art.summary.toLowerCase().includes(q);
        const matchExp = art.explanation.toLowerCase().includes(q);
        if (!matchNum && !matchTitle && !matchText && !matchSum && !matchExp) return false;
      }

      return true;
    });
  }, [selectedDocId, selectedChapter, searchQuery]);

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShareArticle = (art: LawArticle) => {
    const url = `${window.location.origin}${window.location.pathname}#/explorador?doc=${art.docId}&art=${art.id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(`share-${art.id}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
          <Compass className="w-4 h-4" />
          <span>Módulo D</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Explorador de Legislação e Normas
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Navegue e estude os 153 artigos legais que constituem a espinha dorsal regulatória do Ensino Superior em Moçambique: Lei n.º 1/2023, Decreto n.º 43/2023 e Decreto n.º 61/2022.
        </p>
      </div>

      {/* Filter and Query Controls */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Law selector */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">
              Diploma Legal
            </label>
            <select
              value={selectedDocId}
              onChange={(e) => {
                setSelectedDocId(e.target.value);
                setSelectedChapter('todos');
              }}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-medium"
            >
              <option value="todos">Todos os Diplomas (153 Artigos)</option>
              <option value="lei-1-2023">Lei n.º 1/2023 — Lei do Ensino Superior (58 arts)</option>
              <option value="decreto-43-2023">Decreto n.º 43/2023 — Licenciamento IES (73 arts)</option>
              <option value="decreto-61-2022">Decreto n.º 61/2022 — Criação do QNQ (22 arts)</option>
            </select>
          </div>

          {/* Chapter selector */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">
              Capítulo
            </label>
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="todos">Todos os Capítulos</option>
              {chapters.map((chap) => (
                <option key={chap} value={chap}>{chap}</option>
              ))}
            </select>
          </div>

          {/* Search text / article number */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">
              Pesquisar Artigo ou Termo
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ex: 4, 28, domínios, acreditação..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

        </div>

        {/* Counter and clear */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span>Encontrados <strong>{filteredArticles.length}</strong> artigos</span>
          {(selectedDocId !== 'todos' || selectedChapter !== 'todos' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedDocId('todos');
                setSelectedChapter('todos');
                setSearchQuery('');
              }}
              className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              Limpar Filtros
            </button>
          )}
        </div>
      </div>

      {/* Articles Feed */}
      <div className="space-y-6">
        {filteredArticles.map((art) => {
          const docMeta = documentsCatalog.find(d => d.id === art.docId);
          return (
            <article
              key={art.id}
              id={art.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden transition-all hover:border-slate-300 dark:hover:border-slate-700"
            >
              {/* Card Header */}
              <div className="bg-slate-50 dark:bg-slate-800/60 px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {art.docTitle.split('—')[0].trim()}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {art.chapterNumber} — {art.chapterTitle}
                  </span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => handleShareArticle(art)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
                    title="Copiar ligação permanente para este artigo"
                  >
                    {copiedId === `share-${art.id}` ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => handleCopyText(`art-${art.id}`, art.officialText)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
                    title="Copiar texto oficial"
                  >
                    {copiedId === `art-${art.id}` ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  {docMeta && (
                    <button
                      onClick={() => onOpenCitation(docMeta, art)}
                      className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
                      title="Citar este artigo"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Title & Body */}
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    Artigo {art.number} — {art.title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left: Literal official text */}
                  <div className="lg:col-span-7 space-y-2">
                    <div className="flex items-center space-x-1.5 text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      <span>Texto Oficial Integral (Publicação no Boletim da República)</span>
                    </div>
                    <div className="p-4 bg-slate-50/80 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-serif leading-relaxed whitespace-pre-wrap">
                      {art.officialText}
                    </div>
                  </div>

                  {/* Right: Explanation & Cross References */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>Interpretação e Implicações Académicas</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-emerald-50/40 dark:bg-emerald-950/20 p-3.5 rounded-lg border border-emerald-200/60 dark:border-emerald-900/40">
                        {art.explanation}
                      </p>
                    </div>

                    {art.crossReferences && art.crossReferences.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                          Remissões e Articulações:
                        </span>
                        <div className="space-y-1.5">
                          {art.crossReferences.map((ref, i) => (
                            <div key={i} className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-700 text-xs">
                              <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                                {ref.label}:
                              </span>{' '}
                              <span className="text-slate-600 dark:text-slate-300">{ref.note}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {art.validationNote && (
                      <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200">
                        <strong>Nota Metodológica:</strong> {art.validationNote}
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </article>
          );
        })}

        {filteredArticles.length === 0 && (
          <div className="py-16 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <Compass className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300">
              Nenhum artigo encontrado
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Verifique os termos de pesquisa ou selecione outro diploma legal.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
