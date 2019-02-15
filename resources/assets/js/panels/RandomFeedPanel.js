function RandomFeedPanel(element) {
    this.panel = document.getElementById(element);
    this.set_items = {};
}

RandomFeedPanel.prototype = {
    constructor: RandomFeedPanel,

    getPanel: function() {
        var rendered = Mustache.render(this.panel.innerHTML, this.set_items);
        return rendered;
    },

    setRandomFeedSetItems: function() {
        var random_feed_sets = ub.funcs.getRandomFeedSets();

        var random_feed_set_items = _.map(random_feed_sets, function(random_feed_type) {
            return {
                type: random_feed_type,
            };
        });

        this.set_items = {
            random_feed_set_items: random_feed_set_items,
            colors: ub.current_material.settings.team_colors
        };
    }
};

/**
 * static properties and functions
 */
RandomFeedPanel.STATUS_ON = "on";
RandomFeedPanel.STATUS_OFF = "off";
RandomFeedPanel.ACTIVE_RANDOM_FEED_COLOR_BUTTON = 2;
RandomFeedPanel.events = {
    is_init_events_called: 0,

    init: function() {
        if (RandomFeedPanel.events.is_init_events_called === 0) {
            $(".modifier_main_container").on('change', '.richardson-random-feed-ui .random-feed-option', function(event) {
                event.preventDefault();
                /* Act on the event */
                var status = $(this).val();
                var colorContainer = $(this).closest('.random-feed-item').find(".random-feed-color-container");
                var random_feed_item_el = $(this).closest('.random-feed-item');
                var random_feed_type = random_feed_item_el.data('random-feed-type');
                var active_random_feed = RandomFeedPanel.getActiveRandomFeedSet(random_feed_type);
                var randomFeedSettingsObject = ub.funcs.getRandomFeedSettingsObject(active_random_feed.set);

                if (status === "on") {
                    RandomFeedPanel.showColors(random_feed_type);
                    var activeButton = random_feed_item_el.find(".random-feed-color-container .random-feed-color-button.active");
                    var randomfeedButton = random_feed_item_el.find(".random-feed-color-container .random-feed-color-button");
                    activeButton.removeClass("active");
                    randomfeedButton.first().addClass("active");

                    // // Color Element
                    var activeColor = $(this).closest('.random-feed-item').find(".random-feed-color-container .color_element .active-color");
                    activeColor.removeClass("active-color")
                    activeColor.html("");

                    // // Layer One
                    var layerObj = _.find(randomFeedSettingsObject.layers, {layer: 1});
                    var layerColorElement = colorContainer.find('.random-feed-color-selector-button[data-color-code="'+ layerObj.colorCode +'"]');
                    RandomFeedPanel.addCheckOnSelectedColor(layerColorElement, layerObj.colorCode);

                    colorContainer.show();
                } else if (status === "off") {
                    ub.funcs.removeRandomFeed(random_feed_type);

                    if (random_feed_type.indexOf('Left') === 0) {
                        var matchingSide = ub.funcs.getMatchingSide(random_feed_type);
                        ub.funcs.removeRandomFeed(matchingSide);
                    }

                    colorContainer.hide();
                }
            });

            $(".modifier_main_container").on('click', '.random-feed-color-container .random-feed-color-button', function(event) {
                event.preventDefault();
                /* Act on the event */
                var random_feed_item_el = $(this).closest('.random-feed-item');
                var random_feed_type = random_feed_item_el.data('random-feed-type');
                var colorContainer = $(this).closest('.random-feed-item').find(".random-feed-color-container");
                var active_random_feed = RandomFeedPanel.getActiveRandomFeedSet(random_feed_type);
                var randomFeedSettingsObject = ub.funcs.getRandomFeedSettingsObject(active_random_feed.set);
                var layerID = $(this).data("layer");

                var layerObj = _.find(randomFeedSettingsObject.layers, {layer: layerID});

                // // Color Element
                var activeColor = $(this).closest('.random-feed-item').find(".random-feed-color-container .color_element .active-color");
                activeColor.removeClass("active-color")
                activeColor.html("");

                var layerColorElement = colorContainer.find('.random-feed-color-selector-button[data-color-code="'+ layerObj.colorCode +'"]');
                RandomFeedPanel.addCheckOnSelectedColor(layerColorElement, layerObj.colorCode);

                var randomFeedBtn = $(this).closest('.random-feed-item').find(".random-feed-color-button.active");
                randomFeedBtn.removeClass('active');
                $(this).addClass("active");
            });

            $(".modifier_main_container").on('click', '.random-feed-color-container .random-feed-color-selector-button', function(event) {
                event.preventDefault();
                /* Act on the event */
                var randomFeedType = $(this).closest('.random-feed-item').data("random-feed-type");
                // Remove previous active color
                var activeColor = $(this).closest('.random-feed-item').find(".random-feed-color-container .color_element .active-color");
                activeColor.removeClass("active-color")
                activeColor.html("");

                // Layer ID
                var layerID = $(this).closest('.random-feed-item').find(".random-feed-color-button.active").data("layer");
                var colorLabel = $(this).data("color-code");
                var _colorObj   = ub.funcs.getColorByColorCode(colorLabel);

                var active_random_feed = RandomFeedPanel.getActiveRandomFeedSet(randomFeedType);
                var randomFeedObject = _.find(ub.data.randomFeeds, {name: active_random_feed.name});
                var randomFeedSettingsObject = ub.funcs.getRandomFeedSettingsObject(active_random_feed.set);

                var matchingName = "";
                var matchingRandomFeedObject;
                var matchingRandomFeedSettingsObject;

                if (randomFeedObject.name.indexOf('Left') > -1) {
                    matchingName = ub.funcs.getMatchingSide(randomFeedObject.name);
                    matchingRandomFeedObject = _.find(ub.data.randomFeeds, {name: matchingName});
                }

                if (randomFeedObject.name.indexOf('Right') > -1) {
                    matchingName = ub.funcs.getMatchingSide(randomFeedObject.name);
                    matchingRandomFeedObject = _.find(ub.data.randomFeeds, {name: matchingName});
                }

                if (typeof matchingRandomFeedObject !== 'undefined') {
                    matchingRandomFeedSettingsObject = ub.funcs.getRandomFeedSettingsObject(matchingRandomFeedObject.set);
                    ub.funcs.changeRandomFeedSize(matchingRandomFeedSettingsObject, matchingRandomFeedObject, active_random_feed.size);
                }

                ub.funcs.changeRandomFeedColor(_colorObj, layerID.toString(), randomFeedObject);

                var _layer = _.find(randomFeedSettingsObject.layers, {layer: parseInt(layerID)});

                if (typeof _layer !== "undefined") {
                    _layer.colorCode = colorLabel;
                    _layer.colorObj = _colorObj;
                }

                if (typeof matchingRandomFeedObject !== "undefined") {
                    ub.funcs.changeRandomFeedColor(_colorObj, layerID, matchingRandomFeedObject);
                    var _matchingLayer         = _.find(matchingRandomFeedSettingsObject.layers, {layer: parseInt(layerID)});

                    if (typeof _matchingLayer !== "undefined") {
                        _matchingLayer.colorCode   = colorLabel;
                        _matchingLayer.colorObj    = _colorObj;
                    }
                }

                // Add new active color
                RandomFeedPanel.addCheckOnSelectedColor($(this), colorLabel);
            });

            RandomFeedPanel.events.is_init_events_called = 1;
        }
    },
};

