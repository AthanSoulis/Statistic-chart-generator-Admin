import { GeneralPropertiesWidgetComponent } from './general-properties-widget/general-properties-widget.component';
import { PropertyWidgetComponent } from './property-widget/property-widget.component';
import { LibrarySelectionWidgetComponent } from './library-selection-widget/library-selection-widget.component';
import { SelectionWidgetComponent } from './selection-widget/selection-widget.component';
import { ChartTypeSelectionWidgetComponent } from './chart-type-selection-widget/chart-type-selection-widget.component';
import { EntitySelectionWidgetComponent } from './entity-selection-widget/entity-selection-widget.component';
import { AggregateSelectionWidgetComponent } from './aggregate-selection-widget/aggregate-selection-widget.component';
import { EntityFieldSelectionWidgetComponent } from './entity-field-selection-widget/entity-field-selection-widget.component';
import { ArrayWidgetComponent } from './array-widget/array-widget.component';
import { FilterFieldWidgetComponent } from './filter-field-widget/filter-field-widget.component';
import { DefaultWidgetRegistry } from 'ngx-schema-form';
import { OperatorSelectionWidgetComponent } from './operator-selection-widget/operator-selection-widget.component';
import { FilterPropertyWidgetComponent } from './filter-property-widget/filter-property-widget.component';
import { FilterFieldArrayWidgetComponent } from './filter-field-array-widget/filter-field-array-widget.component';
import { ProfilePickerComponent } from './profile-picker/profile-picker.component';
import { DataseriesMenuWidgetComponent } from './dataseries-menu-widget/dataseries-menu-widget.component';
import { HeadMenuWidgetComponent } from './head-menu-widget/head-menu-widget.component';
import { RadioWidgetComponent } from './radio-widget/radio-widget.component';
import { ColorPickerWidgetComponent } from './color-picker-widget/color-picker-widget.component';
import { BooleanFieldWidgetComponent } from './boolean-field-widget/boolean-field-widget.component';
import { NumberFieldWidgetComponent } from './number-field-widget/number-field-widget.component';
import { StringFieldWidgetComponent } from './string-field-widget/string-field-widget.component';
import { ViewPropertiesWidgetComponent } from './view-properties-widget/view-properties-widget.component';
import { CategoryPropertiesWidgetComponent } from './category-properties-widget/category-properties-widget.component';
import { DiagramCategoryPickerComponent } from './diagram-category-picker/diagram-category-picker.component';
import { FilterArrayWidgetComponent } from './filter-array-widget/filter-array-widget.component';
import { TabularMenuWidgetComponent } from './tabular-menu-widget/tabular-menu-widget.component';
import {SelectQueryNameComponent} from './select-query-name/select-query-name.componet';

export class CustomWidgetRegistry extends DefaultWidgetRegistry {
  constructor() {
    super();

    this.register('csui-general-properties-object',  GeneralPropertiesWidgetComponent);
    this.register('csui-property-object',  PropertyWidgetComponent);
    this.register('csui-filter-property-object',  FilterPropertyWidgetComponent);
    this.register('csui-library-select',  LibrarySelectionWidgetComponent);
    this.register('csui-chart-type-select',  ChartTypeSelectionWidgetComponent);
    this.register('csui-entity-select',  EntitySelectionWidgetComponent);
    this.register('csui-entity-field-select', EntityFieldSelectionWidgetComponent);
    this.register('csui-aggregate-select', AggregateSelectionWidgetComponent);
    this.register('csui-operator-select', OperatorSelectionWidgetComponent);
    this.register('csui-select', SelectionWidgetComponent);
    this.register('csui-filter-field', FilterFieldWidgetComponent);
    this.register('csui-array', ArrayWidgetComponent);
    this.register('csui-profile-picker', ProfilePickerComponent);
    this.register('csui-filter-field-array', FilterFieldArrayWidgetComponent);
    this.register('csui-filter-array', FilterArrayWidgetComponent);
    this.register('csui-dataseries-menu', DataseriesMenuWidgetComponent);
    this.register('csui-head-menu', HeadMenuWidgetComponent);
    this.register('csui-radio-selection', RadioWidgetComponent);
    this.register('csui-color-picker', ColorPickerWidgetComponent);
    this.register('csui-boolean', BooleanFieldWidgetComponent);
    this.register('csui-number', NumberFieldWidgetComponent);
    this.register('csui-string', StringFieldWidgetComponent);
    this.register('csui-view-properties-object', ViewPropertiesWidgetComponent);
    this.register('csui-category-properties-object', CategoryPropertiesWidgetComponent);
    this.register('csui-diagram-category-component', DiagramCategoryPickerComponent);
    this.register('csui-tabular-menu', TabularMenuWidgetComponent);
    this.register('csui-select-query-name', SelectQueryNameComponent);
  }
}
