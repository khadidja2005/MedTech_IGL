import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMedicamentComponent } from './table-medicament.component';

describe('TableMedicamentComponent', () => {
  let component: TableMedicamentComponent;
  let fixture: ComponentFixture<TableMedicamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableMedicamentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableMedicamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
