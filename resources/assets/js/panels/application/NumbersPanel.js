/**
 * NumbersPanel.js
 * - handler for the numbers panel
 * @since March 26, 2019
 * @author
 * - Aron Joshua Bagtas <aaron@qstrike.com>
 *
 * Requirements:
 * - jQuery
 * - Mustache
 *
 * Usage:
 *  handle the setup of numbers panel
 */

function NumbersPanel(element) {
    this.panel = document.getElementById(element);

    this.locations = [];
    this.fontAccents = [];
    this.fontColors = [];

    this.setLocations();
}

NumbersPanel.prototype = {
    constructor: NumbersPanel,

    getPanel: function() {
        var rendered = Mustache.render(this.panel.innerHTML);
        return rendered;
    },

    setLocations: function() {
        var applications = ub.current_material.settings.applications;
        var temp_app;

        temp_app = _.find(applications, {application_type: NumbersPanel.LOCATION_FRONT.type});
        this.locations.push({
            text: NumbersPanel.LOCATION_FRONT.text,
            enabled: temp_app !== undefined,
            code: temp_app !== undefined ? temp_app.code : "",
            perspective: NumbersPanel.LOCATION_FRONT.perspective,
            part: NumbersPanel.LOCATION_FRONT.part
        });

        temp_app = _.find(applications, {application_type: NumbersPanel.LOCATION_BACK.type});
        this.locations.push({
            text: NumbersPanel.LOCATION_BACK.text,
            enabled: temp_app !== undefined,
            code: temp_app !== undefined ? temp_app.code : "",
            perspective: NumbersPanel.LOCATION_BACK.perspective,
            part: NumbersPanel.LOCATION_BACK.part
        });

        temp_app = _.find(applications, {application_type: NumbersPanel.LOCATION_LEFT_SLEEVE.type, layer: NumbersPanel.LOCATION_LEFT_SLEEVE.layer});
        this.locations.push({
            text: NumbersPanel.LOCATION_LEFT_SLEEVE.text,
            enabled: temp_app !== undefined,
            code: temp_app !== undefined ? temp_app.code : "",
            perspective: NumbersPanel.LOCATION_LEFT_SLEEVE.perspective,
            part: NumbersPanel.LOCATION_LEFT_SLEEVE.part
        });

        temp_app = _.find(applications, {application_type: NumbersPanel.LOCATION_RIGHT_SLEEVE.type, layer: NumbersPanel.LOCATION_RIGHT_SLEEVE.layer});
        this.locations.push({
            text: NumbersPanel.LOCATION_RIGHT_SLEEVE.text,
            enabled: temp_app !== undefined,
            code: temp_app !== undefined ? temp_app.code : "",
            perspective: NumbersPanel.LOCATION_RIGHT_SLEEVE.perspective,
            part: NumbersPanel.LOCATION_RIGHT_SLEEVE.part
        });
    },

    setFontAccents: function(app_code) {
        var application = _.find(ub.current_material.settings.applications, {code: app_code});

        if (application !== undefined) {
            this.fontAccents = _.map(ub.data.accents.items, function(i) {
                return {
                    app_code: application.code,
                    accent_id: i.id,
                    image: "/images/sidebar/" + i.thumbnail,
                    active: application.accent_obj.id === i.id ? "uk-active" : "",
                    title: i.code.replace(/_/g, " ")
                };
            });

            // set font colors
            this.setFontColors(application);
        } else {
            console.error("Error: Invalid application code");
        }
    },

    setFontColors: function(application) {
        this.fontColors = [];
        var _this = this;

        if (application.application_type === NumbersPanel.MASCOT_TYPE) {
            if (typeof application.mascot !== "undefined") {
                if (application.mascot.id != MASCOT_TYPE_ID) {
                    _.each(application.mascot.layers_properties, function(layer) {
                        var hex_code = layer.default_color;
                        var color = ub.funcs.getColorByColorCode(hex_code);

                        if (typeof color !== "undefined") {
                            // _this.fontColors.push(color);
                        } else {
                            util.error('Hex Code: ' + hexCode + ' not found!');
                        }
                    });
                }
            }
        } else {
            var teamColors = _.sortBy(ub.data.secondaryColorPalette, "order");

            var layers = _.filter(application.accent_obj.layers, function(layer) {
                return !_.contains(NumbersPanel.LAYERS_TO_BE_IGNORE, layer.name);
            });

            var hex_code;
            var color;
            var layer_exist;

            _.each(layers, function(layer) {
                _.each(teamColors, function(team_color) {
                    color = application.color_array[layer.layer_no - 1];

                    if (typeof color === "undefined") {
                        hex_code = layer.default_color;
                        color = ub.funcs.getColorObjByHexCode(hex_code);
                    }

                    searched_layer = _.find(_this.fontColors, {layer_name: layer.name});

                    if (searched_layer === undefined) {
                        _this.fontColors.push({
                            app_code: application.code,
                            layer_name: layer.name,
                            layer_number: layer.layer_no,
                            colors: [{
                                hex_code: team_color.hex_code,
                                color_code: team_color.color_code,
                                active: color.color_code === team_color.color_code
                            }],
                        });
                    } else {
                        searched_layer.colors.push({
                            hex_code: team_color.hex_code,
                            color_code: team_color.color_code,
                            active: color.color_code === team_color.color_code
                        });
                    }
                });
            });
        }
    },

    getLocations: function() {
        return this.locations;
    },

    getFontAccents: function() {
        return this.fontAccents;
    },

    getFontColors: function() {
        return this.fontColors;
    }
};

