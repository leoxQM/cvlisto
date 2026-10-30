import { Component, inject, OnInit } from '@angular/core';
import { CvService } from '../../../../@core/services/cv.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-profile-sumary',
  imports: [ReactiveFormsModule, TextareaModule],
  templateUrl: './profile-sumary.component.html',
  styleUrl: './profile-sumary.component.css',
})
export class ProfileSumaryComponent implements OnInit {
  private cvService = inject(CvService);
  summaryControl = new FormControl('');
  ngOnInit(): void {
    this.updateSummary();
  }

  updateSummary(): void {
    this.summaryControl.valueChanges.subscribe((value) => {
      console.log('profileSummary:', value); // temporal
      this.cvService.updateProfileSummary(value ?? '');
    });
  }
}
