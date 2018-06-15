import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  chartObject: Object;
  tableObject: Object;

  ngOnInit() {
  }

  handleChartObject($event) {
    console.log('Handle chart Object called!');
    this.chartObject = $event.value;
    console.log(this.chartObject);
  }

  handleTableObject($event) {
    console.log('Handle table Object called!');
    this.tableObject = $event.value;
    console.log(this.tableObject);
  }
}
