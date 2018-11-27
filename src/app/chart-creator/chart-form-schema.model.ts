import { FormProperty, PropertyGroup } from 'ngx-schema-form/lib/model/formproperty';
import { ObjectProperty } from 'ngx-schema-form/lib/model/objectproperty';

export interface SCGAFormSchema {
    generalChartProperties: PropertiesFormSchema;
    dataseries: DataseriesFormSchema[];
    appearance: AppearanceFormSchema;
}
export interface DataseriesFormSchema {
    data: DataFormSchema;
    chartProperties: ChartPropertiesFormSchema;
}
export interface DataFormSchema {
    yaxisData: YaxisDataFormSchema;
    xaxisData: XaxisDataFormSchema[];
    filters: FilterFormSchema[];
}
export interface YaxisDataFormSchema {
    entity: string;
    yaxisAggregate: string;
    yaxisEntityField?: EntityFieldFormSchema;
}
export interface XaxisDataFormSchema {
    xaxisEntityField: EntityFieldFormSchema;
}
export interface FilterFormSchema {
    groupFilters: FilterGroupSchema[];
    op: string;
}
export interface FilterGroupSchema {
    field: EntityFieldFormSchema;
    type: string;
    values: string[];
}
export interface EntityFieldFormSchema {
    name: string;
    type?: string;
}
export interface ChartPropertiesFormSchema {
    chartType: string;
    dataseriesColor?: string;
    dataseriesName?: string;
}
export interface PropertiesFormSchema {
    profile: string;

    axisNames ?: AxisNamesFormSchema;
    title ?: string;
    results ?: ResultsOptionsFormSchema;
}
export interface ResultsOptionsFormSchema {
    resultsLimit ?: number;
    orderByAxis ?: string;
}
export interface AxisNamesFormSchema {
    yaxisName ?: string;
    xaxisName ?: string;
}
export interface AppearanceFormSchema {
    library: string;

    highchartsAppearanceOptions ?: HighchartsOptionsFormSchema;
    googlechartsAppearanceOptions ?: GooglechartsOptionsFormSchema;
}
export interface HighchartsOptionsFormSchema {
    exporting ?: boolean;
    hcCABackGroundColor ?: string;
    hcCABorderWidth ?: number;
    hcCABorderCornerRadius ?: number;
    hcCABorderColor ?: string;
    hcPABackgroundColor ?: string;
    hcPABackgroundImageURL ?: string;
    hcPABorderWidth ?: number;
    hcPABorderColor ?: string;
    hcSubtitle ?: string;
    hcEnableDataLabels ?: boolean;
    hcEnableLegend ?: boolean;
    hcLegendLayout ?: string;
    hcLegendHorizontalAlignment ?: string;
    hcLegendVerticalAlignment ?: string;
    hcEnableCredits ?: boolean;
    hcCreditsText ?: string;
    hcCreditsLink ?: string;
}
export interface GooglechartsOptionsFormSchema {
    exporting ?: boolean;
}

/*
 * Semantic UI related schema fields
 *
 * ~ grouping: Changes the way the fields are grouped based on this https://semantic-ui.com/collections/form.html#text-area
 *
 * Custom related schema fields
 *
 * ~ deleteButtonPosition: Changes the position of the delete button relative to the array item. Available values are ['in','out']
 */

export class FormSchema {

