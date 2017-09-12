import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../../shared/services/article/article.service';
import { Screen } from '../../../shared/model/screen';
import { TYPEES } from '../../../shared/utils/data/mock-type';

@Component({
  selector: 'mall-style',
  templateUrl: './mall-style.component.html',
  styleUrls: ['./mall-style.component.scss'],
})
export class MallStyleComponent implements OnInit {
  public window_height: number;
  public stylezs;
  public style_height;
  public screen = new Screen();
  public typees = TYPEES;
  public showType;
  public STYLENAME;
  constructor(
    public el: ElementRef,
    public articleservice: ArticleService,
    public router: Router) { }

  ngOnInit() {
    this.onVoted();
    this.getStyle(1, '风格');
    this.sele_height();
  }
  public onVoted() {
    if (typeof window !== 'undefined') {
      this.window_height = window.innerHeight;
    }
  }
  ShowType (name: string) {
    this.STYLENAME = name;
    this.screen.type = '强化复合';
  }
  ShowStyle() {
    this.screen.type = null;
  }
  sele_height() {
    this.style_height = (this.window_height - 159) / 3;
  }
  gotoProduct(name: string) {
    this.router.navigate(['/product', {style: this.STYLENAME, type: name}]);
  }
  getStyle(a: number, b: string) {
    this.articleservice.getArticles(a, b).then((res) => this.stylezs = res.slice(0, 3));
  }
}
