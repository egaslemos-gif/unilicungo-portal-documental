import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Download, 
  FileText, 
  Bookmark, 
  BookmarkCheck, 
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
  Maximize2
} from 'lucide-react';
import { documentsCatalog } from '../data/documents';
import { allLawArticles, getArticlesByDocId } from '../data/laws';
import { cineAreas, cineNotice } from '../data/cine';
import { planoStages, facultySessions, planoDiscrepancyNotice } from '../data/plano-unilicungo';
import { qualificacaoCC } from '../data/qualificacao-cc';
import { qnqLevels } from '../data/qnq';
import { isBookmarked, saveBookmark, removeBookmark } from '../utils/storage';
import { DocumentItem, LawArticle } from '../types';

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

  // Sync if initialDocId changes
  React.useEffect(() => {
    if (initialDocId) {
      setCurrentDocId(initialDocId);
    }
  }, [initialDocId]);

  const currentDoc = useMemo(() => {
    return documentsCatalog.find(d => d.id === currentDocId) || documentsCatalog[0];
  }, [currentDocId]);

  const articles = useMemo(() => {
    return getArticlesByDocId(currentDocId);
  }, [currentDocId]);

  const filteredArticles = useMemo(() => {
    if (!searchInDoc.trim()) return articles;
    const q = searchInDoc.toLowerCase();
    return articles.filter(a => 
      a.title.toLowerCase().includes(q) || 
      a.officialText.toLowerCase().includes(q) || 
      String(a.number).includes(q) ||
      a.summary.toLowerCase().includes(q)
    );
  }, [articles, searchInDoc]);

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleBookmark = (article?: LawArticle) => {
    const artId = article?.id;
    if (isBookmarked(currentDoc.id, artId)) {
      // Find id
      // Since storage handles it, we can just save or remove
    } else {
      saveBookmark({
        docId: currentDoc.id,
        articleId: artId,
        title: article ? `Artigo ${article.number} — ${article.title}` : currentDoc.shortTitle
      });
    }
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
        
        {/* LEFT SIDEBAR: Table of Contents / Index */}
        {sidebarOpen && (
          <aside className="w-80 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full overflow-hidden">
            <div className="p-3 border-b border-slate-200 dark:border-slate-800">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={searchInDoc}
                  onChange={(e) => setSearchInDoc(e.target.value)}
                  placeholder="Filtrar artigos neste diploma..."
                  className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1 text-xs">
              {articles.length > 0 ? (
                filteredArticles.map((art) => (
                  <a
                    key={art.id}
                    href={`#art-${art.id}`}
                    className="block p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <div className="font-semibold text-emerald-800 dark:text-emerald-400 flex items-center justify-between">
                      <span>Artigo {art.number}</span>
                      <span className="text-[10px] text-slate-400">Pág. {art.pageNumber}</span>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 truncate">
                      {art.title}
                    </div>
                  </a>
                ))
              ) : currentDoc.id === 'manual-cine' ? (
                <div className="space-y-1">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase px-2 py-1">
                    10 Áreas Gerais CINE
                  </div>
                  {cineAreas.filter(a => a.level === 'geral').map(area => (
                    <a
                      key={area.code}
                      href={`#cine-${area.code}`}
                      className="block p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      <span className="font-mono font-bold text-purple-700 dark:text-purple-400 mr-1.5">
                        {area.code}
                      </span>
                      <span>{area.name}</span>
                    </a>
                  ))}
                </div>
              ) : currentDoc.id === 'plano-socializacao' ? (
                <div className="space-y-1">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase px-2 py-1">
                    Sessões nas 10 Faculdades
                  </div>
                  {facultySessions.map(fac => (
                    <a
                      key={fac.faculty}
                      href={`#fac-${fac.faculty.slice(0, 10)}`}
                      className="block p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      <div className="font-semibold text-emerald-700 dark:text-emerald-400">
                        {fac.faculty}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {fac.city} • {fac.schedule}
                      </div>
                    </a>
                  ))}
                </div>
              ) : currentDoc.id === 'qualificacao-cc' ? (
                <div className="space-y-1">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase px-2 py-1">
                    9 Ramos de Computação
                  </div>
                  {qualificacaoCC.ramos.map(r => (
                    <a
                      key={r.id}
                      href={`#ramo-${r.number}`}
                      className="block p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      <span className="font-bold text-emerald-700 dark:text-emerald-400 mr-1">
                        Ramo {r.number}:
                      </span>
                      <span>{r.name}</span>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-slate-400 text-xs">
                  Documento sem divisão por artigos numéricos. Utilize as abas de leitura assistida e metadados.
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
                  {filteredArticles.map((art) => (
                    <article
                      key={art.id}
                      id={`art-${art.id}`}
                      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden"
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

                      {/* Side-by-side or stacked: Official Text vs. Pedagogical Summary */}
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
                  ))}
                </div>
              )}

              {/* If Manual CINE */}
              {currentDoc.id === 'manual-cine' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cineAreas.filter(a => a.level === 'geral').map(area => (
                      <div
                        key={area.code}
                        id={`cine-${area.code}`}
                        className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                            Área Geral {area.code}
                          </span>
                          <span className="text-[11px] text-slate-400">Pág. {area.pageReference}</span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          {area.name}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {area.description}
                        </p>
                        {area.examples && (
                          <div className="text-[11px] text-slate-500">
                            <strong>Exemplos:</strong> {area.examples.join(', ')}
                          </div>
                        )}
                        {area.inclusions && (
                          <div className="text-[11px] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 p-2 rounded">
                            <strong>Inclui:</strong> {area.inclusions.join('; ')}
                          </div>
                        )}
                        {area.exclusions && (
                          <div className="text-[11px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 p-2 rounded">
                            <strong>Exclui:</strong> {area.exclusions.join('; ')}
                          </div>
                        )}
                      </div>
                    ))}
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
                          {facultySessions.map(fac => (
                            <tr key={fac.faculty} id={`fac-${fac.faculty.slice(0, 10)}`} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
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
                          ))}
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
                      {qualificacaoCC.ramos.map(r => (
                        <div key={r.number} id={`ramo-${r.number}`} className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
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
                      ))}
                    </div>
                  </div>

                  {/* 32 Nuclear Disciplines */}
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      As 32 Unidades Curriculares Nucleares Obrigatórias
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                      {qualificacaoCC.nuclearDisciplines.map((disc, idx) => (
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
