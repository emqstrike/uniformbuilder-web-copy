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
                type: random_feed_type
            };
        });

        this.set_items = {random_feed_set_items: random_feed_set_items};
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
            $(".modifier_main_container").on("click", "#randomFeedsUI .toggleOption", RandomFeedPanel.events.onToggleRandomFeed);
            $(".modifier_main_container").on("click", "#randomFeedsUI .colorItem", RandomFeedPanel.events.onColorItemClick);

            RandomFeedPanel.events.is_init_events_called = 1;
        }
    },

    onToggleRandomFeed: function() {
        var toggle_random_feed_el = $(this).closest('.toggle');
        var status = toggle_random_feed_el.data('status');

        var random_feed_item_el = $(this).closest('.random-feed-item');
        var random_feed_type = random_feed_item_el.data('random-feed-type');

        if (status === RandomFeedPanel.STATUS_ON) {
            ub.funcs.removeRandomFeed(random_feed_type);

            if (random_feed_type.indexOf('Left') === 0) {
                var matchingSide = ub.funcs.getMatchingSide(random_feed_type);
                ub.funcs.removeRandomFeed(matchingSide);
            }

            $('.valueContainer', toggle_random_feed_el).css('margin-left', '-100px');
            toggle_random_feed_el.removeClass('defaultShadow');

            RandomFeedPanel.hideColors(toggle_random_feed_el);

            toggle_random_feed_el.data('status', RandomFeedPanel.STATUS_OFF);
        } else {
            $('.valueContainer', toggle_random_feed_el).css('margin-left', '0px');
            toggle_random_feed_el.addClass('defaultShadow');

            RandomFeedPanel.showColors(toggle_random_feed_el);

            toggle_random_feed_el.data('status', RandomFeedPanel.STATUS_ON);
        }
    },

    onColorItemClick: function() {
        if ($(this).hasClass('turnOff')) {
            /// insert code here...
            return;
        }

        var random_feed_item_el = $(this).closest('.random-feed-item');
        var random_feed_type = random_feed_item_el.data('random-feed-type');

        var _layer_no   = $(this).data('layer-no');
        var _color_code = $(this).data('color-code');
        var _layer_name = $(this).data('layer-name');
        var _temp       = $(this).data('temp');
        var _colorObj   = ub.funcs.getColorByColorCode(_color_code);

        var active_random_feed = RandomFeedPanel.getActiveRandomFeedSet(random_feed_type);
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

        ub.funcs.changeRandomFeedColor(_colorObj, _layer_no, randomFeedObject);
        RandomFeedPanel.changeActiveColor(_layer_no, _color_code, _colorObj, random_feed_item_el);

        var _layer = _.find(randomFeedSettingsObject.layers, {layer: parseInt(_layer_no)});

        if (typeof _layer !== "undefined") {

            _layer.colorCode = _color_code;
            _layer.colorObj = _colorObj;
        
        }
        
        if (typeof matchingRandomFeedObject !== "undefined") {

            ub.funcs.changeRandomFeedColor(_colorObj, _layer_no, matchingRandomFeedObject);

            var _matchingLayer         = _.find(matchingRandomFeedSettingsObject.layers, {layer: parseInt(_layer_no)});

            if (typeof _matchingLayer !== "undefined") {

                _matchingLayer.colorCode   = _color_code;
                _matchingLayer.colorObj    = _colorObj;

            }
            
        }
    }
};

RandomFeedPanel.showColors = function(toggle_random_feed_el) {
    var random_feed_item_el = toggle_random_feed_el.closest('.random-feed-item');
    var random_feed_type = random_feed_item_el.data('random-feed-type');

    var color_value = RandomFeedPanel.ACTIVE_RANDOM_FEED_COLOR_BUTTON;
    var color_type = "color " + color_value;

    var active_random_feed = RandomFeedPanel.getActiveRandomFeedSet(random_feed_type);
    var randomFeedObject = _.find(ub.data.randomFeeds, {name: active_random_feed.name});
    var randomFeedSettingsObject = ub.funcs.getRandomFeedSettingsObject(active_random_feed.set);

    var colorPickerHtml = ub.funcs.drawRandomFeedColorPickers(randomFeedObject, color_value, randomFeedSettingsObject);
    var selectedColorArray = ub.current_material.settings.team_colors;

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

    $('.colorContainer', random_feed_item_el).html(colorPickerHtml);

    ub.funcs.initRandomFeedColors(randomFeedObject, selectedColorArray[0]);
    ub.funcs.renderRandomFeed(randomFeedObject, color_value);

    _.each(randomFeedSettingsObject.layers, function (layer) {
        if (layer.colorCode !== "") {
            $('.colorItem[data-layer-no="' + (layer.layer) + '"][data-color-code="' + layer.colorCode + '"]', random_feed_item_el).click();
        }
    });
};

RandomFeedPanel.hideColors = function(toggle_random_feed_el) {
    var random_feed_item_el = toggle_random_feed_el.closest('.random-feed-item');
    $('.colorContainer', random_feed_item_el).html("");
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
        var status = (typeof active_random_feed_set !== "undefined" && active_random_feed_set.enabled === 1) ? "on" : "off";

        var random_feed_item_el = $('#randomFeedsUI .random-feed-item[data-random-feed-type="'+random_feed_type+'"]');

        var temporary_status = status === RandomFeedPanel.STATUS_ON ? RandomFeedPanel.STATUS_OFF : RandomFeedPanel.STATUS_ON;

        $('.toggle', random_feed_item_el).data('status', temporary_status);
        $('.toggleOption.'+temporary_status, $('.toggle', random_feed_item_el)).click();
    });

    $('#randomFeedsUI').fadeIn();
};