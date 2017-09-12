/**
 * Created by Joe on 2017/4/14.
 */
import {Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'about-team',
  templateUrl: 'about-team.component.html',
  styleUrls: ['./about-team.component.scss']
})
export class AboutTeamComponent implements OnInit {
  @Output() about_team = new EventEmitter<boolean>();
  constructor() { }
  ngOnInit() { }
  close_team() {
    this.about_team.emit(false);
  }
}
