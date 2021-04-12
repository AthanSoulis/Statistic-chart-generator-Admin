import { ChartTableModalContext } from './../../modals/chart-table-modal/chart-table-modal.component';
import { Component, ViewChild } from '@angular/core';
import { ObjectLayoutWidget } from 'ngx-schema-form';
import { MappingProfilesService } from '../../services/mapping-profiles-service/mapping-profiles.service';
import { DiagramCategoryService } from '../../services/diagram-category-service/diagram-category.service';
import { TabActivationStatusService } from '../../services/tab-activation-status-service/tab-activation-status.service';
import { DynamicFormHandlingService } from '../../services/dynamic-form-handling-service/dynamic-form-handling.service';
import { ChartTableModalComponent } from '../../modals/chart-table-modal/chart-table-modal.component';
import { NgbModal, NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { ClearFormModalComponent } from "../../modals/clear-form-modal/clear-form-modal.component";

@Component({
  selector: 'head-menu-widget',
  templateUrl: './head-menu-widget.component.html',
  styleUrls: ['./head-menu-widget.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeadMenuWidgetComponent extends ObjectLayoutWidget {

  @ViewChild('headNav', {static: false}) nav:NgbNav; 

  constructor(public mappingProfileService: MappingProfilesService,
              public diagramCategoryService: DiagramCategoryService,
              public tabActivationStatusService: TabActivationStatusService,
              public dynamicFormHandlingService: DynamicFormHandlingService,
              private modalService: NgbModal) {
    super();
  }

  public reset() {
    this.dynamicFormHandlingService.resetForm(this.formProperty.root);
  }

  openClearModal() {
    const modalRef = this.modalService.open(ClearFormModalComponent, { centered: true });
    (modalRef.componentInstance as ClearFormModalComponent).formRoot = this.formProperty.root;

  }

  applyChanges() {
    this.dynamicFormHandlingService.submitForm();
    const modalRef = this.modalService.open(ChartTableModalComponent, { centered: true, size: 'lg' });

    (modalRef.componentInstance as ChartTableModalComponent).modalContext = 
      new ChartTableModalContext(this.dynamicFormHandlingService.ChartObject,this.dynamicFormHandlingService.TableObject,
                              this.dynamicFormHandlingService.RawChartDataObject,this.dynamicFormHandlingService.RawDataObject);

  }
  
}