RandomFeedPanel.showColors = function(random_feed_type) {
    var active_random_feed = RandomFeedPanel.getActiveRandomFeedSet(random_feed_type);
    var randomFeedObject = _.find(ub.data.randomFeeds, {name: active_random_feed.name});
    var randomFeedSettingsObject = ub.funcs.getRandomFeedSettingsObject(active_random_feed.set);
    var selectedColorArray = ub.current_material.settings.team_colors;

    console.log(randomFeedSettingsObject);

    ub.funcs.changeRandomFeedSize(randomFeedSettingsObject, randomFeedObject, active_random_feed.size);

    var matchingName = "";
    var matchingRandomFeedObject;
    var matchingRandomFeedSettingsObject;

    if (randomFeedObject.name.indexOf('Left') > -1) {
        matchingName = ub.funcs.getMatchingSide(randomFeedObject.name);
        matchingRandomFeedObject = _.find(ub.data.randomFeeds, {name: matchingName});
    }
    if (randomFeedObject.name.indexOf('Right') > -1) {
        matchingName = ub.funcs.getMatchingSide(randomFeedObject.name);
        matchingRandomFeedObject = _.find(ub.data.randomFeeds, {name: matchingName});
    }

    if (typeof matchingRandomFeedObject !== 'undefined') {
        matchingRandomFeedSettingsObject = ub.funcs.getRandomFeedSettingsObject(matchingRandomFeedObject.set);
        ub.funcs.changeRandomFeedSize(matchingRandomFeedSettingsObject, matchingRandomFeedObject, active_random_feed.size);
    }

    ub.funcs.initRandomFeedColors(randomFeedObject, selectedColorArray[0]);
    ub.funcs.renderRandomFeed(randomFeedObject, RandomFeedPanel.ACTIVE_RANDOM_FEED_COLOR_BUTTON);
};

