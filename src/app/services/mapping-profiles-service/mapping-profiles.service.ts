import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UrlProviderService } from '../url-provider-service/url-provider.service';
import { ErrorHandlerService } from '../error-handler-service/error-handler.service';

export class Profile {
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class MappingProfilesService {
  mappingProfiles$: BehaviorSubject<Array<Profile>>;
  selectedProfile$: BehaviorSubject<Profile>;

  constructor(private http: HttpClient, private urlProvider: UrlProviderService, private errorHandler: ErrorHandlerService) {
      this.selectedProfile$ = new BehaviorSubject<Profile>(null);
      this.mappingProfiles$ = new BehaviorSubject<Array<Profile>>([]);

      const sub = this.getProfileMappings().subscribe(
        (result: Profile[]) => {
          this.mappingProfiles$.next(result);
        },
        (err: any) => {
          errorHandler.handleError(err);
        },
        () => {
          sub.unsubscribe();
        }
      );
  }

  changeSelectedProfile(profile: string) {

    this.selectedProfile$.next(
      this.mappingProfiles$.value.find(
      (e: Profile) => e.name === profile
    ));
  }

  private getProfileMappings(): Observable<Array<Profile>> {

    const profileMappingsUrl = this.urlProvider.getUrl() + '/schema/profiles';

    return this.http.get<Array<Profile>>(profileMappingsUrl);
  }

}
