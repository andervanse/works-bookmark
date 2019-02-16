import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'bookmark';
  @ViewChild('leftMenu') leftMenu: ElementRef;

  constructor(private router: Router) {}

  onClickCloseMenu() {
    this.leftMenu.nativeElement.classList.remove('is-visible');
    document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
    //this.router.navigate([link]);
  }
}
