import { Component } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
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
