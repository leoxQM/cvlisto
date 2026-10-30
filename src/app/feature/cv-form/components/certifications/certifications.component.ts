import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicListComponent } from '../../../../@shared/components/dynamic-list/dynamic-list.component';
import { CvService } from '../../../../@core/services/cv.service';
import { Certification } from '../../../../@shared/models/cv.model';

@Component({
  selector: 'app-certifications',
  imports: [ReactiveFormsModule, InputTextModule, DynamicListComponent],
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.css'
})
export class CertificationsComponent {
  cvService = inject(CvService);
  private fb = inject(FormBuilder);

  forms = new Map<string, FormGroup>();

  getForm(cert: Certification): FormGroup {
    if (!this.forms.has(cert.id)) {
      const form = this.fb.group({
        year: [cert.year],
        name: [cert.name]
      });

      form.valueChanges.subscribe(values => {
        this.cvService.updateCertification({ id: cert.id, ...values } as Certification);
      });

      this.forms.set(cert.id, form);
    }
    return this.forms.get(cert.id)!;
  }

  onRemove(id: string): void {
    this.forms.delete(id);
    this.cvService.removeCertification(id);
  }
}

