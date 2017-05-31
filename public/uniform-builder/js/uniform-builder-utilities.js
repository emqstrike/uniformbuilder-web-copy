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

    /// Benchmarks

        ub.startTime = function () {

            ub.startTime = new Date();
            ub.utilities.info('Start Time: ' + ub.startTime);

        }

        ub.getElapsedTime = function () {

            var dateNow = new Date();
            var timeDiff = dateNow - ub.startTime;

            // strip the ms
            // timeDiff /= 1000;

            // get seconds (Original had 'round' which incorrectly counts 0:28, 0:29, 1:30 ... 1:59, 1:0)
            var seconds = Math.round(timeDiff);

            return seconds / 1000;

        }

        ub.funcs

        ub.displayDoneAt = function (str) {

            ub.utilities.info(ub.getElapsedTime() + ' sec.\t' + (typeof str !== "undefined" ? str + ' ' : '') + 'done at ');  

        }

        ub.startTime();

    /// End Benchmarks


});