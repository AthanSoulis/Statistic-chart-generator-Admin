import { Component, OnInit, ViewChild} from '@angular/core';
import { ChartCreatorComponent } from './chart-creator/chart-creator.component';
import { ChartExportingService } from './services/chart-exporting-service/chart-exporting.service';
import { ChartLoadingService } from './services/chart-loading-service/chart-loading.service';
import { DynamicFormHandlingService } from './services/dynamic-form-handling-service/dynamic-form-handling.service';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap/popover/popover.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(ChartCreatorComponent) childChartCreator: ChartCreatorComponent;

  chartModel: Object;
  loadedChartFile: File = null;

  constructor(protected chartExportingService: ChartExportingService,
    protected chartLoadingService: ChartLoadingService,
    public dfhs: DynamicFormHandlingService) {}

  ngOnInit() {}

  handlePopUpOpen(event: any) {
    console.log(event);
  }

  public toggleSharePopover(popover: NgbPopover) {
    this.dfhs.publishURLS();
    popover.toggle();
  }

  public saveChartPopover(popover: NgbPopover) {
    
    if (!(this.childChartCreator instanceof ChartCreatorComponent)) {
      console.error('childChartCreator not an instance of ChartCreatorComponent');
      return;
    }

    if (popover.isOpen()){
      popover.close();
      return;
    }
      
    popover.open();    
    this.dfhs.exportForm();
  
  }

  public openLoadChartPopover(popover: NgbPopover)
  {
    popover.toggle();
  }
  
  public resetLoadChartPopover()
  {
    this.dfhs.resetLoadForm();
  }

  public initiateFilePicker() {
    const fileElem = document.getElementById('fileElem');
    
    if (fileElem)
      fileElem.click();
    
  }
}
