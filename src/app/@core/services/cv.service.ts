import { computed, Injectable, signal } from '@angular/core';
import { Certification, CvConfig, CvData, Education, Experience, Language, PersonalInfo, Skill } from '../../@shared/models/cv.model';
import { initialCvData } from '../../@shared/models/cv.initial-data';


@Injectable({
  providedIn: 'root'
})
export class CvService {

  cvData = signal<CvData>(initialCvData);

  constructor() { }

  updatePersonalInfo(data: PersonalInfo): void {
    this.cvData.update(cv => ({ ...cv, personalInfo: data }));
  }

  updatePhotoUrl(url: string | null): void {
    this.cvData.update(cv => ({
      ...cv,
      personalInfo: { ...cv.personalInfo, photoUrl: url }
    }));
  }

  updateProfileSummary(summary: string): void {
    this.cvData.update(cv => ({ ...cv, profileSummary: summary }));
  }

  addExperience(): void {
    const newItem: Experience = {
      id: crypto.randomUUID(),
      position: '',
      company: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      responsibilities: ''
    };
    this.cvData.update(cv => ({
      ...cv,
      experience: [...cv.experience, newItem]
    }));
  }

  updateExperience(updated: Experience): void {
    this.cvData.update(cv => ({
      ...cv,
      experience: cv.experience.map(exp => exp.id === updated.id ? updated : exp)
    }));
  }

  removeExperience(id: string): void {
    this.cvData.update(cv => ({
      ...cv,
      experience: cv.experience.filter(exp => exp.id !== id)
    }));
  }

  addEducation(): void {
    const newItem: Education = {
      id: crypto.randomUUID(),
      degree: '',
      institution: '',
      endYear: '',
      startYear: ''
    };
    this.cvData.update(cv => ({
      ...cv,
      education: [...cv.education, newItem]
    }));
  }

  updateEducation(updated: Education): void {
    this.cvData.update(cv => ({
      ...cv,
      education: cv.education.map(edu => edu.id === updated.id ? updated : edu)
    }));
  }

  removeEducation(id: string): void {
    this.cvData.update(cv => ({
      ...cv,
      education: cv.education.filter(edu => edu.id !== id)
    }));
  }

  addSkill(): void {
    const newItem: Skill = {
      id: crypto.randomUUID(),
      name: ''
    };
    this.cvData.update(cv => ({
      ...cv,
      skills: [...cv.skills, newItem]
    }));
  }

  updateSkill(updated: Skill): void {
    this.cvData.update(cv => ({
      ...cv,
      skills: cv.skills.map(skill => skill.id === updated.id ? updated : skill)
    }));
  }

  removeSkill(id: string): void {
    this.cvData.update(cv => ({
      ...cv,
      skills: cv.skills.filter(skill => skill.id !== id)
    }));
  }

  addLanguage(): void {
    const newItem: Language = {
      id: crypto.randomUUID(),
      name: '',
      level: ''
    };
    this.cvData.update(cv => ({
      ...cv,
      languages: [...cv.languages, newItem]
    }));
  }

  updateLanguage(updated: Language): void {
    this.cvData.update(cv => ({
      ...cv,
      languages: cv.languages.map(lang => lang.id === updated.id ? updated : lang)
    }));
  }

  removeLanguage(id: string): void {
    this.cvData.update(cv => ({
      ...cv,
      languages: cv.languages.filter(lang => lang.id !== id)
    }));
  }

  addCertification(): void {
    const newItem: Certification = {
      id: crypto.randomUUID(),
      year: '',
      name: ''
    };
    this.cvData.update(cv => ({
      ...cv,
      certifications: [...cv.certifications, newItem]
    }));
  }

  updateCertification(updated: Certification): void {
    this.cvData.update(cv => ({
      ...cv,
      certifications: cv.certifications.map(cert => cert.id === updated.id ? updated : cert)
    }));
  }

  removeCertification(id: string): void {
    this.cvData.update(cv => ({
      ...cv,
      certifications: cv.certifications.filter(cert => cert.id !== id)
    }));
  }

  updateConfig(config: CvConfig): void {
    this.cvData.update(cv => ({ ...cv, config }));
  }

