import { GlobalSearchResult } from '../types';
import { documentsCatalog } from '../data/documents';
import { allLawArticles } from '../data/laws';
import { cineAreas } from '../data/cine';
import { qnqLevels } from '../data/qnq';
import { glossaryItems } from '../data/glossary';
import { facultySessions, planoStages } from '../data/plano-unilicungo';
import { qualificacaoCC } from '../data/qualificacao-cc';

export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function searchAll(query: string): GlobalSearchResult[] {
  const q = normalizeText(query.trim());
  if (!q || q.length < 2) return [];

  const results: GlobalSearchResult[] = [];

  // 1. Search in Documents Catalog
  for (const doc of documentsCatalog) {
    const titleNorm = normalizeText(doc.title);
    const summaryNorm = normalizeText(doc.summary);
    const themesNorm = normalizeText(doc.mainThemes.join(' '));

    if (titleNorm.includes(q)) {
      results.push({
        id: `doc-${doc.id}`,
        title: doc.shortTitle,
        category: 'Documento',
        docId: doc.id,
        docTitle: doc.title,
        snippet: doc.summary.slice(0, 160) + '...',
        matchedField: 'Título do Documento',
        url: `#/leitor/${doc.id}`
      });
    } else if (summaryNorm.includes(q) || themesNorm.includes(q)) {
      results.push({
        id: `doc-sum-${doc.id}`,
        title: doc.shortTitle,
        category: 'Documento',
        docId: doc.id,
        docTitle: doc.title,
        snippet: doc.summary.slice(0, 160) + '...',
        matchedField: 'Resumo / Temas',
        url: `#/leitor/${doc.id}`
      });
    }
  }

  // 2. Search in Law Articles
  for (const art of allLawArticles) {
    const titleNorm = normalizeText(art.title);
    const textNorm = normalizeText(art.officialText);
    const sumNorm = normalizeText(art.summary);
    const expNorm = normalizeText(art.explanation);
    const numStr = String(art.number);

    if (numStr === q || titleNorm.includes(q)) {
      results.push({
        id: art.id,
        title: `Artigo ${art.number} — ${art.title} (${art.docTitle.split('—')[0].trim()})`,
        category: 'Artigo',
        docId: art.docId,
        docTitle: art.docTitle,
        page: art.pageNumber,
        snippet: art.officialText.slice(0, 170) + '...',
        matchedField: 'Título / Número do Artigo',
        url: `#/explorador?doc=${art.docId}&art=${art.id}`
      });
    } else if (textNorm.includes(q) || sumNorm.includes(q) || expNorm.includes(q)) {
      // Find position of query for smart snippet
      const pos = textNorm.indexOf(q);
      const start = Math.max(0, pos - 40);
      const end = Math.min(art.officialText.length, pos + 120);
      const excerpt = (start > 0 ? '...' : '') + art.officialText.slice(start, end) + (end < art.officialText.length ? '...' : '');

      results.push({
        id: art.id,
        title: `Artigo ${art.number} — ${art.title} (${art.docTitle.split('—')[0].trim()})`,
        category: 'Artigo',
        docId: art.docId,
        docTitle: art.docTitle,
        page: art.pageNumber,
        snippet: excerpt,
        matchedField: 'Texto Oficial ou Análise',
        url: `#/explorador?doc=${art.docId}&art=${art.id}`
      });
    }
  }

  // 3. Search in CINE Areas
  for (const c of cineAreas) {
    const codeNorm = normalizeText(c.code);
    const nameNorm = normalizeText(c.name);
    const descNorm = normalizeText(c.description);

    if (codeNorm.includes(q) || nameNorm.includes(q) || descNorm.includes(q)) {
      results.push({
        id: `cine-${c.code}`,
        title: `CINE ${c.code} — ${c.name} (${c.level.toUpperCase()})`,
        category: 'Área CINE',
        docId: 'manual-cine',
        page: c.pageReference,
        snippet: c.description.slice(0, 160) + '...',
        matchedField: 'Código / Denominação CINE',
        url: `#/visualizacoes?tab=cine&code=${c.code}`
      });
    }
  }

  // 4. Search in QNQ Levels
  for (const ql of qnqLevels) {
    const desNorm = normalizeText(ql.designation);
    const knNorm = normalizeText(ql.knowledge);
    const skNorm = normalizeText(ql.skills);

    if (desNorm.includes(q) || knNorm.includes(q) || skNorm.includes(q)) {
      results.push({
        id: `qnq-${ql.level}`,
        title: `QNQ Nível ${ql.level} — ${ql.typicalQualifications}`,
        category: 'Conceito / Glossário',
        docId: 'decreto-61-2022',
        snippet: `${ql.knowledge.slice(0, 140)}...`,
        matchedField: 'Descritor QNQ',
        url: `#/visualizacoes?tab=qnq&level=${ql.level}`
      });
    }
  }

  // 5. Search in Glossary
  for (const g of glossaryItems) {
    const termNorm = normalizeText(g.term);
    const defNorm = normalizeText(g.definition);

    if (termNorm.includes(q) || defNorm.includes(q)) {
      results.push({
        id: `gloss-${normalizeText(g.term).replace(/\s+/g, '-')}`,
        title: `${g.term} (${g.category})`,
        category: 'Conceito / Glossário',
        snippet: g.definition.slice(0, 160) + '...',
        matchedField: 'Glossário Normativo',
        url: `#/estudo?term=${encodeURIComponent(g.term)}`
      });
    }
  }

  // 6. Search in UniLicungo Plan & Faculties
  for (const fac of facultySessions) {
    const fNorm = normalizeText(fac.faculty);
    const actNorm = normalizeText(fac.activities);
    const coursesNorm = normalizeText((fac.targetCourses || []).join(' '));

    if (fNorm.includes(q) || actNorm.includes(q) || coursesNorm.includes(q)) {
      results.push({
        id: `fac-${normalizeText(fac.faculty).slice(0, 15)}`,
        title: `${fac.faculty} (${fac.city})`,
        category: 'Plano UniLicungo',
        docId: 'plano-socializacao',
        snippet: `Sessão: ${fac.date} às ${fac.schedule}. ${fac.activities.slice(0, 120)}...`,
        matchedField: 'Sessão de Socialização da Faculdade',
        url: `#/leitor/plano-socializacao`
      });
    }
  }

  // 7. Search in Computer Science Qualification
  for (const ramo of qualificacaoCC.ramos) {
    const rNorm = normalizeText(ramo.name);
    const dNorm = normalizeText(ramo.description);

    if (rNorm.includes(q) || dNorm.includes(q)) {
      results.push({
        id: `ramo-${ramo.number}`,
        title: `CC Ramo ${ramo.number}: ${ramo.name}`,
        category: 'Qualificação',
        docId: 'qualificacao-cc',
        snippet: ramo.description.slice(0, 160) + '...',
        matchedField: 'Ramo de Especialização de Ciência da Computação',
        url: `#/leitor/qualificacao-cc`
      });
    }
  }

  for (const disc of qualificacaoCC.nuclearDisciplines) {
    if (normalizeText(disc).includes(q)) {
      results.push({
        id: `disc-${normalizeText(disc).slice(0, 15)}`,
        title: `Disciplina Nuclear CC: ${disc}`,
        category: 'Qualificação',
        docId: 'qualificacao-cc',
        snippet: `Unidade curricular nuclear obrigatória comum aos 9 ramos da Licenciatura em Ciência da Computação (Nível 7 QNQ).`,
        matchedField: 'Unidade Curricular Nuclear',
        url: `#/leitor/qualificacao-cc`
      });
    }
  }

  // Limit to top 30 most relevant results
  return results.slice(0, 30);
}
