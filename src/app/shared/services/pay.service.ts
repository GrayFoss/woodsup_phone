import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlChange } from '../utils/helper/url';
import { Result } from '../utils/models/Result';

@Injectable()
export class PayService {
  private url = new UrlChange().getHost() + '/api/';
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }
  /**
   * 提交后台支付宝支付所需要的信息
   * @method SubAli
   * @param {string} myOrder 订单编号
   * @param {string} title 订单标题
   * @param {string} totalPrice 订单总价格
   * @param {string} paymenttype 支付类型
   * @param {string} code 产品的code
   * @param {string} price 打折完的价格
   * @param {string} couponCode 促销券的code
   */
  SubAli(myOrder, title, totalPrice, paymenttype, code, price, couponCode) {
    return this.http.post(this.url + 'payment/alipayStartPayment',
      JSON.stringify({
        out_trade_no: myOrder,
        subject: title,
        total_amount: totalPrice,
        paymentType: paymenttype,
        label_price: price,
        couponCode_code: couponCode,
        product_code: code}),
      { headers: this.headers})
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }
  /**
   * 获取订单状态
   * @method getCodeStatus
   */
  getPayCheck(OrderNumber): Promise<Result> {
    console.log(OrderNumber);
    return this.http.post(this.url + 'payment/aliPayCheck', JSON.stringify({out_trade_no: OrderNumber}), {headers: this.headers})
      .toPromise()
      .then((res) => {
        console.log(res);
        return res.json() as Result;
      })
      .catch(this.handleError);
  }
  /**
   * 测试微信支付
   * @method postWeixin
   */
  postWeixin(body) {
    return this.http.post('https://api.mch.weixin.qq.com/pay/unifiedorder', body, {headers: new Headers({'Content-Type': 'application/xml'})})
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
