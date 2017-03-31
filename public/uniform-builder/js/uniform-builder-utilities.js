$(document).ready(function() {

    // TODO: (Refactor) Transfer functions from window.util to here

    ub.utilities = {

        warn: function (msg, type, user) {

            // TODO: Persist / Log warnings to storage
            // TODO: (Refactor) Funnel all warnings through here

            console.trace();
            console.warn(msg);

        },

        error: function (msg, type, user) {

            // TODO: Persist / Log error to storage
            // TODO: (Refactor) Funnel all errors through here

            console.trace();
            console.error(msg);

        },

        info: function (msg, type, user) {

            // TODO: Persist / Log to storage
            // TODO: (Refactor) Funnel all info messages through here

            console.info(msg);

        },

        actionLog: function (msg, type, user) {

            // TODO: Persist / Log to storage
            // TODO: (Refactor) Funnel all user action here ...

            console.info(msg);

        }

    };

});