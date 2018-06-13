import { Injectable } from '@angular/core';
import {RequestBase} from './request-base';
import {Http} from '@angular/http';

export class Status {
  error: number;
  message: string;
}

export class Result {
  status: Status;
  result: any;
}


@Injectable()
export class PhoneDataService extends RequestBase {

  private snapShotUrl = 'http://vr.wecareroom.com';

  constructor(
    private http: Http
  ) {
    super();
  }

  login(phone: string, password: string, rememberMe: boolean): Promise<Result> {
    return this.http
      .post(this.baseUrl + 'login/doLogin', JSON.stringify({phone: phone, password: password, rememberMe: rememberMe}), {headers: this.headers})
      .toPromise()
      .then((res) => res.json() as Result)
      .catch(this.handleError);
  }
  /**
   * 登录成功后获取用户信息
   * @method getLoginStatus
   */
  getLoginStatus(): Promise<Result> {
    return this.http.get(this.baseUrl + 'login/getLoginStatus', this.options)
      .toPromise()
      .then((response) => response.json() as Result)
      .catch(this.handleError);
  }
  /**
   * 获取用户收藏列表
   * @method listCollectionByUser
   */
  listCollectionByUser(data): Promise<Result> {
    return this.http.post(this.baseUrl + 'shared/collection/listCollectionByUser', JSON.stringify(data), this.options)
      .toPromise()
      .then((res) => res.json() as Result)
      .catch(this.handleError);
  }

  /**
   * 获取收藏数据
   * @method listCollectionByIds
   * @param {ids} collection的Id数组
   */
  listCollectionByIds(ids): Promise<Result> {
    return this.http.post(this.baseUrl + 'shared/collection/listCollectionByIDs',
      JSON.stringify({ids}), this.options)
      .toPromise()
      .then((res) => res.json() as Result)
      .catch(this.handleError);
  }
  getCollectionById(id): Promise<Result> {
    return this.http.get(this.baseUrl + 'shared/collection/getCollection/' + id)
      .toPromise()
      .then((res) => res.json() as Result)
      .catch(this.handleError);
  }

}
