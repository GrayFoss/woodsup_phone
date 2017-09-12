import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'about-brand',
  templateUrl: './about-brand.component.html',
  styleUrls: ['./about-brand.component.scss']
})
export class AboutBrandComponent implements OnInit {
  @Output() about_brand = new EventEmitter<boolean>();
  constructor() { }
  ngOnInit() { }
  close_brand() {
    this.about_brand.emit(false);
  }
}
