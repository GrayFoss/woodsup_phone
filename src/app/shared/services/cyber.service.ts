/**
 * Created by 76546 on 2017/7/5.
 */
import {Injectable} from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlChange } from '../utils/helper/url';
import { Result } from '../utils/models/Result';

@Injectable()
export class CyberService {
  public headers = new Headers({'Content-Type': 'application/json'});
  public Urlbase = new UrlChange().getHost() + '/api/admin/recommedTrack/';  // URL to web api
  constructor(private http: Http) { }
  addOrder(recommendTrack): Promise<Result> {
    const body = JSON.stringify(recommendTrack);
    return this.http
      .post(this.Urlbase + 'saveRecommendTrack', body, {headers: this.headers})
      .toPromise()
      .then((res) => {
        console.log(res);
        return res.json() as Result;
      })
      .catch(this.handleError);
  }
   private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
