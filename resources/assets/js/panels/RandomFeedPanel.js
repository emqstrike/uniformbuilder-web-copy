function RandomFeedPanel(element) {
    this.panel = document.getElementById(element);
}

RandomFeedPanel.prototype = {
    constructor: RandomFeedPanel,

    getPanel: function() {
        var rendered = Mustache.render(this.panel.innerHTML);
        return rendered;
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
            // $('div#randomFeeds-panel > span.randomFeeds-close')
            // $('div#randomFeeds-panel').mousedown(ub.funcs.handle_mousedown)
            // $('.randomFeed')
            
            $(".modifier_main_container").on("click", "#randomFeedsUI .toggleOption", RandomFeedPanel.events.onToggleRandomFeed);
            // $(".modifier_main_container").on("click", "#randomFeedsUI .randomFeed-colors-buttons", RandomFeedPanel.events.onRandomFeedColorButtonClick);

            RandomFeedPanel.events.is_init_events_called = 1;
        }
    },

    onToggleRandomFeed: function() {
        var toggle_random_feed_el = $(this).closest('.toggle');
        var status = toggle_random_feed_el.data('status');

        if (status === RandomFeedPanel.STATUS_ON) {
            toggle_random_feed_el.data('status', RandomFeedPanel.STATUS_OFF);

            $('.valueContainer', toggle_random_feed_el).css('margin-left', '-100px');
            // $('.cover').fadeIn('fast');
            toggle_random_feed_el.removeClass('defaultShadow');

            RandomFeedPanel.hideColors(toggle_random_feed_el);
        } else {
            toggle_random_feed_el.data('status', RandomFeedPanel.STATUS_ON);

            $('.valueContainer', toggle_random_feed_el).css('margin-left', '0px');
            // $('.cover').hide();
            toggle_random_feed_el.addClass('defaultShadow');

            // $('.randomFeed-colors-buttons', toggle_random_feed_el).click();
            RandomFeedPanel.showColors(toggle_random_feed_el)
        }

        // _state === "on" ? $('span.header-type').hide() : $('span.header-type').show();
    }
}

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

    var matchingName = ""
    var matchingRandomFeedObject = undefined;
    var matchingRandomFeedSettingsObject = undefined;

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

    ub.funcs.setupSmallColorPickerEvents(randomFeedObject, randomFeedSettingsObject, matchingRandomFeedObject, matchingRandomFeedSettingsObject);
    ub.funcs.initRandomFeedColors(randomFeedObject, selectedColorArray[0]);
    ub.funcs.renderRandomFeed(randomFeedObject, color_value);

    _.each(randomFeedSettingsObject.layers, function (layer) {
        if (layer.colorCode !== "") {
            $('.colorItem[data-layer-no="' + (layer.layer) + '"][data-color-code="' + layer.colorCode + '"]', random_feed_item_el).trigger('click');
        }
    });
};

RandomFeedPanel.hideColors = function(toggle_random_feed_el) {
    var random_feed_item_el = toggle_random_feed_el.closest('.random-feed-item');
    $('.colorContainer', random_feed_item_el).html("");
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