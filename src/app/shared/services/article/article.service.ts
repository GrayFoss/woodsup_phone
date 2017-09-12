import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { UrlChange } from '../../utils/helper/url';
import { Article } from '../../utils/models/Article';

@Injectable()
export class ArticleService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private urlbase = new UrlChange().getHost() + '/api/article/';  // URL to web api
  constructor(private http: Http) { }
  /**
   * 获取所有文章
   * @method getArticles
   * @param {number} page 每个接口显示几条
   * @param {string} cate 产品分类名称
   */
  getArticles(page: number, cate: string, limit?: number) {
    return this.http.get(this.urlbase + 'listArticles?page=' + page + '&cate=' + cate + '&limit=' + limit)
      .toPromise()
      .then((response) => response.json().result)
      .catch(this.handleError);
  }
  /**
   * 获取文章页面的banner链接
   * @method getArticleBaner
   */
  getArticleBaner(): Promise<Article[]> {
    return this.http.get(this.urlbase + 'listBanner')
      .toPromise()
      .then((res) => res.json().result)
      .catch(this.handleError);
  }
  /**
   * 获取文章详情信息
   * @method getArticle
   * @param {number} id 文章id
   * @return 文章详细信息
   */
  getArticle(id: number) {
    return this.http.get(this.urlbase + 'article/' + id)
      .toPromise()
      .then((res) => res.json().result)
      .catch(this.handleError);
  }
  getArticleLength(limit: number) {
    return this.http.get(this.urlbase + 'listByRandom?limit=' + limit)
      .toPromise()
      .then((res) => res.json().result)
      .catch(this.handleError);
  }
 /* getTheme() {
    return this.http.get(this.Urlbase + 'listCN?cate=专题')
      .toPromise()
      .then((res) => res.json())
      .then((res) => {
        if (res.status.error === 0) {
          return res.result;
        }
      })
      .catch(this.handleError);
  }
  getSortArticle() {
    return this.http.get(this.Urlbase + 'listCN?cate=风格')
      .toPromise()
      .then((response) => response.json().result)
      .catch(this.handleError);
  }*/
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
