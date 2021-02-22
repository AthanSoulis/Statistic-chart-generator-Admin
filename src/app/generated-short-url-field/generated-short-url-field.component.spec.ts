import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedShortUrlFieldComponent } from './generated-short-url-field.component';

describe('GeneratedShortUrlFieldComponent', () => {
  let component: GeneratedShortUrlFieldComponent;
  let fixture: ComponentFixture<GeneratedShortUrlFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratedShortUrlFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratedShortUrlFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
