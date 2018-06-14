import { Component, OnDestroy, OnInit } from '@angular/core';
import {views} from '../../app-nav-views';

@Component({
  selector: 'bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
})

export class BottomNavComponent implements OnDestroy, OnInit {

  views = views;
  private currentRoute: string;

  constructor(
  ) {
  }

  ngOnInit() {
    this.currentRoute = window.location.pathname;
    console.warn('bottom-nav on init', this.currentRoute)
  }
  ngOnDestroy(){}
}
