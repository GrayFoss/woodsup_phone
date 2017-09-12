import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlChange } from '../utils/helper/url';
import { Result } from '../utils/models/Result';
import {Order} from '../utils/models/Order';

@Injectable()
export class OrderService {
  public headers = new Headers({'Content-Type': 'application/json'});
  public urlchange= new UrlChange();
  public Urlbase = this.urlchange.getHost() + '/api/order/';  // URL to web api
  constructor(private http: Http) { }
  // 下订单
  addOrder(order: Order, balance: string, products: any): Promise<Result> {
    const body = JSON.stringify({order: order, balance: balance, products: products });
    return this.http
      .post(this.Urlbase + 'addOrder', body, {headers: this.headers})
      .toPromise()
      .then((res) => res.json() as Result)
      .catch(this.handleError);
  }
  /**
   * 根据订单orderNumber查询订单信息
   * @method getOrder
   * @param {string} orderNumber 订单ID
   * @return 订单信息
   */
  getOrder(orderNumber: string): Promise<Result> {
    const body = JSON.stringify({orderNumber: orderNumber});
    return this.http
      .post(this.Urlbase + 'getOrderByNumber', body, {headers: this.headers})
      .toPromise()
      .then((res) => res.json() as Result)
      .catch(this.handleError);
  }
  /**
   * 根据订单ID查询订单产品信息
   * @method getOrderProduct
   * @param {string} id 订单ID
   * @return 订单产品信息
   */
  getOrderProduct(id) {
    return this.http
      .get(`${this.Urlbase}findProductByOrderId?page=1&limit=100&oid=${id}`)
      .toPromise()
      .then((res) => res.json() as Result)
      .catch(this.handleError);
  }
  getStatus(id) {
    return this.http.get(this.Urlbase + 'order/' + id)
      .toPromise()
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
