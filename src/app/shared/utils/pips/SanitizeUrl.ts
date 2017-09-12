/**
 * Created by 76546 on 2017/7/5.
 */
import {SafeHtml, DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sanitizeUrl'
})
export class SanitizeUrl implements PipeTransform  {
  constructor(private sanitizer: DomSanitizer) {}
  transform(v: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(v);
  }
}
