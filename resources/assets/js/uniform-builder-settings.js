/// Settings Object Manager  

$(document).ready( function () {


    /// Settings Object Utilities

        ub.funcs.changeMaterialOptionColor = function (materialOptionName, colorObject) {

            var _viewName = undefined;
            var _codeName = undefined;
            var _sprite   = undefined;

            _.each (ub.views, function (_view){

                _viewName = _view + '_view';
                _codeName = materialOptionName.toCodeCase();
                _sprite   = ub.objects[_viewName][_codeName];

                if (typeof _sprite !== 'undefined') {

                    _sprite.tint = colorObject.colorIntValue;

                }

            });   

        };

        ub.funcs.isValidColorObject = function (colorObject) {

            var _colorObject    = colorObject;

            var _hasColorCode   = _.has(_colorObject.colorCode);
            var _hasColorName   = _.has(_colorObject.colorName);
            var _hasHexValue    = _.has(_colorObject.colorHexValue);
            var _hasIntValue    = _.has(_colorObject.colorIntValue);
            var _inputOk        = _hasColorCode && _hasColorName && _hasHexValue && _hasIntValue;

            if (!_inputOk) {

                var _type   = 'data';
                var _msg    =  undefined;

                if (!_hasColorCode)     { _msg = "colorObject doesn't have a color code property"; }
                if (!_hasColorName)     { _msg = "colorObject doesn't have a color name property"; }
                if (!_hasColorHexValue) { _msg = "colorObject doesn't have a color hex value property"; }
                if (!_hasColorIntValue) { _msg = "colorObject doesn't have a color intvalue property"; }

                util.error(_type, _msg, colorObject);

                return false;

            }
            else {

                return true;

            }

        };

        ub.funcs.materialOptionExists = function (materialOptionName) {

            var _uniformType    = ub.current_material.material.type;
            var _settingsObject = ub.current_material.settings[_uniformType];

            if (_.has(_settingsObject, materialOptionName)) { 

                return true;

            }
            else {

                return false;

            }

        }

        

        ub.funcs.getMaterialOptions = function (materialOptionName) {

            var _materialOptions = _.filter(ub.current_material.materials_options, {name: materialOptionName});
            return _materialOptions;

        };

        ub.funcs.getMaterialOptionSettingsObject = function (materialOptionName) {

            var _uniformType    = ub.current_material.material.type;
            var _settingsObject = ub.current_material.settings[_uniformType];

            if (_.has(_settingsObject, materialOptionName)) {

                return _settingsObject[materialOptionName];

            }
            else {

                return false;

            }

        }

    /// End Settings Object Utilities

    // object properties
    //
    //  materialOption:     'Body',
    //  propertyType:       'color', 'pattern', 
    //  value:              colorObject, patternObject
    //
    //  colorObject:        {colorCode: 'G', colorName: 'Gold', colorHexValue: '#ffba00', 16759296); 
    //  patternObject:      {}
    // 
    //  observer on change
    //  

    ub.funcs.setObjectProperty = function (object) {

        var _input                  = object;

        var _hasMaterialOption      = _.has(_input, 'materialOption');
        var _hasPropertyType        = _.has(_input, 'propertyType');
        var _hasValue               = _.has(_input, 'value');
        var _inputOk                = _hasMaterialOption && _hasPropertyType && _hasValue;

        var _materialOptionExist    =  undefined;

        // Preconditions

        if (!_inputOk) {

            var _type   = 'progg';
            var _msg    = undefined;

            if (!_hasMaterialOption)    { _msg    = 'setObjectProperty called without Material Option Key'; }
            if (!_hasPropertyType)      { _msg    = 'setObjectProperty called without Property Type'; }
            if (!_hasValue)             { _msg    = 'setObjectProperty called without Value'; }

            util.log('progg', 'setObjectProperty called without Value', object);
            return;

        }

        _exist = ub.funcs.materialOptionExists(_input.materialOption);

        if (!_exist) {

            util.log('progg', "Material Option " + _input.materialOption + " doesn't exist");
            return;

        }

        // End Preconditions

        switch (_input.propertyType) {

            case "color":

                var _colorObjectIsValid             = ub.funcs.isValidColorObject(_input.value);
                var _materialOptionSettingsObject   = undefined;
                var _colorObject                    = undefined;
                var _materialOptionName             = _input.materialOption;
                
                if (!_colorObjectIsValid) {

                    console.error('Invalid Color Object');
                    return;

                }

                _colorObject                                    = _input.value;

                _materialOptionSettingsObject                   = ub.funcs.getMaterialOptionSettingsObject('Body');
                _materialOptionSettingsObject.color             = _colorObject.colorIntValue;
                _materialOptionSettingsObject.colorSettings     = _colorObject;

                ub.funcs.changeMaterialOptionColor(_materialOptionName, _colorObject);

                break;

            case 'pattern':

                break;

            default: 

                util.log('progg', 'Invalid Property Type');

        }

    }

});
