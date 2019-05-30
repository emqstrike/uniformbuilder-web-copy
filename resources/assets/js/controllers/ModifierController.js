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
    this.brand = brand; // remove this after
    // Controllers / Switchers
    this.controllers = {
        fabrics: {},
        parts: {},
        inserts: {},
        pipings: {},
        letters: {},
        numbers: {},
        applications: {},
        logo: {}
    };

    this.propertiesPanel = new PropertiesPanel('#primary_options_container', brand);
    ub.modifierController = this;

    // Setup
    this.bindEvents();
    this.enable();
    this.setControllers();
    this.setMenus();
}

ModifierController.prototype = {
    constructor: ModifierController,

    bindEvents: function() {
        $('#property-modifiers-menu .menu-item-fabrics').on('click', this.fabrics);
        $('#property-modifiers-menu .menu-item-parts').on('click', this.parts);
        $('#property-modifiers-menu .menu-item-pipings').on('click', _.throttle(this.pipings, 800));
        $('#property-modifiers-menu .menu-item-letters').on('click', this.letters);
        $('#property-modifiers-menu .menu-item-numbers').on('click', this.numbers);
        $('#property-modifiers-menu .menu-item-applications').on('click', this.applications);
        $('#property-modifiers-menu .menu-item-logo').on('click', this.logo);
        $('#property-modifiers-menu .menu-item-roster').on('click', this.roster);

        // on click on any group pane switch to active
        $('#property-modifiers-menu a').click(this.enableDisableModifierMenu);
        $('#property-modifiers-menu .group-pane').click(_.debounce(this.updateLeftPanel, 1000));

        // On click dropdown shorts for modifier
        $('div.pd-dropdown-links').on('click', ModifierController.dropdownLinks);
    },

    setControllers: function() {
        // fabrics
        this.controllers.fabrics = new FabricPanel('fabric-tmpl');
        FabricPanel.applyDefaultLayerLevel();

        // parts
        // this.controllers.parts = new PartPanel('m-parts', ub.modifierController.propertiesPanel.parts);
        this.controllers.parts = new PartPanel('m-parts-no-scroll', ub.modifierController.propertiesPanel.parts);

        // pipings
        if (ub.funcs.isSocks()) { // display random feeds
            this.controllers.pipings = new RandomFeedPanel('random-feeds-list');
            this.controllers.pipings.setRandomFeedSetItems();
        } else if (PipingPanel.isValidToProcessPipings()) { // display pipings
            this.controllers.pipings = new PipingPanel('m-piping-with-images');
            this.controllers.pipings.setPipingSetItems();
        }

        // numbers
        this.controllers.numbers = new NumbersPanel('richardson-numbers');
        window.codedigs_numbers = this.controllers.numbers;

        // logo/brand
        var logo_positions = ub.data.logos;
        if (typeof logo_positions !== "undefined" && logo_positions.length > 0) {
            this.controllers.logo = new LogoPanel("m-logo", logo_positions);
        }
    },

    setMenus: function() {
        var tabs_el = $('#property-modifiers-menu');

        // fabrics
        if (_.isEmpty(this.controllers.fabrics.fabrics)) {
            $('.menu-item-fabrics', tabs_el).remove();
        }

        // parts
        if (typeof ub.data.modifierLabel !== "undefined" && _.size(ub.data.modifierLabel) > 0) {
            $('.menu-item-parts', tabs_el).remove();
        }

        // pipings
        if (ub.funcs.isSocks()) { // display random feeds
            if (this.controllers.pipings.set_items.random_feed_set_items.length === 0) {
                $('.menu-item-pipings', tabs_el).remove();
            }
        } else if (PipingPanel.isValidToProcessPipings()) { // display pipings
            if (this.controllers.pipings.set_items.piping_set_items.length === 0) {
                $('.menu-item-pipings', tabs_el).remove();
            }
        } else {
            $('.menu-item-pipings', tabs_el).remove();
        }

        // logo
        if (typeof ub.data.logos === "undefined" || ub.data.logos.length < 1) {
            $('.menu-item-logo', tabs_el).remove();
        }

        $('a', tabs_el).each(function(index, el) {
            $(el).text(index + 1);
            $(el).attr("data-modifier-number", index + 1);
        });

        // click first menu item
        $('a:first', tabs_el).click();
    },

    enableDisableModifierMenu: function() { 
        $('#property-modifiers-menu a').removeClass('active');
        $('#property-modifiers-menu a').css('pointer-events', "auto");
        // Get Modifier number
        var modifier_number = $(this).data("modifier-number");
        ub.current_modifier = modifier_number;

        var first = $("#property-modifiers-menu .menu-item").first();
        var last = $("#property-modifiers-menu .menu-item").last();

        $(this).addClass('active');
        $(this).css('pointer-events', "none");

        if (first.hasClass("active")) {
            $("div.richardson-footer .richardson-onPrevious").css('pointer-events', 'none');
            $(".richardson-footer .richardson-onNext").css('pointer-events', 'auto');
        } else if (last.hasClass("active")) {
            $("div.richardson-footer .richardson-onPrevious").css('pointer-events', 'auto');
            $(".richardson-footer .richardson-onNext").css('pointer-events', 'none');
        } else {
            $("div.richardson-footer .richardson-onPrevious").css('pointer-events', 'auto');
            $(".richardson-footer .richardson-onNext").css('pointer-events', 'auto');
        }
    },

    updateLeftPanel: function() {
        RichardsonSkin.funcs.perspectiveThumbnailAutoUpdate();
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
        var fabric_panel = ub.modifierController.controllers.fabrics.getPanel();
        ub.modifierController.propertiesPanel.setBodyPanel(fabric_panel);
    },

    parts: function(_this) {
        ub.modifierController.clearControls();
        ub.funcs.activeStyle('colors');

        var part_panel = ub.modifierController.controllers.parts.getPanel();
        ub.modifierController.propertiesPanel.setBodyPanel(part_panel);

        _.delay(function() {
            if (ub.current_part === 0) {
                $(".modifier_main_container #primary_options_colors .jersey-location-buttons").first().trigger("click");
            } else {
                $(".modifier_main_container #primary_options_colors .jersey-location-buttons[data-modifier-index='"+ ub.current_part +"']").trigger("click");
            }
        }, 100);

        // Bind Events
        ub.modifierController.propertiesPanel.bindEvents();
        GradientPanel.events.init();

        $("#primary_options_container").scrollTo(0);
    },

    pipings: function() {
        if (ub.funcs.popupsVisible()) { return; }
        if (!ub.funcs.okToStart())    { return; }

        var piping_panel;

        if (ub.funcs.isSocks()) { // display random feeds
            var random_feed_panel = ub.modifierController.controllers.pipings.getPanel();
            ub.modifierController.propertiesPanel.setBodyPanel(random_feed_panel);

            RandomFeedPanel.events.init();
            RandomFeedPanel.setInitialState();
        } else if (PipingPanel.isValidToProcessPipings() && ub.data.pipings.length !== 0) { // display pipings
            ub.funcs.activatePanelGuard();
            ub.funcs.deactivatePanels();

            piping_panel = ub.modifierController.controllers.pipings.getPanel();
            ub.modifierController.propertiesPanel.setBodyPanel(piping_panel);

            PipingPanel.events.init();
            PipingPanel.setInitialState();
        }
    },

    letters: function() {
        LetterPanel.init();
        $("#primary_options_container").scrollTo(0);
    },

    numbers: function() {
        var numberPanel = ub.modifierController.controllers.numbers;
        ub.modifierController.propertiesPanel.setBodyPanel(numberPanel.getPanel());

        NumbersPanel.events.init(numberPanel);
        NumbersPanel.renderLocations(numberPanel.getLocations());

        $("#primary_options_container").scrollTo(0);
    },

    applications: function() {
        MascotPanel.init();
        $("#primary_options_container").scrollTo(0);
    },

    logo: function() {
        var logo_positions = ub.data.logos;

        if (typeof logo_positions !== "undefined" && logo_positions.length > 0) {
            var current_position = LogoPanel.utilities.getActiveRLogo();
            var logo_panel = ub.modifierController.controllers.logo.getPanel();
            ub.modifierController.propertiesPanel.setBodyPanel(logo_panel);
            // Render Current location of Richardson logo
            if (typeof current_position !== "undefined") {
                var configuration = LogoPanel.configurations.getConfiguration(ub.config.blockPattern, current_position.position);
                if (typeof configuration !== "undefined") {
                    $('a.change-view[data-view="'+ configuration.perspective +'"]').trigger('click');
                }

                // Activate logo current position
                $(".modifier_main_container #primary_option_logo .logo-perspective-btn-container li[data-position='"+ current_position.position +"']").addClass('uk-active');
                $(".modifier_main_container #primary_option_logo .logo-perspective-btn-container li[data-position='"+ current_position.position +"']").find("a").addClass("uk-disabled");
                var image = ub.getThumbnailImage(ub.active_view + "_view");

                $("#logo-preview").css({
                    'background-image': "url("+ image +")"
                });

                if (ub.config.blockPattern === "PTS Hoodie") {
                    $("#logo-preview").css({
                        'background-position': "bottom"
                    });
                }

                $("#logo-preview").show();
                $(".logo-image-loader").hide();
            } else {
                ub.utilities.error("No active Richardson Logo");
            }
        }
    },

    roster: function() {
        RosterPanel.events.init();
        RosterPanel.events.onShowRoster();
    }
};

