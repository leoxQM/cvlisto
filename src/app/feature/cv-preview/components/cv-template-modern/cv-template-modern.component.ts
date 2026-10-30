import { Component, inject } from '@angular/core';
import { CvService } from '../../../../@core/services/cv.service';

@Component({
  selector: 'app-cv-template-modern',
  imports: [],
  templateUrl: './cv-template-modern.component.html',
  styleUrl: './cv-template-modern.component.css'
})
export class CvTemplateModernComponent {
  private cvService = inject(CvService);
  cv = this.cvService.cvData;

}
