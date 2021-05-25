import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DynamicFormHandlingService } from '../../services/dynamic-form-handling-service/dynamic-form-handling.service';
import { TabActivationStatusService } from '../../services/tab-activation-status-service/tab-activation-status.service';
import { NgbModalResolutions } from '../ngb-modal-resolutions.enum';

@Component({
  selector: 'clear-form-modal',
  templateUrl: './clear-form-modal.component.html',
  styleUrls: ['./clear-form-modal.component.scss']
})
export class ClearFormModalComponent implements OnInit {

  @Input() formRoot: any;

  constructor(public activeModal: NgbActiveModal,
    protected dynamicFormHandlingService: DynamicFormHandlingService,
    protected tabActivationStatusService: TabActivationStatusService) { }

  ngOnInit() {
  }

  public dismissModal()
  {
    this.activeModal.dismiss(NgbModalResolutions.Dismiss);
  }

  public closeModal()
  {
    this.activeModal.close(NgbModalResolutions.Cancel);
  }

  public resetForm()
  {
    if(!(this.formRoot === null || this.formRoot === undefined))
    {
      this.dynamicFormHandlingService.resetForm(this.formRoot);
      // Set the active tab of the Head Menu Nav to be the first tab.
      this.tabActivationStatusService.activeId = this.tabActivationStatusService.tabIds[0];
      this.activeModal.close(NgbModalResolutions.Reset);
    }
  }
}
