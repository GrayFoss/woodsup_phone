import { Component, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'footer-component',
  templateUrl: `./footer.component.html`,
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements AfterViewInit {
  @Input() selectV: string;
  public viewCheck: boolean = false;
  constructor(
    public router: Router,
  ) {}
  ngAfterViewInit(): void {
    this.viewCheck = true;
  }
  /**
   * 随机跳转文章列表
   * method gotoArticle
   */
  gotoArticle() {
    this.router.navigate(['/article/article/advisory' + Math.ceil(Math.random() * 2)]);
  }
}
