import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvTemplateMinimalComponent } from './cv-template-minimal.component';

describe('CvTemplateMinimalComponent', () => {
  let component: CvTemplateMinimalComponent;
  let fixture: ComponentFixture<CvTemplateMinimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvTemplateMinimalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvTemplateMinimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
