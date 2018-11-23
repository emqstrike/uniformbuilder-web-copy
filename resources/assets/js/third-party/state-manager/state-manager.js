(function($) {
    $.fn.stateManager = function(options) {
        var settings = $.extend({}, $.fn.stateManager.defaults, options);

        console.log("settings", settings);

        var leave_states = ["beforeLeave", "leave", "afterLeave",];
        var load_states = ["beforeLoad", "load", "afterLoad"];

        var previous_item = null;
        var current_item = null;

        this.on(settings.events, function() {
            current_item = $(this).data('item');

            if (previous_item !== null) {
                runEvents(previous_item, leave_states);
            }

            runEvents(current_item, load_states);
            previous_item = current_item;
        });

        function runEvents(item, states) {
            var state;

            for (var j in states) {
                state = states[j];

                if (typeof(settings[item]) !== "undefined") {
                    if (typeof(settings[item][state]) !== "undefined") {
                        if (settings.enabledStateLogs) {
                            console.log("%c" + item + " " + state + " - Start", "color: blue");
                            settings[item][state]();
                            console.log("%c" + item + " " + state + " - Finish", "color: green");
                        } else {
                            settings[item][state]();
                        }
                    }
                }
            }
        }
    };

    $.fn.stateManager.defaults = {
        events: "click",
        enabledStateLogs: false
    };
}(jQuery));