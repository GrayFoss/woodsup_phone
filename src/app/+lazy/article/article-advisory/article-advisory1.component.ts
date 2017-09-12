import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../shared/services/article/article.service';

@Component({
  selector: 'index-advisory',
  templateUrl: './article-advisory1.component.html',
  styleUrls: ['./article-advisory1.component.css']
})

export class ArticleAdvisory1Component implements OnInit {
  public articles: any;
  public selectV = 'article';
  constructor(
    private articleservice: ArticleService
  ) {
    this.getArticles(1, ' ');
  }
  ngOnInit(): void {
  }
  getArticles(page: number, cate: string) {
    this.articleservice.getArticles(page, cate).then((articles) => {
      this.articles = articles.filter((res) => res.id !== 194);
    });
  }
}
