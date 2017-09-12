/**
 * Created by 76546 on 2017/7/9.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'article-index',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class ArticleIndexComponent implements OnInit {
  ngOnInit() {
  }
}
