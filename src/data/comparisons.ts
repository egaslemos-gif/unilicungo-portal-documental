import { DocumentComparison } from '../types';

export const documentComparisons: DocumentComparison[] = [
  {
    "id": "comp-1",
    "title": "Lei n.º 1/2023 vs. Antiga Lei n.º 27/2009",
    "category": "Enquadramento Geral",
    "documentsInvolved": [
      {
        "docId": "lei-1-2023",
        "docTitle": "Lei n.º 1/2023 (Actual)",
        "jurisdiction": "Moçambique (Nacional)"
      },
      {
        "docId": "lei-27-2009",
        "docTitle": "Lei n.º 27/2009 (Revogada)",
        "jurisdiction": "Moçambique (Nacional)"
      }
    ],
    "comparisonPoints": [
      {
        "aspect": "Quadro de Qualificações e Garantia de Qualidade",
        "analysis": "A Lei 1/2023 integra explicitamente o QUANQES ao Sistema Nacional de Garantia de Qualidade (Art. 28), vinculando a acreditação aos descritores do QNQ (Decreto 61/2022). A Lei 27/2009 não possuía essa articulação direta.",
        "docPositions": [
          {
            "docId": "lei-1-2023",
            "position": "Artigo 28, n.º 5",
            "excerpt": "O órgão que assegura a implementação e supervisão do SINAQES, garante o desenho, o registo e a implementação do QUANQES.",
            "provenance": "Lei 1/2023"
          },
          {
            "docId": "lei-27-2009",
            "position": "Regime Geral",
            "excerpt": "Focava em avaliação sem integração formal a uma grelha de 10 níveis de qualificações.",
            "provenance": "Histórico"
          }
        ],
        "differencesOrEquivalences": "Inovação profunda na Lei 1/2023: obrigatoriedade de alinhamento com a grelha de competências do QNQ e padronização por padrões nacionais.",
        "cautionNote": "Qualquer menção a normas ou artigos da Lei 27/2009 em regulamentos internos antigos da UniLicungo deve ser urgentemente atualizada para a Lei 1/2023."
      },
      {
        "aspect": "Ciclos de Formação e Duração da Licenciatura",
        "analysis": "A Lei 1/2023 clarifica os ciclos de formação e a culminação de curso, exigindo trabalho de fim de curso ou estágio comprovado para o Nível 7/8.",
        "docPositions": [
          {
            "docId": "lei-1-2023",
            "position": "Artigo 7 e 12",
            "excerpt": "O 1º ciclo corresponde à Licenciatura, com duração normal de 4 anos e mínimo de 240 créditos académicos.",
            "provenance": "Lei 1/2023"
          }
        ],
        "differencesOrEquivalences": "Consolidação da duração de 4 anos como regra geral para graus académicos de Nível 7.",
        "cautionNote": "Cursos com duração superior a 4 anos e estágio mínimo de 1 ano enquadram-se excecionalmente no Nível 8 (Art. 12 alínea b do Decreto 61/2022)."
      }
    ]
  },
  {
    "id": "comp-2",
    "title": "Decreto n.º 43/2023 vs. Antigo Decreto n.º 46/2018",
    "category": "Obrigações das IES",
    "documentsInvolved": [
      {
        "docId": "decreto-43-2023",
        "docTitle": "Decreto n.º 43/2023 (Actual)",
        "jurisdiction": "Moçambique (Nacional)"
      },
      {
        "docId": "decreto-46-2018",
        "docTitle": "Decreto n.º 46/2018 (Revogado)",
        "jurisdiction": "Moçambique (Nacional)"
      }
    ],
    "comparisonPoints": [
      {
        "aspect": "Estruturação por Domínios do Conhecimento (Artigo 4)",
        "analysis": "O Decreto 43/2023 introduz no seu Artigo 4 a obrigatoriedade imperativa de todas as IES estruturarem faculdades e cursos segundo domínios de conhecimento e áreas específicas oficialmente reconhecidas.",
        "docPositions": [
          {
            "docId": "decreto-43-2023",
            "position": "Artigo 4",
            "excerpt": "As IES devem organizar-se e os cursos estruturar-se segundo domínios de conhecimento e áreas específicas reconhecidas oficialmente.",
            "provenance": "Decreto 43/2023"
          }
        ],
        "differencesOrEquivalences": "O normativo anterior (Decreto 46/2018) permitia designações e arranjos departamentais casuísticos sem padrão taxonómico nacional uniforme.",
        "cautionNote": "Motivo direto pelo qual a UniLicungo teve de elaborar o seu Plano de Socialização com o GAQ."
      },
      {
        "aspect": "Rácios de Corpo Docente e Titulação Mínima",
        "analysis": "Exigência de percentagem fixa de doutores e mestres em regime de tempo integral para cada domínio em funcionamento.",
        "docPositions": [
          {
            "docId": "decreto-43-2023",
            "position": "Artigo 11 e 12",
            "excerpt": "Exigência de corpo docente qualificado em tempo integral proporcional ao número de estudantes e cursos ministrados.",
            "provenance": "Decreto 43/2023"
          }
        ],
        "differencesOrEquivalences": "Endurecimento dos critérios de fiscalização e inspeção de alvarás de funcionamento."
      }
    ]
  },
  {
    "id": "comp-3",
    "title": "QNQ Moçambique (Decreto 61/2022) vs. CINE Brasil (INEP/MEC)",
    "category": "Classificação de Áreas",
    "documentsInvolved": [
      {
        "docId": "decreto-61-2022",
        "docTitle": "Decreto n.º 61/2022 (QNQ Moçambique)",
        "jurisdiction": "Moçambique (Nacional)"
      },
      {
        "docId": "manual-cine",
        "docTitle": "Manual CINE Brasil 2018 (Referencial Técnico)",
        "jurisdiction": "Brasil (Referência Comparada)"
      }
    ],
    "comparisonPoints": [
      {
        "aspect": "Natureza Jurídica e Obrigatoriedade",
        "analysis": "O Decreto 61/2022 é lei nacional vinculativa da República de Moçambique que estabelece 10 níveis verticais de qualificação. O Manual CINE Brasil é uma classificação horizontal internacional adotada pelo CNAQ a título de guia técnico para preencher a exigência do Artigo 4 do Decreto 43/2023.",
        "docPositions": [
          {
            "docId": "decreto-61-2022",
            "position": "Artigo 1 e 2",
            "excerpt": "É criado o QNQ como instrumento de referência e padronização nacional... aprovado em Conselho de Ministros.",
            "provenance": "Moçambique"
          },
          {
            "docId": "manual-cine",
            "position": "Manual Técnico INEP/MEC",
            "excerpt": "Instrumento brasileiro de classificação de cursos superiores baseado no ISCED-F da UNESCO.",
            "provenance": "Brasil"
          }
        ],
        "differencesOrEquivalences": "O QNQ classifica níveis de profundidade formativa (1 a 10). O CINE classifica campos temáticos de estudo (Áreas 00 a 10).",
        "cautionNote": "NÃO confundir os '10 Níveis do QNQ' com as '10 Áreas Gerais do CINE'. São dois eixos ortogonais: QNQ é vertical (graus/complexidade) e CINE é horizontal (disciplinas/conhecimento)."
      }
    ]
  }
];
