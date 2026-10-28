export interface PortalStats {
  totalDocuments: number;
  totalPages: number;
  totalArticles: number;
  totalQnqLevels: number;
  totalCineGeneralAreas: number;
  totalFacultiesUniLicungo: number;
  totalStudyModules: number;
  totalComparativeMatrices: number;
  totalGlossaryTerms: number;
  totalParticipatingIESInCC: number;
}

export const portalStats: PortalStats = {
  totalDocuments: 9,
  totalPages: 232,
  totalArticles: 153, // 58 (Lei 1/2023) + 73 (Decreto 43/2023) + 22 (Decreto 61/2022)
  totalQnqLevels: 10,
  totalCineGeneralAreas: 10,
  totalFacultiesUniLicungo: 10,
  totalStudyModules: 6,
  totalComparativeMatrices: 3,
  totalGlossaryTerms: 21,
  totalParticipatingIESInCC: 18
};
