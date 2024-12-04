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

interface PortfolioContact {
  instagram: string;
  linkedin: string;
  twitter: string;
  github: string;
  devTo: string;
}

export interface AboutContent {
  isHireMe: boolean;
  portfolioTitle: string;
  portfolioAbout: string;
  portfolioEmail: string;
  portfolioImage: string;
  highlightWords: string;
  portfolioContact: PortfolioContact;
}

export const defaultAbout: AboutContent = {
  isHireMe: false,
  portfolioTitle: "",
  portfolioAbout: "",
  portfolioEmail: "",
  highlightWords: "",
  portfolioContact: {
    linkedin: "",
    devTo: "",
    twitter: "",
    instagram: "",
    github: "",
  },
  portfolioImage: "",
};
