import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoContactComponent } from './logo-contact.component';

describe('LogoContactComponent', () => {
  let component: LogoContactComponent;
  let fixture: ComponentFixture<LogoContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
