import { CvData } from '../models/cv.model';

export function buildPdfModern(cv: CvData): any {
  const primary = cv.config.primaryColor;

  return {
    pageSize: 'A4',
    pageMargins: [0, 0, 0, 0],
    content: [

      // ─── Cabecera con color ───────────────────────
      {
        table: {
          widths: ['*'],
          body: [[
            {
              stack: [
                ...(cv.personalInfo.photoUrl ? [{
                  image: cv.personalInfo.photoUrl,
                  width: 70,
                  height: 70,
                  margin: [40, 24, 0, 0] as [number, number, number, number]
                }] : []),
                {
                  text: cv.personalInfo.fullName || 'Tu Nombre',
                  fontSize: 20,
                  bold: true,
                  color: '#ffffff',
                  margin: [40, cv.personalInfo.photoUrl ? 8 : 24, 40, 4] as [number, number, number, number]
                },
                {
                  text: cv.personalInfo.profession || '',
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.85)',
                  margin: [40, 0, 40, 24] as [number, number, number, number]
                }
              ],
              fillColor: primary,
              border: [false, false, false, false] as [boolean, boolean, boolean, boolean]
            }
          ]]
        },
        layout: 'noBorders'
      },

      // ─── Barra de contacto ────────────────────────
      {
        table: {
          widths: ['*'],
          body: [[
            {
              text: [
                cv.personalInfo.email ? `${cv.personalInfo.email}   ` : '',
                cv.personalInfo.phone ? `${cv.personalInfo.phone}   ` : '',
                cv.personalInfo.location ?? ''
              ].filter(Boolean).join('   |   '),
              fontSize: 9,
              color: '#475569',
              alignment: 'center',
              margin: [40, 8, 40, 8] as [number, number, number, number],
              fillColor: primary + '22',
              border: [false, false, false, false] as [boolean, boolean, boolean, boolean]
            }
          ]]
        },
        layout: 'noBorders',
        margin: [0, 0, 0, 16] as [number, number, number, number]
      },

      // ─── Cuerpo en dos columnas ───────────────────
      {
        columns: [

          // Columna izquierda (sidebar)
          {
            width: 180,
            stack: [
              // Contacto
              sectionTitleModern('Contacto', primary),
              ...[
                cv.personalInfo.email,
                cv.personalInfo.phone,
                cv.personalInfo.location
              ].filter(Boolean).map(item => ({
                text: item,
                fontSize: 9,
                color: '#475569',
                margin: [0, 0, 0, 4] as [number, number, number, number]
              })),

              // Habilidades
              ...(cv.skills.length > 0 ? [
                sectionTitleModern('Habilidades', primary),
                ...cv.skills.map(skill => ({
                  columns: [
                    { text: skill.name, fontSize: 9, color: '#475569' },
                    { canvas: [{ type: 'ellipse' as const, x: 4, y: 4, r1: 4, r2: 4, color: primary }], width: 12 }
                  ],
                  margin: [0, 0, 0, 4] as [number, number, number, number]
                }))
              ] : []),

              // Idiomas
              ...(cv.languages.length > 0 ? [
                sectionTitleModern('Idiomas', primary),
                ...cv.languages.map(lang => ({
                  stack: [
                    { text: lang.name, fontSize: 9, bold: true, color: '#1e293b' },
                    { text: lang.level, fontSize: 9, color: '#94a3b8' }
                  ],
                  margin: [0, 0, 0, 6] as [number, number, number, number]
                }))
              ] : []),

              // Certificaciones
              ...(cv.certifications.length > 0 ? [
                sectionTitleModern('Certificaciones', primary),
                ...cv.certifications.map(cert => ({
                  stack: [
                    { text: cert.year, fontSize: 9, color: '#94a3b8' },
                    { text: cert.name, fontSize: 9, color: '#1e293b' }
                  ],
                  margin: [0, 0, 0, 6] as [number, number, number, number]
                }))
              ] : [])
            ],
            margin: [24, 0, 16, 0] as [number, number, number, number]
          },

          // Columna derecha (main)
          {
            width: '*',
            stack: [

              // Perfil
              ...(cv.profileSummary ? [
                sectionTitleModern('Perfil Profesional', primary),
                {
                  text: cv.profileSummary,
                  fontSize: 10,
                  color: '#475569',
                  lineHeight: 1.5,
                  margin: [0, 0, 0, 12] as [number, number, number, number]
                }
              ] : []),

              // Experiencia
              ...(cv.experience.length > 0 ? [
                sectionTitleModern('Experiencia Laboral', primary),
                ...cv.experience.map(exp => ({
                  stack: [
                    {
                      columns: [
                        { text: exp.position, bold: true, fontSize: 10, color: '#1e293b' },
                        { text: `${exp.startDate} - ${exp.isCurrent ? 'Presente' : exp.endDate}`, fontSize: 9, color: '#94a3b8', alignment: 'right' }
                      ]
                    },
                    { text: exp.company, fontSize: 9, color: '#64748b', margin: [0, 2, 0, 2] as [number, number, number, number] },
                    ...(exp.responsibilities ? [{ text: exp.responsibilities, fontSize: 9, color: '#475569', lineHeight: 1.5 }] : [])
                  ],
                  margin: [0, 0, 0, 10] as [number, number, number, number]
                }))
              ] : []),

              // Educación
              ...(cv.education.length > 0 ? [
                sectionTitleModern('Educación', primary),
                ...cv.education.map(edu => ({
                  stack: [
                    {
                      columns: [
                        { text: edu.degree, bold: true, fontSize: 10, color: '#1e293b' },
                        { text: edu.endYear, fontSize: 9, color: '#94a3b8', alignment: 'right' }
                      ]
                    },
                    { text: edu.institution, fontSize: 9, color: '#64748b', margin: [0, 2, 0, 0] as [number, number, number, number] }
                  ],
                  margin: [0, 0, 0, 10] as [number, number, number, number]
                }))
              ] : [])
            ],
            margin: [0, 0, 24, 0] as [number, number, number, number]
          }
        ]
      }
    ] as any
  };
}

function sectionTitleModern(title: string, color: string) {
  return {
    stack: [
      { text: title.toUpperCase(), fontSize: 10, bold: true, color },
      {
        canvas: [{
          type: 'line' as const,
          x1: 0, y1: 0, x2: 140, y2: 0,
          lineWidth: 0.5,
          lineColor: '#e2e8f0'
        }]
      }
    ],
    margin: [0, 12, 0, 8] as [number, number, number, number]
  };
}
