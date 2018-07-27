export class FormSchema {
    private _formSchema = {
        'properties': {
            'generalProperties' : {
                'type' : 'object',
                'title' : 'General Properties',
                'properties' : {
                    'profile' : {
                        'type' : 'string',
                        'placeholder' : 'null',
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
                            'id': 'string'
                        },
                    },
                    // 'type' : {}, !!This should be on chart properties
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
                    },
                    'title' : {
                        'type' : 'string',
                        'placeholder' : 'Title',
                        'title' : 'Main Title',
                        'widget': {
                            'id': 'string'
                        }
                    }
                }
            }
        }
    };

    get formSchema() { return this._formSchema; }
}
