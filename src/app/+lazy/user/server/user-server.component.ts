import { Component, OnInit } from '@angular/core';
import { PROBLEM } from '../../../shared/utils/data/mock-problem';
import { Problem } from '../../../shared/utils/models/Problem';

@Component({
  selector: 'user-server',
  templateUrl: './user-server.component.html',
  styleUrls: ['./user-server.component.scss'],
})
export class UserServerComponent implements OnInit {
  public selectV = 'mall';
  public show1;
  public show2;
  public show3;
  public problemonees = PROBLEM.slice(0, 4);
  public problemtwoes = PROBLEM.slice(4, 5);
  public Show(problem: Problem) {
    problem.show = !problem.show;
  }
  public SHow11() {
    this.show1 = !this.show1;
  }
  public SHow22() {
    this.show2 = !this.show2;
  }
  public SHow33() {
    this.show3 = !this.show3;
  }
  constructor() { }
  ngOnInit() { }
}
