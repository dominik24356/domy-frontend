import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeBoardTitleAlertComponent } from './change-board-title-alert.component';

describe('ChangeBoardTitleAlertComponent', () => {
  let component: ChangeBoardTitleAlertComponent;
  let fixture: ComponentFixture<ChangeBoardTitleAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeBoardTitleAlertComponent]
    });
    fixture = TestBed.createComponent(ChangeBoardTitleAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
