$(document).ready(function () {

    ub.funcs.getColorObjByPosition = function (teamColorID) {

        var _color = ub.team_colors[parseInt(teamColorID) - 1] // Team Color ID is starts with 1 instead of being zero-based
        var _colorObj = undefined;

        if (typeof _color !== "undefined") {

            _colorObj = ub.funcs.getColorByColorCode(_color);

        }

        return _colorObj;

    }

    ub.funcs.getTeamColorReplacementColor = function (colorCode) {

        var _replacementColor = undefined;
        _replacementColor = _.find(ub.data.teamStoresteamColors, {previousColorCode: colorCode});

        return _replacementColor;

    }

    ub.prepareForTeamStoresApplications = function (applications) {

        _.each(applications, function (application_obj) {
                    
            if (application_obj.type !== "mascot" && application_obj.type !== "logo" && application_obj.type !== "free") {

                var _textApplicationTypes   = ['player_name', 'front_number', 'team_name', 'back_number', 'shoulder_number', 'tv_number', 'sleeve_number', 'numbers_extra'];
                var _isATextApplication     = _.contains(_textApplicationTypes, application_obj.type);

                if (_isATextApplication) {

                    var _colorArrayText = [];
                    var _colorArray = [];

                    _.each(application_obj.colorArrayText, function (e) {
                       
                        var _replacementColor = ub.funcs.getTeamColorReplacementColor(e);

                        if (typeof _replacementColor !== "undefined") {
                            _colorArrayText.push(_replacementColor.newColorCode);
                            _colorArray.push(ub.funcs.getColorByColorCode(_replacementColor.newColorCode));  
                        } else {
                            _colorArrayText.push(e);
                            _colorArray.push(ub.funcs.getColorByColorCode(e));  
                        }
                        
                    });

                    application_obj.colorArrayText = _colorArrayText;
                    application_obj.color_array = _colorArray;

                }

            }

            if (application_obj.type === "mascot"){

                var _colorArrayText = [];
                var _colorArray = [];

                _.each(application_obj.colorArrayText, function (e) {
                   
                    var _replacementColor = ub.funcs.getTeamColorReplacementColor(e);


                    if (typeof _replacementColor !== "undefined") {
                        _colorArrayText.push(_replacementColor.newColorCode);
                        _colorArray.push(ub.funcs.getColorByColorCode(_replacementColor.newColorCode));  
                    } else {
                        _colorArrayText.push(e);
                        _colorArray.push(ub.funcs.getColorByColorCode(e));  
                    }
                    
                });

                application_obj.colorArrayText = _colorArrayText;
                application_obj.color_array = _colorArray;

                var _lpArray = [];
                _.each(application_obj.mascot.layers_properties, function (lp){

                   var _replacementColor = ub.funcs.getTeamColorReplacementColor(lp.default_color);
                   if (typeof _replacementColor !== "undefined") {
                        lp.default_color = _replacementColor.newColorCode;
                        lp.color = parseInt(_replacementColor.newColorObj.hex_code, 16);
                   }
                   
                });

                application_obj.colorArrayText = _colorArrayText;
                application_obj.color_array = _colorArray;

                _.each(application_obj.application.views, function (view){
                    view.application.colors = _colorArrayText;
                });

            }

            if (application_obj.type === "logo"){



            }

            // Pre-load team_name parameter
            if (application_obj.type === 'team_name') {
                application_obj.text = ub.team_name;
            }

            // Pre-load player_name parameter
            if (application_obj.type === 'player_name') {
                application_obj.text = ub.jersey_name;
            }

            // Pre-load player_name parameter
            if (application_obj.type === 'front_number' || application_obj.type === 'back_number' || application_obj.type === 'shoulder_number' || application_obj.type === 'sleeve_number') {
                application_obj.text = ub.jersey_number;
            }

            if (application_obj.type === "mascot") {

                var _mascot = ub.funcs.getMascotByID (ub.mascot_id);

                if (typeof _mascot !== "undefined") {

                    application_obj.mascot = _mascot;

                } else {

                    ub.utilities.info('Mascot [' + ub.mascot_id + '] not found.');

                }

            }

        });

        return applications;

    }

    ub.data.teamStoresteamColors = {};

    ub.prepareForTeamStoresPatterns = function (settings) {

        if (typeof settings === "undefined") { return; }

        if (settings.pattern_id !== "blank" && settings.pattern_id !== "none") {

            _.each(settings.pattern_obj.layers, function (layer) {

                var _replacementColor = ub.funcs.getTeamColorReplacementColor(layer.color_code);

                if (typeof _replacementColor !== "undefined") {
    
                    layer.color_code = _replacementColor.newColorCode;
                    layer.color = parseInt(_replacementColor.newColorObj.hex_code, 16);
    
                }

            });

        }

        return settings;

    }

    ub.prepareForTeamStoresMaterialOptions = function (settings) {

        var uniform_type = ub.current_material.material.type;

        _.each(settings[uniform_type], function (e) {

            // Skips
            if (e.setting_type === 'highlights' || 
                e.setting_type === 'shadows' || 
                e.setting_type === 'static_layer') { return; }

            if (ub.data.skipTeamColorProcessing.shouldSkip(ub.current_material.material.uniform_category, e.code)) { 
                
                if (typeof e.code !== "undefined") {
                    ub.utilities.info(e.code.toTitleCase() + ' layer detected, skipping add to Team Colors...');     
                }
                
                return; 

            }
            // End Skips

            if (typeof e.code !== 'undefined') {

                var _materialOption = _.find(ub.current_material.materials_options, {name: e.code.toTitleCase()});
                var _team_color_id  =  parseInt(_materialOption.team_color_id);

                e.team_color_id     = _team_color_id;

                if (isNaN(e.team_color_id)) { console.log('No Team Color ID Detected for ' + e.code.toTitleCase()); return; }

                var _colorObj = ub.funcs.getColorObjByPosition(e.team_color_id);

                ub.data.teamStoresteamColors[_team_color_id] = {

                    teamColorID: _team_color_id,
                    previousColorCode: e.colorObj.color_code,
                    previousColorObj: e.colorObj,
                    newColorCode: _colorObj.color_code,
                    newColorObj: _colorObj,

                }

                if (typeof _colorObj !== "undefined") {
                    e.colorObj = _colorObj;
                    e.color = parseInt(_colorObj.hex_code, 16);    
                }

            }

            if(typeof e.pattern !== 'undefined'){

                if (typeof e.pattern.pattern_obj !== 'undefined') {

                    if (e.pattern.pattern_obj.name === "Blank") { return; }
         
                }    

            }


        });

        return settings;

    }

});