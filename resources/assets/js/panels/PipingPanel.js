function PipingPanel(element) {
    this.panel = document.getElementById(element);
    this.set_items = {};
}

PipingPanel.prototype = {
    constructor: PipingPanel,

    getPanel: function() {
        var rendered = Mustache.render(this.panel.innerHTML, this.set_items);
        return rendered;
    },

    getNoPipingPanel: function() {
        var rendered = Mustache.render(this.panel.innerHTML);
        return rendered;
    },

    setPipingSetItems: function() {
        var piping_types = PipingPanel.getPipingTypes();

        var piping_set_items = _.map(piping_types, function(piping_type) {
            var active_piping_set = PipingPanel.getActivePipingSet(piping_type);
            var piping_set = piping_type;

            if (active_piping_set !== "undefined") {
                piping_set = ub.funcs.getPipingSet(piping_type);
            }

            var sizes = ub.funcs.sortPipingSizes({items: piping_set});
            var colors = ub.funcs.getPipingColorArray(active_piping_set);

            var modifier = piping_type.toLowerCase().replace(/ /g, "-");

            return {
                sizes: sizes.items,
                colors: colors,
                type: piping_type,
                type_wo_left_prefix: piping_type.indexOf('Left') === 0 ? piping_type.replace("Left", "") : piping_type,
                modifier: modifier,
                enabled: active_piping_set.enabled
            };
        });

        console.log(piping_set_items);

        this.set_items = {piping_set_items: piping_set_items};
    }
};

/**
 * static properties and functions
 */
