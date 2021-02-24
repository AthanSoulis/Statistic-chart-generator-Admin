import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { PropertyGroup } from 'ngx-schema-formlib/model/formproperty';
import { DynamicFormHandlingService } from '../../services/dynamic-form-handling-service/dynamic-form-handling.service';
import { NgbModalResolutions } from '../ngb-modal-resolutions.enum';

@Component({
  selector: 'clear-form-modal',
  templateUrl: './clear-form-modal.component.html',
  styleUrls: ['./clear-form-modal.component.scss']
})
export class ClearFormModalComponent implements OnInit {

  @Input() formRoot: any;

  constructor(public activeModal: NgbActiveModal,
    protected dynamicFormHandlingService: DynamicFormHandlingService) { }

  ngOnInit() {
  }

  protected dismissModal()
  {
    this.activeModal.dismiss(NgbModalResolutions.Dismiss);
  }

  protected closeModal()
  {
    this.activeModal.close(NgbModalResolutions.Cancel);
  }

  protected resetForm()
  {
    if(!(this.formRoot === null || this.formRoot === undefined))
    {
      this.dynamicFormHandlingService.resetForm(this.formRoot);
      this.activeModal.close(NgbModalResolutions.Reset);
    }
  }
}
