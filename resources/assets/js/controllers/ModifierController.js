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
        ub.funcs.deactivateMoveTool();
        ub.funcs.deActivateApplications();
        ub.funcs.deActivateLocations();
    },

    fabrics: function() {
        console.log('Show Fabrics Panel');
    },

    parts: function(_this) {
        ub.modifierController.clearControls();
        ub.funcs.activeStyle('colors');

        // New Properties Object
        var propertiesPanel = new PropertiesPanel('#primary_options_container', this.brand);
        ub.modifierController.controllers.parts = new PartPanel('m-parts', propertiesPanel.parts);

        var part_panel = ub.modifierController.controllers.parts.getPanel();
        propertiesPanel.setBodyPanel(part_panel);
        propertiesPanel.setDefaultColorsPatterns();

        // Bind Events
        propertiesPanel.bindEvents();

        $("#primary_options_container").scrollTo(0);
        console.log("Show Parts Panel");
    },

    inserts: function() {
        ub.modifierController.clearControls();
        ub.funcs.activeStyle('colors');

        // New Properties Object
        var propertiesPanel = new PropertiesPanel('#primary_options_container', this.brand);
        ub.modifierController.controllers.inserts = new InsertPanel('m-inserts', propertiesPanel.inserts);

        var insert_panel = ub.modifierController.controllers.inserts.getPanel();
        propertiesPanel.setBodyPanel(insert_panel);
        propertiesPanel.setDefaultColorsPatterns();

        // Bind Events
        propertiesPanel.bindEvents();

        $("#primary_options_container").scrollTo(0);
        console.log("Show Inserts Panel")
    },

    pipings: function() {
        console.log('Show Pipings Panel');

        if (ub.funcs.popupsVisible()) { return; }
        if (!ub.funcs.okToStart())    { return; }

        var properties_panel = new PropertiesPanel("#primary_options_container", this.brand);

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
        // set event listeners
    },

    applications: function() {
        console.log('Show Applications Panel');
    },

    logo: function() {
        console.log('Show Logo Panel');

        ub.modifierController.logo = new LogoPanel("m-logo");
        var logo_panel = ub.modifierController.logo.getPanel();
        var properties_panel = new PropertiesPanel("#primary_options_container", this.brand);
        properties_panel.setBodyPanel(logo_panel);

        var image = ub.getThumbnailImage(ub.active_view + "_view");
        $("#logo-preview").css({
            'background-image': "url("+ image +")"
        });
    }
};