PipingPanel.STATUS_ON = "on";
PipingPanel.STATUS_OFF = "off";
PipingPanel.events = {
    is_init_events_called: 0,

    init: function() {
        if (PipingPanel.events.is_init_events_called === 0) {
            $(".modifier_main_container").on("click", ".richardson-piping-ui .piping-sizes-buttons", PipingPanel.events.onPipingSizeButtonClick);
            $(".modifier_main_container").on("click", ".richardson-piping-ui .piping-colors-buttons", PipingPanel.events.onPipingColorButtonClick);
            $(".modifier_main_container").on('click', '.richardson-piping-ui .edit-piping-modal-button', PipingPanel.events.onShowPipingModal);
            $(".modifier_main_container").on('click', ".piping-color-categories .piping-color-item .piping-color-selector", PipingPanel.events.onChangeColorLayer);
            $(".modifier_main_container").on('click', '#piping-change-color .piping-color-selector-button', PipingPanel.events.onSelectPipingColor);
            $(".modifier_main_container").on('click', '#piping-change-color .cancel-application', PipingPanel.events.onCancelEditPiping);
            PipingPanel.events.is_init_events_called = 1;
        }
    },

    onPipingSizeButtonClick: function() {
        var piping_el = $(this).closest('.piping-item');

        var type = $(this).data('type');
        var size = $(this).data('size');
        var piping_type = piping_el.data('piping-type');


        $(".piping-sizes-buttons", piping_el).removeClass("active");
        $(this).addClass("active");

        if (size === "none") {
            PipingPanel.disablePiping(piping_type)
            return;
        }

        var active_piping_set = PipingPanel.getActivePipingSet(piping_type);

        var pipingObject = _.find(ub.data.pipings, {name: type});
        var colorsMarkup =  ub.funcs.getPipingColorsNew(pipingObject);
        var firstColor = _.first(ub.funcs.getPipingColorArray(pipingObject));
        var pipingSettingsObject = ub.funcs.getPipingSettingsObject(active_piping_set.set);
        var matchingPipingObject;
        var matchingPipingSettingsObject;

        var name = pipingObject.name;
        var matchingName = "";

        ub.funcs.changePipingSize(pipingSettingsObject, pipingObject, size);

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

        $(".piping-color-modifier-container", piping_el).html(colorsMarkup);

        if (pipingSettingsObject.numberOfColors === 0) {
            $('.piping-colors-buttons[data-type="' + firstColor.name + '"]', piping_el).click();
        } else {
            $('.piping-colors-buttons[data-value="' + pipingSettingsObject.numberOfColors + '"]', piping_el).click();
        }

        // Force one color when going to 1/2
        if (type === "Neck Piping 1/2") {
            $('.piping-colors-buttons[data-value="1"]', piping_el).trigger('click');
        }

        if (typeof ub.data.logos !== "undefined") {
            LogoPanel.utilities.reInitiateLogo();
        }
    },

    onPipingColorButtonClick: function(e) {
        var piping_el = $(this).closest('.piping-item');
        var active_size_type = $('.sizes .piping-sizes-buttons.active', piping_el).data('type');

        $(".piping-colors-buttons", piping_el).removeClass("active");
        $(this).addClass("active");

        var value = $(this).data('value');
        var size = $(this).data('size');

        var piping_type = piping_el.data('piping-type');
        var active_piping_set = PipingPanel.getActivePipingSet(piping_type);

        var pipingObject = _.find(ub.data.pipings, {name: active_size_type});

        var pipingSettingsObject = ub.funcs.getPipingSettingsObject(active_piping_set.set);
        var matchingPipingObject;
        var matchingPipingSettingsObject;

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

        ub.funcs.initPipingColors(pipingObject, selectedColorArray[0]);
        ub.funcs.renderPipings(pipingObject, value);

        /// Process Matching Object
        if (typeof matchingPipingObject !== "undefined") {
            matchingPipingSettingsObject.numberOfColors = value;

            ub.funcs.initPipingColors(matchingPipingObject, selectedColorArray[0]);
            ub.funcs.renderPipings(matchingPipingObject, value);
        }
        /// End Process Matching Object

        if (typeof ub.data.logos !== "undefined") {
            LogoPanel.utilities.reInitiateLogo();
        }
    },

    onShowPipingModal: function(e)
    {
        var piping_el = $(this).closest('.piping-item');
        var type = piping_el.data("piping-type");
        var modifier = piping_el.data("piping-modifier");
        var number_of_colors = $(".colors .piping-colors-buttons.active", piping_el).data("value");

        console.log(type);
        console.log(number_of_colors);
        
        var image = ub.getThumbnailImage(ub.active_view + "_view");
        var layers = ub.current_material.settings.pipings[type].layers;

        $("#piping-preview").css({
            'background-image': "url("+ image +")"
        });

        $("#piping-change-color .cancel-application").attr('data-modifier', modifier);

        if ($(".piping-color-categories li.active")) {
            $(".piping-color-categories li").removeClass('active');
            $(".piping-color-categories li a.piping-color-selector").removeClass('cp-button-active');
            $("#piping-color-tab-content .tab-content .tab-pane").removeClass('active');
            $("#piping-color-tab-content .tab-content div:first-child").addClass("active");
            $(".piping-color-categories li").first().addClass('active');
            $(".piping-color-categories li").first().find(".piping-color-selector").addClass('cp-button-active');
        }

        $(".piping-color-categories .piping-color-item .piping-category-1").css('display', 'block');
        $(".piping-color-categories .piping-color-item .piping-category-2").css('display', 'block');
        $(".piping-color-categories .piping-color-item .piping-category-3").css('display', 'block');
        $(".piping-color-categories .piping-color-item .piping-category-1").parent().css('width', '');
        $(".piping-color-categories .piping-color-item .piping-category-2").parent().css('width', '');
        $(".piping-color-categories .piping-color-item .piping-category-3").parent().css('width', '');

        switch (number_of_colors) {
            case 1:
                $(".piping-color-categories .piping-color-item .piping-category-1").parent().css('width', '100%');
                $(".piping-color-categories .piping-color-item .piping-category-1").css('display', 'block');
                $(".piping-color-categories .piping-color-item .piping-category-2").css('display', 'none');
                $(".piping-color-categories .piping-color-item .piping-category-3").css('display', 'none');
                break;
            case 2:
                $(".piping-color-categories .piping-color-item .piping-category-1").parent().css('width', '50%');
                $(".piping-color-categories .piping-color-item .piping-category-2").parent().css('width', '50%');
                $(".piping-color-categories .piping-color-item .piping-category-1").css('display', 'block');
                $(".piping-color-categories .piping-color-item .piping-category-2").css('display', 'block');
                $(".piping-color-categories .piping-color-item .piping-category-3").css('display', 'none');
                break;
        }

        //
        var colors = ColorPalette.funcs.getConfigurationPerTab("piping");

        // Render Mustache
        var pipping_colors_element = document.getElementById("m-tab-piping-colors");
        var render_piping_colors = Mustache.render(
            pipping_colors_element.innerHTML,
            {
                modifier: modifier,
                colors: colors,
            }
        );

        // Render Pattern Color
        $("#piping-color-tab-content .tab-content .tab-pane .piping-color-button-container").html("");
        $("#piping-color-tab-content .tab-content .tab-pane .piping-color-button-container").html(render_piping_colors);

        _.delay(function() {
            _.map(layers, function(index) {
                var selected_button_el = $(".piping-color-main-container-" + index.layer + " .piping-color-button-container .color_element button.piping-color-selector-button[data-color-code='"+ index.colorCode +"']");

                if (selected_button_el.length > 0)
                {
                    selected_button_el.html('<div class="cp-check-background cp-background-cover piping-check"><span class="fa fa-check fa-1x cp-pattern-check-medium"></span></div>');
                    selected_button_el.addClass('active-piping-color');
                }
            });
        }, 500);

        $('#piping-change-color').modal('show');
    },

    onChangeColorLayer: function(event) {
        event.preventDefault();
        /* Act on the event */
        var selected_category = $(".piping-color-categories").find(".cp-button-active");
        selected_category.removeClass('active-color-piping-category');
        selected_category.removeClass('cp-button-active');

        $(this).addClass('active-color-piping-category');
        $(this).addClass('cp-button-active');
    },

    onSelectPipingColor: function() {
        var active_piping_el = $("#piping-color-tab-content .tab-content").find('.tab-pane.active');
        var active_piping_color_category = active_piping_el.data("piping-category");

        // Get selected color
        var selected_color = $(".piping-color-main-container-" + active_piping_color_category).find('.active-piping-color');
        selected_color.removeClass('active-piping-color');
        selected_color.find('.piping-check').remove();

        if (typeof($(this).data('color-id')) !== "undefined") {
            if ($('.none-color span', active_piping_el).length === 0) {
                $('.none-color', active_piping_el).html('<span class="fa fa-ban cp-padding-remove-vertical cp-text-medium"></span>');
            }
        }
        // Get Color Object
        var color_code = $(this).data("color-code");
        var _colorObj = ub.funcs.getColorByColorCode(color_code);

        // Get Piping Sets
        var modifier = $(this).data("modifier");

        console.log(modifier)

        var active_size_type = $('.piping-item[data-piping-modifier="'+ modifier +'"] .sizes .piping-sizes-buttons.active').data('type');
        var pipingObject = _.find(ub.data.pipings, {name: active_size_type});
        var _name = pipingObject.name;

        // Get Piping Settings object
        var _pipingSettingsObject = ub.funcs.getPipingSettingsObject(pipingObject.set);

        // Change Piping Color
        ub.funcs.changePipingColor(_colorObj, active_piping_color_category, pipingObject);

        // Matching Piping Object and Piping Setting Object
        var matchingPipingObject;
        var matchingPipingSettingsObject;

        if (_name.indexOf('Left') > -1) {
            matchingName = ub.funcs.getMatchingSide(_name);
            matchingPipingObject = _.find(ub.data.pipings, {name: matchingName});
        }

        if (_name.indexOf('Right') > -1) {
            matchingName = ub.funcs.getMatchingSide(_name);
            matchingPipingObject = _.find(ub.data.pipings, {_name: matchingName});
        }

        if (typeof matchingPipingObject !== 'undefined') {
            matchingPipingSettingsObject = ub.funcs.getPipingSettingsObject(matchingPipingObject.set);
        }

        var _layer = _.find(_pipingSettingsObject.layers, {layer: parseInt(active_piping_color_category)});

        if (typeof _layer !== "undefined")
        {
            _layer.colorCode = color_code;
            _layer.colorObj = _colorObj;
        }

        if (typeof matchingPipingObject !== "undefined")
        {
            ub.funcs.changePipingColor(_colorObj, active_piping_color_category, matchingPipingObject);
            var _matchingLayer = _.find(matchingPipingSettingsObject.layers, {layer: parseInt(active_piping_color_category)});

            if (typeof _matchingLayer !== "undefined") {
                _matchingLayer.colorCode = color_code;
                _matchingLayer.colorObj = _colorObj;
            }
        }

        if (typeof ub.data.logos !== "undefined") {
            LogoPanel.utilities.reInitiateLogo();
        }

        var image = ub.getThumbnailImage(ub.active_view + "_view");

        $("#piping-preview").css({
            'background-image': "url("+ image +")"
        });

        $(this).html('<div class="cp-check-background cp-background-cover piping-check"><span class="fa fa-check fa-1x cp-pattern-check-medium"></span></div>');
        $(this).addClass('active-piping-color');
    },

    onCancelEditPiping: function() {
        var modifier = $(this).data("modifier");
        var piping_type = $('.piping-item[data-piping-modifier="'+ modifier +'"] .sizes .piping-sizes-buttons.active').data('type');

        var pipingObject = _.find(ub.data.pipings, {name: piping_type});
        PipingPanel.removePiping(pipingObject.set);

        if (typeof ub.data.logos !== "undefined") {
            LogoPanel.utilities.reInitiateLogo();
        }

        $('.piping-item .piping-sizes-buttons[data-type="' + piping_type + '"]').click();
        $('#piping-change-color').modal('hide');
    }
};

