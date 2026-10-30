import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { CvTemplateAtsComponent } from './components/cv-template-ats/cv-template-ats.component';
import { ButtonModule } from 'primeng/button';
import { PdfService } from '../../@core/services/pdf.service';
import { CvTemplateModernComponent } from './components/cv-template-modern/cv-template-modern.component';
import { CvService } from '../../@core/services/cv.service';
import { CvTemplateMinimalComponent } from './components/cv-template-minimal/cv-template-minimal.component';
import { CvTemplateExecutiveComponent } from './components/cv-template-executive/cv-template-executive.component';

const CV_WIDTH = 595;

@Component({
  selector: 'app-cv-preview',
  standalone: true,
  imports: [CvTemplateAtsComponent, CvTemplateModernComponent, CvTemplateExecutiveComponent, CvTemplateMinimalComponent, ButtonModule],
  templateUrl: './cv-preview.component.html',
  styleUrls: ['./cv-preview.component.css'],
})
export class CvPreviewComponent implements OnInit {
  private cvService = inject(CvService);
  private pdfService = inject(PdfService);
  cv = this.cvService.cvData;
  scale = signal(1);
  isGenerating = signal(false);

  ngOnInit(): void {
    this.calculateScale();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.calculateScale();
  }

  private calculateScale(): void {
  const isMobile = window.innerWidth < 768;
  const availableWidth = isMobile
    ? window.innerWidth - 32
    : (window.innerWidth / 2) - 64;
  const newScale = availableWidth / CV_WIDTH;
  this.scale.set(Math.min(newScale, 1));
}


  async onGeneratePdf(): Promise<void> {
    this.isGenerating.set(true);
    await this.pdfService.generatePdf();
    this.isGenerating.set(false);
  }
}
