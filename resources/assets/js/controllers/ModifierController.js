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

        if (ub.funcs.isSocks()) { // display random feeds
            // ub.funcs.activateBody();

            // if ($('div#randomFeeds-panel').is(':visible')) {

            //     $('div#randomFeeds-panel').removeClass('on').addClass('off');
            //     $('a.change-view[data-view="randomFeed"]').removeClass('active-change-view');

            // } else {

            //     $('div#randomFeeds-panel').removeClass('off').addClass('on');
            //     $('a.change-view[data-view="randomFeed"]').addClass('active-change-view');

            // }

            // var $randomFeedsPanel = $('div#randomFeeds-panel');
            // $randomFeedsPanel.unbind('mousedown');
            // $randomFeedsPanel.mousedown(ub.funcs.handle_mousedown);

            var random_feed_sets = ub.funcs.getRandomFeedSets();

            var random_feed_set_items = _.map(random_feed_sets, function(random_feed_type) {
                // var active_piping_set = PipingPanel.getActivePipingSet(piping_type);
                // var piping_set = piping_type;

                // if (active_piping_set !== "undefined") {
                //     piping_set = ub.funcs.getPipingSet(piping_type);
                // }

                // var sizes = ub.funcs.sortPipingSizes({items: piping_set});
                // var colors = ub.funcs.getPipingColorArray(active_piping_set);

                // var modifier = piping_type.toLowerCase().replace(/ /g, "-")

                // return {
                //     sizes: sizes.items,
                //     colors: colors,
                //     type: piping_type,
                //     type_wo_left_prefix: piping_type.indexOf('Left') === 0 ? piping_type.replace("Left", "") : piping_type,
                //     modifier: modifier
                // };
                
                return {
                    type: random_feed_type
                }
            });

            var template = $('#random-feeds-list').html();

            $('#primary_options_container').html(Mustache.render(template, {
                random_feed_set_items: random_feed_set_items
            }));

            RandomFeedPanel.events.init();

            // initial state
            _.map(random_feed_sets, function(random_feed_type) {
                // var active_piping_set = PipingPanel.getActivePipingSet(piping_type);
                // var status = PipingPanel.getPipingPanelStatus(piping_type);
                // var pipping_settings_object = ub.funcs.getPipingSettingsObject(active_piping_set.set);

                // var piping_item_el = $('#pipingsUI .piping-item[data-piping-type="'+piping_type+'"]');

                // if (pipping_settings_object.enabled === 1 && pipping_settings_object.size !== "") {
                //     $('.piping-sizes-buttons[data-size="' + pipping_settings_object.size + '"]', piping_item_el).click();
                // }

                // var temporary_status = status === PipingPanel.STATUS_ON ? PipingPanel.STATUS_OFF : PipingPanel.STATUS_ON;

                // $('.toggle', piping_item_el).data('status', temporary_status);
                // $('.toggleOption.'+temporary_status, $('.toggle', piping_item_el)).click();
                
                // var active_piping_set = PipingPanel.getActivePipingSet(piping_type);
                // var status = PipingPanel.getPipingPanelStatus(piping_type);
                // var pipping_settings_object = ub.funcs.getPipingSettingsObject(active_piping_set.set);

                var active_random_feed_set = RandomFeedPanel.getActiveRandomFeedSet(random_feed_type);
                var status = (typeof active_random_feed_set !== "undefined" && active_random_feed_set.enabled === 1) ? "on" : "off";

                var random_feed_item_el = $('#randomFeedsUI .random-feed-item[data-random-feed-type="'+random_feed_type+'"]');

                var temporary_status = status === RandomFeedPanel.STATUS_ON ? RandomFeedPanel.STATUS_OFF : RandomFeedPanel.STATUS_ON;

                $('.toggle', random_feed_item_el).data('status', temporary_status);
                $('.toggleOption.'+temporary_status, $('.toggle', random_feed_item_el)).click();



                // hindi sure kung kelangan
                // var random_feed_item_el = $('#randomFeedsUI .random-feed-item[data-random-feed-type="'+random_feed_type+'"]');

                // var active_random_feed_set = RandomFeedPanel.getActiveRandomFeedSet(random_feed_type);
                // var random_feed_settings_object = ub.funcs.getRandomFeedSettingsObject(active_random_feed_set.set);
                // var size = random_feed_settings_object.size;

                // if (typeof random_feed_settings_object !== "undefined") {
                //     if (random_feed_settings_object.enabled === 1 && random_feed_settings_object.size !== "") {
                //         $('span.randomFeed-sizes-buttons[data-size="' + size + '"]').trigger('click');
                //     }
                // }
            });

            $('#randomFeedsUI').fadeIn();

            // ub.funcs.updateRandomFeedsPanel();






            // $('div.randomFeeds-header > span.close').on('click', function () {

            //     ub.funcs.hideRandomFeedsPanel();

            // });


            // $('div#randomFeeds-panel > span.close').unbind('click');
            // $('div#randomFeeds-panel > span.randomFeeds-close').on('click', function (){
            //     ub.funcs.showRandoFeedPanel();   
            // });

            // // Activate First randomFeed Set

            // $('span.randomFeed').first().trigger('click')

            // // End Activate First randomFeed Set 


        } else if (PipingPanel.isValidToProcessPipings()) { // display pipings
            ub.funcs.activatePanelGuard();
            ub.funcs.deactivatePanels();

            ub.modifierController.pipings = new PipingPanel('m-piping-sidebar-new');
            ub.modifierController.pipings.setPipingSetItems();

            var piping_panel = ub.modifierController.pipings.getPanel();
            properties_panel.setBodyPanel(piping_panel);

            PipingPanel.events.init();
            PipingPanel.setInitialState();
        } else { // no pipings
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