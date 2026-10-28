export type DocumentType = 
  | 'Lei'
  | 'Decreto'
  | 'Manual Técnico'
  | 'Plano Institucional'
  | 'Comunicação Oficial'
  | 'Padrão Curricular'
  | 'Programa de Evento'
  | 'Documento de Apoio';

export type Jurisdiction = 
  | 'Moçambique (Nacional)'
  | 'Moçambique (Institucional UniLicungo)'
  | 'Moçambique (Nacional e Institucional)'
  | 'Moçambique (Nacional / Centro Quelimane)'
  | 'Moçambique (Provincial Zambézia)'
  | 'Brasil (Referência Comparativa / INEP-MEC)';

export type VerificationStatus = 
  | 'Verificado com Fonte Oficial'
  | 'Transcrição Conferida com Limitações'
  | 'Documento Institucional Interno'
  | 'Referência Técnica Comparada';

export interface DocumentItem {
  id: string;
  title: string;
  shortTitle: string;
  originalFilename: string;
  type: DocumentType;
  issuer: string;
  jurisdiction: Jurisdiction;
  numberAndDate: string;
  year: number;
  date: string;
  pageCount: number;
  summary: string;
  objective: string;
  mainThemes: string[];
  verificationStatus: VerificationStatus;
  pdfUrl: string;
  hasSearchableText: boolean;
  hasOcr: boolean;
  extractionNotes: string;
  keyArticlesOrSections?: string[];
  crossReferences: Array<{
    targetDocId: string;
    targetTitle: string;
    relationship: 'Regulamenta' | 'Menciona' | 'Remete para' | 'Implementa' | 'Baseia-se em' | 'Aplica subsidiariamente' | 'Adota como referência comparada' | 'Revoga' | 'Complementa';
    description: string;
    sourceExcerpt?: string;
  }>;
  scansAvailable?: string[];
}

export interface LawArticle {
  id: string;
  docId: string;
  docTitle: string;
  number: number | string;
  title: string;
  chapterNumber?: string;
  chapterTitle?: string;
  sectionTitle?: string;
  officialText: string;
  summary: string;
  explanation: string;
  practicalExample?: string;
  crossReferences: Array<{
    targetDocId?: string;
    targetArticleId?: string;
    label: string;
    note: string;
  }>;
  validationStatus: 'Verificado' | 'Por verificar' | 'Nota Editorial';
  validationNote?: string | null;
  pageNumber: number;
}

export interface CineArea {
  code: string;
  name: string;
  level: 'geral' | 'especifica' | 'detalhada';
  parentCode?: string;
  description: string;
  criteria?: string;
  examples?: string[];
  inclusions?: string[];
  exclusions?: string[];
  pageReference: number;
}

export interface CineFlowchartStep {
  id: string;
  flowchartName: string;
  stepNumber: number;
  title: string;
  description: string;
  conditionOrDecision?: string;
  responsible?: string;
  nextStepId?: string | null;
  sourceReference: string;
}

export interface PlanoStage {
  step: number;
  activity: string;
  responsible: string;
  participants: string;
  expectedResult: string;
  status: 'Concluído' | 'Em curso' | 'Previsto' | 'Por verificar';
  notes?: string;
}

export interface PlanoFacultySession {
  city: 'Quelimane' | 'Beira' | 'Dondo';
  faculty: string;
  date: string;
  schedule: string;
  activities: string;
  targetCourses?: string[];
}

export interface QnqLevel {
  level: number;
  designation: string;
  typicalQualifications: string;
  subsystem: 'Ensino Geral' | 'Educação Profissional' | 'Ensino Superior';
  knowledge: string;
  skills: string;
  autonomyAndResponsibility: string;
}

export interface StudyModule {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  estimatedMinutes: number;
  summary: string;
  keyConcepts: Array<{
    term: string;
    definition: string;
    source: string;
  }>;
  stepByStepExplanation: Array<{
    step: number;
    title: string;
    detail: string;
    sourceRef: string;
  }>;
  visualDiagramType?: 'flowchart' | 'hierarchy' | 'timeline' | 'matrix';
  practicalExample: {
    scenario: string;
    application: string;
    justification: string;
    sourceDoc: string;
  };
  errorsToAvoid: string[];
  revisionQuiz: Array<{
    id: string;
    question: string;
    type: 'factual' | 'interpretativa';
    options: string[];
    correctIndex: number;
    explanation: string;
    documentSource: string;
    page: number;
  }>;
  glossary: Array<{
    term: string;
    definition: string;
    officialSource: string;
  }>;
  furtherReading: Array<{
    docId: string;
    title: string;
    articleOrPage: string;
  }>;
}

export interface DocumentComparison {
  id: string;
  title: string;
  category: 'Enquadramento Geral' | 'Graus e Níveis' | 'Garantia de Qualidade' | 'Classificação de Áreas' | 'Obrigações das IES';
  documentsInvolved: Array<{
    docId: string;
    docTitle: string;
    jurisdiction: string;
  }>;
  comparisonPoints: Array<{
    aspect: string;
    analysis: string;
    docPositions: Array<{
      docId: string;
      position: string;
      excerpt: string;
      provenance: string;
    }>;
    differencesOrEquivalences: string;
    cautionNote?: string;
  }>;
}

export interface TimelineEvent {
  id: string;
  dateString: string;
  year: number;
  month?: number;
  day?: number;
  dateType: 'Data de Publicação' | 'Data de Aprovação' | 'Data de Elaboração' | 'Data de Realização Prevista' | 'Data de Realização Confirmada' | 'Data com Inconsistência' | 'Data de Inconsistência';
  title: string;
  description: string;
  entity: string;
  docId: string;
  provenance: string;
  discrepancyNote?: string;
}

export interface GlobalSearchResult {
  id: string;
  title: string;
  category: 'Documento' | 'Artigo' | 'Área CINE' | 'Conceito / Glossário' | 'Plano UniLicungo' | 'Qualificação';
  docId?: string;
  docTitle?: string;
  page?: number;
  snippet: string;
  matchedField: string;
  url: string;
}

export interface ReaderBookmark {
  id: string;
  docId: string;
  articleId?: string;
  title: string;
  dateAdded: string;
  note?: string;
}