    private _propertiesFormSchema = {
        'type' : 'object',
        'title' : 'General Properties',
        'description' : 'Set the general attributes of your chart',
        'widget' : { 'id' : 'csui-general-properties-object' },
        'properties' : {
            'profile' : {
                'type' : 'string',
                'placeholder' : 'No Profile Selected',
                'title' : 'Selected View',
                'requiredField' : true,
                'minLength' : 1,
                'widget': {
                    'id': 'csui-profile-picker'
                }
            },
            'axisNames' : {
                'type' : 'object',
                'widget' : { 'id' : 'csui-property-object' },
                'properties' : {
                    'yaxisName' : {
                        'type' : 'string',
                        'placeholder' : 'Yaxis',
                        'title' : 'Yaxis',
                        'widget': { 'id': 'string' }
                    },
                    'xaxisName' : {
                        'type' : 'string',
                        'placeholder' : 'Xaxis',
                        'title' : 'Xaxis',
                        'widget': { 'id': 'string' }
                    }
                },
                'fieldsets': [
                    {
                        'title': 'Axis Names',
                        'grouping': 'equal width fields',
                        'fields': [
                            'yaxisName',
                            'xaxisName'
                        ]
                    }
                ]
            },
            'title' : {
                'type' : 'string',
                'placeholder' : 'Title',
                'title' : 'Main Title',
                'widget': {'id': 'string' }
            },
            'results' : {
                'type' : 'object',
                'widget' : { 'id' : 'csui-property-object' },
                'properties' : {
                    'resultsLimit' : {
                        'type' : 'number',
                        'title' : 'Results Limit',
                        'default' : 30,
                        'widget' : {'id' : 'number'}
                    },
                    'orderByAxis' : {
                        'type' : 'string',
                        'title' : 'Order By',
                        'widget' : {'id' : 'csui-select'},
                        'oneOf': [
                            {
                                'description': 'X Axis',
                                'value' : 'xaxis',
                                'enum': ['xaxis']
                            },
                            {
                                'description': 'Y Axis',
                                'value' : 'yaxis',
                                'enum': ['yaxis']
                            }
                        ]
                    }
                },
                'fieldsets': [
                    {
                        'title': 'Results',
                        'grouping': 'equal width fields',
                        'fields': [
                            'resultsLimit',
                            'orderByAxis'
                        ]
                    }
                ]
            }
        },
        'fieldsets': [
            {
                'title': 'Data View',
                'description' : 'Shows what type of data interests the user most',
                'fields': [
                    'profile'
                ]
            },
            {
                'title': 'Chart Properties',
                'description' : 'Basic attributes of a chart',
                'fields': [
                    'title',
                    'axisNames',
                    'results'
                ]
            }
          ],
          'required': [ 'profile' ]
    };

