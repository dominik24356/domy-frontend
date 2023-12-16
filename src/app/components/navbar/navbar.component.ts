import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  activeLinkIndex: number | null = null;

  setActiveLink(index: number): void {
    this.activeLinkIndex = index;
  }

}
