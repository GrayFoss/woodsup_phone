import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TYPEES } from '../../../shared/utils/data/mock-type';
import { Location } from '@angular/common';

@Component({
  selector: 'mall-type',
  templateUrl: './mall-type.component.html',
  styleUrls: ['./mall-type.component.scss'],
})
export class MallTypeComponent implements OnInit {
  // public styleName;
  public typees = TYPEES;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public location: Location
  ) { }
  ngOnInit() {
    /*this.route.params
      .subscribe((params) => {
        this.styleName = params['styleName'];
      });*/
  }
  gotoProduct(name: string) {
    this.router.navigate(['/product', {typeName: name}]);
  }
  back() {
    this.location.back();
  }
}
