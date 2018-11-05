/**
 * ModifierController.js
 * - Modifier switcher
 * @since October 23, 2018
 * @author Romack Natividad <romack@qstrike.com>
 *
 * Required:
 *  jQuery, Tippy
 *
 * Usage:
 *  modifier = new ModifierController('main-panel-id');
 *  modifier.fabrics();     // displays the fabrics panel
 *  modifier.parts();       // displays the parts panel
 *  modifier.inserts();     // displays the inserts panel
 *  modifier.pipings();     // displays the pipings panel
 *  modifier.letters();     // displays the letters panel
 *  modifier.numbers();     // displays the numbers panel
 *  modifier.decorations(); // displays the decorations panel
 *  modifier.logo();        // displays the logo panel
 */

function ModifierController(element) {
    this.switcherBody = document.querySelector(element);
    // Controllers / Switchers
    this.controllers = {
        fabrics: {},
        parts: {},
        inserts: {},
        pippings: {},
        letters: {},
        numbers: {},
        applications: {},
        logo: {}
    };

    // Setup
    this.initControls();
    this.bindEvents();
    this.enable();
}

ModifierController.prototype = {
    constructor: ModifierController,

    initControls: function() {
        // Set Tooltips Behavior
        tippy('.tippy-menu-item', {
            delay: 100,
            size: 'large',
            animation: 'shift-away',
            placement: 'left-end'
        });
    },

    bindEvents: function() {
        $('#property-modifiers-menu .menu-item-fabrics').on('click', this.fabrics);
        $('#property-modifiers-menu .menu-item-parts').on('click', this.parts);
        $('#property-modifiers-menu .menu-item-inserts').on('click', this.inserts);
        $('#property-modifiers-menu .menu-item-pipings').on('click', _.throttle(this.pipings, 800));
        $('#property-modifiers-menu .menu-item-letters').on('click', this.letters);
        $('#property-modifiers-menu .menu-item-numbers').on('click', this.numbers);
        $('#property-modifiers-menu .menu-item-applications').on('click', this.applications);
        $('#property-modifiers-menu .menu-item-logo').on('click', this.logo);

        // on click on any group pane switch to active
        $('#property-modifiers-menu a').click(this.enableDisableModifierMenu);
    },

    enableDisableModifierMenu: function() {
        $('#property-modifiers-menu a').removeClass('active');
        $('#property-modifiers-menu a').css('pointer-events', "auto");

        $(this).addClass('active');
        $(this).css('pointer-events', "none");
    },

    enable: function() {
        if (this.switcherBody.classList.contains('hidden')) {
            this.switcherBody.classList.remove('hidden');
            ub.data.useScrollingUI = true;
        }
    },

    disable: function() {
        if (!this.switcherBody.classList.contains('hidden')) {
            this.switcherBody.classList.add('hidden');
            ub.data.useScrollingUI = false;
            // To do, use the Color Wheel Menu
        }
    },

    clearControls: function() {
        ub.funcs.deActivateApplications();
        ub.funcs.deActivateLocations();
    },

    fabrics: function() {
        console.log('Show Fabrics Panel');
    },

    parts: function() {
        // this.clearControls();
        ub.funcs.deActivateApplications();
        ub.funcs.deActivateLocations();

        if ($("#primary_options_colors").css("display") === "none") {
            this.controllers.parts = new PropertiesPanel('#primary_options_container', 'Richardsons');
        }

        if ($("#primary_options_container #primary_options_colors").length > 0) {

            $(".parts-container").show();
            $("#parts-with-insert-container").hide();

        } else {

            this.controllers.parts = new PropertiesPanel('#primary_options_container', 'Richardsons');
            $("#parts-with-insert-container").hide();

        }
    },

    fabrics: function() {
        console.log('Show Fabrics Panel');
    },

    inserts: function() {
        console.log('Show Inserts Panel');
    },

    pipings: function() {
        console.log('Show Pipings Panel');

        // ub.funcs.showPipingsPanel();
        // var piping_set = ub.funcs.getPipingSets();
        // new PippingPanel();

        if (ub.funcs.popupsVisible()) { return; }
        if (!ub.funcs.okToStart())    { return; }

        ub.funcs.activatePanelGuard();
        ub.funcs.deactivatePanels();

        $('#pipingsUI').remove();

        // get the name of pipings
        var piping_types = ub.funcs.getPipingSets();
        var piping_sidebar_tmpl = $('#m-piping-sidebar-new').html();

        var piping_set_items = _.map(piping_types, function(piping_type) {
            var active_piping_set = ub.current_material.settings.pipings[piping_type];
            var piping_set = piping_type;

            if (active_piping_set !== "undefined") {
                piping_set = ub.funcs.getPipingSet(piping_type);
                active_piping_set = _.first(piping_set);
            }

            var sizes = ub.funcs.sortPipingSizes({items: piping_set});
            var colors = ub.funcs.getPipingColorArray(active_piping_set);

            return {
                sizes: sizes.items,
                colors: colors,
                type: piping_type
            };
        });

        $('.modifier_main_container').append(Mustache.render(piping_sidebar_tmpl, {
            piping_set_items: piping_set_items,
        }));

        _.map(piping_set_items, function(piping_item) {
            var piping_item_el = $('#pipingsUI .piping-item[data-piping-type="'+piping_item.type+'"]');
            var active_piping_set = ub.current_material.settings.pipings[piping_item.type];
            var piping_set = piping_item.type;

            if (active_piping_set !== "undefined") {
                piping_set = ub.funcs.getPipingSet(piping_item.type);
                active_piping_set = _.first(piping_set);
            }

            $('#pipingsUI .toggle').data('status', "on");
            // ub.funcs.togglePiping(piping_set, "on");

            var pipingSizesButtons = $('span.piping-sizes-buttons', piping_item_el);
            pipingSizesButtons.on('click', function () {
                var _type                           = $(this).data('type');
                var _size                           = $(this).data('size');
                var _pipingObject                   = _.find(ub.data.pipings, {name: _type});
                var _colorsMarkup                   =  ub.funcs.getPipingColorsNew(_pipingObject);
                var _firstColor                     = _.first(ub.funcs.getPipingColorArray(_pipingObject));

                var _pipingSettingsObject           = ub.funcs.getPipingSettingsObject(active_piping_set.set);
                var _matchingPipingObject           = undefined;
                var _matchingPipingSettingsObject   = undefined;

                var _name                           = _pipingObject.name;
                var _matchingName                   = '';

                ub.funcs.changePipingSize(_pipingSettingsObject, _pipingObject, _size);

                /// Process Matching Object

                    if (_name.indexOf('Left') > -1) {

                        _matchingName = ub.funcs.getMatchingSide(_name);
                        _matchingPipingObject = _.find(ub.data.pipings, {name: _matchingName});

                    }

                    if (_name.indexOf('Right') > -1) {

                        _matchingName = ub.funcs.getMatchingSide(_name);
                        _matchingPipingObject = _.find(ub.data.pipings, {name: _matchingName});

                    }

                    if (typeof _matchingPipingObject !== 'undefined') {

                        _matchingPipingSettingsObject = ub.funcs.getPipingSettingsObject(_matchingPipingObject.set);
                        ub.funcs.changePipingSize(_matchingPipingSettingsObject, _matchingPipingObject, _size);

                    }

                /// End Process Matching Object

                $('.ui-row.colors-row', piping_item_el).html(_colorsMarkup);

                var $pipingColorsButtons = $('span.piping-colors-buttons', piping_item_el);
                $pipingColorsButtons.unbind('click');

                console.log($pipingColorsButtons);
                $pipingColorsButtons.on('click', function () {

                    var _type               = $(this).data('type');
                    var _value              = $(this).data('value');
                    var _colorPickerHtml    = ub.funcs.drawPipingColorPickers(_pipingObject, _value, _pipingSettingsObject);
                    var selectedColorArray  = ub.current_material.settings.team_colors;

                    $('.colorContainer', piping_item_el).html(_colorPickerHtml);

                    ub.funcs.setupSmallColorPickerEvents(_pipingObject, _pipingSettingsObject, _matchingPipingObject, _matchingPipingSettingsObject);
                    ub.funcs.initPipingColors(_pipingObject, selectedColorArray[0]);
                    ub.funcs.renderPipings(_pipingObject, _value);

                    /// Process Matching Object

                        if (typeof _matchingPipingObject !== "undefined") {

                            _matchingPipingSettingsObject.numberOfColors = _value;

                            ub.funcs.initPipingColors(_matchingPipingObject, selectedColorArray[0]);
                            ub.funcs.renderPipings(_matchingPipingObject, _value);

                        }

                    /// End Process Matching Object

                    _.each(_pipingSettingsObject.layers, function (layer) {

                        if (layer.colorCode !== "") {

                            $('span.colorItem[data-layer-no="' + (layer.layer) + '"][data-color-code="' + layer.colorCode + '"]').trigger('click');

                        }

                    });

                    $pipingColorsButtons.removeClass('active');
                    $(this).addClass('active');

                });

                pipingSizesButtons.removeClass('active');
                $(this).addClass('active');

                if (_pipingSettingsObject.numberOfColors === 0) {

                    $('span.piping-colors-buttons[data-type="' + _firstColor.name + '"]').trigger('click');

                } else {

                    $('span.piping-colors-buttons[data-value="' + _pipingSettingsObject.numberOfColors + '"]').trigger('click');

                }


                // Force one color when going to 1/2

                if (_type === "Neck Piping 1/2") { $('span.piping-colors-buttons[data-value="1"]').click(); }
            });

            // $(".toggleOption").on("click", function () {
            //     var currentStatus = $('.toggle').data('status');
            //     console.log(currentStatus);

            //     if(currentStatus === "on") {
            //         status = 'off';
            //         ub.funcs.removePiping(piping_item.type);

            //         if (piping_item.type.indexOf('Left') === 0) {

            //             var matchingSide = ub.funcs.getMatchingSide(piping_item.type);
            //             ub.funcs.removePiping(matchingSide);
            //         }
            //     } else {
            //         status = 'on';

            //         var _firstColor     = _.first(ub.funcs.getPipingColorArray(active_piping_set));
            //         var $activePiping   = $('span.piping-sizes-buttons[data-type="' + active_piping_set.name + '"]', piping_item_el);

            //         console.log($activePiping);

            //         $activePiping.trigger('click');
            //     }

            //     ub.funcs.togglePiping(piping_set, status);
            // });

            var piping_setting_object = ub.funcs.getPipingSettingsObject(active_piping_set.set);
            if (typeof piping_setting_object !== "undefined") {
                if (piping_setting_object.enabled === 1 && piping_setting_object.size !== "") {
                    $('span.piping-sizes-buttons[data-size="' + piping_setting_object.size + '"]', piping_item_el).trigger('click');
                    console.log($('span.piping-sizes-buttons[data-size="' + piping_setting_object.size + '"]', piping_item_el));
                }
            }
        });

        $('#pipingsUI').fadeIn();
    },

    letters: function() {
        console.log('Show Letters Panel');
    },

    numbers: function() {
        console.log('Show Numbers Panel');
    },

    applications: function() {
        console.log('Show Applications Panel');
    },

    logo: function() {
        console.log('Show Logo Panel');
    }
};