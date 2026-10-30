export type CvTemplate = 'ats' | 'modern' | 'minimal' | 'executive';


export interface CvConfig {
  template: CvTemplate;
  primaryColor: string;
}

export interface CvData {
  config: CvConfig;
  personalInfo: PersonalInfo;
  profileSummary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  certifications: Certification[];
}

export interface PersonalInfo {
  fullName: string;
  profession: string;
  email: string;
  phone: string;
  location: string;
  paginaWeb: string;
  photoUrl: string | null;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  responsibilities: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  endYear: string;
  startYear: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface Certification {
  id: string;
  year: string;
  name: string;
}
