import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartLoadingService {

  private $chartIsLoading: BehaviorSubject<boolean>;
  // Some kind of semaphore
  private _loadingObservables = 0;

  constructor() {
    this.$chartIsLoading = new BehaviorSubject<boolean>(false);
  }

  set chartLoadingStatus(isLoading: boolean) {
    this.$chartIsLoading.next(isLoading);
    console.log('Chart Loading: ' + this.chartLoadingStatus);
  }

  get chartLoadingStatus(): boolean {
    return this.$chartIsLoading.value;
  }

  increaseLoadingObs() {
    if (this.chartLoadingStatus) {
      this._loadingObservables++ ;
      // console.log('Obs: ' + this._loadingObservables);
  }}

  decreaseLoadingObs() {
    if (this.chartLoadingStatus) {
    this._loadingObservables-- ;
    // console.log('Obs: ' + this._loadingObservables);

    if (this._loadingObservables === 0) {
      this.chartLoadingStatus = false;
      console.log('Loading Done');
    }
    if (this._loadingObservables < 0) {
      console.error('Loadin observables is: ' + this._loadingObservables);
    }
  }}

}
