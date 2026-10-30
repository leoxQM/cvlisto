import { Component } from '@angular/core';
import { CvFormComponent } from '../../feature/cv-form/cv-form.component';
import { CvPreviewComponent } from '../../feature/cv-preview/cv-preview.component';

@Component({
  selector: 'app-main-layout',
  imports: [CvFormComponent, CvPreviewComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