    private _dataseriesFormSchema = {
        'type': 'array',
        'description': 'Dataseries',
        'widget' : { 'id' : 'csui-tabular-menu' },
        'items': {
            'type' : 'object',
            'widget' : { 'id' : 'csui-general-properties-object' },
            'properties' : {
                'data' : {
                    'type' : 'object',
                    'title' : 'Data Selection',
                    'description' : 'Describe the data you want to appear on your chart',
                    'grouping' : 'ui field basic segment',
                    'widget' : { 'id' : 'csui-property-object' },
                    'properties' : {
                        'yaxisData' : {
                            'type' : 'object',
                            'widget' : { 'id' : 'csui-property-object' },
                            'properties' : {
                                'entity' : {
                                    'type' : 'string',
                                    'requiredField' : true,
                                    'minLength' : 1,
                                    'placeholder' : 'Select Entity',
                                    'title' : 'Entity',
                                    'widget': { 'id': 'csui-entity-select'},
                                },
                                'yaxisAggregate' : {
                                    'type' : 'string',
                                    'requiredField' : true,
                                    'minLength' : 1,
                                    'placeholder' : 'Select Aggregate',
                                    'title' : 'Y axis Aggregate',
                                    'widget': { 'id': 'csui-aggregate-select'},
                                },
                                'yaxisEntityField': {
                                    'type' : 'object',
                                    // 'requiredField' : true,
                                    'placeholder' : 'Select Entity Field',
                                    'title' : 'Entity Field',
                                    'widget': { 'id': 'csui-entity-field-select'},
                                    'properties' : {
                                        'name': {
                                            'type' : 'string',
                                            'minLength': 1,
                                        },
                                        'type': {
                                            'type' : 'string',
                                            'minLength': 1,
                                        }
                                    },
                                    'required': ['name'],
                                    'visibleIf': {
                                        'yaxisAggregate': ['count', 'min', 'max', 'avg', 'null']
                                    }
                                },
                            },
                            'fieldsets': [
                                {
                                    'title' : 'Y Axis',
                                    'grouping': 'equal width fields',
                                    'fields': [
                                        'entity',
                                        'yaxisAggregate'
                                    ]
                                },
                                {
                                    'fields': ['yaxisEntityField']
                                }
                            ],
                            'required': [ 'entity', 'yaxisAggregate']
                        },
                        'xaxisData' : {
                            'type': 'array',
                            'title': 'X axis',
                            'itemName': 'Group By',
                            // Seems like we have to make charts without X values.
                            //
                            // 'minItems': 1,
                            'maxItems': 2,
                            'widget' : { 'id' : 'csui-array' },
                            'items': {
                                'type' : 'object',
                                'widget' : { 'id' : 'csui-property-object' },
                                'properties' : {
                                    'xaxisEntityField' : {
                                        'type' : 'object',
                                        'requiredField' : true,
                                        'placeholder' : 'Select Entity Field',
                                        'title' : 'Entity Field',
                                        'widget': { 'id': 'csui-entity-field-select'},
                                        'properties' : {
                                            'name': {
                                                'type' : 'string',
                                                'minLength': 1,
                                            },
                                            'type': {
                                                'type' : 'string',
                                                'minLength': 1,
                                            }
                                        },
                                        'required': ['name', 'type']
                                    }
                                },
                                'fieldsets': [
                                    {
                                        'fields': [
                                            'xaxisEntityField'
                                        ]
                                    }
                                ],
                                'required': ['xaxisEntityField']
                            }
                        },
                        'filters' : {
                            'type': 'array',
                            'title': 'Filters',
                            'itemName': 'Filter',
                            'widget' : { 'id' : 'csui-array' },
                            'items': {
                                'type' : 'object',
                                'widget': { 'id': 'csui-property-object'},
                                'properties' : {
                                    'groupFilters' : {
                                        'type': 'array',
                                        'itemName': 'Rule',
                                        'deleteButtonPosition' : 'in',
                                        'minItems': 1,
                                        'widget' : { 'id' : 'csui-array' },
                                        'items': {
                                            'type' : 'object',
                                            'widget': { 'id': 'csui-filter-property-object'},
                                            'properties' : {
                                                'field': {
                                                    'type' : 'object',
                                                    'requiredField' : true,
                                                    'placeholder' : 'Select Entity Field',
                                                    'title' : 'Entity Field',
                                                    'widget': { 'id': 'csui-entity-field-select'},
                                                    'properties' : {
                                                        'name': {
                                                            'type' : 'string',
                                                            'minLength': 1,
                                                        },
                                                        'type': {
                                                            'type' : 'string',
                                                            'minLength': 1,
                                                        }
                                                    },
                                                    'required': ['name', 'type']
                                                },
                                                'type': {
                                                    'type' : 'string',
                                                    'requiredField' : true,
                                                    'minLength': 1,
                                                    'placeholder' : 'Select Operator',
                                                    'title' : 'Filter Operator',
                                                    'widget': { 'id': 'csui-operator-select'}
                                                    // Ideally I would have inserted this:
                                                    //
                                                    // 'invisibleIf': {
                                                    //     'field': ['$ANY$']
                                                    //   }
                                                    //
                                                    // But 'field' returns an object and ngx-schema-form
                                                    // does not support this for object values
                                                },
                                                'values': {
                                                    'type': 'array',
                                                    'minItems': 1,
                                                    'maxItems': 2,
                                                    'requiredField' : true,
                                                    'widget' : { 'id' : 'csui-filter-field-array' },
                                                    'items': {
                                                        // Cannot support multiple type items
                                                        //
                                                        // 'anyOf': [
                                                        //     {
                                                        //         'type' : 'string',
                                                        //     },
                                                        //     {
                                                        //         'type' : 'number',
                                                        //     }
                                                        //   ],
                                                        'type' : 'string',
                                                        'placeholder' : 'Value',
                                                        'widget': {'id': 'csui-filter-field'}
                                                    }
                                                }
                                            },
                                            'fieldsets': [
                                                {
                                                    'fields': [
                                                        'field',
                                                        'type',
                                                        'values'
                                                    ]
                                                }
                                            ],
                                            'required': ['field', 'type', 'values']
                                        },
                                    },
                                    'op' : {
                                        'type': 'string',
                                        'inline': true,
                                        'widget' : {'id' : 'csui-radio-selection'},
                                        // 'description': 'Item Layout',
                                        'oneOf': [
                                            {
                                                'enum': ['AND'],
                                                'value' : 'AND',
                                                'description': 'Match all of the values'
                                            },
                                            {
                                                'enum': ['OR'],
                                                'value' : 'OR',
                                                'description': 'Match any of the values'
                                            }
                                        ],
                                        'default': 'AND'
                                    }
                                },
                                'fieldsets': [
                                    {
                                        'fields': [ 'op', 'groupFilters']
                                    }]
                            }
                        }
                    },
                    'fieldsets': [
                        {
                            'fields' : [
                                'yaxisData',
                                'xaxisData',
                                'filters'
                            ]
                        }
                    ],
                    'required': ['yaxisData', 'xaxisData', 'filters']
                },
                'chartProperties' : {
                    'type' : 'object',
                    'title' : 'Chart Properties',
                    'description' : 'Customize the way data appear on your chart',
                    'grouping' : 'ui field basic segment',
                    'widget' : { 'id' : 'csui-property-object' },
                    'properties' : {
                        'dataseriesColor' : {
                            'type' : 'string',
                            'pattern': '^#[0-9a-fA-F]{8}$',
                            'title' : 'Dataseries Color',
                            'widget': { 'id': 'csui-color-picker' }
                        },
                        'dataseriesName' : {
                            'type' : 'string',
                            'placeholder' : 'Dataseries',
                            'default' : 'Data',
                            'title' : 'Dataseries Name',
                            'widget': 'hidden'
                            // Widget is hidden because the dataseriesName
                            // is getting handled in tabular-menu-widget
                            //
                            // 'widget': {
                            //     'id': 'string'
                            // }
                        },
                        'chartType' : {
                            'type' : 'string',
                            'requiredField' : true,
                            'minLength': 1,
                            'placeholder' : 'Select Chart Type',
                            'title' : 'Chart Type',
                            'widget': { 'id': 'csui-chart-type-select' },
                        }
                    },
                    'fieldsets': [
                        {
                            'grouping' : 'equal width fields',
                            'fields': [
                                'chartType',
                                'dataseriesColor'
                            ]
                        },
                        {
                            'fields': [ 'dataseriesName' ]
                        }
                    ],
                    'required': ['chartType']
                }
            },
            'fieldsets': [
                {
                    'fields': [
                        'chartProperties',
                        'data'
                    ]
                }
            ],
            'required': ['data', 'chartProperties']
        }
    };

