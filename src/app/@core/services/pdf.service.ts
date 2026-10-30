import { Injectable } from '@angular/core';
import { CvService } from './cv.service';
import { buildPdfDefinition } from '../../@shared/utils/pdf-builder.util';
import { inject } from '@angular/core';
import { buildPdfModern } from '../../@shared/utils/pdf-builder-modern.util';
import { buildPdfMinimal } from '../../@shared/utils/pdf-builder-minimal.util';
import { buildPdfExecutive } from '../../@shared/utils/pdf-builder-execute.util';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  private cvService = inject(CvService);

  async generatePdf(): Promise<void> {
    const pdfmake = await import('pdfmake/build/pdfmake');
    const pdfFonts = await import('pdfmake/build/vfs_fonts');

    const pdf = (pdfmake as any).default ?? pdfmake;
    pdf.vfs = (pdfFonts as any).default?.pdfMake?.vfs ?? (pdfFonts as any).pdfMake?.vfs;

    const cv = this.cvService.cvData();
    const template = cv.config.template;

    // Selecciona el builder según el template
    let docDefinition: any;
    switch (template) {
      case 'modern':
        docDefinition = buildPdfModern(cv);
        break;
      case 'minimal':
        docDefinition = buildPdfMinimal(cv);
        break;
      case 'executive':
        docDefinition = buildPdfExecutive(cv);
        break;
      case 'ats':
      default:
        docDefinition = buildPdfDefinition(cv);
        break;
    }

    const fullName = cv.personalInfo.fullName;
    const filename = fullName ? `CV_${fullName.replace(/\s+/g, '_')}.pdf` : 'CV.pdf';

    pdf.createPdf(docDefinition).download(filename);
  }
}
