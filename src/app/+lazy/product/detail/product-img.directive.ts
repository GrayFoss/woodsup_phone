/**
 * Created by joe on 2017/8/15.
 */
import {Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
@Directive({
  selector: '[detail]'
})
export class DetailDirective implements OnInit, OnChanges {
  @Input() product;
  constructor(private el: ElementRef) {
  }
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.product.standard) {
      const [x , y, z] = this.product.standard.split('*');
      if (typeof window !== 'undefined') {
        const ctx = this.el.nativeElement.getContext('2d');
        const img = new Image();
        img.src = `http://image.wecareroom.com/upload/product_canvas/${this.product.code}.png`;
        img.onload = function () {
          ctx.drawImage(this, 0, 0, 440, 80);
        };
        ctx.save();
        ctx.fillStyle = '#555';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.moveTo(0.5 * 2, 50.5 * 2);
        ctx.lineTo(0.5 * 2, 55.5 * 2);
        ctx.lineTo(220.5 * 2, 55.5 * 2);
        ctx.lineTo(220.5 * 2, 50.5 * 2);
        ctx.stroke();
        ctx.moveTo(235.5 * 2, 0.5 * 2);
        ctx.lineTo(240.5 * 2, 0.5 * 2);
        ctx.lineTo(240.5 * 2, 40.5 * 2);
        ctx.lineTo(235.5 * 2, 40.5 * 2);
        ctx.stroke();
        ctx.moveTo(225 * 2, 52 * 2);
        ctx.lineTo(228 * 2, 55 * 2);
        ctx.lineTo(235 * 2, 48 * 2);
        ctx.lineTo(232 * 2, 45 * 2);
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.font = '24px Microsoft YaHei UI';
        ctx.fillText(`${x}mm`, 100 * 2, 75 * 2);
        ctx.fillText(`${y}mm`, 245 * 2, 20 * 2);
        ctx.fillText(`${z}mm`, 238 * 2, 60 * 2);
      }
    }
  }
}
