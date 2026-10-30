import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicListComponent } from '../../../../@shared/components/dynamic-list/dynamic-list.component';
import { CvService } from '../../../../@core/services/cv.service';
import { Skill } from '../../../../@shared/models/cv.model';
@Component({
  selector: 'app-skills',
  imports: [ReactiveFormsModule, InputTextModule, DynamicListComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  cvService = inject(CvService);
  private fb = inject(FormBuilder);

  forms = new Map<string, FormGroup>();

  getForm(skill: Skill): FormGroup {
    if (!this.forms.has(skill.id)) {
      const form = this.fb.group({
        name: [skill.name]
      });

      form.valueChanges.subscribe(values => {
        this.cvService.updateSkill({ id: skill.id, ...values } as Skill);
      });

      this.forms.set(skill.id, form);
    }
    return this.forms.get(skill.id)!;
  }

  onRemove(id: string): void {
    this.forms.delete(id);
    this.cvService.removeSkill(id);
  }
}
