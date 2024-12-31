import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioHeaderComponent } from './radio-header.component';

describe('RadioHeaderComponent', () => {
  let component: RadioHeaderComponent;
  let fixture: ComponentFixture<RadioHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
