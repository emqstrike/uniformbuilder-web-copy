/**
 * MascotPanel.js
 * - handler for the mascot panel
 * @since March 26, 2019
 * @author 
 * - Aron Joshua Bagtas <aaron@qstrike.com>
 *
 * Requirements:
 * - jQuery
 * - Mustache
 *
 * Usage:
 *  Handle the setup of mascot panel
 */


function MascotPanel() {
    
}

MascotPanel.init = function () {
    // clear contents
    $('#mod_primary_panel > .modifier_main_container').empty();

    // get applications and filter
    var _Applications = ub.current_material.settings.applications;
    var _filteredApplications = _.filter(_Applications, function(i) {
        if (i.application_type === 'mascot' || i.application_type === 'embellishments' || i.application_type === 'front_number' || i.application_type === 'back_number' || i.application_type === 'sleeve_number') {
            if (i.logo_type !== "custom_text") {
                return i;
            }
        }
    });

    var result = ub.data.logoLocation.getAvailableLocation(ub.config.type);
    _htmlBuilder = ub.utilities.buildTemplateString('#m-mascot-panel', {locations: result.locations});

    // output to page
    $('.modifier_main_container').append(_htmlBuilder);

    _.map(_filteredApplications, function(index) {
        if (index.application_type === "embellishments" || index.application_type === "mascot") {
            if (index.logo_type === "custom" || index.logo_type === "stock") {
                $("#primary_options_container .logo-location-container .btn-selection-choice[data-perspective='" + index.application.views[0].perspective + "']").addClass("selected");
                $("#primary_options_container .location-add-remove-container[data-perspective='" + index.application.views[0].perspective + "']").html("");
                $("#primary_options_container .location-add-remove-container[data-perspective='" + index.application.views[0].perspective + "']").html('<a href="#" class="removeMascot en-disable-me fc-red fc-italic" data-application-code="'+ index.code +'">(remove)</a>');
            }
        } else {
            if (index.application_type === 'sleeve_number') {
                if (index.application.layer.toLowerCase() === "right sleeve") {
                    $("#primary_options_container .logo-location-container .btn-selection-choice[data-perspective='right']").parent().addClass("uk-hidden");
                }

                if (index.application.layer.toLowerCase() === "left sleeve") {
                    $("#primary_options_container .logo-location-container .btn-selection-choice[data-perspective='left']").parent().addClass("uk-hidden");
                }
            }
        }
    });


    $(".logo-type-container .btn-selection-choice").first().addClass("uk-active");
    
    // initialize and bind events
    ub.funcs.initializer();
    MascotPanel.events.init();
    NewApplicationPanel.events.init();
    ApplicationEvent.events.init();   
}

