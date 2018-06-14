
import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'about-server',
  templateUrl: './about-server.component.html',
  styleUrls: ['./about-server.component.css'],
})
export class AboutServerComponent implements OnInit {
  public window_width;
  @Output() about_server = new EventEmitter<boolean>();
  ngOnInit() {
    this.getWidth();
  }
  constructor() { }
  getWidth() {
    if (typeof window !== 'undefined') {
      this.window_width = window.innerWidth;
    }
  }
  close_server() {
    this.about_server.emit(false);
  }
}
