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

        var properties_panel = new PropertiesPanel("#primary_options_container", "Richardsons");

        if (PipingPanel.isValidToProcessPipings()) {
            ub.funcs.activatePanelGuard();
            ub.funcs.deactivatePanels();

            ub.modifierController.pipings = new PipingPanel('m-piping-sidebar-new');
            ub.modifierController.pipings.setPipingSetItems();

            var piping_panel = ub.modifierController.pipings.getPanel();
            properties_panel.setBodyPanel(piping_panel);

            PipingPanel.events.init();
            PipingPanel.setInitialState();
        } else {
            ub.modifierController.pipings = new PipingPanel('m-no-piping-message');

            var piping_panel = ub.modifierController.pipings.getNoPipingPanel();
            properties_panel.setBodyPanel(piping_panel);
        }
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