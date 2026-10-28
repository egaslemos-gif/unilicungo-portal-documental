import { CineArea, CineFlowchartStep } from '../types';

export const cineNotice = {
  title: 'Origem e Estatuto Jurídico do Manual CINE',
  text: 'O manual disponibilizado pelo CNAQ é a versão adaptada pelo INEP/MEC do Brasil (CINE Brasil 2018 / UNESCO ISCED-F 2013). Em Moçambique, é adoptado como referencial técnico comparativo e operacional para dar cumprimento ao Artigo 4 do Decreto 43/2023, não constituindo lei nacional substantiva moçambicana, mas sim padrão orientador de garantia de qualidade.',
  referenceDoc: 'Manual - Domínios de Conhecimentos - GAQ/CNAQ 2024'
};

export const cineAreas: CineArea[] = [
  {
    "code": "00",
    "name": "Programas Básicos",
    "level": "geral",
    "description": "Programas de formação geral e inicial, competências transversais básicas de literacia, numeracia e desenvolvimento pessoal.",
    "criteria": "Programas sem especialização disciplinar técnica ou profissional.",
    "pageReference": 28
  },
  {
    "code": "001",
    "name": "Programas e qualificações básicas",
    "level": "especifica",
    "parentCode": "00",
    "description": "Cursos genéricos de alfabetização, formação cívica e competências básicas.",
    "pageReference": 29
  },
  {
    "code": "01",
    "name": "Educação",
    "level": "geral",
    "description": "Formação de professores, formadores, educadores de infância, ciências da educação e avaliação educacional.",
    "criteria": "Compreende cursos cujo objectivo explícito é a formação docente para qualquer nível de ensino ou o estudo científico dos processos pedagógicos.",
    "examples": [
      "Licenciatura em Ensino de Português",
      "Licenciatura em Ensino de Matemática",
      "Pedagogia",
      "Ciências da Educação"
    ],
    "inclusions": [
      "Formação de professores de disciplinas específicas (articulando conteúdo científico e didáctica)."
    ],
    "exclusions": [
      "Cursos de bacharelato científico puro sem componente pedagógica (ex: Física pura classifica-se em 05)."
    ],
    "pageReference": 32
  },
  {
    "code": "011",
    "name": "Educação (Formação de Professores e Ciências da Educação)",
    "level": "especifica",
    "parentCode": "01",
    "description": "Cursos destinados à docência em disciplinas gerais e ciências pedagógicas.",
    "pageReference": 34
  },
  {
    "code": "0111",
    "name": "Ciências da Educação",
    "level": "detalhada",
    "parentCode": "011",
    "description": "Estudo teórico e experimental da educação, organização curricular, didáctica e avaliação.",
    "pageReference": 36
  },
  {
    "code": "0112",
    "name": "Formação de Professores para a Educação Pré-Escolar",
    "level": "detalhada",
    "parentCode": "011",
    "description": "Formação docente dedicada à primeira infância e desenvolvimento inicial.",
    "pageReference": 38
  },
  {
    "code": "0113",
    "name": "Formação de Professores do Ensino Primário",
    "level": "detalhada",
    "parentCode": "011",
    "description": "Docência do 1º ao 6º ciclo de escolaridade primária.",
    "pageReference": 40
  },
  {
    "code": "0114",
    "name": "Formação de Professores em Disciplinas Específicas (Secundário)",
    "level": "detalhada",
    "parentCode": "011",
    "description": "Ensino de Biologia, Química, Física, História, Geografia, Línguas, Matemática.",
    "pageReference": 42
  },
  {
    "code": "02",
    "name": "Artes e Humanidades",
    "level": "geral",
    "description": "Estudo das artes visuais, música, artes performativas, línguas e literatura, história, filosofia e teologia.",
    "criteria": "Foco na criação estética, interpretação cultural, património histórico e estudos linguísticos.",
    "examples": [
      "Língua e Literatura Portuguesa",
      "Filosofia",
      "História",
      "Música",
      "Design"
    ],
    "pageReference": 46
  },
  {
    "code": "021",
    "name": "Artes",
    "level": "especifica",
    "parentCode": "02",
    "description": "Belas artes, artes visuais, cinema, música, dança e design de moda/produto.",
    "pageReference": 48
  },
  {
    "code": "022",
    "name": "Humanidades (excepto Línguas)",
    "level": "especifica",
    "parentCode": "02",
    "description": "História, arqueologia, filosofia, ética e estudos religiosos.",
    "pageReference": 54
  },
  {
    "code": "023",
    "name": "Línguas e Estudos Culturais",
    "level": "especifica",
    "parentCode": "02",
    "description": "Línguas nacionais moçambicanas, língua portuguesa, línguas estrangeiras (Inglês, Francês), tradução e interpretação.",
    "pageReference": 60
  },
  {
    "code": "03",
    "name": "Ciências Sociais, Jornalismo e Informação",
    "level": "geral",
    "description": "Estudo da sociedade humana, comportamento individual e coletivo, economia, sociologia, ciência política e comunicação social.",
    "criteria": "Investigação dos fenómenos sociais e mediação informativa.",
    "examples": [
      "Sociologia",
      "Economia",
      "Antropologia",
      "Jornalismo",
      "Ciência Política"
    ],
    "pageReference": 66
  },
  {
    "code": "031",
    "name": "Ciências Sociais e Comportamentais",
    "level": "especifica",
    "parentCode": "03",
    "description": "Economia, sociologia, antropologia, psicologia social e ciências políticas.",
    "pageReference": 68
  },
  {
    "code": "032",
    "name": "Jornalismo e Comunicação Social",
    "level": "especifica",
    "parentCode": "03",
    "description": "Jornalismo de imprensa e audiovisual, relações públicas e ciências da informação.",
    "pageReference": 74
  },
  {
    "code": "04",
    "name": "Negócios, Administração e Direito",
    "level": "geral",
    "description": "Ciências empresariais, contabilidade, gestão financeira, marketing e ordenamento jurídico.",
    "criteria": "Organização económica, direcção de empresas públicas e privadas, regulação jurídica.",
    "examples": [
      "Gestão de Empresas",
      "Contabilidade e Auditoria",
      "Direito",
      "Marketing",
      "Finanças"
    ],
    "pageReference": 78
  },
  {
    "code": "041",
    "name": "Negócios e Administração",
    "level": "especifica",
    "parentCode": "04",
    "description": "Contabilidade, fiscalidade, administração e gestão, finanças, seguros e marketing.",
    "pageReference": 80
  },
  {
    "code": "042",
    "name": "Direito",
    "level": "especifica",
    "parentCode": "04",
    "description": "Direito público e privado, prática jurídica, direito internacional e constitucional.",
    "pageReference": 88
  },
  {
    "code": "05",
    "name": "Ciências Naturais, Matemática e Estatística",
    "level": "geral",
    "description": "Ciências físicas, biológicas e químicas, ciências da terra, matemática pura e aplicada e modelação estatística.",
    "criteria": "Estudo do mundo natural e leis fundamentais da matéria, energia e estruturas matemáticas.",
    "examples": [
      "Biologia",
      "Química",
      "Física",
      "Matemática",
      "Geologia",
      "Estatística"
    ],
    "pageReference": 92
  },
  {
    "code": "051",
    "name": "Ciências Biológicas e afins",
    "level": "especifica",
    "parentCode": "05",
    "description": "Biologia, bioquímica, botânica, zoologia e genética.",
    "pageReference": 94
  },
  {
    "code": "052",
    "name": "Ambiente e Ciências da Terra",
    "level": "especifica",
    "parentCode": "05",
    "description": "Geologia, meteorologia, oceanografia e ciências ecológicas.",
    "pageReference": 98
  },
  {
    "code": "053",
    "name": "Ciências Físicas e Químicas",
    "level": "especifica",
    "parentCode": "05",
    "description": "Física experimental e teórica, química analítica e inorgânica.",
    "pageReference": 102
  },
  {
    "code": "054",
    "name": "Matemática e Estatística",
    "level": "especifica",
    "parentCode": "05",
    "description": "Álgebra, cálculo, análise numérica, probabilidade e estatística.",
    "pageReference": 106
  },
  {
    "code": "06",
    "name": "Tecnologias de Informação e Comunicação (TIC)",
    "level": "geral",
    "description": "Computação, engenharia de software, sistemas de informação, redes, cibersegurança e inteligência artificial.",
    "criteria": "Concepção, programação, análise e administração de sistemas informáticos e bases de dados.",
    "examples": [
      "Ciência da Computação",
      "Engenharia Informática",
      "Sistemas de Informação",
      "Redes de Computadores",
      "Segurança Cibernética"
    ],
    "inclusions": [
      "Desenvolvimento de software, inteligência artificial, computação gráfica, administração de redes."
    ],
    "exclusions": [
      "Engenharia electrotécnica/telecomunicações de hardware e física do sinal classifica-se em 07."
    ],
    "pageReference": 110
  },
  {
    "code": "061",
    "name": "Tecnologias de Informação e Comunicação",
    "level": "especifica",
    "parentCode": "06",
    "description": "Informática teórica e aplicada, programação e infraestruturas digitais.",
    "pageReference": 112
  },
  {
    "code": "0611",
    "name": "Ciência da Computação e Engenharia de Software",
    "level": "detalhada",
    "parentCode": "061",
    "description": "Algoritmos, linguagens de programação, desenvolvimento de software, arquitetura computacional.",
    "examples": [
      "Licenciatura em Ciência da Computação (Qualificação Nacional QNQ 7)"
    ],
    "pageReference": 114
  },
  {
    "code": "0612",
    "name": "Sistemas de Informação e Gestão de Dados",
    "level": "detalhada",
    "parentCode": "061",
    "description": "Modelação de dados, business intelligence, Big Data, administração de bases de dados.",
    "pageReference": 116
  },
  {
    "code": "0613",
    "name": "Redes de Computadores e Cibersegurança",
    "level": "detalhada",
    "parentCode": "061",
    "description": "Comunicação de dados, infraestruturas de rede, segurança cibernética e auditoria de sistemas.",
    "pageReference": 118
  },
  {
    "code": "07",
    "name": "Engenharia, Produção e Construção",
    "level": "geral",
    "description": "Engenharias clássicas (mecânica, civil, eléctrica, química), processos industriais e planeamento físico/arquitetura.",
    "criteria": "Concepção, fabrico, construção e manutenção de estruturas materiais e máquinas.",
    "examples": [
      "Engenharia Civil",
      "Engenharia Electrónica",
      "Arquitectura",
      "Planeamento Físico",
      "Construção"
    ],
    "pageReference": 120
  },
  {
    "code": "071",
    "name": "Engenharia e Profissões Afins",
    "level": "especifica",
    "parentCode": "07",
    "description": "Engenharia mecânica, eléctrica, electrónica, química e industrial.",
    "pageReference": 122
  },
  {
    "code": "072",
    "name": "Indústrias Transformadoras e Processamento",
    "level": "especifica",
    "parentCode": "07",
    "description": "Processamento alimentar, têxtil, materiais e mineração.",
    "pageReference": 130
  },
  {
    "code": "073",
    "name": "Arquitectura e Construção",
    "level": "especifica",
    "parentCode": "07",
    "description": "Edificações, engenharia civil, topografia, planeamento físico e ordenamento territorial.",
    "pageReference": 134
  },
  {
    "code": "08",
    "name": "Agricultura, Silvicultura, Pescas e Veterinária",
    "level": "geral",
    "description": "Produção agropecuária, agronomia, exploração florestal sustentável, aquacultura e medicina veterinária.",
    "criteria": "Cultivo de plantas, criação de animais, gestão de recursos naturais renováveis.",
    "examples": [
      "Engenharia Agronómica",
      "Medicina Veterinária",
      "Aquacultura",
      "Engenharia Florestal"
    ],
    "pageReference": 140
  },
  {
    "code": "081",
    "name": "Agricultura e Pecuária",
    "level": "especifica",
    "parentCode": "08",
    "description": "Produção vegetal, horticultura, protecção vegetal e zootecnia.",
    "pageReference": 142
  },
  {
    "code": "082",
    "name": "Silvicultura e Maneio Florestal",
    "level": "especifica",
    "parentCode": "08",
    "description": "Gestão de florestas e recursos madeireiros.",
    "pageReference": 146
  },
  {
    "code": "083",
    "name": "Pescas e Aquacultura",
    "level": "especifica",
    "parentCode": "08",
    "description": "Gestão costeira, captura marinha e cultivo aquícola.",
    "pageReference": 148
  },
  {
    "code": "084",
    "name": "Veterinária",
    "level": "especifica",
    "parentCode": "08",
    "description": "Clínica animal, sanidade pecuária e saúde pública veterinária.",
    "pageReference": 150
  },
  {
    "code": "09",
    "name": "Saúde e Bem-Estar",
    "level": "geral",
    "description": "Medicina humana, enfermagem, farmácia, nutrição, odontologia e serviços sociais de saúde.",
    "criteria": "Diagnóstico, tratamento médico, reabilitação física e promoção da saúde humana.",
    "examples": [
      "Medicina Geral",
      "Enfermagem",
      "Farmácia",
      "Nutrição",
      "Saúde Pública"
    ],
    "pageReference": 152
  },
  {
    "code": "091",
    "name": "Saúde (Medicina, Enfermagem, Farmácia)",
    "level": "especifica",
    "parentCode": "09",
    "description": "Medicina humana, estomatologia, farmácia, análises clínicas e enfermagem geral.",
    "pageReference": 154
  },
  {
    "code": "092",
    "name": "Bem-Estar e Serviços Sociais",
    "level": "especifica",
    "parentCode": "09",
    "description": "Apoio a idosos, infância desfavorecida e reabilitação psicossocial.",
    "pageReference": 160
  },
  {
    "code": "10",
    "name": "Serviços",
    "level": "geral",
    "description": "Serviços pessoais, turismo, hotelaria, transportes, segurança pública e protecção civil.",
    "criteria": "Prestação de serviços operacionais ao público e gestão de segurança.",
    "examples": [
      "Gestão Hoteleira",
      "Turismo",
      "Gestão de Transportes",
      "Segurança Comunitária"
    ],
    "pageReference": 162
  },
  {
    "code": "101",
    "name": "Serviços Pessoais (Hotelaria e Turismo)",
    "level": "especifica",
    "parentCode": "10",
    "description": "Alojamento, restauração, lazer e guiamento turístico.",
    "pageReference": 163
  },
  {
    "code": "102",
    "name": "Serviços de Higiene e Saúde Ocupacional",
    "level": "especifica",
    "parentCode": "10",
    "description": "Higiene no trabalho e saneamento básico.",
    "pageReference": 164
  },
  {
    "code": "103",
    "name": "Serviços de Segurança e Protecção",
    "level": "especifica",
    "parentCode": "10",
    "description": "Polícia, protecção contra incêndios, segurança privada e tráfego.",
    "pageReference": 164
  }
];

