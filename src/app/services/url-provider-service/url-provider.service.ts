import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlProviderService {

  get iframeURL(): string {
    return  environment.apiUrl;
  }

  get serviceURL(): string {
    return environment.apiUrl + environment.apiFolder;
  }
}
