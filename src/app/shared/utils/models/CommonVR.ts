declare let webvrui: any;
const Emitter = require('events');
declare const THREE: any;

// 必须要先load几个js包
export class CommonVR {
  public renderer: THREE.WebGLRenderer;
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;

  public controls?: THREE.VRControls;
  public effect?: THREE.VREffect;
  public vrDisplay?;
  public vrButton?;
  public events?;
  constructor(host: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({antialias: false});
    this.renderer.setPixelRatio(Math.floor(window.devicePixelRatio));
    // Create a three.js scene.
    this.scene = new THREE.Scene();
    // Create a three.js camera.
    this.camera = new THREE.PerspectiveCamera(75, host.offsetWidth / host.offsetHeight, 0.1, 10000);
    // Apply VR headset positional data to camera.
    this.controls = new THREE.VRControls(this.camera);
    // Apply VR stereo rendering to renderer.
    this.effect = new THREE.VREffect(this.renderer);
    // console.log(host.offsetWidth,host.offsetHeight);
    this.effect.setSize(host.offsetWidth, host.offsetHeight);
    this.events = new Emitter();
    // Initialize the WebVR UI.
    const uiOptions = {
      color: 'black',
      background: 'white',
      corners: 'square',
      textEnterVRTitle: 'VR模式',
      textVRNotFoundTitle: '您的设备不支持VR模式',
      textExitVRTitle: '退出VR'
    };
    this.vrButton = new webvrui.EnterVRButton(this.renderer.domElement, uiOptions);
  }
}
