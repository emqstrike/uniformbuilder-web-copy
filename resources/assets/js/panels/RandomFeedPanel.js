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
RandomFeedPanel.events = {
    is_init_events_called: 0,

    init: function() {
        if (RandomFeedPanel.events.is_init_events_called === 0) {
            // $('div#randomFeeds-panel > span.randomFeeds-close')
            // $('div#randomFeeds-panel').mousedown(ub.funcs.handle_mousedown)
            // $('.randomFeed')
            
            $(".modifier_main_container").on("click", "#randomFeedsUI .toggleOption", RandomFeedPanel.events.togglePiping);

            RandomFeedPanel.events.is_init_events_called = 1;
        }
    },

    togglePiping: function() {
        var toggle_el = $(this).closest('.toggle');
        var status = toggle_el.data('status');
        console.log(status);

        if (status === RandomFeedPanel.STATUS_ON) {
            toggle_el.data('status', RandomFeedPanel.STATUS_OFF);

            $('.valueContainer', toggle_el).css('margin-left', '-100px');
            // $('.cover').fadeIn('fast');
            toggle_el.removeClass('defaultShadow');
        } else {
            toggle_el.data('status', RandomFeedPanel.STATUS_ON);

            $('.valueContainer', toggle_el).css('margin-left', '0px');
            // $('.cover').hide();
            toggle_el.addClass('defaultShadow');

            // $('.randomFeed-colors-buttons[data-value="2"]').click();
        }

        // _state === "on" ? $('span.header-type').hide() : $('span.header-type').show();
    }
}

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