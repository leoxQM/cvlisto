import { CvData } from '../models/cv.model';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

export function buildPdfDefinition(cv: CvData): TDocumentDefinitions {
  return {
    pageSize: 'A4',
    pageMargins: [40, 40, 40, 40] as [number, number, number, number],
    defaultStyle: {
      font: 'Roboto',
      fontSize: 10,
      color: '#333333',
    },
    content: [
      // ─── Cabecera ─────────────────────────────────
      {
        columns: [
          ...(cv.personalInfo.photoUrl
            ? [
                {
                  image: cv.personalInfo.photoUrl,
                  width: 70,
                  height: 70,
                  margin: [0, 0, 16, 0] as [number, number, number, number],
                },
              ]
            : []),
          {
            stack: [
              {
                text: cv.personalInfo.fullName || 'Tu Nombre',
                fontSize: 20,
                bold: true,
                color: '#1e293b',
                alignment: 'center',
              },
              {
                text: cv.personalInfo.profession || '',
                fontSize: 12,
                color: '#212429',
                margin: [0, 8, 0, 12] as [number, number, number, number],
                alignment: 'center',
              },
              {
                text: [
                  cv.personalInfo.email
                    ? `Email: ${cv.personalInfo.email}   `
                    : '',
                  cv.personalInfo.phone
                    ? `Tel: ${cv.personalInfo.phone}   `
                    : '',
                  cv.personalInfo.location
                    ? `Ubicación: ${cv.personalInfo.location}   `
                    : '',
                  cv.personalInfo.paginaWeb
                    ? `Página Web: ${cv.personalInfo.paginaWeb}`
                    : '',
                ]
                  .filter(Boolean)
                  .join('   '),
                fontSize: 9,
                color: '#64748b',
                alignment: 'center',
              },
            ],
          },
        ],
        margin: [0, 0, 0, 16] as [number, number, number, number],
      },

      // Línea separadora cabecera
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 515,
            y2: 0,
            lineWidth: 2,
            lineColor: '#212429',
          },
        ],
        margin: [0, 0, 0, 16] as [number, number, number, number],
      },

      // ─── Perfil Profesional ───────────────────────
      ...(cv.profileSummary
        ? [
            sectionTitle('Perfil Profesional'),
            {
              text: cv.profileSummary,
              margin: [0, 0, 0, 16] as [number, number, number, number],
              fontSize: 9,
              lineHeight: 1.5,
            },
          ]
        : []),

      // ─── Experiencia ──────────────────────────────
      ...(cv.experience.length > 0
        ? [
            sectionTitle('Experiencia Laboral\n'),
            ...cv.experience.map((exp) => ({
              stack: [
                {
                  columns: [
                    { text: exp.position, bold: true, color: '#1e293b' },
                    {
                      text: `${exp.startDate} - ${exp.isCurrent ? 'Presente' : exp.endDate}`,
                      color: '#94a3b8',
                      fontSize: 9,
                      alignment: 'right',

                    },
                  ],
                },
                {
                  text: exp.company,
                  color: '#64748b',
                  margin: [0, 7, 0, 7] as [number, number, number, number],
                  fontSize: 8,
                },
                ...(exp.responsibilities
                  ? [
                      {
                        text: exp.responsibilities,
                        color: '#475569',
                        fontSize: 8,
                        lineHeight: 1.5,
                      },
                    ]
                  : []),
              ],
              margin: [0, 0, 0, 14] as [number, number, number, number],
            })),
          ]
        : []),

      // ─── Educación ────────────────────────────────
      ...(cv.education.length > 0
        ? [
            sectionTitle('Educación'),
            ...cv.education.map((edu) => ({
              stack: [
                {
                  columns: [
                    { text: edu.degree, bold: true, color: '#1e293b' },
                    {
                      text: `${edu.startYear} - ${edu.endYear}`,
                      color: '#94a3b8',
                      fontSize: 9,
                      alignment: 'right',
                    },
                  ],
                },
                {
                  text: edu.institution,
                  color: '#64748b',
                  fontSize: 9,
                  margin: [0, 4, 0, 0] as [number, number, number, number],
                },
              ],
              margin: [0, 0, 0, 14] as [number, number, number, number],
            })),
          ]
        : []),

      // ─── Habilidades ──────────────────────────────
      ...(cv.skills.length > 0
        ? [
            sectionTitle('Habilidades'),
            {
              table: {
                body: [
                  cv.skills.flatMap((skill, i) => [
                    {
                      text: `• ${skill.name}`,
                      color: '#212429',
                      fontSize: 8,
                    },
                    // celda vacía de separación entre cada tag
                    ...(i < cv.skills.length - 1
                      ? [
                          {
                            text: '',
                            border: [false, false, false, false] as [
                              boolean,
                              boolean,
                              boolean,
                              boolean,
                            ],
                          },
                        ]
                      : []),
                  ]),
                ],
                widths: cv.skills.flatMap((_, i) =>
                  i < cv.skills.length - 1 ? ['auto', 6] : ['auto'],
                ),
              },
              layout: 'noBorders',
              margin: [0, 0, 0, 16] as [number, number, number, number],
            },
          ]
        : []),

      // ─── Idiomas ──────────────────────────────────
      ...(cv.languages.length > 0
        ? [
            sectionTitle('Idiomas'),
            ...cv.languages.map((lang) => ({
              columns: [
                { text: `${lang.name}:`, color: '#1e293b', fontSize: 8, width: 40 },
                { text: lang.level, color: '#94a3b8', fontSize: 8 },
              ],
              margin: [0, 0, 0, 10] as [number, number, number, number],
            })),
          ]
        : []),

      // ─── Certificaciones ──────────────────────────
      ...(cv.certifications.length > 0
        ? [
            sectionTitle('Cursos y Certificaciones'),
            ...cv.certifications.map((cert) => ({
              columns: [
                { text: cert.year, color: '#94a3b8', fontSize: 8, width: 40 },
                { text: cert.name, color: '#1e293b', fontSize: 8 },
              ],
              margin: [0, 0, 0, 6] as [number, number, number, number],
            })),
          ]
        : []),
    ] as any, // Cast necesario para evitar error de tipos en content,
  };
}

// ─── Helper título de sección ─────────────────────
function sectionTitle(title: string) {
  return {
    stack: [
      {
        text: title.toUpperCase(),
        fontSize: 11,
        bold: true,
        color: '#212429',
        margin: [0, 0, 0, 8] as [number, number, number, number]
      },
      {
        canvas: [{
          type: 'line' as const,
          x1: 0, y1: 0,
          x2: 515, y2: 0,
          lineWidth: 0.5,
          lineColor: '#e2e8f0'
        }],
        margin: [0, 0, 0, 10] as [number, number, number, number]
      }
    ],
    margin: [0, 5, 0, 0] as [number, number, number, number]
  };
}