  fillTestData(): void {
    this.cvData.set({
      config: {
        template: 'ats',
        primaryColor: '#2563eb'
      },
      personalInfo: {
        fullName: 'Leonardo Quispe Miranda',
        profession: 'Desarrollador Web Full Stack',
        email: 'theleox12@gmail.com',
        phone: '958553252',
        location: 'Ica',
        paginaWeb: 'https://leodeev.netlify.app/',
        photoUrl: null
      },
      profileSummary: 'Desarrollador Web Full Stack especializado en Angular y Spring Boot, con experiencia en el desarrollo de soluciones web escalables e integración de servicios backend mediante APIs REST. Manejo de bases de datos Oracle. \nProfesional autodidacta y competitivo, enfocado en resultados, con capacidad para adquirir rápidamente nuevas tecnologías y resolver problemas de manera eficiente. Experiencia en entornos colaborativos y bajo presión, manteniendo estándares de calidad en el desarrollo de software.',
      experience: [
        {
          id: crypto.randomUUID(),
          position: 'Operador de Centro de Computo',
          company: 'ONPE (Oficina Nacional de Procesos Electorales)',
          startDate: 'Febrero 2026',
          endDate: 'Octubre 2026',
          isCurrent: false,
          responsibilities: '- Operación de sistemas informáticos durante el proceso electoral.\n- Monitoreo y soporte técnico básico.\n- Registro y envío de datos.'
        },
        {
          id: crypto.randomUUID(),
          position: 'Encuestador Censos 2025',
          company: 'INEI (Instituto Nacional de Estadística e Informática)',
          startDate: 'Agosto 2025',
          endDate: 'Noviembre 2025',
          isCurrent: false,
          responsibilities: '- Recolección de información socioeconómica mediante encuestas presenciales a hogares.\n- Registro preciso de datos utilizando dispositivos móviles o formularios oficiales.\n- Verificación y validación de la información recopilada para asegurar su calidad y consistencia.\n- Cumplimiento de rutas asignadas y metas diarias de levantamiento de datos.\n- Orientación a los ciudadanos sobre el proceso censal y resolución de consultas.\n- Aplicación de protocolos de confidencialidad y protección de datos.'
        },
        {
          id: crypto.randomUUID(),
          position: 'Programador de Sistemas',
          company: 'SUNAFIL (Superintendencia Nacional de Fiscalización Laboral)',
          startDate: 'Enero 2024',
          endDate: 'Abril 2025',
          isCurrent: false,
          responsibilities: '- Construcción de soluciones web completas integrando frontend en Angular con backend en Spring Boot.\n- Desarrollo de APIs REST escalables para el manejo eficiente de datos.\n- Mejora de la experiencia de usuario mediante interfaces dinámicas y optimizadas.\n- Mantenimiento y evolución de sistemas existentes, reduciendo incidencias y mejorando desempeño.\n- Integración de base de datos y lógica de negocio en entornos empresariales.'
        },{
          id: crypto.randomUUID(),
          position: 'Programador de Sistemas',
          company: 'CORSCH SYSTEM’S',
          startDate: 'Febrero 2024',
          endDate: 'Julio 2024',
          isCurrent: false,
          responsibilities: '- Desarrollo de soluciones web integrando Angular con servicios backend en Spring Boot.\n- Administración y explotación de base de datos Oracle mediante SQL Developer.\n- Optimización de consultas SQL para mejorar tiempos de respuesta del sistema.\n- Implementación de APIs REST y conexión eficiente con la base de datos.\n- Mejora continua del sistema mediante corrección de errores y optimización de procesos.'
        },{
          id: crypto.randomUUID(),
          position: 'Practicante Profesional',
          company: 'SUNAFIL (Superintendencia Nacional de Fiscalización Laboral)',
          startDate: 'Agosto 2023',
          endDate: 'Enero 2024',
          isCurrent: false,
          responsibilities: '- Desarrollo de interfaces web con Angular, HTML y CSS.\n- Consumo de APIs REST e implementación de funcionalidades dinámicas.\n- Soporte y mantenimiento de aplicaciones web.'
        },{
          id: crypto.randomUUID(),
          position: 'Programador FrondEnd Junior',
          company: 'CORSCH SYSTEM’S',
          startDate: 'Octubre 2022',
          endDate: 'Julio 2023',
          isCurrent: false,
          responsibilities: '- Desarrollo de páginas web usando HTML, CSS y JavaScript.\n- Implementación de funcionalidades interactivas.\n- Soporte y mantenimiento del sistema.'
        },{
          id: crypto.randomUUID(),
          position: 'Practicante Pre-profesional',
          company: 'Hospital Regional de Ica',
          startDate: 'Mayo 2022',
          endDate: 'Agosto 2022',
          isCurrent: false,
          responsibilities: '- Soporte tecnico a equipos informaticos del hospital.\n- Orientación a usuarios.\n- Apoyo en tareas administrativas.'
        }
      ],
      education: [
        {
          id: crypto.randomUUID(),
          degree: 'Bachiller en Matemática e Informática',
          institution: 'Universidad San Luis Gonzaga',
          startYear: 'Marzo 2017',
          endYear: 'Setiembre 2022'
        }
      ],
      skills: [
        {
          id: crypto.randomUUID(),
          name: 'Angular'
        },
        {
          id: crypto.randomUUID(),
          name: 'Java'
        },
        {
          id: crypto.randomUUID(),
          name: 'Spring Boot'
        },
        {
          id: crypto.randomUUID(),
          name: 'Oracle SQL'
        },
        {
          id: crypto.randomUUID(),
          name: 'Git'
        }
      ],
      languages: [
        {
          id: crypto.randomUUID(),
          name: 'Español',
          level: 'Nativo'
        },
        {
          id: crypto.randomUUID(),
          name: 'Inglés',
          level: 'Basico'
        }
      ],
      certifications: [
        {
          id: crypto.randomUUID(),
          year: '2023',
          name: 'Desarrollo Web completo HTML CSS JS'
        },{
          id: crypto.randomUUID(),
          year: '2025',
          name: 'Angular 19 de cero a experto'
        },{
          id: crypto.randomUUID(),
          year: '2025',
          name: 'Programación con Java'
        },{
          id: crypto.randomUUID(),
          year: '2025',
          name: 'Spring Framework & Spring Boot desde cero a experto'
        },{
          id: crypto.randomUUID(),
          year: '2026',
          name: 'Base de datos Oracle'
        },{
          id: crypto.randomUUID(),
          year: '2026',
          name: 'Ingles Basico A1-A2'
        }
      ]
    });
  }

}
