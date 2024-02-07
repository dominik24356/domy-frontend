import { Directive, HostBinding, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Directive({
  selector: '[appBackground]'
})
export class BackgroundDirective implements OnInit {
  constructor(private router: Router, private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url;
        this.setAppropriateBackground(url);
      }
    });
  }

  setAppropriateBackground(url: string) {
    let backgroundImage: string;

    if (url.includes('/login')) {
      backgroundImage = 'url("./assets/images/login-background.jpg")';
    } else if (url.includes('/board')) {
      backgroundImage = 'url("./assets/images/shapes-background2.jpeg")';
    } else {
      backgroundImage = 'url("./assets/images/login-background.jpg")';
    }

    this.renderer.setStyle(this.elementRef.nativeElement, 'background-image', backgroundImage);
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-size', 'cover');
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-repeat', 'no-repeat');
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-position', 'center');
  }
}
