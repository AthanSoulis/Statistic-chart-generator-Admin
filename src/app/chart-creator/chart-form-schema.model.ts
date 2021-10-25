/*
 * This is the form schema that feeds the sf-form component with the form structure of the Statistic-Chart-Generator-Admin
 *
 * Semantic UI related schema fields
 *
 * ~ fieldsetColumnWidth: Sets the width of the fieldset on the grid based on this
 *   https://semantic-ui.com/collections/grid.html#column-widths
 * ~ grouping: Changes the way the fields are grouped based on this
 *   https://semantic-ui.com/collections/form.html#fields
 * ~ fieldsets.width: Adds a width to each field based on this
 *   https://semantic-ui.com/collections/form.html#width .
 *   Works with {csui-property-object}
 *
 * Custom related schema fields
 *
 * ~ deleteButtonPosition: Changes the position of the delete button relative to the array item. Supported values are ['in','out']
 * ~ tooltip: Enables and shows the tooltip string on a {csui-string, csui-boolean, csui-number, csui-select}
 * ~ tooltipHeader Enables and shows the tooltip header string on a {csui-string, csui-boolean, csui-number, csui-select}
 * ~ relaxed: Adds a hidden divider at the bottom of a {csui-array}
 * ~ tabTitle: This is the name for the respective tab on an object with a {csui-tabular-menu}
 */

export class FormSchema {

    private _viewFormSchema = {
        type : 'object',
        widget : { id : 'csui-view-properties-object' },
        properties : {
            profile : {
                type : 'string',
                requiredField : true,
                minLength : 1,
                widget: {id: 'csui-profile-picker'}
            }
        },
        fieldsets: [
            {
                fields: ['profile']
            }
        ],
        required: [ 'profile' ]
    };

    private _categoryFormSchema = {
        type : 'object',
        title : 'Select Category',
        description : 'Choose the type of diagram you want to make',
        widget : { id : 'csui-category-properties-object' },
        properties : {
            diagram : {
                type : 'object',
                requiredField : true,
                widget: { id: 'csui-diagram-category-component' },
                properties : {
                    name : { type: 'string', widget: 'hidden' },
                    type : { type: 'string', widget: 'hidden' },
                    diagramId : { type: 'number', widget: 'hidden' },
                    description : { type: 'string', widget: 'hidden' },
                    imageURL : { type: 'string', widget: 'hidden' },
                    isPolar : { type: 'boolean', widget: 'hidden' },
                    supportedLibraries : { 
                        type: 'array',
                        widget: 'hidden',
                        items: { type : 'string', widget : 'hidden' }
                    }
                },
                fieldsets: [{ fields: ['name','type','diagramId','description','imageURL','isPolar','supportedLibraries'] }]
            }
        },
        fieldsets: [{ fields: ['diagram'] }],
        required: ['diagram']
    };

