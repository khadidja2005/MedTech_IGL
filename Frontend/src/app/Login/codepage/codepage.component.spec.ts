import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodepageComponent } from './codepage.component';

describe('CodepageComponent', () => {
  let component: CodepageComponent;
  let fixture: ComponentFixture<CodepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
