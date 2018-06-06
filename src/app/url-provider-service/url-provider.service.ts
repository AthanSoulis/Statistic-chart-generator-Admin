import { Injectable } from '@angular/core';

@Injectable()
export class UrlProviderService {

  private domain;
  private port = '8080';
  private protocol = 'http';

  private url: string;

  constructor() {
    this.domain = location.hostname;
    this.url = this.protocol + '://' + this.domain + ':' + this.port;
  }

  getUrl(): string { return this.url; }
}
