export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  author: {
    name: string;
    initial: string;
    avatarColor: string;
    role?: string;
    username?: string;
  };
  teamMembers?: string[];
  university: string;
  major: Major | string;
  year: number;
  thumbnail?: string;
  images?: string[]; // Gallery
  likes: number;
  views: number;
  tags: string[];
  badge: {
    text: string;
    color: string; // 'blue', 'purple', 'green', etc.
  };
  demoUrl?: string; // Added for external links
  sourceUrl?: string; // GitHub or source code repository link
  comments?: Comment[];
}

export interface Comment {
  id: string;
  user: string;
  avatarColor: string;
  date: string;
  content: string;
}

export enum Major {
  CS = 'علوم الحاسب',
  ENG = 'الهندسة',
  MED = 'الطب',
  BUS = 'إدارة الأعمال',
  DES = 'التصميم',
  SCI = 'العلوم',
  OTHER = 'أخرى'
}

export interface Competition {
  id: string;
  title: string;
  deadline: string;
  prize: string;
  description: string;
  isActive: boolean;
}

export type Theme = 'light' | 'dark';