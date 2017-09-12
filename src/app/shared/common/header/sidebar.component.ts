import {Component} from '@angular/core';

@Component({
    selector: 'sidebar',
    template: `
<div class="side">
  <div class="side_kefu">
  <a href="https://static.meiqia.com/dist/standalone.html?eid=57686&groupid=227cbe71d73dc0bc8d335d8f9d5acdc6"><img src="./assets/img/share/kefu.png" alt=""></a>
  </div>
  <div class="side-in"></div>
  <div class="side_top" (click)="onTop()">
    <img src="./assets/img/share/top2.png" alt="">
  </div>
</div>
`,
  styles: [`
    .side{
      width: 50px;
      position: fixed;
      bottom: 100px;
      right: 0;
      display: flex;
      flex-flow: row wrap;
      align-content:flex-start; 
      background-color: #f1f1f0;
    }
    .side_kefu{
      width: 100%;
    }
    .side_kefu img{
      width: 100%;
    }
    .side-in{
      width: 25px;
      height: 1px;
      margin: 0 auto;
      background-color: #959696;
    }
    .side_top {
      width: 50px;
      height: 50px;
      border-radius: 5px;
      background-size: auto;
    }
    .side_top img{
      width: 100%;
      height: 100%;
    }
`]
})
export class SideBarComponent {
  onTop() {
    if (typeof window !== 'undefined') {
      document.body.scrollTop = 0;
    }
  }
}
