import { Component } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-board-navbar',
  templateUrl: './board-navbar.component.html',
  styleUrls: ['./board-navbar.component.css']
})
export class boardNavbarComponent {
  activeLinkIndex: number | null = null;

  constructor(private authService: AuthService, private router: Router) {}


  setActiveLink(index: number): void {
    this.activeLinkIndex = index;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

}
