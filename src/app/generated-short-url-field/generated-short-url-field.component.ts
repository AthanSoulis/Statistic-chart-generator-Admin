import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'generated-short-url-field',
  templateUrl: './generated-short-url-field.component.html',
  styleUrls: ['./generated-short-url-field.component.scss']
})
export class GeneratedShortUrlFieldComponent implements OnInit {

  @Input('dataName') field_name: string;
  @Input('shortUrl') url$: Observable<string>;
  @Input('isUrlLoading') isUrlLoading$: Observable<boolean>;
  
  constructor() { }

  ngOnInit() {}

}
