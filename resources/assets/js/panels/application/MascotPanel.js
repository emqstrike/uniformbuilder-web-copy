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
        if (i.application_type === 'mascot' || i.application_type === 'embellishments') {
            return i;
        }
    });

    var _appData = [];

    // getting only data that i need
    _.map(_filteredApplications, function (i) {
        if (i.application_type === 'embellishments') {
            var objCustom = {
                thumbnail: i.embellishment.png_filename,
                application_type: i.application_type,
                type: 'CUSTOM LOGO',
                code: i.code,
                perspective: i.application.views[0].perspective,
                name: i.embellishment.name,
                viewArtDetails: ub.config.host + '/utilities/preview-logo-information/' + i.embellishment.design_id,
                viewPrint: i.embellishment.svg_filename,
                slider: true,
                sliderContainer: ub.funcs.sliderContainer(i.code, "Logo"),
                isEmbellishment: true,
                status: (typeof i.status === "undefined" || i.status === "on" ? true : false)
            };
            _appData.push(objCustom);
        } else if (i.application_type === 'mascot') {
            var objStock = {
                thumbnail: i.mascot.icon,
                application_type: i.application_type,
                type: 'STOCK MASCOT',
                code: i.code,
                perspective: i.application.views[0].perspective,
                name: i.mascot.name,
                slider: true,
                sliderContainer: ub.funcs.sliderContainer(i.code, "Logo"),
                colorPicker: true,
                colorsSelection: ub.funcs.colorsSelection(i.code, 'CHOOSE STOCK MASCOT COLORS'),
                isEmbellishment: false,
                status: (typeof i.status === "undefined" || i.status === "on" ? true : false)
            };
            _appData.push(objStock);
        }
    });

    // prepare data
    var props = {
        isTackleTwill: ub.funcs.isTackleTwill() ? 'uk-disabled bgc-light' : '',
        title: "logo",
        type: "mascots",
        applications: _appData
    };

    var locations = ub.data.logoLocation.items;
    _htmlBuilder = ub.utilities.buildTemplateString('#m-mascot-panel', {locations: locations});

    // output to page
    $('.modifier_main_container').append(_htmlBuilder);

    _.map(_appData, function(index) {
        if (index.application_type !== "free") {
            if (index.status) {
                $('.applicationUIBlockNew[data-application-id="'+ index.code +'"] div.hide-show-button-container .view-application').addClass('uk-active');
                $('.applicationUIBlockNew[data-application-id="'+ index.code +'"] div.hide-show-button-container .hide-application').removeClass('uk-active');
                $('.applicationUIBlockNew[data-application-id="'+ index.code +'"]').find('.mascot-options-container').show();
                $('.applicationUIBlockNew[data-application-id="'+ index.code +'"]').find('a.flip-mascot').show();
                $('.applicationUIBlockNew[data-application-id="'+ index.code +'"]').find('button.con-img-added-mascot-logo').removeClass('uk-disabled');
            } else {
                $('.applicationUIBlockNew[data-application-id="'+ index.code +'"]').find("div.hide-show-button-container .hide-application").addClass('uk-active');
                $('.applicationUIBlockNew[data-application-id="'+ index.code +'"]').find("div.hide-show-button-container .view-application").removeClass('uk-active');
                $('.applicationUIBlockNew[data-application-id="'+ index.code +'"]').find('.mascot-options-container').hide();
                $('.applicationUIBlockNew[data-application-id="'+ index.code +'"]').find('a.flip-mascot').hide();
                $('.applicationUIBlockNew[data-application-id="'+ index.code +'"]').find('button.con-img-added-mascot-logo').addClass('uk-disabled');
            }
        }
        
        if (ub.funcs.isFlippedApplication(index.code)) {
            $('.applicationUIBlockNew[data-application-id="'+ index.code +'"] .flip-mascot').addClass("uk-active");
        }
    });

    if (ub.funcs.isTackleTwill()) {
        ub.funcs.getFreeApplicationsContainer('mascots');
    }

    if (_appData.length === 0 || ub.funcs.isTackleTwill()) {
        $(".add-another-application-container").hide();
    }

    $(".logo-type-container .btn-selection-choice").first().addClass("uk-active");
    
    // initialize and bind events
    ub.funcs.setupApplicationSettings(_appData);
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
            $("#primary_options_container").on("click", ".logo-type-container .btn-selection-choice", _this.onSelectLogoType);
            $("#primary_options_container").on("click", ".logo-location-container .btn-selection-choice", _this.onSelectLocation)
            MascotPanel.events.is_init = false;
        }
    },


    onChangeStockMascot: function() {
        var application_id = $(this).data("application-code");

        console.log(application_id)
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
        if (_part === "Sleeve") {
            _side = $(this).data("side");
            location = _side + " " + _part;
        } else {
            location = _part;
        }
        $('a.change-view[data-view="'+ _perspective +'"]').trigger('click');

        console.log(location)
        var _settingsObject = _.find(ub.current_material.settings.applications, {type: _type, location: ub.utilities.titleCase(location)});
        if (typeof _settingsObject !== "undefined") {
            // Load Embellisment Details
            var template = document.getElementById("m-mascot-information").innerHTML;
            var objCustom = {
                thumbnail: _settingsObject.embellishment.png_filename,
                application_type: _settingsObject.application_type,
                logo_type: _settingsObject.logo_type,
                code: _settingsObject.code,
                perspective: _settingsObject.application.views[0].perspective,
                name: _settingsObject.embellishment.name,
                viewArtDetails: ub.config.host + '/utilities/preview-logo-information/' + _settingsObject.embellishment.design_id,
                viewPrint: _settingsObject.embellishment.svg_filename
            };

            var renderTemplate = Mustache.render(template, objCustom);

            $(".modifier_main_container .logo-details-container").html("");
            $(".modifier_main_container .logo-details-container").html(renderTemplate);
        } else {
            if (typeof _type !== "undefined" && typeof _perspective !== "undefined" && typeof _part !== "undefined") {
                ub.funcs.newApplication(_perspective, _part, _type, _side, logo_type);
            }
        }

        $(this).addClass("uk-active")
    },

    onChangeEmbellishment: function() {
        var application_id = $(this).closest(".applicationUIBlockNew").data('application-id');
        var applicationObject = ub.funcs.getApplicationSettings(application_id)

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