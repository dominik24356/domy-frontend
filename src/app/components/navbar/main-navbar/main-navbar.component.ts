import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css']
})
export class MainNavbarComponent{
  @Output() aboutClicked = new EventEmitter<void>();
  @Output() homeClicked = new EventEmitter<void>();
  @Input() activeLinkIndex: number = -1;

  constructor(public authService: AuthService, private router: Router) {}


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }



}
