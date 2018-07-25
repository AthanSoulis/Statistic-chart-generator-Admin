import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroupDirective, ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupportedLibrariesService } from '../../services/supported-libraries-service/supported-libraries.service';
import { ChartProperties } from './chart-properties.model';
import { SupportedChartTypesService } from '../../services/supported-chart-types-service/supported-chart-types.service';
import { Profile, MappingProfilesService } from '../../services/mapping-profiles-service/mapping-profiles.service';
import { Subscription } from 'rxjs';

declare var jQuery: any;

@Component({
  selector: 'chart-properties-selector',
  templateUrl: './chart-properties-selector.component.html',
  styleUrls: ['./chart-properties-selector.component.css'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class ChartPropertiesSelectorComponent implements OnDestroy, OnInit, AfterViewInit {

  @Input() propertiesForm: FormGroup;
  @Output() profileChanged: EventEmitter<Profile> = new EventEmitter();

  supportedLibraries: Array<string>;
  supportedChartTypes: Array<string>;
  profileMappings: Array<Profile>;
  chartProperties: ChartProperties;

  mappingProfileServiceSubscription: Subscription;

  formPlaceholders = {
    library : '',
    chartTitle : 'Title',
    chartType : '',
    yaxisName : 'Y Axis',
    xaxisName : 'X Axis'
  };

  constructor(formBuilder: FormBuilder,
    private librariesService: SupportedLibrariesService,
    private chartTypesService: SupportedChartTypesService,
    private mappingProfileService: MappingProfilesService) {

    librariesService.getSupportedLibraries().subscribe(
      (data: Array<string>) => this.supportedLibraries = data // success path
        // error => this.error = error // error path
    );

    chartTypesService.getSupportedChartTypes().subscribe(
      (data: Array<string>) => this.supportedChartTypes = data // success path
        // error => this.error = error // error path
    );
  }

  get profile() { return this.propertiesForm.get('profile'); }
  get library() { return this.propertiesForm.get('library'); }
  get chartTitle() { return this.propertiesForm.get('chartTitle'); }
  get chartType() { return this.propertiesForm.get('chartType'); }
  get yaxisName() { return this.propertiesForm.get('yaxisName'); }
  get xaxisName() { return this.propertiesForm.get('xaxisName'); }

  cardButtonAction(profile: Profile) {
    console.log(this.propertiesForm);
    this.mappingProfileService.changeSelectedProfile(profile);

    this.closeProfilePicker();
  }

  showProfilePicker() {
    jQuery('.ui.mapping.modal')
    .modal({
      transition: 'scale',
      closable  : false
    })
    .modal('show');
  }

  closeProfilePicker() {
    jQuery('.ui.mapping.modal')
    .modal({
      transition: 'scale',
      closable  : false
    })
    .modal('hide');
  }

  ngOnInit() {
    console.log('Properties Selector initialized');

    this.mappingProfileServiceSubscription = this.mappingProfileService.selectedProfile$
    .subscribe(profile => this.profile.setValue(profile));
  }

  ngAfterViewInit(): void {
    this.mappingProfileService.getProfileMappings().subscribe(
      (result: Profile[]) => {
        this.profileMappings = result;
        this.showProfilePicker();
      },
      (err: any) => {
        console.log(err);

      },
      () => {

      }
    );
  }

  dropdownFormatter(option: string, query?: string): string {
    return option.charAt(0).toUpperCase() + option.slice(1);
  }

  ngOnDestroy() {
    console.log('Properties Selector destroyed');
    this.mappingProfileServiceSubscription.unsubscribe();
  }
}
