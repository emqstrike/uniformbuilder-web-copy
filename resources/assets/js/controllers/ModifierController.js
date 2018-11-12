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
                type: piping_type,
                type_wo_left_prefix: piping_type.indexOf('Left') === 0 ? piping_type.replace("Left", "") : piping_type
            };
        });

        $('.modifier_main_container').append(Mustache.render(piping_sidebar_tmpl, {
            piping_set_items: piping_set_items,
        }));

        // PipingPanel.initEvents();
        PipingPanel.events.init();

        $('#pipingsUI').fadeIn();

        // set initial states
        _.map(piping_types, function(piping_type) {
            var active_piping_set = PipingPanel.getFirstActivePipingSet(piping_type);
            var status = PipingPanel.PipingPanelPipingPanel(piping_type);
            var pipping_settings_object = ub.funcs.getPipingSettingsObject(active_piping_set.set);

            if (pipping_settings_object.enabled === 1 && pipping_settings_object.size !== "") {
                $('#pipingsUI .piping-item[data-piping-type="'+piping_type+'"] .piping-sizes-buttons[data-size="' + pipping_settings_object.size + '"]').click();
            }

            var toggle_el = $('#pipingsUI .piping-item[data-piping-type="'+piping_type+'"] .toggle');
            var temporary_status = status === "on" ? "off" : "on";

            toggle_el.data('status', temporary_status);
            $('.toggleOption.'+temporary_status, toggle_el).click();
        });
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