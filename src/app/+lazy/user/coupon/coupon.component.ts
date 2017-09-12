import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ActivityService } from '../../../shared/services/activity.service';
import { CouponService } from '../../../shared/services/coupon.service';
import { sha1 } from '../../../shared/utils/sha1';
declare const wx: any;
@Component({
  selector: 'user-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {
  nonceStr: any;
  wxticket: string;
  public lingqu: string = '领取优惠券';
  public code: any;
  public surplus = 10;
  public productList = [
    {name: 'F0113'},
    {name: 'f8910'},
    {name: 'FG6802'},
    {name: 'GT665'},
    {name: 'HD558'},
    {name: 'KH1288'},
    {name: 'KH1588'},
    {name: 'MD415'},
    {name: 'VFL-P035'},
  ];
  public couponByCode: any;
  public day: string = '1天';
  public reg = /^1[0-9]{10}/;
  public timestamp: number;
  constructor(
    public activityservice: ActivityService,
    private couponService: CouponService,
    private route: ActivatedRoute,
    private router: Router,
    public sha: sha1
  ) {
  }
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      document.body.scrollTop = 0;
    }
    this.route.params.subscribe((params: Params) => this.code = params['id']);
    this.couponService.getCouponByCode(this.code)
      .then((res) => {
        if (res.status.error === 0) {
          this.couponByCode = res.result;
          const now = new Date().getTime();
          const old = new Date(this.couponByCode.endTime.replace(new RegExp(/-/gm) , '/')).getTime();
          if (now > old) {
            this.router.navigate(['/']);
          }else {
            if ((old - now) > 86400000) {
              this.day = Math.ceil((old - now) / 86400000) + '天';
            }else {
              window.setInterval(() => {
                let now = new Date().getTime();
                let old = new Date(this.couponByCode.endTime).getTime();
                const hours = Math.floor((old - now) / 3600000);
                const minute = Math.floor(Math.floor((old - now) / 60000) % 24);
                const second = Math.floor(Math.floor((old - now) / 1000) % 60);
                this.day = `${hours}:${minute}:${second}`;
              }, 1000);
            }
            this.surplus = 10 - this.couponByCode.currentUserNum;
            if (this.surplus <= 0) {
              this.surplus = 0;
            }
          }
        }
      });
  }
  getCoupon(phone: string, code: string) {
    if (!this.reg.test(phone)) {
      alert('请输入正确的手机号');
      return false;
    }else {
      this.couponService.getCouponNumber(phone, code)
        .then((res) => {
          if (res.status.error === 0) {
            alert('领取优惠券成功');
            // this.router.navigate(['/']);
            this.lingqu = '领取成功';
          }else {
            alert(res.status.message);
          }
        });
    }
  }
  public getrandomStr() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < 5; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  public getSignature(timestamp, nonceStr) {
    // const str = "jsapi_ticket="+this.wxticket+"&noncestr="+nonceStr+"&timestamp="+timestamp+"&url="+location.href.split('#')[0];
    const str = `jsapi_ticket=${this.wxticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${location.href.split('#')[0]}`;
    return this.sha.Sha1(str);
  }
  public wechat() {
    this.activityservice.getWXTicket().then((res) => {
      if (res.status.error === 0) {
        this.wxticket = res.status.message;
        this.timestamp = parseInt((new Date()).getTime().toString().substr(0, 10), 10);
        this.nonceStr = this.getrandomStr();
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wx5e9d71771d728a67', // 必填，公众号的唯一标识
          timestamp: this.timestamp, // 必填，生成签名的时间戳
          nonceStr: this.nonceStr + '', // 必填，生成签名的随机串
          signature: this.getSignature(this.timestamp, this.nonceStr) + '', // 必填，签名，见附录1
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'checkJsApi'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function(){
          console.log('微信连接成功');
          wx.onMenuShareTimeline({
            title: '你设计师给你看的美式风格是真的吗?本期做客团带你来到美国德州check on正宗美式装修', // 分享标题
            link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5e9d71771d728a67&' +
            'redirect_uri=http%3A%2F%2Fforwoodsup.com%2Fapi%2Flogin%2FthirdPartyRegister%2Fweixin&' +
            'response_type=code&scope=snsapi_userinfo&connect_redirect=1#wechat_redirect', // 分享链接
            desc: '做客团本周五展开了一场别(无) 出 (敌) 心 (逗) 裁 (逼) 的线上家装设计讨论。以下是内容回顾，感受一下国内首个3D全景家装实时点评。~', // 分享描述
            imgUrl: 'http://m.forwoodsup.com/upload/room/house/1.png', // 分享图标
            success: function () {

              // 用户确认分享后执行的回调函数

            },

            cancel: function () {

              // 用户取消分享后执行的回调函数

            }

          });
          wx.onMenuShareAppMessage({
            title: '你设计师给你看的美式风格是真的吗?本期做客团带你来到美国德州check on正宗美式装修', // 分享标题
            desc: '做客团本周五展开了一场别(无) 出 (敌) 心 (逗) 裁 (逼) 的线上家装设计讨论。以下是内容回顾，感受一下国内首个3D全景家装实时点评。~', // 分享描述
            link: 'https://open.weixin.qq.com/connect/oauth2/authorize?' +
            'appid=wx5e9d71771d728a67&redirect_uri=http%3A%2F%2Fforwoodsup.com%2Fapi%2Flogin%2FthirdPartyRegister%2Fweixin&' +
            'response_type=code&scope=snsapi_userinfo&connect_redirect=1#wechat_redirect', // 分享链接
            imgUrl: 'http://m.forwoodsup.com/upload/room/house/1.png', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
        });
      }
    });

  }
}
