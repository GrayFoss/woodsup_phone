import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import { Product } from '../../utils/models/Product';
import { PRODUCT } from '../../utils/data/mock_products';
import { CommonVR } from '../../utils/models/CommonVR';
declare const THREE: any;
@Component({
  selector: 'webvr-pano-component',
  template: ``,
})

export class webvrPanoComponent implements OnInit, AfterViewInit {
  public resizeEvt = ('orientationchange' in window) ? 'orientationchange' : 'resize';
  public products: Product[];
  public texture_placeholder;
  public isUserInteracting: boolean = false;
  public lon: number = 90;
  public lat: number = 0;
  public phi: number = 0;
  public theta: number = 0;
  public target;
  public init_materials;
  public select_materials;
  public mesh;
  @Input() public MatName: string;
  @Input() public fileName: string;
  @Input() public commonVR: CommonVR;
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
    }
  }
  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      if (window.location.pathname.indexOf('experience') > -1) {
        this.listen();
      }
    }
    this.init();
    this.animate();
  }
  constructor(
    private render: Renderer2,
    private el: ElementRef) {
    console.clear();
    /* Creating scene object */
  }
  init() {
    this.target = new THREE.Vector3();
    this.texture_placeholder = document.createElement( 'canvas' );
    this.texture_placeholder.width = 1024;
    this.texture_placeholder.height = 1024;
    const context = this.texture_placeholder.getContext( '2d' );
    context.fillStyle = 'rgb( 200, 200, 200 )';
    context.fillRect( 0, 0, this.texture_placeholder.width, this.texture_placeholder.height );
    this.init_materials = [
      this.loadTexture( '/upload/experience/' + this.fileName + '/left/' + this.MatName + '_le.png' ), // left
      this.loadTexture( '/upload/experience/' + this.fileName + '/right/' + this.MatName + '_ri.png' ), // right
      this.loadTexture( '/upload/experience/' + this.fileName + '/top/' + this.MatName + '_top.png' ), // top
      this.loadTexture( '/upload/experience/' + this.fileName + '/bottom/' + this.MatName + '_do.png' ), // bottom
      this.loadTexture( '/upload/experience/' + this.fileName + '/back/' + this.MatName + '_ba.png' ),  // back
      this.loadTexture( '/upload/experience/' + this.fileName + '/front/' + this.MatName + '_fr.png' ) // front

    ];
    this.mesh = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100, 30, 30, 30 ), new THREE.MultiMaterial( this.init_materials ) );
    this.mesh.scale.x = - 1;
    this.commonVR.scene.add( this.mesh );
  }
  setMaterials(file: string, name: string) {
    this.select_materials = [
      this.loadTexture( '/upload/experience/' + file + '/left/' + name + '_le.png' ), // left
      this.loadTexture( '/upload/experience/' + file + '/right/' + name + '_ri.png' ), // right
      this.loadTexture( '/upload/experience/' + file + '/top/' + name + '_top.png' ), // top
      this.loadTexture( '/upload/experience/' + file + '/bottom/' + name + '_do.png' ), // bottom
      this.loadTexture( '/upload/experience/' + file + '/back/' + name + '_ba.png' ),  // back
      this.loadTexture( '/upload/experience/' + file + '/front/' + name + '_fr.png' ) // front
    ];
    const newMat = new THREE.MultiMaterial( this.select_materials );
    this.mesh.material = newMat;
    this.mesh.material.needsUpdate = true;
  }
  loadTexture( path ) {
    const texture = new THREE.Texture( this.texture_placeholder );
    const material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 });
    const image = new Image();
    image.onload = function () {
      texture.image = this;
      texture.needsUpdate = true;
    };
    image.src = path;
    return material;
  }
  animate() {
    this.commonVR.events.on('tick', (dt) => {
      // this.update();
    });
  }
  getProducts() {
    this.products = PRODUCT;
  }
  onWindowResize() {
    this.commonVR.camera.aspect = window.innerWidth / window.innerHeight;
    this.commonVR.camera.updateProjectionMatrix();
    this.commonVR.renderer.setSize( document.body.offsetWidth, window.innerHeight );
  }
  listen() {
    this.render.listen('window', this.resizeEvt, () => {
      this.onWindowResize();
    });
  }
}
