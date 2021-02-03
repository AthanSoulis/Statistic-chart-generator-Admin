import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ObjectLayoutWidget } from 'ngx-schema-form';
import { MappingProfilesService } from '../../services/mapping-profiles-service/mapping-profiles.service';
import { DiagramCategoryService } from '../../services/diagram-category-service/diagram-category.service';
import { TabActivationStatusService } from '../../services/tab-activation-status-service/tab-activation-status.service';
import { DynamicFormHandlingService } from '../../services/dynamic-form-handling-service/dynamic-form-handling.service';
import { ChartTableModal } from '../../chart-table-modal/chart-table-modal.component';

declare var jQuery: any;

@Component({
  selector: 'head-menu-widget',
  templateUrl: './head-menu-widget.component.html',
  styleUrls: ['./head-menu-widget.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeadMenuWidgetComponent extends ObjectLayoutWidget implements OnInit {

  constructor(public mappingProfileService: MappingProfilesService,
              public diagramCategoryService: DiagramCategoryService,
              public tabActivationStatusService: TabActivationStatusService,
              public dynamicFormHandlingService: DynamicFormHandlingService) {
    super();
  }

  ngOnInit() {}

  public reset() {
    this.dynamicFormHandlingService.resetForm(this.formProperty.root);
  }

  openClearModal() {
    jQuery('.ui.formClear.modal')
    .modal('show');
  }

  applyChanges() {
    this.dynamicFormHandlingService.submitForm();
    // TODO Create the modal with the following JSON objects and Open it.  
    // this.modalService.open(new ChartTableModal(this.dynamicFormHandlingService.ChartObject,
    //     this.dynamicFormHandlingService.TableObject, this.dynamicFormHandlingService.RawChartDataObject,
    //     this.dynamicFormHandlingService.RawDataObject));
  }
}
