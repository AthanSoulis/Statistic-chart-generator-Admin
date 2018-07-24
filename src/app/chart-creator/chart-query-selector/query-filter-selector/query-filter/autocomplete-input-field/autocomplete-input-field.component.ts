import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';
import { Observable, of, fromEvent } from 'rxjs';
import { map, filter, debounceTime, tap, switchAll } from 'rxjs/operators';
import { FieldAutocompleteService, AutocompleteResponse } from '../../../../../services/field-autocomplete-service/field-autocomplete.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'autocomplete-input-field',
  templateUrl: './autocomplete-input-field.component.html',
  styleUrls: ['./autocomplete-input-field.component.css']
})
export class AutocompleteInputFieldComponent implements OnInit, AfterViewInit {

  // The FormGroup of the current filter
  @Input() inputFormGroup: FormControl;
  // The index of the current filter input value
  @Input() filterValueIndex: any;
  // The selected field for the current filter
  @Input() filterfield: string;
  // Dom element for the autocomplete
  @ViewChild('autoInputField') valueInput: ElementRef;

  possibleFieldValues: Observable<Array<string>>;
  numberOfpossibleFieldValues: number;
  loading: boolean;
  typeToSearchDelay: number;

  constructor(private fieldAutocompleteService: FieldAutocompleteService) {
    this.possibleFieldValues = of([]);
    this.typeToSearchDelay = 250;
    this.loading = false;
    this.numberOfpossibleFieldValues = 0;
  }

  ngOnInit() {
    console.log('Autocomplete:');
    console.log(this.inputFormGroup);
    console.log(this.filterValueIndex);

  }
  ngAfterViewInit() {
    this.setupAutocompleteInputField();
  }

  setupAutocompleteInputField(): void {

    fromEvent(this.valueInput.nativeElement, 'keyup').pipe(
      map((inputVal: any) => inputVal.target.value),
      filter((text: string) => text.length > 0),
      debounceTime(this.typeToSearchDelay),
      tap(() => {this.possibleFieldValues = of([]); this.loading = true; } ),
      map((queryText: string) => this.fieldAutocompleteService.getAutocompleteFields(this.filterfield, queryText)),
      switchAll())
      .subscribe(
        (result: AutocompleteResponse) => {
          console.log('Returned ' + result.count + ' possible values');
          this.possibleFieldValues = of(result.values);
          this.numberOfpossibleFieldValues = result.count;
          this.loading = false;
        },
        (err: any) => {
          console.log(err);
          this.numberOfpossibleFieldValues = -1;
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
  }

}
