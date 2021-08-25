import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartExportingService } from '../../services/chart-exporting-service/chart-exporting.service';
import { DynamicFormHandlingService } from '../../services/dynamic-form-handling-service/dynamic-form-handling.service';
import { NgbModalResolutions } from '../ngb-modal-resolutions.enum';
@Component({
  selector: 'chart-table-modal',
  templateUrl: './chart-table-modal.component.html',
  styleUrls: ['./chart-table-modal.component.scss']
})
export class ChartTableModalComponent {

  public modalContext: ChartTableModalContext;

  constructor(public activeModal: NgbActiveModal,
    public chartExportingService: ChartExportingService,
    public dynamicFormHandlingService: DynamicFormHandlingService) {}

  protected dismissModal()
  {
    this.activeModal.dismiss(NgbModalResolutions.Dismiss);
  }

  protected closeModal()
  {
    this.activeModal.close(NgbModalResolutions.Cancel);
  }
}

export class ChartTableModalContext {
  chartObj: Object;
  tableObj: Object;
  rawChartDataObj: Object;
  rawDataObj: Object;

  constructor( c:Object, t:Object, rcd: Object, rd:Object)
  {
    this.chartObj = c;
    this.tableObj = t;
    this.rawChartDataObj = rcd;
    this.rawDataObj = rd;
  }
}