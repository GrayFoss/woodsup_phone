import { AfterViewInit, Component, ElementRef, Input, NgZone, OnInit, Renderer2 } from '@angular/core';

@Component({
    selector: 'vr-button-component',
    template: `
      <div id="ui">
        <div id="vr-button"></div>
        <!--<a id="magic-window" href="#">Try it without a headset</a>-->
      </div>
    `,
    styleUrls: ['./webvr.button.scss']
})
export class WebvrButtonComponent implements OnInit, AfterViewInit {
  @Input() public commonVR;
  constructor(
      public el: ElementRef,
      public _render: Renderer2,
      public ngZone: NgZone
    ) {}
  ngOnInit() {
  }
  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      this.commonVR.vrButton.on('exit', () => {
        this.commonVR.camera.quaternion.set(0, 0, 0, 1);
        this.commonVR.camera.position.set(0, this.commonVR.controls.userHeight, 0);
      });
      this.commonVR.vrButton.on('hide', () => {
        this.el.nativeElement.querySelector('#ui').style.display = 'none';
      });
      this.commonVR.vrButton.on('show', () => {
        this.el.nativeElement.querySelector('#ui').style.display = 'inherit';
      });
      this.ngZone.runOutsideAngular(() => {
        this.el.nativeElement.querySelector('#vr-button').appendChild(this.commonVR.vrButton.domElement);
        // this._render.appendChild(this.el.nativeElement.querySelector('#vr-button'), this.commonVR.vrButton.domElement);
        // this.el.nativeElement.querySelector('#magic-window').addEventListener('click', () => {
        //   this.commonVR.vrButton.requestEnterFullscreen();
        // });
      });
    }
  }
}
