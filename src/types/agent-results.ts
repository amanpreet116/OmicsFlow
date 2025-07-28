// src/types/agent-results.ts
export interface OmicsResultData {
  analysisTitle: string;
  stats: {
    samplesAnalyzed: number;
    genesIdentified: number;
    pathways: number;
    biomarkers: number;
  };
  keyFindings: Array<{
    title: string;
    description: string;
    significance: 'high' | 'medium' | 'low';
    pValue?: string;
  }>;
  pathwayAnalysis: Array<{
    name: string;
    description: string;
    pValue: string;
    geneCount: number;
    enrichmentScore: number;
  }>;
  genomicData: {
    variants: Array<{
      gene: string;
      position: string;
      alleleFrequency: number;
      impact: 'high' | 'moderate' | 'low';
      description: string;
    }>;
  };
  methodology: {
    dataTypes: string[];
    sampleSize: {
      cases: number;
      controls: number;
    };
    platforms: string[];
    analysisTools: string[];
  };
}

export interface ChemistResultData {
  compoundName: string;
  molecularProperties: {
    molecularFormula: string;
    molecularWeight: number;
    logP: number;
    solubility: string;
    smiles: string;
    polarSurfaceArea: number;
  };
  drugLikeness: {
    score: number;
    rules: Array<{
      name: string;
      description: string;
      passed: boolean;
      value: string;
    }>;
  };
  detailedProperties: Array<{
    name: string;
    value: string;
    unit: string;
    description: string;
  }>;
  admetProperties: Array<{
    property: string;
    value: string | number;
    prediction: 'Good' | 'Moderate' | 'Poor';
    confidence: number;
  }>;
}

export interface GeneAnalystResultData {
  analysisTitle: string;
  geneSymbol?: string;
  stats: {
    variantsAnalyzed: number;
    pathogenicVariants: number;
    expressionSamples: number;
    clinicalAssociations: number;
  };
  geneInfo: {
    symbol: string;
    fullName: string;
    chromosome: string;
    geneType: string;
    function: string;
  };
  keyFindings: Array<{
    title: string;
    description: string;
    significance: 'high' | 'medium' | 'low';
  }>;
  variants: Array<{
    variantId: string;
    position: string;
    consequence: string;
    clinicalSignificance: 'Pathogenic' | 'Likely pathogenic' | 'VUS' | 'Benign';
    alleleFrequency: number;
    caddScore: number;
    dbsnpId: string;
  }>;
}

export interface LiteratureReviewerResultData {
  reviewTitle: string;
  stats: {
    articlesReviewed: number;
    keyInsights: number;
    citations: number;
    evidenceLevel: string;
  };
  summary: string;
  keyInsights: Array<{
    title: string;
    description: string;
    evidenceStrength: 'strong' | 'moderate' | 'weak';
    citations: number;
  }>;
  methodology: {
    searchStrategy: string;
    inclusionCriteria: string[];
    exclusionCriteria: string[];
    databases: string[];
  };
}
