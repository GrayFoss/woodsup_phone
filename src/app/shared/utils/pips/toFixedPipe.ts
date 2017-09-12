/**
 * Created by joe on 2017/8/16.
 */
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({name: 'toFixedPipe'})
export class TofixedPipe implements PipeTransform {
  transform(res: string, index: number) {
    return parseFloat(res).toFixed(index);
  }
}