NumbersPanel.MASCOT_TYPE = "mascot";
NumbersPanel.LOGO_TYPE = "logo";
NumbersPanel.MASCOT_TYPE_ID = 1039;

NumbersPanel.LAYERS_TO_BE_IGNORE = ["Mask", "Pseudo Shadow"];

NumbersPanel.LOCATION_FRONT = {
    text: "Front",
    type: "front_number",
    perspective: "front",
    part: "Front Body"
};
NumbersPanel.LOCATION_BACK = {
    text: "Back",
    type: "back_number",
    perspective: "back",
    part: "Back Body"
};
NumbersPanel.LOCATION_LEFT_SLEEVE = {
    text: "LSleeve",
    type: "sleeve_number",
    layer: "Left Sleeve",
    perspective: "left",
    part: "Sleeve"
};
NumbersPanel.LOCATION_RIGHT_SLEEVE = {
    text: "RSleeve",
    type: "sleeve_number",
    layer: "Right Sleeve",
    perspective: "right",
    part: "Sleeve"
};

NumbersPanel.SAMPLE_NUMBER = "85";

NumbersPanel.APPLICATION_TYPE = "player_number";

NumbersPanel.PREVIOUS_FONT = "previous";
NumbersPanel.NEXT_FONT = "next";

NumbersPanel.numbersPanel = null;

