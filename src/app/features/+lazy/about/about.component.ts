import { Component, OnInit, ElementRef } from '@angular/core';
@Component({
  selector: 'about-us',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  public about_server;
  public about_team;
  public about_brand;
  public window_width;
  constructor(
    private el: ElementRef
  ) {}
  getWidth() {
    if (typeof window !== 'undefined') {
      this.window_width = this.el.nativeElement.querySelector('.main').offsetWidth;
    }
  }
  ngOnInit() {
    this.getWidth();
  }
  show_server() {
    this.about_server = !this.about_server;
    document.body.scrollTop = this.el.nativeElement.querySelector('.serv').offsetTop;
  }
  show_team() {
    this.about_team = !this.about_team;
    document.body.scrollTop = this.el.nativeElement.querySelector('.tea').offsetTop;
  }
  show_brand() {
    this.about_brand = !this.about_brand;
    document.body.scrollTop = this.el.nativeElement.querySelector('.bran').offsetTop;
  }
}
