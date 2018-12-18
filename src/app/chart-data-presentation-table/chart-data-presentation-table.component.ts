import { Component, OnInit, SecurityContext, Input, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { UrlProviderService } from '../services/url-provider-service/url-provider.service';

@Component({
  selector: 'chart-data-presentation-table',
  templateUrl: './chart-data-presentation-table.component.html',
  styleUrls: ['./chart-data-presentation-table.component.css']
})
export class ChartDataPresentationTableComponent implements OnInit, OnChanges {

  @ViewChild('tableIframe') iframe: ElementRef;
  @Input() table: Object;
  frameUrl: SafeResourceUrl;

  frameHeight: number;

  constructor(private sanitizer: DomSanitizer, private urlProvider: UrlProviderService) {
    this.frameUrl = this.getSanitizedFrameUrl(this.urlProvider.serviceURL + '/table');
  }

  ngOnInit() {
    // this.frameHeight = (2 * window.outerHeight) / 5;

    const iframe = <HTMLIFrameElement>document.getElementById('tableIframe');
    window.addEventListener('message',
    (event: any) => {

      if (event.origin !== this.urlProvider.serviceURL) {
        return;
      }

      console.log(event);
      iframe.style.height = event.data + 'px';
    });
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

  loadDone() {
    console.log('Load Done');
    const iframe = <HTMLIFrameElement>document.getElementById('tableIframe');
    console.log('ScrollHeight', iframe.contentWindow.document.body.scrollHeight);

    iframe.style.height = 'inherit';
    iframe.style.height = iframe.scrollHeight + 'px';
  }

}
