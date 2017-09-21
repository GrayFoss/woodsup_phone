/**
 * Created by joe on 2017/8/18.
 */
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'shared-prompt',
  template: `
    <div class="prompt" *ngIf="prompting">
      <p>{{prompting}}</p>
    </div>
  `,
  styleUrls: ['./prompt.component.scss'],
})
export class PromptComponent implements OnInit {
  @Input() prompting;
  ngOnInit(): void {
  }
}
