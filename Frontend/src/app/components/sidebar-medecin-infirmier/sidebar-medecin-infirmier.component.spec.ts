import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMedecinInfirmierComponent } from './sidebar-medecin-infirmier.component';

describe('SidebarMedecinInfirmierComponent', () => {
  let component: SidebarMedecinInfirmierComponent;
  let fixture: ComponentFixture<SidebarMedecinInfirmierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarMedecinInfirmierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarMedecinInfirmierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
