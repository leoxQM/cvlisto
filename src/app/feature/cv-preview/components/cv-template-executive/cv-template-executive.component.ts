import { Component, inject } from '@angular/core';
import { CvService } from '../../../../@core/services/cv.service';

@Component({
  selector: 'app-cv-template-executive',
  imports: [],
  templateUrl: './cv-template-executive.component.html',
  styleUrl: './cv-template-executive.component.css'
})
export class CvTemplateExecutiveComponent {
  private cvService = inject(CvService);
  cv = this.cvService.cvData;

}
