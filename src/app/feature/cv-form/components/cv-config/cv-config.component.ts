import { Component, inject } from '@angular/core';
import { CvTemplate } from '../../../../@shared/models/cv.model';
import { CvService } from '../../../../@core/services/cv.service';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-cv-config',
  imports: [ButtonModule, TooltipModule],
  templateUrl: './cv-config.component.html',
  styleUrl: './cv-config.component.css'
})
export class CvConfigComponent {
  private cvService = inject(CvService);

  cv = this.cvService.cvData;

  templates: { id: CvTemplate; label: string; icon: string }[] = [
    { id: 'ats', label: 'ATS', icon: 'pi pi-align-left' },
    { id: 'modern', label: 'Moderno', icon: 'pi pi-th-large' },
    { id: 'minimal', label: 'Minimal', icon: 'pi pi-minus' },
    { id: 'executive', label: 'Ejecutivo', icon: 'pi pi-briefcase' }
  ];

  colors: { label: string; value: string }[] = [
    { label: 'Azul', value: '#2563eb' },
    { label: 'Verde', value: '#16a34a' },
    { label: 'Rojo', value: '#dc2626' },
    { label: 'Morado', value: '#7c3aed' },
    { label: 'Naranja', value: '#ea580c' },
    { label: 'Negro', value: '#1e293b' },
  ];

  selectTemplate(template: CvTemplate): void {
    this.cvService.updateConfig({
      ...this.cv().config,
      template
    });
  }

  selectColor(color: string): void {
    this.cvService.updateConfig({
      ...this.cv().config,
      primaryColor: color
    });
  }
}
