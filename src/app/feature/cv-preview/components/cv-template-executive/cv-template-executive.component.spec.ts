import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvTemplateExecutiveComponent } from './cv-template-executive.component';

describe('CvTemplateExecutiveComponent', () => {
  let component: CvTemplateExecutiveComponent;
  let fixture: ComponentFixture<CvTemplateExecutiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvTemplateExecutiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvTemplateExecutiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