    private _dataseriesFormSchema = {
        type: 'array',
        description: 'Dataseries',
        widget : { id : 'csui-dataseries-menu' },
        items: {
            type : 'object',
            widget : { id : 'csui-general-properties-object' },
            properties : {
                data : {
                    type : 'object',
                    grouping : 'ui fluid two column stackable basic grid',
                    widget : { id : 'csui-property-object' },
                    properties : {
                        yaxisData : {
                            type : 'object',
                            widget : { id : 'csui-property-object' },
                            relaxed: true,
                            properties : {
                                entity : {
                                    type : 'string',
                                    requiredField : true,
                                    minLength : 1,
                                    placeholder : 'Select Entity',
                                    title : 'Entity',
                                    widget: { id: 'csui-entity-select'},
                                },
                                yaxisAggregate : {
                                    type : 'string',
                                    requiredField : true,
                                    minLength : 1,
                                    placeholder : 'Select Aggregate',
                                    title : 'Y axis Aggregate',
                                    widget: { id: 'csui-aggregate-select'},
                                },
                                yaxisEntityField: {
                                    type : 'object',
                                    // 'requiredField' : true,
                                    placeholder : 'Select Entity Field',
                                    title : 'Entity Field',
                                    widget: { id: 'csui-entity-field-select'},
                                    properties : {
                                        name: {
                                            type : 'string',
                                            minLength: 1,
                                        },
                                        type: {
                                            type : 'string',
                                            minLength: 1,
                                        }
                                    },
                                    required: ['name'],
                                    visibleIf: {
                                        'yaxisAggregate': ['count', 'min', 'max', 'avg', 'null']
                                    }
                                },
                            },
                            fieldsets:
                                [{
                                    title : 'Y Axis',
                                    grouping: 'equal width fields',
                                    fields: ['entity', 'yaxisAggregate']
                                },
                                {
                                    fields: ['yaxisEntityField']
                                }],
                            required: [ 'entity', 'yaxisAggregate']
                        },
                        xaxisData : {
                            type: 'array',
                            title: 'X axis',
                            relaxed: true,
                            itemName: 'Group By',
                            minItems: 1,
                            maxItems: 2,
                            widget : { id : 'csui-array' },
                            // visibleIf: {
                            //     '/category/categoryType': ['area', 'pie', 'column', 'bar', 'line', 'world', 'combo']
                            // },
                            items: {
                                type : 'object',
                                widget : { id : 'csui-property-object' },
                                properties : {
                                    xaxisEntityField : {
                                        type : 'object',
                                        requiredField : true,
                                        placeholder : 'Select Entity Field',
                                        title : 'Entity Field',
                                        widget: { id: 'csui-entity-field-select'},
                                        properties : {
                                            name: {
                                                type : 'string',
                                                minLength: 1,
                                            },
                                            type: {
                                                type : 'string',
                                                minLength: 1,
                                            }
                                        },
                                        required: ['name', 'type']
                                    }
                                },
                                required: ['xaxisEntityField'],
                                fieldsets: [
                                    {
                                        fields: [
                                            'xaxisEntityField'
                                        ]
                                    }
                                ]
                            }
                        },
                        filters : {
                            type: 'array',
                            title: 'Filters',
                            itemName: 'Filter',
                            relaxed: true,
                            widget : { id : 'csui-array' },
                            items: {
                                type : 'object',
                                widget: { id: 'csui-property-object'},
                                properties : {
                                    groupFilters : {
                                        type: 'array',
                                        itemName: 'Filter Rule',
                                        deleteButtonPosition : 'in',
                                        minItems: 1,
                                        widget : { id : 'csui-filter-array' },
                                        items: {
                                            type : 'object',
                                            widget: { id: 'csui-filter-property-object'},
                                            properties : {
                                                field: {
                                                    type : 'object',
                                                    requiredField : true,
                                                    placeholder : 'Select Entity Field',
                                                    title : 'Entity Field',
                                                    widget: { id: 'csui-entity-field-select'},
                                                    properties : {
                                                        name: {
                                                            type : 'string',
                                                            minLength: 1,
                                                        },
                                                        type: {
                                                            type : 'string',
                                                            minLength: 1,
                                                        }
                                                    },
                                                    required: ['name', 'type']
                                                },
                                                type: {
                                                    type : 'string',
                                                    requiredField : true,
                                                    minLength: 1,
                                                    placeholder : 'Select Operator',
                                                    title : 'Filter Operator',
                                                    widget: { id: 'csui-operator-select'}
                                                    // Ideally I would have inserted this:
                                                    //
                                                    // 'invisibleIf': {
                                                    //     'field': ['$ANY$']
                                                    //   }
                                                    //
                                                    // But 'field' returns an object and ngx-schema-form
                                                    // does not support this for object values
                                                },
                                                values: {
                                                    type: 'array',
                                                    minItems: 1,
                                                    maxItems: 2,
                                                    requiredField : true,
                                                    widget : { id : 'csui-filter-field-array' },
                                                    items: {
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
                                                        type : 'string',
                                                        placeholder : 'Value',
                                                        widget: {id: 'csui-filter-field'}
                                                    }
                                                }
                                            },
                                            fieldsets: [
                                                { fields: ['field', 'type', 'values']}
                                            ],
                                            required: ['field', 'type', 'values']
                                        },
                                    },
                                    op : {
                                        type: 'string',
                                        inline: true,
                                        widget : {id : 'csui-radio-selection'},
                                        // description: 'Item Layout',
                                        oneOf: [
                                            {
                                                enum: ['AND'],
                                                value : 'AND',
                                                description: 'Match all of the values'
                                            },
                                            {
                                                enum: ['OR'],
                                                value : 'OR',
                                                description: 'Match any of the values'
                                            }
                                        ],
                                        default: 'AND'
                                    }
                                },
                                fieldsets: [
                                    {
                                        fields: [ 'op', 'groupFilters']
                                    }]
                            }
                        }
                    },
                    fieldsets: [
                        {
                            fieldsetColumnWidth : 'six wide column',
                            fields : ['yaxisData', 'xaxisData']
                            // fields : ['yaxisData']
                        },
                        {
                            fieldsetColumnWidth : 'ten wide column',
                            fields : ['filters']
                        }],
                    required: ['yaxisData', 'xaxisData', 'filters']
                    // required: ['yaxisData', 'filters']
                },
                chartProperties : {
                    type : 'object',
                    // title : 'Chart Properties',
                    // description : 'Customize the way data appear on your chart',
                    // grouping : 'ui field basic segment',
                    widget : { id : 'csui-property-object' },
                    properties : {
                        dataseriesColor : {
                            type : 'string',
                            pattern: '^#[0-9a-fA-F]{8}$',
                            title : 'Dataseries Color',
                            widget: { id: 'csui-color-picker' },
                            // visibleIf: {
                            //     'chartType': ['area', 'column', 'bar', 'line']
                            // }
                        },
                        dataseriesName : {
                            type : 'string',
                            placeholder : 'Dataseries',
                            default : 'Data',
                            title : 'Dataseries Name',
                            widget: 'hidden'
                            // Widget is hidden because the dataseriesName
                            // is getting handled in dataseries-menu-widget
                        },
                        chartType : {
                            type : 'string',
                            minLength: 1,
                            placeholder : 'Select Chart Type',
                            title : 'Chart Type',
                            widget: { id: 'csui-chart-type-select' },
                            // This is different from the visibleIf because I want to know
                            // the value of an ancestor property
                            showOnlyWhen: {
                                '/category/diagram': ['combo']
                            }
                        },
                        stacking : {
                            type : 'string',
                            widget : { id: 'csui-select'},
                            visibleIf: {
                                '/appearance/chartAppearance/generalOptions/library': ["HighCharts"]
                            },
                            tooltip: 'Highcharts only - Choose between a Regular or Stacked data series in your chart.',
                            title: 'Stacked Data',
                            default: 'null',
                            oneOf: [
                                {
                                  description: 'Disabled',
                                  value : 'null',
                                  enum: ['null']
                                },
                                {
                                  description: 'Stacked by Value',
                                  value: 'normal',
                                  enum: ['normal']
                                },
                                {
                                  description: 'Stacked by Percentage',
                                  value: 'percent',
                                  enum: ['percent']
                                }
                              ]
                        }
                    },
                    fieldsets:
                        [{
                            fields: [ 'dataseriesName']
                        },
                        {
                            width: ['four wide'],
                            fields: ['chartType', 'stacking', 'dataseriesColor']
                        }]
                }
            },
            fieldsets:[
                {
                    title: 'Data Selection',
                    fields: ['data']
                },
                {
                    title: 'Options',
                    fields: ['chartProperties']
                }
            ],
            required: ['data', 'chartProperties']
        }
    };

