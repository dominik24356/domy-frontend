import { ComponentFixture, TestBed } from '@angular/core/testing';

import { boardNavbarComponent } from './board-navbar.component';

describe('NavbarComponent', () => {
  let component: boardNavbarComponent;
  let fixture: ComponentFixture<boardNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [boardNavbarComponent]
    });
    fixture = TestBed.createComponent(boardNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
