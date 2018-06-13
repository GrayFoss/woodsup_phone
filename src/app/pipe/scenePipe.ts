import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sceneName'
})
export class ScenePipe implements PipeTransform {
  public transform(value: any) {
    if (typeof value !== 'undefined') {
      switch (value) {
        case 'livingroom':
          return '客厅';
        case 'bedroom':
          return '卧室';
        case 'diningroom':
          return '餐厅';
        case 'studyroom':
          return '书房';
        case 'childroom':
          return '儿童房';
        case 'bathroom':
          return '洗手间';
        default:
          return '其他';
      }
    }
  }
}
