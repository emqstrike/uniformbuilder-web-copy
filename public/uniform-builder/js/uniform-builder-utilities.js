$(document).ready(function() {

    // TODO: (Refactor) Transfer functions from window.util to here

    ub.utilities = {

        warn: function (msg, type, user) {

            // TODO: Persist / Log warnings to storage
            // TODO: (Refactor) Funnel all warnings through here

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

        // Uniform Pickers Loader
        
            ub.pickersDialog = undefined;

            ub.pickersStartTime = function () {

                if (ub.page !== "builder") { return; }

                ub.startTime = new Date();
                
                var template = $('#m-loading-screen').html();
                var data = { startTime: ub.startTime, title: 'Preparing Style List', };
                var markup = Mustache.render(template, data);

                ub.pickersDialog = bootbox.dialog({
                    message: markup,
                    backdrop: true,
                    className: 'loading-dialog-pickers',
                });

            }

        // End Uniform Pickers Loader



        var loadingDialog = undefined;

        ub.startTime = function () {

            ub.startTime = new Date();

            ub.utilities.info(ub.config.uniform_name + ' - ' + ub.config.sport);
            ub.utilities.info('');

            var template = $('#m-loading-screen').html();
            var data = {
                startTime: ub.startTime,
                title: '',
                uniformName: ub.config.uniform_name + ' - ' + ub.config.sport,
            };

            var markup = Mustache.render(template, data);

            loadingDialog = bootbox.dialog({
                message: markup,
                backdrop: true,
                className: 'loading-dialog',
            });

        }

        ub.getElapsedTime = function () {

            var dateNow = new Date();
            var timeDiff = dateNow - ub.startTime;

            // strip the ms
            // timeDiff /= 1000;

            // get seconds (Original had 'round' which incorrectly counts 0:28, 0:29, 1:30 ... 1:59, 1:0)
            var seconds = Math.round(timeDiff);

            seconds = (seconds / 1000);
            seconds = seconds.toFixed(4)
            seconds = seconds.toString().lpad('&nbsp;', 7);

            return seconds;

        }

        ub.displayDoneAt = function (str) {

            var _line;
            var _class = '';

            if (str === 'Awesomess loading completed.') {

                /// Hide loading after 1 sec done
                setTimeout(function() { 

                  loadingDialog.modal('hide');

                }, 500);

                _line = '<br />' + str + " <strong>" +  ub.getElapsedTime() + ' secs.</strong>';  
                _class = 'awesomeness';

            } else {

                _line = '[<strong class="light">' + ub.getElapsedTime() + ' sec.</strong> ]\t' + (typeof str !== "undefined" ? str + ' ' : '');  

            }

            var _consoleLine = _line.replace('&nbsp;', ' ')
            
            _consoleLine = _consoleLine.replace('<br />', '');
            _consoleLine = _consoleLine.replace('<strong>', '');
            _consoleLine = _consoleLine.replace('</strong>', '');
            _consoleLine = _consoleLine.replace('class="light"', '');

            ub.utilities.info(_consoleLine);
            
            var _a = '<span class="load-line ' + _class + '">' + '<br />' + _line + '</span>';

            $('div.loading-messages').append(_a);

            $('span.load-line').fadeIn(); 

        }

        ub.funcs.closePickersDialog = function () {

            setTimeout(function(){ 
                ub.pickersDialog.modal('hide');
            }, 500);

        }


    /// End Benchmarks

    /// After Load Scripts 

        ub.afterLoadScripts = function () { 
        
            if (ub.config.app_env === "local") {
                ub.utilities.info('Local environment detected, skipping afterload scripts.');
            } else {
               $.getScript('/uniform-builder/js/uniform-builder-after-load-scripts.js');     
            }
            
        }

    /// End After Load Scripts


});