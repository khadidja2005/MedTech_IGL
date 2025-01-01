import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBilanComponent } from './page-bilan.component';

describe('PageBilanComponent', () => {
  let component: PageBilanComponent;
  let fixture: ComponentFixture<PageBilanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageBilanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageBilanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
