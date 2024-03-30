import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLabelPopoverComponent } from './main-label-popover.component';

describe('MainLabelPopoverComponent', () => {
  let component: MainLabelPopoverComponent;
  let fixture: ComponentFixture<MainLabelPopoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainLabelPopoverComponent]
    });
    fixture = TestBed.createComponent(MainLabelPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
