export class FormSchema {
    private _formSchema = {
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
                'title' : 'Axis Names',
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
                    'axisNames'
                ]
            }
          ]
    };

    get formSchema() { return this._formSchema; }
}
