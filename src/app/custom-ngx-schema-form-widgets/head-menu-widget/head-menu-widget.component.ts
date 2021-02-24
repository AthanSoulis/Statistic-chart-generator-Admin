import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ObjectLayoutWidget } from 'ngx-schema-form';
import { MappingProfilesService } from '../../services/mapping-profiles-service/mapping-profiles.service';
import { DiagramCategoryService } from '../../services/diagram-category-service/diagram-category.service';
import { TabActivationStatusService } from '../../services/tab-activation-status-service/tab-activation-status.service';
import { DynamicFormHandlingService } from '../../services/dynamic-form-handling-service/dynamic-form-handling.service';
import { ChartTableModal } from '../../modals/chart-table-modal/chart-table-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClearFormModalComponent } from "../../modals/clear-form-modal/clear-form-modal.component";

declare var jQuery: any;

@Component({
  selector: 'head-menu-widget',
  templateUrl: './head-menu-widget.component.html',
  styleUrls: ['./head-menu-widget.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeadMenuWidgetComponent extends ObjectLayoutWidget implements OnInit {

  constructor(public mappingProfileService: MappingProfilesService,
              public diagramCategoryService: DiagramCategoryService,
              public tabActivationStatusService: TabActivationStatusService,
              public dynamicFormHandlingService: DynamicFormHandlingService,
              private modalService: NgbModal) {
    super();
  }

  ngOnInit() {}

  public reset() {
    this.dynamicFormHandlingService.resetForm(this.formProperty.root);
  }

  openClearModal() {
    const modalRef = this.modalService.open(ClearFormModalComponent, { centered: true });
    (modalRef.componentInstance as ClearFormModalComponent).formRoot = this.formProperty.root;

  }

  applyChanges() {
    this.dynamicFormHandlingService.submitForm();
  }
}
