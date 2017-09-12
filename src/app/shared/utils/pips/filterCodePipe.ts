/**
 * Created by joe on 2017/8/16.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterCode'})

export class FilterCodePipe implements PipeTransform {
  transform(res) {
    return res.filter((res) => res.product.code !== 'undefined');
  }
}
