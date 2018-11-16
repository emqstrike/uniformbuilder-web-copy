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
        // on click on any group pane switch to active
        $('#property-modifiers-menu > .group-pane').on('click', function () {
            $('#property-modifiers-menu > .group-pane').removeClass('active');
            $(this).addClass('active');
        });

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
        $('#property-modifiers-menu .menu-item-parts').on('click', function() {
            _this.parts(_this);
        });
        $('#property-modifiers-menu .menu-item-inserts').on('click', function() {
            _this.inserts(_this);
        });
        $('#property-modifiers-menu .menu-item-pipings').on('click', this.pipings);
        $('#property-modifiers-menu .menu-item-letters').on('click', this.letters);
        $('#property-modifiers-menu .menu-item-numbers').on('click', this.numbers);
        $('#property-modifiers-menu .menu-item-applications').on('click', this.applications);
        $('#property-modifiers-menu .menu-item-logo').on('click', this.logo);
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
        // this.clearControls();
        ub.funcs.deActivateApplications();
        ub.funcs.deActivateLocations();

        if ($("#primary_options_colors").css("display") === "none") {
            _this.controllers.parts = new PropertiesPanel('#primary_options_container', this.brand);
            $("#primary_options_container").scrollTo(0, { duration: 200 });
            $("#parts-with-insert-container").hide();
        }

        if ($("#primary_options_container #primary_options_colors").length > 0) {

            $(".parts-container").show();
            $("#parts-with-insert-container").hide();

        } else {

            _this.controllers.parts = new PropertiesPanel('#primary_options_container', this.brand);
            $("#primary_options_container").scrollTo(0, { duration: 200 });
            $("#parts-with-insert-container").hide();
        }

    },

    inserts: function(_this) {
        ub.funcs.deActivateApplications();
        ub.funcs.deActivateLocations();

        if ($("#primary_options_colors").css("display") === "none") {
            _this.controllers.inserts = new PropertiesPanel('#primary_options_container', this.brand);
            $("#primary_options_container").scrollTo(0, { duration: 200 });
            $(".parts-container").hide();
            $("#parts-with-insert-container").show();
        }

        if ($("#primary_options_container #primary_options_colors").length > 0) {

            $(".parts-container").hide();
            $("#parts-with-insert-container").show();

        } else {

            _this.controllers.inserts = new PropertiesPanel('#primary_options_container', this.brand);
            $("#primary_options_container").scrollTo(0, { duration: 200 });
            $(".parts-container").hide();
            $("#parts-with-insert-container").show();
        }

    },

    pipings: function() {
        console.log('Show Pipings Panel');
    },

    letters: function() {
        console.log('Show Letters Panel');
    },

    numbers: function() {
        ub.modifierController.numbers = new NumberPanel('m-decorations-numbers');
        var numbers_panel = ub.modifierController.numbers.getPanel();
        var properties_panel = new PropertiesPanel('#primary_options_container', this.brand);
        properties_panel.setBodyPanel(numbers_panel);
        // set event listeners
        ub.modifierController.numbers.bindEvents();
    },

    applications: function() {
        console.log('Show Applications Panel');
    },

    logo: function() {
        console.log('Show Logo Panel');
    }
}
