import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabActivationStatusService {
  private steps: Array<boolean>;

  constructor() {
    this.steps = [true, false, false, false];
  }

  public get viewTabStatus(): boolean {
    return this.steps[0];
  }
  public set viewTabStatus(status: boolean) {
    this.steps[0] = status;
  }

  public get categoryTabStatus(): boolean {
    return this.steps[1];
  }
  public set categoryTabStatus(status: boolean) {
    this.steps[1] = status;
  }

  public get dataseriesTabStatus(): boolean {
    return this.steps[2];
  }
  public set dataseriesTabStatus(status: boolean) {
    this.steps[2] = status;
  }

  public get appearanceTabStatus(): boolean {
    return this.steps[3];
  }
  public set appearanceTabStatus(status: boolean) {
    this.steps[3] = status;
  }
}
