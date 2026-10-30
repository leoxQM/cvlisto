import { Component, inject } from '@angular/core';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { ProfileSumaryComponent } from './components/profile-sumary/profile-sumary.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { EducationComponent } from './components/education/education.component';
import { SkillsComponent } from './components/skills/skills.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { CertificationsComponent } from './components/certifications/certifications.component';
import { DividerModule } from 'primeng/divider';
import { CvService } from '../../@core/services/cv.service';
import { CvConfigComponent } from './components/cv-config/cv-config.component';
import { PhotoUploadComponent } from './components/photo-upload/photo-upload.component';

@Component({
  selector: 'app-cv-form',
  standalone: true,
  imports: [
    PhotoUploadComponent,
    CvConfigComponent,
    PersonalInfoComponent,
    ProfileSumaryComponent,
    ExperienceComponent,
    EducationComponent,
    SkillsComponent,
    LanguagesComponent,
    CertificationsComponent,
    DividerModule],
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.css']
})
export class CvFormComponent {
    private cvDataService = inject(CvService);

    fillTestData(): void {
      this.cvDataService.fillTestData();
    }
}
