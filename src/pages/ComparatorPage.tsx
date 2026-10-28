import React, { useState } from 'react';
import { 
  GitCompare, 
  ArrowRight, 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Layers,
  HelpCircle
} from 'lucide-react';
import { documentComparisons } from '../data/comparisons';
import { DocumentComparison } from '../types';

export const ComparatorPage: React.FC = () => {
  const [selectedComparisonId, setSelectedComparisonId] = useState<string>(documentComparisons[0].id);

  const activeComparison = documentComparisons.find(c => c.id === selectedComparisonId) || documentComparisons[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
          <GitCompare className="w-4 h-4" />
          <span>Módulo F</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Comparador Documental e Matrizes Analíticas
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Compare lado a lado diplomas revogados e vigentes, bem como instrumentos nacionais e referenciais técnicos internacionais, com citações literais, análise de diferenças e avisos de cautela jurídica.
        </p>
      </div>

      {/* Comparison Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {documentComparisons.map((comp) => {
          const isSelected = comp.id === selectedComparisonId;
          return (
            <div
              key={comp.id}
              onClick={() => setSelectedComparisonId(comp.id)}
              className={`p-5 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {comp.category}
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2 mb-1">
                {comp.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {comp.comparisonPoints.length} pontos de análise comparada
              </p>
            </div>
          );
        })}
      </div>

      {/* Active Comparison Matrix Details */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden space-y-6 p-6">
        
        {/* Title & Involved Docs */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4 space-y-2">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            {activeComparison.title}
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400">Documentos em confronto:</span>
            {activeComparison.documentsInvolved.map((d, i) => (
              <span key={i} className="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {d.docTitle} ({d.jurisdiction.split('(')[0].trim()})
              </span>
            ))}
          </div>
        </div>

        {/* Comparison Points List */}
        <div className="space-y-8">
          {activeComparison.comparisonPoints.map((pt, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4"
            >
              {/* Aspect Title */}
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded bg-emerald-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {pt.aspect}
                </h3>
              </div>

              {/* Side-by-side excerpts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pt.docPositions.map((pos, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {pos.docId.includes('lei-1') || pos.docId.includes('decreto-43') || pos.docId.includes('decreto-61')
                          ? 'Diploma Vigente'
                          : 'Norma Anterior / Referência'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {pos.position}
                      </span>
                    </div>
                    <blockquote className="text-xs sm:text-sm font-serif italic text-slate-700 dark:text-slate-300 leading-relaxed border-l-2 border-emerald-600 pl-3">
                      &quot;{pos.excerpt}&quot;
                    </blockquote>
                    <div className="text-[10px] text-slate-400 font-mono pt-1">
                      Procedência: {pos.provenance}
                    </div>
                  </div>
                ))}
              </div>

              {/* Comparative Analysis */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Análise Comparativa & Inovações:
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  {pt.analysis}
                </p>
                <div className="text-xs text-emerald-800 dark:text-emerald-400 font-medium">
                  {pt.differencesOrEquivalences}
                </div>
              </div>

              {/* Caution note */}
              {pt.cautionNote && (
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-900/50 flex items-start space-x-2 text-xs text-amber-900 dark:text-amber-200">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Aviso de Conformidade:</strong> {pt.cautionNote}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
