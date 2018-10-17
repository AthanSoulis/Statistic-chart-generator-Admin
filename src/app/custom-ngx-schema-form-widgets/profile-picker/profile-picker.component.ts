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

    this.formProperty.setValue(profile.name, false);
    this.closeProfilePicker();
  }

  showProfilePicker(dynamicContent: string) {

    const control = this.control;
    const cdrRef = this.cdr;
    jQuery('.ui.mapping.modal')
    .modal({
      transition: 'scale',
      // closable  : false
      onHide: function() {
        control.markAsTouched();
        // console.log(control.status);
        // console.log(control.errors);
        // console.log('Value: ' + control.value);
        cdrRef.detectChanges();

        return true;
      }
    })
    .modal('show');

    // {1} : I would use that but the ng2-semantic-ui css is not updated so I am stuck with jQuery

    // const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);
    // config.context = { data: dynamicContent };
    // this.activeModal = this.modalService.open(config);
    // this.activeModal.component.isClosable = false;

  }

  closeProfilePicker() {

    const control = this.control;
    const cdrRef = this.cdr;

    jQuery('.ui.mapping.modal')
    .modal({
      transition: 'scale',
      // closable  : false
      onApprove: function() {
        control.markAsDirty();
        console.log(this.control.status);
        console.log(this.control.errors);
        console.log('Value: ' + this.control.value);
        cdrRef.detectChanges();
        return true;
      }
    })
    .modal('hide');

    // {1} : I would use that but the ng2-semantic-ui css is not updated so I am stuck with jQuery
    // this.activeModal.deny(null);
  }

}
