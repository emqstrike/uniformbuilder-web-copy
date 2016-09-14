$(document).ready(function () {

    /// Undo 

    ub.funcs.undoHandler = function (e) {
      
      var evtobj = window.event? event : e

      if (evtobj.keyCode == 90 && (evtobj.ctrlKey || evtobj.metaKey)) {
        
           ub.funcs.undo();

      }

    };

    $('span.undo-btn').on('click', function (e) {

        ub.funcs.undo();

    })

    ub.funcs.undo = function () {

        var _size = _.size(ub.data.undoHistory);

        if (_size === 0) { 
            $('span.undo-btn').hide();
            return; 
        }

        var _historyItem = ub.data.undoHistory.pop();

        switch (_historyItem.operationType) {

            case "color change": 

                if (_historyItem.objectType === "material option") {

                    var _partName = _historyItem.settingsObject.code.replace('left_', '').replace('right_', '').toTitleCase();
                    ub.funcs.ui.setMaterialOptionColor(_partName, _historyItem.oldValue, 'from undo');

                    var _index = ub.funcs.getIndexByName(_historyItem.settingsObject.code);
                    ub.funcs.activatePartByIndex(_index);
                    ub.funcs.resetHighlights();

                }

                if (_historyItem.objectType === "application") {

                    var _oldValue = _historyItem.oldValue;
                    ub.funcs.activateApplications(_oldValue.applicationCode);

                    var _colorCode = _oldValue.color.color_code;
                    var _layerNo = _oldValue.layerNo;

                    $('span.colorItem[data-layer-no="' + _layerNo + '"][data-color-code="' + _colorCode + '"]').data('temp','undo').click();

                }

                break;

            case "position, scale, rotation change":

                if (_historyItem.objectType === "application") { 

                    var _oldValue = _historyItem.oldValue;
                    var _settingsObject = ub.funcs.getSettingsObject(_historyItem.settingsObject.code);

                    _.each (_oldValue, function (val) {

                        var application_obj = ub.objects[val.perspective + "_view"]['objects_' + val.applicationCode];

                        view = _.find(_settingsObject.application.views, {perspective: val.perspective });

                        if (typeof view.application.scale === "undefined") {

                            view.application.scale = {x: 1, y: 1};

                        }

                        view.application.scale.x = application_obj.scale.x = val.scale.x;
                        view.application.scale.y = application_obj.scale.y = val.scale.y;
                        
                        view.application.center.x = application_obj.position.x = val.position.x;
                        view.application.center.y = application_obj.position.y = val.position.y;
                        
                        view.application.rotation = application_obj.rotation = val.rotation;  

                    });

                    ub.funcs.activateMoveTool(_historyItem.settingsObject.code);

                }

                break;

            default: 

                console.error('Unhandled operation type: ' + _historyItem.operationType + ' '  +  _historyItem.objectType);

        }

        var _size = _.size(ub.data.undoHistory);

        if (_size === 0) { 
            $('span.undo-btn').hide();
            return; 
        }

    }

    document.onkeydown = ub.funcs.undoHandler;

    ub.funcs.initUndo = function () {

        ub.funcs.pushOldState = function (operationType, objectType, settingsObject, oldValue, newValue) {

        if (ub.current_material.material.uniform_category !== "Football") {            

            $('span.undo-btn').fadeIn();

        }

        // if (ub.current_material.material.uniform_category !== "Football") {

            var _undoData = {

                operationType: operationType,
                objectType: objectType,
                settingsObject: settingsObject,
                oldValue: oldValue, 
                newValue: newValue,

            }

            ub.data.undoHistory.push (_undoData);

        // }
        
        }

    }

    /// End Undo

});