import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroupDirective, ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupportedLibrariesService } from '../../services/supported-libraries-service/supported-libraries.service';
import { ChartProperties } from './chart-properties.model';
import { SupportedChartTypesService } from '../../services/supported-chart-types-service/supported-chart-types.service';
import { Profile, MappingProfilesService } from '../../services/mapping-profiles-service/mapping-profiles.service';
import { Subscription } from 'rxjs';
import { SuiModalService, ModalTemplate, TemplateModalConfig, SuiActiveModal } from 'ng2-semantic-ui';

declare var jQuery: any;

export interface IContext {
  data: string;
}

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

  @ViewChild('mappingModal')
  public modalTemplate: ModalTemplate<IContext, string, string>;
  private activeModal: SuiActiveModal<IContext, string, string>;

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
    private mappingProfileService: MappingProfilesService,
    public modalService: SuiModalService) {

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

  showProfilePicker(dynamicContent: string) {

    jQuery('.ui.mapping.modal')
    .modal({
      transition: 'scale',
      closable  : false
    })
    .modal('show');

    // {1} : I would use that but the ng2-semantic-ui css is not updated so I am stuck with jQuery

    // const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);
    // config.context = { data: dynamicContent };
    //  this.activeModal = this.modalService.open(config);
    //  this.activeModal.component.isClosable = false;

  }

  closeProfilePicker() {

    jQuery('.ui.mapping.modal')
    .modal({
      transition: 'scale',
      closable  : false
    })
    .modal('hide');

    // {1} : I would use that but the ng2-semantic-ui css is not updated so I am stuck with jQuery
    // this.activeModal.deny(null);
  }

  ngOnInit() {
    console.log('Properties Selector initialized');

    this.mappingProfileServiceSubscription = this.mappingProfileService.selectedProfile$
    .subscribe(profile => {
      if (profile) {
        this.profile.setValue(profile.name);
      }});
  }

  ngAfterViewInit(): void {
    this.mappingProfileService.getProfileMappings().subscribe(
      (result: Profile[]) => {
        this.profileMappings = result;
        this.showProfilePicker(null);
      },
      (err: any) => {
        console.log(err);
      },
      () => {}
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