RandomFeedPanel.changeActiveColor = function(layer_num, color_code, color_obj, random_feed_item_el, type) {
    var $smallPickerContainer = $('.smallPickerContainer[data-layer-no="' + layer_num + '"]', random_feed_item_el);
    var _checkMark = '<i class="fa fa-check" aria-hidden="true"></i>';
    var _checkMarkNone = '<i class="fa fa-ban" aria-hidden="true"></i>';
    var _type = typeof type === "undefined" ? "" : '[data-object-type="' + type + '"]';

    var $colorItems = $smallPickerContainer.find('span.colorItem' + _type).not('.turnOff').not('[data-color-code="none"]');

    $colorItems.html('&nbsp;');
    $colorItems.css('width', '25px');
    $colorItems.removeClass('activeColorItem');

    var $activeColorItem = $smallPickerContainer.find('span.colorItem' + _type + '[data-color-code="' + color_code + '"]').not('.turnOff');

    $activeColorItem.addClass('activeColorItem');
    $activeColorItem.css('width', '40px');

    if (color_code === "none") {
        $activeColorItem.html(_checkMarkNone);

    } else {
        $activeColorItem.css('color', '#fff');
        $activeColorItem.html(_checkMark);

        $smallPickerContainer.find('span.colorItem' + _type + '[data-color-code="none"]').css('color', '#eee').css('width', '25px');
    }
};

RandomFeedPanel.getActiveRandomFeedSet = function(random_feed_type) {
    var random_feed_set = random_feed_type;
    var active_random_feed_set = ub.current_material.settings.randomFeeds[random_feed_type];

    if (active_random_feed_set === "undefined") {
        active_random_feed_set    = _.first(random_feed_set);
    } else {
        random_feed_set          = ub.funcs.getRandomFeedSet(random_feed_type);
        active_random_feed_set    = _.first(random_feed_set);
    }

    return active_random_feed_set;
};

RandomFeedPanel.setInitialState = function() {
    var random_feed_sets = ub.funcs.getRandomFeedSets();

    _.map(random_feed_sets, function(random_feed_type) {
        var active_random_feed_set = RandomFeedPanel.getActiveRandomFeedSet(random_feed_type);
        var randomFeedSettingsObject = ub.funcs.getRandomFeedSettingsObject(active_random_feed_set.set);

        if (randomFeedSettingsObject.enabled) {
            // Show Buttons
            $('.random-feed-item[data-random-feed-type="'+ random_feed_type +'"] .random-feed-option').val("on").trigger('change');
        } else  {
            $('.random-feed-item[data-random-feed-type="'+ random_feed_type +'"] .random-feed-option').val("off").trigger('change');
        }
    });
};

RandomFeedPanel.addCheckOnSelectedColor = function(element, colorLabel) {
    element.html('<span class="fa fa-check fa-1x cp-margin-remove cp-padding-remove cp-fc-white"></span>');
    element.addClass('active-color');

    if (colorLabel === 'W'
        || colorLabel === 'Y'
        || colorLabel === 'CR'
        || colorLabel === 'S'
        || colorLabel === 'PK'
        || colorLabel === 'OP'
        || colorLabel === 'SG'
    ) {
        element.html('<span class="fa fa-check fa-1x cp-margin-remove cp-padding-remove cp-check-colors"></span>');
    }
}