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
        var application_types = _.pluck(ub.current_material.settings.applications, "application_type");
        var applications = ub.current_material.settings.applications;
        var application;

        if (_.contains(application_types, NumbersPanel.FRONT_TYPE)) {
            this.locations.push({
                location: NumbersPanel.FRONT_LOCATION,
                type: NumbersPanel.FRONT_TYPE
            });

            application = _.find(ub.current_material.settings.applications, {application_type: NumbersPanel.FRONT_TYPE});

            if (application !== undefined) {
                this.locations[this.locations.length - 1].application_code = application.code;
            }
        }

        if (_.contains(application_types, NumbersPanel.BACK_TYPE)) {
            this.locations.push({
                location: NumbersPanel.BACK_LOCATION,
                type: NumbersPanel.BACK_TYPE
            });

            application = _.find(ub.current_material.settings.applications, {application_type: NumbersPanel.BACK_TYPE});

            if (application !== undefined) {
                this.locations[this.locations.length - 1].application_code = application.code;
            }
        }

        if (_.contains(application_types, NumbersPanel.SLEEVE_TYPE)) {
            this.locations.push({
                location: NumbersPanel.SLEEVE_LOCATION,
                type: NumbersPanel.SLEEVE_TYPE
            });

            application = _.find(ub.current_material.settings.applications, {application_type: NumbersPanel.SLEEVE_TYPE});

            if (application !== undefined) {
                this.locations[this.locations.length - 1].application_code = application.code;
            }
        }
    },

    setFontAccents: function(application_type) {
        if (application_type === NumbersPanel.FRONT_TYPE ||
            application_type === NumbersPanel.BACK_TYPE ||
            application_type === NumbersPanel.SLEEVE_TYPE) {

            var application = _.find(ub.current_material.settings.applications, {'application_type': application_type});

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
            console.error("Error: Invalid application type");
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
                            layer_name: layer.name,
                            colors: [{
                                color: team_color,
                                active: color.color_code === team_color.color_code
                            }]
                        });
                    } else {
                        searched_layer.colors.push({
                            color: team_color,
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

NumbersPanel.FRONT_TYPE = "front_number";
NumbersPanel.BACK_TYPE = "back_number";
NumbersPanel.SLEEVE_TYPE = "sleeve_number";
NumbersPanel.MASCOT_TYPE = "mascot";
NumbersPanel.LOGO_TYPE = "logo";
NumbersPanel.MASCOT_TYPE_ID = 1039;

NumbersPanel.FRONT_LOCATION = "Front";
NumbersPanel.BACK_LOCATION = "Back";
NumbersPanel.SLEEVE_LOCATION = "Sleeve";

NumbersPanel.LAYERS_TO_BE_IGNORE = ["Mask", "Pseudo Shadow"];

NumbersPanel.PREVIOUS_FONT = "previous";
NumbersPanel.NEXT_FONT = "next";

NumbersPanel.numbersPanel = null;

NumbersPanel.events = {
    is_init: false,

    init: function(numbersPanel) {
        if (!NumbersPanel.events.is_init) {
            NumbersPanel.numbersPanel = numbersPanel;

            $("#primary_options_container").on("click", "#richardson-numbers-locations .location-buttons button", NumbersPanel.events.onLocationChange);
            $("#primary_options_container").on("click", "#richardson-numbers-font-bar a[data-direction="+NumbersPanel.PREVIOUS_FONT+"]", NumbersPanel.events.onPreviousFont);
            $("#primary_options_container").on("click", "#richardson-numbers-font-bar a[data-direction="+NumbersPanel.NEXT_FONT+"]", NumbersPanel.events.onNextFont);
            $("#primary_options_container").on("click", "#richardson-numbers-font-bar .open-fonts-modal", NumbersPanel.events.onOpenFontsModal);
            $("#primary_options_container").on("click", "#richardson-numbers-font-accents .change-font-accent", NumbersPanel.events.onChangeFontAccent);

            NumbersPanel.events.is_init = true;
        }
    },

    onLocationChange: function() {
        $('.richardson-numbers-container .location-buttons button').prop("disabled", true);

        var type = $(this).data("type");
        var app_code = $(this).data("app-code");

        NumbersPanel.numbersPanel.setFontAccents(type);
        NumbersPanel.renderFontsBar(app_code, function() { // render fonts bar
            NumbersPanel.renderFontAccents(function() { // render font accents
                NumbersPanel.renderFontColors(function() { // render font colors
                    $('.richardson-numbers-container .location-buttons button').prop("disabled", false);

                    $('#richardson-numbers-font-bar').fadeIn();
                    $('#richardson-numbers-font-accents').fadeIn();
                    $('#richardson-numbers-font-colors').fadeIn();
                });
            });
        });
    },

    onPreviousFont: function() {
        var app_code = $(this).data("app-code");
        NumbersPanel.changeFontStyle(app_code, NumbersPanel.PREVIOUS_FONT);
    },

    onNextFont: function() {
        var app_code = $(this).data("app-code");
        NumbersPanel.changeFontStyle(app_code, NumbersPanel.NEXT_FONT);
    },

    onOpenFontsModal: function() {
        var app_code = $(this).data('app-code');
        var application = _.find(ub.current_material.settings.applications, {code: app_code.toString()});

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

        var matchingID = ub.data.matchingIDs.getMatchingID(app_code);

        if (matchingID !== undefined) {
            var matchingApp = _.find(ub.current_material.settings.applications, {code: matchingID});
            ub.funcs.changeAccentFromPopup(accent_id, application);
        }
    }
};

NumbersPanel.renderLocations = function(locations) {
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

    var application = _.find(ub.current_material.settings.applications, {code: app_code.toString()});

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
    var application = _.find(ub.current_material.settings.applications, {code: app_code.toString()});

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

        console.log(newFont);

        $("span", font_style_el).text(newFont.caption);
        $("span", font_style_el).css('font-family', newFont.name);
    } else {
        // No Font!
        return;
    }

    if (application.type === NumbersPanel.FRONT_TYPE || application.type === NumbersPanel.BACK_TYPE) {
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
};

NumbersPanel.createFontPopup = function(sampleText, settingsObj) {
    var applicationType = settingsObj.application_type;
    ub.status.fontPopupVisible = true;

    var sampleSize = '1.9em';
    var paddingTop = '40px';

    if (applicationType === NumbersPanel.FRONT_TYPE || applicationType === NumbersPanel.BACK_TYPE) {
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