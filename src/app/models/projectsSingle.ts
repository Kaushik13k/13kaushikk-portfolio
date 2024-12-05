export interface PortfolioProjectSingle {
  id: string;
  inProgress: boolean;
  projectArticle: string;
  projectDescription: string;
  projectImage: string;
  projectTitle: string;
  selectedTechnologies: string[];
  publishDate: string;
}

export const defaultProjects: PortfolioProjectSingle = {
  id: "",
  inProgress: true,
  projectArticle: "",
  projectDescription: "",
  projectImage: "",
  projectTitle: "",
  selectedTechnologies: [],
  publishDate: "",
};
