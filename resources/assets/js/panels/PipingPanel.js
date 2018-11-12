function PipingPanel() {}

/**
 * static properties and functions
 */
PipingPanel = {
    STATUS_ON: "on",
    STATUS_OFF: "off",

    events: {
        is_init_events_called: 0,

        init: function() {
            if (PipingPanel.events.is_init_events_called === 0) {
                $(".modifier_main_container").on("click", "#pipingsUI .piping-sizes-buttons", PipingPanel.events.onPipingSizeButtonClick);
                $(".modifier_main_container").on("click", "#pipingsUI .piping-colors-buttons", PipingPanel.events.onPipingColorButtonClick);
                $(".modifier_main_container").on("click", "#pipingsUI .toggleOption", PipingPanel.events.togglePiping);

                PipingPanel.events.is_init_events_called = 1;
            }
        },

        togglePiping: function() {
            var toggle_el = $(this).closest('.toggle');
            var piping_item_el = $(this).closest('.piping-item');
            var piping_type = piping_item_el.data('piping-type');

            var status = toggle_el.data('status');

            var active_piping_set = ub.current_material.settings.pipings[piping_type];
            var piping_set = piping_type;

            if (active_piping_set === "undefined") {
                active_piping_set = _.first(piping_set);
            } else {
                piping_set = ub.funcs.getPipingSet(piping_type);
                active_piping_set = _.first(piping_set);
            }

            if (status === PipingPanel.STATUS_ON) {
                $('.valueContainer', toggle_el).css('margin-left', '-100px');
                toggle_el.removeClass('defaultShadow');

                ub.funcs.removePiping(piping_type);
                if (piping_type.indexOf('Left') === 0) {
                    var matching_side = ub.funcs.getMatchingSide(piping_type);
                    ub.funcs.removePiping(matching_side);
                }

                $('.content-wrapper', piping_item_el).slideUp("fast");
                toggle_el.data('status', PipingPanel.STATUS_OFF);
            } else {
                $('.valueContainer', toggle_el).css('margin-left', '0');
                toggle_el.addClass('defaultShadow');

                $('span.piping-sizes-buttons[data-type="' + active_piping_set.name + '"]').click();

                $('.content-wrapper', piping_item_el).slideDown("fast");
                toggle_el.data('status', PipingPanel.STATUS_ON);
            }
        },

        onPipingSizeButtonClick: function() {
            var piping_el = $(this).closest('.piping-item');

            var type = $(this).data('type');
            var size = $(this).data('size');
            var piping_type = piping_el.data('piping-type');

            var active_piping_set = PipingPanel.getFirstActivePipingSet(piping_type);

            var pipingObject = _.find(ub.data.pipings, {name: type});
            var colorsMarkup =  ub.funcs.getPipingColorsNew(pipingObject);
            var firstColor = _.first(ub.funcs.getPipingColorArray(pipingObject));

            var pipingSettingsObject = ub.funcs.getPipingSettingsObject(active_piping_set.set);
            var matchingPipingObject = undefined;
            var matchingPipingSettingsObject = undefined;

            var name = pipingObject.name;
            var matchingName = "";

            ub.funcs.changePipingSize(pipingSettingsObject, pipingObject, size);

            console.log("piping_type: ", piping_type);
            console.log("active_piping_set: ", active_piping_set);
            console.log("pipingSettingsObject: ", pipingSettingsObject);

            /// Process Matching Object
            if (name.indexOf('Left') > -1) {
                matchingName = ub.funcs.getMatchingSide(name);
                matchingPipingObject = _.find(ub.data.pipings, {name: matchingName});
            }

            if (name.indexOf('Right') > -1) {
                matchingName = ub.funcs.getMatchingSide(name);
                matchingPipingObject = _.find(ub.data.pipings, {name: matchingName});
            }

            if (typeof matchingPipingObject !== 'undefined') {
                console.log("matchingPipingObject: ", matchingPipingObject);
                matchingPipingSettingsObject = ub.funcs.getPipingSettingsObject(matchingPipingObject.set);
                ub.funcs.changePipingSize(matchingPipingSettingsObject, matchingPipingObject, size);
            }
            /// End Process Matching Object

            $(".colors-row", piping_el).html(colorsMarkup);
            $(".piping-sizes-buttons", piping_el).removeClass("active");
            $(this).addClass("active");

            if (pipingSettingsObject.numberOfColors === 0) {
                $('.piping-colors-buttons[data-type="' + firstColor.name + '"]', piping_el).click();
            } else {
                $('.piping-colors-buttons[data-value="' + pipingSettingsObject.numberOfColors + '"]', piping_el).click();
            }

            // // Force one color when going to 1/2
            if (type === "Neck Piping 1/2") {
                $('.piping-colors-buttons[data-value="1"]', piping_el).click({size_type: type}, PipingPanel.events.onPipingColorButtonClick);
            }
        },

        onPipingColorButtonClick: function(e) {
            var piping_el = $(this).closest('.piping-item');
            var active_size_type = $('.size-row .piping-sizes-buttons.active').data('type');

            var value = $(this).data('value');
            var size = $(this).data('size');

            var piping_type = piping_el.data('piping-type');
            var active_piping_set = PipingPanel.getFirstActivePipingSet(piping_type);

            var pipingObject = _.find(ub.data.pipings, {name: active_size_type});

            var pipingSettingsObject = ub.funcs.getPipingSettingsObject(active_piping_set.set);
            var matchingPipingObject = undefined;
            var matchingPipingSettingsObject = undefined;

            var name = pipingObject.name;

            var colorPickerHtml    = ub.funcs.drawPipingColorPickers(pipingObject, value, pipingSettingsObject);
            var selectedColorArray  = ub.current_material.settings.team_colors;

            /// Process Matching Object
            if (name.indexOf('Left') > -1) {
                matchingName = ub.funcs.getMatchingSide(name);
                matchingPipingObject = _.find(ub.data.pipings, {name: matchingName});
            }

            if (name.indexOf('Right') > -1) {
                matchingName = ub.funcs.getMatchingSide(name);
                matchingPipingObject = _.find(ub.data.pipings, {name: matchingName});
            }

            if (typeof matchingPipingObject !== 'undefined') {
                matchingPipingSettingsObject = ub.funcs.getPipingSettingsObject(matchingPipingObject.set);
                ub.funcs.changePipingSize(matchingPipingSettingsObject, matchingPipingObject, size);
            }
            /// End Process Matching Object

            $('.colorContainer', piping_el).html(colorPickerHtml);

            ub.funcs.setupSmallColorPickerEvents(pipingObject, pipingSettingsObject, matchingPipingObject, matchingPipingSettingsObject);
            ub.funcs.initPipingColors(pipingObject, selectedColorArray[0]);
            ub.funcs.renderPipings(pipingObject, value);

            /// Process Matching Object
            if (typeof matchingPipingObject !== "undefined") {
                matchingPipingSettingsObject.numberOfColors = value;

                ub.funcs.initPipingColors(matchingPipingObject, selectedColorArray[0]);
                ub.funcs.renderPipings(matchingPipingObject, value);
            }
            /// End Process Matching Object

            _.each(pipingSettingsObject.layers, function (layer) {
                if (layer.colorCode !== "") {
                    $('.colorItem[data-layer-no="' + (layer.layer) + '"][data-color-code="' + layer.colorCode + '"]', piping_el).click();
                }
            });

            $(".piping-colors-buttons", piping_el).removeClass("active");
            $(this).addClass("active");
        }
    },

    getFirstActivePipingSet: function(piping_type) {
        var active_piping_set = ub.current_material.settings.pipings[piping_type];
        var piping_set;

        if (active_piping_set !== "undefined") {
            piping_set = ub.funcs.getPipingSet(piping_type);
            active_piping_set = _.first(piping_set);
        }

        return active_piping_set;
    },

    PipingPanelPipingPanel: function(piping_type) {
        var piping_set = ub.current_material.settings.pipings[piping_type];
        var status = (typeof piping_set !== "undefined" && piping_set.enabled === 1) ? PipingPanel.STATUS_ON : PipingPanel.STATUS_OFF;

        return status;
    }
};

PipingPanel.prototype = {
    constructor: PipingPanel,
};