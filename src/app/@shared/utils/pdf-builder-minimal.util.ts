import { CvData } from '../models/cv.model';

export function buildPdfMinimal(cv: CvData): any {
  const primary = cv.config.primaryColor;

  return {
    pageSize: 'A4',
    pageMargins: [48, 48, 48, 32] as [number, number, number, number],
    content: [

      // ─── Cabecera ─────────────────────────────────
      {
        columns: [
          ...(cv.personalInfo.photoUrl ? [{
            image: cv.personalInfo.photoUrl,
            width: 70,
            height: 70,
            margin: [0, 0, 16, 0] as [number, number, number, number]
          }] : []),
          {
            stack: [
              {
                text: cv.personalInfo.fullName || 'Tu Nombre',
                fontSize: 26,
                bold: true,
                color: '#0f172a',
                margin: [0, 0, 0, 4] as [number, number, number, number]
              },
              {
                text: cv.personalInfo.profession || '',
                fontSize: 13,
                color: primary,
                margin: [0, 0, 0, 8] as [number, number, number, number]
              },
              {
                text: [
                  cv.personalInfo.email,
                  cv.personalInfo.phone,
                  cv.personalInfo.location
                ].filter(Boolean).join('   '),
                fontSize: 9,
                color: '#94a3b8'
              }
            ]
          }
        ],
        margin: [0, 0, 0, 16] as [number, number, number, number]
      },

      // ─── Línea decorativa ─────────────────────────
      {
        canvas: [{
          type: 'line' as const,
          x1: 0, y1: 0,
          x2: 499, y2: 0,
          lineWidth: 2,
          lineColor: primary
        }],
        margin: [0, 0, 0, 20] as [number, number, number, number]
      },

      // ─── Perfil ───────────────────────────────────
      ...(cv.profileSummary ? [{
        text: cv.profileSummary,
        fontSize: 10,
        color: '#475569',
        lineHeight: 1.6,
        margin: [0, 0, 0, 20] as [number, number, number, number]
      }] : []),

      // ─── Experiencia ──────────────────────────────
      ...(cv.experience.length > 0 ? [
        sectionTitleMinimal('Experiencia', primary),
        ...cv.experience.map(exp => ({
          stack: [
            {
              columns: [
                { text: exp.position, bold: true, fontSize: 11, color: '#0f172a' },
                { text: `${exp.startDate} — ${exp.isCurrent ? 'Presente' : exp.endDate}`, fontSize: 9, color: '#94a3b8', alignment: 'right' }
              ]
            },
            { text: exp.company, fontSize: 10, color: '#64748b', margin: [0, 2, 0, 4] as [number, number, number, number] },
            ...(exp.responsibilities ? [{
              text: exp.responsibilities,
              fontSize: 10,
              color: '#475569',
              lineHeight: 1.5
            }] : [])
          ],
          margin: [0, 0, 0, 12] as [number, number, number, number]
        }))
      ] : []),

      // ─── Educación ────────────────────────────────
      ...(cv.education.length > 0 ? [
        sectionTitleMinimal('Educación', primary),
        ...cv.education.map(edu => ({
          stack: [
            {
              columns: [
                { text: edu.degree, bold: true, fontSize: 11, color: '#0f172a' },
                { text: edu.endYear, fontSize: 9, color: '#94a3b8', alignment: 'right' }
              ]
            },
            { text: edu.institution, fontSize: 10, color: '#64748b', margin: [0, 2, 0, 0] as [number, number, number, number] }
          ],
          margin: [0, 0, 0, 12] as [number, number, number, number]
        }))
      ] : []),

      // ─── Fila inferior ────────────────────────────
      {
        columns: [

          // Habilidades
          ...(cv.skills.length > 0 ? [{
            width: '*',
            stack: [
              sectionTitleMinimal('Habilidades', primary),
              {
                columns: cv.skills.map(skill => ({
                  text: skill.name,
                  fontSize: 9,
                  color: primary,
                  border: [true, true, true, true] as [boolean, boolean, boolean, boolean]
                }))
              }
            ]
          }] : []),

          // Idiomas
          ...(cv.languages.length > 0 ? [{
            width: '*',
            stack: [
              sectionTitleMinimal('Idiomas', primary),
              ...cv.languages.map(lang => ({
                columns: [
                  { text: lang.name, fontSize: 10, bold: true, color: '#0f172a' },
                  { text: lang.level, fontSize: 9, color: '#94a3b8', alignment: 'right' }
                ],
                margin: [0, 0, 0, 4] as [number, number, number, number]
              }))
            ]
          }] : [])
        ],
        columnGap: 24,
        margin: [0, 8, 0, 0] as [number, number, number, number]
      },

      // ─── Certificaciones ──────────────────────────
      ...(cv.certifications.length > 0 ? [
        sectionTitleMinimal('Certificaciones', primary),
        ...cv.certifications.map(cert => ({
          columns: [
            { text: cert.year, fontSize: 9, color: '#94a3b8', width: 40 },
            { text: cert.name, fontSize: 10, color: '#0f172a' }
          ],
          margin: [0, 0, 0, 4] as [number, number, number, number]
        }))
      ] : [])

    ] as any
  };
}

function sectionTitleMinimal(title: string, color: string) {
  return {
    stack: [
      {
        text: title.toUpperCase(),
        fontSize: 10,
        bold: true,
        color,
        letterSpacing: 2
      },
      {
        canvas: [{
          type: 'line' as const,
          x1: 0, y1: 0,
          x2: 499, y2: 0,
          lineWidth: 0.5,
          lineColor: '#f1f5f9'
        }]
      }
    ],
    margin: [0, 0, 0, 10] as [number, number, number, number]
  };
}
