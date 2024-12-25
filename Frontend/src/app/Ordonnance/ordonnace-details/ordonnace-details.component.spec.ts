import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdonnaceDetailsComponent } from './ordonnace-details.component';

describe('OrdonnaceDetailsComponent', () => {
  let component: OrdonnaceDetailsComponent;
  let fixture: ComponentFixture<OrdonnaceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdonnaceDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdonnaceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
