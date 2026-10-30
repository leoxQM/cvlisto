import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CvService } from '../../../../@core/services/cv.service';

@Component({
  selector: 'app-personal-info',
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css'
})
export class PersonalInfoComponent implements OnInit {

  private fb = inject(FormBuilder);
  private cvService = inject(CvService);

  form!: FormGroup;

  ngOnInit(): void {
    this.createForm();
    this.updateForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      fullName: [''],
      profession: [''],
      email: [''],
      phone: [''],
      location: [''],
      paginaWeb: ['']
    })
  }

  updateForm(): void {
    this.form.valueChanges.subscribe(values => {
      this.cvService.updatePersonalInfo({
        ...values,
        photoUrl: this.cvService.cvData().personalInfo.photoUrl
      });
    })
  }

}
