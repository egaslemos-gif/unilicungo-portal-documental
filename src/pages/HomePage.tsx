import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  Library, 
  Compass, 
  GraduationCap, 
  GitCompare, 
  BarChart3, 
  ShieldCheck, 
  Layers, 
  FileCheck, 
  Building2, 
  AlertCircle, 
  ArrowRight,
  ExternalLink,
  Calendar,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { documentsCatalog } from '../data/documents';
import { portalStats } from '../data/stats';
import { DocumentCard } from '../components/DocumentCard';
import { DocumentItem } from '../types';

interface HomePageProps {
  onNavigate: (route: string) => void;
  onOpenSearch: (initialQuery?: string) => void;
  onOpenCitation: (doc: DocumentItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenSearch, onOpenCitation }) => {
  const [localQuery, setLocalQuery] = useState('');

  const featuredDocs = documentsCatalog.filter(d => 
    ['lei-1-2023', 'decreto-43-2023', 'decreto-61-2022', 'manual-cine', 'plano-socializacao'].includes(d.id)
  );

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenSearch(localQuery);
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION - REFINED WITH DARK EMERALD INSTITUTIONAL THEME & HIGH CONTRAST */}
      <section 
        className="relative overflow-hidden text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/60 shadow-2xl"
        style={{
          background: 'linear-gradient(180deg, #021a12 0%, #052a1d 35%, #083827 70%, #031c13 100%)',
          backgroundColor: '#021a12'
        }}
      >
        {/* Ambient Top Glow Effect */}
        <div 
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[380px] pointer-events-none rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #10b981 0%, #059669 40%, transparent 70%)' }}
        />

        {/* Crisp Grid Dot Pattern */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="relative max-w-5xl mx-auto text-center space-y-7">
          
          {/* Institutional Top Indicator Badge */}
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wide shadow-inner backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Repositório Institucional de Consulta e Estudo Normativo</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          </div>

          {/* Institutional Brand & Main Title */}
          <div className="space-y-3">
            <div className="text-emerald-400 font-bold text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center space-x-2">
              <span>Universidade Licungo</span>
              <span className="text-emerald-600">•</span>
              <span>Gabinete de Garantia de Qualidade (GAQ)</span>
              <span className="text-emerald-600">•</span>
              <span>CNAQ</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Portal de Consulta e Estudo Documental
            </h1>

            <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-200 font-normal leading-relaxed">
              Legislação, documentos institucionais e instrumentos de referência para consulta, estudo, comparação e compreensão da reforma curricular e garantia de qualidade (CNAQ / QNQ).
            </p>
          </div>

          {/* Interactive Hero Search Form */}
          <div className="max-w-2xl mx-auto pt-2">
            <form 
              onSubmit={handleHeroSearch}
              className="flex items-center bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-2xl border-2 border-emerald-500/40 hover:border-emerald-400 focus-within:border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-500/20 transition-all text-left"
            >
              <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400 ml-3 mr-2 shrink-0" />
              <input 
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Pesquise por artigos, diplomas (Lei 1/2023, Dec. 43/2023), áreas CINE, níveis QNQ..."
                className="w-full bg-transparent border-0 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-sm py-2 px-1 font-medium"
              />
              <div className="hidden sm:flex items-center space-x-1 mr-2 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-mono text-slate-500 shrink-0">
                <span>Ctrl</span>
                <span>K</span>
              </div>
              <button 
                type="submit" 
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-md transition-all shrink-0 flex items-center space-x-1.5"
              >
                <span>Pesquisar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Quick Shortcuts */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-slate-300">
            <span className="text-emerald-400/80 font-medium">Atalhos rápidos:</span>
            <button 
              type="button"
              onClick={() => onNavigate('#/explorador?doc=lei-1-2023&art=lei-1-2023-art-28')} 
              className="px-2.5 py-1 rounded-md bg-emerald-950/60 hover:bg-emerald-800/80 text-emerald-200 border border-emerald-700/50 hover:border-emerald-500 transition-colors"
            >
              Art. 28 SINAQES
            </button>
            <button 
              type="button"
              onClick={() => onNavigate('#/explorador?doc=decreto-43-2023&art=decreto-43-2023-art-4')} 
              className="px-2.5 py-1 rounded-md bg-emerald-950/60 hover:bg-emerald-800/80 text-emerald-200 border border-emerald-700/50 hover:border-emerald-500 transition-colors"
            >
              Art. 4 Decreto 43 (Domínios)
            </button>
            <button 
              type="button"
              onClick={() => onNavigate('#/visualizacoes?tab=qnq')} 
              className="px-2.5 py-1 rounded-md bg-emerald-950/60 hover:bg-emerald-800/80 text-emerald-200 border border-emerald-700/50 hover:border-emerald-500 transition-colors"
            >
              10 Níveis QNQ
            </button>
            <button 
              type="button"
              onClick={() => onNavigate('#/leitor/manual-cine')} 
              className="px-2.5 py-1 rounded-md bg-emerald-950/60 hover:bg-emerald-800/80 text-emerald-200 border border-emerald-700/50 hover:border-emerald-500 transition-colors"
            >
              Árvore CINE
            </button>
            <button 
              type="button"
              onClick={() => onNavigate('#/leitor/plano-socializacao')} 
              className="px-2.5 py-1 rounded-md bg-emerald-950/60 hover:bg-emerald-800/80 text-emerald-200 border border-emerald-700/50 hover:border-emerald-500 transition-colors"
            >
              10 Faculdades UniLicungo
            </button>
          </div>

          {/* 4 DIRECT ACTION GATEWAY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-5 text-left max-w-5xl mx-auto">
            
            {/* Card 1: Lei 1/2023 */}
            <div
              onClick={() => onNavigate('#/leitor/lei-1-2023')}
              className="bg-slate-900/80 hover:bg-slate-900 border border-emerald-500/25 hover:border-emerald-400 rounded-xl p-4 transition-all duration-200 backdrop-blur-sm cursor-pointer group shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Lei Nacional
                  </span>
                  <BookOpen className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                  Lei n.º 1/2023
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  107 Artigos oficiais do Ensino Superior, SINAQES, acreditação e graus académicos.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-emerald-900/50 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
                <span>Leitura Integral</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: Decreto 43/2023 */}
            <div
              onClick={() => onNavigate('#/leitor/decreto-43-2023')}
              className="bg-slate-900/80 hover:bg-slate-900 border border-emerald-500/25 hover:border-emerald-400 rounded-xl p-4 transition-all duration-200 backdrop-blur-sm cursor-pointer group shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    Regulamento IES
                  </span>
                  <Compass className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-teal-300 transition-colors">
                  Decreto n.º 43/2023
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  Art. 4 fixa os Domínios de Conhecimento CINE como critério obrigatório de criação de cursos.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-emerald-900/50 flex items-center justify-between text-xs font-semibold text-teal-400 group-hover:text-teal-300">
                <span>Consultar Artigo 4</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3: Manual CINE Brasil */}
            <div
              onClick={() => onNavigate('#/leitor/manual-cine')}
              className="bg-slate-900/80 hover:bg-slate-900 border border-emerald-500/25 hover:border-emerald-400 rounded-xl p-4 transition-all duration-200 backdrop-blur-sm cursor-pointer group shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Referencial Técnico
                  </span>
                  <BarChart3 className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                  Manual CINE Brasil
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  10 Áreas Gerais (00-10), Áreas Específicas e Detalhadas com critérios de carga horária.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-emerald-900/50 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300">
                <span>Explorar Áreas</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 4: Plano UniLicungo */}
            <div
              onClick={() => onNavigate('#/leitor/plano-socializacao')}
              className="bg-slate-900/80 hover:bg-slate-900 border border-emerald-500/25 hover:border-emerald-400 rounded-xl p-4 transition-all duration-200 backdrop-blur-sm cursor-pointer group shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    UniLicungo GAQ
                  </span>
                  <Building2 className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-blue-300 transition-colors">
                  Plano de Socialização
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  Auscultação das 10 Faculdades e Centros de Quelimane, Sofala e E-learning.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-emerald-900/50 flex items-center justify-between text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                <span>Ver Faculdades</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* METRICS & STATS BAR - ELEVATED WITH INTERACTIVE NAVIGATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            { label: 'Documentos Oficiais', val: portalStats.totalDocuments, icon: BookOpen, desc: '9 fontes auditadas', route: '#/biblioteca' },
            { label: 'Páginas Analisadas', val: portalStats.totalPages, icon: FileText, desc: '232 páginas lidas', route: '#/leitor/lei-1-2023' },
            { label: 'Artigos Normativos', val: portalStats.totalArticles, icon: Compass, desc: '3 leis principais', route: '#/explorador' },
            { label: 'Níveis do QNQ', val: portalStats.totalQnqLevels, icon: Layers, desc: 'Grelha nacional', route: '#/visualizacoes?tab=qnq' },
            { label: 'Domínios CINE', val: portalStats.totalCineGeneralAreas, icon: BarChart3, desc: 'Áreas 00 a 10', route: '#/leitor/manual-cine' },
            { label: 'Faculdades Abrangidas', val: portalStats.totalFacultiesUniLicungo, icon: Building2, desc: 'Quelimane & Sofala', route: '#/leitor/plano-socializacao' },
          ].map((st) => {
            const Icon = st.icon;
            return (
              <div 
                key={st.label} 
                onClick={() => onNavigate(st.route)}
                className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-md hover:shadow-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 dark:hover:border-emerald-500/50 transition-all duration-200 cursor-pointer flex items-center space-x-3 group"
              >
                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {st.val}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                    {st.label}
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 hidden sm:block">
                    {st.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* INSTITUTIONAL CAUTION ALERT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-xl p-4 sm:p-5 flex items-start space-x-4">
          <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 space-y-1">
            <h4 className="font-bold text-amber-950 dark:text-amber-100 flex items-center gap-2">
              <span>Nota Metodológica e Rigor Documental</span>
              <span className="text-[10px] bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 px-2 py-0.5 rounded-full font-semibold uppercase">
                Auditado
              </span>
            </h4>
            <p className="leading-relaxed">
              <strong>1. Manual CINE:</strong> O manual técnico disponibilizado pelo CNAQ constitui a versão brasileira elaborada pelo INEP/MEC (UNESCO ISCED-F). Em Moçambique, é adotado como <em>referência técnica comparativa</em> para o Artigo 4 do Decreto 43/2023, não constituindo norma legal formal de Moçambique.
            </p>
            <p className="leading-relaxed">
              <strong>2. Discrepância Cronológica:</strong> O Plano de Socialização do GAQ/UniLicungo indica no cabeçalho o ano de <em>2026</em> por lapso material evidente de digitação em modelo pré-formatado (ocorrido e aplicado em Outubro de 2024).
            </p>
          </div>
        </div>
      </section>

      {/* CORE MODULES PORTAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Arquitetura da Plataforma
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Módulos de Trabalho e Estudo
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            Selecione o módulo pretendido para consulta individual, leitura assistida, exploração legal ou visualização de matrizes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              id: 'modulo-b',
              route: '#/biblioteca',
              title: 'Módulo B: Biblioteca Documental',
              desc: 'Catálogo integral dos 9 documentos oficiais com filtros por jurisdição, tipologia e ano. Download de PDFs e acesso a transcrições de scans.',
              icon: Library,
              badge: '9 Documentos',
              color: 'emerald'
            },
            {
              id: 'modulo-c',
              route: '#/leitor/lei-1-2023',
              title: 'Módulo C: Leitor Documental Inteligente',
              desc: 'Ambiente de leitura profunda com índice retrátil, texto autêntico lado a lado com notas explicativas, visualizador de scans e gerador de citações.',
              icon: BookOpen,
              badge: 'Leitura Assistida',
              color: 'blue'
            },
            {
              id: 'modulo-d',
              route: '#/explorador',
              title: 'Módulo D: Explorador de Legislação',
              desc: 'Consulta por artigo dos 3 diplomas legais (Lei 1/2023, Decreto 43/2023 e Decreto 61/2022). Distinção visual entre texto oficial e resumo pedagógico.',
              icon: Compass,
              badge: '153 Artigos',
              color: 'indigo'
            },
            {
              id: 'modulo-e',
              route: '#/estudo',
              title: 'Módulo E: Centro de Estudo',
              desc: '6 módulos pedagógicos para capacitação docente, autoavaliação com feedback imediato, flashcards concetuais, glossário e erros a evitar.',
              icon: GraduationCap,
              badge: '6 Módulos + Quizzes',
              color: 'purple'
            },
            {
              id: 'modulo-f',
              route: '#/comparador',
              title: 'Módulo F: Comparador Documental',
              desc: 'Matrizes analíticas comparativas: Lei 1/2023 vs. Lei 27/2009, Decreto 43/2023 vs. Decreto 46/2018, e QNQ Moçambique vs. CINE Brasil.',
              icon: GitCompare,
              badge: 'Matrizes Analíticas',
              color: 'amber'
            },
            {
              id: 'modulo-vis',
              route: '#/visualizacoes',
              title: 'Visualizações Interativas',
              desc: 'Árvore de classificação CINE, pirâmide dos 10 níveis do QNQ, fluxogramas de enquadramento curricular e linha cronológica dos eventos.',
              icon: BarChart3,
              badge: 'Gráficos & Mapas',
              color: 'teal'
            }
          ].map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                onClick={() => onNavigate(mod.route)}
                className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 dark:hover:border-emerald-500/50 shadow-xs hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {mod.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors mb-2">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {mod.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-medium text-emerald-700 dark:text-emerald-400">
                  <span>Aceder ao Módulo</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED ESSENTIAL DOCUMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Colecção em Destaque
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Documentos Estruturantes
            </h2>
          </div>
          <button
            onClick={() => onNavigate('#/biblioteca')}
            className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center"
          >
            Ver todos os 9 documentos <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDocs.map((doc) => (
            <DocumentCard
              key={doc.id}
              doc={doc}
              onOpenReader={(id) => onNavigate(`#/leitor/${id}`)}
              onOpenCitation={onOpenCitation}
            />
          ))}
        </div>
      </section>

      {/* ACADEMIC STUDY MODULES PROMO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white rounded-2xl p-8 sm:p-12 shadow-xl border border-emerald-900/60 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Capacitação Curricular
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Centro de Estudo e Autoavaliação para Docentes
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Módulos didáticos interativos elaborados para diretores de faculdade, coordenadores de curso e docentes da UniLicungo dominarem as implicações práticas da Lei 1/2023, do Decreto 43/2023 e do QNQ.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('#/estudo')}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-xs shadow-md transition-colors flex items-center"
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                Iniciar Módulos de Estudo
              </button>
              <button
                onClick={() => onNavigate('#/comparador')}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg text-xs border border-slate-700 transition-colors flex items-center"
              >
                <GitCompare className="w-4 h-4 mr-2" />
                Explorar Mudanças Legais
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
