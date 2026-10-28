import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { CitationModal } from './components/CitationModal';
import { HomePage } from './pages/HomePage';
import { LibraryPage } from './pages/LibraryPage';
import { ReaderPage } from './pages/ReaderPage';
import { ExplorerPage } from './pages/ExplorerPage';
import { StudyPage } from './pages/StudyPage';
import { ComparatorPage } from './pages/ComparatorPage';
import { VisualizationsPage } from './pages/VisualizationsPage';
import { DocumentItem, LawArticle } from './types';

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>(window.location.hash || '#/');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState<string>('');
  const [citationTarget, setCitationTarget] = useState<{ doc?: DocumentItem; art?: LawArticle } | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Global keyboard shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        handleOpenSearch('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (route: string) => {
    window.location.hash = route;
  };

  const handleOpenSearch = (initialQuery = '') => {
    setSearchInitialQuery(initialQuery);
    setIsSearchOpen(true);
  };

  const handleOpenCitation = (doc: DocumentItem, article?: LawArticle) => {
    setCitationTarget({ doc, art: article });
  };

  const renderCurrentPage = () => {
    const hash = currentRoute.split('?')[0];

    if (hash === '' || hash === '#/' || hash === '#') {
      return (
        <HomePage
          onNavigate={handleNavigate}
          onOpenSearch={(q) => handleOpenSearch(q || '')}
          onOpenCitation={(doc) => handleOpenCitation(doc)}
        />
      );
    }

    if (hash === '#/biblioteca') {
      return (
        <LibraryPage
          onNavigate={handleNavigate}
          onOpenCitation={(doc) => handleOpenCitation(doc)}
        />
      );
    }

    if (hash.startsWith('#/leitor')) {
      const parts = hash.split('/');
      const docId = parts[2] || 'lei-1-2023';
      return (
        <ReaderPage
          initialDocId={docId}
          onNavigate={handleNavigate}
          onOpenCitation={(doc, art) => handleOpenCitation(doc, art)}
        />
      );
    }

    if (hash.startsWith('#/explorador')) {
      return (
        <ExplorerPage
          onNavigate={handleNavigate}
          onOpenCitation={(doc, art) => handleOpenCitation(doc, art)}
        />
      );
    }

    if (hash.startsWith('#/estudo')) {
      return <StudyPage onNavigate={handleNavigate} />;
    }

    if (hash.startsWith('#/comparador')) {
      return <ComparatorPage />;
    }

    if (hash.startsWith('#/visualizacoes')) {
      return <VisualizationsPage />;
    }

    // Resilience: if an anchor hash like #/cine-06 or #cine-06 was navigated to, open the CINE reader
    if (hash.startsWith('#/cine') || hash.startsWith('#cine')) {
      return (
        <ReaderPage
          initialDocId="manual-cine"
          onNavigate={handleNavigate}
          onOpenCitation={(doc, art) => handleOpenCitation(doc, art)}
        />
      );
    }

    if (hash.startsWith('#/art') || hash.startsWith('#art')) {
      return (
        <ExplorerPage
          onNavigate={handleNavigate}
          onOpenCitation={(doc, art) => handleOpenCitation(doc, art)}
        />
      );
    }

    // Default Fallback
    return (
      <HomePage
        onNavigate={handleNavigate}
        onOpenSearch={(q) => handleOpenSearch(q || '')}
        onOpenCitation={(doc) => handleOpenCitation(doc)}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenSearch={() => handleOpenSearch('')}
      />

      <div className="flex-1">
        {renderCurrentPage()}
      </div>

      <Footer />

      {/* Global Spotlight Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        initialQuery={searchInitialQuery}
        onClose={() => {
          setIsSearchOpen(false);
          setSearchInitialQuery('');
        }}
        onSelectResult={(url) => handleNavigate(url)}
      />

      {/* Citation Modal */}
      <CitationModal
        isOpen={Boolean(citationTarget)}
        onClose={() => setCitationTarget(null)}
        document={citationTarget?.doc}
        article={citationTarget?.art}
      />
    </div>
  );
};
