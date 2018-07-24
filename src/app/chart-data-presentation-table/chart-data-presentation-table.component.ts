import { Component, OnInit, SecurityContext, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { UrlProviderService } from '../services/url-provider-service/url-provider.service';

@Component({
  selector: 'chart-data-presentation-table',
  templateUrl: './chart-data-presentation-table.component.html',
  styleUrls: ['./chart-data-presentation-table.component.css']
})
export class ChartDataPresentationTableComponent implements OnInit, OnChanges {

  @Input() table: Object;
  rows: Array<Array<any>>;
  columnHeaders: Array<string>;
  frameUrl: SafeResourceUrl;
  frameHeight: number;

  constructor(private sanitizer: DomSanitizer, private urlProvider: UrlProviderService) {
    this.frameUrl = this.getSanitizedFrameUrl(this.urlProvider.getUrl() + '/table?json=""');
  }

  ngOnInit() {

    this.frameHeight = (2 * window.outerHeight) / 5;

    this.rows = [['This', 'is', 'my', 'BOOMSTICK'], ['This', 'is', 'my', 'BOOMSTICK'], ['This', 'is', 'my', 'BOOMSTICK']];
    this.columnHeaders = ['Header1', 'Header2', 'Header3', 'Header4'];
  }
  ngOnChanges() {
    // this.frameUrl = this.getSanitizedFrameUrl(this.urlProvider.getUrl()) + '/?json=' + JSON.stringify(this.table);
  }
  getSanitizedFrameUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


}