NumbersPanel.events = {
    is_init: false,

    init: function(numbersPanel) {
        if (!NumbersPanel.events.is_init) {
            NumbersPanel.numbersPanel = numbersPanel;

            $('#primary_options_container').on("keyup focusout", "#richardson-numbers-input-number", NumbersPanel.events.onNumberChanging);
            $("#primary_options_container").on("click", "#richardson-numbers-locations .location-buttons button:not(.btn-enabled)", NumbersPanel.events.onAddLocation);
            $("#primary_options_container").on("click", "#richardson-numbers-locations .location-buttons .remove-location", NumbersPanel.events.onRemoveLocation);
            $("#primary_options_container").on("click", "#richardson-numbers-locations .location-buttons button.btn-enabled", NumbersPanel.events.onChangeLocation);
            $("#primary_options_container").on("click", "#richardson-numbers-font-bar a[data-direction="+NumbersPanel.PREVIOUS_FONT+"]", NumbersPanel.events.onPreviousFont);
            $("#primary_options_container").on("click", "#richardson-numbers-font-bar a[data-direction="+NumbersPanel.NEXT_FONT+"]", NumbersPanel.events.onNextFont);
            $("#primary_options_container").on("click", "#richardson-numbers-font-bar .open-fonts-modal", NumbersPanel.events.onOpenFontsModal);
            $("#primary_options_container").on("click", "#richardson-numbers-font-accents .change-font-accent", NumbersPanel.events.onChangeFontAccent);
            $("#primary_options_container").on("click", "#richardson-numbers-font-colors .font-colors .change-font-color", NumbersPanel.events.onChangeFontColor);

            NumbersPanel.events.is_init = true;
        }

        // active the first location
        var activateFirstLocationTime = setInterval(function() {
            if ($('#richardson-numbers-loading').hasClass("hide")) {
                $('#richardson-numbers-loading').removeClass("hide");
            }

            $('#richardson-numbers-locations .location-buttons button.btn-enabled:first').click();
            $('#richardson-numbers-locations .location-buttons button.btn-enabled:first').prop('disabled', true);

            if ($('#richardson-numbers-font-bar').html().trim() !== "") {
                $('#richardson-numbers-loading').addClass("hide");
                clearInterval(activateFirstLocationTime);
            }
        }, 300);
    },

    onNumberChanging: function(e) {
        var ENTER = 13;
        var number = parseInt($(this).val());

        switch(e.type) {
            case "keyup":
                if (number >= 0 && number <= 99) {
                    if (e.keyCode === ENTER) {
                        NumbersPanel.changeNumber(number);
                    }
                } else {
                    var location_el = $('#richardson-numbers-locations .location-buttons button.uk-active');

                    if (location_el.length !== 0) {
                        var app_code = location_el.data("app-code").toString();
                        var application = _.find(ub.current_material.settings.applications, {code: app_code});

                        $(this).val(application.text);
                    }
                }

                break;

            case "focusout":
                NumbersPanel.changeNumber(number);
                break;
        }
    },

    onAddLocation: function() {
        var _this = this;

        // disable location buttons
        $('.richardson-numbers-container .location-buttons button').prop("disabled", true);
        $('.richardson-numbers-container .location-buttons button').removeClass("uk-active");

        var removeBtnEl = $(this).next();
        removeBtnEl.removeClass("invisible");

        var perspective = $(this).data("perspective");
        var part = $(this).data("part");
        var type = NumbersPanel.APPLICATION_TYPE;
        var side;
        var logo_type = type;

        if (_.contains([NumbersPanel.LOCATION_LEFT_SLEEVE.perspective, NumbersPanel.LOCATION_RIGHT_SLEEVE.perspective], perspective)) {
            side = perspective;
        }

        var number_el = $('#richardson-numbers-input-number');
        var number_val = number_el.val();

        ub.funcs.newApplication(perspective, part, type, side, logo_type, function() {
            var new_code = _.last(Object.keys(ub.current_material.settings.applications));
            var application = _.find(ub.current_material.settings.applications, {code: new_code.toString()});
            removeBtnEl.data('app-code', new_code);

            $(_this).data('app-code', new_code);
            $(_this).addClass("btn-enabled");

            $(_this).prop('disabled', false);
            $(_this).click();

            application.text = !_.isEmpty(number_val) ? number_val.toString() : NumbersPanel.SAMPLE_NUMBER;
            number_el.val(application.text);

            ub.funcs.changeFontFromPopup(application.font_obj.id, application);

            NumbersPanel.showHideRemoveButton();
        });
    },

    onRemoveLocation: function() {
        var _this = this;

        UIkit.modal.confirm("Are you sure you want to remove this location?").then(function() {
            var app_code = $(_this).data("app-code").toString();
            var application = _.find(ub.current_material.settings.applications, {code: app_code});

            if (application !== undefined) {
                $(_this).addClass("invisible");
                $(_this).prev().removeClass("uk-active btn-enabled");

                ub.funcs.deleteLocation(application.code, NumbersPanel.showHideRemoveButton);
            } else {
                console.error("Error: Application code " + app_code + " is invalid.");
            }
        });
    },

    onChangeLocation: function() {
        var _this = this;

        // disable location buttons
        $('.richardson-numbers-container .location-buttons button').prop("disabled", true);
        $('.richardson-numbers-container .location-buttons button').removeClass("uk-active");

        var app_code = $(this).data("app-code").toString();
        var perspective = $(this).data("perspective");
        var application = _.find(ub.current_material.settings.applications, {code: app_code});

        if (application !== undefined) {
            $('#richardson-numbers-input-number').val(application.text);
        }

        var perspectiveController = new PerspectiveController();
        perspectiveController.setPerspective(perspective);

        NumbersPanel.numbersPanel.setFontAccents(app_code);
        NumbersPanel.renderFontsBar(app_code, function() { // render fonts bar
            NumbersPanel.renderFontAccents(function() { // render font accents
                NumbersPanel.renderFontColors(function() { // render font colors
                    // enable location buttons
                    $('.richardson-numbers-container .location-buttons button').prop("disabled", false);
                    $(_this).prop("disabled", true).addClass("uk-active");

                    $('#richardson-numbers-font-bar').fadeIn();
                    $('#richardson-numbers-font-accents').fadeIn();
                    $('#richardson-numbers-font-colors').fadeIn();
                });
            });
        });
    },

    onPreviousFont: function() {
        var app_code = $(this).data("app-code").toString();
        NumbersPanel.changeFontStyle(app_code, NumbersPanel.PREVIOUS_FONT);
    },

    onNextFont: function() {
        var app_code = $(this).data("app-code").toString();
        NumbersPanel.changeFontStyle(app_code, NumbersPanel.NEXT_FONT);
    },

    onOpenFontsModal: function() {
        var app_code = $(this).data('app-code').toString();
        var application = _.find(ub.current_material.settings.applications, {code: app_code});

        if (typeof application !== "undefined") {
            var sample_text = $('#richardson-numbers-input-number').val();

            if (_.isEmpty(sample_text)) {
                sample_text = "Sample Text";
            }

            NumbersPanel.createFontPopup(sample_text, application);
        } else {
            console.log("Error: Application code " + app_code + " is invalid code.");
        }
    },

    onChangeFontAccent: function() {
        $('#richardson-numbers-font-accents .change-font-accent').removeClass("uk-active");
        $(this).addClass("uk-active");

        var app_code = $(this).data("app-code").toString();
        var accent_id = $(this).data("accent-id");

        var application = _.find(ub.current_material.settings.applications, {code: app_code});

        ub.funcs.changeAccentFromPopup(accent_id, application);

        if (ub.data.matchingIDs !== undefined) {
            var matchingID = ub.data.matchingIDs.getMatchingID(app_code);

            if (matchingID !== undefined) {
                var matchingApp = _.find(ub.current_material.settings.applications, {code: matchingID});
                ub.funcs.changeAccentFromPopup(accent_id, application);
            }
        }

        // update font colors
        NumbersPanel.numbersPanel.setFontColors(application);

        $('#richardson-numbers-font-colors').hide();
        NumbersPanel.renderFontColors(function() {
            $('#richardson-numbers-font-colors').fadeIn();
        });
    },

    onChangeFontColor: function() {
        $('#richardson-numbers-font-colors .font-colors .change-font-color span').remove();
        $(this).append($('#richardson-numbers-font-colors-active-state-tmpl').html());

        var app_code = $(this).data("app-code").toString();
        var application = _.find(ub.current_material.settings.applications, {code: app_code});

        if (application !== undefined) {
            var layer_name = $(this).data("layer-name");
            var layer = _.find(application.accent_obj.layers, {name: layer_name});

            if (layer !== undefined) {
                var layer_number = $(this).data("layer-number");
                var color_code = $(this).data("color-code");

                var colorObj = ub.funcs.getColorByColorCode(color_code);

                layer.default_color = colorObj.hex_code;
                application.color_array[layer_number - 1] = colorObj;

                ub.funcs.changeFontFromPopup(application.font_obj.id, application);

                if (ub.data.matchingIDs !== undefined) {
                    var matchingID = ub.data.matchingIDs.getMatchingID(app_code);

                    if (matchingID !== undefined) {
                        var matchingApp = _.find(ub.current_material.settings.applications, {code: matchingID.toString()});
                        var matchingLayer = _.find(matchingApp.accent_obj.layers, {name: layer_name});

                        matchingLayer.default_color = colorObj.hex_code;
                        matchingApp.color_array[layer_number - 1] = colorObj;
                    }
                }
            } else {
                console.error("Error: Layer name " + layer_name + " is invalid.");
            }
        } else {
            console.error("Error: Application code " + app_code + " is invalid.");
        }
    }
};

