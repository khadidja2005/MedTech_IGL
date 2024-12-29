import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpiInfoComponent } from './dpi-info.component';

describe('DpiInfoComponent', () => {
  let component: DpiInfoComponent;
  let fixture: ComponentFixture<DpiInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DpiInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DpiInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
