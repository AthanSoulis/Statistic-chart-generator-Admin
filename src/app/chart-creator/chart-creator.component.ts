import { Component, OnInit, AfterViewInit, Input, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { Profile } from '../services/mapping-profiles-service/mapping-profiles.service';
import { BehaviorSubject } from 'rxjs';
import { SCGAFormSchema } from './chart-form-schema.classes';
import { FormSchema } from './chart-form-schema.model';
import { FormComponent } from 'ngx-schema-form';
import { ErrorHandlerService } from '../services/error-handler-service/error-handler.service';
import { DynamicFormHandlingService } from '../services/dynamic-form-handling-service/dynamic-form-handling.service';
import { isNullOrUndefined } from 'util';

declare var jQuery: any;

@Component({
  selector: 'chart-creator',
  templateUrl: './chart-creator.component.html',
  styleUrls: ['./chart-creator.component.scss']
})
export class ChartCreatorComponent implements OnInit, AfterViewInit, AfterContentInit {

  @Input() loadedChart: Object = null;
  profileMapping: Profile = null;

  fs: FormSchema;
  formErrors: BehaviorSubject<Array<any>>;

  constructor(protected errorHandlerService: ErrorHandlerService,
    protected dynamicFormHandlingService: DynamicFormHandlingService,
    protected cdr: ChangeDetectorRef) {
      // this.fs = new FormSchema();
      this.fs = this.dynamicFormHandlingService.formSchema;
      this.formErrors = new BehaviorSubject<Array<any>>([]);
  }

  ngOnInit() {}

  ngAfterViewInit(): void { this.dynamicFormHandlingService.resetFormValue = this.dynamicFormHandlingService.formSchemaObject; }
  ngAfterContentInit(): void {}

  get formValue(): SCGAFormSchema { return this.dynamicFormHandlingService.formSchemaObject; }
  get isFormValid() { return this.dynamicFormHandlingService.isFormValid; }

  dynamicFormChanged(formSchemaValueObj: {value: SCGAFormSchema}) {

    // Updating non Null or Undefined DynamicForm
    if (!isNullOrUndefined(formSchemaValueObj)) {
      // console.log('Updating non Null or Undefined DynamicForm', formSchemaValueObj.value);
      this.dynamicFormHandlingService.formSchemaObject = formSchemaValueObj.value;
    }

    // this.dynamicFormHandlingService.printLogs();
  }

  reset(form: FormComponent) {
    this.dynamicFormHandlingService.resetForm(form.rootProperty);
    // this.cdr.detectChanges();
    this.closeClearModal();
  }

  // Update the Dynamic Form Handling Service of the errors
  errorsChange(formErrorsObj: {value: Array<any>}) {
    this.dynamicFormHandlingService.$formErrorObject.next(formErrorsObj.value);
  }

  openClearModal() {
    jQuery('.ui.formClear.modal')
    .modal('show');
  }
  closeClearModal() {
    jQuery('.ui.formClear.modal')
    .modal('hide');
  }
  scrollToTop() {
    jQuery('html, body').animate({scrollTop: 0}, 300);
  }
}
