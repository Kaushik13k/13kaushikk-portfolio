export interface PortfolioProjects {
  inProgress: boolean;
  projectArticle: string;
  projectDescription: string;
  projectImage: string;
  projectTitle: string;
  selectedTechnologies: string[];
  publishDate: string;
}

export const defaultProjects: PortfolioProjects[] = [];
