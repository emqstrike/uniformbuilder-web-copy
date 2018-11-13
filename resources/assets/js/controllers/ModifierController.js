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

function ModifierController(element, brand) {
    this.switcherBody = document.querySelector(element);
    this.brand = brand;
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

    ub.modifierController = this;
}

ModifierController.prototype = {
    constructor: ModifierController,

    initControls: function() {
        // Set Tooltips Behavior
        tippy('.tippy-menu-item', {
            delay: 0,
            size: 'large',
            animation: 'shift-away',
            placement: 'left-end'
        });
    },

    bindEvents: function() {
        var _this = this;

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

    clearPartsAndInsert: function() {
        $("#primary_options_colors").css('display', 'none');
        $("#primary_options_colors").html("");
    },

    activateColorAndPatternPanel: function() {
        var panel = new PropertiesPanel('#primary_options_container', 'Richardsons');
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
            ub.funcs.drawColorPickers();
        }
    },

    clearControls: function() {
        ub.funcs.deActivateApplications();
        ub.funcs.deActivateLocations();
    },

    fabrics: function() {
        console.log('Show Fabrics Panel');
    },

    parts: function(_this) {
        ub.funcs.deActivateApplications();
        ub.funcs.deActivateLocations();
        ub.funcs.activeStyle('colors');

        if ($("#primary_options_colors").css("display") === "none") {

            ub.modifierController.activateColorAndPatternPanel();
            $("#primary_options_container").scrollTo(0, { duration: 200 });
            $("#parts-with-insert-container").hide();
        }

        if ($("#primary_options_container #primary_options_colors").length > 0) {

            $(".parts-container").show();
            $("#parts-with-insert-container").hide();

        } else {

            ub.modifierController.activateColorAndPatternPanel();
            $("#primary_options_container").scrollTo(0, { duration: 200 });
            $("#parts-with-insert-container").hide();
        }

    },

    inserts: function(_this) {
        ub.funcs.deactivateMoveTool();
        ub.funcs.deActivateApplications();
        ub.funcs.deActivateLocations();
        ub.funcs.activeStyle('colors');

        if ($("#primary_options_colors").css("display") === "none") {
            ub.modifierController.activateColorAndPatternPanel();
            $("#primary_options_container").scrollTo(0, { duration: 200 });
            $(".parts-container").hide();
            $("#parts-with-insert-container").show();
        }

        if ($("#primary_options_container #primary_options_colors").length > 0) {

            $(".parts-container").hide();
            $("#parts-with-insert-container").show();

        } else {

            ub.modifierController.activateColorAndPatternPanel();
            $("#primary_options_container").scrollTo(0, { duration: 200 });
            $(".parts-container").hide();
            $("#parts-with-insert-container").show();
        }

    },

    pipings: function() {
        console.log('Show Pipings Panel');

        if (ub.funcs.popupsVisible()) { return; }
        if (!ub.funcs.okToStart())    { return; }

        ub.modifierController.clearPartsAndInsert();
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

            var modifier = piping_type.toLowerCase().replace(/ /g, "-")

            return {
                sizes: sizes.items,
                colors: colors,
                type: piping_type,
                type_wo_left_prefix: piping_type.indexOf('Left') === 0 ? piping_type.replace("Left", "") : piping_type,
                modifier: modifier
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
            var active_piping_set = PipingPanel.getActivePipingSet(piping_type);
            var status = PipingPanel.getPipingPanelStatus(piping_type);
            var pipping_settings_object = ub.funcs.getPipingSettingsObject(active_piping_set.set);

            var piping_item_el = $('#pipingsUI .piping-item[data-piping-type="'+piping_type+'"]');

            if (pipping_settings_object.enabled === 1 && pipping_settings_object.size !== "") {
                $('.piping-sizes-buttons[data-size="' + pipping_settings_object.size + '"]', piping_item_el).click();
            }

            var temporary_status = status === PipingPanel.STATUS_ON ? PipingPanel.STATUS_OFF : PipingPanel.STATUS_ON;

            $('.toggle', piping_item_el).data('status', temporary_status);
            $('.toggleOption.'+temporary_status, $('.toggle', piping_item_el)).click();
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