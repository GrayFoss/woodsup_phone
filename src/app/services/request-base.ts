import {Headers, RequestOptions} from '@angular/http';
import {Http} from '@angular/http';
// import 'rxjs/add/operator/toPromise';

export class RequestBase {
  headers = new Headers();
  options =  new RequestOptions({ headers: this.headers, withCredentials: ENV === 'development' });
  baseUrl = '';
  constructor(
  ) {
    this.headers.append('Content-Type', 'application/json');
    this.baseUrl = (ENV === 'development') ? 'http://vr.forwoodsup.cn/api/' :
      (ENV === 'zxxtest') ? 'http://zxxtest.forwoodsup.cn/api/' : 'http://kentest.wecareroom.com/api/';
  }


  public handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
