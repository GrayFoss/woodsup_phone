import 'rxjs/add/operator/toPromise';
import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {UrlChange} from '../../utils/helper/url';
import {Result} from '../../utils/models/Result';

@Injectable()
export class ProductService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private Urlbase = new UrlChange().getHost() + '/api/product/';  // URL to web api
    constructor(private http: Http) { }
  getPromotion(page, limit) {
    return this.http.get(`${this.Urlbase}salesProductList?page=${page}&limit=${limit}`)
      .toPromise()
      .then((response) => response.json().result)
      .catch(this.handleError);
  }
  // 获取所有产品
  getProducts(page, limit) {
    const info = {
      page: page,
      limit: limit,
      orderBy: 'latest',
      tags: 'stpaul_ipad_flooring_all'
    };
    return this.http.post(this.Urlbase + 'listProducts', JSON.stringify(info), { headers: this.headers})
      .toPromise()
      .then((res) => res.json().result)
      .catch(this.handleError);
  }
  getProduct(id: number) {
    return this.http.get(this.Urlbase + 'product/' + id)
      .toPromise()
      .then((res) => res.json() as Result)
      .then((res) => res.result)
      .catch(this.handleError);
  }
  /**
   * 发送埋点数据
   * method sendMessage
   * @param {any} msg 发送埋点的数据类型
   */
  sendMessage(msg: any) {
    return this.http.post(new UrlChange().getHost() + '/api/admin/recommedTrack/saveRecommendTrack', JSON.stringify(msg), { headers: this.headers})
      .toPromise()
      .then((res) => res.json().result)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
