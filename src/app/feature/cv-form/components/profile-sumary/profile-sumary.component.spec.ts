import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSumaryComponent } from './profile-sumary.component';

describe('ProfileSumaryComponent', () => {
  let component: ProfileSumaryComponent;
  let fixture: ComponentFixture<ProfileSumaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSumaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSumaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
