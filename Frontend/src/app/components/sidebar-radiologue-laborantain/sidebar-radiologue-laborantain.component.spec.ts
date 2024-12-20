import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarRadiologueLaborantainComponent } from './sidebar-radiologue-laborantain.component';

describe('SidebarRadiologueLaborantainComponent', () => {
  let component: SidebarRadiologueLaborantainComponent;
  let fixture: ComponentFixture<SidebarRadiologueLaborantainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarRadiologueLaborantainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarRadiologueLaborantainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
