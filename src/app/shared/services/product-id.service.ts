import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProductIdService {
  private productSource = new Subject<string>();
  product$ = this.productSource.asObservable();
  constructor() {}
  confirmProduct(x) {
    this.productSource.next(x);
  }
}
