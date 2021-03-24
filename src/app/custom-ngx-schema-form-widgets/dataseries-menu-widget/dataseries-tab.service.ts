import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataseriesTabService {

  dataseriesTabs: DataseriesTabStatus[];

  constructor() { this.dataseriesTabs=[]; }

  public isEditable(index: number): boolean
  { return this.dataseriesTabs[index].editable;}

  public setEditable(index: number, editable: boolean)
  { this.dataseriesTabs[index].editable = editable;}
}

interface DataseriesTabStatus {
  
  active: boolean
  editable: boolean
}
