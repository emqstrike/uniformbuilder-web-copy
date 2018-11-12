function PipingPanel() {}

// static properties and functions
PipingPanel.events = {
    is_init_events_called: 0,

    init: function() {
        if (PipingPanel.events.is_init_events_called === 0) {
            $(".modifier_main_container").on("click", "#pipingsUI .piping-sizes-buttons", PipingPanel.events.onPipingSizeButtonClick);
            $(".modifier_main_container").on("click", "#pipingsUI .piping-colors-buttons", PipingPanel.events.onPipingColorButtonClick);
            $(".modifier_main_container").on('click', '#pipingsUI .edit-piping-modal-button', PipingPanel.events.onShowPipingModal);
            $(".modifier_main_container").on("click", "#pipingsUI .toggleOption", PipingPanel.events.togglePiping);
            $(".modifier_main_container").on('click', ".piping-color-categories .piping-color-item .piping-color-selector", PipingPanel.events.onChangeColorLayer);
            $(".piping-color-button-container").on('click', '.piping-color-selector-button', PipingPanel.events.onSelectPipingColor);

            PipingPanel.events.is_init_events_called = 1;
        }
    },

    togglePiping: function() {
        var toggle_el = $(this).closest('.toggle');
        var piping_item_el = $(this).closest('.piping-item');

        var status = toggle_el.data('status');

        if (status === "on") {
            $('.valueContainer', toggle_el).css('margin-left', '-100px');
            toggle_el.removeClass('defaultShadow');

            ub.funcs.removePiping(piping_item_el.data('piping-type'))

            $('.content-wrapper', piping_item_el).slideUp("fast");
            toggle_el.data('status', "off");
        } else {
            $('.valueContainer', toggle_el).css('margin-left', '0');
            toggle_el.addClass('defaultShadow');

            $('.content-wrapper', piping_item_el).slideDown("fast");
            toggle_el.data('status', "on");
        }
    },

    onPipingSizeButtonClick: function() {
        var piping_el = $(this).closest('.piping-item');

        var type = $(this).data('type');
        var size = $(this).data('size');
        var piping_type = piping_el.data('piping-type');
        var piping_set = ub.current_material.settings.pipings[piping_type];

        var pipingObject = _.find(ub.data.pipings, {name: type});
        var colorsMarkup =  ub.funcs.getPipingColorsNew(pipingObject);
        var firstColor = _.first(ub.funcs.getPipingColorArray(pipingObject));

        var pipingSettingsObject = ub.funcs.getPipingSettingsObject(piping_set.set);
        var matchingPipingObject = undefined;
        var matchingPipingSettingsObject = undefined;

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

        console.log("Size: ", size);
        console.log("Value: ", value);

        // var piping_type = piping_el.data('piping-type');
        // var piping_set = ub.current_material.settings.pipings[piping_type];

        // var pipingObject = _.find(ub.data.pipings, {name: active_size_type});

        // var pipingSettingsObject = ub.funcs.getPipingSettingsObject(piping_set.set);
        // var matchingPipingObject = undefined;
        // var matchingPipingSettingsObject = undefined;

        // var name = pipingObject.name;

        // var colorPickerHtml    = ub.funcs.drawPipingColorPickers(pipingObject, value, pipingSettingsObject);
        // var selectedColorArray  = ub.current_material.settings.team_colors;

        // // di ko alam kung need to i-trigger
        // // ub.funcs.changePipingSize(pipingSettingsObject, pipingObject, size);

        // /// Process Matching Object
        // if (name.indexOf('Left') > -1) {
        //     matchingName = ub.funcs.getMatchingSide(name);
        //     matchingPipingObject = _.find(ub.data.pipings, {name: matchingName});
        // }

        // if (name.indexOf('Right') > -1) {
        //     matchingName = ub.funcs.getMatchingSide(name);
        //     matchingPipingObject = _.find(ub.data.pipings, {name: matchingName});
        // }

        // if (typeof matchingPipingObject !== 'undefined') {
        //     matchingPipingSettingsObject = ub.funcs.getPipingSettingsObject(matchingPipingObject.set);
        //     ub.funcs.changePipingSize(matchingPipingSettingsObject, matchingPipingObject, size);
        // }
        // /// End Process Matching Object

        // $('.colorContainer', piping_el).html(colorPickerHtml);

        // ub.funcs.setupSmallColorPickerEvents(pipingObject, pipingSettingsObject, matchingPipingObject, matchingPipingSettingsObject);
        // ub.funcs.initPipingColors(pipingObject, selectedColorArray[0]);
        // ub.funcs.renderPipings(pipingObject, value);

        // /// Process Matching Object
        // if (typeof matchingPipingObject !== "undefined") {
        //     matchingPipingSettingsObject.numberOfColors = value;

        //     ub.funcs.initPipingColors(matchingPipingObject, selectedColorArray[0]);
        //     ub.funcs.renderPipings(matchingPipingObject, value);
        // }
        // /// End Process Matching Object

        // _.each(pipingSettingsObject.layers, function (layer) {
        //     if (layer.colorCode !== "") {
        //         $('.colorItem[data-layer-no="' + (layer.layer) + '"][data-color-code="' + layer.colorCode + '"]', piping_el).click();
        //     }
        // });

        $(".piping-colors-buttons", piping_el).removeClass("active");
        $(this).addClass("active");
    },

    onShowPipingModal: function(e) {
        console.log("Show Modal");
        var modifier = $(this).data("modifier");
        var piping_type = $(this).data("piping-type");
        var number_of_colors = $("." + modifier + " .colors-row .piping-colors-buttons.active").data("value");

        if ($(".piping-color-categories li.active")) {
            $(".piping-color-categories li").removeClass('active');
            $(".piping-color-categories li a.piping-color-selector").removeClass('cp-button-active');
            $("#piping-color-tab-content .tab-content .tab-pane").removeClass('active');
            $("#piping-color-tab-content .tab-content div:first-child").addClass("active");
            $(".piping-color-categories li").first().addClass('active');
            $(".piping-color-categories li").first().find(".piping-color-selector").addClass('cp-button-active');
        }

        $(".piping-color-categories .piping-color-item .piping-category-1").show();
        $(".piping-color-categories .piping-color-item .piping-category-2").show();
        $(".piping-color-categories .piping-color-item .piping-category-3").show();
        $(".piping-color-categories .piping-color-item .piping-category-1").parent().css('width', '');
        $(".piping-color-categories .piping-color-item .piping-category-2").parent().css('width', '');
        $(".piping-color-categories .piping-color-item .piping-category-3").parent().css('width', '');

        switch (number_of_colors) {
            case 1:
                $(".piping-color-categories .piping-color-item .piping-category-1").parent().css('width', '100%');
                $(".piping-color-categories .piping-color-item .piping-category-1").show();
                $(".piping-color-categories .piping-color-item .piping-category-2").hide();
                $(".piping-color-categories .piping-color-item .piping-category-3").hide();
                break;
            case 2:
                $(".piping-color-categories .piping-color-item .piping-category-1").parent().css('width', '50%');
                $(".piping-color-categories .piping-color-item .piping-category-2").parent().css('width', '50%');
                $(".piping-color-categories .piping-color-item .piping-category-1").show();
                $(".piping-color-categories .piping-color-item .piping-category-2").show();
                $(".piping-color-categories .piping-color-item .piping-category-3").hide();
                break;
        }
        // Render Mustache
        var pipping_colors_element = document.getElementById("m-tab-piping-colors");
        var render_piping_colors = Mustache.render(
            pipping_colors_element.innerHTML,
            {
                modifier: modifier,
                colors: ub.current_material.settings.team_colors,
            }
        );

        // Render Pattern Color
        $("#piping-color-tab-content .tab-content .tab-pane .piping-color-button-container").html("");
        $("#piping-color-tab-content .tab-content .tab-pane .piping-color-button-container").html(render_piping_colors);

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
        var active_size_type = $("."+ modifier +' .size-row .piping-sizes-buttons.active').data('type');
        var pipingObject = _.find(ub.data.pipings, {name: active_size_type});

        // Change Piping Color
        ub.funcs.changePipingColor(_colorObj, active_piping_color_category, pipingObject);

        $(this).html('<div class="cp-check-background cp-background-cover piping-check"><span class="fa fa-check fa-1x cp-pattern-check-medium"></span></div>');
        $(this).addClass('active-piping-color');
    }
};

PipingPanel.prototype = {
    constructor: PipingPanel,
};