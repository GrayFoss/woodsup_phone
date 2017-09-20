/**
 * Created by joe on 2017/9/18.
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { UrlChange } from '../shared/utils/helper/url';
@Injectable()
export class BuriedSerivce {
  private headers = new Headers({'Content-Type': 'application/json'});
  private Urlbase = new UrlChange().getHost() + '/api/product/';
  constructor(private http: Http) {
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
