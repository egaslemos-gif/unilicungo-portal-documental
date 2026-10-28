import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Library, 
  Compass, 
  GraduationCap, 
  GitCompare, 
  BarChart3, 
  Moon, 
  Sun, 
  Menu, 
  X,
  FileText,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { getStoredTheme, setStoredTheme } from '../utils/storage';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, onOpenSearch }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(getStoredTheme());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setStoredTheme(theme);
  }, [theme]);

  // Close mobile drawer on escape or route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentRoute]);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
  };

  const navItems = [
    { id: '#/', label: 'Início', shortLabel: 'Início', icon: BookOpen, desc: 'Visão geral e atalhos rápidos' },
    { id: '#/biblioteca', label: 'Biblioteca', shortLabel: 'Biblioteca', icon: Library, desc: 'Catálogo dos 9 documentos oficiais' },
    { id: '#/explorador', label: 'Explorador Legal', shortLabel: 'Explorador', icon: Compass, desc: 'Consulta de artigos legislativos' },
    { id: '#/estudo', label: 'Centro de Estudo', shortLabel: 'Estudo', icon: GraduationCap, desc: 'Módulos pedagógicos e quizzes' },
    { id: '#/comparador', label: 'Comparador', shortLabel: 'Comparador', icon: GitCompare, desc: 'Matrizes normativas comparativas' },
    { id: '#/visualizacoes', label: 'Visualizações', shortLabel: 'Visualizações', icon: BarChart3, desc: 'Árvore CINE e Níveis QNQ' },
  ];

  const isActive = (routeId: string) => {
    if (routeId === '#/' && (currentRoute === '' || currentRoute === '#/' || currentRoute === '#')) return true;
    return currentRoute.startsWith(routeId);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* Logo & Identity (No overlap: shrink-0 with adaptive text) */}
          <div 
            className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer shrink-0 select-none" 
            onClick={() => onNavigate('#/')}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-700 to-teal-800 dark:from-emerald-600 dark:to-teal-700 flex items-center justify-center text-white font-extrabold shadow-md shadow-emerald-950/20 shrink-0">
              <span className="text-lg sm:text-xl tracking-tight">UL</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base tracking-tight leading-none whitespace-nowrap">
                  Universidade Licungo
                </span>
                <span className="hidden xl:inline-block text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-800 shrink-0">
                  CNAQ / GAQ
                </span>
              </div>
              <p className="hidden sm:block text-[11px] text-slate-500 dark:text-slate-400 leading-tight truncate">
                Portal de Consulta e Estudo Documental
              </p>
            </div>
          </div>

          {/* Desktop Navigation (Appears on lg: 1024px+ with comfortable spacing, never overlapping) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 shrink min-w-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-1.5 px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold whitespace-nowrap transition-all duration-150 ${
                    active
                      ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 shadow-2xs border border-emerald-200 dark:border-emerald-800/60'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'}`} />
                  <span className="hidden xl:inline">{item.label}</span>
                  <span className="inline xl:hidden">{item.shortLabel}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            
            {/* Quick Search Button (Adaptive: icon on < xl, expanded on xl+) */}
            <button
              onClick={onOpenSearch}
              className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
              title="Pesquisa Instantânea (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="hidden xl:inline">Pesquisar...</span>
              <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Dark/Light mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={theme === 'light' ? 'Activar Modo Escuro' : 'Activar Modo Claro'}
              aria-label="Alternar Tema"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Mobile / Tablet Hamburger (Visible on all screens below lg: 1024px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Menu Principal"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-600" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-900/98 backdrop-blur-lg px-4 pt-3 pb-5 space-y-3 shadow-xl">
          
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Navegação do Repositório
            </span>
            <span className="text-[10px] text-slate-400">UniLicungo • GAQ / CNAQ</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                    active
                      ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 font-bold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${active ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold">{item.label}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">{item.desc}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </button>
              );
            })}
          </div>

          {/* Direct fast links inside mobile drawer */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-2 text-[11px]">
            <span className="text-slate-400 font-medium">Atalhos:</span>
            <button 
              onClick={() => { onNavigate('#/leitor/lei-1-2023'); setMobileMenuOpen(false); }}
              className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline"
            >
              Lei 1/2023
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button 
              onClick={() => { onNavigate('#/leitor/decreto-43-2023'); setMobileMenuOpen(false); }}
              className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline"
            >
              Decreto 43/2023
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button 
              onClick={() => { onNavigate('#/leitor/manual-cine'); setMobileMenuOpen(false); }}
              className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline"
            >
              Manual CINE
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button 
              onClick={() => { onNavigate('#/leitor/ies-zambezia'); setMobileMenuOpen(false); }}
              className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline"
            >
              IES Zambézia
            </button>
          </div>

        </div>
      )}
    </header>
  );
};
