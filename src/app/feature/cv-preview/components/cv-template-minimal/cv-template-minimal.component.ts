import { Component, inject } from '@angular/core';
import { CvService } from '../../../../@core/services/cv.service';

@Component({
  selector: 'app-cv-template-minimal',
  imports: [],
  templateUrl: './cv-template-minimal.component.html',
  styleUrl: './cv-template-minimal.component.css'
})
export class CvTemplateMinimalComponent {
  private cvService = inject(CvService);
  cv = this.cvService.cvData;

}
