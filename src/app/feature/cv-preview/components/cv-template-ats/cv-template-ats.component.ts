import { Component, computed, inject } from '@angular/core';
import { CvService } from '../../../../@core/services/cv.service';

@Component({
  selector: 'app-cv-template-ats',
  imports: [],
  templateUrl: './cv-template-ats.component.html',
  styleUrl: './cv-template-ats.component.css'
})
export class CvTemplateAtsComponent {
  private cvService = inject(CvService);
  cv = this.cvService.cvData;

}
