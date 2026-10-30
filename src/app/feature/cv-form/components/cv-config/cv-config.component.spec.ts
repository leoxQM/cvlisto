import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvConfigComponent } from './cv-config.component';

describe('CvConfigComponent', () => {
  let component: CvConfigComponent;
  let fixture: ComponentFixture<CvConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
