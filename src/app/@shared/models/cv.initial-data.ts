import { CvData } from "./cv.model";

export const initialCvData: CvData = {
  config: {
    template: 'ats',
    primaryColor: '#2563eb'
  },
  personalInfo: {
    fullName: '',
    profession: '',
    email: '',
    phone: '',
    location: '',
    paginaWeb: '',
    photoUrl: null
  },
  profileSummary: '',
  experience: [],
  education: [],
  skills: [],
  languages: [],
  certifications: []
}
