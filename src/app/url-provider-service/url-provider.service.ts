import { Injectable } from '@angular/core';

@Injectable()
export class UrlProviderService {

  // private domain = 'vatopedi.di.uoa.gr';
  private domain = 'localhost';
  private port = '8080';
  private protocol = 'http';

  private url: string;

  constructor() {
    this.url = this.protocol + '://' + this.domain + ':' + this.port;
  }

  getUrl(): string { return this.url; }
}
