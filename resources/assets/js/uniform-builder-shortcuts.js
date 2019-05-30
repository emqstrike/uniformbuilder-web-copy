/**
 * Based on http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * modified to be accesbile from the ub namespace
 */

 // Shortcuts

$(document).ready(function () {

    ub.shortcut = {
        'all_shortcuts':{},
        'add': function(shortcut_combination,callback,opt) {
            //Provide a set of default options
            var default_options = {
                'type':'keydown',
                'propagate':false,
                'disable_in_input':false,
                'target':document,
                'keycode':false
            };
            if(!opt) opt = default_options;
            else {
                for(var dfo in default_options) {
                    if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
                }
            }

            var ele = opt.target;
            if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
            var ths = this;
            shortcut_combination = shortcut_combination.toLowerCase();

            // The function to be called at keypress
            var func = function(e) {
                e = e || window.event;

                if(opt.disable_in_input) { // Don't enable shortcut keys in Input, Textarea fields
                    var element;
                    if(e.target) element=e.target;
                    else if(e.srcElement) element=e.srcElement;
                    if(element.nodeType==3) element=element.parentNode;

                    if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
                }

                // Find Which key is pressed
                var code = false;
                if (e.keyCode) code = e.keyCode;
                else if (e.which) code = e.which;
                var character = String.fromCharCode(code).toLowerCase();
                if(code == 188) character=","; // If the user presses, when the type is onkeydown
                if(code == 190) character="."; // If the user presses, when the type is onkeydown


                var keys = shortcut_combination.split("+");
                // Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
                var kp = 0;

                // Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
                var shift_nums = {
                    "`":"~",
                    "1":"!",
                    "2":"@",
                    "3":"#",
                    "4":"$",
                    "5":"%",
                    "6":"^",
                    "7":"&",
                    "8":"*",
                    "9":"(",
                    "0":")",
                    "-":"_",
                    "=":"+",
                    ";":":",
                    "'":"\"",
                    ",":"<",
                    ".":">",
                    "/":"?",
                    "\\":"|"
                };
                // Special Keys - and their codes
                var special_keys = {
                    'esc':27,
                    'escape':27,
                    'tab':9,
                    'space':32,
                    'return':13,
                    'enter':13,
                    'backspace':8,

                    'scrolllock':145,
                    'scroll_lock':145,
                    'scroll':145,
                    'capslock':20,
                    'caps_lock':20,
                    'caps':20,
                    'numlock':144,
                    'num_lock':144,
                    'num':144,

                    'pause':19,
                    'break':19,

                    'insert':45,
                    'home':36,
                    'delete':46,
                    'end':35,

                    'pageup':33,
                    'page_up':33,
                    'pu':33,

                    'pagedown':34,
                    'page_down':34,
                    'pd':34,

                    'left':37,
                    'up':38,
                    'right':39,
                    'down':40,

                    'f1':112,
                    'f2':113,
                    'f3':114,
                    'f4':115,
                    'f5':116,
                    'f6':117,
                    'f7':118,
                    'f8':119,
                    'f9':120,
                    'f10':121,
                    'f11':122,
                    'f12':123
                };

                var modifiers = {
                    shift: { wanted:false, pressed:false},
                    ctrl : { wanted:false, pressed:false},
                    alt  : { wanted:false, pressed:false},
                    meta : { wanted:false, pressed:false}   //Meta is Mac specific
                };

                if(e.ctrlKey)   modifiers.ctrl.pressed = true;
                if(e.shiftKey)  modifiers.shift.pressed = true;
                if(e.altKey)    modifiers.alt.pressed = true;
                if(e.metaKey)   modifiers.meta.pressed = true;

                for(var i=0; k=keys[i],i<keys.length; i++) {
                    //Modifiers
                    if(k == 'ctrl' || k == 'control') {
                        kp++;
                        modifiers.ctrl.wanted = true;

                    } else if(k == 'shift') {
                        kp++;
                        modifiers.shift.wanted = true;

                    } else if(k == 'alt') {
                        kp++;
                        modifiers.alt.wanted = true;
                    } else if(k == 'meta') {
                        kp++;
                        modifiers.meta.wanted = true;
                    } else if(k.length > 1) { //If it is a special key
                        if(special_keys[k] == code) kp++;

                    } else if(opt.keycode) {
                        if(opt.keycode == code) kp++;

                    } else { //The special keys did not match
                        if(character == k) kp++;
                        else {
                            if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
                                character = shift_nums[character];
                                if(character == k) kp++;
                            }
                        }
                    }
                }

                if(kp == keys.length &&
                            modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
                            modifiers.shift.pressed == modifiers.shift.wanted &&
                            modifiers.alt.pressed == modifiers.alt.wanted &&
                            modifiers.meta.pressed == modifiers.meta.wanted) {
                    callback(e);

                    if(!opt.v) { //Stop the event
                        // e.cancelBubble is supported by IE - this will kill the bubbling process.
                        e.cancelBubble = true;
                        e.returnValue = false;

                        // e.stopPropagation works in Firefox.
                        if (e.stopPropagation) {
                            e.stopPropagation();
                            e.preventDefault();
                        }
                        return false;
                    }
                }
            };
            this.all_shortcuts[shortcut_combination] = {
                'callback':func,
                'target':ele,
                'event': opt.type
            };
            //Attach the function with the event
            if(ele.addEventListener) ele.addEventListener(opt.type, func, false);
            else if(ele.attachEvent) ele.attachEvent('on'+opt.type, func);
            else ele['on'+opt.type] = func;
        },

        // Remove the shortcut - just specify the shortcut and I will remove the binding
        'remove':function(shortcut_combination) {
            shortcut_combination = shortcut_combination.toLowerCase();
            var binding = this.all_shortcuts[shortcut_combination];
            delete(this.all_shortcuts[shortcut_combination]);
            if(!binding) return;
            var type = binding.event;
            var ele = binding.target;
            var callback = binding.callback;

            if(ele.detachEvent) ele.detachEvent('on'+type, callback);
            else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
            else ele['on'+type] = false;
        }
    };

    /// Shorcut definition goes here ...

        // Alt Shortcuts are for GA Tools
        // CRTL Shortcuts are for UB Devtools

        // GA Tools
        ub.shortcut.add("Alt+1", function () {
            ub.toggleFontGuides();
        });

        ub.shortcut.add("Alt+2", function () {
            ub.toggleFullView();
        });

        ub.shortcut.add("Alt+3", function () {
            ub.togglePatternMasks();
        });

        ub.shortcut.add("Alt+4", function () {
            ub.showThumbnail3();
        });

        ub.shortcut.add("Alt+5", function () {
            ub.funcs.enableAlternativeUI();
        });

        ub.shortcut.add("Alt+6", function () {
            if (!ub.data.generateThumbnailShown) {
                GenerateThumbnail.events.init();
            } else {
                $('#property-modifiers-menu .menu-item').first().trigger('click');
                ub.data.generateThumbnailShown = false;
            }
        });

        ub.shortcut.add("Alt+7", function () {
            if (!ub.data.hexCodeTesterShown) {
                ColorHexTester.init.init();
            } else {
                $('#property-modifiers-menu .menu-item').first().trigger('click');
                ub.data.hexCodeTesterShown = false;
            }
        });

        ub.shortcut.add("Alt+8", function () {
            var current_pos_hl_x;
            var current_pos_sh_x;

            _.each(ub.views, function(view) {
                current_pos_hl_x = ub.objects[view + "_view"].highlights.position.x;
                current_pos_sh_x = ub.objects[view + "_view"].shadows.position.x;

                ub.objects[view + "_view"].highlights.position.x = current_pos_hl_x === 0 ? -500 : 0;
                ub.objects[view + "_view"].shadows.position.x = current_pos_sh_x === 0 ? 500 : 0;
            });
        });

        // Dev Tools is at shift + alt,

        // ub.shortcut.add("Shift+Alt+1", function () {

        // });

        // Main UI

        ub.shortcut.add("Esc", function () {
            if (ub.status.fullView.getStatus()) {
                $("div.verbiage-container").removeClass('preview-verbiage-container');
                $("p.verbiage-text").removeClass('preview-verbiage-text');
                $("div#main_view").css('background-color', '');
                ub.funcs.restoreUI();
            }
        });

    /// End Shortcut definitions

    /// Key Down Events

        $( "body" ).keydown(function( event ) {

            if (event.key === 'Alt') {

                $('a.footer-buttons.change-view[data-view="front"]').html('F<br /><span>Thumbnail</span>');
                $('a.footer-buttons.change-view[data-view="back"]').html('B<br /><span>Thumbnail</span>');
                $('a.footer-buttons.change-view[data-view="left"]').html('L<br /><span>Thumbnail</span>');
                $('a.footer-buttons.change-view[data-view="right"]').html('R<br /><span>Thumbnail</span>');

                $('a.footer-buttons.change-view[data-view="zoom"]').html('<i class="fa fa-arrows-alt" aria-hidden="true"></i><br /><span>Full View</span>');

            }


            if (event.key  === "+" && event.shiftKey && event.altKey) {
                if (ub.zoom) {
                    ub.zoom_off();
                } else {
                    ub.zoom_on();
                }
                return;
            }

            if (event.key === "_" && event.shiftKey && event.altKey) {
                if (ub.zoom) {
                    ub.zoom_off();
                }
                return;
            }
        });

        $( "body" ).keyup(function( event ) {

            if (event.key === 'Alt') {

                $('a.footer-buttons.change-view[data-view="front"]').html('F<br /><span>Front View</span>');
                $('a.footer-buttons.change-view[data-view="back"]').html('B<br /><span>Back View</span>');
                $('a.footer-buttons.change-view[data-view="left"]').html('L<br /><span>Left View</span>');
                $('a.footer-buttons.change-view[data-view="right"]').html('R<br /><span>Right View</span>');

                $('a.footer-buttons.change-view[data-view="zoom"]').html('<i class="fa fa-search"></i><br /><span>Zoom</span>');

            }

        });

    ///

});
