import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPDIComponent } from './header-pdi.component';

describe('HeaderPDIComponent', () => {
  let component: HeaderPDIComponent;
  let fixture: ComponentFixture<HeaderPDIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderPDIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderPDIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
