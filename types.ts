
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'Data' | 'ML' | 'Visualization' | 'Cloud';
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}
