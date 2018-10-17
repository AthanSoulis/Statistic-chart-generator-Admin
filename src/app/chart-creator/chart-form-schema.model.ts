import { FormProperty, PropertyGroup } from 'ngx-schema-form/lib/model/formproperty';
import { ObjectProperty } from 'ngx-schema-form/lib/model/objectproperty';

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
                'requiredField' : true,
                'minLength' : 1,
                'widget': {
                    'id': 'csui-profile-picker'
                }
            },
            'library' : {
                'type' : 'string',
                'placeholder' : 'Select Library',
                'title' : 'Library',
                'requiredField' : true,
                'minLength' : 1,
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
          ],
          'required': [ 'library', 'profile' ]
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
                                    'fields': [
                                        'entity',
                                        'yaxisAggregate',
                                        'yaxisEntityField'
                                    ]
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
                                'required': ['type', 'values']
                            },
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
                            'requiredField' : true,
                            'minLength': 1,
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
                    ],
                    'required': ['chartType']
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
        '$schema': 'http://json-schema.org/draft-04/hyper-schema#',
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
        ],
        'required': ['generalChartProperties', 'dataseries']
    };

    get formSchema() { return this._SCGAFormSchema; }
    get propertiesFormSchema() { return this._propertiesFormSchema; }
    get dataseriesFormSchema() { return this._dataseriesFormSchema; }

      // Declare a mapping between action ids and their implementations
  get myValidators() {
      return {

    '/generalChartProperties/axisNames/yaxisName': (value, property: FormProperty, form: PropertyGroup) => {
        // console.log(property);
        // console.log(form);
        // console.log('Value: ' + value);

        return null;
    }

    }; }
}
