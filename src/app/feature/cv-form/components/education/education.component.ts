import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicListComponent } from '../../../../@shared/components/dynamic-list/dynamic-list.component';
import { CvService } from '../../../../@core/services/cv.service';
import { Education } from '../../../../@shared/models/cv.model';

@Component({
  selector: 'app-education',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    DynamicListComponent
  ],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {

  cvService = inject(CvService);
  private fb = inject(FormBuilder);

  forms = new Map<string, FormGroup>();

  getForm(edu: Education): FormGroup {
    if (!this.forms.has(edu.id)) {
      const form = this.fb.group({
        degree: [edu.degree],
        institution: [edu.institution],
        endYear: [edu.endYear],
        startYear: [edu.startYear]
      });

      form.valueChanges.subscribe(values => {
        this.cvService.updateEducation({ id: edu.id, ...values } as Education);
      });

      this.forms.set(edu.id, form);
    }
    return this.forms.get(edu.id)!;
  }

  onRemove(id: string): void {
    this.forms.delete(id);
    this.cvService.removeEducation(id);
  }

}
