import { ReaderBookmark } from '../types';

const BOOKMARKS_KEY = 'unilicungo_bookmarks_v1';
const QUIZ_KEY = 'unilicungo_quiz_scores_v1';
const THEME_KEY = 'unilicungo_theme_v1';

export function getBookmarks(): ReaderBookmark[] {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveBookmark(bookmark: Omit<ReaderBookmark, 'id' | 'dateAdded'>): ReaderBookmark {
  const list = getBookmarks();
  const newBm: ReaderBookmark = {
    ...bookmark,
    id: `bm-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    dateAdded: new Date().toLocaleDateString('pt-PT')
  };
  list.unshift(newBm);
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(list));
  return newBm;
}

export function removeBookmark(id: string): void {
  const list = getBookmarks().filter(b => b.id !== id);
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(list));
}

export function isBookmarked(docId: string, articleId?: string): boolean {
  return getBookmarks().some(b => b.docId === docId && (!articleId || b.articleId === articleId));
}

export function getStoredQuizScore(moduleId: string): number | null {
  try {
    const raw = localStorage.getItem(QUIZ_KEY);
    const scores = raw ? JSON.parse(raw) : {};
    return scores[moduleId] ?? null;
  } catch {
    return null;
  }
}

export function saveQuizScore(moduleId: string, scorePercentage: number): void {
  try {
    const raw = localStorage.getItem(QUIZ_KEY);
    const scores = raw ? JSON.parse(raw) : {};
    scores[moduleId] = scorePercentage;
    localStorage.setItem(QUIZ_KEY, JSON.stringify(scores));
  } catch {}
}

export function getStoredTheme(): 'light' | 'dark' {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function setStoredTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch {}
}
