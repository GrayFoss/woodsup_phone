import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransferState } from '../modules/transfer-state/transfer-state';
import { Store, select } from '@ngrx/store';

import { MOBILE } from './services/constants';

import * as fromRoot from './reducers';
import {PhoneDataService} from './services/data.service';
import {Sha1} from './services/sha1';
import {CookieService} from 'ngx-cookie';

@Component({
  selector: 'my-app',
  styleUrls: ['main.scss', './app.component.scss', '../assets/scss/global.scss'],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  mobile = MOBILE;
  sideNavMode = MOBILE ? 'over' : 'side';
  private loginSuccess: boolean = false;

  constructor(
    private cache: TransferState,
    public route: ActivatedRoute,
    public router: Router,
    public store: Store<fromRoot.AppState>,
    private dataService: PhoneDataService,
    private sha1: Sha1,
    public cookieService: CookieService,
  ) { }

  ngOnInit() {

    let phone = '13787166496';
    let password = '12345678';

    this.getStatus().then(login => {
      this.loginSuccess = login;
      if (login) {
        return console.log('已登陆');
      } else {
        this.dataService.login(phone, this.sha1.Sha1(password), false)
          .then((res) => {
            if (res.status.error === 0) {
              this.getStatus();
              if (res.status.message !== '普通登陆' && ENV === 'development') {
                this.cookieService.put('SHRIOSESSIONID', res.result);
              }
            } else {
              console.error('登陆错误', res);
            }
          }).catch(err => console.error(err));
      }
    });
  }
  getStatus() {
    return this.dataService.getLoginStatus()
      .then((res) => {
        if (res.status.error === 0) {
          return true;
        } else {
          return false;
        }
      })
      .catch(err => {
        console.error(err);
        return false;
      });
  }

}
