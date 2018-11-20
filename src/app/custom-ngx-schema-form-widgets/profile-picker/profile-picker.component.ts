import { Component, OnInit, ViewChild, OnDestroy, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { TemplateModalConfig, ModalTemplate, SuiActiveModal, SuiModalService } from 'ng2-semantic-ui';
import { MappingProfilesService, Profile } from '../../services/mapping-profiles-service/mapping-profiles.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { ArrayProperty } from 'ngx-schema-form/lib/model/arrayproperty';

declare var jQuery: any;

export interface IContext {
  data: string;
}

@Component({
  selector: 'profile-picker',
  templateUrl: './profile-picker.component.html',
  styleUrls: ['./profile-picker.component.css']
})
export class ProfilePickerComponent extends ControlWidget implements OnDestroy, AfterContentInit {

  @ViewChild('mappingModal')
  public modalTemplate: ModalTemplate<IContext, string, string>;
  private activeModal: SuiActiveModal<IContext, string, string>;
  private _hasBeenInitialized = false;

  set hasBeenInitialized(init: boolean) { this._hasBeenInitialized = init; }
  get hasBeenInitialized() { return this._hasBeenInitialized; }

  subscriptions: Array<Subscription>;

  constructor(protected mappingProfileService: MappingProfilesService,
              public modalService: SuiModalService,
              protected cdr: ChangeDetectorRef) {
    super();
    this.subscriptions = new Array();
  }

  ngAfterContentInit() {
    const dataseriesArray = <ArrayProperty>this.formProperty.searchProperty('/dataseries');

    this.subscriptions.push(
    (<BehaviorSubject<string>> this.formProperty.valueChanges)
    .subscribe(profile => {
      if (profile) {
        this.mappingProfileService.changeSelectedProfile(profile);
        this.cdr.detectChanges();
        dataseriesArray.reset([{'data': {'xaxisData': [], 'filters': []}, 'chartProperties': {'dataseriesName': 'Data'}}] );
      }
    }));

    this.showProfilePicker(null);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(element => {
      element.unsubscribe();
    });
  }

  cardButtonAction(profile: Profile) {

    if ( this.formProperty.value !== profile.name ) {
      this.formProperty.setValue(profile.name, false);
    }
    this.hideProfilePicker();
  }

  showProfilePicker(dynamicContent: string) {

    const control = this.control;
    const cdrRef = this.cdr;
    const caller = this;

    jQuery('.ui.mapping.modal')
    .modal({
      transition: 'scale',
      // closable  : false
      onHide: (element: any) => {
        control.markAsTouched();
        cdrRef.detectChanges();

        return true;
      },
      onHidden: () => {
        if (this.formProperty.value !== null) {
          caller.hasBeenInitialized = true;
        }
      }
    })
    .modal('show');

    // {1} : I would use that but the ng2-semantic-ui css is not updated so I am stuck with jQuery

    // const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);
    // config.context = { data: dynamicContent };
    // this.activeModal = this.modalService.open(config);
    // this.activeModal.component.isClosable = false;

  }

  hideProfilePicker() {

    jQuery('.ui.mapping.modal')
    .modal('hide');

    // {1} : I would use that but the ng2-semantic-ui css is not updated so I am stuck with jQuery
    // this.activeModal.deny(null);
  }

}
