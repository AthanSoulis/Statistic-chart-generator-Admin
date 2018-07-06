import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UrlProviderService } from '../url-provider-service/url-provider.service';

export class Profile {
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class MappingProfilesService {

  selectedProfile$: Observable<Profile>;
  private _selectedProfileSubject: BehaviorSubject<Profile>;

  constructor(private http: HttpClient,
    private urlProvider: UrlProviderService) {
      this._selectedProfileSubject = new BehaviorSubject<Profile>(null);
      this.selectedProfile$ = this._selectedProfileSubject.asObservable();
  }

  changeSelectedProfile(profile: Profile) {
    console.log('Changed to: ' + profile.name);
    this._selectedProfileSubject.next(profile);
  }

  getProfileMappings(): Observable<Array<Profile>> {

    const profileMappingsUrl = this.urlProvider.getUrl() + '/schema/profiles';

    return this.http.get<Array<Profile>>(profileMappingsUrl)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