    private _appearanceFormSchema = {
        'type' : 'object',
        'title' : 'Appearance',
        'description' : 'Customise the way your chart looks',
        'widget' : { 'id' : 'csui-general-properties-object' },
        'properties' : {
            'library' : {
                'type' : 'string',
                'placeholder' : 'Select Library',
                'title' : 'Selected Library',
                'requiredField' : true,
                'default' : 'HighCharts',
                'minLength' : 1,
                'widget': {
                    'id': 'csui-library-select'
                },
            },
            'highchartsAppearanceOptions': {
                'type' : 'object',
                'widget' : { 'id' : 'csui-property-object' },
                // 'title': 'Highcharts Appearance Options',
                'properties' : {
                    'hcCABackGroundColor': {
                        'type' : 'string',
                        'pattern': '^#[0-9a-fA-F]{8}$',
                        'default': '#FFFFFFFF',
                        'title' : 'Background Color',
                        'widget': {'id': 'csui-color-picker'}
                    },
                    'hcCABorderWidth': {
                        'type' : 'number',
                        'default': 0,
                        'title' : 'Border Width',
                        'widget': {'id': 'number'}
                    },
                    'hcCABorderCornerRadius': {
                        'type' : 'number',
                        'default': 0,
                        'title' : 'Border Corner Radius',
                        'widget': {'id': 'number'}
                    },
                    'hcCABorderColor': {
                        'type' : 'string',
                        'pattern': '^#[0-9a-fA-F]{8}$',
                        'default': '#335cadff',
                        'title' : 'Border Color',
                        'widget': {'id': 'csui-color-picker'}
                    },
                    'hcPABackgroundColor': {
                        'type' : 'string',
                        'pattern': '^#[0-9a-fA-F]{8}$',
                        'title' : 'Background Color',
                        'widget': {'id': 'csui-color-picker'}
                    },
                    'hcPABackgroundImageURL': {
                        'type' : 'string',
                        'title' : 'Background Image URL',
                        'placeholder': 'https://domain.com/picture.png',
                        'widget': {'id': 'url'}
                    },
                    'hcPABorderWidth': {
                        'type' : 'number',
                        'default': 0,
                        'title' : 'Border Width',
                        'widget': {'id': 'number'}
                    },
                    'hcPABorderColor': {
                        'type' : 'string',
                        'pattern': '^#[0-9a-fA-F]{8}$',
                        'default': '#ccccccff',
                        'title' : 'Border Color',
                        'widget': {'id': 'csui-color-picker'}
                    },
                    'hcSubtitle': {
                        'type': 'string',
                        'placeholder': 'Subtitle',
                        'title' : 'Subtitle',
                        'widget' : {
                            'id': 'string'
                        }
                    },
                    'hcEnableDataLabels' : {
                        'type': 'boolean',
                        'default': false,
                        'description': 'Enable data labels for all series'
                    },
                    'hcEnableLegend' : {
                        'type': 'boolean',
                        'default': true,
                        'description': 'Enable Legend'
                    },
                    'hcLegendLayout' : {
                        'type': 'string',
                        'widget' : {'id' : 'csui-select'},
                        'description': 'Item Layout',
                        'oneOf': [
                            {
                                'enum': ['horizontal'],
                                'value' : 'horizontal',
                                'description': 'Horizontal'
                            },
                            {
                                'enum': ['vertical'],
                                'value' : 'vertical',
                                'description': 'Vertical'
                            }
                        ],
                        'default': 'horizontal'
                    },
                    'hcLegendHorizontalAlignment' : {
                        'type': 'string',
                        'widget' : {'id' : 'csui-select'},
                        'description': 'Horizontal Alignment',
                        'oneOf': [
                            {
                                'enum': ['left'],
                                'value' : 'left',
                                'description': 'Left'
                            },
                            {
                                'enum': ['center'],
                                'value' : 'center',
                                'description': 'Center'
                            },
                            {
                                'enum': ['right'],
                                'value' : 'right',
                                'description': 'Right'
                            }
                        ],
                        'default': 'center'
                    },
                    'hcLegendVerticalAlignment' : {
                        'type': 'string',
                        'widget' : {'id' : 'csui-select'},
                        'description': 'Vertical Alignment',
                        'oneOf': [
                            {
                                'enum': ['top'],
                                'value' : 'top',
                                'description': 'Top'
                            },
                            {
                                'enum': ['middle'],
                                'value' : 'middle',
                                'description': 'Middle'
                            },
                            {
                                'enum': ['bottom'],
                                'value' : 'bottom',
                                'description': 'Bottom'
                            }
                        ],
                        'default': 'bottom'
                    },
                    'exporting' : {
                        'type': 'boolean',
                        'default': false,
                        'description': 'Enable Exporting'
                    },
                    'hcEnableCredits' : {
                        'type': 'boolean',
                        'default': true,
                        'description': 'Enable Credits'
                    },
                    'hcCreditsText' : {
                        'type': 'string',
                        'default': 'Created by OpenAIRE via HighCharts',
                        'title' : 'Credits Text',
                        'widget' : {'id': 'string'}
                    },
                    'hcCreditsLink': {
                        'type' : 'string',
                        'title' : 'Credits Link',
                        'default': 'https://www.openaire.eu/',
                        'widget': {'id': 'url'}
                    },
                },
                'fieldsets': [
                    {
                        'title' : 'Titles',
                        'fields': ['hcSubtitle']
                    },
                    {
                        'title' : 'Exporting',
                        'fields': ['exporting']
                    },
                    {
                        'title' : 'Value Labels',
                        'fields': ['hcEnableDataLabels']
                    },
                    {
                        'title' : 'Legend',
                        'fields': ['hcEnableLegend']
                    },
                    {
                        'fields': ['hcLegendLayout']
                    },
                    {
                        'grouping': 'equal width fields',
                        'fields': ['hcLegendHorizontalAlignment', 'hcLegendVerticalAlignment']
                    },
                    {
                        'title' : 'Chart Area',
                        'grouping' : 'equal width fields',
                        'fields': ['hcCABackGroundColor', 'hcCABorderColor']
                    },
                    {
                        'grouping' : 'equal width fields',
                        'fields' : ['hcCABorderWidth', 'hcCABorderCornerRadius']
                    },
                    {
                        'title' : 'Plot Area',
                        'grouping' : 'equal width fields',
                        'fields': ['hcPABackgroundColor', 'hcPABorderColor']
                    },
                    {
                        'grouping' : 'equal width fields',
                        'fields': ['hcPABackgroundImageURL', 'hcPABorderWidth']
                    },
                    {
                        'title' : 'Credits',
                        'fields': ['hcEnableCredits', 'hcCreditsText', 'hcCreditsLink']
                    },
                ],
                'visibleIf': {
                    'library': ['HighCharts']
                }
            },
            'googlechartsAppearanceOptions': {
                'type' : 'object',
                'widget' : { 'id' : 'csui-property-object' },
                // 'title': 'Googlecharts Appearance Options',
                'properties' : {
                    'exporting' : {
                        'type': 'boolean',
                        'default': false,
                        'description': 'Enable exporting'
                    }
                },
                'fieldsets': [
                    {
                        'title' : 'Exporting',
                        'fields': ['exporting']
                    }
                ],
                'visibleIf': {
                    'library': ['GoogleCharts']
                }
            },
        },
        'fieldsets': [
            {
                'title': 'Visualisation Library',
                'description' : 'Select one of the supported libraries for chart visualisation',
                'fields': [
                    'library'
                ]
            },
            {
                'title': 'Visualisation Options',
                'description' : 'Available options based on the selected Visualisation Library',
                'fields': [
                    'highchartsAppearanceOptions',
                    'googlechartsAppearanceOptions'
                ]
            }
        ],
        'required': [ 'library' ]
    };

