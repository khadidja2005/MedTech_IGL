import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaionsTableComponent } from './consultaions-table.component';

describe('ConsultaionsTableComponent', () => {
  let component: ConsultaionsTableComponent;
  let fixture: ComponentFixture<ConsultaionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaionsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