ModifierController.scrollToOptions = function (application_type, application_id, application_code) {
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

    _.delay(function() {
        $('.modifier_main_container').scrollTo($('li[data-application-id=' + application_id + '].applicationUIBlockNew'));
    }, 500);

    ub.funcs.activateMoveTool(application_code);
};

ModifierController.deleteApplicationContainer = function (application_id) {
    $('.modifier_main_container').find($('li[data-application-id=' + application_id + '].applicationUIBlockNew')).remove();
}

ModifierController.dropdownLinks = function() {
    var _group_id = $(this).data('group-id');
    var _fullname = $(this).data('fullname');
    var _name = $(this).data('name');
    var _ctr = $(this).data('ctr');
    var _ht = _name;
    var _sizeOfTeamColors = _.size(ub.current_material.settings.team_colors);

    if (_fullname === 'team-colors' || _sizeOfTeamColors <= 1) {
        // Add `thread_colors` flag in ub.current_material.settings
        // if the category of uniform is `Socks (Apparel)`
        // and base on the truthiness of the flag, thread colors will be used
        if (_.isEqual(ub.current_material.material.uniform_category, 'Socks (Apparel)')
            && ub.funcs.isKnitted()) {

            if (_.isEqual(ub.page, 'builder')
                || ub.current_material.settings.threadColors === 'undefined') {

                ub.current_material.settings.threadColors = true;

            }

        }

        ub.funcs.initTeamColors();
        $pd.hide();
        $('div#right-main-window').css('overflow', 'hidden');

        return;
    }

    var _index = ub.funcs.getIndexByName(_fullname);
    ub.current_part = _index;

    if (_name.includes("Insert") || _name.includes("Piping") || _name.includes("Panel"))
    {
        if ($("#primary_options_container #parts-with-insert-container").length === 0) {
            $('#property-modifiers-menu .menu-item-inserts').trigger('click');
        }
    }
    else
    {
        if ($("#primary_options_container .parts-container").length === 0) {
            $('#property-modifiers-menu .menu-item-parts').trigger('click');
        }
    }

    PropertiesPanel.prototype.activePanelbyIndex(_index);
    $('div#right-main-window').css('overflow', 'hidden');
    $pd.hide();
    return;
}