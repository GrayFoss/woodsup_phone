import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../../shared/services/article/article.service';
import { Article } from '../../../shared/utils/models/Article';
import { Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'article-detail',
  templateUrl: './article.detail.component.html',
  styleUrls: [ './article.detail.component.css' ]
})
export class ArticleDetailComponent implements OnInit, OnDestroy {
  public selectV = 'article';
  public article: Article;
  public similarArticles;
  public sub: Subscription;
  public randomLists = [];
  public article_product: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleservice: ArticleService,
    private metaService: Meta) {}
  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      const id = +params['id']; // (+) converts string 'id' to a number
      this.articleservice.getArticle(id).then((article) => {
        this.article = article;
        this.changeMetaTag();
      });
    });
    this.getArticles(4);
  }
  /**
   * 获取随机文章
   * @method getArticle
   * @param {number} limit 限制获取文章的数量
   */
  getArticles(limit: number) {
    this.articleservice.getArticleLength(limit).then((articles) => {
      this.similarArticles = articles.filter((res) => res.id !== 194);
      let x = 0;
      for (const res of this.similarArticles) {
        this.similarArticles[x].createTime = res.createTime.toString().slice(0, 10).replace('-', '年').replace('-', '月') + '日';
        x++;
      }
      return this.similarArticles;
    });
  }
  public changeMetaTag() {
   /* this.metaService.updateTag('name=description', {name: 'description',content: this.article.summary});
    this.metaService.updateTag('name=title', {name:"title" ,content: this.article.title});
    this.metaService.updateTag('name=keywords', {name:"keywords" ,content: this.article.metadata});*/
  }
  public bb(id: number) {
    this.router.navigate(['/article/', id]);
    document.body.scrollTop = 0;
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
