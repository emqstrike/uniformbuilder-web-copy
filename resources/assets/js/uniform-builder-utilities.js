$(document).ready(function() {

    // TODO: (Refactor) Transfer functions from window.util to here

    ub.utilities = {

        maintenanceMessage: function () {

            var template = $('#m-maintenance-message').html();
            var data = { date: ''};
            var markup = Mustache.render(template, data);

            var dialog = bootbox.dialog({
                title: 'Maintenance Schedule',
                message: markup,
            });

            dialog.init(function() {});

        },

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

        proggError: function (msg, type, user) {

            // Programming Error Message should be funneled using this 

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

        },

        buildTemplateString: function (templateID, data) {

            var template = $(templateID).html();
            var markup = Mustache.render(template, data);

            return markup;

        },

        // Safe Clone JS Object
        cloneObject: function (object) {

            return JSON.parse(JSON.stringify(object));

        },

        getJSON: function(url, successHandler, errorHandler) {
            var xhr = typeof XMLHttpRequest != 'undefined'
                ? new XMLHttpRequest()
                : new ActiveXObject('Microsoft.XMLHTTP');
            xhr.open('get', url, true);
            xhr.onreadystatechange = function() {
                var status;
                var data;
                // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
                if (xhr.readyState == 4) { // `DONE`
                    status = xhr.status;
                    if (status == 200) {
                        data = JSON.parse(xhr.responseText);
                        successHandler && successHandler(data);
                    } else {
                        errorHandler && errorHandler(status);
                    }
                }
            };
            xhr.send();
        },

        postJSON: function(url, params, successHandler, errorHandler) {
            var xhr = typeof XMLHttpRequest != 'undefined'
                ? new XMLHttpRequest()
                : new ActiveXObject('Microsoft.XMLHTTP');
            xhr.withCredentials = true;
            xhr.open('post', url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = function() {
                var status;
                var data;
                // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
                if (xhr.readyState == 4) { // `DONE`
                    status = xhr.status;
                    if (status == 200) {
                        data = JSON.parse(xhr.responseText);
                        successHandler && successHandler(data);
                    } else {
                        errorHandler && errorHandler(status);
                    }
                }
            };
            var data = JSON.stringify(params);
            xhr.send(data);
        },

        // Parse single qoute &#039; appearing in place of ' (single qoutes), 
        // normally used when filtering collections using the Neck Option and Block Pattern Fields 
        
        domParserDecoder: function (str) {

            var parser = new DOMParser;
            var dom = parser.parseFromString(
                '<!doctype html><body>' + str,
                'text/html');
            var decodedString = dom.body.textContent;

            return decodedString;

        },

        underscoreToWhitespace(haystack) {
            haystack.replace('left_', '').replace('right_', '');
            return haystack.replace(/_/g, ' ');
        },

        titleCase: function(str) {
            return str.toLowerCase().split(' ').map(function(word) {
                if (!word[0]) return;
                return word.replace(word[0], word[0].toUpperCase());
            }).join(' ');
        }
    };

    /// Benchmarks

        // Uniform Pickers Loader
        
            ub.pickersDialog = undefined;

            ub.pickersStartTime = function () {

                if (ub.page !== "builder") { return; }

                ub.startTime = new Date();
                
                // var template = $('#m-loading-screen').html();
                // var data = { 
                //     startTime: ub.startTime, 
                //     title: 'Preparing Style List', 
                //     logo: ub.branding.logoUrl 
                // };

                // var markup = Mustache.render(template, data);

                // ub.pickersDialog = bootbox.dialog({
                //     message: markup,
                //     backdrop: true,
                //     className: 'loading-dialog-pickers',
                // });
                
                $('div.debug-panel').addClass('pickersLoader')

            }

        // End Uniform Pickers Loader



        var loadingDialog = undefined;

        ub.startTime = function () {

            ub.startTime = new Date();

            ub.utilities.info(ub.config.uniform_name + ' - ' + ub.config.sport);
            ub.utilities.info('');

            // var template = $('#m-loading-screen').html();
            // var data = {
            //     startTime: ub.startTime,
            //     title: '',
            //     uniformName: ub.config.uniform_name + ' - ' + ub.config.sport,
            //     logo: ub.branding.logoUrl
            // };

            // var markup = Mustache.render(template, data);

            // loadingDialog = bootbox.dialog({
            //     message: markup,
            //     backdrop: true,
            //     className: 'loading-dialog',
            // });

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

        var b = '';
        ub.displayDoneAt = function (str) {

            if (ub.page !== "builder") { return; }  

            var _line;
            var _class = '';
            var _consoleLine;
            var _a;
            var _nameString;
            
            if (str === 'Rendering awesomeness ...') {
                ub.funcs.addFunctionToAfterloadList(function() {
                    /// Hide loading after .5 sec done
                    setTimeout(function () { 
                        $('div.debug-panel').fadeOut();
                    }, 500);
                });
                
                _line = str + " <span class='time'>" +  ub.getElapsedTime() + ' secs.</span>';  
                _class = 'awesomeness';

            } else {

                _line = '[<span class="time">' + ub.getElapsedTime() + ' sec.</span> ]\t' + (typeof str !== "undefined" ? str + ' ' : '');  

            }

            _consoleLine = _line.replace('&nbsp;', ' ');
            
            _consoleLine = _consoleLine.replace('<br />', '');
            _consoleLine = _consoleLine.replace('<strong>', '');
            _consoleLine = _consoleLine.replace('<strong class="light">', '');
            _consoleLine = _consoleLine.replace('</strong>', '');
            _consoleLine = _consoleLine.replace('class="light"', '');

            ub.utilities.info(_consoleLine);
            
            _a = '<span class="load-line ' + _class + '">' + _line + '</span>';

            $('div.loading-messages').append(_a);

            _nameString = 'Loading ' + ub.config.uniform_name + ' [' + ub.config.sport + ']';

            if (ub.config.uniform_name  === "none" || ub.config.sport === "none") { _nameString = "Loading Pickers..."; }

            ub.updateDebugPanel('', _a, _nameString);
            
            $('span.load-line').fadeIn(); 

        }

        ub.funcs.closePickersDialog = function () {

            setTimeout(function(){
               $('div.debug-panel').fadeOut();
            }, 100);

        }

        ub.funcs.is_pts_signature = function() {
            return ub.config.blockPattern.toLowerCase().indexOf("pts signature") !== -1;
        };

        ub.funcs.is_pro_select = function() {
            return ub.config.blockPattern.toLowerCase().indexOf("pts pro select") !== -1;
        };

        ub.funcs.is_sublimated = function() {
            return ub.config.uniform_application_type === "sublimated";
        };

        ub.funcs.is_twill = function() {
            return ub.config.uniform_application_type === "tackle_twill";
        };

        ub.funcs.is_infused = function() {
            return ub.config.uniform_application_type === "infused";
        };

        ub.funcs.is_upper = function() {
            return ub.config.type === "upper";
        };

        ub.funcs.is_lower = function() {
            return ub.config.type === "lower";
        };

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