import { CvData } from '../models/cv.model';

export function buildPdfExecutive(cv: CvData): any {
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
                  width: 75,
                  height: 75,
                  margin: [40, 24, 0, 8] as [number, number, number, number]
                }] : []),
                {
                  text: cv.personalInfo.fullName || 'Tu Nombre',
                  fontSize: 22,
                  bold: true,
                  color: '#ffffff',
                  margin: [40, cv.personalInfo.photoUrl ? 0 : 24, 40, 4] as [number, number, number, number]
                },
                {
                  text: (cv.personalInfo.profession || '').toUpperCase(),
                  fontSize: 10,
                  color: 'rgba(255,255,255,0.85)',
                  margin: [40, 0, 40, 24] as [number, number, number, number],
                  characterSpacing: 1
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
                cv.personalInfo.email,
                cv.personalInfo.phone,
                cv.personalInfo.location
              ].filter(Boolean).join('     |     '),
              fontSize: 9,
              color: '#475569',
              alignment: 'center',
              margin: [40, 8, 40, 8] as [number, number, number, number],
              border: [false, false, false, false] as [boolean, boolean, boolean, boolean]
            }
          ]]
        },
        layout: 'noBorders',
        margin: [0, 0, 0, 0] as [number, number, number, number],
        fillColor: primary + '22'
      },

      // ─── Cuerpo ───────────────────────────────────
      {
        stack: [

          // Perfil
          ...(cv.profileSummary ? [
            sectionTitleExecutive('Perfil Profesional', primary),
            {
              text: cv.profileSummary,
              fontSize: 10,
              color: '#475569',
              lineHeight: 1.5,
              margin: [0, 0, 0, 16] as [number, number, number, number]
            }
          ] : []),

          // Experiencia
          ...(cv.experience.length > 0 ? [
            sectionTitleExecutive('Experiencia Laboral', primary),
            ...cv.experience.map(exp => ({
              stack: [
                {
                  columns: [
                    {
                      stack: [
                        { text: exp.position, bold: true, fontSize: 11, color: '#0f172a' },
                        { text: exp.company, fontSize: 9, color: '#64748b', margin: [0, 2, 0, 0] as [number, number, number, number] }
                      ]
                    },
                    {
                      text: `${exp.startDate} - ${exp.isCurrent ? 'Presente' : exp.endDate}`,
                      fontSize: 9,
                      color: '#94a3b8',
                      alignment: 'right'
                    }
                  ]
                },
                ...(exp.responsibilities ? [{
                  text: exp.responsibilities,
                  fontSize: 10,
                  color: '#475569',
                  lineHeight: 1.5,
                  margin: [0, 4, 0, 0] as [number, number, number, number]
                }] : [])
              ],
              margin: [0, 0, 0, 12] as [number, number, number, number]
            }))
          ] : []),

          // Educación
          ...(cv.education.length > 0 ? [
            sectionTitleExecutive('Educación', primary),
            ...cv.education.map(edu => ({
              stack: [
                {
                  columns: [
                    {
                      stack: [
                        { text: edu.degree, bold: true, fontSize: 11, color: '#0f172a' },
                        { text: edu.institution, fontSize: 9, color: '#64748b', margin: [0, 2, 0, 0] as [number, number, number, number] }
                      ]
                    },
                    { text: edu.endYear, fontSize: 9, color: '#94a3b8', alignment: 'right' }
                  ]
                }
              ],
              margin: [0, 0, 0, 12] as [number, number, number, number]
            }))
          ] : []),

          // Habilidades
          ...(cv.skills.length > 0 ? [
            sectionTitleExecutive('Habilidades', primary),
            {
              table: {
                body: [
                  cv.skills.flatMap((skill, i) => [
                    {
                      text: skill.name,
                      fillColor: primary + '22',
                      color: primary,
                      fontSize: 9,
                      border: [false, false, false, false] as [boolean, boolean, boolean, boolean]
                    },
                    ...(i < cv.skills.length - 1 ? [{
                      text: '',
                      border: [false, false, false, false] as [boolean, boolean, boolean, boolean],
                      fillColor: '#ffffff'
                    }] : [])
                  ])
                ],
                widths: cv.skills.flatMap((_, i) => i < cv.skills.length - 1 ? ['auto', 6] : ['auto'])
              },
              layout: {
                paddingLeft: () => 8,
                paddingRight: () => 8,
                paddingTop: () => 4,
                paddingBottom: () => 4,
              },
              margin: [0, 0, 0, 16] as [number, number, number, number]
            }
          ] : []),

          // Idiomas
          ...(cv.languages.length > 0 ? [
            sectionTitleExecutive('Idiomas', primary),
            ...cv.languages.map(lang => ({
              columns: [
                { text: lang.name, bold: true, fontSize: 10, color: '#0f172a' },
                { text: lang.level, fontSize: 9, color: '#94a3b8', alignment: 'right' }
              ],
              margin: [0, 0, 0, 4] as [number, number, number, number]
            }))
          ] : []),

          // Certificaciones
          ...(cv.certifications.length > 0 ? [
            sectionTitleExecutive('Cursos y Certificaciones', primary),
            ...cv.certifications.map(cert => ({
              columns: [
                { text: cert.year, fontSize: 9, color: '#94a3b8', width: 40 },
                { text: cert.name, fontSize: 10, color: '#0f172a' }
              ],
              margin: [0, 0, 0, 4] as [number, number, number, number]
            }))
          ] : [])

        ],
        margin: [40, 20, 40, 32] as [number, number, number, number]
      }

    ] as any
  };
}

function sectionTitleExecutive(title: string, color: string) {
  return {
    stack: [
      {
        columns: [
          { canvas: [{ type: 'line' as const, x1: 0, y1: 4, x2: 40, y2: 4, lineWidth: 1, lineColor: color }], width: 48 },
          { text: title.toUpperCase(), fontSize: 10, bold: true, color, characterSpacing: 1 },
          { canvas: [{ type: 'line' as const, x1: 0, y1: 4, x2: 40, y2: 4, lineWidth: 1, lineColor: color }], width: 48 }
        ]
      }
    ],
    margin: [0, 16, 0, 10] as [number, number, number, number]
  };
}