MascotPanel.events = {
    is_init: true,

    init: function() {
        var _this = this;
        if (MascotPanel.events.is_init) {
            $('#primary_options_container').on('click', '.applicationUIBlockNew .flip-mascot', _this.onFlipMascot);
            $('#primary_options_container').on('click', '.applicationUIBlockNew .view-application', _this.onShowMascot);
            $('#primary_options_container').on('click', '.applicationUIBlockNew .hide-application', _this.onHideMascot);
            $('#primary_options_container').on('click', '.colorItem[data-object-type="mascots"]', _this.onChangeMascotColor);
            $("#primary_options_container").on("click", ".applicationUIBlockNew .open-inksoft-editor", _this.onChangeEmbellishment);

            $("#primary_options_container").on("click", ".logo-details-container .change-stock-mascot", _this.onChangeStockMascot)
            $("#primary_options_container").on("click", ".logo-details-container .edit-stock-mascot", _this.onEditStockMascot)
            $("#primary_options_container").on("click", ".logo-type-container .btn-selection-choice", _this.onSelectLogoType);
            $("#primary_options_container").on("click", ".logo-location-container .btn-selection-choice", _this.onSelectLocation)
            $('#primary_options_container').on('click', '.logo-details-container .flip-mascot', _this.onFlipMascot);
            $('#primary_options_container').on('click', '.location-add-remove-container .removeMascot', _this.onRemoveMascot);
            $('#primary_options_container').on('click', '#mascot-panel .view-all-application', _this.onViewAllDecoration);
            MascotPanel.events.is_init = false;
        }
    },

    onViewAllDecoration: function() {
        ApplicationList.events.init();
    },

    onRemoveMascot: function() {
        var code = $(this).data("application-code");
        var settingsObject = ub.funcs.getApplicationSettings(code);
        
        UIkit.modal.confirm('Are you sure you want to delete Logo #' + settingsObject.code + '?').then(function() {
            ub.funcs.afterRemoveStockLogo(settingsObject);
            ub.funcs.deleteLocation(code);
        }, function () {
            console.log('Rejected.') 
        });
    },

    onChangeStockMascot: function() {
        ub.data.isChangeStockLogo = true;
        var application_id = $(this).data("application-code");
        var designID = $(this).data("application-design-id");
        var logoType = $(this).data("application-logo-type");
        var settingsObject = ub.funcs.getApplicationSettings(application_id);
        ub.data.currentApplication = settingsObject;

        if (settingsObject.logo_type === 'stock') {
            StockMascot.events.init();
        } else if (settingsObject.logo_type === 'custom_text') {
            StockMascot.events.init(ub.data.customTextCategoryID, designID);
        } else {
            InteropIsPanel.funcs.loadDesigner(designID, settingsObject.code, true);
        }
    },

    onEditStockMascot: function() {
        ub.data.isChangeStockLogo = true;
        // Get data
        var application_id = $(this).data("application-code");
        var designID = $(this).data("application-design-id");
        var logoType = $(this).data("application-logo-type");
        // Get Settings object
        var settingsObject = ub.funcs.getApplicationSettings(application_id);
        ub.data.currentApplication = settingsObject;
        // Load design
        InteropIsPanel.funcs.loadDesigner(designID, settingsObject.code, true);
    },

    onSelectLogoType: function() {
        $(".logo-type-container .btn-selection-choice.uk-active").removeClass("uk-active");
        $(this).addClass("uk-active");  
    },

    onSelectLocation: function() {
        var _type = "embellishments";
        var logo_type = $(".logo-type-container .btn-selection-choice.uk-active").data("type");
        var _perspective = $(this).data("perspective");
        var _part = $(this).data("part");
        var _side;
        var location = "";
        var settingsObject = undefined;

        if (_part === "Sleeve") {
            _side = $(this).data("side");
            location = _side + " " + _part;
        } else {
            location = _part;
        }

        $('a.change-view[data-view="'+ _perspective +'"]').trigger('click');
        var custom = _.find(ub.current_material.settings.applications, {location: ub.utilities.titleCase(location), logo_type: "custom"});
        var stock = _.find(ub.current_material.settings.applications, {location: ub.utilities.titleCase(location), logo_type: "stock"});

        if (typeof custom !== "undefined") {
            ub.funcs.renderStockMascot(custom);
        } else if (typeof stock !== "undefined") {
            ub.funcs.renderStockMascot(stock);
        } else  {
            if (typeof custom === "undefined" && typeof stock === "undefined") {
                ub.funcs.newApplication(_perspective, _part, _type, _side, logo_type);
            }
        }

        $(this).addClass("selected");
        $(".logo-location-container .btn-selection-choice.uk-active").removeClass("uk-active");
        $(this).addClass("uk-active");
    },

    onChangeEmbellishment: function() {
        var application_id = $(this).closest(".applicationUIBlockNew").data('application-id');
        var applicationObject = ub.funcs.getApplicationSettings(application_id);

        if (typeof applicationObject !== "undefined") {
            if (applicationObject.application_type === "embellishments") {
                ub.data.currentApplication = applicationObject;
                InteropIsPanel.funcs.loadDesigner(applicationObject.embellishment.design_id, application_id);
            } else {
                ub.data.currentApplication = applicationObject;
                if (ub.user) {
                    InteropIsPanel.funcs.loadExistingDesign(applicationObject);
                } else {
                    InteropIsPanel.funcs.loadDesigner(undefined, application_id);
                }
            }
        }
    },

    onFlipMascot: function() {
        var code = $(this).data("application-code").toString();
        var _settingsObject = _.find(ub.current_material.settings.applications, {code: code});
        ub.funcs.flipMascot(_settingsObject);
        $(this).toggleClass('uk-active');
    },

    onShowMascot: function() {
        $(this).addClass('uk-active');
        $(this).closest('.applicationUIBlockNew').find(".hide-application").removeClass('uk-active');
        $(this).closest('.applicationUIBlockNew').find('.mascot-options-container').show();
        // Disable image
        $(this).closest('.applicationUIBlockNew').find('button.con-img-added-mascot-logo').removeClass('uk-disabled');
        $(this).closest('.applicationUIBlockNew').find('a.flip-mascot').show();
        var application_id = $(this).closest(".applicationUIBlockNew").data('application-id');
        ub.funcs.manipulateApplicationByStatus("on", application_id);
    },

    onHideMascot: function() {
        $(this).addClass('uk-active');
        $(this).closest('.applicationUIBlockNew').find(".view-application").removeClass('uk-active');
        $(this).closest('.applicationUIBlockNew').find('.mascot-options-container').hide();
        $(this).closest('.applicationUIBlockNew').find('button.con-img-added-mascot-logo').addClass('uk-disabled');
        $(this).closest('.applicationUIBlockNew').find('a.flip-mascot').hide();
        var application_id = $(this).closest(".applicationUIBlockNew").data('application-id');
        ub.funcs.manipulateApplicationByStatus("off", application_id);
        ub.funcs.deactivateMoveTool();
    },

    onChangeMascotColor: function() {
        // changing active color
        $(this).parent().parent().find('button').removeClass('activeColorItem').html('');
        $(this).addClass('activeColorItem').html('<span class="fa fa-check fa-1x cp-margin-remove cp-padding-remove cp-check-color-font-size"></span>');

        // proceed
        var dataId = $(this).attr('data-id');
        var _settingsObject = _.find(ub.current_material.settings.applications, {code: dataId});

        var _layer_no = $(this).data('layer-no');
        var _color_code = $(this).data('color-code');
        var _layer_name = $(this).data('layer-name');
        var _temp = $(this).data('temp');
        var _colorObj = ub.funcs.getColorByColorCode(_color_code);


        var _oldVal = {
            layerNo: _layer_no,
            color: _settingsObject.color_array[_layer_no - 1],
            applicationCode: _settingsObject.code,
        };

        if (_temp !== 'undo') {
            ub.funcs.pushOldState('color change', 'application', _settingsObject, _oldVal);
        }

        ub.funcs.changeMascotColor(_colorObj, _layer_no, _settingsObject);
        ub.funcs.changeActiveColorSmallColorPicker(_layer_no, _color_code, _colorObj);

        var _processMatchingSide = true;
        var _matchingID = undefined;
        var _matchingSettingsObject = undefined;

        _matchingID = ub.data.matchingIDs.getMatchingID(dataId);

        if (typeof _matchingID !== "undefined") {
            _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});
        }

        // On Crew Socks, only change the color of the matching side if its the same mascot id
        if (typeof _matchingSettingsObject !== "undefined") {
            if (_matchingSettingsObject.type !== "free" && ub.funcs.isSocks()) {
                _processMatchingSide = false;
            }

            if (typeof _settingsObject.mascot === "object" && typeof _matchingSettingsObject.mascot === "object") {
                if (_settingsObject.mascot.id === _matchingSettingsObject.mascot.id) {
                    _processMatchingSide = true;
                }
            }
        }

        if (typeof _matchingID !== "undefined") {
            if (_processMatchingSide) {
                ub.funcs.changeMascotColor(_colorObj, _layer_no, _matchingSettingsObject);
            }
        }
    }
}