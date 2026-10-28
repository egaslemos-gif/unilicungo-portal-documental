import { StudyModule } from '../types';

export const studyModules: StudyModule[] = [
  {
    "id": "modulo-1-lei-1-2023",
    "title": "Módulo 1: O Novo Regime Jurídico do Ensino Superior",
    "subtitle": "Estrutura da Lei n.º 1/2023, autonomia, ciclos de formação e o QUANQES",
    "badge": "Legislação Estruturante",
    "estimatedMinutes": 25,
    "summary": "Estudo aprofundado dos 7 capítulos e 58 artigos da Lei n.º 1/2023, compreendendo as inovações face à antiga Lei 27/2009, a tipologia institucional, as garantias de qualidade e o mandato do CNAQ.",
    "keyConcepts": [
      {
        "term": "SINAQES",
        "definition": "Sistema Nacional de Avaliação, Acreditação e Garantia de Qualidade do Ensino Superior (Artigo 28).",
        "source": "Lei 1/2023, Artigo 28"
      },
      {
        "term": "QUANQES",
        "definition": "Quadro Nacional de Qualificações de Ensino Superior, assegurando o alinhamento curricular aos níveis 7 a 10 do QNQ.",
        "source": "Lei 1/2023, Artigo 28, n.º 5"
      },
      {
        "term": "Tipologia de IES",
        "definition": "Quatro categorias oficiais: Universidades, Institutos Superiores, Academias e Faculdades/Escolas Superiores.",
        "source": "Lei 1/2023, Artigo 36"
      }
    ],
    "stepByStepExplanation": [
      {
        "step": 1,
        "title": "Revogação da Lei 27/2009",
        "detail": "A Lei 1/2023 substitui formalmente todo o enquadramento anterior. Todos os processos de acreditação e gestão pedagógica passam a reger-se por este diploma.",
        "sourceRef": "Artigo 57"
      },
      {
        "step": 2,
        "title": "Ciclos de Formação",
        "detail": "1º Ciclo (Licenciatura, 4 anos / 240 créditos); 2º Ciclo (Mestrado, 1-2 anos); 3º Ciclo (Doutoramento, 3-4 anos com tese original).",
        "sourceRef": "Artigos 7, 12, 14, 15"
      },
      {
        "step": 3,
        "title": "Papel do CNAQ",
        "detail": "O Conselho Nacional de Avaliação de Qualidade é a entidade independente responsável pela acreditação institucional e dos cursos.",
        "sourceRef": "Artigo 30"
      }
    ],
    "practicalExample": {
      "scenario": "A Universidade Licungo pretende criar um novo curso de licenciatura interdisciplinar e submeter à tutela.",
      "application": "O curso deve cumprir o Artigo 12 da Lei 1/2023, ser estruturado segundo um domínio de conhecimento oficial e obter acreditação prévia obrigatória do CNAQ antes da publicação e matrícula de estudantes.",
      "justification": "O Artigo 30 da Lei 1/2023 proíbe expressamente a entrada em funcionamento de cursos de ensino superior sem acreditação prévia favorável emitida pelo CNAQ.",
      "sourceDoc": "Lei n.º 1/2023, Artigos 12 e 30"
    },
    "errorsToAvoid": [
      "Citar a Lei n.º 27/2009 como norma vigente (está expressamente revogada pelo Artigo 57 da Lei 1/2023).",
      "Iniciar a lecionação de novos cursos sem o parecer final e certidão de acreditação prévia do CNAQ.",
      "Confundir o grau de licenciatura padrão (Nível 7 QNQ, 4 anos) com licenciaturas de áreas regulamentadas com estágio profissional (Nível 8 QNQ, >4 anos)."
    ],
    "revisionQuiz": [
      {
        "id": "q1-1",
        "question": "Qual é a duração normal e o número de créditos de referência para o grau de Licenciatura no 1º Ciclo segundo a Lei n.º 1/2023?",
        "type": "factual",
        "options": [
          "3 anos e 180 créditos",
          "4 anos e 240 créditos",
          "5 anos e 300 créditos",
          "A duração é totalmente livre e fixada por cada faculdade sem limites"
        ],
        "correctIndex": 1,
        "explanation": "Nos termos do Artigo 7 e 12 da Lei 1/2023, a licenciatura tem a duração normal de 4 anos académicos e corresponde a 240 créditos do Sistema de Créditos Académicos de Moçambique.",
        "documentSource": "Lei n.º 1/2023",
        "page": 3
      },
      {
        "id": "q1-2",
        "question": "O que estabelece o Artigo 28, n.º 5 da Lei n.º 1/2023 em relação ao QUANQES?",
        "type": "interpretativa",
        "options": [
          "Extingue o quadro de qualificações no país",
          "Atribui ao órgão de supervisão do SINAQES (CNAQ) a garantia de desenho, registo e implementação do QUANQES articulado ao QNQ",
          "Transfere o ensino superior para o regime do ensino primário",
          "Dispensa as universidades públicas de registarem os seus cursos"
        ],
        "correctIndex": 1,
        "explanation": "O Artigo 28, n.º 5 determina expressamente que o órgão de supervisão da qualidade (CNAQ) garante o desenho, registo e implementação do Quadro Nacional de Qualificações do Ensino Superior.",
        "documentSource": "Lei n.º 1/2023",
        "page": 7
      }
    ],
    "glossary": [
      {
        "term": "Acreditação",
        "definition": "Reconhecimento formal da qualidade conferido pelo CNAQ.",
        "officialSource": "Lei 1/2023, Artigo 3"
      },
      {
        "term": "SINAQES",
        "definition": "Sistema Nacional de Avaliação, Acreditação e Garantia de Qualidade.",
        "officialSource": "Lei 1/2023, Artigo 28"
      }
    ],
    "furtherReading": [
      {
        "docId": "lei-1-2023",
        "title": "Lei n.º 1/2023",
        "articleOrPage": "Capítulos I, II e IV (Artigos 1 a 35)"
      },
      {
        "docId": "decreto-43-2023",
        "title": "Decreto n.º 43/2023",
        "articleOrPage": "Artigo 1 a 15"
      }
    ]
  },
  {
    "id": "modulo-2-decreto-43-2023",
    "title": "Módulo 2: Licenciamento de IES e o Artigo 4",
    "subtitle": "Domínios de conhecimento, requisitos de corpo docente e acreditação prévia",
    "badge": "Regulamentação Operacional",
    "estimatedMinutes": 30,
    "summary": "Compreensão aprofundada do Decreto n.º 43/2023, com foco especial no Artigo 4 (Domínios do Conhecimento), corpo docente em tempo integral, requisitos de infraestruturas e concessão de alvarás.",
    "keyConcepts": [
      {
        "term": "Artigo 4 do Decreto 43/2023",
        "definition": "Exigência de estruturação institucional das IES e cursos segundo domínios de conhecimento e áreas específicas oficialmente reconhecidas.",
        "source": "Decreto 43/2023, Artigo 4"
      },
      {
        "term": "Corpo Docente Qualificado",
        "definition": "Obrigatoriedade de percentuais mínimos de doutores e mestres contratados a tempo integral.",
        "source": "Decreto 43/2023, Artigos 11 e 12"
      },
      {
        "term": "Alvará de Funcionamento",
        "definition": "Documento comprovativo da legalidade concedido após verificação presencial e acreditação.",
        "source": "Decreto 43/2023, Artigo 47"
      }
    ],
    "stepByStepExplanation": [
      {
        "step": 1,
        "title": "Estruturação por Domínios",
        "detail": "As faculdades não podem organizar cursos de forma isolada sem filiação taxonómica a um domínio reconhecido.",
        "sourceRef": "Artigo 4"
      },
      {
        "step": 2,
        "title": "Rácio de Docentes",
        "detail": "Fixação de rácios rigorosos de professores com titulação de pós-graduação estrita em tempo integral por domínio científico.",
        "sourceRef": "Artigos 11-13"
      },
      {
        "step": 3,
        "title": "Processo de Acreditação e Alvará",
        "detail": "Trâmite de verificação documental e visita in loco de comissões de peritos do CNAQ antes da licença de exploração.",
        "sourceRef": "Artigos 31 e 47"
      }
    ],
    "practicalExample": {
      "scenario": "A Faculdade de Ciências e Tecnologia da UniLicungo no Campus do Dondo oferece cursos de Informática, Química e Matemática.",
      "application": "Cada curso deve ser classificado no seu domínio de conhecimento específico (ex.: Informática no Domínio 06 - TIC; Química no Domínio 05 - Ciências Naturais) e comprovar corpo docente a tempo integral específico para cada área.",
      "justification": "O Artigo 4 e Artigo 11 do Decreto 43/2023 impedem a contagem indiscriminada de um mesmo docente para justificar múltiplos cursos em domínios distintos sem carga horária compatível.",
      "sourceDoc": "Decreto n.º 43/2023, Artigos 4 e 11"
    },
    "errorsToAvoid": [
      "Considerar o enquadramento por domínios apenas como uma rotulagem administrativa: tem impacto direto nos rácios de corpo docente exigidos pela fiscalização.",
      "Usar docentes a tempo parcial para preencher a quota obrigatória de corpo docente efetivo.",
      "Operar extensões ou pólos universitários sem alvará específico averbado para o local físico."
    ],
    "revisionQuiz": [
      {
        "id": "q2-1",
        "question": "Qual é a exigência central introduzida pelo Artigo 4 do Regulamento anexo ao Decreto n.º 43/2023?",
        "type": "factual",
        "options": [
          "Obrigatoriedade de extinção de todas as faculdades de ciências sociais",
          "Obrigatoriedade das IES se organizarem e os cursos se estruturarem segundo domínios de conhecimento e áreas específicas reconhecidas oficialmente",
          "Cobrança de propinas em moeda estrangeira",
          "Isenção de corpo docente qualificado nas províncias do norte e centro"
        ],
        "correctIndex": 1,
        "explanation": "O Artigo 4 do Decreto 43/2023 determina imperativamente que as IES devem organizar-se e os cursos estruturar-se segundo domínios de conhecimento e áreas específicas reconhecidas oficialmente.",
        "documentSource": "Decreto n.º 43/2023",
        "page": 2
      }
    ],
    "glossary": [
      {
        "term": "Domínio do Conhecimento",
        "definition": "Área estruturada do saber humano que agrupa áreas específicas e detalhadas afins.",
        "officialSource": "Decreto 43/2023, Artigo 3"
      },
      {
        "term": "Alvará de Funcionamento",
        "definition": "Licença emitida pela tutela após cumprimento de todos os requisitos legais.",
        "officialSource": "Decreto 43/2023, Artigo 47"
      }
    ],
    "furtherReading": [
      {
        "docId": "decreto-43-2023",
        "title": "Decreto n.º 43/2023",
        "articleOrPage": "Artigos 3, 4, 11 e 31"
      },
      {
        "docId": "plano-socializacao",
        "title": "Plano de Socialização UniLicungo",
        "articleOrPage": "Página 1 (Justificação)"
      }
    ]
  },
  {
    "id": "modulo-3-qnq-decreto-61",
    "title": "Módulo 3: O Quadro Nacional de Qualificações (QNQ)",
    "subtitle": "Os 10 níveis, descritores por categorias de competência e subsistemas de ensino",
    "badge": "Estrutura de Qualificações",
    "estimatedMinutes": 35,
    "summary": "Estudo minucioso do Decreto n.º 61/2022 que cria o QNQ de Moçambique. Articulação dos 10 níveis, transição entre Educação Geral, Educação Profissional e Ensino Superior, e os 10 descritores de competência do Artigo 14.",
    "keyConcepts": [
      {
        "term": "10 Níveis do QNQ",
        "definition": "Escala vertical de qualificação do Sistema Nacional de Educação, de Nível 1 (Ensino Primário) a Nível 10 (Doutoramento).",
        "source": "Decreto 61/2022, Artigo 9"
      },
      {
        "term": "Nível 7 do QNQ",
        "definition": "Patamar correspondente à Licenciatura padrão de 4 anos e Licenciatura Profissional.",
        "source": "Decreto 61/2022, Artigo 12, alínea a)"
      },
      {
        "term": "10 Categorias de Competência",
        "definition": "Matriz cumulativa de descritores: Conhecimento, Aplicação, Métodos/Investigação, Resolução de Problemas, Ética, Informação, Comunicação, Contexto, Autonomia e Responsabilidade.",
        "source": "Decreto 61/2022, Artigo 14"
      }
    ],
    "stepByStepExplanation": [
      {
        "step": 1,
        "title": "Compreensão da Escala",
        "detail": "Níveis 1 a 5 cobrem a Educação Geral e Técnico Profissional inicial. Níveis 6 a 10 integram os certificados superiores e graus académicos.",
        "sourceRef": "Artigos 10, 11 e 12"
      },
      {
        "step": 2,
        "title": "Sub-quadro do Ensino Superior",
        "detail": "Nível 7 = Licenciatura (4 anos); Nível 8 = Licenciatura (>4 anos c/ estágio obrigatório); Nível 9 = Mestrado; Nível 10 = Doutoramento.",
        "sourceRef": "Artigo 12"
      },
      {
        "step": 3,
        "title": "Aplicação aos Currículos",
        "detail": "Cada programa curricular deve enunciar explicitamente como as suas unidades curriculares desenvolvem as 10 categorias de competência.",
        "sourceRef": "Artigo 14 e Anexo IV"
      }
    ],
    "practicalExample": {
      "scenario": "A Faculdade de Medicina da UniLicungo ministra a Licenciatura em Medicina Geral (duração de 6 anos com internato hospitalar). Em que nível do QNQ se enquadra?",
      "application": "Enquadra-se no Nível 8 do QNQ e não no Nível 7.",
      "justification": "O Artigo 12, alínea b) do Decreto n.º 61/2022 estabelece expressamente que as licenciaturas em áreas específicas cuja formação seja superior a quatro anos e inclua estágio profissional com duração mínima de um ano integram o Nível 8.",
      "sourceDoc": "Decreto n.º 61/2022, Artigo 12, alínea b)"
    },
    "errorsToAvoid": [
      "Classificar automaticamente todas as licenciaturas no Nível 7 sem verificar a duração e exigência de estágio profissional.",
      "Confundir o Nível 6 (Certificado Superior 1) com grau académico de licenciatura (Nível 6 não confere grau académico pleno).",
      "Ignorar a discrepância de datas entre o Boletim da República (23 de Novembro de 2022) e despachos que indicam 23 de Setembro de 2022."
    ],
    "revisionQuiz": [
      {
        "id": "q3-1",
        "question": "A que nível do QNQ moçambicano corresponde a Licenciatura académica regular de quatro anos segundo o Artigo 12 do Decreto 61/2022?",
        "type": "factual",
        "options": [
          "Nível 5",
          "Nível 6",
          "Nível 7",
          "Nível 9"
        ],
        "correctIndex": 2,
        "explanation": "O Artigo 12, alínea a) do Decreto n.º 61/2022 fixa explicitamente que a licenciatura com duração de quatro anos corresponde ao Nível 7 do QNQ.",
        "documentSource": "Decreto n.º 61/2022",
        "page": 4
      }
    ],
    "glossary": [
      {
        "term": "QNQ",
        "definition": "Quadro Nacional de Qualificações de Moçambique.",
        "officialSource": "Decreto 61/2022, Artigo 1"
      },
      {
        "term": "Descritor de Nível",
        "definition": "Enunciado que especifica os resultados de aprendizagem esperados em determinado nível.",
        "officialSource": "Decreto 61/2022, Artigo 13"
      }
    ],
    "furtherReading": [
      {
        "docId": "decreto-61-2022",
        "title": "Decreto n.º 61/2022",
        "articleOrPage": "Artigos 1 a 14 e Anexos I a IV"
      },
      {
        "docId": "qualificacao-cc",
        "title": "Qualificação Ciência da Computação",
        "articleOrPage": "Páginas 2 a 4 (Descritores)"
      }
    ]
  },
  {
    "id": "modulo-4-cine-e-taxonomia",
    "title": "Módulo 4: Classificação de Cursos pelo CINE",
    "subtitle": "Regras de enquadramento, árvore hierárquica e notas de inclusão/exclusão",
    "badge": "Taxonomia Curricular",
    "estimatedMinutes": 30,
    "summary": "Estudo prático do Manual de Domínios de Conhecimento CINE. Como classificar cursos multidisciplinares, a regra da carga horária de 50%, o perfil docente (Área 01) e o estatuto de referência comparada brasileira.",
    "keyConcepts": [
      {
        "term": "Área Geral (2 dígitos)",
        "definition": "10 grandes áreas do saber (00 a 10), agrupando campos amplos de estudo.",
        "source": "Manual CINE, p. 14"
      },
      {
        "term": "Área Específica (3 dígitos)",
        "definition": "Subdivisão que identifica o ramo de conhecimento com coerência epistemológica.",
        "source": "Manual CINE, p. 15"
      },
      {
        "term": "Área Detalhada (4 dígitos)",
        "definition": "Classificação mais precisa do curso ou programa de graduação.",
        "source": "Manual CINE, p. 15"
      },
      {
        "term": "Regra da Predominância (50%)",
        "definition": "Critério principal de enquadramento baseado no peso da carga horária das disciplinas.",
        "source": "Manual CINE, p. 17"
      }
    ],
    "stepByStepExplanation": [
      {
        "step": 1,
        "title": "Cálculo da Carga Horária",
        "detail": "Identificar se 50% ou mais da carga horária pertence a uma área específica.",
        "sourceRef": "Manual CINE, p. 17"
      },
      {
        "step": 2,
        "title": "Critério do Perfil Docente",
        "detail": "Se o curso tem como objetivo principal formar professores para a docência (ex: Ensino de Matemática), enquadra-se obrigatoriamente na Área Geral 01 (Educação) e não na 05 (Matemática).",
        "sourceRef": "Manual CINE, p. 32"
      },
      {
        "step": 3,
        "title": "Consulta a Inclusões e Exclusões",
        "detail": "Verificar as listas expressas de inclusões e exclusões de cada código detalhado para evitar classificações erróneas.",
        "sourceRef": "Manual CINE, p. 25"
      }
    ],
    "practicalExample": {
      "scenario": "A Faculdade de Ciências e Tecnologia tem um curso denominado 'Licenciatura em Ensino de Informática'.",
      "application": "O curso deve ser classificado na Área Geral 01 (Educação), Área Específica 011 e Área Detalhada 0114 (Formação de professores em disciplinas específicas), com nota explicativa de área secundária em 061 (TIC).",
      "justification": "O Manual CINE estabelece expressamente que todos os cursos cujo perfil de saída qualifica primordialmente para a docência integram a Área 01, independentemente da matéria leccionada.",
      "sourceDoc": "Manual CINE, p. 32-34"
    },
    "errorsToAvoid": [
      "Classificar licenciaturas em ensino (ex: Ensino de Química, Ensino de Geografia) nas áreas de ciências duras (05 ou 03) em vez de na Área 01 (Educação).",
      "Tomar o Manual CINE do INEP/MEC como lei formal moçambicana (é instrumento de referência técnica internacional adotado pelo CNAQ).",
      "Ignorar as notas de exclusão explícitas em engenharia e informática."
    ],
    "revisionQuiz": [
      {
        "id": "q4-1",
        "question": "Um curso de 'Licenciatura em Ensino de Física' da UniLicungo deve ser enquadrado em qual Área Geral do CINE?",
        "type": "interpretativa",
        "options": [
          "Área Geral 05 (Ciências Naturais, Matemática e Estatística)",
          "Área Geral 01 (Educação)",
          "Área Geral 07 (Engenharia)",
          "Área Geral 00 (Programas Básicos)"
        ],
        "correctIndex": 1,
        "explanation": "De acordo com os critérios taxonómicos do CINE (Manual CINE, p. 32), cursos destinados à formação docente pertencem obrigatoriamente à Área Geral 01 (Educação), especificamente 0114.",
        "documentSource": "Manual CINE Brasil / CNAQ",
        "page": 32
      }
    ],
    "glossary": [
      {
        "term": "CINE",
        "definition": "Classificação Internacional Normalizada da Educação adaptada pelo INEP/UNESCO.",
        "officialSource": "Manual CINE, p. 8"
      }
    ],
    "furtherReading": [
      {
        "docId": "manual-cine",
        "title": "Manual CINE",
        "articleOrPage": "Páginas 14 a 35"
      },
      {
        "docId": "decreto-43-2023",
        "title": "Decreto n.º 43/2023",
        "articleOrPage": "Artigo 4"
      }
    ]
  },
  {
    "id": "modulo-5-plano-unilicungo",
    "title": "Módulo 5: O Plano Institucional da UniLicungo",
    "subtitle": "Operacionalização das 8 etapas, roteiro nas 10 faculdades e resolução de casos",
    "badge": "Prática Institucional",
    "estimatedMinutes": 25,
    "summary": "Análise operacional do Plano de Socialização de Domínios do GAQ/UniLicungo. Metodologia de trabalho nas 10 faculdades em Quelimane e Beira/Dondo, indicadores de sucesso e análise da gralha cronológica 2026/2024.",
    "keyConcepts": [
      {
        "term": "Meta Institucional 100%",
        "definition": "10 faculdades socializadas e 100% dos cursos analisados e associados a domínios de conhecimento.",
        "source": "Plano UniLicungo, p. 3"
      },
      {
        "term": "Distribuição Geográfica",
        "definition": "6 faculdades em Quelimane e 4 faculdades em Sofala (Campi de Ponta-Gêa e Dondo).",
        "source": "Plano UniLicungo, p. 4"
      },
      {
        "term": "Lapso Cronológico",
        "definition": "Inconsistência da data '2026' no cabeçalho do documento oficial de 2024.",
        "source": "Plano UniLicungo, p. 1 e 5"
      }
    ],
    "stepByStepExplanation": [
      {
        "step": 1,
        "title": "Preparação e Matriz",
        "detail": "O GAQ elabora a matriz de classificação com formulários uniformizados.",
        "sourceRef": "Etapa 1"
      },
      {
        "step": 2,
        "title": "Sessões Práticas",
        "detail": "Sessões de 3 horas com directores e chefes de departamento para análise curricular direta.",
        "sourceRef": "Etapas 3 e 4"
      },
      {
        "step": 3,
        "title": "Consolidação e Relatório",
        "detail": "Sistematização de dúvidas controversas e envio do relatório final à Reitoria.",
        "sourceRef": "Etapas 7 e 8"
      }
    ],
    "practicalExample": {
      "scenario": "A equipa do GAQ chega à Faculdade de Economia e Gestão em Quelimane para enquadrar a 'Licenciatura em Informática de Gestão'.",
      "application": "Verifica se o currículo privilegia a contabilidade/gestão (Domínio 04) ou sistemas de informação/programação (Domínio 06). Com base no padrão do CNAQ de Ciência da Computação, 'Informática de Gestão' é um ramo das TIC (Domínio 06).",
      "justification": "O documento oficial de Qualificação de Ciência da Computação lista 'Informática de Gestão' como Ramo n.º 3 da área de informática.",
      "sourceDoc": "Plano de Socialização e Qualificação de CC, p. 2"
    },
    "errorsToAvoid": [
      "Interpretar a data de 2026 como indicativa de uma atividade futura diferida (foi realizada em 2024).",
      "Deixar de registar divergências na matriz preliminar (as divergências devem ser documentadas para decisão superior)."
    ],
    "revisionQuiz": [
      {
        "id": "q5-1",
        "question": "Quantas faculdades da UniLicungo foram abrangidas pelo Plano de Socialização do GAQ e como se distribuem geograficamente?",
        "type": "factual",
        "options": [
          "5 faculdades apenas em Quelimane",
          "10 faculdades, sendo 6 em Quelimane e 4 em Sofala (Beira e Dondo)",
          "12 faculdades em Maputo e Nampula",
          "Apenas a faculdade que ministra o curso de Direito"
        ],
        "correctIndex": 1,
        "explanation": "O Plano de Socialização fixa como meta 10 faculdades (100%), sendo 6 em Quelimane e 4 em Sofala (campi da Ponta-Gêa e Dondo).",
        "documentSource": "Plano de Socialização UniLicungo",
        "page": 3
      }
    ],
    "glossary": [
      {
        "term": "GAQ",
        "definition": "Gabinete de Avaliação e Qualidade da Universidade Licungo.",
        "officialSource": "Plano Institucional, p. 1"
      }
    ],
    "furtherReading": [
      {
        "docId": "plano-socializacao",
        "title": "Plano de Socialização UniLicungo",
        "articleOrPage": "Páginas 1 a 5"
      }
    ]
  },
  {
    "id": "modulo-6-qualificacao-cc",
    "title": "Módulo 6: Padrão da Qualificação em Ciência da Computação",
    "subtitle": "Os 9 ramos, as 32 unidades nucleares e a matriz de competências do Nível 7",
    "badge": "Estudo de Caso Prático",
    "estimatedMinutes": 35,
    "summary": "Estudo aprofundado do padrão curricular de Nível 7 desenhado conjuntamente por 18 IES moçambicanas sob coordenação da UEM/CNAQ. Estrutura dos 9 ramos, 32 disciplinas nucleares e matriz dos 10 descritores.",
    "keyConcepts": [
      {
        "term": "Nível 7 QNQ",
        "definition": "Enquadramento oficial da Licenciatura em Ciência da Computação (4 anos / 240 créditos).",
        "source": "Qualificação CC, p. 1"
      },
      {
        "term": "9 Ramos Profissionais",
        "definition": "Especializações: Software, Sistemas, Gestão, Cibersegurança, Auditoria, IA/Dados, Gráfica, Redes, Administração.",
        "source": "Qualificação CC, p. 2"
      },
      {
        "term": "32 Unidades Nucleares",
        "definition": "Base formativa comum e obrigatória para qualquer IES que ministre esta qualificação em Moçambique.",
        "source": "Qualificação CC, p. 5"
      }
    ],
    "stepByStepExplanation": [
      {
        "step": 1,
        "title": "Padrão Nacional",
        "detail": "Garante que o diplomado em Quelimane, Beira ou Maputo possua as mesmas competências nucleares reconhecidas.",
        "sourceRef": "Páginas 1 e 5"
      },
      {
        "step": 2,
        "title": "Disciplinas Nucleares vs. Ramos",
        "detail": "As 32 unidades são partilhadas por todos os ramos; cada ramo adiciona 5 unidades curriculares de especialização técnica.",
        "sourceRef": "Páginas 5 e 6"
      },
      {
        "step": 3,
        "title": "Perfil de Competências",
        "detail": "Cada ramo deve certificar explicitamente os 10 descritores do Artigo 14 do Decreto 61/2022.",
        "sourceRef": "Páginas 2 a 4"
      }
    ],
    "practicalExample": {
      "scenario": "A UniLicungo pretende oferecer o ramo de 'Inteligência Artificial e Ciência de Dados' na Licenciatura em Ciência da Computação.",
      "application": "Deve garantir as 32 disciplinas nucleares (desde Análise Matemática até IA básica) e integrar as 5 unidades específicas do ramo: Estatística Inferencial, IHC, Mineração de Dados/Big Data, Machine Learning, e Redes Neurais/NLP.",
      "justification": "O padrão aprovado pelo CNAQ exige o cumprimento integral do plano nuclear e das 5 unidades específicas para atribuição da menção de especialização do ramo no diploma.",
      "sourceDoc": "Qualificação de Ciência da Computação, p. 5 e 6"
    },
    "errorsToAvoid": [
      "Eliminar disciplinas da lista das 32 unidades nucleares sem autorização prévia do CNAQ.",
      "Conferir menção de ramo sem lecionar as 5 unidades curriculares complementares obrigatórias previstas no padrão nacional.",
      "Ignorar o requisito de Culminação do Curso (Unidade Curricular Nuclear n.º 32)."
    ],
    "revisionQuiz": [
      {
        "id": "q6-1",
        "question": "Quantas unidades curriculares nucleares obrigatórias integram o padrão nacional da Licenciatura em Ciência da Computação em Moçambique?",
        "type": "factual",
        "options": [
          "15 unidades curriculares",
          "24 unidades curriculares",
          "32 unidades curriculares",
          "40 unidades curriculares"
        ],
        "correctIndex": 2,
        "explanation": "O padrão nacional de Ciência da Computação fixa na Secção IV exactamente 32 unidades curriculares nucleares obrigatórias.",
        "documentSource": "Qualificação de Ciência da Computação",
        "page": 5
      }
    ],
    "glossary": [
      {
        "term": "Unidade Curricular Nuclear",
        "definition": "Disciplina fundamental obrigatória para todos os graduados da qualificação.",
        "officialSource": "Qualificação CC, p. 5"
      }
    ],
    "furtherReading": [
      {
        "docId": "qualificacao-cc",
        "title": "Padrão de Ciência da Computação",
        "articleOrPage": "Páginas 1 a 6"
      },
      {
        "docId": "decreto-61-2022",
        "title": "Decreto n.º 61/2022",
        "articleOrPage": "Artigo 12 e Anexo II"
      }
    ]
  }
];
