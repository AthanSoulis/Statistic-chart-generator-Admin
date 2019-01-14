import { FormProperty, PropertyGroup } from 'ngx-schema-form/lib/model/formproperty';

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

    tableAppearance: TableAppearanceFormSchema;
    chartAppearance: ChartAppearanceFormSchema;
}
export interface HighchartsOptionsFormSchema {
    exporting ?: boolean;
    stackedChart ?: string;
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
}
export interface GooglechartsOptionsFormSchema {
    exporting ?: boolean;
    stackedChart ?: string;
    gcCABackGroundColor ?: string;
    gcPABackgroundColor ?: string;
}
export interface ChartAppearanceFormSchema {
    library: string;

    highchartsAppearanceOptions ?: HighchartsOptionsFormSchema;
    googlechartsAppearanceOptions ?: GooglechartsOptionsFormSchema;
}
export interface TableAppearanceFormSchema {
    paginationSize ?: number;
}
/*
 * Semantic UI related schema fields
 *
 * ~ grouping: Changes the way the fields are grouped based on this https://semantic-ui.com/collections/form.html#fields
 * ~ fieldsets.width: Adds a width to each field based on this https://semantic-ui.com/collections/form.html#width .
 *   Works with {csui-property-object}
 *
 * Custom related schema fields
 *
 * ~ deleteButtonPosition: Changes the position of the delete button relative to the array item. Supported values are ['in','out']
 * ~ tooltip: Enables and shows the tooltip string on a {csui-string, csui-boolean, csui-number, csui-select}
 * ~ tooltipHeader Enables and shows the tooltip header string on a {csui-string, csui-boolean, csui-number, csui-select}
 * ~ relaxed: Adds a hidden divider at the bottom of a {csui-array}
 *
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
                        'widget': { 'id': 'csui-string' }
                    },
                    'xaxisName' : {
                        'type' : 'string',
                        'placeholder' : 'Xaxis',
                        'title' : 'Xaxis',
                        'widget': { 'id': 'csui-string' }
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
                'widget': {'id': 'csui-string' }
            },
            'results' : {
                'type' : 'object',
                'widget' : { 'id' : 'csui-property-object' },
                'properties' : {
                    'resultsLimit' : {
                        'type' : 'number',
                        'title' : 'Results Limit',
                        'default' : 30,
                        // tslint:disable-next-line:max-line-length
                        'tooltip' : `To get all available results set Results Limit to 0.`,
                        'widget' : {'id' : 'csui-number'}
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
                'description' : 'Basic attributes of the chart',
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
                            'relaxed': true,
                            'itemName': 'Group By',
                            'minItems': 1,
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
                                'required': ['xaxisEntityField'],
                                'fieldsets': [
                                    {
                                        'fields': [
                                            'xaxisEntityField'
                                        ]
                                    }
                                ]
                            }
                        },
                        'filters' : {
                            'type': 'array',
                            'title': 'Filters',
                            'itemName': 'Filter',
                            'relaxed': true,
                            'widget' : { 'id' : 'csui-array' },
                            'items': {
                                'type' : 'object',
                                'widget': { 'id': 'csui-property-object'},
                                'properties' : {
                                    'groupFilters' : {
                                        'type': 'array',
                                        'itemName': 'Filter Rule',
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
                                                { 'fields': ['field', 'type', 'values']}
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
                            'widget': { 'id': 'csui-color-picker' },
                            'visibleIf': {
                                'chartType': ['area', 'column', 'bar', 'line']
                            }
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
                            'grouping': 'fields',
                            'fields': [
                                'chartType',
                                'dataseriesColor'
                            ],
                            'width': [
                                'ten wide',
                                'six wide'
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
        'widget' : { 'id' : 'csui-property-object' },
        'properties' : {
            'chartAppearance' : {
                'type' : 'object',
                'title' : 'Chart Appearance',
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
                            'stackedChart' : {
                                'type' : 'string',
                                'widget' : { 'id': 'csui-select'},
                                'tooltip': 'Choose between a Regular or Stacked chart.',
                                'title': 'Stacked Graph',
                                'default': 'undefined',
                                'oneOf': [
                                    {
                                      'description': 'Disabled',
                                      'value' : 'undefined',
                                      'enum': ['undefined']
                                    },
                                    {
                                      'description': 'Stacked by Value',
                                      'value': 'normal',
                                      'enum': ['normal']
                                    },
                                    {
                                      'description': 'Stacked by Percentile',
                                      'value': 'percent',
                                      'enum': ['percent']
                                    }
                                  ]
                            },
                            'hcCABackGroundColor': {
                                'type' : 'string',
                                'pattern': '^#[0-9a-fA-F]{8}$',
                                'default': '#FFFFFFFF',
                                'title' : 'Background Color',
                                'tooltip': 'Background color for the full chart area.',
                                'widget': {'id': 'csui-color-picker'}
                            },
                            'hcCABorderWidth': {
                                'type' : 'number',
                                'default': 0,
                                'title' : 'Border Width',
                                'tooltip': 'The pixel width of the outer chart border.',
                                'widget': {'id': 'csui-number'}
                            },
                            'hcCABorderCornerRadius': {
                                'type' : 'number',
                                'default': 0,
                                'title' : 'Border Corner Radius',
                                'tooltip': 'The corner radius of the outer chart border.',
                                'widget': {'id': 'csui-number'}
                            },
                            'hcCABorderColor': {
                                'type' : 'string',
                                'pattern': '^#[0-9a-fA-F]{8}$',
                                'default': '#335cadff',
                                'title' : 'Border Color',
                                'tooltip': 'The color of the outer chart border.',
                                'widget': {'id': 'csui-color-picker'}
                            },
                            'hcPABackgroundColor': {
                                'type' : 'string',
                                'pattern': '^#[0-9a-fA-F]{8}$',
                                'title' : 'Background Color',
                                'tooltip': 'Background color for the plot area, the area inside the axes.',
                                'widget': {'id': 'csui-color-picker'}
                            },
                            'hcPABackgroundImageURL': {
                                'type' : 'string',
                                'title' : 'Background Image URL',
                                'placeholder': 'https://domain.com/picture.png',
                                'tooltip': 'The online URL for an image to use as the plot area background.',
                                'widget': {'id': 'csui-string'}
                            },
                            'hcPABorderWidth': {
                                'type' : 'number',
                                'default': 0,
                                'title' : 'Border Width',
                                'tooltip': 'The pixel width of the plot area border.',
                                'widget': {'id': 'csui-number'}
                            },
                            'hcPABorderColor': {
                                'type' : 'string',
                                'pattern': '^#[0-9a-fA-F]{8}$',
                                'default': '#ccccccff',
                                'title' : 'Border Color',
                                'tooltip': 'The color of the inner chart or plot area border.',
                                'widget': {'id': 'csui-color-picker'}
                            },
                            'hcSubtitle': {
                                'type': 'string',
                                'placeholder': 'Subtitle',
                                'title' : 'Subtitle',
                                'tooltip': 'The chart\'s subtitle, normally displayed with smaller fonts below the main title.',
                                'widget' : {'id': 'csui-string' }
                            },
                            'hcEnableDataLabels' : {
                                'type': 'boolean',
                                'widget' : {'id' : 'csui-boolean'},
                                'default': false,
                                'tooltip': 'Show small labels next to each data value.',
                                'description': 'Enable data labels for all series'
                            },
                            'hcEnableLegend' : {
                                'type': 'boolean',
                                'widget' : {'id' : 'csui-boolean'},
                                'default': true,
                                'tooltip': 'Enable or disable the legend.',
                                'description': 'Enable Legend'
                            },
                            'hcLegendLayout' : {
                                'type': 'string',
                                'widget' : {'id' : 'csui-select'},
                                'title': 'Item Layout',
                                'tooltip': 'The layout of the legend items. Can be one of "Horizontal" or "Vertical".',
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
                                'title': 'Horizontal Alignment',
                                'tooltip': 'The horizontal alignment of the legend box within the chart area.',
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
                                'title': 'Vertical Alignment',
                                'tooltip': 'The vertical alignment of the legend box.',
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
                                'widget' : {'id' : 'csui-boolean'},
                                'default': false,
                                // tslint:disable-next-line:max-line-length
                                'tooltip': 'Enable the context button on the top right of the chart, allowing end users to download image exports.',
                                'description': 'Enable Exporting'
                            },
                            'hcEnableCredits' : {
                                'type': 'boolean',
                                'widget' : {'id' : 'csui-boolean'},
                                'default': true,
                                'tooltip': 'Whether to show the credits text.',
                                'description': 'Enable Credits'
                            },
                            'hcCreditsText' : {
                                'type': 'string',
                                'default': 'Created by OpenAIRE via HighCharts',
                                'title' : 'Credits Text',
                                'tooltip': 'The text for the credits label',
                                'widget' : {'id': 'csui-string'}
                            }
                        },
                        'fieldsets': [
                            {
                                'title' : 'Titles',
                                'fields': ['hcSubtitle']
                            },
                            {
                                'title' : 'Plot Options',
                                'fields': ['stackedChart']
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
                                'fields': ['hcEnableCredits', 'hcCreditsText']
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
                            'stackedChart' : {
                                'type' : 'string',
                                'widget' : { 'id': 'csui-select'},
                                'tooltip': 'Choose between a Regular or Stacked chart.',
                                'title': 'Stacked Graph',
                                'default': 'false',
                                'oneOf': [
                                    {
                                      'description': 'Disabled',
                                      'value' : 'false',
                                      'enum' : ['false']
                                    },
                                    {
                                      'description': 'Stacked by Value',
                                      'value': 'absolute',
                                      'enum': ['absolute']
                                    },
                                    {
                                      'description': 'Stacked by Percentile',
                                      'value': 'percent',
                                      'enum': ['percent']
                                    }
                                  ]
                            },
                            'gcCABackGroundColor': {
                                'type' : 'string',
                                'pattern': '^#[0-9a-fA-F]{8}$',
                                'default': '#FFFFFFFF',
                                'title' : 'Background Color',
                                'tooltip': 'Background color for the full chart area.',
                                'widget': {'id': 'csui-color-picker'}
                            },
                            'gcPABackgroundColor': {
                                'type' : 'string',
                                'pattern': '^#[0-9a-fA-F]{8}$',
                                'title' : 'Background Color',
                                'tooltip': 'Background color for the plot area, the area inside the axes.',
                                'widget': {'id': 'csui-color-picker'}
                            },
                            'exporting' : {
                                'type': 'boolean',
                                'widget' : {'id' : 'csui-boolean'},
                                'default': false,
                                // tslint:disable-next-line:max-line-length
                                'tooltip': 'Enable the context button on the top right of the chart, allowing end users to download image exports.',
                                'description': 'Enable Exporting'
                            }
                        },
                        'fieldsets': [
                            {
                                'title' : 'Plot Options',
                                'fields': ['stackedChart']
                            },
                            {
                                'title' : 'Exporting',
                                'fields': ['exporting']
                            },
                            {
                                'title' : 'Chart Area',
                                'fields': ['gcCABackGroundColor']
                            },
                            {
                                'title' : 'Plot Area',
                                'fields': ['gcPABackgroundColor']
                            },
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
            },
            'tableAppearance' : {
                'type' : 'object',
                'title': 'Table Appearance',
                'description' : 'Customise the way your table looks',
                'widget' : { 'id' : 'csui-general-properties-object' },
                'properties' : {
                    'paginationSize' : {
                        'type' : 'number',
                        'title' : 'Table Page Size',
                        'default' : 50,
                        'minLength' : 10,
                        'tooltip' : 'The number of rows in each page of the Data Table',
                        'widget': {'id': 'csui-number'},
                    },
                },
                'fieldsets': [
                    {
                        'grouping': 'inline fields',
                        'fields': ['paginationSize']
                    }
                ]
            }
        },
        'fieldsets': [
            {
                // 'title' : 'Chart Appearance',
                // 'description' : 'Customise the way your chart looks',
                'fields': ['chartAppearance']
            },
            {
                // 'title' : 'Chart Appearance',
                // 'description' : 'Customise the way your chart looks',
                'fields': ['tableAppearance']
            }
        ],
        'required': ['chartAppearance', 'tableAppearance']
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

        '/generalChartProperties/profile': (value: any, formProperty: FormProperty, form: PropertyGroup) => {
            if (value === undefined || value === null || value === '') {
                return { '/generalChartProperties/profile': { 'expectedValue': 'JK' }} ;
            }

            return null;
        },
        '/appearance/library': (value: any, formProperty: FormProperty, form: PropertyGroup) => {
            if (value === undefined || value === null || value === '' || value === 'HighCharts') {
                // return { '/appearance/library': { 'expectedValue': 'HighCharts' }} ;
                return null;
            }

            return null;
        }


    }; }
}
