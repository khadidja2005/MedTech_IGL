import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParampatientComponent } from './parampatient.component';

describe('ParampatientComponent', () => {
  let component: ParampatientComponent;
  let fixture: ComponentFixture<ParampatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParampatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParampatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
