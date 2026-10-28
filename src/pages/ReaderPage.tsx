import React, { useState, useMemo, useEffect } from 'react';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Download, 
  FileText, 
  Bookmark, 
  Copy, 
  Check, 
  ExternalLink, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Image as ImageIcon,
  Share2,
  FileCheck,
  Maximize2,
  Filter,
  X
} from 'lucide-react';
import { documentsCatalog } from '../data/documents';
import { allLawArticles, getArticlesByDocId } from '../data/laws';
import { cineAreas, cineNotice } from '../data/cine';
import { planoStages, facultySessions, planoDiscrepancyNotice } from '../data/plano-unilicungo';
import { qualificacaoCC } from '../data/qualificacao-cc';
import { qnqLevels } from '../data/qnq';
import { isBookmarked, saveBookmark } from '../utils/storage';
import { DocumentItem, LawArticle, CineArea } from '../types';

interface ReaderPageProps {
  initialDocId?: string;
  onNavigate: (route: string) => void;
  onOpenCitation: (doc: DocumentItem, article?: LawArticle) => void;
}

export const ReaderPage: React.FC<ReaderPageProps> = ({ initialDocId = 'lei-1-2023', onNavigate, onOpenCitation }) => {
  const [currentDocId, setCurrentDocId] = useState<string>(initialDocId);
  const [searchInDoc, setSearchInDoc] = useState('');
  const [activeTab, setActiveTab] = useState<'estruturado' | 'scans' | 'metadados'>('estruturado');
  const [selectedScanIndex, setSelectedScanIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Focus / Filtering state within document
  const [selectedCineAreaCode, setSelectedCineAreaCode] = useState<string | null>(null);
  const [highlightedElementId, setHighlightedElementId] = useState<string | null>(null);

  // Sync if initialDocId changes
  useEffect(() => {
    if (initialDocId) {
      setCurrentDocId(initialDocId);
      setSelectedCineAreaCode(null);
      setHighlightedElementId(null);
      setSearchInDoc('');
    }
  }, [initialDocId]);

  const currentDoc = useMemo(() => {
    return documentsCatalog.find(d => d.id === currentDocId) || documentsCatalog[0];
  }, [currentDocId]);

  const articles = useMemo(() => {
    return getArticlesByDocId(currentDocId);
  }, [currentDocId]);

  // 1. Filtered Law Articles
  const filteredArticles = useMemo(() => {
    if (!searchInDoc.trim()) return articles;
    const q = searchInDoc.toLowerCase();
    return articles.filter(a => 
      a.title.toLowerCase().includes(q) || 
      a.officialText.toLowerCase().includes(q) || 
      String(a.number).includes(q) ||
      a.summary.toLowerCase().includes(q) ||
      (a.chapterTitle && a.chapterTitle.toLowerCase().includes(q))
    );
  }, [articles, searchInDoc]);

  // 2. Filtered CINE Areas
  const cineFilteredData = useMemo(() => {
    const q = searchInDoc.toLowerCase().trim();
    if (!q) {
      return {
        generalAreas: cineAreas.filter(a => a.level === 'geral'),
        allMatching: cineAreas,
        isFiltering: false
      };
    }

    const matching = cineAreas.filter(a =>
      a.code.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      (a.examples && a.examples.some(e => e.toLowerCase().includes(q))) ||
      (a.inclusions && a.inclusions.some(i => i.toLowerCase().includes(q))) ||
      (a.exclusions && a.exclusions.some(x => x.toLowerCase().includes(q)))
    );

    // Identify which 2-digit general codes have matches
    const matchingGeneralCodes = new Set<string>();
    matching.forEach(m => {
      const genCode = m.code.slice(0, 2);
      matchingGeneralCodes.add(genCode);
    });

    const genList = cineAreas.filter(a => 
      a.level === 'geral' && (matchingGeneralCodes.has(a.code) || a.name.toLowerCase().includes(q) || a.code.includes(q))
    );

    return {
      generalAreas: genList,
      allMatching: matching,
      isFiltering: true
    };
  }, [searchInDoc]);

  // 3. Filtered Plano Faculties
  const filteredFaculties = useMemo(() => {
    if (!searchInDoc.trim()) return facultySessions;
    const q = searchInDoc.toLowerCase();
    return facultySessions.filter(f =>
      f.faculty.toLowerCase().includes(q) ||
      f.city.toLowerCase().includes(q) ||
      f.activities.toLowerCase().includes(q) ||
      (f.targetCourses && f.targetCourses.some(c => c.toLowerCase().includes(q)))
    );
  }, [searchInDoc]);

  // 4. Filtered Computer Science Qualifications
  const filteredRamos = useMemo(() => {
    if (!searchInDoc.trim()) return qualificacaoCC.ramos;
    const q = searchInDoc.toLowerCase();
    return qualificacaoCC.ramos.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      String(r.number).includes(q)
    );
  }, [searchInDoc]);

  const filteredNuclearDisciplines = useMemo(() => {
    if (!searchInDoc.trim()) return qualificacaoCC.nuclearDisciplines;
    const q = searchInDoc.toLowerCase();
    return qualificacaoCC.nuclearDisciplines.filter(d => d.toLowerCase().includes(q));
  }, [searchInDoc]);

  // Smooth scroll handler (WITHOUT altering window.location.hash)
  const scrollToTarget = (targetId: string) => {
    setHighlightedElementId(targetId);
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);

    // Remove temporary highlight after 3 seconds
    setTimeout(() => {
      setHighlightedElementId(null);
    }, 3000);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden bg-slate-50 dark:bg-slate-950">
      
      {/* Top Document Selection Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 flex items-center justify-between gap-4 shrink-0 shadow-2xs">
        <div className="flex items-center space-x-3 overflow-hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Alternar Índice Lateral"
          >
            {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:inline">
              Documento:
            </span>
            <select
              value={currentDocId}
              onChange={(e) => {
                setCurrentDocId(e.target.value);
                setSearchInDoc('');
                setSelectedCineAreaCode(null);
                setHighlightedElementId(null);
              }}
              className="px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white max-w-xs sm:max-w-md truncate focus:outline-none focus:border-emerald-500"
            >
              {documentsCatalog.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.shortTitle}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 shrink-0">
          {/* Tab Selector */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs">
            <button
              onClick={() => setActiveTab('estruturado')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                activeTab === 'estruturado'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Leitura Assistida
            </button>
            {currentDoc.scansAvailable && currentDoc.scansAvailable.length > 0 && (
              <button
                onClick={() => setActiveTab('scans')}
                className={`px-3 py-1 rounded-md font-medium transition-colors flex items-center space-x-1 ${
                  activeTab === 'scans'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5 mr-1" />
                <span>Scans ({currentDoc.scansAvailable.length})</span>
              </button>
            )}
            <button
              onClick={() => setActiveTab('metadados')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                activeTab === 'metadados'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Ficha Técnica
            </button>
          </div>

          <button
            onClick={() => onOpenCitation(currentDoc)}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Citar este documento"
          >
            <FileText className="w-4 h-4" />
          </button>

          <a
            href={currentDoc.pdfUrl}
            download={currentDoc.originalFilename}
            className="flex items-center space-x-1 px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-medium shadow-2xs"
            title="Descarregar PDF original do arquivo"
          >
            <Download className="w-3.5 h-3.5 mr-1" />
            <span className="hidden sm:inline">Baixar PDF</span>
          </a>
        </div>
      </div>

      {/* Main Workspace Layout (Sidebar + Content Pane) */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT SIDEBAR: Table of Contents / Interactive Filter */}
        {sidebarOpen && (
          <aside className="w-80 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full overflow-hidden">
            {/* Filter Search Field */}
            <div className="p-3 border-b border-slate-200 dark:border-slate-800 space-y-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={searchInDoc}
                  onChange={(e) => setSearchInDoc(e.target.value)}
                  placeholder={
                    currentDoc.id === 'manual-cine' 
                      ? "Filtrar áreas CINE (ex: EDU, 06, Saúde)..." 
                      : currentDoc.id === 'plano-socializacao'
                      ? "Filtrar faculdades e sessões..."
                      : currentDoc.id === 'qualificacao-cc'
                      ? "Filtrar ramos e disciplinas..."
                      : "Filtrar artigos neste diploma..."
                  }
                  className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                />
                {searchInDoc && (
                  <button
                    onClick={() => setSearchInDoc('')}
                    className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Status counter */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                <span>
                  {articles.length > 0 && `${filteredArticles.length} de ${articles.length} artigos`}
                  {currentDoc.id === 'manual-cine' && `${cineFilteredData.generalAreas.length} de 10 áreas gerais`}
                  {currentDoc.id === 'plano-socializacao' && `${filteredFaculties.length} de 10 faculdades`}
                  {currentDoc.id === 'qualificacao-cc' && `${filteredRamos.length} de 9 ramos`}
                </span>
                {selectedCineAreaCode && (
                  <button
                    onClick={() => setSelectedCineAreaCode(null)}
                    className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
                  >
                    Ver Todas
                  </button>
                )}
              </div>
            </div>

            {/* Sidebar Item List (BUTTONS, NOT ANCHORS) */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1 text-xs">
              
              {/* Case 1: Law Articles */}
              {articles.length > 0 && (
                filteredArticles.map((art) => (
                  <button
                    key={art.id}
                    type="button"
                    onClick={() => scrollToTarget(`art-${art.id}`)}
                    className="w-full text-left p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <div className="font-semibold text-emerald-800 dark:text-emerald-400 flex items-center justify-between">
                      <span>Artigo {art.number}</span>
                      <span className="text-[10px] text-slate-400">Pág. {art.pageNumber}</span>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 truncate">
                      {art.title}
                    </div>
                  </button>
                ))
              )}

              {/* Case 2: Manual CINE Areas */}
              {currentDoc.id === 'manual-cine' && (
                <div className="space-y-1">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase px-2 py-1">
                    10 Áreas Gerais CINE (00 a 10)
                  </div>
                  {cineFilteredData.generalAreas.map((area) => {
                    const isSelected = selectedCineAreaCode === area.code;
                    return (
                      <button
                        key={area.code}
                        type="button"
                        onClick={() => {
                          setSelectedCineAreaCode(area.code);
                          scrollToTarget(`cine-${area.code}`);
                        }}
                        className={`w-full text-left p-2 rounded transition-colors flex items-center justify-between ${
                          isSelected
                            ? 'bg-emerald-100/70 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 font-bold border-l-4 border-emerald-600'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2 truncate">
                          <span className="font-mono font-bold text-purple-700 dark:text-purple-400 shrink-0">
                            {area.code}
                          </span>
                          <span className="truncate">{area.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 shrink-0 ml-1">
                          Pág. {area.pageReference}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Case 3: Plano UniLicungo Faculties */}
              {currentDoc.id === 'plano-socializacao' && (
                <div className="space-y-1">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase px-2 py-1">
                    Sessões nas 10 Faculdades
                  </div>
                  {filteredFaculties.map((fac) => (
                    <button
                      key={fac.faculty}
                      type="button"
                      onClick={() => scrollToTarget(`fac-${fac.faculty.slice(0, 10)}`)}
                      className="w-full text-left p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      <div className="font-semibold text-emerald-700 dark:text-emerald-400">
                        {fac.faculty}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {fac.city} • {fac.schedule}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Case 4: Computer Science Qualifications */}
              {currentDoc.id === 'qualificacao-cc' && (
                <div className="space-y-1">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase px-2 py-1">
                    9 Ramos de Computação
                  </div>
                  {filteredRamos.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => scrollToTarget(`ramo-${r.number}`)}
                      className="w-full text-left p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      <span className="font-bold text-emerald-700 dark:text-emerald-400 mr-1">
                        Ramo {r.number}:
                      </span>
                      <span>{r.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Empty state when filtering */}
              {articles.length === 0 && currentDoc.id !== 'manual-cine' && currentDoc.id !== 'plano-socializacao' && currentDoc.id !== 'qualificacao-cc' && (
                <div className="p-4 text-center text-slate-400 text-xs">
                  Documento sem divisão por artigos numéricos.
                </div>
              )}

              {currentDoc.id === 'manual-cine' && cineFilteredData.generalAreas.length === 0 && (
                <div className="p-4 text-center text-slate-400 text-xs">
                  Nenhuma área encontrada para &quot;{searchInDoc}&quot;.
                </div>
              )}

              {currentDoc.id === 'plano-socializacao' && filteredFaculties.length === 0 && (
                <div className="p-4 text-center text-slate-400 text-xs">
                  Nenhuma faculdade encontrada para &quot;{searchInDoc}&quot;.
                </div>
              )}
            </div>
          </aside>
        )}

        {/* RIGHT CONTENT PANE */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
          
          {/* Document Header Banner */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                {currentDoc.type}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                {currentDoc.jurisdiction}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {currentDoc.issuer} ({currentDoc.date || currentDoc.year})
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {currentDoc.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              {currentDoc.summary}
            </p>

            {/* Inconsistencies alert if Plano or CINE */}
            {currentDoc.id === 'plano-socializacao' && (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-lg text-xs text-amber-900 dark:text-amber-200">
                <strong>Alerta Documental:</strong> {planoDiscrepancyNotice.finding} {planoDiscrepancyNotice.explanation}
              </div>
            )}

            {currentDoc.id === 'manual-cine' && (
              <div className="p-3 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/60 rounded-lg text-xs text-purple-900 dark:text-purple-200">
                <strong>Estatuto Técnico:</strong> {cineNotice.text}
              </div>
            )}
          </div>

          {/* TAB CONTENT: ESTRUTURADO */}
          {activeTab === 'estruturado' && (
            <div className="space-y-6">
              
              {/* If Law Articles are present */}
              {articles.length > 0 && (
                <div className="space-y-6">
                  {filteredArticles.map((art) => {
                    const isHighlighted = highlightedElementId === `art-${art.id}`;
                    return (
                      <article
                        key={art.id}
                        id={`art-${art.id}`}
                        className={`bg-white dark:bg-slate-900 rounded-xl border transition-all duration-300 shadow-xs overflow-hidden ${
                          isHighlighted
                            ? 'border-emerald-500 ring-2 ring-emerald-400/50 shadow-md'
                            : 'border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        {/* Article Header */}
                        <div className="bg-slate-50 dark:bg-slate-800/60 px-5 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                          <div>
                            <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                              {art.chapterNumber} — {art.chapterTitle}
                            </div>
                            <h2 className="text-base font-bold text-slate-900 dark:text-white">
                              Artigo {art.number}: {art.title}
                            </h2>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <button
                              onClick={() => handleCopyText(`art-${art.id}`, art.officialText)}
                              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded hover:bg-slate-200/60 dark:hover:bg-slate-700"
                              title="Copiar texto oficial"
                            >
                              {copiedId === `art-${art.id}` ? (
                                <Check className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={() => onOpenCitation(currentDoc, art)}
                              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded hover:bg-slate-200/60 dark:hover:bg-slate-700"
                              title="Citar este artigo"
                            >
                              <FileText className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Side-by-side: Official Text vs. Pedagogical Summary */}
                        <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
                          
                          {/* Literal Official Text */}
                          <div className="lg:col-span-7 space-y-2">
                            <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                              <span className="w-2 h-2 rounded-full bg-blue-500" />
                              <span>Texto Oficial Integral (Boletim da República)</span>
                            </div>
                            <div className="p-4 bg-slate-50/70 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-serif leading-relaxed whitespace-pre-wrap">
                              {art.officialText}
                            </div>
                          </div>

                          {/* Pedagogical Explanation & Cross-references */}
                          <div className="lg:col-span-5 space-y-4">
                            <div className="space-y-1.5">
                              <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span>Resumo e Interpretação Prática</span>
                              </div>
                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-emerald-50/50 dark:bg-emerald-950/20 p-3 rounded-lg border border-emerald-200/60 dark:border-emerald-900/40">
                                {art.explanation}
                              </p>
                            </div>

                            {art.crossReferences && art.crossReferences.length > 0 && (
                              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                                  Relações Interdocumentais:
                                </div>
                                <div className="space-y-1.5">
                                  {art.crossReferences.map((ref, idx) => (
                                    <div
                                      key={idx}
                                      className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-700 text-xs"
                                    >
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
                              <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 rounded border border-amber-200 dark:border-amber-900/50 text-[11px] text-amber-800 dark:text-amber-200">
                                <strong>Nota de Validação:</strong> {art.validationNote}
                              </div>
                            )}
                          </div>

                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              {/* If Manual CINE: Show General Areas AND ALL Specific & Detailed Sub-areas! */}
              {currentDoc.id === 'manual-cine' && (
                <div className="space-y-8">
                  {/* Selected Filter Pill Banner */}
                  {selectedCineAreaCode && (
                    <div className="flex items-center justify-between p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl">
                      <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-900 dark:text-emerald-200">
                        <Filter className="w-4 h-4 text-emerald-600" />
                        <span>A visualizar com foco: Área Geral {selectedCineAreaCode}</span>
                      </div>
                      <button
                        onClick={() => setSelectedCineAreaCode(null)}
                        className="px-2.5 py-1 text-xs font-semibold bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 rounded-lg hover:bg-emerald-100"
                      >
                        Ver Todas as 10 Áreas
                      </button>
                    </div>
                  )}

                  <div className="space-y-8">
                    {cineFilteredData.generalAreas
                      .filter(gen => !selectedCineAreaCode || gen.code === selectedCineAreaCode)
                      .map((area) => {
                        const isHighlighted = highlightedElementId === `cine-${area.code}`;
                        const specificAreas = cineAreas.filter(a => a.level === 'especifica' && a.parentCode === area.code);
                        
                        return (
                          <div
                            key={area.code}
                            id={`cine-${area.code}`}
                            className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-300 shadow-sm overflow-hidden ${
                              isHighlighted
                                ? 'border-emerald-500 ring-2 ring-emerald-400 shadow-lg'
                                : 'border-slate-200 dark:border-slate-800'
                            }`}
                          >
                            {/* General Area Header Card */}
                            <div className="p-6 bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <span className="w-9 h-9 rounded-xl bg-purple-700 text-white font-mono font-extrabold text-sm flex items-center justify-center shadow-xs">
                                    {area.code}
                                  </span>
                                  <div>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
                                      Área Geral do Conhecimento
                                    </span>
                                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                                      {area.name}
                                    </h2>
                                  </div>
                                </div>
                                <span className="text-xs font-mono px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                  Manual pág. {area.pageReference}
                                </span>
                              </div>

                              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-4xl">
                                {area.description}
                              </p>

                              {area.criteria && (
                                <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-lg border border-purple-200 dark:border-purple-900/40 text-xs text-purple-950 dark:text-purple-200 leading-relaxed">
                                  <strong>Critérios de Classificação:</strong> {area.criteria}
                                </div>
                              )}

                              {area.examples && (
                                <div className="text-xs text-slate-600 dark:text-slate-400 pt-1">
                                  <strong>Cursos Típicos:</strong> {area.examples.join(', ')}
                                </div>
                              )}

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                                {area.inclusions && (
                                  <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200 leading-snug">
                                    <strong>Inclui:</strong> {area.inclusions.join('; ')}
                                  </div>
                                )}
                                {area.exclusions && (
                                  <div className="p-2.5 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200 leading-snug">
                                    <strong>Exclui:</strong> {area.exclusions.join('; ')}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Specific & Detailed Sub-areas */}
                            <div className="p-6 space-y-6">
                              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center">
                                <Layers className="w-4 h-4 mr-1.5 text-purple-600" />
                                <span>Áreas Específicas e Detalhadas de {area.name}</span>
                              </h3>

                              <div className="space-y-4">
                                {specificAreas.map((spec) => {
                                  const detailedAreas = cineAreas.filter(a => a.level === 'detalhada' && a.parentCode === spec.code);
                                  return (
                                    <div
                                      key={spec.code}
                                      className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3"
                                    >
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                          <span className="font-mono text-xs font-extrabold px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                                            {spec.code}
                                          </span>
                                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                            {spec.name}
                                          </h4>
                                        </div>
                                        <span className="text-[11px] text-slate-400">Pág. {spec.pageReference}</span>
                                      </div>

                                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {spec.description}
                                      </p>

                                      {/* Detailed Areas (4 digits) */}
                                      {detailedAreas.length > 0 && (
                                        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700/60">
                                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                                            Áreas Detalhadas (4 Dígitos):
                                          </span>
                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {detailedAreas.map((det) => (
                                              <div
                                                key={det.code}
                                                className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1"
                                              >
                                                <div className="flex items-center justify-between">
                                                  <span className="font-mono font-bold text-xs text-emerald-700 dark:text-emerald-400">
                                                    {det.code}
                                                  </span>
                                                  <span className="text-[10px] text-slate-400">Pág. {det.pageReference}</span>
                                                </div>
                                                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                                  {det.name}
                                                </div>
                                                <p className="text-[11px] text-slate-500 leading-snug">
                                                  {det.description}
                                                </p>
                                                {det.examples && (
                                                  <div className="text-[10px] text-emerald-700 dark:text-emerald-400 pt-0.5">
                                                    Ex: {det.examples.join(', ')}
                                                  </div>
                                                )}
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}

                                {specificAreas.length === 0 && (
                                  <div className="text-xs text-slate-400 italic">
                                    Esta área geral compreende programas e qualificações transversais de base sem subdivisão específica adicional.
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* If Plano de Socialização UniLicungo */}
              {currentDoc.id === 'plano-socializacao' && (
                <div className="space-y-8">
                  {/* Stages */}
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      As 8 Etapas do Plano de Socialização dos Domínios
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {planoStages.map(st => (
                        <div key={st.step} className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                              Etapa {st.step}
                            </span>
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                              {st.status}
                            </span>
                          </div>
                          <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                            {st.activity}
                          </div>
                          <p className="text-[11px] text-slate-500 leading-snug">
                            {st.expectedResult}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Faculties table */}
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Calendário das Sessões nas 10 Faculdades da UniLicungo
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[11px]">
                          <tr>
                            <th className="py-2.5 px-3">Cidade / Campus</th>
                            <th className="py-2.5 px-3">Faculdade</th>
                            <th className="py-2.5 px-3">Data e Horário</th>
                            <th className="py-2.5 px-3">Cursos Analisados</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {filteredFaculties.map(fac => {
                            const isHighlighted = highlightedElementId === `fac-${fac.faculty.slice(0, 10)}`;
                            return (
                              <tr 
                                key={fac.faculty} 
                                id={`fac-${fac.faculty.slice(0, 10)}`} 
                                className={`transition-colors ${
                                  isHighlighted
                                    ? 'bg-emerald-100/70 dark:bg-emerald-950/80 font-semibold'
                                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                                }`}
                              >
                                <td className="py-2.5 px-3 font-semibold text-emerald-700 dark:text-emerald-400">
                                  {fac.city}
                                </td>
                                <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-white">
                                  {fac.faculty}
                                </td>
                                <td className="py-2.5 px-3 text-slate-500">
                                  {fac.date} às {fac.schedule}
                                </td>
                                <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">
                                  {(fac.targetCourses || []).join(', ')}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* If Computer Science Qualification */}
              {currentDoc.id === 'qualificacao-cc' && (
                <div className="space-y-8">
                  {/* Descriptors */}
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Os 10 Descritores de Nível por Domínio de Competência (Perfil de Saída Nível 7)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {qualificacaoCC.descriptors.map(d => (
                        <div key={d.number} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                          <div className="font-bold text-emerald-700 dark:text-emerald-400 text-xs">
                            {d.number}. {d.domain}
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {d.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 9 Ramos */}
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Os 9 Ramos de Especialização em Ciência da Computação
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {filteredRamos.map(r => {
                        const isHighlighted = highlightedElementId === `ramo-${r.number}`;
                        return (
                          <div 
                            key={r.number} 
                            id={`ramo-${r.number}`} 
                            className={`p-3.5 rounded-lg border transition-all ${
                              isHighlighted
                                ? 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500 shadow-md ring-2 ring-emerald-400'
                                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                              Ramo {r.number}
                            </span>
                            <h4 className="font-bold text-slate-900 dark:text-white text-xs pt-1">
                              {r.name}
                            </h4>
                            <p className="text-[11px] text-slate-500 leading-relaxed">
                              {r.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 32 Nuclear Disciplines */}
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      As 32 Unidades Curriculares Nucleares Obrigatórias
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                      {filteredNuclearDisciplines.map((disc, idx) => (
                        <div key={idx} className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-700 flex items-center space-x-2">
                          <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold shrink-0">
                            {idx + 1}.
                          </span>
                          <span className="text-slate-800 dark:text-slate-200 truncate">{disc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* If Scanned document without articles (e.g. CNAQ Harmonização / IES Zambézia) */}
              {articles.length === 0 && currentDoc.id !== 'manual-cine' && currentDoc.id !== 'plano-socializacao' && currentDoc.id !== 'qualificacao-cc' && (
                <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                  <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                    <FileCheck className="w-5 h-5" />
                    <span>Transcrição Integral Conferida do Documento Digitalizado</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {currentDoc.objective}
                  </p>
                  <p className="text-xs text-slate-500">
                    {currentDoc.extractionNotes}
                  </p>
                  <div className="pt-4 flex gap-3">
                    <button
                      onClick={() => setActiveTab('scans')}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center space-x-2"
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span>Visualizar Imagens dos Scans Originais</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB CONTENT: SCANS ORIGINAIS */}
          {activeTab === 'scans' && currentDoc.scansAvailable && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-500 font-medium">
                  Página do Scan ({selectedScanIndex + 1} de {currentDoc.scansAvailable.length}):
                </span>
                <div className="flex items-center space-x-2">
                  {currentDoc.scansAvailable.map((scanPath, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedScanIndex(idx)}
                      className={`px-3 py-1 rounded text-xs font-semibold ${
                        selectedScanIndex === idx
                          ? 'bg-emerald-700 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      Pág. {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 flex justify-center shadow-xs">
                <img
                  src={currentDoc.scansAvailable[selectedScanIndex]}
                  alt={`Scan da Página ${selectedScanIndex + 1}`}
                  className="max-h-[700px] w-auto object-contain rounded border border-slate-200 dark:border-slate-800 shadow-md"
                />
              </div>
            </div>
          )}

          {/* TAB CONTENT: METADADOS & FICHA TÉCNICA */}
          {activeTab === 'metadados' && (
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
                Ficha Técnica e Auditoria do Documento
              </h3>

              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                  <dt className="text-slate-500 font-medium">Título Completo</dt>
                  <dd className="font-semibold text-slate-900 dark:text-white mt-1">{currentDoc.title}</dd>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                  <dt className="text-slate-500 font-medium">Ficheiro Original no Arquivo</dt>
                  <dd className="font-mono text-slate-900 dark:text-white mt-1">{currentDoc.originalFilename}</dd>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                  <dt className="text-slate-500 font-medium">Entidade Emissora</dt>
                  <dd className="font-semibold text-slate-900 dark:text-white mt-1">{currentDoc.issuer}</dd>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                  <dt className="text-slate-500 font-medium">Jurisdição e Natureza</dt>
                  <dd className="font-semibold text-slate-900 dark:text-white mt-1">{currentDoc.jurisdiction}</dd>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                  <dt className="text-slate-500 font-medium">Número e Data Oficial</dt>
                  <dd className="font-semibold text-slate-900 dark:text-white mt-1">{currentDoc.numberAndDate}</dd>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                  <dt className="text-slate-500 font-medium">Estado de Verificação</dt>
                  <dd className="font-semibold text-emerald-700 dark:text-emerald-400 mt-1">{currentDoc.verificationStatus}</dd>
                </div>
              </dl>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Notas de Extração e Auditoria Documental:
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  {currentDoc.extractionNotes}
                </p>
              </div>

              {currentDoc.crossReferences && currentDoc.crossReferences.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Ligações Interdocumentais Mapeadas:
                  </h4>
                  <div className="space-y-2">
                    {currentDoc.crossReferences.map((cr, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
                        <div className="font-semibold text-emerald-700 dark:text-emerald-400">
                          {cr.relationship} → {cr.targetTitle}
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 mt-1">{cr.description}</p>
                        {cr.sourceExcerpt && (
                          <div className="mt-1 font-serif italic text-slate-500 text-[11px]">
                            {cr.sourceExcerpt}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
