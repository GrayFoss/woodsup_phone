import {
  Component, Input, OnInit, AfterViewInit, ElementRef, HostListener,
  ChangeDetectorRef
} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BRANDES } from '../../../shared/utils/data/mock-Brand';
import { COLORS } from '../../../shared/utils/data/mock-color';
import { TYPEES } from '../../../shared/utils/data/mock-type';
import { ScreenService } from '../../../shared/services/screen.server';
import { Screen } from '../../../shared/model/screen';


@Component({
  selector: 'product-sidebar',
  templateUrl: './product-sidebar.component.html',
  styleUrls: ['./product-sidebar.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class ProductSidbarComponent implements OnInit, AfterViewInit {
  public location_stert: number;
  public win_height: number;
  public win_width: number;
  public tonees = COLORS;
  public brandes = BRANDES;
  public typees = TYPEES;
  public toneClass;
  public brandClass;
  public product;
  @Input() screen: Screen;
  public seleLists = new Screen();
  public typeClass;
  public El;
  public showRight;
  constructor(
    private _changeDetectionRef: ChangeDetectorRef,
    private el: ElementRef,
    private screenService: ScreenService) {
    this.El = this.el.nativeElement;
  }
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.win_width = window.innerWidth;
      this.win_height = window.innerHeight;
    }
  }
  ngAfterViewInit(): void {
    this.screen.state = 'active';
    this.seleLists = this.screen;
    this._changeDetectionRef.detectChanges();
    if (this.screen.type) {
      this.typeClass = this.screen.type;
      this._changeDetectionRef.detectChanges();
    }
    if (this.screen.tone) {
      this.toneClass = this.screen.tone;
      this._changeDetectionRef.detectChanges();
    }
    if (this.screen.brand) {
      this.brandClass = this.screen.brand;
      this._changeDetectionRef.detectChanges();
    }
  }
  seleTone( x) {
    if ( this.screen.tone === x.name) {
      this.toneClass = null;
      this.screen.tone = null;
      this.seleLists.tone = null;
    } else {
      this.toneClass = x.name;
      this.screen.tone = x.name;
      this.seleLists.tone = x.name;
    }
    this.screenService.confirmScreen(JSON.stringify(this.screen));
  }
  seleBrand(x) {
    if ( x.name.indexOf(this.screen.brand) >= 0) {
      this.brandClass = null;
      this.screen.brand = null;
      this.seleLists.brand = null;
    } else {
      this.brandClass = x.name;
      this.screen.brand = x.name;
      this.seleLists.brand = x.name;
    }
    this.screenService.confirmScreen(JSON.stringify(this.screen));
  }
  seleType(x) {
    if ( this.screen.type === x.name) {
      this.typeClass = null;
      this.screen.type = null;
      this.seleLists.type = null;
    } else {
      this.typeClass = x.name;
      this.screen.type = x.name;
      this.seleLists.type = x.name;
    }
    this.screenService.confirmScreen(JSON.stringify(this.screen));
  }
  onTouchStart(event) {
    this.screen.state = 'inactive';
    this.screenService.confirmScreen(JSON.stringify(this.screen));
  }
}
