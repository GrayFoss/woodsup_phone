import {Component, OnInit, ElementRef} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'reserve-server',
  templateUrl: './reserve-server.component.html',
  styleUrls: ['./reserve-server.component.css']
})
export class ReserveServerComponent implements OnInit {
  public dituUrl: SafeResourceUrl;
  public if_width;
  public xx = 'http://m.wecareroom.com/assets/html/ditu.html';
  constructor(
    private el: ElementRef,
    private sanitizer: DomSanitizer) { }
  ngOnInit() {
    if (typeof window !== 'undefined') {
      document.body.scrollTop = 0;
    }
    this.dituUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.xx);
    this.if_width = this.el.nativeElement.querySelector('iframe').offsetWidth;
  }
}
