import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UrlProviderService {

  browserWindow = window || {};
  browserWindowEnv = this.browserWindow['__env'] || {};

  private domain;
  private port = '8080';
  private protocol = 'http';

  private url: string;
  private iframeUrl: string;

  constructor() {

    this.domain = location.hostname;
    this.url = this.protocol + '://' + this.domain + ':' + this.port;
    this.iframeUrl = this.protocol + '://' + this.domain + ':' + this.port;

    if (this.browserWindowEnv.hasOwnProperty('apiUrl')) {
      this.url = window['__env']['apiUrl'];
    }
  }

  get iframeURL(): string {
    return this.iframeUrl;
  }

  get serviceURL(): string {
    return this.url;
  }
}
