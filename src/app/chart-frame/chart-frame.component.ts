import { Component, OnInit, SecurityContext, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { HttpParams, HttpClient } from '@angular/common/http';
import { UrlProviderService } from '../services/url-provider-service/url-provider.service';

@Component({
  selector: 'chart-frame',
  templateUrl: './chart-frame.component.html',
  styleUrls: ['./chart-frame.component.css']
})
export class ChartFrameComponent implements OnInit, OnChanges {

  @ViewChild('chartFrame')
  private chartFrameRef: ElementRef;

  @Input() chart: Object;
  frameHeight: number;
  frameWidth: number;
  frameUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private urlProvider: UrlProviderService) {
    this.frameUrl = this.getSanitizedFrameUrl(urlProvider.getUrl() + '/chart');
  }

  ngOnInit() {
    this.frameHeight = (3 * window.outerHeight) / 5;
  }

  ngOnChanges(changes: SimpleChanges) {
    const stringObj = JSON.stringify(changes.chart.currentValue);
    console.log('[chart-frame.component] On changes: ' + stringObj);

    if (changes.chart.currentValue) {
      this.frameUrl = this.getSanitizedFrameUrl(this.urlProvider.getUrl() + '/chart?json=' + encodeURIComponent(stringObj));
      console.log(this.frameUrl);
    }
  }
  getSanitizedFrameUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  submitChartPreferences(preferences: Object ) {}
}
