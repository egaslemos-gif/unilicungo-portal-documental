import { DocumentItem } from '../types';

export const documentsCatalog: DocumentItem[] = [
  {
    id: 'lei-1-2023',
    title: 'Lei n.º 1/2023, de 17 de Março — Lei do Ensino Superior',
    shortTitle: 'Lei do Ensino Superior (Lei 1/2023)',
    originalFilename: 'Lei n.º 1 2023 Lei do Ensino Superior (1).pdf',
    type: 'Lei',
    issuer: 'Assembleia da República de Moçambique',
    jurisdiction: 'Moçambique (Nacional)',
    numberAndDate: 'Lei n.º 1/2023, de 17 de Março',
    year: 2023,
    date: '17/03/2023',
    pageCount: 12,
    summary: 'Diploma legal estruturante que estabelece o regime jurídico do Subsistema do Ensino Superior em Moçambique, revogando a anterior Lei n.º 27/2009. Regula princípios, organização, graus académicos, autonomia, supervisão, e o Quadro Nacional de Qualificações de Ensino Superior (QUANQES).',
    objective: 'Estabelecer o regime jurídico do Subsistema do Ensino Superior, definindo as normas de organização, funcionamento, autonomia, ciclos de formação, acreditação da qualidade e tipologia das instituições no país.',
    mainThemes: [
      'Regime Jurídico do Ensino Superior',
      'Graus e Ciclos de Formação (Licenciatura, Mestrado, Doutoramento)',
      'Autonomia Institucional, Pedagógica e Científica',
      'Garantia de Qualidade e SINAQES (Art. 28 a 34)',
      'Quadro Nacional de Qualificações de Ensino Superior (QUANQES)',
      'Tipologia de IES (Universidades, Academias, Institutos Superiores, Faculdades/Escolas Superiores)',
      'Regime Disciplinar e Sancionatório'
    ],
    verificationStatus: 'Verificado com Fonte Oficial',
    pdfUrl: 'documents/lei-1-2023-ensino-superior.pdf',
    hasSearchableText: true,
    hasOcr: false,
    extractionNotes: 'Documento original publicado no Boletim da República (I Série, Número 53). Texto 100% pesquisável e transcrito integralmente com 7 capítulos e 58 artigos numerados e conferidos.',
    keyArticlesOrSections: [
      'Artigo 1 (Objecto)',
      'Artigo 3 (Definições operacionais)',
      'Artigo 7 (Ciclos de Formação e Duração)',
      'Artigo 12 a 15 (Graus Académicos)',
      'Artigo 24 (Autonomia das IES)',
      'Artigo 28 (SINAQES e QUANQES)',
      'Artigo 30 a 33 (Avaliação e Acreditação pelo CNAQ)',
      'Artigo 36 (Tipologia das Instituições)',
      'Artigo 57 (Revogação da Lei 27/2009)'
    ],
    crossReferences: [
      {
        targetDocId: 'decreto-43-2023',
        targetTitle: 'Decreto n.º 43/2023 (Regulamento de Licenciamento e Funcionamento das IES)',
        relationship: 'Regulamenta',
        description: 'O Decreto 43/2023 regulamenta especificamente os preceitos desta Lei relativos à criação, funcionamento e corpo docente das IES.',
        sourceExcerpt: 'Preâmbulo e Artigo 56 (Regulamentação) da Lei 1/2023.'
      },
      {
        targetDocId: 'decreto-61-2022',
        targetTitle: 'Decreto n.º 61/2022 (Quadro Nacional de Qualificações - QNQ)',
        relationship: 'Implementa',
        description: 'O Artigo 28, n.º 5 comanda a implementação do QUANQES em articulação com os níveis e descritores do QNQ.',
        sourceExcerpt: 'Artigo 28, n.º 5: "O órgão que assegura a implementação e supervisão do SINAQES, garante o desenho, o registo e a implementação do QUANQES".'
      },
      {
        targetDocId: 'qualificacao-cc',
        targetTitle: 'Padrão da Qualificação de Licenciatura em Ciência da Computação',
        relationship: 'Implementa',
        description: 'Materialização direta dos ciclos de formação (Nível 7) previstos na Lei.',
        sourceExcerpt: 'Artigo 7 e 13 da Lei 1/2023.'
      }
    ]
  },
  {
    id: 'decreto-43-2023',
    title: 'Decreto n.º 43/2023, de 28 de Agosto — Regulamento de Licenciamento e Funcionamento das IES',
    shortTitle: 'Regulamento de Licenciamento das IES (Decreto 43/2023)',
    originalFilename: 'Decreto 43_2023 Licenciamento e Funcionamento IES (1) (1).pdf',
    type: 'Decreto',
    issuer: 'Conselho de Ministros de Moçambique',
    jurisdiction: 'Moçambique (Nacional)',
    numberAndDate: 'Decreto n.º 43/2023, de 28 de Agosto',
    year: 2023,
    date: '28/08/2023',
    pageCount: 16,
    summary: 'Aprova o Regulamento de Licenciamento e Funcionamento das Instituições do Ensino Superior em Moçambique, revogando o Decreto n.º 46/2018. Estabelece a exigência central de organização por domínios de conhecimento (Artigo 4), rácios de corpo docente, alvarás, acreditação prévia e regime de supervisão.',
    objective: 'Regular o licenciamento, organização, funcionamento e supervisão das Instituições de Ensino Superior públicas e privadas em todo o território moçambicano.',
    mainThemes: [
      'Licenciamento e Autorização de Abertura de IES e Cursos',
      'Artigo 4: Domínios de Conhecimento e Áreas Específicas',
      'Requisitos Mínimos de Corpo Docente (Doutores e Mestres em Tempo Integral)',
      'Órgãos de Gestão e Governação Universitária',
      'Acreditação Prévia de Cursos pelo CNAQ',
      'Alvará de Funcionamento e Cadastro Nacional',
      'Supervisão, Fiscalização e Infrações'
    ],
    verificationStatus: 'Verificado com Fonte Oficial',
    pdfUrl: 'documents/decreto-43-2023-licenciamento-ies.pdf',
    hasSearchableText: true,
    hasOcr: false,
    extractionNotes: 'Publicado no Boletim da República (I Série, Número 166). Texto integral extraído e verificado, compreendendo 3 artigos no decreto e 73 artigos no Regulamento anexo.',
    keyArticlesOrSections: [
      'Artigo 1 do Decreto (Aprovação do Regulamento)',
      'Artigo 2 do Decreto (Revogação do Decreto 46/2018)',
      'Artigo 3 (Definições e Siglas)',
      'Artigo 4 (Domínios do Conhecimento)',
      'Artigo 11 a 15 (Composição e Qualificação do Corpo Docente)',
      'Artigo 22 a 26 (Processo de Criação e Licenciamento)',
      'Artigo 31 (Acreditação de Cursos)',
      'Artigo 47 a 53 (Taxas e Alvará)'
    ],
    crossReferences: [
      {
        targetDocId: 'lei-1-2023',
        targetTitle: 'Lei n.º 1/2023 (Lei do Ensino Superior)',
        relationship: 'Regulamenta',
        description: 'Desenvolve e executa os princípios de autorização, tipologia e qualidade previstos na Lei.',
        sourceExcerpt: 'Preâmbulo do Decreto 43/2023.'
      },
      {
        targetDocId: 'manual-cine',
        targetTitle: 'Manual de Domínios de Conhecimento CINE Brasil',
        relationship: 'Remete para',
        description: 'O Artigo 4 do Decreto 43/2023 fundamenta o manual técnico de domínios e áreas específicas distribuído pelo CNAQ às universidades.',
        sourceExcerpt: 'Artigo 4: "As IES devem organizar-se e os cursos estruturar-se segundo domínios de conhecimento e áreas específicas reconhecidas oficialmente".'
      },
      {
        targetDocId: 'plano-socializacao',
        targetTitle: 'Plano de Socialização de Domínios da UniLicungo',
        relationship: 'Implementa',
        description: 'A Universidade Licungo desenhou o plano institucional especificamente para conformar todos os seus cursos ao Artigo 4 deste Decreto.',
        sourceExcerpt: 'Título do Plano institucional: "...conforme artigo 4 decreto 43 de 2023".'
      }
    ]
  },
  {
    id: 'decreto-61-2022',
    title: 'Decreto n.º 61/2022, de 23 de Setembro — Cria o Quadro Nacional de Qualificações (QNQ)',
    shortTitle: 'Quadro Nacional de Qualificações — QNQ (Decreto 61/2022)',
    originalFilename: 'Decreto 61 2022 Cria o QNQ de 23 de Setembro.pdf',
    type: 'Decreto',
    issuer: 'Conselho de Ministros de Moçambique',
    jurisdiction: 'Moçambique (Nacional)',
    numberAndDate: 'Decreto n.º 61/2022, de 23 de Setembro',
    year: 2022,
    date: '23/09/2022',
    pageCount: 14,
    summary: 'Cria o Quadro Nacional de Qualificações (QNQ) em Moçambique, estruturado em 10 níveis de qualificação, articulando a Educação Geral, a Educação Profissional e o Ensino Superior. Define o glossário nacional, descritores de nível e matriz de competências (Conhecimento, Habilidades, Autonomia e Responsabilidade).',
    objective: 'Classificar, integrar e articular todas as qualificações do Sistema Nacional de Educação segundo padrões nacionais de garantia de qualidade, facilitando a aprendizagem ao longo da vida e a mobilidade de estudantes e profissionais.',
    mainThemes: [
      'Estrutura de 10 Níveis do QNQ',
      'Articulação entre Ensino Geral, Profissional e Superior',
      'Descritores de Nível em 10 Domínios de Competência',
      'Créditos Académicos e Equivalências',
      'Reconhecimento de Aprendizagem Prévia (RAP)',
      'Glossário Normativo Oficial (Anexo 1)',
      'Comissão Técnica do QNQ e Papel do CNAQ'
    ],
    verificationStatus: 'Verificado com Fonte Oficial',
    pdfUrl: 'documents/decreto-61-2022-qnq.pdf',
    hasSearchableText: true,
    hasOcr: true,
    extractionNotes: 'Publicado no Boletim da República (I Série, Número 185, com cabeçalho de 23 de Novembro em páginas subsequentes, gerando a divergência de datação citada no ofício do CNAQ). Artigos 1 a 22 extraídos e Anexos I, II, III e IV transcritos.',
    keyArticlesOrSections: [
      'Artigo 1 (Criação do QNQ)',
      'Artigo 2 (Natureza)',
      'Artigo 8 (Componentes do QNQ)',
      'Artigo 9 (Estrutura de Níveis 1 a 10)',
      'Artigo 10 (Descritores de Nível)',
      'Artigo 16 (Comissão Técnica)',
      'Anexo 1 (Glossário de Termos)',
      'Anexo 2 (Tabela de Níveis 1 a 10)'
    ],
    crossReferences: [
      {
        targetDocId: 'lei-1-2023',
        targetTitle: 'Lei n.º 1/2023 (Lei do Ensino Superior)',
        relationship: 'Baseia-se em',
        description: 'A Lei do Ensino Superior fundamenta o QUANQES directamente na arquitetura de níveis do QNQ.',
        sourceExcerpt: 'Artigo 28, n.º 5 da Lei 1/2023.'
      },
      {
        targetDocId: 'cnaq-harmonizacao',
        targetTitle: 'Ofício n.º 424/CNAQ/GP/363/24',
        relationship: 'Menciona',
        description: 'O CNAQ invoca expressamente o Decreto 61/2022 para solicitar a harmonização das qualificações do Ensino Superior.',
        sourceExcerpt: 'Ofício CNAQ: "O Quadro Nacional de Qualificações criado pelo Decreto 61/2022 visa integrar e harmonizar..."'
      },
      {
        targetDocId: 'qualificacao-cc',
        targetTitle: 'Qualificação de Licenciatura em Ciência da Computação',
        relationship: 'Implementa',
        description: 'Adota integralmente a matriz dos 10 descritores de competência do QNQ para o Nível 7.',
        sourceExcerpt: 'Secção II da Qualificação: "Descritores de Nível por Domínio de Competência".'
      }
    ],
    scansAvailable: ['decreto-61-2022-qnq_p5.png']
  },
  {
    id: 'manual-cine',
    title: 'Manual para Classificação dos Cursos de Graduação e Sequenciais — CINE Brasil (INEP/MEC)',
    shortTitle: 'Manual de Domínios de Conhecimento CINE Brasil',
    originalFilename: 'Manual - Domínios de Conhecimentos- GAQ- 24- Manual para classificacao dos cursos de graducacao e sequenciais conforme artigo 4 decreto 43 de 2023 (1) (1).pdf',
    type: 'Manual Técnico',
    issuer: 'INEP / Ministério da Educação do Brasil (Distribuído pelo CNAQ/GAQ)',
    jurisdiction: 'Brasil (Referência Comparativa / INEP-MEC)',
    numberAndDate: 'Edição INEP/MEC 2019 / Referenciado no âmbito do Art. 4 Decreto 43/2023',
    year: 2019,
    date: '2019 (Referência Técnica 2024)',
    pageCount: 164,
    summary: 'Manual metodológico completo de classificação de cursos superiores baseado na Classificação Internacional Normalizada da Educação (CINE/UNESCO) adaptada ao Brasil. Contém 10 Áreas Gerais, Áreas Específicas e Detalhadas, critérios de carga horária preponderante, 5 fluxogramas de decisão e extenso glossário.',
    objective: 'Fornecer taxonomia e regras objetivas para enquadrar cursos de graduação segundo o seu conteúdo temático, superando ambiguidades nas denominações comerciais ou arbitrárias dos cursos.',
    mainThemes: [
      'Estrutura Hierárquica CINE (Áreas Gerais 0 a 10, Específicas e Detalhadas)',
      'Critério do Conteúdo Programático (>50% de carga horária temática)',
      'Classificação de Licenciaturas (Área 01 Educação vs Área de Conteúdo)',
      '5 Fluxogramas de Decisão (Inicial, ABI, Licenciatura, Geral, Interdisciplinar)',
      'Cursos Interdisciplinares (Sufixo 88 / 8888)',
      'Glossário de Classificação Educacional',
      'Nota Crítica: Aplicação como Referência Comparativa na UniLicungo'
    ],
    verificationStatus: 'Referência Técnica Comparada',
    pdfUrl: 'documents/manual-dominios-conhecimento-cine.pdf',
    hasSearchableText: true,
    hasOcr: false,
    extractionNotes: 'Documento técnico de 164 páginas totalmente indexado. Contém fluxogramas detalhados nas páginas 70 a 82 e tabelas de códigos nas páginas 93 a 164.',
    keyArticlesOrSections: [
      'Capítulo 2 (Estrutura da Classificação CINE Brasil)',
      'Capítulo 3 (Critérios de Classificação)',
      'Capítulo 4 (Detalhamento das Áreas Gerais 00 a 10)',
      'Capítulo 5 (Fluxogramas 1 a 5, p. 70-82)',
      'Glossário (p. 87-90)',
      'Apêndices A, B, C e D (Tabelas de Rótulos e Códigos)'
    ],
    crossReferences: [
      {
        targetDocId: 'decreto-43-2023',
        targetTitle: 'Decreto n.º 43/2023 (Licenciamento IES)',
        relationship: 'Aplica subsidiariamente',
        description: 'Usado como instrumento técnico comparativo para operacionalizar o Artigo 4 (Domínios do Conhecimento).',
        sourceExcerpt: 'Capa do arquivo: "...conforme artigo 4 decreto 43 de 2023".'
      },
      {
        targetDocId: 'plano-socializacao',
        targetTitle: 'Plano de Socialização da UniLicungo',
        relationship: 'Adota como referência comparada',
        description: 'A metodologia do Plano de Socialização da UniLicungo visa socializar estes exatos domínios e áreas específicas com os directores de faculdade.',
        sourceExcerpt: 'Secção 1 do Plano da UniLicungo.'
      }
    ]
  },
  {
    id: 'plano-socializacao',
    title: 'Plano de Socialização dos Domínios de Conhecimento e Áreas Específicas da Universidade Licungo',
    shortTitle: 'Plano de Socialização UniLicungo (Outubro 2024)',
    originalFilename: 'Plano de Socializacao dos domnios de conhecimento (1).pdf',
    type: 'Plano Institucional',
    issuer: 'Universidade Licungo — Gabinete de Avaliação e Qualidade (GAQ)',
    jurisdiction: 'Moçambique (Institucional UniLicungo)',
    numberAndDate: 'N/Ref.ª 111/GAQ/UL/2024, de 08 de Outubro de 2024',
    year: 2024,
    date: '08/10/2024',
    pageCount: 5,
    summary: 'Plano de intervenção institucional da Universidade Licungo para harmonizar o enquadramento de todos os cursos das suas 10 faculdades nos domínios de conhecimento oficiais, contemplando 8 etapas de execução, sessões em Quelimane, Beira e Dondo, e indicadores de 100% de cobertura.',
    objective: 'Harmonizar a compreensão atinente à aplicação dos domínios de conhecimento e das respetivas áreas específicas na classificação dos cursos/programas em todas as faculdades da UniLicungo, segundo critérios e procedimentos uniformes.',
    mainThemes: [
      'Alinhamento Institucional com o Decreto 43/2023 e CNAQ',
      'Metodologia Participativa com as Direcções das Faculdades',
      '8 Etapas Metodológicas (Preparação, Agendamento, Sessões, Harmonização, Matriz, Relatório)',
      'Abrangência de 10 Faculdades (6 em Quelimane, 4 na Beira/Dondo)',
      'Cronograma de Sessões e Horários',
      'Meta de 100% dos Cursos Enquadrados e Catalogados'
    ],
    verificationStatus: 'Documento Institucional Interno',
    pdfUrl: 'documents/plano-socializacao-dominios.pdf',
    hasSearchableText: true,
    hasOcr: true,
    extractionNotes: 'Documento com texto selecionável e assinaturas/carimbos oficiais digitalizados nas 5 páginas. Contém tabelas de etapas, faculdades e proposta de programa.',
    keyArticlesOrSections: [
      'Página 1: Objectivo Geral, Objectivos Específicos e Metodologia',
      'Página 2: Tabela das 8 Etapas de Implementação e Resultados Esperados',
      'Página 3: Organização das Sessões, Participantes e Indicadores (100%)',
      'Página 4: Proposta de Programa por Faculdade (Quelimane e Beira)',
      'Página 5: Cronograma Horário Detalhado das Sessões'
    ],
    crossReferences: [
      {
        targetDocId: 'manual-cine',
        targetTitle: 'Manual CINE Brasil',
        relationship: 'Baseia-se em',
        description: 'Adota a matriz dos domínios e áreas específicas apresentadas no Manual como base de discussão institucional.',
        sourceExcerpt: 'Secção 3: "O GAQ deverá preparar previamente a matriz dos domínios, áreas específicas e lista dos cursos..."'
      },
      {
        targetDocId: 'decreto-43-2023',
        targetTitle: 'Decreto n.º 43/2023',
        relationship: 'Implementa',
        description: 'Cumpre a obrigação imposta às universidades pelo Artigo 4 do Decreto 43/2023.',
        sourceExcerpt: 'Enquadramento normativo do plano.'
      },
      {
        targetDocId: 'cnaq-harmonizacao',
        targetTitle: 'Ofício de Harmonização CNAQ',
        relationship: 'Complementa',
        description: 'Responde às diretrizes do CNAQ no processo nacional de consolidação de qualificações.',
        sourceExcerpt: 'Ofício CNAQ 424/2024.'
      }
    ],
    scansAvailable: [
      'plano-socializacao-dominios_p1.png',
      'plano-socializacao-dominios_p2.png',
      'plano-socializacao-dominios_p3.png',
      'plano-socializacao-dominios_p4.png',
      'plano-socializacao-dominios_p5.png'
    ]
  },
  {
    id: 'cnaq-harmonizacao',
    title: 'Ofício n.º 424/CNAQ/GP/363/24 e Nota n.º 36/GAQ/UniLicungo/2024 — Harmonização das Qualificações',
    shortTitle: 'Harmonização de Qualificações do Ensino Superior (CNAQ / GAQ)',
    originalFilename: '3-GAQ - CNAQ-contribuições para efeito de harmonizacao das qualificacoes do ensino superior (1).pdf',
    type: 'Comunicação Oficial',
    issuer: 'CNAQ / Universidade Licungo (GAQ)',
    jurisdiction: 'Moçambique (Nacional e Institucional)',
    numberAndDate: 'Nota CNAQ n.º 424/2024 (16/09/2024) e Ref.ª GAQ n.º 36/2024 (19/09/2024)',
    year: 2024,
    date: '19/09/2024',
    pageCount: 3,
    summary: 'Conjunto documental composto pela Nota n.º 36/GAQ do Director do GAQ ao Reitor da UniLicungo com despacho reitoral manuscrito favorável, e pelo Ofício n.º 424 do CNAQ assinado pela Presidente Maria Luísa Chicote Agibo, solicitando contribuições para harmonização das qualificações (Computação, Ciências Naturais, Agrárias e Matemática).',
    objective: 'Solicitar e tramitar institucionalmente as contribuições da Universidade Licungo para o desenho e validação das qualificações harmonizadas do Ensino Superior no âmbito do QNQ e da Lei 1/2023.',
    mainThemes: [
      'Tramitação Institucional e Despacho Reitoral (Prof. Doutor Boaventura Aleixo)',
      '6 Fases do Processo Nacional de Qualificações do CNAQ',
      'Qualificações Piloto: Computação, Química, Biologia, Física, Agropecuária e Matemática',
      'Prazo de Submissão de Contribuições (15 de Outubro de 2024)',
      'Workshops Regionais (Nov/Dez 2024) e Validação Final (Dezembro 2024)',
      'Identificação de Erros de Digitação Oficiais (Ano "2026" e Mês "Novembro")'
    ],
    verificationStatus: 'Transcrição Conferida com Limitações',
    pdfUrl: 'documents/cnaq-harmonizacao-qualificacoes.pdf',
    hasSearchableText: false,
    hasOcr: true,
    extractionNotes: 'Documento escaneado de 3 páginas sem texto original incorporado. Transcrito integralmente mediante OCR e conferência visual de alta resolução. Regista-se discrepância no texto do CNAQ que indica "23 de Novembro de 2022" para o Decreto 61/2022 (publicado em 23 de Setembro de 2022).',
    keyArticlesOrSections: [
      'Página 1: Nota 36/GAQ/UniLicungo/2024 com Despacho Reitoral de 27/09/2024',
      'Página 2: Ofício 424/CNAQ/GP/363/24 com as 6 fases do processo',
      'Página 3: Instruções de envio, contactos dos técnicos do CNAQ e assinatura da Presidente'
    ],
    crossReferences: [
      {
        targetDocId: 'decreto-61-2022',
        targetTitle: 'Decreto n.º 61/2022 (QNQ)',
        relationship: 'Menciona',
        description: 'Fundamento legal expresso da harmonização das qualificações.',
        sourceExcerpt: 'Página 2 do Ofício.'
      },
      {
        targetDocId: 'lei-1-2023',
        targetTitle: 'Lei n.º 1/2023 (Lei do Ensino Superior)',
        relationship: 'Menciona',
        description: 'Cita expressamente o Artigo 28, n.º 5 sobre a competência do CNAQ para o QUANQES.',
        sourceExcerpt: 'Página 2 do Ofício.'
      },
      {
        targetDocId: 'qualificacao-cc',
        targetTitle: 'Qualificação em Ciência da Computação',
        relationship: 'Implementa',
        description: 'É a proposta concreta anexada resultante da Fase 2 descrita no ofício.',
        sourceExcerpt: 'Página 2, item 2 e 3 do Ofício.'
      }
    ],
    scansAvailable: [
      'cnaq-harmonizacao-qualificacoes_p1.png',
      'cnaq-harmonizacao-qualificacoes_p2.png',
      'cnaq-harmonizacao-qualificacoes_p3.png'
    ]
  },
  {
    id: 'qualificacao-cc',
    title: 'Qualificação: Licenciado em Ciência da Computação (CNAQ — Dezembro 2023)',
    shortTitle: 'Qualificação Nacional: Ciência da Computação (Nível 7 QNQ)',
    originalFilename: 'Qualificacao da Ciencia da Computacao Ver12Set2024.pdf',
    type: 'Padrão Curricular',
    issuer: 'Conselho Nacional de Avaliação de Qualidade (CNAQ) com Universidade Licungo e outras IES',
    jurisdiction: 'Moçambique (Nacional)',
    numberAndDate: 'Versão de 12 de Setembro de 2024 (Desenho inicial Dezembro 2023)',
    year: 2024,
    date: '12/09/2024',
    pageCount: 6,
    summary: 'Documento técnico normativo que estabelece o padrão nacional de competências e plano curricular nuclear para a formação de Licenciados em Ciência da Computação (Nível 7 do QNQ), desenhado colaborativamente sob liderança da UEM e com a participação ativa da Universidade Licungo e mais 16 IES moçambicanas.',
    objective: 'Padronizar e harmonizar o perfil de competências e o núcleo curricular comum das licenciaturas em Ciência da Computação em todo o subsistema de Ensino Superior em Moçambique.',
    mainThemes: [
      'Estrutura da Qualificação no Nível 7 do QNQ',
      '9 Ramos de Especialização Profissional',
      '10 Descritores de Nível por Domínio de Competência',
      '32 Unidades Curriculares Nucleares Comuns',
      'Unidades Curriculares Complementares Específicas por Ramo',
      'Cooperação Interinstitucional entre IES Moçambicanas'
    ],
    verificationStatus: 'Verificado com Fonte Oficial',
    pdfUrl: 'documents/qualificacao-ciencia-computacao.pdf',
    hasSearchableText: true,
    hasOcr: false,
    extractionNotes: 'Documento digital de 6 páginas integralmente estruturado e verificado. Contém lista completa de participantes, ramos, descritores de competência e elenco disciplinar nuclear e complementar.',
    keyArticlesOrSections: [
      'Página 1: Lista das 18 IES participantes (incluindo Universidade Licungo) e Coordenador Carlos Cumbana (UEM)',
      'Página 2: I. Designação e 9 Ramos; II. Descritores 1 a 4',
      'Página 3: Descritores 5 a 10; III. Competências Complementares dos Ramos',
      'Página 4: Competências dos ramos de Segurança Cibernética, IA, Redes e Auditoria',
      'Página 5: IV. 32 Unidades Curriculares Nucleares; V. Ramos a e b',
      'Página 6: V. Ramos c a j com respetivas disciplinas complementares'
    ],
    crossReferences: [
      {
        targetDocId: 'decreto-61-2022',
        targetTitle: 'Decreto n.º 61/2022 (QNQ)',
        relationship: 'Baseia-se em',
        description: 'Adota ipsis verbis a estrutura dos 10 domínios de competência do Nível 7 do QNQ.',
        sourceExcerpt: 'Secção II da Qualificação.'
      },
      {
        targetDocId: 'cnaq-harmonizacao',
        targetTitle: 'Ofício CNAQ 424/2024',
        relationship: 'Complementa',
        description: 'Constitui a proposta concreta submetida à auscultação das IES para recolha de contribuições até 15 de Outubro de 2024.',
        sourceExcerpt: 'Ofício CNAQ, página 2, item 3.'
      }
    ]
  },
  {
    id: 'programa-auscultacao',
    title: 'Programa da Auscultação Pública das Convenções sobre o Reconhecimento de Qualificações',
    shortTitle: 'Programa da Auscultação Pública em Quelimane',
    originalFilename: 'Programa da Auscultacao - Centro - Quelimane (1)(1).pdf',
    type: 'Programa de Evento',
    issuer: 'Conselho Nacional de Avaliação de Qualidade (CNAQ)',
    jurisdiction: 'Moçambique (Nacional / Centro Quelimane)',
    numberAndDate: 'Sessão Centro - Quelimane, 27 de Setembro / Outubro',
    year: 2024,
    date: '27/10/2024',
    pageCount: 1,
    summary: 'Programa detalhado do evento de auscultação pública promovido pelo CNAQ no campus da Universidade Licungo em Quelimane sobre as Convenções Global e Continental (Adis Abeba) da UNESCO relativas ao Reconhecimento de Qualificações do Ensino Superior.',
    objective: 'Orientar o desenvolvimento da sessão de consulta pública às IES da região Centro sobre a ratificação das convenções internacionais de reconhecimento de estudos e diplomas.',
    mainThemes: [
      'Convenção Global sobre o Reconhecimento de Qualificações da UNESCO',
      'Convenção Continental de Adis Abeba (África)',
      'Mobilidade Académica Internacional e Regional',
      'Papel da Universidade Licungo como anfitriã e interveniente',
      'Debate e Inquérito de Avaliação aos Participantes',
      'Inconsistência Documental de Datas (Setembro vs Outubro)'
    ],
    verificationStatus: 'Transcrição Conferida com Limitações',
    pdfUrl: 'documents/programa-auscultacao-quelimane.pdf',
    hasSearchableText: true,
    hasOcr: false,
    extractionNotes: 'Documento de 1 página em formato tabela. Apresenta como data no cabeçalho "27 de Setembro de 2026", enquanto o convite oficial da Presidência do CNAQ marca o evento para "27 de Outubro de 2024" (ou 2026 por lapso tipográfico). Registo explícito da divergência cronológica.',
    keyArticlesOrSections: [
      '08:30-09:30: Registo de Participantes',
      '09:40-09:55: Notas de Boas-Vindas pelo Representante da UniLicungo',
      '09:55-10:15: Contextualização por MSc. Maereles Ribeiro',
      '10:15-10:35: Contextualização das Convenções por Dr. Custódio Tamele',
      '10:35-10:55: Apresentação das Convenções Global e Continental',
      '10:55-11:55: Sessão de Debate e Esclarecimentos',
      '12:10-12:20: Discurso de Encerramento pela UniLicungo'
    ],
    crossReferences: [
      {
        targetDocId: 'ies-zambezia',
        targetTitle: 'Convite às IES da Zambézia (Nota 411/GP/CNAQ)',
        relationship: 'Complementa',
        description: 'É o programa executivo correspondente ao convite oficial enviado às IES.',
        sourceExcerpt: 'Convite da Presidência do CNAQ.'
      },
      {
        targetDocId: 'lei-1-2023',
        targetTitle: 'Lei n.º 1/2023',
        relationship: 'Baseia-se em',
        description: 'Articula-se com o Artigo 19 da Lei do Ensino Superior que trata do reconhecimento de qualificações estrangeiras.',
        sourceExcerpt: 'Artigo 19 da Lei 1/2023.'
      }
    ]
  },
  {
    id: 'ies-zambezia',
    title: 'Nota n.º 411/GP/CNAQ/363/2024 — Convite para Auscultação Pública às IES da Zambézia',
    shortTitle: 'Convite CNAQ às IES da Zambézia (Auscultação Pública)',
    originalFilename: 'Instituições  IES Zambézia(4).pdf',
    type: 'Comunicação Oficial',
    issuer: 'Conselho Nacional de Avaliação de Qualidade (CNAQ) — Gabinete da Presidente',
    jurisdiction: 'Moçambique (Provincial Zambézia)',
    numberAndDate: 'Nota n.º 411/GP/CNAQ/363/2024 (ou 2026 no carimbo tipográfico), de 09 de Outubro',
    year: 2024,
    date: '09/10/2024',
    pageCount: 1,
    summary: 'Convite formal da Presidente do CNAQ, Prof.ª Doutora Maria Luísa Chicote Agibo, dirigido às Instituições do Ensino Superior da Província da Zambézia para participarem na sessão de auscultação pública sobre a ratificação das Convenções Global e Continental na sede da Universidade Licungo.',
    objective: 'Mobilizar a Direcção, corpo docente e estudantes das IES da Zambézia para a consulta pública referente ao reconhecimento internacional de graus e qualificações.',
    mainThemes: [
      'Convite Institucional às IES da Zambézia',
      'Realização na Universidade Licungo — Sede',
      'Ratificação da Convenção Global e Continental da UNESCO',
      'Composição da Delegação (15 participantes por IES)',
      'Enquadramento do CNAQ pelo Decreto 71/2023'
    ],
    verificationStatus: 'Transcrição Conferida com Limitações',
    pdfUrl: 'documents/ies-zambezia.pdf',
    hasSearchableText: false,
    hasOcr: true,
    extractionNotes: 'Documento escaneado de 1 página (digitalizado via CamScanner). Transcrição realizada e verificada visualmente na íntegra. Apresenta o ano datilografado como "2026", constituindo gralha documental em relação ao ciclo institucional de 2024.',
    keyArticlesOrSections: [
      'Cabeçalho com logótipo dos 50 Anos de Independência Nacional',
      'Referência ao Decreto 63/2007 e Decreto 71/2023 que regem o CNAQ',
      'Convocatória para dia 27 na Universidade Licungo — Sede (9:30h)',
      'Quota de 15 delegados por instituição',
      'Assinatura da Presidente do CNAQ'
    ],
    crossReferences: [
      {
        targetDocId: 'programa-auscultacao',
        targetTitle: 'Programa da Auscultação em Quelimane',
        relationship: 'Complementa',
        description: 'Programa oficial da sessão convocada por este convite.',
        sourceExcerpt: 'Texto do convite.'
      },
      {
        targetDocId: 'cnaq-harmonizacao',
        targetTitle: 'Ofício de Harmonização das Qualificações',
        relationship: 'Complementa',
        description: 'Enquadra-se no mesmo pacote de iniciativas do CNAQ em Setembro/Outubro de 2024 para reforço da mobilidade académica.',
        sourceExcerpt: 'Parágrafo 2 do Convite.'
      }
    ],
    scansAvailable: ['ies-zambezia_p1.png']
  }
];
