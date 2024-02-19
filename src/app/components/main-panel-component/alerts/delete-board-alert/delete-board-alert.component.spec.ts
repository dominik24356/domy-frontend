import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBoardAlertComponent } from './delete-board-alert.component';

describe('DeleteBoardAlertComponent', () => {
  let component: DeleteBoardAlertComponent;
  let fixture: ComponentFixture<DeleteBoardAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteBoardAlertComponent]
    });
    fixture = TestBed.createComponent(DeleteBoardAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
