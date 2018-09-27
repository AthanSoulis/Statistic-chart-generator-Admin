import { FormProperty, PropertyGroup } from 'ngx-schema-form/lib/model/formproperty';

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
                'title' : 'User Profile',
                'widget': {
                    'id': 'csui-profile-picker'
                }
            },
            'library' : {
                'type' : 'string',
                'placeholder' : 'Select Library',
                'title' : 'Library',
                'widget': {
                    'id': 'csui-library-select'
                },
            },
            'axisNames' : {
                'type' : 'object',
                'widget' : { 'id' : 'csui-property-object' },
                'properties' : {
                    'yaxisName' : {
                        'type' : 'string',
                        'placeholder' : 'Yaxis',
                        'title' : 'Yaxis',
                        'widget': {
                            'id': 'string'
                        }
                    },
                    'xaxisName' : {
                        'type' : 'string',
                        'placeholder' : 'Xaxis',
                        'title' : 'Xaxis',
                        'widget': {
                            'id': 'string'
                        }
                    }
                },
                'fieldsets': [
                    {
                        'title': 'Axis Names',
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
                'widget': {
                    'id': 'string'
                }
            },
            'results' : {
                'type' : 'object',
                'widget' : { 'id' : 'csui-property-object' },
                'properties' : {
                    'resultsLimit' : {
                        'type' : 'number',
                        'title' : 'Results Limit',
                        'default' : 30,
                        'widget' : {
                            'id' : 'number'
                        }
                    },
                    'orderByAxis' : {
                        'type' : 'string',
                        'title' : 'Order By',
                        'widget' : {
                            'id' : 'csui-select'
                        },
                        'oneOf': [
                            {
                            'description': 'X Axis',
                            'value' : 'xaxis',
                            'enum': [
                                'xaxis'
                                ]
                            },
                            {
                            'description': 'Y Axis',
                            'value' : 'yaxis',
                            'enum': [
                                'yaxis'
                                ]
                            }
                        ]
                    }
                },
                'fieldsets': [
                    {
                        'title': 'Results',
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
                'title': 'Profile Mapping',
                'description' : 'Shows what type of data interests the user most',
                'fields': [
                    'profile'
                ]
            },
            {
                'title': 'Chart Properties',
                'fields': [
                    'library',
                    'title',
                    'axisNames',
                    'results'
                ]
            }
          ]
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
                    'widget' : { 'id' : 'csui-property-object' },
                    'properties' : {
                        'yaxisData' : {
                            'type' : 'object',
                            'widget' : { 'id' : 'csui-property-object' },
                            'properties' : {
                                'entity' : {
                                    'type' : 'string',
                                    'placeholder' : 'Select Entity',
                                    'title' : 'Entity',
                                    'widget': { 'id': 'csui-entity-select'},
                                },
                                'yaxisAggregate' : {
                                    'type' : 'string',
                                    'placeholder' : 'Select Aggregate',
                                    'widget': { 'id': 'csui-aggregate-select'},
                                },
                                'yaxisEntityField' : {
                                    'type' : 'string',
                                    'placeholder' : 'Select Entity Field',
                                    'title' : 'Entity Field',
                                    'widget': { 'id': 'csui-entity-field-select'},
                                    'visibleIf': {
                                        'yaxisAggregate': ['count', 'min', 'max', 'avg', 'null']
                                      }
                                }
                            },
                            'fieldsets': [
                                {
                                    'title' : 'Y Axis',
                                    'fields': [
                                        'entity',
                                        'yaxisAggregate',
                                        'yaxisEntityField'
                                    ]
                                }
                            ]
                        },
                        'xaxisData' : {
                            'type': 'array',
                            'title': 'X axis',
                            'itemName': 'Group By',
                            'widget' : { 'id' : 'csui-array' },
                            'items': {
                                'type' : 'object',
                                'widget' : { 'id' : 'csui-property-object' },
                                'properties' : {
                                    'xaxisEntityField' : {
                                        'type' : 'string',
                                        'placeholder' : 'Select Entity Field',
                                        'title' : 'Entity Field',
                                        'widget': { 'id': 'csui-entity-field-select'},
                                    }
                                },
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
                            'widget' : { 'id' : 'csui-array' },
                            'items': {
                                'type' : 'object',
                                'widget': { 'id': 'csui-filter-property-object'},
                                'properties' : {
                                    'field': {
                                        'type' : 'string',
                                        'placeholder' : 'Select Entity Field',
                                        'widget': { 'id': 'csui-entity-field-select'},
                                    },
                                    'type': {
                                        'type' : 'string',
                                        'placeholder' : 'Select Operator',
                                        'widget': { 'id': 'csui-operator-select'}
                                    },
                                    'values': {
                                        'type': 'array',
                                        'widget' : { 'id' : 'csui-filter-field-array' },
                                        'items': {
                                            'type' : 'string',
                                            'placeholder' : 'Value',
                                            'widget': {'id': 'csui-filter-field'},
                                        }
                                    }
                                },
                                'dependencies': {
                                    'type': { 'required': ['field'] }
                                },
                                'fieldsets': [
                                    {
                                        'fields': [
                                            'field',
                                            'type',
                                            'values'
                                        ]
                                    }
                                ]
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
                    ]
                },
                'chartProperties' : {
                    'type' : 'object',
                    'title' : 'Chart Properties',
                    'description' : 'Customize the way data appear on your chart',
                    'widget' : { 'id' : 'csui-property-object' },
                    'properties' : {
                        'dataseriesColor' : {
                            'type' : 'string',
                            'pattern': '^#[0-9a-fA-F]{6}$',
                            'title' : 'Dataseries Color',
                            'widget': {
                                'id': 'color'
                            }
                        },
                        'dataseriesName' : {
                            'type' : 'string',
                            'placeholder' : 'Dataseries',
                            'default' : 'Data',
                            'title' : 'Dataseries Name',
                            'widget': {
                                'id': 'string'
                            }
                        },
                        'chartType' : {
                            'type' : 'string',
                            'placeholder' : 'Select Chart Type',
                            'title' : 'Chart Type',
                            'widget': {
                                'id': 'csui-chart-type-select'
                            },
                        }
                    },
                    'fieldsets': [
                        {
                            'fields': [
                                'dataseriesName',
                                'chartType',
                                'dataseriesColor'
                            ]
                        }
                    ]
                }
            },
            'fieldsets': [
                {
                    'fields': [
                        'data',
                        'chartProperties'
                    ]
                }
            ]
        }
    };

    private _SCGAFormSchema = {
        'type' : 'object',
        'widget' : { 'id' : 'csui-head-menu' },
        'properties' : {
            'generalChartProperties' : this._propertiesFormSchema ,
            'dataseries' : this._dataseriesFormSchema
        },
        'fieldsets': [
            {
                'title': 'Properties',
                'fields': ['generalChartProperties']
            },
            {
                'title': 'Dataseries',
                'fields': ['dataseries']
            }
        ]
    };

    get formSchema() { return this._SCGAFormSchema; }
    get propertiesFormSchema() { return this._propertiesFormSchema; }
    get dataseriesFormSchema() { return this._dataseriesFormSchema; }
}
