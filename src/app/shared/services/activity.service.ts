import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlChange } from '../utils/helper/url';
import { Result } from '../utils/models/Result';
import { Comments } from '../utils/models/Comments';
@Injectable()
export class ActivityService {
  private headers = new Headers({'Content-Type': 'application/json'});
  // private Urlbase = 'http://m.forwoodsup.cn/api/activity';  // URL to web api
  private Urlbase = new UrlChange().getHost() + '/api/';  // URL to web api
  constructor(private http: Http) { }

  getComments(): Promise<Result> {
    return this.http.get(this.Urlbase + 'activity/listComments')
      .toPromise()
      .then((response) => response.json() as Result)
      .catch(this.handleError);
  }

  getOnlineNumber(): Promise<Result> {
    return this.http.get(this.Urlbase + 'activity/getOnlineNumber')
      .toPromise()
      .then((response) => response.json() as Result)
      .catch(this.handleError);
  }

  getWXTicket(): Promise<Result> {
    return this.http.get(this.Urlbase + 'activity/getwxticket')
      .toPromise()
      .then((response) => response.json() as Result)
      .catch(this.handleError);
  }

  addComment(comment: Comments): Promise<Result> {
    const body = JSON.stringify(comment);
    return this.http
      .post(this.Urlbase + 'activity/activity/addComment', body, {headers: this.headers})
      .toPromise()
      .then((res) => res.json() as Result)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