NumbersPanel.renderLocations = function() {
    var locations = NumbersPanel.numbersPanel.getLocations();

    var items = {
        locationsFlag: locations.length > 0,
        locations: locations
    };

    var tmpl = Mustache.render($('#richardson-numbers-locations-tmpl').html(), items);
    $('#richardson-numbers-locations').html(tmpl);
};

NumbersPanel.renderFontsBar = function(app_code, callback) {
    $('#richardson-numbers-font-bar').hide();
    $('#richardson-numbers-font-accents').hide();
    $('#richardson-numbers-font-colors').hide();

    var application = _.find(ub.current_material.settings.applications, {code: app_code});

    if (application !== undefined) {
        var items = {
            previous_font: NumbersPanel.PREVIOUS_FONT,
            next_font: NumbersPanel.NEXT_FONT,
            app_code: app_code,
            font_family: application.font_obj.name,
            font_text: application.font_obj.caption
        };

        var tmpl = Mustache.render($('#richardson-numbers-font-bar-tmpl').html(), items);
        $('#richardson-numbers-font-bar').html(tmpl);

        _.delay(callback, 100);
    } else {
        console.error("Error: Application Code " + app_code + " is invalid.");
    }
};

NumbersPanel.renderFontAccents = function(callback) {
    var fontAccents = NumbersPanel.numbersPanel.getFontAccents();

    var items = {
        fontAccentsFlag: fontAccents.length > 0,
        fontAccents: fontAccents
    };

    var fontAccentsTmpl = Mustache.render($('#richardson-numbers-font-accents-tmpl').html(), items);
    $('#richardson-numbers-font-accents').html(fontAccentsTmpl);

    _.delay(callback, 100);
};

