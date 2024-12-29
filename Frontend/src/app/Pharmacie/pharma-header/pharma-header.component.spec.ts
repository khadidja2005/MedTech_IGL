import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaHeaderComponent } from './pharma-header.component';

describe('PharmaHeaderComponent', () => {
  let component: PharmaHeaderComponent;
  let fixture: ComponentFixture<PharmaHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmaHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
