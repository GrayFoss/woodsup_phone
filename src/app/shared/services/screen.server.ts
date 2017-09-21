/**
 * Created by Joe on 2017/5/13.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ScreenService {
  private screenSource = new Subject<string>();
  screen$ = this.screenSource.asObservable();
  constructor() { }
  confirmScreen(x) {
    this.screenSource.next(x);
  }
}
