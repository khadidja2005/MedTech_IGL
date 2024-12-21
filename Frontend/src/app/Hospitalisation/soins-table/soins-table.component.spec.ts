import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoinsTableComponent } from './soins-table.component';

describe('SoinsTableComponent', () => {
  let component: SoinsTableComponent;
  let fixture: ComponentFixture<SoinsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoinsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoinsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
