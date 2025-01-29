import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamadminComponent } from './paramadmin.component';

describe('ParamadminComponent', () => {
  let component: ParamadminComponent;
  let fixture: ComponentFixture<ParamadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParamadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParamadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
