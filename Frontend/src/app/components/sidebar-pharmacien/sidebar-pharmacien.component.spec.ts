import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPharmacienComponent } from './sidebar-pharmacien.component';

describe('SidebarPharmacienComponent', () => {
  let component: SidebarPharmacienComponent;
  let fixture: ComponentFixture<SidebarPharmacienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarPharmacienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarPharmacienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
