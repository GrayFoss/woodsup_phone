import { Component, OnInit } from '@angular/core';
import { Problem } from '../../../shared/utils/models/Problem';
import { PROBLEM } from '../../../shared/utils/data/mock-problem';

@Component({
  selector: 'mall-server',
  templateUrl: './mall-server.component.html',
  styleUrls: ['./mall-server.component.scss'],
})
export class MallServerComponent implements OnInit {
  public Show1;
  public Show2;
  public Show3;
  public problemonees = PROBLEM.slice(0, 4);
  public problemtwoes = PROBLEM.slice(4, 5);
  public Show(problem: Problem) {
    problem.show = !problem.show;
  }
  public SHow11() {
    this.Show1 = !this.Show1;
  }
  public SHow22() {
    this.Show2 = !this.Show2;
  }
  public SHow33() {
    this.Show3 = !this.Show3;
  }
  constructor() { }
  ngOnInit() { }
}
