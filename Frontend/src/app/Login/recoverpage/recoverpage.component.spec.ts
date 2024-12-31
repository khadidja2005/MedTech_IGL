import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverpageComponent } from './recoverpage.component';

describe('RecoverpageComponent', () => {
  let component: RecoverpageComponent;
  let fixture: ComponentFixture<RecoverpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoverpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoverpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
