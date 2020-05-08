import { Component, OnInit, SecurityContext, Input, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { UrlProviderService } from '../services/url-provider-service/url-provider.service';

@Component({
    selector: 'raw-data-frame',
    templateUrl: './raw-data-frame.component.html',
})
export class RawDataFrameComponent implements OnInit, OnChanges {

    @ViewChild('rawDataIframe') iframe: ElementRef;
    @Input() rawData: Object;
    frameUrl: SafeResourceUrl;

    frameHeight: number;

    constructor(private sanitizer: DomSanitizer, private urlProvider: UrlProviderService) {
        this.frameUrl = this.getSanitizedFrameUrl(this.urlProvider.serviceURL + '/chart/json');
    }

    ngOnInit() {
        this.frameHeight = (3 * window.outerHeight) / 5;

        const iframe = <HTMLIFrameElement>document.getElementById('rawDataIframe');
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

        const stringObj = JSON.stringify(changes.rawData.currentValue);
        console.log('[raw-data-frame.component] On changes: ' + stringObj);

        if (changes.rawData.currentValue) {
            this.frameUrl = this.getSanitizedFrameUrl(this.urlProvider.serviceURL + '/chart/json?json=' + encodeURIComponent(stringObj));
            console.log(this.frameUrl);
        } else {
            this.frameUrl = this.getSanitizedFrameUrl(this.urlProvider.serviceURL + '/chart/json');
        }
    }

    getSanitizedFrameUrl(url: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
