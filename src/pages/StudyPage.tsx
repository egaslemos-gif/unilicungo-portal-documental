import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  AlertTriangle, 
  Clock, 
  ArrowRight, 
  RotateCcw, 
  Award,
  Search,
  BookMarked,
  Lightbulb,
  FileText
} from 'lucide-react';
import { studyModules } from '../data/study';
import { glossaryItems, GlossaryItem } from '../data/glossary';
import { getStoredQuizScore, saveQuizScore } from '../utils/storage';
import { StudyModule } from '../types';

interface StudyPageProps {
  onNavigate: (route: string) => void;
}

export const StudyPage: React.FC<StudyPageProps> = ({ onNavigate }) => {
  const [activeMainTab, setActiveMainTab] = useState<'modulos' | 'glossario' | 'erros'>('modulos');
  const [selectedModuleId, setSelectedModuleId] = useState<string>(studyModules[0].id);
  const [activeModuleTab, setActiveModuleTab] = useState<'conteudo' | 'caso' | 'quiz'>('conteudo');

  // Quiz state for current module
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Glossary search
  const [glossarySearch, setGlossarySearch] = useState<string>('');
  const [glossaryCategory, setGlossaryCategory] = useState<string>('todas');

  const currentModule = studyModules.find(m => m.id === selectedModuleId) || studyModules[0];

  useEffect(() => {
    // Check if score is already saved
    const saved = getStoredQuizScore(currentModule.id);
    if (saved !== null) {
      setQuizScore(saved);
    } else {
      setQuizScore(null);
      setSelectedAnswers({});
      setSubmittedQuiz(false);
    }
  }, [currentModule.id]);

  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    if (submittedQuiz) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleEvaluateQuiz = () => {
    let correctCount = 0;
    currentModule.revisionQuiz.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    const percentage = Math.round((correctCount / currentModule.revisionQuiz.length) * 100);
    setQuizScore(percentage);
    setSubmittedQuiz(true);
    saveQuizScore(currentModule.id, percentage);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmittedQuiz(false);
    setQuizScore(null);
  };

  // Filtered glossary
  const filteredGlossary = glossaryItems.filter(item => {
    if (glossaryCategory !== 'todas' && item.category !== glossaryCategory) return false;
    if (glossarySearch.trim()) {
      const q = glossarySearch.toLowerCase();
      return item.term.toLowerCase().includes(q) || item.definition.toLowerCase().includes(q);
    }
    return true;
  });

  const glossaryCategories = Array.from(new Set(glossaryItems.map(g => g.category)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>Módulo E</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Centro de Estudo e Formação Académica
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Ambiente pedagógico para capacitação de gestores académicos, docentes e investigadores da Universidade Licungo nos domínios da legislação do ensino superior, QNQ e taxonomia CINE.
          </p>
        </div>

        {/* Main Tab Switcher */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold self-start md:self-auto border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveMainTab('modulos')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeMainTab === 'modulos'
                ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Módulos Pedagógicos
          </button>
          <button
            onClick={() => setActiveMainTab('glossario')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeMainTab === 'glossario'
                ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Glossário Normativo ({glossaryItems.length})
          </button>
          <button
            onClick={() => setActiveMainTab('erros')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeMainTab === 'erros'
                ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Erros a Evitar
          </button>
        </div>
      </div>

      {/* TAB 1: MÓDULOS PEDAGÓGICOS */}
      {activeMainTab === 'modulos' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Module List Selector */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2 px-1">
              Selecione o Módulo de Estudo:
            </span>
            {studyModules.map((m, idx) => {
              const isSelected = m.id === selectedModuleId;
              const score = getStoredQuizScore(m.id);
              return (
                <div
                  key={m.id}
                  onClick={() => {
                    setSelectedModuleId(m.id);
                    setActiveModuleTab('conteudo');
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/60 dark:border-emerald-500/50 shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {m.badge}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {m.estimatedMinutes} min
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {m.subtitle}
                  </p>
                  {score !== null && (
                    <div className="mt-2 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 flex items-center">
                      <Award className="w-3.5 h-3.5 mr-1" />
                      <span>Nota no Quiz: {score}%</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Selected Module Content */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
            
            {/* Header Module */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  {currentModule.badge}
                </span>
                <span className="text-xs text-slate-400 flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  {currentModule.estimatedMinutes} minutos estimados
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                {currentModule.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentModule.summary}
              </p>

              {/* Module Sub-tabs */}
              <div className="flex space-x-2 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-xs">
                <button
                  onClick={() => setActiveModuleTab('conteudo')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    activeModuleTab === 'conteudo'
                      ? 'bg-emerald-700 text-white shadow-2xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Conceitos & Passos
                </button>
                <button
                  onClick={() => setActiveModuleTab('caso')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    activeModuleTab === 'caso'
                      ? 'bg-emerald-700 text-white shadow-2xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Caso Prático na UniLicungo
                </button>
                <button
                  onClick={() => setActiveModuleTab('quiz')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center space-x-1 ${
                    activeModuleTab === 'quiz'
                      ? 'bg-emerald-700 text-white shadow-2xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span>Quiz de Autoavaliação ({currentModule.revisionQuiz.length})</span>
                  {quizScore !== null && <span className="ml-1 font-bold">({quizScore}%)</span>}
                </button>
              </div>
            </div>

            {/* Sub-tab 1: Conteúdo & Passos */}
            {activeModuleTab === 'conteudo' && (
              <div className="p-6 space-y-6">
                {/* Key Concepts */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Conceitos-Chave Nucleares:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentModule.keyConcepts.map(c => (
                      <div key={c.term} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                        <div className="font-bold text-emerald-800 dark:text-emerald-400 text-xs">
                          {c.term}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                          {c.definition}
                        </p>
                        <div className="text-[10px] text-slate-400">Fonte: {c.source}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step by Step */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Roteiro e Explicação Passo a Passo:
                  </h4>
                  <div className="space-y-3">
                    {currentModule.stepByStepExplanation.map(st => (
                      <div key={st.step} className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-800 flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                          {st.step}
                        </div>
                        <div className="space-y-1">
                          <h5 className="font-bold text-slate-900 dark:text-white text-xs">
                            {st.title}
                          </h5>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {st.detail}
                          </p>
                          <span className="inline-block text-[10px] font-mono text-emerald-700 dark:text-emerald-400">
                            Referência: {st.sourceRef}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Errors to avoid */}
                <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/50 space-y-2">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-900 dark:text-amber-200">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Erros Comuns de Interpretação a Evitar:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                    {currentModule.errorsToAvoid.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Sub-tab 2: Caso Prático */}
            {activeModuleTab === 'caso' && (
              <div className="p-6 space-y-6">
                <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
                  <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-400 font-bold text-sm">
                    <Lightbulb className="w-5 h-5 text-emerald-600" />
                    <span>Cenário Real de Gestão Curricular na UniLicungo</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Cenário / Desafio:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium bg-white dark:bg-slate-900 p-3 rounded border border-slate-200 dark:border-slate-800">
                      {currentModule.practicalExample.scenario}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Aplicação Correta das Normas:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {currentModule.practicalExample.application}
                    </p>
                  </div>

                  <div className="space-y-1 bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-lg border border-emerald-200 dark:border-emerald-900/40">
                    <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                      Fundamentação Jurídica / Normativa:
                    </span>
                    <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
                      {currentModule.practicalExample.justification}
                    </p>
                    <div className="text-[10px] text-emerald-700 dark:text-emerald-400 pt-1 font-mono">
                      Fonte: {currentModule.practicalExample.sourceDoc}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-tab 3: Quiz de Autoavaliação */}
            {activeModuleTab === 'quiz' && (
              <div className="p-6 space-y-6">
                <div className="space-y-6">
                  {currentModule.revisionQuiz.map((q, qIndex) => {
                    const chosen = selectedAnswers[q.id];
                    const isAnswered = chosen !== undefined;
                    const isCorrect = isAnswered && chosen === q.correctIndex;

                    return (
                      <div
                        key={q.id}
                        className={`p-5 rounded-xl border transition-all ${
                          submittedQuiz
                            ? isCorrect
                              ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-400'
                              : 'bg-red-50/50 dark:bg-red-950/20 border-red-300'
                            : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-bold text-slate-500">
                            Questão {qIndex + 1} ({q.type === 'factual' ? 'Factual' : 'Interpretação'})
                          </span>
                          {submittedQuiz && (
                            <span className="text-xs font-semibold flex items-center">
                              {isCorrect ? (
                                <span className="text-emerald-600 flex items-center">
                                  <CheckCircle2 className="w-4 h-4 mr-1" /> Correto
                                </span>
                              ) : (
                                <span className="text-red-600 flex items-center">
                                  <XCircle className="w-4 h-4 mr-1" /> Incorreto
                                </span>
                              )}
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                          {q.question}
                        </h4>

                        <div className="space-y-2">
                          {q.options.map((opt, optIdx) => {
                            let optStyle = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-emerald-400';
                            
                            if (chosen === optIdx) {
                              optStyle = 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-100 font-medium';
                            }

                            if (submittedQuiz) {
                              if (optIdx === q.correctIndex) {
                                optStyle = 'border-emerald-500 bg-emerald-100 dark:bg-emerald-900 text-emerald-950 dark:text-emerald-100 font-bold';
                              } else if (chosen === optIdx && !isCorrect) {
                                optStyle = 'border-red-400 bg-red-100 dark:bg-red-950 text-red-950 dark:text-red-100';
                              }
                            }

                            return (
                              <div
                                key={optIdx}
                                onClick={() => handleSelectAnswer(q.id, optIdx)}
                                className={`p-3 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between ${optStyle}`}
                              >
                                <span>{opt}</span>
                                {chosen === optIdx && !submittedQuiz && (
                                  <div className="w-2 h-2 rounded-full bg-emerald-600" />
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Explanation post submit */}
                        {submittedQuiz && (
                          <div className="mt-4 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                            <span className="font-bold text-slate-900 dark:text-white">Explicação e Fonte:</span>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                              {q.explanation}
                            </p>
                            <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono">
                              Fonte Documental: {q.documentSource} (Pág. {q.page})
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Evaluate / Reset actions */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                  <div>
                    {quizScore !== null && (
                      <div className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center">
                        <Award className="w-5 h-5 text-emerald-600 mr-2" />
                        <span>Aproveitamento: {quizScore}%</span>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    {submittedQuiz ? (
                      <button
                        onClick={handleResetQuiz}
                        className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center"
                      >
                        <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                        Repetir Quiz
                      </button>
                    ) : (
                      <button
                        onClick={handleEvaluateQuiz}
                        disabled={Object.keys(selectedAnswers).length === 0}
                        className="px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-semibold shadow-xs"
                      >
                        Submeter e Avaliar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* TAB 2: GLOSSÁRIO NORMATIVO */}
      {activeMainTab === 'glossario' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                placeholder="Pesquisar termo ou conceito no glossário oficial..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <select
              value={glossaryCategory}
              onChange={(e) => setGlossaryCategory(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            >
              <option value="todas">Todas as Categorias</option>
              {glossaryCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGlossary.map((item) => (
              <div
                key={item.term}
                className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 hover:border-emerald-500/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {item.term}
                  </h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.definition}
                </p>
                <div className="text-[10px] text-slate-400 pt-1 font-mono">
                  {item.source}
                </div>
              </div>
            ))}
          </div>

          {filteredGlossary.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-xs">
              Nenhum termo encontrado no glossário para &quot;{glossarySearch}&quot;.
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ERROS A EVITAR */}
      {activeMainTab === 'erros' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Guia de Prevenção de Erros Normativos e Classificatórios
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Durante as auditorias documentais e processos de acreditação conduzidos pelo CNAQ, identificam-se falhas recorrentes de interpretação. Este guia sintetiza as principais precauções obrigatórias:
            </p>

            <div className="space-y-4 pt-2">
              {[
                {
                  title: '1. Invocação de Legislação Revogada (Lei 27/2009 e Decreto 46/2018)',
                  error: 'Manter regulamentos de curso ou estatutos que citam a Lei 27/2009 de 29 de Setembro ou o Decreto 46/2018 de 1 de Agosto.',
                  correction: 'A Lei 1/2023 revogou expressamente a Lei 27/2009 (Artigo 57) e o Decreto 43/2023 revogou o Decreto 46/2018. Todos os diplomas e propostas curriculares devem fundamentar-se estritamente na Lei 1/2023 e no Decreto 43/2023.',
                  severity: 'Crítica'
                },
                {
                  title: '2. Confusão entre Licenciaturas de 4 Anos (Nível 7) e Licenciaturas Regulamentadas (Nível 8)',
                  error: 'Classificar indistintamente qualquer licenciatura como Nível 7 do QNQ.',
                  correction: 'O Artigo 12, alínea b) do Decreto 61/2022 estipula que cursos com duração superior a 4 anos e estágio profissional obrigatório de pelo menos 1 ano (ex.: Medicina Geral) enquadram-se no Nível 8.',
                  severity: 'Elevada'
                },
                {
                  title: '3. Enquadramento Impróprio de Licenciaturas em Ensino fora da Área Geral 01',
                  error: 'Classificar um curso de "Ensino de Biologia" na Área 05 (Ciências Biológicas) ou "Ensino de Informática" na Área 06 (TIC).',
                  correction: 'Pelo critério taxonómico do Manual CINE (Área 01, p. 32), todo o curso cuja finalidade explícita seja a docência pertence obrigatoriamente à Área Geral 01 (Educação, código 0114), figurando a ciência pura como campo secundário.',
                  severity: 'Elevada'
                },
                {
                  title: '4. Confusão dos 10 Níveis Verticais do QNQ com as 10 Áreas Horizontais do CINE',
                  error: 'Tratar os níveis de qualificações como se fossem as áreas de conhecimento.',
                  correction: 'QNQ é vertical (escala 1 a 10 de complexidade, de 6ª classe a Doutoramento). CINE é horizontal (classificação disciplinar 00 a 10, de Educação a Serviços). São eixos conceituais complementares e distintos.',
                  severity: 'Média'
                },
                {
                  title: '5. Início de Cursos sem Acreditação Prévia Emitida pelo CNAQ',
                  error: 'Admitir estudantes ou iniciar aulas com base apenas na aprovação pelo Conselho Científico da Faculdade.',
                  correction: 'O Artigo 30 da Lei 1/2023 e o Artigo 31 do Decreto 43/2023 proíbem categoricamente a entrada em funcionamento de qualquer curso sem acreditação prévia formal favorável e registo no cadastro nacional pelo CNAQ.',
                  severity: 'Crítica'
                }
              ].map((item, i) => (
                <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.severity === 'Crítica'
                        ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      Gravidade: {item.severity}
                    </span>
                  </div>
                  <div className="text-xs text-red-700 dark:text-red-400 bg-red-50/50 dark:bg-red-950/20 p-2.5 rounded">
                    <strong>Erro Frequente:</strong> {item.error}
                  </div>
                  <div className="text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20 p-2.5 rounded">
                    <strong>Correção Normativa:</strong> {item.correction}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
