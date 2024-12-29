import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpiComponent } from './dpi.component';

describe('DpiComponent', () => {
  let component: DpiComponent;
  let fixture: ComponentFixture<DpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DpiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
