import React, { useState, useMemo } from 'react';
import { 
  Library, 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  FileText, 
  Download, 
  Eye, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { documentsCatalog } from '../data/documents';
import { DocumentCard } from '../components/DocumentCard';
import { DocumentItem, DocumentType, Jurisdiction } from '../types';

interface LibraryPageProps {
  onNavigate: (route: string) => void;
  onOpenCitation: (doc: DocumentItem) => void;
}

export const LibraryPage: React.FC<LibraryPageProps> = ({ onNavigate, onOpenCitation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('todos');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('todas');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredDocs = useMemo(() => {
    return documentsCatalog.filter((doc) => {
      // Type filter
      if (selectedType !== 'todos' && doc.type !== selectedType) return false;
      
      // Jurisdiction filter
      if (selectedJurisdiction !== 'todas') {
        if (selectedJurisdiction === 'nacional' && !doc.jurisdiction.includes('Nacional')) return false;
        if (selectedJurisdiction === 'institucional' && !doc.jurisdiction.includes('UniLicungo')) return false;
        if (selectedJurisdiction === 'comparada' && !doc.jurisdiction.includes('Brasil')) return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchTitle = doc.title.toLowerCase().includes(q) || doc.shortTitle.toLowerCase().includes(q);
        const matchSummary = doc.summary.toLowerCase().includes(q);
        const matchThemes = doc.mainThemes.some(t => t.toLowerCase().includes(q));
        const matchIssuer = doc.issuer.toLowerCase().includes(q);
        if (!matchTitle && !matchSummary && !matchThemes && !matchIssuer) return false;
      }

      return true;
    });
  }, [selectedType, selectedJurisdiction, searchTerm]);

  const documentTypes: Array<{ label: string; value: string }> = [
    { label: 'Todos os Tipos', value: 'todos' },
    { label: 'Leis', value: 'Lei' },
    { label: 'Decretos', value: 'Decreto' },
    { label: 'Manuais Técnicos', value: 'Manual Técnico' },
    { label: 'Planos Institucionais', value: 'Plano Institucional' },
    { label: 'Comunicações Oficiais', value: 'Comunicação Oficial' },
    { label: 'Padrões Curriculares', value: 'Padrão Curricular' },
    { label: 'Programas de Eventos', value: 'Programa de Evento' },
    { label: 'Documentos de Apoio', value: 'Documento de Apoio' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Title & Intro */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Library className="w-4 h-4" />
            <span>Módulo B</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Biblioteca Documental Completa
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Consulte o acervo oficial constituído por 9 documentos essenciais: legislação nacional, diretrizes curriculares, manuais de domínios, planos institucionais da UniLicungo e padrões de qualificação.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-2 self-start md:self-auto bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="Vista em Grelha"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === 'list'
                ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="Vista em Lista / Tabela"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* Search Field */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filtrar por título, palavras-chave ou entidade..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            >
              {documentTypes.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Jurisdiction Filter */}
          <div>
            <select
              value={selectedJurisdiction}
              onChange={(e) => setSelectedJurisdiction(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="todas">Todas as Jurisdições</option>
              <option value="nacional">Moçambique (Nacional)</option>
              <option value="institucional">UniLicungo (Institucional)</option>
              <option value="comparada">Brasil (Referência Comparada)</option>
            </select>
          </div>
        </div>

        {/* Counter and Active Filters info */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
          <span>A apresentar <strong>{filteredDocs.length}</strong> de {documentsCatalog.length} documentos</span>
          {(selectedType !== 'todos' || selectedJurisdiction !== 'todas' || searchTerm) && (
            <button
              onClick={() => {
                setSelectedType('todos');
                setSelectedJurisdiction('todas');
                setSearchTerm('');
              }}
              className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              Limpar Filtros
            </button>
          )}
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <DocumentCard
              key={doc.id}
              doc={doc}
              onOpenReader={(id) => onNavigate(`#/leitor/${id}`)}
              onOpenCitation={onOpenCitation}
            />
          ))}
        </div>
      )}

      {/* List / Table View */}
      {viewMode === 'list' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Documento / Título</th>
                  <th className="py-3 px-4">Tipo</th>
                  <th className="py-3 px-4">Emissor</th>
                  <th className="py-3 px-4">Ano / Data</th>
                  <th className="py-3 px-4">Jurisdição</th>
                  <th className="py-3 px-4 text-center">Págs</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredDocs.map((doc) => (
                  <tr 
                    key={doc.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-white">
                      <div 
                        onClick={() => onNavigate(`#/leitor/${doc.id}`)}
                        className="cursor-pointer hover:text-emerald-700 dark:hover:text-emerald-400"
                      >
                        {doc.shortTitle}
                      </div>
                      <div className="text-[11px] text-slate-400 font-normal truncate max-w-md">
                        {doc.originalFilename}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-medium">
                        {doc.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                      {doc.issuer}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {doc.date || doc.year}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
                        {doc.jurisdiction.split('(')[0].trim()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center text-slate-500">
                      {doc.pageCount}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => onOpenCitation(doc)}
                          className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                          title="Citar"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={doc.pdfUrl}
                          download={doc.originalFilename}
                          className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                          title="Baixar PDF"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => onNavigate(`#/leitor/${doc.id}`)}
                          className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-medium"
                        >
                          Abrir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredDocs.length === 0 && (
        <div className="py-16 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <Library className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300">
            Nenhum documento encontrado com os critérios selecionados
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Tente remover os filtros ou pesquisar por outro termo.
          </p>
        </div>
      )}

    </div>
  );
};
