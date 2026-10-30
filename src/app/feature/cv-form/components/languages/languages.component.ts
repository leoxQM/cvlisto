import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicListComponent } from '../../../../@shared/components/dynamic-list/dynamic-list.component';
import { CvService } from '../../../../@core/services/cv.service';
import { Language } from '../../../../@shared/models/cv.model';
@Component({
  selector: 'app-languages',
  imports: [ReactiveFormsModule, InputTextModule, DynamicListComponent],
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.css'
})
export class LanguagesComponent {
  cvService = inject(CvService);
  private fb = inject(FormBuilder);

  forms = new Map<string, FormGroup>();

  getForm(lang: Language): FormGroup {
    if (!this.forms.has(lang.id)) {
      const form = this.fb.group({
        name: [lang.name],
        level: [lang.level]
      });

      form.valueChanges.subscribe(values => {
        this.cvService.updateLanguage({ id: lang.id, ...values } as Language);
      });

      this.forms.set(lang.id, form);
    }
    return this.forms.get(lang.id)!;
  }

  onRemove(id: string): void {
    this.forms.delete(id);
    this.cvService.removeLanguage(id);
  }
}
