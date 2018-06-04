import { Component, OnInit, SecurityContext, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'chart-data-presentation-table',
  templateUrl: './chart-data-presentation-table.component.html',
  styleUrls: ['./chart-data-presentation-table.component.css']
})
export class ChartDataPresentationTableComponent implements OnInit, OnChanges {

  @Input() chart: Object;
  rows: Array<Array<any>>;
  columnHeaders: Array<string>;
  frameUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.rows = [['This', 'is', 'my', 'BOOMSTICK'], ['This', 'is', 'my', 'BOOMSTICK'], ['This', 'is', 'my', 'BOOMSTICK']];
    this.columnHeaders = ['Header1', 'Header2', 'Header3', 'Header4'];
  }
  ngOnChanges() {
    this.frameUrl = this.getSanitizedFrameUrl + '/?json=' + JSON.stringify(this.chart);
  }
  getSanitizedFrameUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:8080/chart');
  }


}
