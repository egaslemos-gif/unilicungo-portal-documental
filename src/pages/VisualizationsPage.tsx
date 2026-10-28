import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Layers, 
  GitFork, 
  Clock, 
  MapPin, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  ChevronDown, 
  Building2,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { cineAreas, cineNotice, cineFlowchartSteps } from '../data/cine';
import { qnqLevels } from '../data/qnq';
import { timelineEvents } from '../data/timeline';
import { facultySessions, planoDiscrepancyNotice } from '../data/plano-unilicungo';
import { QnqLevel, CineArea } from '../types';

export const VisualizationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cine' | 'qnq' | 'fluxograma' | 'timeline' | 'faculdades'>('cine');

  // CINE State
  const [cineSearch, setCineSearch] = useState('');
  const [expandedGeneral, setExpandedGeneral] = useState<{ [code: string]: boolean }>({ '06': true, '01': true });

  // QNQ State
  const [selectedQnqLevel, setSelectedQnqLevel] = useState<number>(7);

  // Read URL query params if any
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('?')) {
      const params = new URLSearchParams(hash.split('?')[1]);
      const tab = params.get('tab');
      const level = params.get('level');
      const code = params.get('code');
      if (tab && ['cine', 'qnq', 'fluxograma', 'timeline', 'faculdades'].includes(tab)) {
        setActiveTab(tab as any);
      }
      if (level) setSelectedQnqLevel(Number(level));
      if (code) {
        setCineSearch(code);
        const parent = code.slice(0, 2);
        setExpandedGeneral(prev => ({ ...prev, [parent]: true }));
      }
    }
  }, []);

  const toggleGeneralArea = (code: string) => {
    setExpandedGeneral(prev => ({ ...prev, [code]: !prev[code] }));
  };

  const currentLevelData = qnqLevels.find(q => q.level === selectedQnqLevel) || qnqLevels[6];

  // Filtered CINE
  const generalAreas = cineAreas.filter(a => a.level === 'geral');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Infografias e Dados Interativos</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Visualizações Estruturais e Cronológicas
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Consulte a árvore interativa CINE, a pirâmide dos 10 níveis do QNQ, o fluxograma normativo de classificação de cursos, a linha do tempo dos diplomas legais e a distribuição geográfica das faculdades.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('cine')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'cine'
                ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Árvore CINE
          </button>
          <button
            onClick={() => setActiveTab('qnq')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'qnq'
                ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Pirâmide QNQ (10 Níveis)
          </button>
          <button
            onClick={() => setActiveTab('fluxograma')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'fluxograma'
                ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Fluxograma de Enquadramento
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'timeline'
                ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Linha Temporal (2009–2024)
          </button>
          <button
            onClick={() => setActiveTab('faculdades')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'faculdades'
                ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Faculdades da UniLicungo
          </button>
        </div>
      </div>

      {/* TAB 1: ÁRVORE CINE */}
      {activeTab === 'cine' && (
        <div className="space-y-6">
          {/* Brazilian origin disclaimer banner */}
          <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-900/60 flex items-start space-x-3 text-xs text-purple-900 dark:text-purple-200">
            <AlertTriangle className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <strong>Nota sobre Origem Técnica e Enquadramento Legal:</strong> {cineNotice.text}
            </div>
          </div>

          {/* Search inside CINE */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center space-x-3">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={cineSearch}
              onChange={(e) => setCineSearch(e.target.value)}
              placeholder="Pesquisar denominação de curso, código CINE ou área..."
              className="w-full text-xs bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
            {cineSearch && (
              <button onClick={() => setCineSearch('')} className="text-xs text-slate-400 hover:text-slate-600">
                Limpar
              </button>
            )}
          </div>

          {/* Interactive Tree View */}
          <div className="space-y-4">
            {generalAreas.map((gen) => {
              const specific = cineAreas.filter(a => a.level === 'especifica' && a.parentCode === gen.code);
              const isExpanded = expandedGeneral[gen.code] || Boolean(cineSearch.trim());

              // Filter check
              if (cineSearch.trim()) {
                const q = cineSearch.toLowerCase();
                const matchGen = gen.name.toLowerCase().includes(q) || gen.code.includes(q);
                const matchSpec = specific.some(s => s.name.toLowerCase().includes(q) || s.code.includes(q) || s.description.toLowerCase().includes(q));
                if (!matchGen && !matchSpec) return null;
              }

              return (
                <div
                  key={gen.code}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs"
                >
                  {/* General Area Header */}
                  <div
                    onClick={() => toggleGeneralArea(gen.code)}
                    className="p-4 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-8 h-8 rounded-lg bg-emerald-700 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0">
                        {gen.code}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          Área Geral {gen.code} — {gen.name}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                          {gen.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-slate-400">
                      <span className="text-[11px] font-mono hidden sm:inline">Pág. {gen.pageReference}</span>
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  </div>

                  {/* Expanded Specific Areas */}
                  {isExpanded && (
                    <div className="p-4 space-y-3 divide-y divide-slate-100 dark:divide-slate-800">
                      {specific.map((spec) => {
                        const detailed = cineAreas.filter(a => a.level === 'detalhada' && a.parentCode === spec.code);
                        return (
                          <div key={spec.code} className="pt-3 first:pt-0 space-y-2">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                  {spec.code}
                                </span>
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                                  {spec.name}
                                </h4>
                              </div>
                              <span className="text-[10px] text-slate-400">Pág. {spec.pageReference}</span>
                            </div>

                            <p className="text-xs text-slate-600 dark:text-slate-300 pl-8 leading-relaxed">
                              {spec.description}
                            </p>

                            {/* Detailed Areas if any */}
                            {detailed.length > 0 && (
                              <div className="pl-8 space-y-1.5 pt-1">
                                {detailed.map(det => (
                                  <div key={det.code} className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-800 flex items-start justify-between text-xs">
                                    <div>
                                      <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 mr-2">
                                        {det.code}
                                      </span>
                                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                                        {det.name}
                                      </span>
                                      <p className="text-[11px] text-slate-500 mt-0.5">{det.description}</p>
                                    </div>
                                    <span className="text-[10px] text-slate-400 shrink-0 ml-2">Pág. {det.pageReference}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: PIRÂMIDE QNQ */}
      {activeTab === 'qnq' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive 10 Levels Stack (Pyramid) */}
          <div className="lg:col-span-6 space-y-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2 px-1">
              Estrutura Vertical dos 10 Níveis do QNQ (Decreto n.º 61/2022):
            </span>

            {/* Reverse order to display from Level 10 at top to Level 1 at bottom */}
            {[...qnqLevels].reverse().map((ql) => {
              const isSelected = ql.level === selectedQnqLevel;
              const isSuperior = ql.subsystem === 'Ensino Superior';
              const isProfissional = ql.subsystem === 'Educação Profissional';

              let badgeColor = 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300';
              if (isSuperior) badgeColor = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
              if (isProfissional) badgeColor = 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';

              return (
                <div
                  key={ql.level}
                  onClick={() => setSelectedQnqLevel(ql.level)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 shadow-sm ring-1 ring-emerald-500'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-emerald-700 text-white'
                        : isSuperior
                        ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}>
                      {ql.level}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {ql.designation}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {ql.typicalQualifications}
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ml-2 ${badgeColor}`}>
                    {ql.subsystem}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right: Selected Level Full Descriptors */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6 sticky top-20">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  Detalhes do Nível {currentLevelData.level}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {currentLevelData.designation}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                {currentLevelData.subsystem}
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Qualificações Típicas:
                </span>
                <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                  {currentLevelData.typicalQualifications}
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  1. Descritor de Conhecimentos:
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-3 rounded border border-slate-200 dark:border-slate-800">
                  {currentLevelData.knowledge}
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  2. Descritor de Aptidões / Habilidades:
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-3 rounded border border-slate-200 dark:border-slate-800">
                  {currentLevelData.skills}
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  3. Descritor de Autonomia e Responsabilidade:
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-3 rounded border border-slate-200 dark:border-slate-800">
                  {currentLevelData.autonomyAndResponsibility}
                </p>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-100 dark:border-slate-800">
              Fonte Oficial: Decreto n.º 61/2022, Artigo 9 a 14 e Anexos II, III e IV.
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: FLUXOGRAMA DE ENQUADRAMENTO */}
      {activeTab === 'fluxograma' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Procedimento Normativo de Enquadramento e Classificação de Cursos
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              Roteiro processual oficial seguido pelas faculdades da Universidade Licungo e pelo Gabinete de Avaliação e Qualidade (GAQ) para enquadrar cursos de licenciatura segundo o Artigo 4 do Decreto 43/2023:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
              {cineFlowchartSteps.map((step, idx) => (
                <div
                  key={step.id}
                  className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3 relative flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center">
                        {step.stepNumber}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Passo {step.stepNumber} de 4
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {step.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-1 text-[11px]">
                    <div className="text-emerald-700 dark:text-emerald-400 font-semibold">
                      Regra / Decisão:
                    </div>
                    <div className="text-slate-600 dark:text-slate-300 leading-snug">
                      {step.conditionOrDecision}
                    </div>
                    <div className="text-slate-400 text-[10px] pt-1">
                      Responsável: {step.responsible}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: LINHA TEMPORAL */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Linha Temporal dos Instrumentos Legais e Técnicos (2009–2024)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Cronologia exata de promulgação, eventos e ocorrências documentais com indicação explícita de gralhas materiais.
              </p>
            </div>

            <div className="relative border-l-2 border-emerald-600 ml-4 pl-6 space-y-8">
              {timelineEvents.map((evt) => (
                <div key={evt.id} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-4 border-emerald-600" />
                  
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        {evt.dateString}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {evt.dateType}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {evt.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {evt.description}
                    </p>

                    <div className="text-[11px] text-slate-400 font-mono pt-1">
                      Entidade: {evt.entity} • Procedência: {evt.provenance}
                    </div>

                    {evt.discrepancyNote && (
                      <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-950/40 rounded border border-amber-200 dark:border-amber-900/50 text-[11px] text-amber-800 dark:text-amber-200">
                        <strong>Alerta Documental:</strong> {evt.discrepancyNote}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: FACULDADES DA UNILICUNGO */}
      {activeTab === 'faculdades' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Distribuição Geográfica e Enquadramento das 10 Faculdades
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Todas as faculdades da Universidade Licungo abrangidas pelo plano institucional de classificação de cursos:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {facultySessions.map((fac, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {fac.city}
                    </span>
                    <span className="text-xs text-slate-400">{fac.schedule}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {fac.faculty}
                  </h4>

                  <div className="space-y-1 text-xs">
                    <span className="font-semibold text-slate-500">Actividades Realizadas:</span>
                    <p className="text-slate-600 dark:text-slate-300 leading-snug">{fac.activities}</p>
                  </div>

                  {fac.targetCourses && fac.targetCourses.length > 0 && (
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-xs">
                      <span className="font-semibold text-slate-500">Cursos de Amostra:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {fac.targetCourses.map((c, ci) => (
                          <span key={ci} className="text-[10px] px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
