import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CountriesListingService {
  
  public get CountriesListing() : Observable<Object | Object[]> 
  { return this.httpClient.get('https://restcountries.com/v3.1/all', {observe: 'body', responseType: 'json'}).pipe(first()); }

  constructor(private httpClient: HttpClient){}
}
