export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface UploadAnalysisResponse {
  message: string;
  fileName: string;
  status: string;
  analysis: RepositoryAnalysisResult;
}

export interface RepositoryAnalysisResult {

  projectName: string;

  primaryLanguage: string;

  primaryFramework: string;

  architecture: string;

  fileCount: number;

  javaFileCount: number;

  typescriptFileCount: number;

  htmlFileCount: number;

  controllerCount: number;

  serviceCount: number;

  repositoryCount: number;

  modelCount: number;

  angularComponentCount: number;

  apiEndpointCount: number;

  functionalDescription: string;

  evidence: string[];

  findings: string[];

  recommendations: string[];

  risks: string[];

  persistenceTechnologies: string[];

  databases: string[];

  consumedApis: string[];
}