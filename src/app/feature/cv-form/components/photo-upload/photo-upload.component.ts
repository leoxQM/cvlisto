import { Component, inject } from '@angular/core';
import { CvService } from '../../../../@core/services/cv.service';

@Component({
  selector: 'app-photo-upload',
  imports: [],
  templateUrl: './photo-upload.component.html',
  styleUrl: './photo-upload.component.css'
})
export class PhotoUploadComponent {

  private cvService = inject(CvService);
  cv = this.cvService.cvData;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.cvService.updatePhotoUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  removePhoto(): void {
    this.cvService.updatePhotoUrl(null);
  }

}
