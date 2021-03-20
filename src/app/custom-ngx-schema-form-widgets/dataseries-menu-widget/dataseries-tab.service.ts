import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataseriesTabService {

  // 1-1 relation to the FormProperty[] showing which index is active and which is not
  active: boolean[] = [true];
  // 1-1 relation to the FormProperty[] showing which index is editable and which is not
  editable: boolean[] = [false];

  dataseriesTabIds: string[] = ['0'];

  constructor() { }

  public isEditable(index: number): boolean
  {
    return this.editable[index];
  }
}
