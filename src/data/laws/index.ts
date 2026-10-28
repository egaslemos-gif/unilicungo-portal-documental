import { LawArticle } from '../../types';
import { lei12023Articles } from './lei-1-2023';
import { decreto432023Articles } from './decreto-43-2023';
import { decreto612022Articles } from './decreto-61-2022';

export { lei12023Articles } from './lei-1-2023';
export { decreto432023Articles } from './decreto-43-2023';
export { decreto612022Articles } from './decreto-61-2022';

export const allLawArticles: LawArticle[] = [
  ...lei12023Articles,
  ...decreto432023Articles,
  ...decreto612022Articles
];

export function getArticlesByDocId(docId: string): LawArticle[] {
  return allLawArticles.filter(art => art.docId === docId);
}

export function getArticleById(id: string): LawArticle | undefined {
  return allLawArticles.find(art => art.id === id);
}
