import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  showAbout: boolean = false;

  loadAbout() {
    this.showAbout = true;
  }

  loadHome() {
    this.showAbout = false;
  }
}
