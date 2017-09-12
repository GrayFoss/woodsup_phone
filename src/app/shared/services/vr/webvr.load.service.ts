import { Injectable } from '@angular/core';
declare const THREE: any;
@Injectable()
export class vrLoadService {
  public loadTexture( path, placeHolerSize, texture_placeholder) {
    texture_placeholder.width = placeHolerSize;
    texture_placeholder.height = placeHolerSize;
    const texture = new THREE.Texture(texture_placeholder );
    const material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 });
    const image = new Image();
    image.onload = function () {
      texture.image = this;
      texture.needsUpdate = true;
    };
    image.src = path;
    return material;
  }
  constructor() { }
}