    private _appearanceFormSchema = {
        type : 'object',
        widget : { id : 'csui-tabular-menu' },
        properties : {
            chartAppearance : {
                type : 'object',
                // title : 'Chart Appearance',
                // description : 'Customise the way your chart looks',
                widget : { id : 'csui-general-properties-object' },
                properties : {
                    generalOptions: {
                        type : 'object',
                        widget : { id : 'csui-property-object' },
                        properties : {
                            library : {
                                type : 'string',
                                placeholder : 'Select Library',
                                title : 'Visualisation Library',
                                requiredField : true,
                                minLength : 1,
                                widget: {id: 'csui-library-select'}
                            },
                            resultsLimit : {
                                type : 'number',
                                title : 'Results Limit',
                                default : 30,
                                // tslint:disable-next-line:max-line-length
                                tooltip : `To get all available results set Results Limit to 0.`,
                                widget : {id : 'csui-number'}
                            },
                            orderByAxis : {
                                type : 'string',
                                title : 'Order By',
                                widget : {id : 'csui-select'},
                                oneOf: [
                                    {
                                        description: 'X Axis',
                                        value : 'xaxis',
                                        enum: ['xaxis']
                                    },
                                    {
                                        description: 'Y Axis',
                                        value : 'yaxis',
                                        enum: ['yaxis']
                                    }]
                            }
                        },
                        fieldsets:
                        [{
                            grouping: 'equal width fields',
                            fields: ['library', 'resultsLimit', 'orderByAxis']
                        }],
                        required: [ 'library', 'resultsLimit' ]
                    },
                    highchartsAppearanceOptions: {
                        type : 'object',
                        grouping : 'ui fluid two column stackable basic grid',
                        widget : { id : 'csui-property-object' },
                        // title: 'Highcharts Appearance Options',
                        properties : {
                            title : {
                                type: 'object',
                                widget: { id : 'csui-property-object'},
                                properties: {
                                    titleText : {
                                        type : 'string',
                                        placeholder : 'Title',
                                        title : 'Title Text',
                                        widget: { id: 'csui-string' }
                                    },
                                    color : {
                                        type : 'string',
                                        pattern: '^#[0-9a-fA-F]{8}$',
                                        default: '#000000FF',
                                        title : 'Title Color',
                                        widget: {id: 'csui-color-picker'}
                                    },
                                    align : {
                                        type: 'string',
                                        widget : {id : 'csui-select'},
                                        title: 'Horizontal Alignment',
                                        tooltip: 'The horizontal alignment of the title.',
                                        oneOf: [
                                            {
                                                enum: ['left'],
                                                value : 'left',
                                                description: 'Left'
                                            },
                                            {
                                                enum: ['center'],
                                                value : 'center',
                                                description: 'Center'
                                            },
                                            {
                                                enum: ['right'],
                                                value : 'right',
                                                description: 'Right'
                                            }
                                        ],
                                        default: 'center',
                                    },
                                    margin : {
                                        type : 'number',
                                        default : 15,
                                        title : 'Margin',
                                        tooltip: 'The margin between the title and the plot area, or if a subtitle is present, the margin between the subtitle and the plot area. In pixels.',
                                        widget: {id: 'csui-number'}
                                    },
                                    fontSize : {
                                        type : 'number',
                                        default : 18,
                                        title : 'Font Size',
                                        tooltip: 'Font Size in px.',
                                        widget: {id: 'csui-number'}
                                    }
                                },
                                fieldsets:
                                [{
                                    title: 'Title',
                                    grouping: 'equal width fields',
                                    fields: ['titleText', 'color']
                                },
                                {
                                    grouping: 'equal width fields',
                                    fields: ['align', 'margin', 'fontSize']
                                }]
                            },
                            subtitle : {
                                type: 'object',
                                widget: { id : 'csui-property-object'},
                                properties: {
                                    subtitleText : {
                                        type : 'string',
                                        placeholder : 'Subtitle',
                                        title : 'Subtitle Text',
                                        widget: { id: 'csui-string' }
                                    },
                                    color : {
                                        type : 'string',
                                        pattern: '^#[0-9a-fA-F]{8}$',
                                        default: '#000000FF',
                                        title : 'Subtitle Color',
                                        widget: {id: 'csui-color-picker'}
                                    },
                                    align : {
                                        type: 'string',
                                        widget : {id : 'csui-select'},
                                        title: 'Horizontal Alignment',
                                        tooltip: 'The horizontal alignment of the subtitle.',
                                        oneOf: [
                                            {
                                                enum: ['left'],
                                                value : 'left',
                                                description: 'Left'
                                            },
                                            {
                                                enum: ['center'],
                                                value : 'center',
                                                description: 'Center'
                                            },
                                            {
                                                enum: ['right'],
                                                value : 'right',
                                                description: 'Right'
                                            }
                                        ],
                                        default: 'center',
                                    },
                                    fontSize : {
                                        type : 'number',
                                        default : 12,
                                        title : 'Font Size',
                                        tooltip: 'Font Size in px.',
                                        widget: {id: 'csui-number'}
                                    }
                                },
                                fieldsets:
                                [{
                                    title: 'Subtitle',
                                    grouping: 'equal width fields',
                                    fields: ['subtitleText', 'color']
                                },
                                {
                                    grouping: 'equal width fields',
                                    fields: ['align', 'fontSize']
                                }]
                            },
                            xAxis : {
                                type : 'object',
                                widget : { id : 'csui-property-object' },
                                properties : {
                                    xAxisText : {
                                        type : 'string',
                                        placeholder : 'X Axis name',
                                        title : 'Name',
                                        widget: { id: 'csui-string' }
                                    },
                                    color : {
                                        type : 'string',
                                        pattern: '^#[0-9a-fA-F]{8}$',
                                        default: '#000000FF',
                                        title : 'X Axis Color',
                                        widget: {id: 'csui-color-picker'}
                                    },
                                    fontSize : {
                                        type : 'number',
                                        default : 11,
                                        title : 'Font Size',
                                        tooltip: 'Font Size in px.',
                                        widget: {id: 'csui-number'}
                                    }
                                },
                                fieldsets:
                                [{
                                    title: 'X Axis',
                                    grouping: 'equal width fields',
                                    fields: ['xAxisText']
                                },
                                {
                                    grouping: 'equal width fields',
                                    fields: ['fontSize', 'color']
                                }]
                            },
                            yAxis : {
                                type : 'object',
                                widget : { id : 'csui-property-object' },
                                properties : {
                                    yAxisText : {
                                        type : 'string',
                                        placeholder : 'Y Axis name',
                                        title : 'Name',
                                        widget: { id: 'csui-string' }
                                    },
                                    color : {
                                        type : 'string',
                                        pattern: '^#[0-9a-fA-F]{8}$',
                                        default: '#000000FF',
                                        title : 'Y Axis Color',
                                        widget: {id: 'csui-color-picker'}
                                    },
                                    fontSize : {
                                        type : 'number',
                                        default : 11,
                                        title : 'Font Size',
                                        tooltip: 'Font Size in px.',
                                        widget: {id: 'csui-number'}
                                    },
                                    reversedStacks : {
                                        type: 'boolean',
                                        widget : {id : 'csui-boolean'},
                                        default: false,
                                        tooltip: 'If true, the first series in a stack will be drawn on top in a positive, non-reversed Y axis. If false, the first series is in the base of the stack.',
                                        description: 'Reverse Y Axis Stacks'
                                    }
                                },
                                fieldsets:
                                [{
                                    title: 'Y Axis',
                                    grouping: 'equal width fields',
                                    fields: ['yAxisText']
                                },
                                {
                                    grouping: 'equal width fields',
                                    fields: ['fontSize', 'color']
                                },
                                {
                                    grouping: 'equal width fields',
                                    fields:['reversedStacks']
                                }]
                            },
                            dataSeriesColorArray : {
                                type: 'array',
                                title: 'Data Series Color Palette',
                                itemName: 'Series Color',
                                description: 'Select a custom color palette for your diagram',
                                // 'minItems': 1,
                                deleteButtonPosition : 'out',
                                widget : { id : 'csui-array' },
                                items: {
                                    type : 'string',
                                    pattern: '^#[0-9a-fA-F]{8}$',
                                    default: '#000000FF',
                                    widget: {id: 'csui-color-picker'}
                                }
                            },
                            hcChartArea: {
                                type: 'object',
                                widget: { id : 'csui-property-object'},
                                properties: {
                                    hcCABackGroundColor: {
                                        type : 'string',
                                        pattern: '^#[0-9a-fA-F]{8}$',
                                        default: '#FFFFFFFF',
                                        title : 'Background Color',
                                        tooltip: 'Background color for the full chart area.',
                                        widget: {id: 'csui-color-picker'}
                                    },
                                    hcCABorderWidth: {
                                        type : 'number',
                                        default: 0,
                                        title : 'Border Width',
                                        tooltip: 'The pixel width of the outer chart border.',
                                        widget: {id: 'csui-number'}
                                    },
                                    hcCABorderCornerRadius: {
                                        type : 'number',
                                        default: 0,
                                        title : 'Border Corner Radius',
                                        tooltip: 'The corner radius of the outer chart border.',
                                        widget: {id: 'csui-number'}
                                    },
                                    hcCABorderColor: {
                                        type : 'string',
                                        pattern: '^#[0-9a-fA-F]{8}$',
                                        default: '#335cadff',
                                        title : 'Border Color',
                                        tooltip: 'The color of the outer chart border.',
                                        widget: {id: 'csui-color-picker'}
                                    },
                                },
                                fieldsets:
                                    [{
                                        title: 'Chart Area',
                                        grouping: 'equal width fields',
                                        fields: ['hcCABackGroundColor', 'hcCABorderColor']
                                    },
                                    {
                                        grouping: 'equal width fields',
                                        fields: ['hcCABorderCornerRadius', 'hcCABorderWidth']
                                    }]
                            },
                            hcPlotArea: {
                                type: 'object',
                                widget: { id : 'csui-property-object'},
                                properties: {
                                    hcPABackgroundColor: {
                                        type : 'string',
                                        pattern: '^#[0-9a-fA-F]{8}$',
                                        title : 'Background Color',
                                        tooltip: 'Background color for the plot area, the area inside the axes.',
                                        widget: {id: 'csui-color-picker'}
                                    },
                                    hcPABorderWidth: {
                                        type : 'number',
                                        default: 0,
                                        title : 'Border Width',
                                        tooltip: 'The pixel width of the plot area border.',
                                        widget: {id: 'csui-number'}
                                    },
                                    hcPABackgroundImageURL: {
                                        type : 'string',
                                        title : 'Background Image URL',
                                        placeholder: 'https://domain.com/picture.png',
                                        tooltip: 'The online URL for an image to use as the plot area background.',
                                        widget: {id: 'csui-string'}
                                    },
                                    hcPABorderColor: {
                                        type : 'string',
                                        pattern: '^#[0-9a-fA-F]{8}$',
                                        default: '#ccccccff',
                                        title : 'Border Color',
                                        tooltip: 'The color of the inner chart or plot area border.',
                                        widget: {id: 'csui-color-picker'}
                                    },
                                },
                                fieldsets:
                                    [{
                                        title: 'Plot Area',
                                        grouping: 'equal width fields',
                                        fields: ['hcPABackgroundColor', 'hcPABorderColor']
                                    },
                                    {
                                        grouping: 'equal width fields',
                                        fields: ['hcPABackgroundImageURL', 'hcPABorderWidth']
                                    }]
                            },
                            hcCredits: {
                                type: 'object',
                                widget: { id : 'csui-property-object'},
                                properties: {
                                    hcEnableCredits : {
                                        type: 'boolean',
                                        widget : {id : 'csui-boolean'},
                                        default: false,
                                        tooltip: 'Whether to show the credits text.',
                                        description: 'Enable Credits'
                                    },
                                    hcCreditsText : {
                                        type: 'string',
                                        default: 'Created by OpenAIRE via HighCharts',
                                        title : 'Credits Text',
                                        tooltip: 'The text for the credits label',
                                        widget : {id: 'csui-string'},
                                        visibleIf: {
                                            'hcEnableCredits': [true]
                                        }
                                    }
                                },
                                fieldsets:
                                    [{
                                        title: 'Credits',
                                        fields: ['hcEnableCredits', 'hcCreditsText']
                                    }]
                            },
                            hcLegend: {
                                type: 'object',
                                widget: { id : 'csui-property-object'},
                                relaxed: true,
                                properties: {
                                    hcEnableLegend : {
                                        type: 'boolean',
                                        widget : {id : 'csui-boolean'},
                                        default: true,
                                        tooltip: 'Enable or disable the legend.',
                                        description: 'Enable Legend'
                                    },
                                    hcLegendLayout : {
                                        type: 'string',
                                        widget : {id : 'csui-select'},
                                        title: 'Item Layout',
                                        tooltip: 'The layout of the legend items. Can be one of "Horizontal" or "Vertical".',
                                        oneOf: [
                                            {
                                                enum: ['horizontal'],
                                                value : 'horizontal',
                                                description: 'Horizontal'
                                            },
                                            {
                                                enum: ['vertical'],
                                                value : 'vertical',
                                                description: 'Vertical'
                                            }
                                        ],
                                        default: 'horizontal',
                                        visibleIf: {
                                            'hcEnableLegend': [true]
                                        }
                                    },
                                    hcLegendHorizontalAlignment : {
                                        type: 'string',
                                        widget : {id : 'csui-select'},
                                        title: 'Horizontal Alignment',
                                        tooltip: 'The horizontal alignment of the legend box within the chart area.',
                                        oneOf: [
                                            {
                                                enum: ['left'],
                                                value : 'left',
                                                description: 'Left'
                                            },
                                            {
                                                enum: ['center'],
                                                value : 'center',
                                                description: 'Center'
                                            },
                                            {
                                                enum: ['right'],
                                                value : 'right',
                                                description: 'Right'
                                            }
                                        ],
                                        default: 'center',
                                        visibleIf: {
                                            'hcEnableLegend': [true]
                                        }
                                    },
                                    hcLegendVerticalAlignment : {
                                        type: 'string',
                                        widget : {id : 'csui-select'},
                                        title: 'Vertical Alignment',
                                        tooltip: 'The vertical alignment of the legend box.',
                                        oneOf: [
                                            {
                                                enum: ['top'],
                                                value : 'top',
                                                description: 'Top'
                                            },
                                            {
                                                enum: ['middle'],
                                                value : 'middle',
                                                description: 'Middle'
                                            },
                                            {
                                                enum: ['bottom'],
                                                value : 'bottom',
                                                description: 'Bottom'
                                            }
                                        ],
                                        default: 'bottom',
                                        visibleIf: {
                                            'hcEnableLegend': [true]
                                        }
                                    },
                                },
                                fieldsets:
                                    [{
                                        title: 'Legend',
                                        fields: ['hcEnableLegend']
                                    },
                                    {
                                        grouping: 'equal width stackable fields',
                                        fields: ['hcLegendLayout', 'hcLegendHorizontalAlignment', 'hcLegendVerticalAlignment']
                                    }]
                            },
                            hcMiscOptions: {
                                type: 'object',
                                widget: { id : 'csui-property-object'},
                                properties: {
                                    exporting: {
                                        type: 'boolean',
                                        widget : {id : 'csui-boolean'},
                                        default: true,
                                        // tslint:disable-next-line:max-line-length
                                        tooltip: 'Enable the context button on the top right of the chart, allowing end users to download image exports.',
                                        description: 'Enable Exporting'
                                    },
                                    stackedChart : {
                                        type : 'string',
                                        widget : { id: 'csui-select'},
                                        tooltip: 'Choose between a Regular or Stacked chart.',
                                        title: 'Stacked Graph',
                                        default: 'null',
                                        oneOf: [
                                            {
                                              description: 'Disabled',
                                              value : 'null',
                                              enum: ['null']
                                            },
                                            {
                                              description: 'Stacked by Value',
                                              value: 'normal',
                                              enum: ['normal']
                                            },
                                            {
                                              description: 'Stacked by Percentage',
                                              value: 'percent',
                                              enum: ['percent']
                                            }
                                          ]
                                    }
                                },
                                fieldsets:
                                [{
                                    title: 'Misc Options',
                                    fields: ['exporting', 'stackedChart']
                                }]
                            },
                            hcDataLabels: {
                                type: 'object',
                                widget: { id : 'csui-property-object'},
                                properties: {
                                    enabled : {
                                        type: 'boolean',
                                        widget : {id : 'csui-boolean'},
                                        default: false,
                                        tooltip: 'Show small labels next to each data value.',
                                        description: 'Enable data labels for all series'
                                    },
                                    style:{
                                        type : 'object',
                                        widget: { id : 'csui-property-object'},
                                        visibleIf: {'enabled': true},
                                        properties: {
                                            color: {
                                                type : 'string',
                                                pattern: '^#[0-9a-fA-F]{8}$',
                                                default: '#000000ff',
                                                title : 'Data Label Color',
                                                tooltip: 'The text color for the data labels.',
                                                widget: {id: 'csui-color-picker'},
                                                
                                            }
                                        },
                                        fieldsets:
                                        [{
                                            fields: ['color']
                                        }]
                                    }                                    
                                },
                                fieldsets:
                                [{
                                    title: 'Data Labels',
                                    fields: ['enabled', 'style']
                                }]
                            }
                        },
                        fieldsets: [
                            {
                                fieldsetColumnWidth : 'eight wide column',
                                fields: ['title', 'subtitle', 'xAxis', 'yAxis', 'hcMiscOptions']
                            },
                            {
                                fieldsetColumnWidth : 'eight wide column',
                                fields: [ 'hcDataLabels', 'hcCredits', 'hcLegend', 'hcChartArea', 'hcPlotArea', 'dataSeriesColorArray' ]
                            }
                        ],
                        visibleIf: {
                            'generalOptions/library': ['HighCharts']
                        }
                    },
                    echartsAppearanceOptions: {
                        type : 'object',
                        grouping : 'ui fluid two column stackable basic grid',
                        widget : { id : 'csui-property-object' },
                        // title: 'eCharts Appearance Options',
                        properties : {
                            titles : {
                                type: 'object',
                                widget: { id : 'csui-property-object'},
                                properties: {
                                    title : {
                                        type : 'string',
                                        placeholder : 'Title',
                                        title : 'Title',
                                        widget: { id: 'csui-string' }
                                    },
                                    subtitle : {
                                        type : 'string',
                                        placeholder : 'Subtitle',
                                        title : 'Subtitle',
                                        widget: { id: 'csui-string' }
                                    }
                                },
                                fieldsets:
                                    [{
                                        title: 'Diagram Title',
                                        grouping: 'equal width fields',
                                        fields: ['title', 'subtitle']
                                    }]
                            },
                            axisNames : {
                                type : 'object',
                                widget : { id : 'csui-property-object' },
                                properties : {
                                    yaxisName : {
                                        type : 'string',
                                        placeholder : 'Yaxis',
                                        title : 'Yaxis',
                                        widget: { id: 'csui-string' }
                                    },
                                    xaxisName : {
                                        type : 'string',
                                        placeholder : 'Xaxis',
                                        title : 'Xaxis',
                                        widget: { id: 'csui-string' }
                                    }
                                },
                                fieldsets:
                                    [{
                                        title: 'Axis Names',
                                        grouping: 'equal width fields',
                                        fields: ['yaxisName', 'xaxisName']
                                    }]
                            },
                            dataSeriesColorArray : {
                                type: 'array',
                                title: 'Data Series Color',
                                itemName: 'Series Color',
                                // 'minItems': 1,
                                deleteButtonPosition : 'out',
                                widget : { id : 'csui-array' },
                                items: {
                                    type : 'string',
                                    pattern: '^#[0-9a-fA-F]{8}$',
                                    default: '#000000FF',
                                    widget: {id: 'csui-color-picker'}
                                }
                            },
                            ecChartArea: {
                                type: 'object',
                                widget: { id : 'csui-property-object'},
                                properties: {
                                    ecCABackGroundColor: {
                                        type : 'string',
                                        pattern: '^#[0-9a-fA-F]{8}$',
                                        default: '#FFFFFFFF',
                                        title : 'Background Color',
                                        tooltip: 'Background color for the full chart area.',
                                        widget: {id: 'csui-color-picker'}
                                    },
                                },
                                fieldsets:
                                    [{
                                        title: 'Chart Area',
                                        grouping: 'equal width fields',
                                        fields: ['ecCABackGroundColor']
                                    }]
                            },
                            ecLegend: {
                                type: 'object',
                                widget: { id : 'csui-property-object'},
                                relaxed: true,
                                properties: {
                                    ecEnableLegend : {
                                        type: 'boolean',
                                        widget : {id : 'csui-boolean'},
                                        default: true,
                                        tooltip: 'Enable or disable the legend.',
                                        description: 'Enable Legend'
                                    },
                                    ecLegendLayout : {
                                        type: 'string',
                                        widget : {id : 'csui-select'},
                                        title: 'Item Layout',
                                        tooltip: 'The layout of the legend items. Can be one of "Horizontal" or "Vertical".',
                                        oneOf: [
                                            {
                                                enum: ['horizontal'],
                                                value : 'horizontal',
                                                description: 'Horizontal'
                                            },
                                            {
                                                enum: ['vertical'],
                                                value : 'vertical',
                                                description: 'Vertical'
                                            }
                                        ],
                                        default: 'horizontal',
                                        visibleIf: {
                                            'ecEnableLegend': [true]
                                        }
                                    },
                                    ecLegendHorizontalAlignment : {
                                        type: 'string',
                                        widget : {id : 'csui-select'},
                                        title: 'Horizontal Alignment',
                                        tooltip: 'The horizontal alignment of the legend box within the chart area.',
                                        oneOf: [
                                            {
                                                enum: ['left'],
                                                value : 'left',
                                                description: 'Left'
                                            },
                                            {
                                                enum: ['center'],
                                                value : 'center',
                                                description: 'Center'
                                            },
                                            {
                                                enum: ['right'],
                                                value : 'right',
                                                description: 'Right'
                                            }
                                        ],
                                        default: 'center',
                                        visibleIf: {
                                            'ecEnableLegend': [true]
                                        }
                                    },
                                    ecLegendVerticalAlignment : {
                                        type: 'string',
                                        widget : {id : 'csui-select'},
                                        title: 'Vertical Alignment',
                                        tooltip: 'The vertical alignment of the legend box.',
                                        oneOf: [
                                            {
                                                enum: ['top'],
                                                value : 'top',
                                                description: 'Top'
                                            },
                                            {
                                                enum: ['middle'],
                                                value : 'middle',
                                                description: 'Middle'
                                            },
                                            {
                                                enum: ['bottom'],
                                                value : 'bottom',
                                                description: 'Bottom'
                                            }
                                        ],
                                        default: 'bottom',
                                        visibleIf: {
                                            'ecEnableLegend': [true]
                                        }
                                    },
                                },
                                fieldsets:
                                    [{
                                        title: 'Legend',
                                        fields: ['ecEnableLegend']
                                    },
                                        {
                                            grouping: 'equal width stackable fields',
                                            fields: ['ecLegendLayout', 'ecLegendHorizontalAlignment', 'ecLegendVerticalAlignment']
                                        }]
                            },
                            ecMiscOptions: {
                                type: 'object',
                                widget: { id : 'csui-property-object'},
                                properties: {
                                    exporting: {
                                        type: 'boolean',
                                        widget : {id : 'csui-boolean'},
                                        default: true,
                                        // tslint:disable-next-line:max-line-length
                                        tooltip: 'Enable the context button on the top right of the chart, allowing end users to download image exports.',
                                        description: 'Enable Exporting'
                                    },
                                    ecEnableDataLabels : {
                                        type: 'boolean',
                                        widget : {id : 'csui-boolean'},
                                        default: false,
                                        tooltip: 'Show small labels next to each data value.',
                                        description: 'Enable data labels for all series'
                                    },
                                    stackedChart : {
                                        type: 'boolean',
                                        widget : {id : 'csui-boolean'},
                                        default: false,
                                        tooltip: 'Choose between a Regular or Stacked chart.',
                                        description: 'Stacked graph',
                                    }
                                },
                                fieldsets:
                                    [{
                                        title: 'Misc Options',
                                        fields: ['exporting', 'ecEnableDataLabels', 'stackedChart']
                                    }]
                            }
                        },
                        fieldsets: [
                            {
                                fieldsetColumnWidth : 'eight wide column',
                                fields: ['titles', 'axisNames', 'ecMiscOptions']
                            },
                            {
                                fieldsetColumnWidth : 'eight wide column',
                                fields: ['ecLegend', 'ecChartArea', 'dataSeriesColorArray' ]
                            }
                        ],
                        visibleIf: {
                            'generalOptions/library': ['eCharts']
                        }
                    },
                    googlechartsAppearanceOptions: {
                        type : 'object',
                        grouping : 'ui fluid two column stackable basic grid',
                        widget : { id : 'csui-property-object' },
                        // title: 'Googlecharts Appearance Options',
                        properties : {
                            titles : {
                                type: 'object',
                                widget: { id : 'csui-property-object'},
                                properties: {
                                    title : {
                                        type : 'string',
                                        placeholder : 'Title',
                                        title : 'Title',
                                        widget: { id: 'csui-string' }
                                    }
                                    // GoogleCharts does not support subtitle
                                    // 'subtitle' : {
                                    //     'type' : 'string',
                                    //     placeholder : 'Subtitle',
                                    //     title : 'Subtitle',
                                    //     widget: { id: 'csui-string' }
                                    // }
                                },
                                fieldsets:
                                    [{
                                        title: 'Diagram Title',
                                        grouping: 'equal width fields',
                                        fields: ['title']
                                    }]
                            },
                            axisNames : {
                                type : 'object',
                                widget : { id : 'csui-property-object' },
                                properties : {
                                    yaxisName : {
                                        type : 'string',
                                        placeholder : 'Yaxis',
                                        title : 'Yaxis',
                                        widget: { id: 'csui-string' }
                                    },
                                    xaxisName : {
                                        type : 'string',
                                        placeholder : 'Xaxis',
                                        title : 'Xaxis',
                                        widget: { id: 'csui-string' }
                                    }
                                },
                                fieldsets:
                                    [{
                                        title: 'Axis Names',
                                        grouping: 'equal width fields',
                                        fields: ['yaxisName', 'xaxisName']
                                    }]
                            },
                            results : {
                                type : 'object',
                                widget : { id : 'csui-property-object' },
                                properties : {
                                    resultsLimit : {
                                        type : 'number',
                                        title : 'Results Limit',
                                        default : 30,
                                        // tslint:disable-next-line:max-line-length
                                        tooltip : `To get all available results set Results Limit to 0.`,
                                        widget : {id : 'csui-number'}
                                    },
                                    orderByAxis : {
                                        type : 'string',
                                        title : 'Order By',
                                        widget : {id : 'csui-select'},
                                        oneOf: [
                                            {
                                                description: 'X Axis',
                                                value : 'xaxis',
                                                enum: ['xaxis']
                                            },
                                            {
                                                description: 'Y Axis',
                                                value : 'yaxis',
                                                enum: ['yaxis']
                                            }
                                        ]
                                    }
                                },
                                fieldsets:
                                [{
                                    title: 'Results',
                                    grouping: 'equal width fields',
                                    fields: ['resultsLimit', 'orderByAxis']
                                }]
                            },
                            stackedChart : {
                                type : 'string',
                                widget : { id: 'csui-select'},
                                tooltip: 'Choose between a Regular or Stacked chart.',
                                title: 'Stacked Graph',
                                default: 'false',
                                oneOf: [
                                    {
                                      description: 'Disabled',
                                      value : 'false',
                                      enum : ['false']
                                    },
                                    {
                                      description: 'Stacked by Value',
                                      value: 'absolute',
                                      enum: ['absolute']
                                    },
                                    {
                                      description: 'Stacked by Percentage',
                                      value: 'percent',
                                      enum: ['percent']
                                    }
                                  ]
                            },
                            gcCABackGroundColor: {
                                type : 'string',
                                pattern: '^#[0-9a-fA-F]{8}$',
                                default: '#FFFFFFFF',
                                title : 'Background Color',
                                tooltip: 'Background color for the full chart area.',
                                widget: {id: 'csui-color-picker'}
                            },
                            gcPABackgroundColor: {
                                type : 'string',
                                pattern: '^#[0-9a-fA-F]{8}$',
                                title : 'Background Color',
                                tooltip: 'Background color for the plot area, the area inside the axes.',
                                widget: {id: 'csui-color-picker'}
                            },
                            exporting : {
                                type: 'boolean',
                                widget : {id : 'csui-boolean'},
                                default: true,
                                // tslint:disable-next-line:max-line-length
                                tooltip: 'Enable the context button on the top right of the chart, allowing end users to download image exports.',
                                title: 'Enable Exporting'
                            }
                        },
                        fieldsets: [
                            {
                                fieldsetColumnWidth : 'eight wide column',
                                fields: ['titles']
                            },
                            {
                                title : 'Plot Options',
                                fieldsetColumnWidth : 'four wide column',
                                fields: ['stackedChart']
                            },
                            {
                                title : 'Exporting',
                                fieldsetColumnWidth : 'four wide column',
                                fields: ['exporting']
                            },
                            {
                                fieldsetColumnWidth : 'eight wide column',
                                fields: ['axisNames']
                            },
                            {
                                title : 'Chart Area',
                                fieldsetColumnWidth : 'four wide column',
                                fields: ['gcCABackGroundColor']
                            },
                            {
                                title : 'Plot Area',
                                fieldsetColumnWidth : 'four wide column',
                                fields: ['gcPABackgroundColor']
                            },
                            {
                                fieldsetColumnWidth : 'eight wide column',
                                fields: ['results']
                            }
                        ],
                        visibleIf: {
                            'generalOptions/library': ['GoogleCharts']
                        }
                    },
                    highmapsAppearanceOptions: {
                        type : 'object',
                        grouping : 'ui fluid two column stackable basic grid',
                        widget : { id : 'csui-property-object' },
                        properties : {
                            title : {
                                type: 'object',
                                widget: { id : 'csui-property-object'},
                                properties: {
                                    titleText : {
                                        type : 'string',
                                        placeholder : 'Title',
                                        title : 'Title Text',
                                        widget: { id: 'csui-string' }
                                    },
                                    color : {
                                        type : 'string',
                                        pattern: '^#[0-9a-fA-F]{8}$',
                                        default: '#000000FF',
                                        title : 'Title Color',
                                        widget: {id: 'csui-color-picker'}
                                    },
                                    align : {
                                        type: 'string',
                                        widget : {id : 'csui-select'},
                                        title: 'Horizontal Alignment',
                                        tooltip: 'The horizontal alignment of the title.',
                                        oneOf: [
                                            {
                                                enum: ['left'],
                                                value : 'left',
                                                description: 'Left'
                                            },
                                            {
                                                enum: ['center'],
                                                value : 'center',
                                                description: 'Center'
                                            },
                                            {
                                                enum: ['right'],
                                                value : 'right',
                                                description: 'Right'
                                            }
                                        ],
                                        default: 'center',
                                    },
                                    margin : {
                                        type : 'number',
                                        default : 15,
                                        title : 'Margin',
                                        tooltip: 'The margin between the title and the plot area, or if a subtitle is present, the margin between the subtitle and the plot area. In pixels.',
                                        widget: {id: 'csui-number'}
                                    },
                                    fontSize : {
                                        type : 'number',
                                        default : 18,
                                        title : 'Font Size',
                                        tooltip: 'Font Size in px.',
                                        widget: {id: 'csui-number'}
                                    }
                                },
                                fieldsets:
                                [{
                                    title: 'Title',
                                    grouping: 'equal width fields',
                                    fields: ['titleText', 'color']
                                },
                                {
                                    grouping: 'equal width fields',
                                    fields: ['align', 'margin', 'fontSize']
                                }]
                            },
                            subtitle : {
                                type: 'object',
                                widget: { id : 'csui-property-object'},
                                properties: {
                                    subtitleText : {
                                        type : 'string',
                                        placeholder : 'Subtitle',
                                        title : 'Subtitle Text',
                                        widget: { id: 'csui-string' }
                                    },
                                    color : {
                                        type : 'string',
                                        pattern: '^#[0-9a-fA-F]{8}$',
                                        default: '#000000FF',
                                        title : 'Subtitle Color',
                                        widget: {id: 'csui-color-picker'}
                                    },
                                    align : {
                                        type: 'string',
                                        widget : {id : 'csui-select'},
                                        title: 'Horizontal Alignment',
                                        tooltip: 'The horizontal alignment of the subtitle.',
                                        oneOf: [
                                            {
                                                enum: ['left'],
                                                value : 'left',
                                                description: 'Left'
                                            },
                                            {
                                                enum: ['center'],
                                                value : 'center',
                                                description: 'Center'
                                            },
                                            {
                                                enum: ['right'],
                                                value : 'right',
                                                description: 'Right'
                                            }
                                        ],
                                        default: 'center',
                                    },
                                    fontSize : {
                                        type : 'number',
                                        default : 12,
                                        title : 'Font Size',
                                        tooltip: 'Font Size in px.',
                                        widget: {id: 'csui-number'}
                                    }
                                },
                                fieldsets:
                                [{
                                    title: 'Subtitle',
                                    grouping: 'equal width fields',
                                    fields: ['subtitleText', 'color']
                                },
                                {
                                    grouping: 'equal width fields',
                                    fields: ['align', 'fontSize']
                                }]
                            },
                            hmCredits: {
                                type: 'object',
                                widget: { id : 'csui-property-object'},
                                properties: {
                                    hmEnableCredits : {
                                        type: 'boolean',
                                        widget : {id : 'csui-boolean'},
                                        default: false,
                                        tooltip: 'Whether to show the credits text.',
                                        description: 'Enable Credits'
                                    },
                                    hmCreditsText : {
                                        type: 'string',
                                        default: 'Created by OpenAIRE via HighCharts',
                                        title : 'Credits Text',
                                        tooltip: 'The text for the credits label',
                                        widget : {id: 'csui-string'},
                                        visibleIf: {
                                            'hmEnableCredits': [true]
                                        }
                                    }
                                },
                                fieldsets:
                                    [{
                                        title: 'Credits',
                                        fields: ['hmEnableCredits', 'hmCreditsText']
                                    }]
                            },
                            hmMiscOptions: {
                                type: 'object',
                                widget: { id : 'csui-property-object'},
                                properties: {
                                    exporting: {
                                        type: 'boolean',
                                        widget : {id : 'csui-boolean'},
                                        default: true,
                                        // tslint:disable-next-line:max-line-length
                                        tooltip: 'Enable the context button on the top right of the chart, allowing end users to download image exports.',
                                        description: 'Enable Exporting'
                                    },
                                    hmEnableDataLabels : {
                                        type: 'boolean',
                                        widget : {id : 'csui-boolean'},
                                        default: false,
                                        tooltip: 'Show small labels next to each data value.',
                                        description: 'Enable data labels for all series'
                                    },
                                    hmEnableMapNavigation : {
                                        type: 'boolean',
                                        widget : {id : 'csui-boolean'},
                                        default: false,
                                        tooltip: 'Whether to enable navigation of the map.',
                                        description: 'Enable map navigation'
                                    },
                                },
                                fieldsets:
                                [{
                                    title: 'Misc Options',
                                    fields: ['exporting', 'hmEnableDataLabels', 'hmEnableMapNavigation']
                                }]
                            },
                            hmLegend : {
                                type: 'object',
                                widget: { id : 'csui-property-object'},
                                properties: {
                                    hmEnableLegend : {
                                        type: 'boolean',
                                        widget : {id : 'csui-boolean'},
                                        default: true,
                                        tooltip: 'Enable or disable the legend.',
                                        description: 'Enable Legend'
                                    },
                                    hmLegendTitle : {
                                        type: 'string',
                                        placeholder: 'Legend Title',
                                        title: 'Legend Title',
                                        tooltip: 'The title to be added on top of the legend.',
                                        widget : {id : 'csui-string'},
                                        visibleIf: {
                                            'hmEnableLegend': [true]
                                        }
                                    }
                                },
                                fieldsets:
                                [{
                                    title: 'Legend Options',
                                    fields: ['hmEnableLegend', 'hmLegendTitle']
                                }]
                            },
                            hmColorAxis : {
                                type: 'object',
                                widget: { id : 'csui-property-object'},
                                properties: {
                                    hmColorAxisMin : {
                                        type : 'number',
                                        title : 'Color Axis Min',
                                        tooltip: 'The minimum value of the color axis in terms of map point values.',
                                        widget: {id: 'csui-number'}
                                    },
                                    hmColorAxisMax : {
                                        type : 'number',
                                        title : 'Color Axis Max',
                                        tooltip: 'The maximum value of the color axis in terms of map point values.',
                                        widget: {id: 'csui-number'}
                                    },
                                    hmColorAxisType : {
                                        type: 'string',
                                        placeholder: 'Legend Title',
                                        title: 'Color Axis Interpolation',
                                        tooltip: 'The type of interpolation to use for the color axis.',
                                        widget : { id: 'csui-select'},
                                        default: 'linear',
                                        oneOf: [
                                            {
                                              description: 'Linear',
                                              value : 'linear',
                                              enum: ['linear']
                                            },
                                            {
                                              description: 'Logarithmic',
                                              value: 'logarithmic',
                                              enum: ['logarithmic']
                                            }
                                          ]
                                    },
                                    hmColorAxisMinColor : {
                                        type : 'string',
                                        pattern: '^#[0-9a-fA-F]{6}$',
                                        default: '#E6EBF5',
                                        title : 'Minimum Color',
                                        tooltip: 'Representation of the minimum on the color axis.',
                                        widget: {id: 'csui-color-picker'}
                                    },
                                    hmColorAxisMaxColor : {
                                        type : 'string',
                                        pattern: '^#[0-9a-fA-F]{6}$',
                                        default: '#003399',
                                        title : 'Maximum Color',
                                        tooltip: 'Representation of the maximum on the color axis.',
                                        widget: {id: 'csui-color-picker'}
                                    }
                                },
                                fieldsets:
                                [{
                                    title: 'Color Axis Options',
                                    grouping: 'equal width fields',
                                    fields: [ 'hmColorAxisType']
                                },
                                {   grouping: 'equal width fields',
                                    fields: ['hmColorAxisMin', 'hmColorAxisMax']
                                },
                                {
                                    grouping: 'equal width fields',
                                    fields: ['hmColorAxisMinColor', 'hmColorAxisMaxColor']
                                }]
                            }
                        },
                        fieldsets: [
                            {
                                fieldsetColumnWidth : 'eight wide column',
                                fields: ['title', 'subtitle', 'hmCredits', 'hmLegend' ]
                            },
                            {
                                fieldsetColumnWidth : 'eight wide column',
                                fields: ['hmColorAxis', 'hmMiscOptions']
                            }
                        ],
                        visibleIf: {
                            'generalOptions/library': ['HighMaps']
                        }
                    }
                },
                fieldsets: [
                    {
                        title: 'General Options',
                        description : 'Select a chart Visualisation Library, the upper limit of your results and how they are grouped',
                        fields: ['generalOptions']
                    },
                    {
                        title: 'Visualisation Options',
                        description : 'Available options based on the selected Visualisation Library',
                        fields: ['highchartsAppearanceOptions', 'googlechartsAppearanceOptions', 'highmapsAppearanceOptions',
                            'echartsAppearanceOptions' ]
                    }
                ],
                required: ['generalOptions']
            },
            tableAppearance : {
                type : 'object',
                // title: 'Table Appearance',
                // description : 'Customise the way your table looks',
                widget : { id : 'csui-general-properties-object' },
                properties : {
                    paginationSize : {
                        type : 'number',
                        title : 'Table Page Size',
                        default : 30,
                        minLength : 10,
                        tooltip : 'The number of rows in each page of the Data Table',
                        widget: {id: 'csui-number'},
                    },
                },
                fieldsets: [
                    {
                        title: 'Visualisation Options',
                        description : 'Available options based on the selected Visualisation Library',
                        grouping: 'three wide field',
                        fields: ['paginationSize']
                    }
                ]
            }
        },
        fieldsets: [
            {
                tabTitle : 'Chart Appearance',
                // description : 'Customise the way your chart looks',
                fields: ['chartAppearance']
            },
            {
                tabTitle : 'Table Appearance',
                // description : 'Customise the way your chart looks',
                fields: ['tableAppearance']
            }
        ],
        required: ['chartAppearance', 'tableAppearance']
    };

