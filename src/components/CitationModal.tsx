import React, { useState } from 'react';
import { X, Copy, Check, BookMarked } from 'lucide-react';
import { DocumentItem, LawArticle } from '../types';

interface CitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  document?: DocumentItem;
  article?: LawArticle;
}

export const CitationModal: React.FC<CitationModalProps> = ({ isOpen, onClose, document, article }) => {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  if (!isOpen || (!document && !article)) return null;

  const docTitle = document ? document.title : article?.docTitle || '';
  const year = document ? document.year : 2023;
  const currentUrl = window.location.href;

  const citations = [
    {
      format: 'ABNT / Padrão Universitário',
      text: article
        ? `MOÇAMBIQUE. ${article.docTitle}. Artigo ${article.number} (${article.title}). Boletim da República, Maputo, ${year}. Disponível em: <${currentUrl}>. Acesso em: ${new Date().toLocaleDateString('pt-PT')}.`
        : `MOÇAMBIQUE. ${docTitle}. Boletim da República / Publicação Oficial, Maputo, ${year}. Disponível em: <${currentUrl}>. Acesso em: ${new Date().toLocaleDateString('pt-PT')}.`
    },
    {
      format: 'APA (7ª Edição)',
      text: article
        ? `República de Moçambique. (${year}). Artigo ${article.number} [${article.title}]. In ${article.docTitle}. ${currentUrl}`
        : `República de Moçambique. (${year}). ${docTitle}. ${currentUrl}`
    },
    {
      format: 'ISO 690 (Referência Jurídica)',
      text: article
        ? `MOÇAMBIQUE. ${article.docTitle}, Artigo ${article.number}. Maputo, ${year}. [Consult. ${new Date().toLocaleDateString('pt-PT')}]. Disponível na Internet: ${currentUrl}`
        : `MOÇAMBIQUE. ${docTitle}. Maputo, ${year}. [Consult. ${new Date().toLocaleDateString('pt-PT')}]. Disponível na Internet: ${currentUrl}`
    }
  ];

  const handleCopy = (format: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <BookMarked className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              Citar Fonte Documental
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Copie a referência bibliográfica formal formatada segundo os principais referenciais académicos:
          </p>

          {citations.map((c) => (
            <div key={c.format} className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  {c.format}
                </span>
                <button
                  onClick={() => handleCopy(c.format, c.text)}
                  className="flex items-center space-x-1 text-xs text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 font-medium px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 transition-colors"
                >
                  {copiedFormat === c.format ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-800 select-all leading-relaxed">
                {c.text}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/60 px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
