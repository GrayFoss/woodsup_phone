import { Injectable } from '@angular/core';
import { QuestionBase } from '../utils/models/question-base';
import { DropdownQuestion } from '../utils/models/question-dropdown';
import { TextboxQuestion } from '../utils/models/question-textbox';

@Injectable()
export class QuestionService {
  getQuestions() {
    const questions: Array<QuestionBase<any>> = [
      new DropdownQuestion({
        key: 'reason',
        label: '退款原因',
        options: [
          {key: '订单不能按预计时间送达',  value: '订单不能按预计时间送达'},
          {key: '操作有误(商品、地址等选错)',  value: '操作有误(商品、地址等选错)'},
          {key: '重复下单、误下单',   value: '重复下单、误下单'},
          {key: '其他渠道价格更低', value: '其他渠道价格更低'},
          {key: '不想买了', value: '不想买了'},
          {key: '其他原因', value: '其他原因'}
        ],
        order: 1
      }),
      new TextboxQuestion({
        key: '姓名',
        label: '退款联系人',
        value: 'das',
        required: true,
        order: 2
      }),
      new TextboxQuestion({
        key: 'Phone',
        label: '联系方式',
        type: 'type',
        order: 3
      })
    ];
    return questions.sort((a, b) => a.order - b.order);
  }
}