PipingPanel.setInitialState = function() {
    var piping_types = PipingPanel.getPipingTypes();


    _.map(piping_types, function(piping_type) {
        var pipping_settings_object = ub.funcs.getPipingSettingsObject(piping_type);
        var piping_item_el = $('.richardson-piping-ui .piping-item[data-piping-type="'+ piping_type +'"]');

        if (pipping_settings_object.enabled === 1 && pipping_settings_object.size !== "") {
            $('.piping-sizes-buttons[data-size="' + pipping_settings_object.size + '"]', piping_item_el).trigger('click');
        } else {
            $('.piping-sizes-buttons[data-size="none"]', piping_item_el).addClass('active');
        }

    });
};

PipingPanel.getActivePipingSet = function(piping_type) {
    var active_piping_set = ub.current_material.settings.pipings[piping_type];

    if (active_piping_set !== "undefined") {
        var piping_sets = ub.funcs.getPipingSet(piping_type);

        if (piping_sets.length > 0) {
            var active_piping_sets = _.filter(piping_sets, {enabled: 1});

            active_piping_set = active_piping_sets.length > 0 ? _.first(active_piping_sets) : _.first(piping_sets);
        }
    }

    return active_piping_set;
};

PipingPanel.getPipingPanelStatus = function(piping_type) {
    var piping_set = ub.current_material.settings.pipings[piping_type];
    var status = (typeof piping_set !== "undefined" && piping_set.enabled === 1) ? PipingPanel.STATUS_ON : PipingPanel.STATUS_OFF;

    return status;
};

