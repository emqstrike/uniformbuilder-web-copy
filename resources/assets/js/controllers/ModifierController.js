/**
 * ModifierController.js
 * - Modifier switcher
 * @since October 23, 2018
 * @author Romack Natividad <romack@qstrike.com>
 * @author Aron Bagtas <aron@qstrike.com>
 * @author Rodrigo Galura <rodrigo@qstrike.com>
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

        // change pipings to random feeds if the item is sock
        tippy('#property-modifiers-menu .menu-item-pipings', {
            content: ub.funcs.isSocks() ? "RANDOM FEED" : "PIPINGS",
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

        $(this).addClass('actiNC FLIGHTve');
        $(this).css('pointer-events', "none");
    },

    clearPartsAndInsert: function() {
        $("#primary_options_colors").css('display', 'none');
        $("#primary_options_colors").html("");
    },

    activateColorAndPatternPanel: function() {
        var panel = new PropertiesPanel('#primary_options_container', this.brand);
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
    },

    pipings: function() {
        if (ub.funcs.popupsVisible()) { return; }
        if (!ub.funcs.okToStart())    { return; }

        var properties_panel = new PropertiesPanel("#primary_options_container", this.brand);
        var piping_panel;

        if (ub.funcs.isSocks()) { // display random feeds
            ub.modifierController.controllers.pipings = new RandomFeedPanel('random-feeds-list');
            ub.modifierController.controllers.pipings.setRandomFeedSetItems();

            var random_feed_panel = ub.modifierController.controllers.pipings.getPanel();
            properties_panel.setBodyPanel(random_feed_panel);

            RandomFeedPanel.events.init();
            RandomFeedPanel.setInitialState();
        } else if (PipingPanel.isValidToProcessPipings()) { // display pipings
            ub.funcs.activatePanelGuard();
            ub.funcs.deactivatePanels();

            ub.modifierController.controllers.pipings = new PipingPanel('m-piping-sidebar-new');
            ub.modifierController.controllers.pipings.setPipingSetItems();

            piping_panel = ub.modifierController.controllers.pipings.getPanel();
            properties_panel.setBodyPanel(piping_panel);

            PipingPanel.events.init();
            PipingPanel.setInitialState();
        } else { // no pipings
            ub.modifierController.controllers.pipings = new PipingPanel('m-no-piping-message');

            piping_panel = ub.modifierController.controllers.pipings.getNoPipingPanel();
            properties_panel.setBodyPanel(piping_panel);
        }
    },

    letters: function() {
        ub.funcs.startNewApplicationLetters();
    },

    numbers: function() {
        ub.funcs.startNewApplicationNumbers();
    },

    applications: function() {
        ub.funcs.startNewApplication();
    },

    logo: function() {
        var logo_positions = ub.data.logos;
        var properties_panel = new PropertiesPanel("#primary_options_container", this.brand);

        if (typeof logo_positions !== "undefined" && logo_positions.length > 0) {
            var current_position = _.find(ub.current_material.settings.logos, {enabled: 1});
            if (current_position.position.includes("front") || current_position.position.includes("chest")) {
                $('a.change-view[data-view="front"]').trigger('click');

            } else if (current_position.position.includes("back")) {
                $('a.change-view[data-view="back"]').trigger('click');

            } else if (current_position.position.includes("left") || current_position.position.includes("sleeve")) {
                $('a.change-view[data-view="left"]').trigger('click');

            }

            ub.modifierController.logo = new LogoPanel("m-logo", logo_positions);
            var logo_panel = ub.modifierController.logo.getPanel();
            properties_panel.setBodyPanel(logo_panel);

            // Activate logo current position
            $(".modifier_main_container #primary_option_logo .logo-perspective-btn-container button[data-position='"+ current_position.position +"']").addClass('cp-button-active');
            $(".modifier_main_container #primary_option_logo .logo-perspective-btn-container button[data-position='"+ current_position.position +"']").css('pointer-events', "none");

            var image = ub.getThumbnailImage(ub.active_view + "_view");
            $("#logo-preview").css({
                'background-image': "url("+ image +")"
            });

            $("#logo-preview").show();
            $(".logo-image-loader").hide();

        } else {
            var panel = document.getElementById("m-no-logo-message")
            var render = Mustache.render(panel.innerHTML);
            properties_panel.setBodyPanel(render);
        }
    }
};

ModifierController.scrollToOptions = function (application_type, application_id) {
    // Check if clicked application is TEAM NAME or PLAYER NAME,
    if (application_type === "team_name" || application_type === "player_name") {
        $('#property-modifiers-menu .menu-item-letters').trigger('click')
    } else if (application_type === "front_number" || application_type === "back_number" || application_type === "sleeve_number" || application_type === "number") {
        // Numbers
        $('#property-modifiers-menu .menu-item-numbers').trigger('click')
    } else if (application_type === "mascot" || application_type === "embellishments") {
        // Mascots/Embellishments
        $('#property-modifiers-menu .menu-item-applications').trigger('click')
    }

    $('.modifier_main_container').scrollTo($('div[data-application-id=' + application_id + '].applicationUIBlock'))

};

ModifierController.deleteApplicationContainer = function (application_id) {
    $('.modifier_main_container').find($('div[data-application-id=' + application_id + '].applicationUIBlock')).remove();
}