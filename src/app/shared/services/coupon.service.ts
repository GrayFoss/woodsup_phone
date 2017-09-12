/**
 * Created by joe on 2017/7/27.
 */
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlChange } from '../utils/helper/url';
import { Result } from '../utils/models/Result';
@Injectable()
export class CouponService {
  public Urlbase = new UrlChange().getHost() + '/api/';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }
  getUserCoupon(id): Promise<Result> {
    return this.http.get(this.Urlbase + 'couponCode/getCoupon/' + id)
      .toPromise()
      .then((res) => res.json() as Result)
      .catch(this.handleError);
  }
  getShareCouponCode(): Promise<Result> {
    return this.http.get(this.Urlbase + 'couponCode/shareCouponCode')
      .toPromise()
      .then((res) => res.json() as Result)
      .catch(this.handleError);
  }
  getCouponByCode(id: number): Promise<Result> {
    return this.http.get(`${this.Urlbase}couponCode/getCouponByCode/${id}`)
      .toPromise()
      .then((res) => res.json() as Result)
      .catch(this.handleError);
  }
  getCouponNumber(phone: string, code: string): Promise<Result> {
    return this.http.post(this.Urlbase + 'couponCode/getCouponByShare',
      JSON.stringify({phone: phone, couponCodeCode: code}), {headers: this.headers})
      .toPromise()
      .then((res) => res.json() as Result)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
