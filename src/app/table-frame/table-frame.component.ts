import { Component, OnInit, SecurityContext, Input, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { UrlProviderService } from '../services/url-provider-service/url-provider.service';

@Component({
  selector: 'table-frame',
  templateUrl: './table-frame.component.html',
  styleUrls: ['./table-frame.component.css']
})
export class TableFrameComponent implements OnInit, OnChanges {

  @ViewChild('tableIframe') iframe: ElementRef;
  @Input() table: Object;
  frameUrl: SafeResourceUrl;

  frameHeight: number;

  constructor(private sanitizer: DomSanitizer, private urlProvider: UrlProviderService) {
    this.frameUrl = this.getSanitizedFrameUrl(this.urlProvider.serviceURL + '/table');
  }

  ngOnInit() {
    this.frameHeight = (3 * window.outerHeight) / 5;

    const iframe = <HTMLIFrameElement>document.getElementById('tableIframe');
    if ( iframe ) {
      window.addEventListener('message',
      (event: any) => {

        if (event.origin !== this.urlProvider.serviceURL &&
          event.origin !== this.urlProvider.iframeURL) {
            console.log('Untrusted message', event.origin);
          return;
        }

        // console.log('Table:', event);
        iframe.style.height = event.data + 'px';
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {

    const stringObj = JSON.stringify(changes.table.currentValue);
    console.log('[table-frame.component] On changes: ' + stringObj);

    if (changes.table.currentValue) {
      this.frameUrl = this.getSanitizedFrameUrl(this.urlProvider.serviceURL + '/table?json=' + encodeURIComponent(stringObj));
      console.log(this.frameUrl);
    } else {
      this.frameUrl = this.getSanitizedFrameUrl(this.urlProvider.serviceURL + '/table');
    }
  }

  getSanitizedFrameUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
