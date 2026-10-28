import React from 'react';
import { BookOpen, ShieldCheck, Scale, Award, Heart, HelpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Column 1: Institution */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white">
              <div className="w-7 h-7 rounded bg-emerald-600 flex items-center justify-center font-bold text-sm">
                UL
              </div>
              <span className="font-semibold text-sm">Universidade Licungo</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Estrada Regional n.º 642, Campus de Murropué, CP 106, Quelimane — Zambézia, Moçambique.
            </p>
            <p className="text-slate-500">
              Gabinete de Avaliação e Qualidade (GAQ) em articulação com o Conselho Nacional de Avaliação de Qualidade (CNAQ).
            </p>
          </div>

          {/* Column 2: Legal Framework */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Enquadramento Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#/leitor/lei-1-2023" className="hover:text-emerald-400 transition-colors">
                  Lei n.º 1/2023 (Ensino Superior)
                </a>
              </li>
              <li>
                <a href="#/leitor/decreto-43-2023" className="hover:text-emerald-400 transition-colors">
                  Decreto n.º 43/2023 (Licenciamento IES)
                </a>
              </li>
              <li>
                <a href="#/leitor/decreto-61-2022" className="hover:text-emerald-400 transition-colors">
                  Decreto n.º 61/2022 (Criação do QNQ)
                </a>
              </li>
              <li>
                <a href="#/comparador" className="hover:text-emerald-400 transition-colors">
                  Quadro Comparativo de Normas
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Academic Instruments */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Instrumentos Técnicos
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#/visualizacoes?tab=cine" className="hover:text-emerald-400 transition-colors">
                  Classificação CINE (UNESCO / INEP)
                </a>
              </li>
              <li>
                <a href="#/visualizacoes?tab=qnq" className="hover:text-emerald-400 transition-colors">
                  Estrutura dos 10 Níveis do QNQ
                </a>
              </li>
              <li>
                <a href="#/leitor/qualificacao-cc" className="hover:text-emerald-400 transition-colors">
                  Padrão em Ciência da Computação
                </a>
              </li>
              <li>
                <a href="#/leitor/plano-socializacao" className="hover:text-emerald-400 transition-colors">
                  Plano de Socialização UniLicungo
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Methodological Commitment */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Rigor Documental
            </h4>
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60 space-y-2">
              <div className="flex items-center space-x-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Textos Oficiais Autênticos</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Todos os textos legais e técnicos derivam de documentos oficiais do Boletim da República e actas do CNAQ, diferenciando estritamente transcrições literais de análises didácticas.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} Universidade Licungo — Portal de Apoio à Gestão Curricular e Garantia de Qualidade.
          </p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Scale className="w-3.5 h-3.5 text-slate-400" />
              <span>Base Jurídica Moçambicana</span>
            </span>
            <span>•</span>
            <span>Pronto para GitHub Pages</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
