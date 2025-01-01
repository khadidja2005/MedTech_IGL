import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEmployesComponent } from './page-employes.component';

describe('PageEmployesComponent', () => {
  let component: PageEmployesComponent;
  let fixture: ComponentFixture<PageEmployesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageEmployesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageEmployesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