PipingPanel.isValidToProcessPipings = function() {
    var is_valid = false;

    if (ub.funcs.isCurrentSport('Baseball') || ub.funcs.isCurrentSport('Fastpitch')) {
        if (ub.current_material.pipings !== null) {
            is_valid = true;
        }
    }

    return is_valid;
};

PipingPanel.getPipingTypes = function() {
    return ub.funcs.getPipingSets();
};


PipingPanel.removePiping = function(pipingSet) {

    _.each(ub.views, function (view) {

        var _viewStr = view + '_view';

        if (typeof ub.objects[_viewStr][pipingSet] !== 'undefined'){

            ub[_viewStr].removeChild(ub.objects[_viewStr][pipingSet]);

        }

        delete ub.objects[_viewStr][pipingSet];

    });

    if (typeof(ub.current_material.settings.pipings[pipingSet]) !== "undefined") {
        ub.current_material.settings.pipings[pipingSet].enabled = 0;
    }
}


PipingPanel.disablePiping = function(piping_type) {
    var color_container = $('.richardson-piping-ui .piping-item[data-piping-type="' + piping_type + '"]').find('.piping-color-modifier-container');

    if (color_container.length !== 0) {
        color_container.html("");
    }

    // Remove Piping
    PipingPanel.removePiping(piping_type);
    // Remove Matching Piping
    if (piping_type.indexOf('Left') === 0) {
        var matching_side = ub.funcs.getMatchingSide(piping_type);
        PipingPanel.removePiping(matching_side);
    }
}
