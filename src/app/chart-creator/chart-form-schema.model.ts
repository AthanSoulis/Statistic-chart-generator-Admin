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
                    'id': 'string'
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
            // 'type' : {}, !!This should be on chart properties
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
        'widget' : { 'id' : 'csui-array' },
        'items': {
            'type' : 'object',
            'description' : 'Describe the data you want to appear on your chart',
            'widget' : { 'id' : 'csui-general-properties-object' },
            'properties' : {
                'data' : {
                    'type' : 'object',
                    'title' : 'Data Selection',
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
                                    'title' : 'X Axis',
                                    'fields': [
                                        'xaxisEntityField'
                                    ]
                                }
                            ]
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
                                        'widget' : { 'id' : 'array' },
                                        'items': {
                                            'type' : 'string',
                                            'placeholder' : 'Value',
                                            'widget': {
                                                'id': 'string'
                                            }
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
                    'widget' : { 'id' : 'csui-property-object' },
                    'properties' : {
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
                                'chartType'
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
    get propertiesFormSchema() { return this._propertiesFormSchema; }
    get dataseriesFormSchema() { return this._dataseriesFormSchema; }
}
