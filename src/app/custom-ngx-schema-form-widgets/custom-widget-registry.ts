import { GeneralPropertiesWidgetComponent } from './general-properties-widget/general-properties-widget.component';
import { PropertyWidgetComponent } from './property-widget/property-widget.component';
import { LibrarySelectionWidgetComponent } from './library-selection-widget/library-selection-widget.component';
import { DefaultWidgetRegistry } from 'ngx-schema-form';

export class CustomWidgetRegistry extends DefaultWidgetRegistry {
  constructor() {
    super();

    this.register('csui-general-properties-object',  GeneralPropertiesWidgetComponent);
    this.register('csui-property-object',  PropertyWidgetComponent);
    this.register('csui-library-select',  LibrarySelectionWidgetComponent);
  }
}
