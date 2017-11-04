/**
 * Created by 76546 on 2017/7/13.
 */
import {Injectable} from '@angular/core';
import {Apply} from '../utils/models/Apply';
import {Router} from '@angular/router';

@Injectable()
export class CollectMsgService {
  endTime: any;
  public recommendMessage: Apply = new Apply();
  constructor(
    private router: Router,
  ) { }
  collectMsg(e, type) {
    if  ( e.type ) {
      this.recommendMessage.action = e.type;
    }
    this.endTime = new Date();
    this.recommendMessage.urlPath =  this.router.url;
    this.recommendMessage.endTime = this.endTime.getTime();
    this.recommendMessage.type = type;
    if (typeof window !== 'undefined') {
      if ( document.referrer !== '' ) {
        this.recommendMessage.other = '{来源页:' + decodeURI(document.referrer) + '}';
      }
    }

    if ( e.target && e.target.tagName ) {
      console.log(e);
      this.recommendMessage.target = e.target.tagName;
    }
    if ( e.target && e.target.id ) {
      this.recommendMessage.target += '#' + e.target.id;
    }
    return this.recommendMessage;
  }

}
