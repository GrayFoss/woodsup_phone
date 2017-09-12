import { Injectable } from '@angular/core';
import { Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { UrlChange } from '../utils/helper/url';
import { Result } from '../utils/models/Result';

@Injectable()
export class SceneService {
  public headers = new Headers({'Content-Type': 'application/json'});
  private url = new UrlChange().getHost() + '/api/';
  constructor(
    private http: Http
  ) {}
  getScene() {
    return this.http.get(this.url + 'admin/panoScene/panoSceneList')
      .toPromise()
      .then((res) => res.json() as Result)
      .catch(this.hadnleError);
  }
  private hadnleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