    private _SCGAFormSchema = {
        $schema: 'http://json-schema.org/draft-04/hyper-schema#',
        type : 'object',
        widget : { id : 'csui-head-menu' },
        properties : {
            view : this._viewFormSchema ,
            category : this._categoryFormSchema,
            dataseries : this._dataseriesFormSchema,
            appearance : this._appearanceFormSchema
        },
        fieldsets: [
            {
                title : 'Select View',
                description : 'Choose what type of data interests you',
                fields: ['view']
            },
            {
                title : 'Select Category',
                description : 'Choose the type of diagram you want to make',
                fields: ['category']
            },
            {
                title: 'Configure Dataseries',
                description : 'Describe the data you want to see',
                fields: ['dataseries']
            },
            {
                title: 'Customise Appearance',
                description : 'Change the way your diagram looks',
                fields: ['appearance']
            }
        ],
        required: ['view', 'category', 'dataseries', 'appearance']
    };

    get formSchema() { return this._SCGAFormSchema; }
    get viewFormSchema() { return this._viewFormSchema; }
    get categoriesFormSchema() { return this._categoryFormSchema; }
    get dataseriesFormSchema() { return this._dataseriesFormSchema; }
    get appearanceFormSchema() { return this._appearanceFormSchema; }

    // Advanced Validation: https://github.com/guillotinaweb/ngx-schema-form#advanced-validation
    // Declare a mapping between action ids and their implementations
    get customValidators() {
    return {

        // '/generalChartProperties/profile': (value: any, formProperty: FormProperty, form: PropertyGroup) => {
        //     if (value === undefined || value === null || value === '') {
        //         // return { '/generalChartProperties/profile': { 'expectedValue': 'OpenAIRE All-Inclusive' }} ;
        //         return null;
        //     }

        //     return null;
        // },
        // '/appearance/library': (value: any, formProperty: FormProperty, form: PropertyGroup) => {
        //     if (value === undefined || value === null || value === '' || value === 'HighCharts') {
        //         // return { '/appearance/library': { 'expectedValue': 'HighCharts' }} ;
        //         return null;
        //     }

        //     return null;
        // }


    }; }
}
