import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User } from '../utils/models/User';
import 'rxjs/add/operator/toPromise';
import { UrlChange } from '../utils/helper/url';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import { Result } from '../utils/models/Result';

@Injectable()
export class UserService {
  public urlchange= new UrlChange();
  public redirectUrl: string;
  private headers = new Headers({'Content-Type': 'application/json'});
  private url = this.urlchange.getHost() + '/api/';
  constructor(private http: Http) { }
  smsVerify(phone: string): Promise<Result> {
    return this.http.post(this.url + 'data/smsVerify', JSON.stringify({phone: phone}), {headers: this.headers})
      .toPromise()
      .then((res) => {
        return res.json() as Result;
      })
      .catch(this.handleError);
  }
  getUsers(): Promise<User[]> {
    return this.http.get(this.url + 'login/getUserList')
      .toPromise()
      .then((response) => response.json().result as User[])
      .catch(this.handleError);
  }
  /**
   * 更新用户地址
   * @method updateUserAddress
   * @param {object} user 用户对象
   */
  updateUserAddress(user: User): Promise<Result> {
    return this.http.post(this.url + 'user/editAddress', JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then((response) => response.json() as Result)
      .catch(this.handleError);
  }
  /**
   * 注册
   * @method signup
   * @param {string} phone 用户手机号
   * @param {string} displayname 用户昵称
   * @param {string} password 用户密码
   */
  signup(phone: string, displayname: string, password: string, smsVerifyCode: string): Promise<Result> {
    return this.http
      .post(this.url + 'login/register', JSON.stringify({phone: phone, displayname: displayname, password: password, smsVerifyCode: smsVerifyCode}), {headers: this.headers})
      .toPromise()
      .then((res) => res.json() as Result)
      .catch(this.handleError);
  }
  /**
   * 登录
   * @method login
   * @param {string} phone 用户手机号
   * @param {string} password 用户密码
   * @param {boolean} rememberMe ?
   */
  login(phone: string, password: string, rememberMe: boolean): Promise<Result> {
    return this.http
      .post(this.url + 'login/doLogin', JSON.stringify({phone: phone, password: password, rememberMe: rememberMe}), {headers: this.headers})
      .toPromise()
      .then((res) => res.json() as Result)
      .catch(this.handleError);
  }
  /**
   * 手机号登录
   * @method phoneLogin
   * @param {string} username 手机号
   * @param {string} smsVerifyCode 验证码
   */
  phoneLogin(username, smsVerifyCode) {
    return this.http.post(this.url + 'login/phoneLogin',
      JSON.stringify({phone: username, smsVerifyCode: smsVerifyCode}), {headers: this.headers})
      .toPromise()
      .then((res) => res.json() as Result)
      .catch(this.handleError);
  }
  /**
   * 登录成功后获取用户信息
   * @method getLoginStatus
   */
  getLoginStatus(): Promise<Result> {
    return this.http.get(this.url + 'login/getLoginStatus')
      .toPromise()
      .then((response) => response.json() as Result)
      .catch(this.handleError);
  }
  /**
   * 退出登录
   * @method doLogout
   */
  doLogout(): Promise<Result> {
    return this.http.get(this.url + 'login/logout')
      .toPromise()
      .then((res) => {
          console.log(res);
      })
      .catch(this.handleError);
  }
  getLoginStatusByToken(token: string): Promise<Result> {
    return this.http.get(this.url + 'login/getLoginStatusByToken?username=' + token)
      .toPromise()
      .then((response) => response.json() as Result)
      .catch(this.handleError);
  }
  /**
   * 根据用户ID获取用户订单信息
   * @method getOrderUser
   * @param {number} id 用户的id
   */
  getOrderUser(id: number) {
    return this.http.get(this.url + 'order/order/' + id)
      .toPromise()
      .then((res) => res.json() as Result)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
