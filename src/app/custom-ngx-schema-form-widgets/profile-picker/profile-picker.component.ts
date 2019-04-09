import { Component, OnDestroy, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { SuiModalService } from 'ng2-semantic-ui';
import { MappingProfilesService, Profile } from '../../services/mapping-profiles-service/mapping-profiles.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { CardPicker } from '../diagram-category-picker/diagram-category-picker.component';
import { TabActivationStatusService } from '../../services/tab-activation-status-service/tab-activation-status.service';


declare var jQuery: any;

export interface IContext {
  data: string;
}

@Component({
  selector: 'profile-picker',
  templateUrl: './profile-picker.component.html',
  styleUrls: ['./profile-picker.component.css']
})
export class ProfilePickerComponent extends ControlWidget implements OnDestroy, AfterContentInit, CardPicker {

  get profileInitialized() {
    return this.formProperty.value !== null &&
     this.formProperty.value !== undefined &&
     this.formProperty.value !== ''; }

  subscriptions: Array<Subscription>;

  constructor(public mappingProfileService: MappingProfilesService,
              private tabActicationStatusService: TabActivationStatusService,
              public modalService: SuiModalService,
              private cdr: ChangeDetectorRef) {
    super();
    this.subscriptions = new Array();
  }

  ngAfterContentInit() {

    this.subscriptions.push(
    (<BehaviorSubject<string>> this.formProperty.valueChanges)
    .subscribe(profile => {

        this.mappingProfileService.changeSelectedProfile(profile);
        this.cdr.detectChanges();

    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach( suscription => {
        suscription.unsubscribe();
    });
  }

  cardButtonAction(profile: Profile) {

    // Changes active tab to the next
    this.tabActicationStatusService.categoryTabStatus = true;

    if ( this.formProperty.value !== profile.name ) {
      this.formProperty.setValue(profile.name, false);
    }
  }

  isProfileSelected(profile: Profile): boolean {
    if (profile === this.mappingProfileService.selectedProfile$.value) {
      return true;
    }
    return false;
  }

  setSelectedCardStyle(isSelected: boolean) {
    if (isSelected) {
      return {border: 'solid', color: '#2185d0', 'border-radius': '0.5em' };
    }
    return {border: 'none'};
  }
}
