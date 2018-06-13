import {Injectable, Renderer2} from '@angular/core';
import {CommonVR} from '../../utils/models/CommonVR';
declare const WebVRConfig;

@Injectable()
export class webvrEnvironmentService {
  public prefix: string= 'vr';
  // Setup three.js WebGL renderer. Note: Antialiasing is a big performance hit.
  // Only enable it if you actually need to.
  public lastRender: number = 0;
  public commonVR: CommonVR;
  public mesh;
  public init_materials;
  public initialVR(host: HTMLElement, _render: Renderer2, commonVR: CommonVR) {
    this.commonVR = commonVR;
    // initial VR
    const WebVRConfig = {
      // Prevents the polyfill from initializing automatically.
      DEFER_INITIALIZATION: true,
      // Ensures the polyfill is always active when initialized, even if the
      // native API is available. This is probably NOT what most pages want.
      POLYFILL_MODE: 'ALWAYS',
      TOUCH_PANNER_DISABLED: false,
      // Polyfill optimizations
      DIRTY_SUBMIT_FRAME_BINDINGS: true,
      BUFFER_SCALE: 0.75,
    };
    _render.appendChild(host, this.commonVR.renderer.domElement);
    // Get the VRDisplay and save it for later.
    this.commonVR.vrDisplay = null;
    navigator.getVRDisplays().then((displays) => {
      if (displays.length > 0) {
        this.commonVR.vrDisplay = displays[0];
        // Kick off the render loop.
        this.commonVR.vrDisplay.requestAnimationFrame((timestamp) => this.animate(timestamp));
      }
    });
    }
  constructor(
  ) {}

  public animate(timestamp) {
    const delta = Math.min(timestamp - this.lastRender, 500);
    this.lastRender = timestamp;
    // Apply rotation to cube mesh
    // this.cube.rotation.y += delta * 0.0006;
    // Update VR headset position and apply to camera.
    this.commonVR.controls.update();
    this.commonVR.events.emit('tick', delta);
    // Render the scene.
    this.commonVR.effect.render(this.commonVR.scene, this.commonVR.camera);
    this.commonVR.events.emit('render', delta);
    // Keep looping.
    this.commonVR.vrDisplay.requestAnimationFrame((timestamp)=>this.animate(timestamp));
  }
}
