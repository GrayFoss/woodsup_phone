import { Injectable } from '@angular/core';
/**
 * 判断用户的浏览设备是移动还是PC
 */
@Injectable()
export class BriwserRedirectService {
  public Browser;
  BriwserRedirect(): Promise<boolean> {
    if (typeof window !== 'undefined') {
      const sUserAgent = navigator.userAgent.toLowerCase();
      const bIsIpad = sUserAgent.indexOf('ipad');
      const bIsIphoneOs = sUserAgent.indexOf('iphone os');
      const bIsMidp = sUserAgent.indexOf('midp/i');
      const bIsUc7 = sUserAgent.indexOf('rv:1.2.3.4');
      const bIsUc = sUserAgent.indexOf('ucweb');
      const bIsAndroid = sUserAgent.indexOf('android');
      const bIsCE = sUserAgent.indexOf('windows ce');
      const bIsWM = sUserAgent.indexOf('windows mobile');
      if (bIsIpad > 0 || bIsIphoneOs > 0 || bIsMidp > 0 || bIsUc7 > 0 || bIsUc > 0 || bIsAndroid > 0 || bIsCE > 0 || bIsWM > 0) {
        this.Browser = false;
      } else {
        this.Browser = true;
      }
    }
    return this.Browser;
  }
}