NumbersPanel.renderFontColors = function(callback) {
    var fontColors = NumbersPanel.numbersPanel.getFontColors();

    var items = {
        fontColorsFlag: fontColors.length > 0,
        fontColors: fontColors,
        has_multiple_colors: fontColors.length > 1,
    };

    var fontColorsTmpl = Mustache.render($('#richardson-numbers-font-colors-tmpl').html(), items);
    $('#richardson-numbers-font-colors').html(fontColorsTmpl);

    _.delay(callback, 100);
};

NumbersPanel.changeFontStyle = function(app_code, direction, font_id) {
    var application = _.find(ub.current_material.settings.applications, {code: app_code});

    if (application !== undefined) {
        var newFont;

        if (direction !== false) {
            newFont = ub.funcs.getFontObj(direction, application.font_obj);
        } else {
            newFont = _.find(ub.data.fonts, {id: font_id.toFixed()});
        }

        if (typeof newFont !== 'undefined') {
            font_id = newFont.id;

            ub.funcs.changeFontFromPopup(font_id, application);
            var font_style_el = $("#richardson-numbers-font-bar .open-fonts-modal");

            $("span", font_style_el).text(newFont.caption);
            $("span", font_style_el).css('font-family', newFont.name);
        } else {
            // No Font!
            return;
        }

        if (application.type === NumbersPanel.LOCATION_FRONT.type || application.type === NumbersPanel.LOCATION_BACK.type) {
            _.each(ub.current_material.settings.applications, function (application) {
                if (application.type !== application.application_type && application.type !== NumbersPanel.LOGO_TYPE && application.type !== NumbersPanel.MASCOT_TYPE) {
                    if (application.type.indexOf('number') !== -1 && application.type.indexOf('number') !== -1) {
                        ub.funcs.changeFontFromPopup(font_id, application);
                    }
                }
            });
        }

        var matchingID = ub.data.matchingIDs.getMatchingID(app_code.toString());

        if (typeof matchingID !== "undefined") {
            var matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: matchingID.toString()});
            ub.funcs.changeFontFromPopup(font_id, matchingSettingsObject);
        }
    } else {
        console.error("Error: Application code " + app_code + " is invalid.");
    }
};

