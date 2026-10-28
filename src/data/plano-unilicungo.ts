import { PlanoStage, PlanoFacultySession } from '../types';

export const planoDiscrepancyNotice = {
  title: 'Alerta Crítico: Discrepância Cronológica no Plano Institucional',
  finding: 'O documento do Gabinete de Avaliação e Qualidade (GAQ) da UniLicungo apresenta a data de 08 de Outubro de 2026 no cabeçalho e nas tabelas das páginas 1, 4 e 5 (referindo 26/10/2026 a 28/10/2026).',
  explanation: 'Trata-se de uma evidente gralha material/lapso de digitação do ano corrente (2024 por 2026) num modelo pré-formatado, uma vez que a atividade decorreu articulada com o Workshop do CNAQ de Outubro de 2024 e visou implementar o Decreto 43/2023 recém-aprovado.',
  classification: 'Gralha Material Documentada (Ano Efetivo: 2024)'
};

export const planoStages: PlanoStage[] = [
  {
    "step": 1,
    "activity": "Preparação dos materiais e matriz de classificação",
    "responsible": "Gabinete de Avaliação e Qualidade (GAQ)",
    "participants": "Equipa técnica do GAQ",
    "expectedResult": "Matriz de classificação dos cursos preparada com formulários e instrumentos de suporte.",
    "status": "Concluído",
    "notes": "Baseou-se nos domínios do CINE Brasil e directrizes do Artigo 4 do Decreto 43/2023."
  },
  {
    "step": 2,
    "activity": "Comunicação e agendamento com as faculdades",
    "responsible": "GAQ",
    "participants": "Direcções das Faculdades (Quelimane, Beira e Dondo)",
    "expectedResult": "Sessões de socialização agendadas, com datas, horários e participantes confirmados.",
    "status": "Concluído"
  },
  {
    "step": 3,
    "activity": "Socialização nas 6 faculdades de Quelimane",
    "responsible": "GAQ",
    "participants": "Direcção, responsáveis académicos e docentes intervenientes de Quelimane",
    "expectedResult": "Domínios, áreas e critérios de classificação socializados e cursos das 6 faculdades analisados e preliminarmente enquadrados.",
    "status": "Concluído",
    "notes": "Realizado nos dias 26, 27 e 28 de Outubro (referidos no texto original como 2026 por gralha do cabeçalho)."
  },
  {
    "step": 4,
    "activity": "Socialização nas 4 faculdades da Beira e Dondo",
    "responsible": "GAQ",
    "participants": "Direcção, responsáveis académicos e outros intervenientes de Sofala",
    "expectedResult": "Domínios, áreas e critérios socializados e cursos das 4 faculdades analisados e preliminarmente enquadrados.",
    "status": "Concluído",
    "notes": "Abrangeu os campi da Ponta-Gêa e do Dondo."
  },
  {
    "step": 5,
    "activity": "Levantamento de dúvidas e propostas de enquadramento",
    "responsible": "Faculdades e GAQ",
    "participants": "Comissões de Curso e Chefes de Departamento",
    "expectedResult": "Dúvidas, divergências e propostas de enquadramento identificadas, registadas e sistematizadas para apreciação.",
    "status": "Concluído"
  },
  {
    "step": 6,
    "activity": "Harmonização da classificação dos cursos",
    "responsible": "GAQ e unidades académicas",
    "participants": "Directores de Faculdade, Direcção Pedagógica e GAQ",
    "expectedResult": "Classificação revista e harmonizada, com consensos estabelecidos sobre o respetivo enquadramento nos domínios e áreas.",
    "status": "Em curso"
  },
  {
    "step": 7,
    "activity": "Elaboração da matriz consolidada",
    "responsible": "GAQ",
    "participants": "Equipa Técnica do GAQ",
    "expectedResult": "Matriz institucional consolidada, contendo a classificação harmonizada dos cursos por domínio e área.",
    "status": "Previsto"
  },
  {
    "step": 8,
    "activity": "Elaboração do relatório final",
    "responsible": "GAQ",
    "participants": "GAQ e Reitoria",
    "expectedResult": "Relatório da actividade elaborado, integrando sessões realizadas, participantes, principais questões levantadas, consensos e recomendações.",
    "status": "Previsto"
  }
];

