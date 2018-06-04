import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'chart-data-presentation-table-row',
  templateUrl: './chart-data-presentation-table-row.component.html',
  styleUrls: ['./chart-data-presentation-table-row.component.css']
})
export class ChartDataPresentationTableRowComponent implements OnInit {
  /**
  * @input rowObject - the Object that will populate the row
  */
  @Input()  rowObjects: Array<any>;

  constructor() { }

  ngOnInit() {
  }

}
