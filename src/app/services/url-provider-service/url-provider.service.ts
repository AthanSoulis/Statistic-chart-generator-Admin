import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
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
