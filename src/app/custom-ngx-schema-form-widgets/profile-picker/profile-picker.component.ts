import { Component, OnInit, ViewChild, OnDestroy, AfterContentInit } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { TemplateModalConfig, ModalTemplate, SuiActiveModal, SuiModalService } from 'ng2-semantic-ui';
import { MappingProfilesService, Profile } from '../../services/mapping-profiles-service/mapping-profiles.service';
import { Subscription } from 'rxjs';

declare var jQuery: any;

export interface IContext {
  data: string;
}

@Component({
  selector: 'profile-picker',
  templateUrl: './profile-picker.component.html',
  styleUrls: ['./profile-picker.component.css']
})
export class ProfilePickerComponent extends ControlWidget implements OnInit, OnDestroy, AfterContentInit {

  @ViewChild('mappingModal')
  public modalTemplate: ModalTemplate<IContext, string, string>;
  private activeModal: SuiActiveModal<IContext, string, string>;

  mappingProfileServiceSubscription: Subscription;

  profileMappings: Array<Profile>;

  constructor(private mappingProfileService: MappingProfilesService,
              public modalService: SuiModalService) {
    super();

  }

  ngOnInit() {

    this.mappingProfileServiceSubscription = this.mappingProfileService.selectedProfile$
    .subscribe(profile => {
      if (profile) {
        this.formProperty.setValue(profile.name, true);
        // this.profile.setValue(profile.name);
      }});
  }

  ngAfterContentInit() {
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

  ngOnDestroy() {
    this.mappingProfileServiceSubscription.unsubscribe();
  }

  cardButtonAction(profile: Profile) {

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
    // this.activeModal = this.modalService.open(config);
    // this.activeModal.component.isClosable = false;

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

}
