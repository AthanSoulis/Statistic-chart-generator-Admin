import { Component } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { Observable, Subject } from 'rxjs';
import { CountriesListingService } from '../../services/countries-listing-service/countries-listing.service';

@Component({
  selector: 'countries-listing-picker',
  templateUrl: './countries-listing-picker.component.html',
  styleUrls: ['./countries-listing-picker.component.scss']
})
export class CountriesListingPickerComponent extends ControlWidget {

  private _countries : Subject<{name:string, code:string}[]>;
  public get countries() : Subject<{name:string, code:string}[]> { return this._countries; }
  
  constructor(private countriesListing: CountriesListingService) {
    super(); 
    
    this._countries = new Subject<{name:string, code:string}[]>();

    this.countriesListing.CountriesListing.subscribe(
      (countryListings: Object[]) => 
      {
        var countries = countryListings.map((countryObj, index, countries) => {return {name: countryObj["name"]["common"], code: countryObj["cca2"] }});
        countries.sort(
          (a,b) => {
            if(a.name < b.name)
              return -1;
            if(a.name < b.name)
              return 1;
            return 0;
          });
          console.log(countries);
          
          this._countries.next(countries);
      }
    );
  }
}