export const cineFlowchartSteps: CineFlowchartStep[] = [
  {
    "id": "cine-step-1",
    "flowchartName": "Procedimento de Enquadramento do Curso",
    "stepNumber": 1,
    "title": "Análise da Carga Horária Curricular",
    "description": "Identificar o núcleo predominante do plano de estudos, somando a carga horária das disciplinas nucleares para verificar qual domínio representa 50% ou mais da formação.",
    "conditionOrDecision": "A carga horária preponderante define o Domínio de Conhecimento Geral inicial.",
    "responsible": "Comissão Científica do Curso / Direcção da Faculdade",
    "nextStepId": "cine-step-2",
    "sourceReference": "Manual CINE Brasil, p. 16-17"
  },
  {
    "id": "cine-step-2",
    "flowchartName": "Procedimento de Enquadramento do Curso",
    "stepNumber": 2,
    "title": "Verificação de Objectivos e Perfil de Saída",
    "description": "Em cursos interdisciplinares onde nenhum domínio atinge 50% isoladamente, avaliar o perfil profissional e o campo ocupacional de atuação primária dos graduados.",
    "conditionOrDecision": "Se o perfil for pedagógico/docência, enquadra obrigatoriamente na Área Geral 01 (Educação), mesmo que ensine Física ou Química.",
    "responsible": "Gabinete de Avaliação e Qualidade (GAQ)",
    "nextStepId": "cine-step-3",
    "sourceReference": "Manual CINE Brasil, p. 18-20; Ofício CNAQ 424/2024"
  },
  {
    "id": "cine-step-3",
    "flowchartName": "Procedimento de Enquadramento do Curso",
    "stepNumber": 3,
    "title": "Selecção da Área Específica e Detalhada",
    "description": "Navegar na árvore hierárquica do domínio selecionado para escolher a área específica (3 dígitos) e a área detalhada (4 dígitos) mais ajustada à matriz curricular.",
    "conditionOrDecision": "Consultar as notas de inclusão e exclusão do Manual CINE para evitar confusão entre engenharias e ciências puras.",
    "responsible": "GAQ e Departamento Académico",
    "nextStepId": "cine-step-4",
    "sourceReference": "Manual CINE Brasil, p. 24"
  },
  {
    "id": "cine-step-4",
    "flowchartName": "Procedimento de Enquadramento do Curso",
    "stepNumber": 4,
    "title": "Submissão e Validação Institucional",
    "description": "Apresentação e validação na sessão de socialização da faculdade, registando divergências na matriz preliminar da UniLicungo para homologação superior.",
    "conditionOrDecision": "Se houver divergência não resolvida, submete-se ao parecer técnico da Comissão Central do GAQ e CNAQ.",
    "responsible": "Conselho de Direcção da Faculdade e Reitoria",
    "nextStepId": null,
    "sourceReference": "Plano de Socialização UniLicungo, Etapas 3, 4 e 6"
  }
];
