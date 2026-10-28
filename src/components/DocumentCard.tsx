import React from 'react';
import { BookOpen, FileText, Download, Eye, ExternalLink, Calendar, MapPin, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
import { DocumentItem } from '../types';

interface DocumentCardProps {
  doc: DocumentItem;
  onOpenReader: (docId: string) => void;
  onOpenCitation: (doc: DocumentItem) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ doc, onOpenReader, onOpenCitation }) => {
  const getJurisdictionBadge = (j: string) => {
    if (j.includes('Nacional')) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
          <MapPin className="w-3 h-3 mr-1" />
          Moçambique (Nacional)
        </span>
      );
    }
    if (j.includes('UniLicungo')) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          UniLicungo (Institucional)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
        <AlertTriangle className="w-3 h-3 mr-1" />
        Brasil (Referência Comparada)
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    if (status.includes('Verificado')) {
      return (
        <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Fonte Oficial BR
        </span>
      );
    }
    if (status.includes('Limitações')) {
      return (
        <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400 flex items-center">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Transcrição de Scan
        </span>
      );
    }
    return (
      <span className="text-[11px] font-medium text-purple-600 dark:text-purple-400 flex items-center">
        <Layers className="w-3 h-3 mr-1" />
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group">
      
      {/* Top Header Card */}
      <div className="p-5 pb-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          {getJurisdictionBadge(doc.jurisdiction)}
          <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center shrink-0">
            <Calendar className="w-3 h-3 mr-1" />
            {doc.date || doc.year}
          </span>
        </div>

        <h3 
          onClick={() => onOpenReader(doc.id)}
          className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 cursor-pointer line-clamp-2 transition-colors mb-2"
        >
          {doc.shortTitle}
        </h3>

        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-3">
          {doc.summary}
        </p>

        {/* Themes tags */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {doc.mainThemes.slice(0, 3).map((theme) => (
            <span
              key={theme}
              className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            >
              {theme}
            </span>
          ))}
          {doc.mainThemes.length > 3 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
              +{doc.mainThemes.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-5 py-3 bg-slate-50/70 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          {getStatusBadge(doc.verificationStatus)}
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="text-[11px] text-slate-500">{doc.pageCount} págs</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onOpenCitation(doc)}
            className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 p-1.5 rounded hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
            title="Citar este documento"
          >
            <FileText className="w-3.5 h-3.5" />
          </button>

          <a
            href={doc.pdfUrl}
            download={doc.originalFilename}
            className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 p-1.5 rounded hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
            title="Baixar PDF original"
          >
            <Download className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => onOpenReader(doc.id)}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-medium text-xs shadow-xs transition-colors"
          >
            <Eye className="w-3.5 h-3.5 mr-1" />
            <span>Consultar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