export const facultySessions: PlanoFacultySession[] = [
  {
    "city": "Quelimane",
    "faculty": "Faculdade de Educação",
    "date": "26/10/2024 (indicado no original como 2026)",
    "schedule": "08h30 - 12h00",
    "activities": "Apresentação dos domínios de conhecimento e áreas específicas; explicação dos critérios de classificação; análise do enquadramento dos cursos; esclarecimento de dúvidas.",
    "targetCourses": [
      "Licenciatura em Educação e Gestão Escolar",
      "Psicologia Educacional",
      "Administração Educacional"
    ]
  },
  {
    "city": "Quelimane",
    "faculty": "Faculdade de Ciências Sociais",
    "date": "26/10/2024 (indicado no original como 2026)",
    "schedule": "14h00 - 17h00",
    "activities": "Apresentação e discussão dos domínios e áreas específicas; análise dos cursos da Faculdade; recolha de contribuições.",
    "targetCourses": [
      "História",
      "Geografia",
      "Sociologia"
    ]
  },
  {
    "city": "Quelimane",
    "faculty": "Faculdade de Ciências Agrárias",
    "date": "27/10/2024 (indicado no original como 2026)",
    "schedule": "08h30 - 12h00",
    "activities": "Socialização dos domínios e áreas específicas; análise do enquadramento dos cursos; esclarecimento de dúvidas e recolha de contribuições.",
    "targetCourses": [
      "Engenharia Agronómica",
      "Agro-pecuária",
      "Desenvolvimento Rural"
    ]
  },
  {
    "city": "Quelimane",
    "faculty": "Faculdade de Economia e Gestão",
    "date": "27/10/2024 (indicado no original como 2026)",
    "schedule": "14h00 - 17h00",
    "activities": "Socialização dos critérios de classificação; análise dos cursos; discussão e recolha de contribuições.",
    "targetCourses": [
      "Gestão de Empresas",
      "Contabilidade e Finanças",
      "Economia"
    ]
  },
  {
    "city": "Quelimane",
    "faculty": "Faculdade de Medicina",
    "date": "28/10/2024 (indicado no original como 2026)",
    "schedule": "08h30 - 12h00",
    "activities": "Apresentação dos domínios e áreas específicas; análise da classificação dos cursos; discussão e esclarecimento de dúvidas.",
    "targetCourses": [
      "Medicina Geral",
      "Saúde Pública"
    ]
  },
  {
    "city": "Quelimane",
    "faculty": "Faculdade de Engenharia Electrónica e Planeamento Físico",
    "date": "28/10/2024 (indicado no original como 2026)",
    "schedule": "14h00 - 17h00",
    "activities": "Socialização dos domínios e áreas específicas; enquadramento dos cursos; discussão e recolha de contribuições.",
    "targetCourses": [
      "Engenharia Electrónica",
      "Planeamento Físico e Ambiental"
    ]
  },
  {
    "city": "Beira",
    "faculty": "Faculdade de Letras e Humanidades",
    "date": "26/10/2024 (indicado no original como 2026)",
    "schedule": "08h30 - 12h00",
    "activities": "Apresentação dos domínios de conhecimento e áreas específicas; explicação dos critérios; análise do enquadramento dos cursos e esclarecimento de dúvidas.",
    "targetCourses": [
      "Língua Portuguesa",
      "Inglês",
      "Filosofia"
    ]
  },
  {
    "city": "Beira",
    "faculty": "Faculdade de Ciências Empresariais e Jurídicas",
    "date": "26/10/2024 (indicado no original como 2026)",
    "schedule": "08h30 - 12h00",
    "activities": "Socialização dos critérios de classificação; análise dos cursos; discussão e recolha de contribuições.",
    "targetCourses": [
      "Direito",
      "Administração e Gestão"
    ]
  },
  {
    "city": "Beira",
    "faculty": "Faculdade de Psicologia e Educação (Campus Ponta-Gêa)",
    "date": "26/10/2024 (indicado no original como 2026)",
    "schedule": "14h00 - 17h00",
    "activities": "Apresentação dos domínios e áreas específicas; análise do enquadramento dos cursos; esclarecimento de dúvidas e recolha de contribuições.",
    "targetCourses": [
      "Psicologia Clínica",
      "Educação Básica"
    ]
  },
  {
    "city": "Dondo",
    "faculty": "Faculdade de Ciências e Tecnologia (Campus Dondo)",
    "date": "27/10/2024 (indicado no original como 2026)",
    "schedule": "08h30 - 12h00",
    "activities": "Socialização dos domínios e áreas específicas; análise dos cursos; discussão e recolha de contribuições.",
    "targetCourses": [
      "Ciência da Computação / Informática",
      "Matemática",
      "Química",
      "Física"
    ]
  }
];
