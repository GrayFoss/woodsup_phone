import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { UrlChange } from '../shared/utils/helper/url';
import { Result } from '../shared/utils/models/Result';
@Injectable()
export class UsersService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private Urlbase = new UrlChange().getHost() + '/api/login/';
  constructor(
    private http: Http
  ) {}
  /**
   * 注册
   * @method register
   * @param {string} username 用户名
   * @param {string} phone 手机号
   * @param {string} password 用户密码
   * @param {string} smsVerifyCode 验证码
   */
  register(username: string, phone: string, password: string, smsVerifyCode: string): Promise<Result> {
    return this.http
      .post(this.Urlbase + 'register', JSON.stringify({username: username, password: password, phone: phone, smsVerifyCode: smsVerifyCode}), {headers: this.headers})
      .toPromise()
      .then((res) => res.json() as Result)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
