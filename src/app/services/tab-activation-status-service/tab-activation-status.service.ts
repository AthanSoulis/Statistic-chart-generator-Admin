import { Injectable } from '@angular/core';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class TabActivationStatusService {

  public tabIds: Array<string>;

  public tabs: Map<string, boolean>;

  constructor() {
    this.tabIds = ['tab-data-view','tab-category','tab-dataseries','tab-appearance'];

    this.tabs = new Map<string, boolean>();
    this.tabs.set(this.tabIds[0], true)
    .set(this.tabIds[1], false)
    .set(this.tabIds[2], false)
    .set(this.tabIds[3], false);
    
  }

  public get activeId(): string { 
    for (let [key, value] of this.tabs.entries()) {
      if(value)
        return key;
    }
  }

  public set activeId( activeIndex: string)
  {
    let lastActiveId: string | null = null;

    for (let [key, value] of this.tabs.entries())
      if(value) 
      { 
        lastActiveId = key;
        break; 
      }
    
    if(lastActiveId !== null)
      this.tabs.set(lastActiveId,false);
    
    if(activeIndex !== null && activeIndex!== undefined)
      this.tabs.set(activeIndex,true);
  }
}
