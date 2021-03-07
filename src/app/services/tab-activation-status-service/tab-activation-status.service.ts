import { Injectable } from '@angular/core';
import { NgbTab, NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class TabActivationStatusService {
  private steps: Array<boolean>;

  private _tabset: NgbTabset;
  public tabs: Array<string>;

  constructor() {
    this.steps = [true, false, false, false];
    this.tabs = ['tab-data-view','tab-category','tab-dataseries','tab-appearance'];
  }

  public set tabset(tabset: NgbTabset)
  {
      this._tabset = tabset;
      console.log(this._tabset);
  }

  public get viewTabStatus(): boolean { return this.steps[0]; }
  public set viewTabStatus(status: boolean) {
    this.steps[0] = status;
    
    if(status)
    {
      this._tabset.tabs.toArray()[0].disabled = !status; // This one is needed because the disabled property is not an @Output besides an @Input and status changes are not immediately propagated
      this._tabset.select(this.tabs[0]);
    }
      
  }

  public get categoryTabStatus(): boolean { return this.steps[1]; }
  public set categoryTabStatus(status: boolean) {
    this.steps[1] = status;
    
    if(status)
    {
      this._tabset.tabs.toArray()[1].disabled = false; // This one is needed because the disabled property is not an @Output besides an @Input and status changes are not immediately propagated
      this._tabset.select(this.tabs[1]);
    }
  }

  public get dataseriesTabStatus(): boolean { return this.steps[2]; }
  public set dataseriesTabStatus(status: boolean) {
    this.steps[2] = status;
    
    if(status)
    {
      this._tabset.tabs.toArray()[2].disabled = false; // This one is needed because the disabled property is not an @Output besides an @Input and status changes are not immediately propagated
      this._tabset.select(this.tabs[2]);
    }
  }

  public get appearanceTabStatus(): boolean { return this.steps[3]; }
  public set appearanceTabStatus(status: boolean) {
    this.steps[3] = status;

    if(status)
    {
      this._tabset.tabs.toArray()[3].disabled = false; // This one is needed because the disabled property is not an @Output besides an @Input and status changes are not immediately propagated
      this._tabset.select(this.tabs[3]);
    }
  }
}
