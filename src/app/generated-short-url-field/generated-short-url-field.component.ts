import { ToastService } from './../services/toast-service/toast.service';
import { first } from 'rxjs/operators';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'generated-short-url-field',
  templateUrl: './generated-short-url-field.component.html',
  styleUrls: ['./generated-short-url-field.component.scss']
})
export class GeneratedShortUrlFieldComponent implements OnChanges {

  @Input('dataName') field_name: string;
  @Input('shortUrl') url$: Observable<string>;
  @Input('isUrlLoading') isUrlLoading$: Observable<boolean>;
  @Input('isPopoverOpen') isPopoverOpen: boolean;
  
  public clipboardCopyMessage = "Copied to clipboard !";
  public copiedUrl = false;

  constructor(public toastService: ToastService) { }

  ngOnChanges(changes: SimpleChanges) 
  {
    if(changes.isPopoverOpen)
    {
      this.copiedUrl = false;
    }
  }

  public copyURLToClipboard()
  {
    if(!navigator.clipboard)
    {
      // this.toastService.show("Cannot copy to clipboard!",{ classname: 'bg-danger text-light', delay: 15000 });
      this.copiedUrl = false;
      return;
    }
    
    this.url$.pipe(first()).subscribe(
      (shortUrl: string)=> {
        navigator.clipboard.writeText(shortUrl).then( 
          ()=>{
            // console.log("Copied!");
            this.copiedUrl = true;
            // this.toastService.show("Copied to clipboard !",{ classname: 'bg-success text-light', delay: 10000 });
          },
          (err)=>{
            console.error(err);
            this.copiedUrl = false;
            // this.toastService.show("Cannot copy to clipboard !",{ classname: 'bg-danger text-light', delay: 15000 })
          });
    });
  }

  public closeAlert()
  {
    console.log("Close");
    
    this.copiedUrl = false;
  }
}
