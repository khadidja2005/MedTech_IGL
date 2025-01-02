import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpasswordpageComponent } from './resetpasswordpage.component';

describe('ResetpasswordpageComponent', () => {
  let component: ResetpasswordpageComponent;
  let fixture: ComponentFixture<ResetpasswordpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetpasswordpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetpasswordpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