NumbersPanel.createFontPopup = function(sampleText, settingsObj) {
    var applicationType = settingsObj.application_type;
    ub.status.fontPopupVisible = true;

    var sampleSize = '1.9em';
    var paddingTop = '40px';

    if (applicationType === NumbersPanel.LOCATION_FRONT.type || applicationType === NumbersPanel.LOCATION_BACK.type) {
        sampleSize = '3.3em';
        paddingTop = '30px';
    }

    var data = {
        label: 'Choose Font: ',
        fonts: ub.data.fonts,
        sampleText: sampleText,
        applicationType: applicationType,
        sampleSize: sampleSize,
        paddingTop: paddingTop,
    };

    var template = $('#m-font-popup').html();
    var markup = Mustache.render(template, data);

    $('body').append(markup);

    $popup = $('div#primaryFontPopup');
    $popup.fadeIn();

    ub.funcs.centerPatternPopup();

    $('div.fontPopupResults > div.item').hover(
        function () {
            $(this).find('div.name').addClass('pullUp');
        }, function () {
            $(this).find('div.name').removeClass('pullUp');
        }
    );

    $('div.fontPopupResults > div.item').on('click', function () {
        var font_id = $(this).data('font-id');

        NumbersPanel.changeFontStyle(settingsObj.code, false, font_id);
    });

    ub.funcs.centerFontPopup();

    $('div.close-popup').on('click', function () {
        $popup.remove();
        ub.status.fontPopupVisible = false;
    });

    $popup.bind('clickoutside', function () {
        var _status = $(this).data('status');

        if (_status === 'hidden') {
            $(this).data('status', 'visible');
            return;
        }

        $(this).data('status', 'hidden');
        $(this).hide();
        $(this).remove();
        ub.status.fontPopupVisible = false;
    });
};

NumbersPanel.showHideRemoveButton = function() {
    var enabledBtnEl = $('#richardson-numbers-locations .location-buttons button.btn-enabled');

    $(enabledBtnEl).first().click();
    $(enabledBtnEl).first().prop('disabled', true);

    // hide remove button if number of enabled is only 1
    if (enabledBtnEl.length === 1) {
        var removeBtnEl = enabledBtnEl.next();
        removeBtnEl.addClass("invisible");
    }

    // show remove button if number of enabled is above 1
    if (enabledBtnEl.length > 1) {
        $(enabledBtnEl).each(function(index, el) {
            if ($(el).next().hasClass("invisible")) {
                $(el).next().removeClass("invisible");
            }
        });
    }
};

NumbersPanel.changeNumber = function(number) {
    var filteredApps = _.filter(ub.current_material.settings.applications, function(app) {
        if (app.application_type === NumbersPanel.LOCATION_LEFT_SLEEVE.type) {
            return _.contains([NumbersPanel.LOCATION_LEFT_SLEEVE.layer, NumbersPanel.LOCATION_RIGHT_SLEEVE.layer], app.application.layer);
        }

        return _.contains([NumbersPanel.LOCATION_FRONT.type, NumbersPanel.LOCATION_BACK.type], app.application_type);
    });

    _.each(filteredApps, function(app) {
        if (app.text !== number.toString()) {
            app.text = number.toString();
            ub.funcs.changeFontFromPopup(app.font_obj.id, app);
        }
    });
};