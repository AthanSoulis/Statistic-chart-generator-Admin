import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfilePickerComponent } from './profile-picker.component';

describe('ProfilePickerComponent', () => {
  let component: ProfilePickerComponent;
  let fixture: ComponentFixture<ProfilePickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