    private _SCGAFormSchema = {
        '$schema': 'http://json-schema.org/draft-04/hyper-schema#',
        'type' : 'object',
        'widget' : { 'id' : 'csui-head-menu' },
        'properties' : {
            'generalChartProperties' : this._propertiesFormSchema ,
            'dataseries' : this._dataseriesFormSchema,
            'appearance' : this._appearanceFormSchema
        },
        'fieldsets': [
            {
                'title': 'General',
                'fields': ['generalChartProperties']
            },
            {
                'title': 'Dataseries',
                'fields': ['dataseries']
            },
            {
                'title': 'Appearance',
                'fields': ['appearance']
            }
        ],
        'required': ['generalChartProperties', 'dataseries', 'appearance']
    };

    get formSchema() { return this._SCGAFormSchema; }
    get propertiesFormSchema() { return this._propertiesFormSchema; }
    get dataseriesFormSchema() { return this._dataseriesFormSchema; }

      // Declare a mapping between action ids and their implementations
  get customValidators() {
      return {

    'generalChartProperties/library': (value: any, formProperty: FormProperty, form: PropertyGroup) => {
        if (value === undefined || value === null || value === '') {
            formProperty.extendErrors({ 'generalChartProperties/library': { 'expectedValue': '' }});
            return null ;
        }
        console.log('Value: ' + value);
        console.log(formProperty);
        console.log(form);

        return null;
    }

    }; }
}
