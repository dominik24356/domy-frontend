import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.css']
})
export class HomeNavbarComponent {
  @Output() aboutClicked = new EventEmitter<void>();
  @Output() homeClicked = new EventEmitter<void>();
  activeLinkIndex: number = 0;


  setActiveLink(index: number) {
    this.activeLinkIndex = index;
  }
  openAbout() {
    this.setActiveLink(1)
    this.aboutClicked.emit();
  }

  openHome() {
    this.setActiveLink(0);
    this.homeClicked.emit(); // Emituj zdarzenie homeClicked
  }
}
