import { Component } from '@angular/core';
import { SuiModal, ComponentModalConfig, ModalSize } from 'ng2-semantic-ui';
import { ChartExportingService } from '../services/chart-exporting-service/chart-exporting.service';
import {DynamicFormHandlingService} from '../services/dynamic-form-handling-service/dynamic-form-handling.service';

interface IChartTableModalContext {
  chartObj: Object;
  tableObj: Object;
  rawChartDataObj: Object;
  rawDataObj: Object;
}

@Component({
  selector: 'chart-table-modal',
  templateUrl: './chart-table-modal.component.html',
  styleUrls: ['./chart-table-modal.component.css']
})
export class ChartTableModalComponent {

  activeTab = 1;
  constructor(public modal: SuiModal<IChartTableModalContext, void, void>,
    public chartExportingService: ChartExportingService,
    public dynamicFormHandlingService: DynamicFormHandlingService) {}

}

export class ChartTableModal extends ComponentModalConfig<IChartTableModalContext, void, void> {
  constructor(chartObj: Object, tableObj: Object, rawChartDataObj: Object, rawDataObj: Object) {
      console.log('Creating modal with:', chartObj, tableObj, rawDataObj);
      super(ChartTableModalComponent, { chartObj, tableObj, rawChartDataObj, rawDataObj });

      this.isClosable = true;
      this.size = ModalSize.Normal;
      this.isFullScreen = true;
      this.transition = 'slide down';
  }
}
