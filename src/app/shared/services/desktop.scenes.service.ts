/**
 * Created by Administrator on 2017/3/13.
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class DesktopScenesService {
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) { }
    // 根据场景ID展示场景信息
    getSceneByID ( id: number ): Promise <any> {
      return  this.http.get('http://m.wecareroom.com/api/admin/panoScene/panoScene/' + id)
        .toPromise()
        .then((res) => res.json().result as any)
        .catch(this.handleError);
    }

    // 列出场景下的所有产品
   listProductOfPanoScene( id: number ): Promise<any> {
     return  this.http.get('http://m.wecareroom.com/api/admin/panoScene/listProductOfPanoScene?id=' + id + '&page=1&limit=99999')
       .toPromise()
       .then((res) => res.json().result as any)
       .catch(this.handleError);
   }

    private handleError( error: any ): Promise<any> {
      console.error('An error occurred!', error);
      return Promise.reject(error.message || error);
    }

}
