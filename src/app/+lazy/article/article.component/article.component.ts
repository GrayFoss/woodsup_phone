import { Component, OnInit } from '@angular/core';
import { Article } from '../../../shared/utils/models/Article';
import { ArticleService } from '../../../shared/services/article/article.service';
import { Carousel } from '../../../shared/common/header/carousel/carousel';
import { UrlChange } from '../../../shared/utils/helper/url';
import { ARTICLETYPE } from '../../../shared/utils/data/article-type';
import { ActivatedRoute } from '@angular/router';
import { OtherLoginService } from '../../../shared/services/other-login.service';

@Component({
  selector: 'index-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  public QC;
  public selectV = 'article';
  public selectedType;
  public page: number = 1;
  public articles: Article[] = [];
  public article_banneres;
  public myObjects = [];
  public window_width;
  public code: string;
  public url = new UrlChange().getHost();
  public qqUrl: string;
  public ArticleTypes = ARTICLETYPE;
  public SeleArticle;
  constructor(
    public route: ActivatedRoute,
    public otherloginService: OtherLoginService,
    public articleservice: ArticleService) {}
  getBanner() {
    this.articleservice.getArticleBaner().then((res) => {
      this.article_banneres = res.reverse();
      this.myObjects = this.article_banneres.map((obj) => {
        return new Carousel(obj.titleImg, obj.id);
      });
    });
  }
  seleType(res) {
   this.SeleArticle = res;
   this.getArticles(this.page, this.SeleArticle.name);
  }
  ngOnInit() {
    // const paras = {content : '#QQ互联JSSDK测试#曾经沧海难为水，除却巫山不是云。'};
    this.getBanner();
    this.onBom();
    this.getArticles(1, ' ');
  }
  public OnTypeChange(type: string) {
    if (this.selectedType !== type) {
      this.selectedType = type;
      this.page = 1;
      this.getArticles(this.page, this.selectedType);
    }else {
      this.selectedType = '';
      this.page = 1;
      this.getArticles(this.page, this.selectedType);
    }
  }
  getArticles(page: number, cate: string, limit?: number) {
    this.articleservice.getArticles(page, cate, limit).then((articles) => {
      this.articles = articles.filter((res) => res.id !== 194);
    });
  }
  /*onScrollDown() {
    if (this.articles.length === 0) {
      this.page = 1;
      this.getArticles(this.page, this.selectedType);
    }
    // in real application, newArray should be loaded from a remote datasource
    else {
      this.page++;
      let newArray: Article[] = [];
      this.articleservice.getArticles(this.page, this.selectedType).then((articles) => {
        newArray = articles;
        if (newArray.length === 0) {
          this.page--;
        }else {
          this.articles = this.articles.concat(newArray);
          newArray = null;
        }
      });
    }
  }*/
  onBom() {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 540) {
        this.window_width = window.innerWidth;
      }else {
        this.window_width = 540;
      }
    }
  }
  /*获取qq登录回调的access_token*/
 /* getCode() {
    if (typeof window !== 'undefined') {
      this.qqUrl = window.location.href;
      console.log(this.qqUrl);
      console.log(this.qqUrl.indexOf('access_token'));
      if (this.qqUrl.indexOf('access_token') > 0) {
        this.code = window.location.href.split('#')[1].split('&')[0].split('=')[1];
        console.log(window.location.href.split('#')[1]);
        console.log(window.location.href.split('#')[1].split('&')[0]);
        console.log(window.location.href.split('#')[1].split('&')[0].split('=')[1]);
        console.log(this.code);
        this.getClientId(this.code);
      }
    }
  }
  getClientId(code) {
    this.otherloginService.getClient(code);
  }*/

}
