import {Component} from '@angular/core';
@Component({
  selector: 'right-sidebar-component',
  template: `
          <div class="sideBar">
          <ul>
            <li>
              <a href="javascript:scroll(0,0)" id="back_top">
                <img src="./assets/img/article/totop2.png" alt="">
                回顶部
              </a>
            </li>
          </ul>
        </div>
  `,
  styles: [`    
      .sideBar {
        position: fixed;
        bottom: 70px;
        right: 10px;
        z-index: 500;
      }
      .sideBar li {
        text-align: center;
      }
      .sideBar li img {
        width: 30px;
        display: block;
        margin: 0 auto;
      }
      .sideBar li a {
        color: #000;
        font-size: 14px;
      }
  `]
})
export class RightSidebarComponent {
}
