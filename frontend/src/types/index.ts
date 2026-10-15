export type ClassKey = 'bacterial_leaf_blight' | 'brown_spot' | 'healthy_leaf' | 'tungro_virus';

export type Language = 'en' | 'bn';

export interface PredictionResult {
  label: ClassKey | string;
  confidence: number;
  uncertain: boolean;
  probabilities: Record<string, number>;
  heatmap?: string | null;
}

export interface DiseaseDetail {
  id: ClassKey;
  name: {
    en: string;
    bn: string;
  };
  scientificName: string;
  type: 'bacterial' | 'fungal' | 'viral' | 'healthy';
  badgeColor: string;
  severity: {
    en: string;
    bn: string;
  };
  shortDescription: {
    en: string;
    bn: string;
  };
  symptoms: {
    en: string[];
    bn: string[];
  };
  causes: {
    en: string[];
    bn: string[];
  };
  management: {
    organic: {
      en: string[];
      bn: string[];
    };
    chemical: {
      en: string[];
      bn: string[];
    };
    prevention: {
      en: string[];
      bn: string[];
    };
  };
  sampleImages: string[];
  brriReference: string;
}

export interface ModelMetrics {
  accuracy: number;
  macro_f1: number;
  per_class: Record<
    string,
    {
      precision: number;
      recall: number;
      'f1-score': number;
      support: number;
    }
  >;
  confusion_matrix: number[][];
}

export interface UserFeedback {
  predictionId?: string;
  isAccurate: boolean | null;
  rating: number;
  comment: string;
}

export interface KnowledgeArticle {
  id: string;
  title: {
    en: string;
    bn: string;
  };
  category: {
    en: string;
    bn: string;
  };
  summary: {
    en: string;
    bn: string;
  };
  source: string;
  sourceUrl?: string;
}
