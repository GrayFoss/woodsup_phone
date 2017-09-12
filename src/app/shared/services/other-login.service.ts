import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class OtherLoginService {
  public access_token: string;
  public refresh_token: string;
  public clent_id: string;
  public openid;
  constructor(private http: Http) { }
/**
 * 获取QQ登录Authorization Code
 * @method getCode
 * @param {string} type 授权类型，此值固定为“code”。
 * @param {number} appid 申请QQ登录成功后，分配给应用的appid。
 * @param {string} url 成功授权后的回调地址，必须是注册appid时填写的主域名下的地址，建议设置为网站首页或网站的用户中心。注意需要将url进行URLEncode。
 * @param {string} state client端的状态值。用于第三方应用防止CSRF攻击，成功授权后回调时会原样带回。请务必严格按照流程检查用户与state参数状态的绑定。
 * @return 如果用户成功登录并授权，则会跳转到指定的回调地址，并在redirect_uri地址后带上Authorization Code和原始的state值
 */
  /*getUserCode(type, appid, url, state) {
    this.http.get('https://graph.qq.com/oauth2.0/authorize?response_type=' + type + '&client_id=' + appid + '&redirect_uri' + url + '&state' + state)
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }*/
  /**
   * 通过Authorization Code获取Access Token
   * @method getAccessToken
   * @param {string} grant_type 授权类型，在本步骤中，此值为“authorization_code”。
   * @param {string} client_id 申请QQ登录成功后，分配给网站的appid。
   * @param {string} client_secret 申请QQ登录成功后，分配给网站的appkey。
   * @param {string} code 上一步返回的authorization code。
   * @param {string} redirect_uri 与上面一步中传入的redirect_uri保持一致。
   * @return 如果成功返回，即可在返回包中获取到Access Token
   */
  // getAccessToken(code): Promise<string> {
  //   return this.http.get(`https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=101403422&client_secret=b3d0a209ce06777fb17752d5a2e95997&code=
  //   ${code}&redirect_uri=http%3a%2f%2fm.forwoodsup.com`)
  //     .toPromise()
  //     .then((res) => {
  //       console.log(res);
  //       console.log(typeof res);
  //       return res;
  //     /*  this.access_token = res.toString().split('&')[0].split('=')[1];
  //       this.refresh_token = res.toString().split('&')[2].split('=')[1];
  //       console.log(this.access_token);
  //       console.log(this.refresh_token);
  //       if (this.access_token !== undefined) {
  //         this.getClient(this.access_token);
  //       }*/
  //     })
  //     .catch(this.handleError);
  // }
  /**
   * 获取用户id
   */
  getClient(access_token) {
    return this.http.get(`https://graph.qq.com/oauth2.0/me?access_token=${access_token}`)
      .toPromise()
      .then((res) => {
          console.log(res.json());
          // this.clent_id = res.toString().split('&')[0].split('=')[1];
          // this.openid = res.toString().split('&')[1].split('=')[1];
          // console.log(this.clent_id);
          // console.log(this.openid);
          // if (this.clent_id !== undefined) {
          //   this.getUserInto(this.access_token, '101403422', this.openid);
          // }
      })
      .catch(this.handleError);
  }
  /**
   * 获取用户信息
   */
  getUserInto(access_token, oauth_consumer_key, openid) {
    return this.http.get('https://graph.qq.com/user/get_user_info?access_token' + access_token + '&oauth_consumer_key' + oauth_consumer_key + '&openid' + openid)
      .toPromise()
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
