import { Component, HostListener, Inject, NgModule, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from './services/window.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Raul Schnelzer';
  overlayHeight = 80;
  overlayFontColor = 'white';
  headerFontColor = 'black';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window
  ) {
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    const minHeaderOverlayHeight = 80;
    const offsetCollapseBegin = 100.0;
    const offsetCollapseLimit = 200.0;

    if (offset <= offsetCollapseBegin) {
      this.overlayHeight = minHeaderOverlayHeight;
      return;
    }

    let overlayPercentage = (offsetCollapseLimit - offsetCollapseBegin) / (offset - offsetCollapseBegin);

    if (overlayPercentage < 0.5) {
      overlayPercentage /= 1.1;
    }
    if (overlayPercentage < 0.3) {
      overlayPercentage /= 1.3;
    }
    if (overlayPercentage < 0.1) {
      overlayPercentage = 0;
    }

    let computedHeight = overlayPercentage * minHeaderOverlayHeight;

    if (computedHeight > minHeaderOverlayHeight) {
      computedHeight = minHeaderOverlayHeight;
    }

    this.overlayHeight = computedHeight;
    return;
  }
}
