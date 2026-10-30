import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvTemplateModernComponent } from './cv-template-modern.component';

describe('CvTemplateModernComponent', () => {
  let component: CvTemplateModernComponent;
  let fixture: ComponentFixture<CvTemplateModernComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvTemplateModernComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvTemplateModernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
