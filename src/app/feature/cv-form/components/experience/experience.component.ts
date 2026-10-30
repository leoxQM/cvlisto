import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { DynamicListComponent } from '../../../../@shared/components/dynamic-list/dynamic-list.component';
import { CvService } from '../../../../@core/services/cv.service';
import { Experience } from '../../../../@shared/models/cv.model';

@Component({
  selector: 'app-experience',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    CheckboxModule,
    DynamicListComponent
  ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  cvService = inject(CvService);
  private fb = inject(FormBuilder);

  // Mapa de formularios, uno por cada experiencia
  forms = new Map<string, FormGroup>();

  getForm(exp: Experience): FormGroup {
    if (!this.forms.has(exp.id)) {
      const form = this.fb.group({
        position: [exp.position],
        company: [exp.company],
        startDate: [exp.startDate],
        endDate: [exp.endDate],
        isCurrent: [exp.isCurrent],
        responsibilities: [exp.responsibilities]
      });

      form.valueChanges.subscribe(values => {
        this.cvService.updateExperience({ id: exp.id, ...values } as Experience);
      });

      this.forms.set(exp.id, form);
    }
    return this.forms.get(exp.id)!;
  }

  onRemove(id: string): void {
    this.forms.delete(id);
    this.cvService.removeExperience(id);
  }

}
