export interface Portfolio {
  id?: string;
  portfolioName: string;
  portfolioTitle: string;
  portfolioAbout: string;
  portfolioEmail: string;
  portfolioImage: string;
  portfolioContact: {
    instagram: string;
    twitter: string;
    github: string;
    devTo: string;
    linkedin: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
