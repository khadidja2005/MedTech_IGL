import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableParamComponent } from './table-param.component';

describe('TableParamComponent', () => {
  let component: TableParamComponent;
  let fixture: ComponentFixture<TableParamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableParamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
