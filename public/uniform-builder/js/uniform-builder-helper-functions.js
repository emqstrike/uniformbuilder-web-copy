$(document).ready(function() {

    ub.funcs.getApplicationSettings = function (id) {

        var _id = parseInt(id);

        return ub.current_material.settings.applications[_id];

    }

    ub.funcs.getApplicationObjectByPerspective = function (applicationID, perspective) {

        var _perpectiveStr = perspective + '_view';
        var _objectStr = 'objects_' + applicationID;

        return ub.objects[_perpectiveStr][_objectStr];

    }

    ub.funcs.getApplicationViewObjects = function (applicationID) {

        var _settingsObject = undefined;
        var _views = undefined;
        var _transformedObjectCollection = undefined;

        _settingsObject = ub.funcs.getApplicationSettings(applicationID);
        
        if (typeof _settingsObject === "undefined") { 
            ub.utilities.warn('Invalid Application ID: ' + applicationID);
            return undefined; 
        }

        _views = _settingsObject.application.views;
        _transformedObjectCollection = _.map(_settingsObject.application.views, function (view) {

            return { 
                perspective: view.perspective,
                isPrimary: view.application.isPrimary,
                perspectiveObject: ub.funcs.getApplicationObjectByPerspective(view.application.id, view.perspective),
                perspectiveSettings: view.application, 
            };

        });

        return _transformedObjectCollection;

    }


});