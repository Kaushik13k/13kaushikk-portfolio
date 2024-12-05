export interface PortfolioProjects {
  id: string;
  inProgress: boolean;
  projectArticle: string;
  projectDescription: string;
  projectImage: string;
  projectTitle: string;
  selectedTechnologies: string[];
  publishDate: string;
}

export const defaultProjects: PortfolioProjects[] = [];
