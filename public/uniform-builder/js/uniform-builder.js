$(document).ready(function () {

    /// NEW RENDERER ///

        /// Initialize Uniform Builder

        window.ub.initialize = function () {

            if (parseInt(ub.render) === 1) { ub.funcs.removePanels(); }

            ub.funcs.beforeLoad(); 
            ub.config.print_version();

            /// Initialize Assets

            ub.current_material.id = window.ub.config.material_id;
            ub.current_material.code = window.ub.config.code;

            if (ub.current_material.id !== -1) { ub.funcs.initCanvas(); }

            ub.current_material.colors_url = window.ub.config.api_host + '/api/colors/';
            ub.current_material.fonts_url = window.ub.config.api_host + '/api/fonts/';
            ub.current_material.patterns_url = window.ub.config.api_host + '/api/patterns/';
            ub.current_material.mascots_url = window.ub.config.api_host + '/api/mascots/';
            ub.current_material.tailsweeps_url = window.ub.config.api_host + '/api/tailsweeps/';

            ub.current_material.mascot_categories_url = window.ub.config.api_host + '/api/mascot_categories';
            ub.current_material.mascot_groups_categories_url = window.ub.config.api_host + '/api/mascots_groups_categories/';            
            ub.loader(ub.current_material.mascots_url, 'mascots', ub.callback);
            ub.loader(ub.current_material.mascot_categories_url, 'mascots_categories', ub.callback);
            ub.loader(ub.current_material.mascot_groups_categories_url, 'mascots_groups_categories', ub.callback);
            ub.loader(ub.current_material.colors_url, 'colors', ub.callback);
            ub.loader(ub.current_material.fonts_url, 'fonts', ub.callback);
            ub.loader(ub.current_material.patterns_url, 'patterns', ub.callback);

            ub.loader(ub.current_material.tailsweeps_url, 'tailSweeps', ub.callback);

            ub.design_sets_url = window.ub.config.api_host + '/api/design_sets/';
            ub.loader(ub.design_sets_url, 'design_sets', ub.load_design_sets);

            ub.materials_url = window.ub.config.api_host + '/api/materials/styleSheets';
            ub.loader(ub.materials_url, 'materials', ub.load_materials);

            if (typeof ub.user.id !== 'undefined') {

                ub.orders_url = window.ub.config.api_host + '/api/order/user/' + ub.user.id;
                ub.loader(ub.orders_url, 'orders', ub.load_orders);

                // ub.savedDesigns_url = window.ub.config.api_host + '/api/saved_design/getByUserId/' + ub.user.id;
                // ub.loader(ub.savedDesigns_url, 'saved_designs', ub.load_save_designs);

            }
            else {

                $('.open-save-design-modal').hide();

            }

            ub.zoom_off();

            if (window.ub.config.material_id !== -1) { ub.funcs.loadHomePickers(); }

        };

        ub.funcs.initCanvas = function () {

            $('body').addClass('generic-canvas');

        }

        ub.funcs.loadHomePickers = function () {
            
            $('div.backlink').addClass('back-link-on');

            ub.current_material.material_url         = window.ub.config.api_host + '/api/material/' + ub.current_material.id;
            ub.current_material.material_options_url = window.ub.config.api_host + '/api/materials_options/' + ub.current_material.id;

            ub.loader(ub.current_material.material_url, 'material', ub.callback);
            ub.loader(ub.current_material.material_options_url, 'materials_options', ub.callback);

            $('#main_view').parent().fadeIn();
            $('div.header-container').fadeIn(); 
            window.ub.refresh_thumbnails();

        }

        ub.funcs.getPrice = function (material) {

            var _web_price_sale = parseFloat(material.web_price_sale).toFixed(2);
            var _msrp           = parseFloat(material.msrp).toFixed(2);
            var _price          = 0;

            if (_web_price_sale < _msrp && _web_price_sale > 1) {
                _price          = "Sale Price: $" + _web_price_sale;
            } else {
                _price          = "MSRP $" + _msrp;
            }

            if (isNaN(_web_price_sale) || isNaN(_web_price_sale)) { 
                _price = "Call for Pricing";
            } 

            ub.funcs.processMaterialPrice(material);

            return _price;

        }

        // Returns Adult, Youth price modified with sale, also call for team pricing, or just call for pricing elements
        ub.funcs.getPriceElements = function (material) {

            // var _web_price_sale = parseFloat(material.web_price_sale).toFixed(2);
            // var _msrp           = parseFloat(material.msrp).toFixed(2);
            // var _price          = 0;

            // if (_web_price_sale < _msrp && _web_price_sale > 1) {
            //     _price          = "Sale Price: $" + _web_price_sale;
            // } else {
            //     _price          = "MSRP $" + _msrp;
            // }

            // if (isNaN(_web_price_sale) || isNaN(_web_price_sale)) { 
            //     _price = "Call for Pricing";
            // } 

            ub.funcs.processMaterialPrice(material);

            return material.parsedPricingTable;

        }

        ub.funcs.createMessage = function (type, order_code, subject, content, parent_id, main_thread_id) {

            var _postData = {

                "type": type,
                "subject": subject,
                "order_code": order_code,
                "content": content,
                "recipient_id": 0,
                "sender_id": ub.user.id,
                "parent_id": parent_id,
                "sender_name": ub.user.fullname,
                "read": "0",

            }

            var _url = ub.config.api_host + '/api/message';

            $.ajax({
                        
                url: _url,
                type: "POST", 
                data: JSON.stringify(_postData),
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
                success: function (response) {

                    $.smkAlert({text: 'Message Sent!', type:'warning', time: 3, marginTop: '80px'});

                }
                        
            });

        }

        ub.funcs.updateMessageBadges = function (type) {

            var $badge  = $('span.badge.badge-' + type);
            var _filter = type.toTitleCase();

            if (_filter === "Pm") {

                _filter = "PM";

            }

            var _count = _.chain(ub.data.unreadMessages).filter({type: _filter}).size().value();

            _countStr = _count !== 0 ? _count: '';
            $badge.html(_countStr);

        }

        ub.funcs.updateMessageCount = function () {

            if (typeof $.ajaxSettings.headers !== 'undefined') { delete $.ajaxSettings.headers["X-CSRF-TOKEN"]; }

            $.ajax({

                url: ub.config.api_host + '/api/messages/recipient/unread/' + ub.user.id,
                type: "GET", 
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
                success: function (response){

                    var _items = response.messages;
                    var _count = _.size(_items);

                    ub.data.unreadMessages = response.messages;

                    $('a#messages > span.badge').hide();
                    $('a#messages > span.badge').html(_count);
                    $('a#messages > span.badge').fadeIn();

                    _.each(ub.data.messageTypes, ub.funcs.updateMessageBadges);

                }
                
            });

        };

        ub.funcs.beforeLoad = function () {

            $('a.change-view[data-view="team-info"]').addClass('disabled');

            if (typeof ub.user.id === 'number')  { ub.funcs.updateMessageCount(); }

        }

        // {data: '', title: '', url: ''}
        ub.funcs.pushState = function (stateObject) {

            history.pushState(stateObject.data, stateObject.title, stateObject.url);

        };

        ///

        ub.data.orderFormInitialized = undefined;
        ub.funcs.reShowCustomizer = function () {

            ub.data.rosterInitialized = false;

            $('div#right-pane-column').fadeIn();        
            $('div#left-pane-column').fadeIn();
            $('div#roster-input').fadeOut();

        }

        ub.funcs.reShowRosterInput = function () {

            $('div#order-form').fadeIn();
            $('div#roster-input').fadeIn();

        }

        ub.funcs.reShowOrderFrom = function () {

            $('div#roster-input').fadeOut();
            $('div#validate-order-form').fadeOut();
            $('div#order-form').fadeIn();

            $('span.back-to-roster-form-button').unbind('click');
            $('span.back-to-roster-form-button').on('click', function () {

                ub.funcs.reShowRosterInput();

            });
            
        }

        ///

        ub.funcs.setupEventHandlers = function () {

            //Handle History Change
            window.addEventListener('popstate', function (e) {

                if (e.state === "customize-uniform") {

                    $.smkAlert({text: 'Ability to go back to the cuztomizer is not yet implemented.', type:'warning', time: 3, marginTop: '80px'});

                }

                if (e.state === "roster-form") {

                    ub.funcs.reShowRosterInput();

                }

                if (e.state === "order-form") {

                    ub.funcs.reShowOrderFrom();

                }

            });

            // Handle Page Change
            window.onbeforeunload = function (e) {

                return "Please save your work first before going to another page so that your work might not be lost.";

            };

        };

        ub.funcs.prepareBottomTabs = function () {

            if (typeof (window.ub.user.id) === "undefined") {
                $('a.change-view[data-view="save"]').attr('title','You must be logged-in to use this feature');
                $('a.change-view[data-view="open-design"]').attr('title','You must be logged-in to use this feature');
            } else {
                $('a.change-view[data-view="save"]').removeClass('disabled');
                $('a.change-view[data-view="open-design"]').removeClass('disabled');
            }

            if(ub.funcs.isCurrentSport('Baseball')) {
                $('a.change-view[data-view="pipings"]').removeClass('hidden');                                
            } else {
                $('a.change-view[data-view="pipings"]').addClass('hidden');                
            }

            if(ub.funcs.isCurrentSport('Crew Socks (Apparel)')) {                
                $('a.change-view[data-view="randomFeed"]').removeClass('hidden'); 
            } else {
                $('a.change-view[data-view="randomFeed"]').addClass('hidden');             
            }

            $('a.change-view[data-view="team-info"]').removeClass('disabled');

            if (ub.funcs.isCurrentSport("Cinch Sack (Apparel)")) {

                $('a.footer-buttons[data-view="right"], a.footer-buttons[data-view="left"]').addClass('disabled')

            }                

        }

        ub.funcs.perUniformPriceCustomizerCleanup = function () {

            var _sport = ub.current_material.material.uniform_category;

            switch (_sport) {

              case 'Crew Socks (Apparel)', 'Compression (Apparel)':
                
                $('span.youthPriceCustomizer').hide();
                $('span.youthPriceCustomizerSale').hide();
                $('span.adult-label').html('Price starts from ');
                $('div#uniform-price-youth').hide();

                $('span.adult-str').html('Price Starts ');

                $('div#uniform-price-adult').addClass('single');
                $('div#uniform-price-call-for-team-pricing').addClass('single');

                break;
              
              default:

                // $('span.youthPrice').show();
                // $('span.youthPriceSale').show();
                // $('span.adult-label').html('Adult from ');

                ub.utilities.info('No Per Sport Cleanup for Picker')
                
            }

        }

        ub.data.afterLoadCalled = 0;
        ub.funcs.afterLoad = function () {

            if (ub.data.afterLoadCalled > 0) {return;}

            ub.sport = ub.current_material.material.uniform_category;
            ub.funcs.activatePartByIndex(0);

            $('div.left-pane-column-full').fadeIn();
            $('span.fullscreen-btn').fadeIn();

            if (_.contains(ub.fontGuideIDs, window.ub.valid)) {

                $('div.activate_qa_tools').fadeIn();

            }

            var _type = ub.current_material.material.uniform_application_type.replace('_', ' ');

            var _getPrice = ub.funcs.getPriceElements(ub.current_material.material);

            var _adultStr = '<span class="adult-str">Adult &nbsp</span>';

            $('div#uniform_name').html('<span class="type">' + _type + '</span><br />' + ub.current_material.material.name);
            $('div#uniform-price-youth').html("Youth <span class='youthPriceCustomizer " + _getPrice.youth_sale + "'> from $" + _getPrice.youth_min_msrp + "</span> <span class='youthPriceCustomizerSale " + _getPrice.youth_sale + "'>"  +  'now from $' + _getPrice.youth_min_web_price_sale + '<span class="sales-badge">Sale!</span></span><br />');
            $('div#uniform-price-adult').html(_adultStr + "<span class='adultPriceCustomizer " + _getPrice.adult_sale + "'>from $" + _getPrice.adult_min_msrp + "</span> <span class='adultPriceCustomizerSale " + _getPrice.adult_sale + "'>"  +  'now from $' + _getPrice.adult_min_web_price_sale + '<span class="sales-badge">Sale!</span></span><br />');
            $('div#uniform-price-call-for-team-pricing').addClass(_getPrice.callForPricing);

            $('div.header-container').css('display','none !important');

            ub.funcs.perUniformPriceCustomizerCleanup();
            ub.funcs.restoreTeamColorSelectionsFromInitialUniformColors();

            ub.hideFontGuides();
            ub.data.afterLoadCalled = 1;

            ub.funcs.initToolBars();
            ub.data.undoHistory = [];
            ub.funcs.initUndo();
            ub.funcs.initTeamColors();

            if (typeof ub.temp === 'undefined') {
                ub.funcs.colorArrayFix();
            }
            
            ub.funcs.prepareBottomTabs();
            ub.funcs.loadOtherFonts();

            var _blockPattern = ub.current_material.material.block_pattern;

            // Get Buffs Bold Adjustment
            var _blockPattern = ub.current_material.material.block_pattern;
            var _result = ub.data.buffsBoldAdjustments.getSettings(_blockPattern);

            ub.data.buffsBoldAdjustment = _result;
            // End Buffs Bold Adjustment

            // Block Pattern Widths
            var _result = ub.data.blockPatternLengths.getSettings(_blockPattern);
            ub.data.blockPatternLength = _result;
            // End Block Pattern Widths

            ub.funcs.setupEventHandlers();
            ub.funcs.pushState({data: 'customize-uniform', title: 'Customize Uniform', url: '?customize-uniform'});

            if (parseInt(ub.render) === 1) { 
                ub.funcs.removeUI();
                $('button#button-return-to-customizer').html('Customize this uniform');

                if (ub.savedDesignName !== "") {
                    $('div#saved_design_name').html(ub.savedDesignName);
                }
            } else {
                $('button#button-return-to-customizer').hide();
                $('div#saved_design_name').hide();
            }


        };

        ub.funcs.loadOtherFonts = function () {

            _.each (ub.data.fonts, function (font, index) {

                if (index === 0) { return; }

                WebFont.load({

                    custom: {
                      families: [font.name],
                    },

                });

            });

        };

        ub.funcs.initToolBars = function () {

            if (ub.funcs.getCurrentUniformCategory() === "Wrestling") {
                
                $('a.change-view[data-view="layers"]').show();

            } else {

                //$('a.change-view[data-view="locations-add"]').hide();
                //$('a.change-view[data-view="layers"]').hide();
                $('a.change-view[data-view="save"]').show();
                $('a.change-view[data-view="start-over"]').show();

            }

            $('a.change-view[data-view="locations-add"]').hide();
            $('a.change-view[data-view="locations"]').hide();

        }

        ub.updateLayersOrder = function (container) {
            
            // console.clear();
            // console.log('Update Layers Order Called: ');
            // console.log(arguments.callee.caller);
            // console.trace();

            container.children.sort(function (a,b) {
                a.zIndex = a.zIndex || 0;
                b.zIndex = b.zIndex || 0;
                return b.zIndex - a.zIndex
            });

        };


        ub.data.mascotsCategories = {};

        ub.funcs.transformMascots = function () {

            _.each(ub.data.mascots, function (mascot) {

                mascot.layers_properties = JSON.parse(mascot.layers_properties);

                ub.data.mascotsCategories[mascot.category] = {
                    name: mascot.category,
                    id: mascot.mascot_category_id,
                };

            });

        }

        /// Load Assets 

        ub.callback_update = function (obj, object_name) {

            ub.data[object_name] = obj;

            if (object_name === 'fonts') {

                ub.data.fonts = _.filter(ub.data.fonts, {active: "1"});
                ub.data.fonts = _.sortBy(ub.data.fonts, "name");

            }

        }

        ub.funcs.initFonts = function () {

            ub.data.fonts = _.filter(ub.data.fonts, function (font) {

                var sports = JSON.parse(font.sports);

                if (sports === null) {

                    return true;

                } else {

                    if (sports[0] === "" || sports[0] === "All") {

                        return true;

                    } else { 

                        var _result = _.contains(sports,ub.current_material.material.uniform_category);
                        return _result;

                    }

                }

            });

            _.each(ub.data.fonts, function (font) {

                font.caption = font.alias;

            });

            if (ub.data.fonts.length > 0) {

                ub.utilities.info(ub.data.fonts.length + " fonts loaded.");
                ub.utilities.info('Preloading ' + ub.data.fonts[0].name);

                WebFont.load({

                    custom: {
                      families: [ub.data.fonts[0].name,]
                    },

                });    

            } else {

                ub.utilities.error('No fonts loaded for ' + ub.current_material.material.uniform_category + "!");

            }

        };

        // Fix for returned ints, ub expects string
        ub.convertToString = function (obj) {

            var _toConverList = ['id', 'active', 'debug_mode', 'sublimation_only']; 

            _.each(obj, function (item) {

                if (item !== null) {

                    _.each(_toConverList, function (field) {

                        if (typeof item[field] === "number") {

                            item[field] = item[field].toString();

                        }

                    });

                }

            });

        }
 
        ub.callback = function (obj, object_name) {

            ub.convertToString(obj);

            if (object_name === 'colors' || object_name === 'patterns' || object_name === 'fonts' || object_name === 'mascots' || object_name === 'mascots_categories' || object_name === 'mascots_groups_categories' || object_name === 'tailSweeps') {

                ub.data[object_name] = obj;

                if (object_name === "tailSweeps") {

                    _.each(obj, function (tailsweep, index) {

                        if (tailsweep.code === "blank") { 
                            
                            tailsweep.sortOrder = 0; 

                        } else {

                            tailsweep.sortOrder = index + 1;

                        }

                    });

                    ub.data.tailSweeps = _.sortBy(ub.data.tailSweeps, "sortOrder");

                }

            } else {

                ub.current_material[object_name] = obj;

            }

            if (object_name === 'fonts') { 

                ub.data.fonts = _.filter(ub.data.fonts, {active: "1"});
                ub.data.fonts = _.sortBy(ub.data.fonts, "name");
                ub.funcs.processFonts();

            }

            if (object_name === 'colors') { 

                ub.data.colors = _.filter(ub.data.colors, {active: "1"});
                ub.data.colors = _.map(ub.data.colors, function (color) { 
                
                    color.order = ub.data.sublimatedColorArrangement.getOrderID(color.name).order;
                    return color;

                });
                
                ub.data.colors = _.sortBy(ub.data.colors, 'order');

            }

            if (object_name === 'patterns') { ub.funcs.transformPatterns(obj); }

            if (object_name === 'mascots') { ub.funcs.transformMascots(); }

            var ok = typeof(ub.current_material.material) !== 'undefined' && 
                     typeof(ub.current_material.materials_options) !== 'undefined' && 
                     typeof(ub.data.colors) !== 'undefined' &&
                     typeof(ub.data.patterns) !== 'undefined' &&
                     typeof(ub.data.fonts) !== 'undefined' && 
                     typeof(ub.data.mascots) !== 'undefined' && 
                     typeof(ub.data.mascots_categories) !== 'undefined' &&
                     typeof(ub.data.mascots_groups_categories) !== 'undefined';

            if (ok) {

                ub.load_assets();

                ub.funcs.init_team_colors();
                ub.funcs.transformedApplications();
                ub.funcs.transformedBoundaries();
                ub.funcs.get_modifier_labels();
                ub.init_settings_object();
                ub.init_style();
                ub.funcs.initFonts();

            }
            
        };

        ub.loader = function (url, object_name, cb) {
          
            $.ajax({
            
                url: url,
                type: "GET", 
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
            
                success: function (response){

                    if (object_name === "tailSweeps") {

                        cb(response['tailsweeps'], object_name);

                    } else {

                        cb(response[object_name], object_name);

                    }

                }
            
            });

        };

        ub.saveLogo = function (dataUrl, applicationCode) {

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $.ajax({
                data: JSON.stringify({ dataUrl: dataUrl }),
                url: ub.config.host + "/saveLogo",
                dataType: "json",
                type: "POST", 
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
            
                success: function (response){
                    
                    if(response.success) {
                        ub.current_material.settings.applications[applicationCode].filename = response.filename;
                    }
                    else{
                        util.error('Logo upload not successful.');
                    }

                }
            
            });

        }

        ub.display_gender_picker = function () {

            $('#arrow_design_sets').remove();

            $('#main_view > .picker_container').hide();
            $('#main_view > .picker_container').html('');

            var str_builder = '';

            var genders = ['Men', 'Women', 'Youth'];

            _.each(genders, function (obj, index) {

                var filename = window.ub.config.thumbnails_path + obj.toLowerCase() + '.png';
                
                var element = "<div class='gender_picker_header'>" + obj + '</div>';
                    element += '<div class="gender_picker" data-picker-type="gender" data-index = "' + index+ '" data-gender="' + obj + '" style="background-image:url(' + filename +');">' + '</span></div>';

                str_builder  += element;

            });

            $('#main_view > .picker_container').html(str_builder);
            $('#main_view > .picker_container').fadeIn();

            ub.bind_handler_design_set_picker();

        };

        
        ub.display_categories = function (gender){

            $('#arrow_design_sets').remove();

            var sports = _.find(ub.data.sports, {gender: gender});
            var active_sport_categories = _.where(sports.sports, {active: "1"});

            $('#main_view > .picker_container').hide();
            $('#main_view > .picker_container').html('');

            var elements = '';
            var gender_element = '<span>' + gender + '</span>';
            var back_element = '<button onclick="ub.display_gender_picker()"><i class="fa fa-chevron-circle-left"></i></button>'
            var header = '<div class="picker_header">' + gender_element + back_element + '</div>';

            elements = header;

            _.each(active_sport_categories, function (category, index){

                var filename = window.ub.config.thumbnails_path + category.name.toLowerCase() + '.jpg';
                var element = '<div class="sports_categories" data-gender="'+ gender + '" data-category="' + category.name + '" style="background-image:url(' + filename +');">' + '<span class="categories_label">' + category.name + '</span></div>';

                elements += element;
                
            });

            $('#main_view > .picker_container').html(elements);
            $('#main_view > .picker_container').fadeIn();

            ub.bind_handler_category_picker();

        };


        ub.display_design_sets = function (category, gender, type) {

            $('#arrow_design_sets').remove();

            $('#main_view > .picker_container').hide();
            $('#main_view > .picker_container').html('');

            var elements = '';

            var gender_element = '<span>' + gender + '</span>';
            var back_element = '<button onclick="ub.display_gender_picker()"><i class="fa fa-chevron-circle-left"></i></button>'
            var header = '<div class="picker_header">' + gender_element + back_element + '</div>';
            var category_element = '<span>' + category + '</span>';
            var category_back_element = '<button onclick=ub.display_categories("' + gender + '")><i class="fa fa-chevron-circle-left"></i></button>'
            var category_header = '<div class="picker_header">' + category_element + category_back_element + '</div>';
            var group_element_0 = '<button class="button_tabs all" data-type="All" data-gender="' + gender + '" data-category="' + category + '">Jersey and Pant</button>';
            var group_element_1 = '<button class="button_tabs upper" data-type="upper" data-gender="' + gender + '" data-category="' + category + '">Jersey</button>';
            var group_element_2 = '<button class="button_tabs lower" data-type="lower" data-gender="' + gender + '" data-category="' + category + '">Pant</button>';
            var group_header = '<div class="picker_header picker_header_tabs" style="text-align: center;">' + group_element_1 + group_element_2 + '</div>';

            elements = header + category_header + group_header;

            var design_sets = _.where(ub.design_sets, { category: category, gender: gender.toLowerCase() });

            if (type === 'All') {
                design_sets = _.where(ub.design_sets, { category: category, gender: gender.toLowerCase() });
            } else {
                design_sets = _.where(ub.materials, { uniform_category: category, gender: gender.toLowerCase(), type: type.toLowerCase() });
            }

            _.each(design_sets, function (obj) {

                var filename = obj.thumbnail_path;
                var element = '<div class="style_entry" data-option="' + type + '" data-picker-type="design_sets" data-id = "' + obj.id + '" data-name="' + obj.name + '" style="background-image:url(' + filename +');">' + '<span class="style_label">' + obj.name + '</span></div>';

                elements += element;
                
            });
            
            var phrase = "for <strong>" + gender + " / " + category + "</strong>.";

            if (design_sets.length === 0) {
                elements += "<div style='clear:both;'></div><div class='no_designs'>No Uniform Designs " + phrase + "</div>";
            }
            else if (design_sets.length === 1) {
                elements += "<div style='clear:both;'></div><div class='no_designs'>1 Uniform Design " + phrase + "</div>";
            }
            else {
                elements += "<div style='clear:both;'></div><div style='clear: both'></div><div><div class='no_designs' style='clear:both;'>" + design_sets.length + " Uniform Designs found " + phrase + "</div></div>";
            }

            $('#main_view > .picker_container').html(elements);
            $('#main_view > .picker_container').show();

             /// Highlight Button

                var current_button = $('.button_tabs.' + type.toLowerCase());
                var down_arrow = '<div id="arrow_design_sets" class="down_arrow">';

                $("body").append(down_arrow);

                var arrow_obj = $('#arrow_design_sets');

                var t = new Tether({
                  element: arrow_obj,
                  target: current_button,
                  attachment: 'top center',
                  targetAttachment: 'bottom center'
                });

                current_button.css('background-color', '#353536');
                current_button.css('color', '#f8f8f8');
                $('.down_arrow:not(.tether-element)').remove();

                ub.tethers['design_sets'] = t;

            /// End Highlight Button

            ub.bind_handler_design_set_picker();
            ub.bind_design_sets_tab_handlers(); 

        };

        var substringMatcher = function(strs) {
          return function findMatches(q, cb) {
            var matches, substringRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function(i, str) {
              if (substrRegex.test(str)) {
                matches.push(str);
              }
            });

            cb(matches);
          };
        };

        ub.overrideTypeAheadEvent = function (e) {
            
            var $element = $(e);
            var _value = $element.data('value');
            var _id = $element.data('id');

        };

        ub.funcs.getSearchObject = function (type, name) {

            var _object;
            var _id;
            var _thumbnail;

            if (type === 'materials') {

                _object = _.find(ub.materials, {name: name});
                _id = _object.id;
                _thumbnail = _object.thumbnail_path;

            }
            else if (type === 'orders') {

                _object =  _.find(ub.orders, {design_name: name});
                _id = _object.order_id;

                if (_object.upper_front_thumbnail_path !== null) {

                    _thumbnail = _object.upper_front_thumbnail_path;    

                }
                else {

                    _thumbnail = _object.lower_front_thumbnail_path

                }

            }
            else {

                _object = undefined;

            }

            return {

                object: _object,
                id: _id,
                thumbnail: _thumbnail,

            }

        }

        ub.addToSearchResults = function (type, data) {

            var _key = Math.round(+new Date()/1000).toString(); 
            var _searchResultsObject = ub.searchResults;

            if (!Array.isArray(_searchResultsObject[_key])) {

                _searchResultsObject[_key] = [];

            }

            var _object = ub.funcs.getSearchObject(type, data);

            _searchResultsObject[_key].push({
                type: type,
                name: data,
                thumbnail: _object.thumbnail,
                uniform_category: _object.object.uniform_category,

                id: _object.id,
            });

            $('.picker-header').html('Search Results: ' + $('input#search_field').val()); // Term is passed on gender, refactor this

            ub.funcs.initSearchPicker(_key, _searchResultsObject[_key]);

        };

        ub.prepareTypeAhead = function () {

            if (typeof ub.user.id !== 'undefined') { // Logged In

                if (typeof ub.data.searchSource['materials'] === 'object' && typeof ub.data.searchSource['orders'] === 'object') {

                    $('.typeahead').typeahead({
                        minLength: 3,
                        highlight: true
                    },
                    {
                        name: 'materials',
                        source: substringMatcher(ub.data.searchSource['materials']),
                        templates: {
                            header: '<h3 class="header-name">Styles</h3>',
                            suggestion:  function (data) {

                                ub.addToSearchResults('materials', data);
                                return '<div class="typeahead_results_template" onclick="ub.overrideTypeAheadEvent(this);" data-value="' + data + '" data-id="materials">' + data + '</div>';

                            },

                        },
                    }
                    );

                    // $('input.typeahead.tt-hint').on('change', function () {
                    //     console.log($(this).val());
                    // });
                    // $('body').on("mouseover", ".tt-suggestion", function () {
                    //     console.log($(this).data('value'));

                    //     $('input#search_field').val($(this).data('value'));
                    // });

                    // {
                    //     name: 'savedDesigns',
                    //     source: substringMatcher(ub.data.searchSource['savedDesigns']),
                    //     templates: {
                    //         header: '<h3 class="header-name orders">Saved Designs</h3>',
                    //         suggestion:  function (data) {
                    //             ub.addToSearchResults('savedDesigns', data);
                    //             return '<div class="typeahead_results_template" onclick="ub.overrideTypeAheadEvent(this);" data-value="' + data + '" data-id="savedDesigns">' + data + '</div>';                            
                    //         },
                    //     },
                    // })
                    ;

                    $('.typeahead').unbind('typeahead:idle');
                    $('.typeahead').bind('typeahead:idle', function (ev, list, flag, dataset) {
                        ub.searchResults = {};
                    });

                    $('.typeahead').unbind('typeahead:select');
                    $('.typeahead').bind('typeahead:select', function (ev, data) {

                        $('[data-item="'+ data +'"]').click();

                    });

                    $('#search_field').attr("placeholder","Search: Style or Saved Designs");

                }

            }
            else { // Guest 

                if (typeof ub.data.searchSource['materials'] === 'object') {

                    $('.typeahead').typeahead({
                        minLength: 3,
                        highlight: true
                    },{
                        
                        name: 'materials',
                        source: substringMatcher(ub.data.searchSource['materials']),
                        templates: {
                            header: '<h3 class="header-name">Styles</h3>',
                            suggestion:  function (data) {

                                ub.addToSearchResults('materials', data);
                                return '<div class="typeahead_results_template" onclick="ub.overrideTypeAheadEvent(this);" data-value="' + data + '" data-id="materials">' + data + '</div>';                            
    
                            },
                        },

                    });

                    $('.typeahead').unbind('typeahead:idle');
                    $('.typeahead').bind('typeahead:idle', function (ev, list, flag, dataset) {

                        ub.searchResults = {};

                    });

                    $('.typeahead').unbind('typeahead:select');
                    $('.typeahead').bind('typeahead:select', function (ev, data) {
                        $('[data-item="'+ data +'"]').click();
                    });

                    $('#search_field').attr("placeholder","Search: Style");
                    

                }

            }

            $('input#search_field').prop('disabled', false);

        };

        ub.load_design_sets = function (obj, object_name) {

            ub.design_sets = {};
            ub.design_sets = obj;

            ub.design_sets = _.where(ub.design_sets, { active: "1" });

        }

        ub.funcs.processMaterialPrice = function (material) {

            if (material.uniform_category === "Football" || material.uniform_category === "Wrestling" || "Baseball") {

                    var _pricingTable = JSON.parse(material.pricing);
                    material.parsedPricingTable = _pricingTable;
                    
                    if (material.pricing === null) {

                        material.parsedPricingTable = {

                            youth_min_msrp: ' (Call for Pricing)',
                            adult_min_msrp: ' (Call for Pricing)',
                            youth_sale: 'nosale',
                            adult_sale: 'nosale',
                            callForPricing: 'callForPricingOff'

                        }
                        
                    } else {

                        callForPricing: 'callForPricingOn'
    
                        if (_pricingTable.youth_min_web_price_sale === "0.00") {

                            _pricingTable.youth_sale = "nosale";    

                        } else {

                            _pricingTable.youth_sale = "sale";    

                        }

                        if (_pricingTable.adult_min_web_price_sale === "0.00") {

                            _pricingTable.adult_sale = "nosale";    

                        } else {

                            _pricingTable.adult_sale = "sale";    

                        }

                    }
                    
                }
                

        }

        ub.load_materials = function (obj, object_name){

            ub.materials = {};
            ub.convertToString(obj);

            ub.materials = _.filter(obj, {debug_mode: '0'});

            _.each (ub.materials, function (material) {

                material.calculatedPrice = ub.funcs.getPrice(material);
                ub.funcs.processMaterialPrice(material);

            });

            ub.data.searchSource['materials'] = _.pluck(ub.materials, 'name');
            ub.prepareTypeAhead();

        }

        ub.load_orders = function (obj, object_name){

            ub.orders = {};
            ub.orders = obj;
            ub.data.searchSource['orders'] = _.pluck(ub.orders, 'design_name');

            ub.prepareTypeAhead();

        }

        ub.load_save_designs = function (obj, object_name){

            ub.savedDesigns = {};
            ub.savedDesigns = obj;
            ub.data.searchSource['savedDesigns'] = _.pluck(ub.savedDesigns, 'name');

            ub.prepareTypeAhead();

        }


        ub.load_patterns = function (obj, object_name){

            ub.patterns = {};
            ub.patterns = obj;

            ub.patterns = _.where(ub.patterns, {active: "1"});

        }

        ub.load_assets = function () {

            ub.assets = {};
            ub.assets.folder_name = '/images/builder-assets/'
            ub.assets.blank = ub.assets.folder_name + 'blank.png';

            var material = {};
            
            material = ub.current_material.material;
            material.options = ub.current_material.materials_options;

            _.each(ub.views, function (view) {

                var v = view;

                if (v === 'left' || v === 'right') {
                    v =  v + '_side_view';
                }
                else {
                    v = v + '_view';
                }    

                var view_name = view + '_view';

                ub.assets[view_name] = {};
                // ub.assets[view_name].shape = material[v + '_shape'];

            });

            /// Materials
            
            ub.assets.pattern = {};
            ub.assets.pattern.layers = [];
            ub.objects.pattern_view = {};
            
            /// Begin Rendering after assets are loaded

            ub.funcs.load_fonts();
            ub.setup_views();
            ub.setup_material_options(); 
            requestAnimationFrame(ub.render_frames);
            ub.pass = 0;

            var material_name = ub.current_material.material.name
            $('span#design_name_input').text(material_name);
            $('input[name="design_name"]').val(material_name);

            ub.funcs.showViewports();

            $('#main-row').fadeIn();
            $('div#design_name_container').fadeIn();

        }

        /// Main Render Loop

        window.ub.render_frames = function () {

            if (ub.data.rosterInitialized) { return }
            if (!ub.status.render.getRenderStatus()) { return; }

            requestAnimationFrame(ub.render_frames);
            ub.renderer.render(ub.stage);

            ub.funcs.fixAlignments();
            ub.funcs.mirrorRotation();

            /// Refresh Thumbnail Initially only on (-10) frames after 3 seconds (3 * 60)

            // if (ub.pass > (frames_to_refresh - 10) && (ub.pass < frames_to_refresh)) {
            //     // ub.refresh_thumbnails();
            // }   
            
            var frames_to_refresh = 3 * 60; // 60 frames in one sec, average

            if (ub.pass > (frames_to_refresh - 10) && (ub.pass < frames_to_refresh)) {
            
                ub.funcs.afterLoad(); 

            }
            
            if (ub.pass < frames_to_refresh) {
                ub.pass += 1; 
            }

        }

        /// Render Different Views ///

            window.ub.setup_views = function () {

                _.each(ub.views, function (view) {

                    var view_name = view + '_view';
                    var shape = ub.pixi.new_sprite(ub.assets[view_name].shape);
                    var shape_mask = ub.pixi.new_sprite(ub.assets[view_name].shape);

                    ub.objects[view_name] = {};
                    // ub.objects[view_name].shape = shape;
                    // ub.objects[view_name].shape_mask = shape_mask;

                    // shape.tint = 0xeeeded; 
                    // shape.zIndex = 2;
                    // shape_mask.zIndex = 1;
           
                    // ub[view_name].addChild(shape);
                    // ub.updateLayersOrder(ub[view_name]);

                });

            };

    // Returns the uniform customization settings made by the user
    // @return JSONObject
    ub.exportSettings = function () {

        /// Save Preview
        var uniform_type = ub.current_material.material.type;
        ub.current_material.settings[uniform_type].preview = ub.getThumbnailImage('front_view');

        return ub.current_material.settings;

    }

    // Change the uniform customization settings using the passed JSONObject parameter
    // @param JSONObject settings

    ub.data.getTeamColorObjByIndex = function (index) {

        /// Index is zero-based 

        _colorsUsed     = ub.data.colorsUsed;
        _hexCode        = _.find(_colorsUsed, {teamColorID: index});

        var _colorObj = ub.funcs.getColorObjByHexCode(_hexCode.hexCode)

        if (typeof _colorObj === 'undefined') {

            /// Get Locker Tag Color 
            var _lockerTag  = ub.funcs.getMaterialOptionSettingsObject('Locker Tag');
            var _hexCode    = util.decimalToHex(_lockerTag.color);

            _colorObj       = ub.funcs.getColorObjByHexCode(_hexCode);

        }

        return _colorObj;

    };

    ub.funcs.getValidApplicationTypes = function (view) {

        var _set = [];
        var _app = view.application;

        if (_app.hasLogo === 1) { _set.push ('logo'); }
        if (_app.hasNumber === 1) { _set.push ('number'); }
        if (_app.hasPlayerName === 1) { _set.push ('player_name'); }
        if (_app.hasTeamName === 1) { _set.push ('team_name'); }

        return _set;

    }

    ub.funcs.getColorObjArrayByCodes = function (colorCodesArray, _id) {

        var _result = [];
        
        _.each(colorCodesArray, function (code, index) {

            var _r = ub.funcs.getColorByColorCode(code);
           
            _result.push(_r);

        });

        return _result;

    }

    ub.funcs.isSublimated = function () {

        return ub.current_material.material.uniform_application_type === "sublimated";

    }

    ub.funcs.moveToExtra = function (application) {

        if (ub.funcs.isCurrentSport('Compression (Apparel)') ||
            ub.funcs.isCurrentSport('Tech-Tee (Apparel)') ||
            (ub.funcs.isCurrentSport('Baseball') && ub.funcs.isSublimated())) {

            if (application.layer === "Body" || application.layer === "Back Body") { application.layer = "Extra"; }

        }

    }

    ub.data.convertDefaultApplications = function () {

        if (typeof ub.temp !== "undefined" || _.size(ub.current_material.settings.applications) !== 0) { return; }

        var _one_dimensional = ub.data.applications_transformed_one_dimensional;

        _.each (_one_dimensional, function (_application) {

            ub.funcs.moveToExtra(_application);

            _.each(_application.views, function (view) {
        
                var _accentObj          = _.find(ub.data.accents.items, {id: parseInt(view.application.accents)});
                var _colorArray         = view.application.colors.split(',');
                var _outputColorArray   = []; 
                var _outputColorArrayM  = []; 
                var _outputColorArrayF  = []; 
                var _fontObj            = _.find(ub.data.fonts, {id: view.application.defaultFont});
                var _fontSizesArray     = view.application.fontSizes.split(',');
                var _output             = {};

                if (_application.type !== "logo" && _application.type !== "mascot" && _application.type !== "free" && typeof view.application !== "undefined") {

                    _output             = {};

                    _.each(_accentObj.layers, function (layer, index) {

                        if (typeof _colorArray[index - 1] === 'undefined') {
                            return;
                        }

                        var _resultColorObj     = ub.funcs.getColorByColorCode(_colorArray[index - 1]);
                        var _color              = _resultColorObj.hex_code;
                        layer.default_color     = _color;

                    });

                    _outputColorArray = _.map(_colorArray, function (code) { 

                        var _ub = ub.funcs.getColorByColorCode(code);

                        return _ub;

                    });

                    if (typeof _fontObj === "undefined") { ub.utilities.warn('Invalid Font ID detected for ' + _application.id); }

                    var _fontSizeData = ub.data.getPixelFontSize(_fontObj.id,_fontSizesArray[0], view.perspective, { id: _application.id }); 

                    _output = {

                        accent_obj: _accentObj,
                        application_type: _application.type,
                        application: _application,
                        code: _application.id,
                        colorArrayText: _colorArray,
                        color_array: JSON.parse(JSON.stringify(_outputColorArray)),
                        font_obj: _fontObj,
                        font_size: parseFloat(_fontSizesArray[0]),
                        scaleXOverride: parseFloat(_fontSizesArray[1]),
                        scaleYOverride: parseFloat(_fontSizesArray[2]),
                        pixelFontSize: _fontSizeData.pixelFontSize,
                        object_type: "text object",
                        text: view.application.defaultText,
                        type: _application.type,
                        verticalText: view.application.verticalText,
                        angle: (view.application.rotatedTailsweep === 1) ? "rotated": "straight",
                        validApplicationTypes: ub.funcs.getValidApplicationTypes(view),

                    };

                    // Setup Default Tailsweep
                    if (view.application.id === "1" && ub.funcs.isCurrentSport('Baseball')) {

                        var _rotated = 'straight';

                        if (view.application.rotatedTailsweep === 1) { 

                           _rotated = 'rotated';

                        }

                        if (view.application.tailsweeps !== "") {

                            var _tailSweepObj = ub.funcs.getTailSweepByID(view.application.tailsweeps);

                            if (typeof _tailSweepObj !== "undefined") {

                                var _rotated = 'straight';

                                if (view.application.rotatedTailsweep === 1) { 

                                    _rotated = 'rotated';

                                }

                                var _length;

                                _output.tailsweep = {

                                    id: parseInt(_tailSweepObj.id),
                                    code: _tailSweepObj.code,
                                    thumbnail: _tailSweepObj.code + '.png',
                                    length: 1,
                                    angle: _rotated,

                                }

                            }

                        }

                    }

                } 

                if (_application.type === "mascot" && typeof view.application !== "undefined") {

                    var _mascotObj  = _.find(ub.data.mascots, {id: view.application.defaultMascot});
                    var _colorArray = view.application.colors.split(',');

                    _output             = {};

                    _.each(_mascotObj.layers_properties, function (layer, index) {

                        if (typeof _colorArray[index -1] === 'undefined') { return; }

                        var _resultColorObj = ub.funcs.getColorByColorCode(_colorArray[index - 1]);
                        var _color = _resultColorObj.hex_code;
                        layer.default_color = _colorArray[index - 1];

                    });

                    _outputColorArrayM = _.map(_colorArray, function (code) { 

                        var _ub = ub.funcs.getColorByColorCode(code);

                        return _ub;

                    });

                    _output = {

                        application_type: _application.type,
                        application: _application,
                        code: _application.id,
                        color_array: _outputColorArrayM,
                        colorArrayText: _colorArray,
                        size: parseFloat(_fontSizesArray[0]),
                        font_size: parseFloat(_fontSizesArray[0]),
                        scaleXOverride: parseFloat(_fontSizesArray[1]),
                        scaleYOverride: parseFloat(_fontSizesArray[2]),
                        mascot: _mascotObj,
                        object_type: "mascot",
                        type: _application.type,
                        validApplicationTypes: ub.funcs.getValidApplicationTypes(view),

                    };

                }

                if (_application.type === "free" && typeof view.application !== "undefined") {
                    _output             = {};

                    _output = {

                        application_type: _application.type,
                        application: _application,
                        code: _application.id,
                        type: _application.type,
                        validApplicationTypes: ub.funcs.getValidApplicationTypes(view),
                        status: 'off',

                    };

                }

                // This has two valid values, "Default" for applications configured from the backend, "Added" for locations added manually by the users,
                // will be used to count be able to determine the sequence id to be assigned to new applications
                _output.configurationSource = 'Default'; 
                ub.current_material.settings.applications[parseInt(_application.id)] = _output;

                /// TODO: This is being executed multiple times

            });
            
        });

        ub.funcs.initzIndex();

    };

    ub.funcs.colorArrayFix = function () {

        _.each(ub.current_material.settings.applications, function (application) {

            if (application.type !== 'mascot' && application.type !== 'free') {

                application.color_array =  _.map(application.colorArrayText, function (code) { 

                    var _ub = ub.funcs.getColorByColorCode(code);
                    return _ub;

                });
    
            }
            
        });

    }

    ub.funcs.initzIndex = function () {

        var _ctr = 1;

        _.each(ub.current_material.settings.applications, function (app) {

            app.zIndex = _ctr;
            _ctr += 1;

        });

    }

    ub.funcs.setupTempPiping = function () {

        // if (ub.config.material_id === 731) {

        //     ub.current_material.settings.pipings['Center Piping'] = ub.data.mock.piping731;

        //     ub.funcs.renderPipings(_.find(ub.data.pipings, {name: "Center Piping 1/8"}), [
        //             ub.funcs.getColorByColorCode('B'),
        //             ub.funcs.getColorByColorCode('RB'),
        //             ub.funcs.getColorByColorCode('W'),
        //         ], 1);

        //     ub.funcs.renderPipings(_.find(ub.data.pipings, {name: "Left End of Sleeve Piping 1/2"}), [
        //             ub.funcs.getColorByColorCode('B'),
        //             ub.funcs.getColorByColorCode('RB'),
        //             ub.funcs.getColorByColorCode('W'),
        //         ], 1);

        //     ub.funcs.renderPipings(_.find(ub.data.pipings, {name: "Right End of Sleeve Piping 1/2"}), [
        //             ub.funcs.getColorByColorCode('B'),
        //             ub.funcs.getColorByColorCode('RB'),
        //             ub.funcs.getColorByColorCode('W'),
        //         ], 1);

        // }

    }

    ub.loadSettings = function (settings) {

        ub.current_material.settings    = settings;
        var uniform_type                = ub.current_material.material.type;

        _.each(ub.current_material.settings[uniform_type], function (e) {

            if (e.setting_type === 'highlights' || 
                e.setting_type === 'shadows' || 
                e.setting_type === 'static_layer') { return; }

            if (ub.data.skipTeamColorProcessing.shouldSkip(ub.current_material.material.uniform_category, e.code)) { 
                
                if (typeof e.code !== "undefined") {
                    ub.utilities.info(e.code.toTitleCase() + ' layer detected, skipping add to Team Colors...');     
                }
                
                return; 

            }

            if (typeof e.code !== 'undefined') {

                var _materialOption = _.find(ub.current_material.materials_options, {name: e.code.toTitleCase()});
                var _team_color_id  =  parseInt(_materialOption.team_color_id);

                e.team_color_id     = _team_color_id;

                var _allowPattern   =  parseInt(_materialOption.allow_pattern);
                e.has_pattern = _allowPattern;

                if (e.has_pattern === 1) {

                    if (_materialOption.pattern_properties !== null && _materialOption.pattern_properties !== "") {

                        if (typeof e.pattern === "undefined" || e.pattern.pattern_id === "") {

                            if (typeof _materialOption.pattern_properties !== 'undefined' && _materialOption.pattern_properties.length !== 0 ) { 
                                e.pattern =  ub.funcs.getPatternObjectFromMaterialOption(_materialOption);
                            }    

                        }
                        
                    }
                    else {

                        e.pattern = undefined;

                    }
                    
                }

            }

            ub.change_material_option_color16(e.code, e.color);
            
            if (typeof e.color !== 'undefined') {

                var _hexCode = (e.color).toString(16);
                var _paddedHex = util.padHex(_hexCode, 6);
                var _modLabelName = e.code.toTitleCase();
                var _limitedColorSet = ub.data.materialOptionWithLimitedColors.getLimitedColorSet(_modLabelName);

                // Only add to team colors if material option does not belong to the group of layers that has a different color set
                if (typeof _limitedColorSet === "undefined" && _modLabelName !== "Extra") {

                    ub.data.colorsUsed[_paddedHex] = {hexCode: _paddedHex, parsedValue: util.decimalToHex(e.color, 6), teamColorID: _team_color_id};    

                } else {
                    
                    if (_modLabelName === "Extra") {
                        ub.utilities.info(_modLabelName + ' layer detected, skipping add to Team Colors...');                        
                    } else {
                        ub.utilities.info(_modLabelName + ' has a different color set, skipping add to Team Colors...');    
                    }

                }

            }
            
            if(typeof e.gradient !== 'undefined') {

                if (typeof e.gradient.gradient_obj !== 'undefined') {

                    ub.generate_gradient(e.gradient.gradient_obj, e.code);    

                }

            }

            if(typeof e.pattern !== 'undefined'){

                if (typeof e.pattern.pattern_obj !== 'undefined') {

                    if (e.pattern.pattern_obj.name === "Blank") { return; }
                    ub.generate_pattern(e.code, e.pattern.pattern_obj, e.pattern.opacity, e.pattern.position, e.pattern.rotation, e.pattern.scale);
         
                }    

            }

        });

        /// Transform Applications

        if (typeof ub.temp === "undefined") {

            ub.data.convertDefaultApplications();

        }

        ub.funcs.showLocations();

        // if (ub.config.material_id === 731) {

        //     ub.current_material.settings.applications[1].tailsweep = {

        //         id: 10,
        //         code: 'yankees',
        //         thumbnail: 'yankees.png',
        //         length: 'long',

        //     };

        // }


        /// End Transform Applications

        /// Load Applications, Text Type

        var font_families = [];

        _.each(ub.current_material.settings.applications, function (application_obj) {
            
            if (application_obj.type !== "mascot" && application_obj.type !== "logo" && application_obj.type !== "free") {

                var _textApplicationTypes   = ['player_name', 'front_number', 'team_name', 'back_number', 'shoulder_number', 'tv_number', 'sleeve_number', 'numbers_extra'];
                var _isATextApplication     = _.contains(_textApplicationTypes, application_obj.type);

                if (_isATextApplication) {

                    WebFont.load({
                    
                        custom: {

                          families: [application_obj.font_obj.name],

                        },
                        active: function () {

                            ub.create_application(application_obj, undefined);

                        },

                    });

                }

            }

            if (application_obj.type === "mascot"){

                ub.funcs.update_application_mascot(application_obj.application, application_obj.mascot);

            }

            if (application_obj.type === "logo"){

                ub.update_application_logo(application_obj);

            }
                
        });

        /// 

        // Initialize Transformed Applications
        // ub.funcs.transformedApplications();
        // $('.app_btn').click();

        // Process Pipings Here

        if (ub.funcs.isCurrentSport('Baseball') || ub.funcs.isCurrentSport('Fastpitch')) {

            if (ub.current_material.pipings !== null) {

                ub.funcs.processPipings(ub.current_material.material.pipings);

                if (_.size(ub.current_material.settings.pipings) > 0) {

                    ub.funcs.processSavedPipings();

                }

            }

        }

        // Process Random Feeds Here

        if (ub.current_material.material.random_feed !== null) {

            ub.funcs.processRandomFeeds(ub.current_material.material.random_feed);

            if (_.size(ub.current_material.settings.randomFeeds) > 0) {

                ub.funcs.processSavedRandomFeeds();

            }

        }

        // Applications

            ub.funcs.printUniformInfo(ub.current_material.material, ub.current_material.settings);

        // End Applications

        if (ub.funcs.isCurrentSport('Crew Socks (Apparel)')) {

            // Activate Left View when a sock is loaded
            ub.funcs.activateLeftView();

        }

    };

    ub.funcs.activateLeftView = function () {

        $('a.footer-buttons.change-view[data-view="left"]').trigger('click');

    }

    // Initialize uniform settings
    ub.init_settings_object = function () {

        ub.current_material.containers = {};

        var settings = ub.current_material.settings;

        settings.team_colors = [
            // {
            //     color: '',
            // },
            // {
            //     color: '',
            // },
            // {
            //     color: '',
            // },
            // {
            //     color: '',
            // },
        ];

        settings.uniform_category = ub.current_material.material.uniform_category;

        settings.upper = {};

        settings.lower = {
            preview: '',  
        };

        settings.upper = {
            preview: '',
        };

        ub.current_material.containers.files = {};
        ub.current_material.containers.files.logos = [];

        settings.applications = {};

        var current_material = ub.current_material.material;
        var material_options = ub.current_material.materials_options;
        var type = current_material.type;

        settings[type].material_id = current_material.id;
        settings[type].code = current_material.code;

        ub.current_material.containers[type] = {};
        ub.current_material.containers[type].application_containers = {};

        _.each(material_options, function (material_option) {

            var name = '';
            var obj  = '';

            name = material_option.name;
            settings[type][name] = {};

            ub.current_material.containers[type][name] = {};
            ub.current_material.containers[type][name].pattern_containers = {};

            obj = settings[type][name];

            obj.setting_type = material_option.setting_type;

            obj.code = name.toCodeCase();
            obj.color = '';
            obj.gradient_is_above_pattern = false;
            
            obj.has_gradient = false;
            obj.has_pattern = false;
            obj.pattern_containers = {};
            
            obj.gradient = {
                    gradient_obj: undefined,
                    gradient_id: '',
                    scale: 0,
                    rotation: 0,
                    opacity: 0,
                    position: {
                        x: 0,
                        y: 0,
                    },
                    color_stops: [
                        {
                            value: 0,
                            color: '',
                        },
                        {
                            value: 1,
                            color: '',
                        }
                    ],

            };    

            obj.pattern = {
                pattern_id: '',
                pattern_obj: undefined,
                scale: 0,
                rotation: 0,
                opacity: 0,
                position: {
                    x: 0,
                    y:0,
                },
            };

            obj.fabric = {
                fabric_id: '',
            }

            obj.logo = {
                filename: '',
                rotation: 0,
                scale: 0,
                position_id: 0,
                position: {
                    x: 0,
                    y: 0,
                }
            }

            obj.team_name = {
                
                text: '',
                font: {
                    name: '',
                    font_size: '',
                    font_style: '',
                },

                colors: [
                    
                    {
                        color: '',
                        opacity: '',
                        width: '',
                    },
                    {
                        color: '',
                        opacity: '',
                        width: '',
                    },
                    {
                        color: '',
                        opacity: '',
                        width: '',
                    },
                ],

                rotation: 0,
                scale: 0,
                position_id: 0,
                position: {
                    x: 0,
                    y: 0,
                },

                has_texture: false,
                has_pattern: false,
                texture_is_above_pattern: false,

                gradient: {
                    gradient_id: '',
                    scale: 0,
                    rotation: 0,
                    opacity: 0,
                    position: {
                        x: 0,
                        y: 0,
                    },
                    color_stops: [
                        {
                            value: 0,
                            color: '',
                        },
                        {
                            value: 1,
                            color: '',
                        }
                    ],

                },    

                pattern: {
                    pattern_id: '',
                    scale: 0,
                    rotation: 0,
                    opacity: 0,
                    position: {
                        x: 0,
                        y:0,
                    },
                }

            };

            obj.number = {
                
                text: '',
                font: {
                    name: '',
                    font_size: '',
                    font_style: '',
                },

                colors: [
                    {
                        color: '',
                        opacity: '',
                        width: '',
                    },
                    {
                        color: '',
                        opacity: '',
                        width: '',
                    },
                    {
                        color: '',
                        opacity: '',
                        width: '',
                    },
                ],

                rotation: 0,
                scale: 0,
                position_id: 0,
                position: {
                    x: 0,
                    y: 0,
                },

                has_texture: false,
                has_pattern: false,
                texture_is_above_pattern: false,

                gradient: {
                    gradient_id: '',
                    scale: 0,
                    rotation: 0,
                    opacity: 0,
                    position: {
                        x: 0,
                        y: 0,
                    },
                    color_stops: [
                        {
                            value: 0,
                            color: '',
                        },
                        {
                            value: 1,
                            color: '',
                        }
                    ],

                },    
                pattern: {
                    pattern_id: '',
                    scale: 0,
                    rotation: 0,
                    opacity: 0,
                    position: {
                        x: 0,
                        y:0,
                    },
                }

            };

            obj.player_name = {
                
                text: '',
                font: {
                    name: '',
                    font_size: '',
                    font_style: '',
                },

                colors: [
                    {
                        color: '',
                        opacity: '',
                        width: '',
                    },
                    {
                        color: '',
                        opacity: '',
                        width: '',
                    },
                    {
                        color: '',
                        opacity: '',
                        width: '',
                    },
                ],

                rotation: 0,
                scale: 0,
                position_id: 0,
                position: {
                    x: 0,
                    y: 0,
                },

                has_texture: false,
                has_pattern: false,
                texture_is_above_pattern: false,

                gradient: {
                    gradient_id: '',
                    scale: 0,
                    rotation: 0,
                    opacity: 0,
                    position: {
                        x: 0,
                        y: 0,
                    },
                    color_stops: [
                        {
                            value: 0,
                            color: '',
                        },
                        {
                            value: 1,
                            color: '',
                        }
                    ],

                },    

                pattern: {
                    pattern_id: '',
                    scale: 0,
                    rotation: 0,
                    opacity: 0,
                    position: {
                        x: 0,
                        y:0,
                    },
                }

            };

            obj.team_roster = [];

        });

    };

    /// Show Viewports 

    ub.funcs.showViewports = function () {

        $('#main_view').fadeIn();

    }

    /// End Show Viewports

    window.ub.setup_material_options = function () {

        ub.current_material.options_distinct_names = {};

        ub.maxLayers = 0;

        _.each(ub.views, function (view) {

            var material_options = _.where(ub.current_material.material.options, {perspective: view});
            var current_view_objects = ub.objects[view + '_view']; 
            var _layerCount = 0;

            _.each(material_options, function (obj, index) {

                _layerCount +=1;

                var name = obj.name.toCodeCase();

                current_view_objects[name] = ub.pixi.new_sprite(obj.material_option_path);
                var current_object = current_view_objects[name];

                current_object.name = name;

                // Multiplied to negative one because
                // UpdateLayers order puts the least zIndex on the topmost position

                current_object.zIndex = (obj.layer_level * ub.zIndexMultiplier) * (-1); 
                current_object.originalZIndex = (obj.layer_level * 2) * (-1);
                
                // So these static layers will be above the random feed layers in 

                if (ub.funcs.isCurrentSport('Crew Socks (Apparel)')) {

                    if (name === "back_tab")  {

                        current_object.zIndex = -86;
                        current_object.originalZIndex = -86;

                    }

                    if (name === "prolook")  {

                        current_object.zIndex = -87;
                        current_object.originalZIndex = -87;

                    }

                }
                
                if (obj.setting_type === 'highlights') {

                    current_object.blendMode = PIXI.BLEND_MODES.SCREEN;

                } else if (obj.setting_type === 'shadows') {

                    current_object.blendMode = PIXI.BLEND_MODES.MULTIPLY;

                } else {
                    
                    var default_color = '';

                    if (obj.default_color === null) {

                        default_color = "B";

                    }
                    else {

                        default_color = obj.default_color;

                        /// Trap for blank default color
                        if (default_color === '') {
                            default_color = 'B';
                        }

                    }

                    var color = _.find(ub.data.colors, { color_code: default_color });
                    var tint = parseInt(color.hex_code, 16);
                    var modifier_label = name;
    
                    // Skip creating distinct name object if name already exists
                    if (typeof ub.current_material.options_distinct_names[name] !== "object") {

                        ub.current_material.options_distinct_names[name] = { setting_type: obj.setting_type, 'modifier_label': modifier_label, 'material_option': name, 'default_color': color.hex_code, 'available_colors': JSON.parse(obj.colors), 'layer_order': obj.layer_level, };
                        ub.data.defaultUniformStyle[name] = { name: name, default_color: tint, colorObj: color};
                    
                    }
                    
                }

                // Add a dummy material option duplicate of the layer if the layer is detected as a "Shape", 
                // dummy layer will be used as a mask for patterns and gradients

                if (obj.setting_type === 'shape') {

                    var mask =  ub.pixi.new_sprite(obj.material_option_path);
                    mask.name = name + '_mask';
                    mask.zIndex = current_object.zIndex + (-1);
                    mask.blendMode = PIXI.BLEND_MODES.MULTIPLY;

                    var mask_distinct = _.clone(ub.current_material.options_distinct_names[name]);
                    mask_distinct.setting_type = 'static_layer';

                    ub.current_material.options_distinct_names[mask.name] = mask_distinct;
                    current_view_objects[mask.name] = mask;

                    ub[view + '_view'].addChild(mask);

                }

                ub[view + '_view'].addChild(current_object);

            });

            ub.utilities.info('Layer Count for ' + view.toTitleCase() + ' View: ' + _layerCount);

            if (_layerCount > ub.maxLayers) { ub.maxLayers = _layerCount};

            ub.updateLayersOrder(ub[view + '_view']);

        });    

        /// Manual Color Test 

            // $('#manual_change_color').on('click', function(e){

            //    ub.change_material_option_color($('select#parts_dropdown').val(), $('#hex_color').val().substring(1,7));

            // });

            // $('#hex_color').colorpicker({
            //     format: 'hex',
            // }).on('changeColor.colorpicker', function(event){
            //     $('#manual_change_color').click();                
            // });

            $('select#parts_dropdown').html('');
            var prev = '';

            _.each(ub.current_material.options_distinct_names, function (part){

                if(prev === part.material_option){
                    return;
                }
                
                $('select#parts_dropdown').append('<option value="' + part.material_option + '">' + part.material_option.replace('_', ' ').toUpperCase() + '</option>')
                prev = part.material_option;

            });

            $('select#parts_dropdown').val('body')


        /// End Manual Color Test    



        /// Setup Modifiers Applications 

    };

        /// End Render Different Views ///

        /// Utilities ///

            ub.funcs.getCustomizations = function (id) {

                var _url = '';

                if (window.ub.page === "order") {

                    _url = window.ub.config.api_host + '/api/order/items/' + id;

                } else if (window.ub.page === "saved-design") {

                    _url = window.ub.config.api_host + '/api/saved_design/' + id;

                }
                
                $.ajax({
            
                    url: _url,
                    type: "GET", 
                    dataType: "json",
                    crossDomain: true,
                    contentType: 'application/json',
                
                    success: function (response){
                        
                        var settings = '';

                        if (window.ub.page === "order") {

                            _settings = JSON.parse(response.order[0].builder_customizations);

                        }
                        else if (window.ub.page === "saved-design") {

                            _settings = JSON.parse(response.saved_design.builder_customizations);

                        }    

                        ub.loadSettings(_settings);
                        
                    }
                
                });

            }

            ub.init_style = function () {

                // Builder Customizations, from an Order is loaded on this object, see #load_order @ uniform-builder.blade.php
                if (typeof window.ub.temp !== 'undefined') { 

                    ub.funcs.getCustomizations(window.ub.temp);
                    
                }
                else {

                    ub.loadDefaulUniformStyle(ub.data.defaultUniformStyle);
                    
                }

            }

            ub.loadDefaulUniformStyle = function (defaultUniformStyle) {

                // Colors ok, TODO: Patterns and Gradients

                _.each(defaultUniformStyle, function (style) {

                    var uniform_type = ub.current_material.material.type;
                    var mo_setting = _.find(ub.current_material.settings[uniform_type], {code: style.name});

                    mo_setting.color = style.default_color;
                    mo_setting.colorObj = style.colorObj;

                });

                ub.loadSettings(ub.current_material.settings);

            }

            /// Move Utils


            /// End Move Utils

            ub.change_material_option_color = function (material_option, color) {

                var parsed_color = parseInt(color,16)

                ub.save_color(material_option, parsed_color);

                _.each(ub.views, function (v) {

                    var objects_in_view = ub.objects[v + '_view']

                    if(_.has(objects_in_view, material_option)){

                        objects_in_view[material_option].tint = parsed_color;
    
                    }
                    
                });

            }

            ub.change_material_option_color16 = function (material_option, color) {

                var parsed_color = color;

                //ub.save_color(material_option, parsed_color);

                _.each(ub.views, function (v) {

                    var objects_in_view = ub.objects[v + '_view']

                    if(_.has(objects_in_view, material_option)){

                        objects_in_view[material_option].tint = parsed_color;

                    }
                    
                });

            }

            ub.applyMaterial = function (target) {

                var texture = new PIXI.RenderTexture(ub.renderer,ub.dimensions.width,ub.dimensions.height);
                texture.render(ub['pattern_view']);

                /// Placeholder, change this to target
                target = 'body';

                var views = ['front', 'back', 'left', 'right'];
                var temp_pattern = {};
                
                _.each(views, function (v){

                    var view = v + '_view';

                    temp_pattern[v] = new PIXI.Sprite(texture);

                    if (typeof(ub.objects[view].pattern) !== 'undefined') {
                        ub[view].removeChild(ub.objects[view].pattern);    
                    }
                    
                    if (target === 'body') {
                        temp_pattern[v].mask = ub.objects[view].shape_mask;
                    }    
                    else {
                        var mask = ub.objects[view][target + "_mask"];
                        temp_pattern[v].mask = mask;
                        temp_pattern[v].zIndex = mask.zIndex;
                    }

                    ub.objects[view].pattern = temp_pattern[v];
                    ub[view].addChild(temp_pattern[v]);

                    ub.updateLayersOrder(ub[view]);

                });

            }


            ub.getThumbnailImage = function (view, rotate) {

                ub.funcs.resetHighlights();

                var texture = new PIXI.RenderTexture(ub.renderer, 1000, 1500);
                texture.render(ub[view]);
                
                return texture.getImage().src;

            }

            ub.getThumbnailImage2 = function (view, rotate) {

                var texture = new PIXI.RenderTexture(ub.renderer, 1000, 1500);
                texture.render(ub[view]);
                
                return texture.getImage().src;

            }

            ub.showThumbnail = function () {

                var img = ub.getThumbnailImage2('front_view');
                var _str = "<img src ='" + img + "' />";

                ub.showModalTool(_str);

            }

            ub.showThumbnail2 = function () {

                var img = ub.getThumbnailImage2(ub.active_view + '_view');
                var _str = "<img src ='" + img + "' />";

                ub.showModalTool(_str);

            }
            
            /// Refresh Thumbnail Views ///

            ub.refresh_thumbnails = function () {

                if (ub.VERSION === "Edge") {

                    _.each(ub.views, function (view) {

                        var view_name = view + '_view';
                        var id = 'a#' + 'view_' + view + ' > img';

                        $(id).attr('src', ub.getThumbnailImage(view_name));

                    });

                    $('a#view_pattern > img').attr('src', ub.getThumbnailImage('pattern_view'));

                }


            }


        /// End Utilities ///

        
        /// Start Everything 

        window.ub.initialize();


    /// END NEW RENDERER /// 

    /// UI Functions /// 
    
        switch_panel('#materials_panel');

        function switch_panel(panel){

            $('.options_panel').hide();
            var $btns = $('div#right-sidebar > a.sidebar-buttons').css('background-color','#acacac');

            $btns.removeClass('highlighter_on');
            $btns.addClass('highlighter_off');

            // $(panel).fadeIn(100);
            $(panel).show();

        }

        /// RIGHT SIDEBAR

            $('div#right-sidebar > a.sidebar-buttons').on('click', function (e) {

                $('#arrow_design_sets').remove();

                if (ub.active !== null) {

                    filename = ub.config.host + '/images/sidebar/' + ub.active.data('filename') + '.png';
                    ub.active.removeClass('active_button');

                }

                ub.active = $(this);
                filename = ub.config.host + '/images/sidebar/' + ub.active.data('filename') + '-on' + '.png';

                ub.active.addClass('active_button');

                switch_panel('#' +  ub.active.data('filename') + '_panel');

                return false;

            });

            $('div#right-sidebar > a.sidebar-buttons').hover(function (e) {

                var s = $(e.currentTarget);

                if (s.is($('#right-sidebar > a.active_button')[0])) {
                    return;
                }
                
                s.removeClass('highlighter_off');
                s.addClass('highlighter_on');
                
 
            }, function (e) {

                var s = $(e.currentTarget);

                if (s.is($('#right-sidebar > a.active_button')[0])) {
                    return;
                }

                s.removeClass('highlighter_on');
                s.addClass('highlighter_off');

            });

        /// END RIGHT SIDEBAR


        /// LEFT SIDEBAR

            $('div#left-sidebar > a.sidebar-buttons').hover(function (e) {

                var s = $(e.currentTarget).attr('class').split(' ')[0];
                var sidebar_classes = ['btn-new', 'btn-load', 'btn-compare', 'btn-save'];

                if (_.contains(sidebar_classes, s)) {

                    if (s === 'btn-new' && $('a.' + s).data('status') === 'close') {
                        return;
                    }

                    $('a.' + s).removeClass('highlighter_off');
                    $('a.' + s).addClass('highlighter_on');

                }                           

            }, function (e){

                var sidebar_classes = ['btn-new', 'btn-load', 'btn-compare', 'btn-save'];
                var s = $(e.currentTarget).attr('class').split(' ')[0];

                if (_.contains(sidebar_classes, s)) {

                    if ($('a.' + s).data('status') === 'new' || s !== 'btn-new') {

                        $('a.' + s).removeClass('highlighter_on');
                        $('a.' + s).addClass('highlighter_off');

                    }    

                }                           

            });

            $('div#left-sidebar > a.sidebar-buttons').on('click', function (e) {

                $('#arrow_design_sets').remove();

                var s = $(e.currentTarget).attr('class').split(' ')[0];
                
                if (s === "btn-new") {

                    var status = $('a.btn-new').data('status');

                    if (status === 'new') {

                        $('#main_view > canvas').hide();
                        $('#right-main-window > .options_panel').hide();
                        $('#right-sidebar > a').hide();

                        var div_sports = "<div class='picker_container'></div>"
                        
                        $('#main_view').append(div_sports);
                        $('#left-main-window').css('overflow-y', 'scroll'); 

                        var filename = '/images/sidebar/' + 'close.png';
                        
                        $('a.btn-new').removeClass('highlighter_off');
                        $('a.btn-new').addClass('highlighter_on');
                        $('a.btn-new').data('status','close');

                        $('#right-main-window').css('background-color','#f8f8f8');
                        ub.display_gender_picker();

                    }
                    else {

                        $('#main_view > canvas').fadeIn();
                        $('#right-main-window > .options_panel').fadeIn();
                      
                        $('#right-sidebar > a').fadeIn();

                        $('#main_view > div.picker_container').remove();
                        $('#right-main-window > div.picker_container').remove();

                        $('#left-main-window').css('overflow-y', 'hidden'); 

                        var filename = '/images/sidebar/' + 'new.png';
 
                        $('a.btn-new').removeClass('highlighter_off');
                        $('a.btn-new').addClass('highlighter_on');
                        $('a.btn-new').data('status','new');
 
                        $('#right-main-window').css('background-color','#ffffff');
                        $('#left-main-window').css('background-color','#ffffff');

                        switch_panel('#materials_panel');

                    }

                }

                return false;

            });

        /// END LEFT SIDEBAR

        /// Process Changes ///

        ub.bind_handler_category_picker = function () {

            $('div.sports_categories').hover(function (e) {

                $('div.sports_categories').removeClass('sports_categories_highlighted');

                var el = $(e.currentTarget);
                el.addClass('sports_categories_highlighted');

            }, function (e) {
                
                var el = $(e.currentTarget);
                el.removeClass('sports_categories_highlighted');

            });

            $('div.sports_categories').click(function (e) {

                if (typeof(ub.ui.active_element) !== 'undefined') {
                    ub.ui.active_element.removeClass('sports_categories_activated');
                }    

                ub.ui.active_element = $(e.currentTarget);
                ub.ui.active_element.addClass('sports_categories_activated');

                var category = ub.ui.active_element.data('category');
                var gender = ub.ui.active_element.data('gender');

                ub.display_design_sets(category, gender, 'Upper');

            });

        };

        ub.bind_handler_design_set_picker = function () {

            $('div.style_entry').hover(function (e){

                $('div.style_entry').removeClass('style_entry_highlighted');

                var el = $(e.currentTarget);
                el.addClass('style_entry_highlighted');

            }, function (e){
                
                var el = $(e.currentTarget);
                el.removeClass('style_entry_highlighted');

            });

            $('div.style_entry').click(function (e){

                ub.ui.active_style_element = $(e.currentTarget);
                var picker_type = ub.ui.active_style_element.data('picker-type');

                if (picker_type === 'design_sets') {

                    var id = -1;
                    var url = '';

                    var option = ub.ui.active_style_element.data('option');

                    id = ub.ui.active_style_element.data('id');

                    if (option === 'All') {
                        url = ub.config.host + '/builder/' + id;    
                    }
                    else {
                        url = ub.config.host + '/builder/0/' + id;    
                    }

                    ub.ui.current_design_set = _.find(ub.design_sets, {id: id});
                    window.location = url;

                }
                else {

                    var category_name = ub.ui.active_style_element.data('category-name');
                    var gender_name = ub.ui.active_style_element.data('gender').toLowerCase();

                    ub.display_design_sets(category_name, gender_name, 'All');

                    $('#active_sports_category').text(category_name.toUpperCase() + ' > ' + gender_name.toUpperCase());

                }

            });


            /* Gender Picker */

                $('div.gender_picker').click(function (e){

                    var element = $(e.currentTarget);
                    var gender = element.data('gender');

                    ub.display_categories(gender);

                });

                $('div.gender_picker').hover(function (e){

                    $('div.gender_picker').removeClass('gender_picker_highlighted');

                    var el = $(e.currentTarget);
                    el.addClass('gender_picker_highlighted');

                }, function (e){
                    
                    var el = $(e.currentTarget);
                    el.removeClass('gender_picker_highlighted');

                });

            /* End Gender Picker */

        };

        ub.bind_handlers = function () {

            $('.change-color').on('click', function (e){

               var color = $(this).data('color');
               var target = $(this).data('target');
               var panel = $(this).data('panel');
               var color_element = $(this);

               window.ce = color_element;

               var selection = $(window.ce).data('selection');

//             if (selection !== 'none') {
//                  $('#' + selection).css('background-color', color);
//             }

               color_element.parent().data("active_color", color);
               ub.change_color(target, color, panel);

//             $("button[data-target='" + target +"']").html('');

               var path = '/images/sidebar/';
               var highlighter = '';

               if (color === "#ffffff") {
                    path = path + 'highlighter-dark.png';
               }
               else {
                    path = path + 'highlighter_1.png';
               }

               highlighter = "<img src = '" + path + "'>";
               
//             $(this).html(highlighter);
                
            }); 

            
            ub.change_color = function (obj, color, panel) {

                var color_param = color;

                if (color_param === '#ffffff') {
                    color_param = "#ebebeb";
                }

                var color_value = parseInt(color_param.substring(1), 16);

                if (panel === 'body') {

                    ub.change_material_option_color('body', color_param.substring(1));


                    if (typeof(ub.objects.left_view['pattern']) !== 'undefined') {

                        ub.objects.front_view['pattern'].visible = false;
                        ub.objects.back_view['pattern'].visible = false;
                        ub.objects.left_view['pattern'].visible = false;
                        ub.objects.right_view['pattern'].visible = false;

                    }

                    if (typeof(ub.objects.pattern_view.gradient_layer) === "object") {

                        if (typeof ub.objects.front_view['gradient'] === "object") {
                            ub.objects.front_view['gradient'].visible = false;    
                        }
                        
                        if (typeof ub.objects.back_view['gradient'] === "object") {
                            ub.objects.back_view['gradient'].visible = false;    
                        }
                        
                        if (typeof ub.objects.left_view['gradient'] === "object") {
                            ub.objects.left_view['gradient'].visible = false;    
                        }
                        
                        if (typeof ub.objects.right_view['gradient'] === "object") {
                            ub.objects.right_view['gradient'].visible = false;    
                        }
                        
                    }
              
                } else if (panel == 'patterns') {

                    if (typeof(ub.objects.pattern_view.gradient_layer) === "object") {
                        ub.objects.pattern_view.gradient_layer.visible = false;
                    }

                    ub.objects.pattern_view[obj].tint = color_value;
                    ub.applyMaterial(panel);
                    
                    ub.objects.front_view['pattern'].visible = true;
                    ub.objects.back_view['pattern'].visible = true;
                    ub.objects.left_view['pattern'].visible = true;
                    ub.objects.right_view['pattern'].visible = true;
                  
                } else {

                    ub.change_material_option_color(obj, color_param.substring(1));

                }
                
                $('[rel="popover"]').popover("hide");

                ub.refresh_thumbnails();

            }

            /// Change Pattern ///

            $('.change-pattern').on('click', function (e) {

               var pattern = $(this).data('pattern');
               var target = $(this).data('target-pattern');
               var panel = $(this).data('panel');
               var pattern_element = $(this);

               window.ce = pattern_element;

               var selection = $(window.ce).data('selection');

               pattern_element.parent().data("active_pattern", pattern);
               ub.change_pattern(target, pattern, panel);

               $("button[data-target-pattern='" + target +"']").html('');

               var path = '/images/sidebar/';
               var highlighter = '';

               path = path + 'highlighter_1.png';
               highlighter = "<img src = '" + path + "'>"
               
               $(this).html(highlighter);
                
            }); 

            ub.change_pattern = function (target, pattern, panel) {

                var el = _.find(ub.data.patterns.items, { code: pattern });
                var clone = {};
                var clone = _.clone(el);
                var cont = $("[data-group=patterns][data-option=" + target + "]").find('div.layers_container');

                cont.html('');

                var elements = "";

                if (el.layers.length > 0) {
                    elements = "<br />Layers<br /><br />";
                }

                _.each(el.layers, function (e, index) {

                    var val = e.default_color;
                    var col = e.default_color;
                    var filename = e.filename;
                    
                    elements += ub.create_pattern_color_picker(index, val, col, target, el.code); 

                });

                elements += "<br />";
                elements += "Rotation: <span class='pattern_slider_label' data-target='pattern' data-layer='" + target + "' data-label='rotation' data-id='" + target + "'>100</span>%<br />";
                elements += "<div id='rotation_pattern_slider_" + target + "' class='pattern_slider pattern_rotation_slider'></div>";

                elements += "<br />";
                elements += "Opacity: <span class='pattern_slider_label' data-target='pattern' data-layer='" + target + "' data-label='opacity' data-id='" + target + "'>100</span>%<br />";
                elements += "<div id='opacity_pattern_slider_" + target + "' class='pattern_slider'></div>";

                elements += "<br />";
                elements += "Scale: <span class='pattern_slider_label' data-target='pattern' data-layer='" + target + "' data-label='scale' data-id='" + target + "'>100</span>%<br />";
                elements += "<div id='scale_pattern_slider_" + target + "' class='pattern_slider'></div>";

                elements += "<br />";
                elements += "Position X: <span class='pattern_slider_label' data-target='pattern' data-layer='" + target + "' data-label='position_x' data-id='" + target + "'>100</span>%<br />";
                elements += "<div id='position_x_slider_" + target + "' class='pattern_slider'></div>";

                elements += "<br />";
                elements += "Position Y: <span class='pattern_slider_label' data-target='pattern' data-layer='" + target + "' data-label='position_y' data-id='" + target + "'>100</span>%<br />";
                elements += "<div id='position_y_slider_" + target + "' class='pattern_slider'></div>";

                elements += "<hr />";

                elements += "<div id='angle_pattern_slider_" + target + "' class='pattern_slider_angle'></div>";
                elements += "<hr />";
                
                elements += "<button style='width: 100%;' id='update-pattern-" + target + "' data-target='" + target + "' data-pattern='" + el.code + "'>Update Pattern</button>";

                cont.html(elements);

                $('input.pattern_' + target).ubColorPicker({
                    target: target,
                    type: 'pattern',
                });

                var layers = _.pluck(clone.color_layers, 'value');
                var layers_clone = [];

                _.each(layers, function (e) {
                    layers_clone.push(e * 100);
                });

                //// Rotation 

                var max_rotation = 620;
                var $rotation_slider = $('div#rotation_pattern_slider_' + target);
                $rotation_slider.roundSlider({

                    values: [0],
                    min: 0,
                    max: max_rotation,
                    gap: 0,
                    width: 5,
                    handleSize: "+14",
                    startAngle: 90,

                    change: function(event, ui) {

                        var value = parseInt($rotation_slider.find('span.edit').html());
                        $('span[data-target="pattern"][data-label="rotation"][data-layer="' + target + '"]').text(value);
                        $("button#update-pattern-" + target).click();

                    }

                });

                //// End Rotation 

                var max_opacity = 100;
                $('#' + 'opacity_pattern_slider_' + target).limitslider({
                    
                    values: [max_opacity],
                    min: 0,
                    max: 100,
                    gap: 0,
                    change: function (event, ui) {

                        var value = $(this).limitslider("values")[0];
                        $('span[data-target="pattern"][data-label="opacity"][data-id="' + target + '"]').text(value);
                        $("button#update-pattern-" + target).click();

                    },
                });

                var max_scale = 200;
                $('#' + 'scale_pattern_slider_' + target).limitslider({
                    
                    values: [100],
                    min: 0,
                    max: max_scale,
                    gap: 0,
                    change: function (event, ui) {

                        var value = $(this).limitslider("values")[0];
                        $('span[data-target="pattern"][data-label="scale"][data-id="' + target + '"]').text(value);
                        $("button#update-pattern-" + target).click();

                    },
                });


                var max_x = 100;
                $('#' + 'position_x_slider_' + target).limitslider({
                    
                    values: [50],
                    min: 0,
                    max: 100,
                    gap: 0,
                    change: function (event, ui) {

                        var value = $(this).limitslider("values")[0];
                        $('span[data-target="pattern"][data-label="slider_x"][data-id="' + target + '"]').text(value);
                        $("button#update-pattern-" + target).click();

                    },
                 });

                var max_y = 100;
                $('#' + 'position_y_slider_' + target).limitslider({
                    
                    values: [50],
                    min: 0,
                    max: max_y,
                    gap: 0,
                    change: function (event, ui) {

                        var value = $(this).limitslider("values")[0];
                        $('span[data-target="pattern"][data-label="slider_y"][data-id="' + target + '"]').text(value);
                        $("button#update-pattern-" + target).click();

                    },
                 });

                //// End Part

                $("button#update-pattern-" + target).click('click', function (e) {

                    var uniform_type = ub.current_material.material.type;
                    var target_name = target.toTitleCase();

                    var pattern_settings = ub.current_material.containers[uniform_type][target_name];
                    pattern_settings.pattern_containers = {};

                    var views = ub.data.views;
                    var _container = undefined;

                    _.each(views, function (v){

                        pattern_settings.pattern_containers[v] = {};
                        
                        var namespace = pattern_settings.pattern_containers[v];
                        namespace.container = new PIXI.Container();
                        var container = namespace.container;
                        container.sprites = {};

                        /// Process Rotation

                        var $rotation_slider = $('div#rotation_pattern_slider_' + target);
                        var value = parseInt($rotation_slider.find('span.edit').html());

                        container.rotation = value / 100;
                        container_rotation = container.rotation;

                        /// End Rotation

                        /// Process Scale 

                        var $scale_slider = $('div#scale_pattern_slider_' + target);
                        var value = $scale_slider.limitslider("values")[0];
                        var scale = new PIXI.Point(value / 100, value / 100);

                        container.scale = scale
                        container_scale = container.scale;

                        /// End Process Scale

                        _.each(clone.layers, function (layer, index) {

                            var s = $('[data-index="' + index + '"][data-target="' + target + '"]');
                            container.sprites[index] = ub.pixi.new_sprite(layer.filename);

                            var sprite = container.sprites[index];

                            sprite.zIndex = layer.layer_number * -1;
                            sprite.tint = parseInt(layer.default_color,16);
                            sprite.anchor.set(0.5,0.5);

                            var $inputbox = $('input.pattern_' + target + '[data-index="' + index + '"]');
                            var val = $inputbox.val();
                            
                            if (val.length === 7) {
                                val = val.substr(1, 6);
                            }

                            sprite.tint = parseInt(val, 16);
                            container.addChild(sprite);

                            var opacity_value = $('#' + 'opacity_pattern_slider_' + target).limitslider("values")[0];
                            container.alpha = opacity_value / 100;

                            var x_value = $('#' + 'position_x_slider_' + target).limitslider("values")[0];
                            var y_value = $('#' + 'position_y_slider_' + target).limitslider("values")[0];

                            var x = ub.dimensions.width * (x_value / 100);
                            var y = ub.dimensions.height * (y_value / 100);

                            container.position = new PIXI.Point(x, y);

                            ub._temp = container;

                            // Properties for use when loading pattern from saved designs

                            layer.color = sprite.tint;
                            layer.container_position = container.position;
                            layer.container_opacity =container.alpha;
                            layer.container_rotation = container_rotation;
                            layer.container_scale = container_scale;

                            // End Properties for use when loading pattern from saved designs

                        });

                        ub.updateLayersOrder(container);

                        var view = v + '_view';
                        var mask = ub.objects[view][target + "_mask"];

                        if(typeof mask === 'undefined') {
                            return;
                        }

                        container.mask = mask;
                        container.name = 'pattern_' + target;

                        if (typeof ub.objects[view]['pattern_' + target] === 'object') {
                            ub[view].removeChild(ub.objects[view]['pattern_' + target]);
                        }

                        container.position.set(container.position.x +  (ub.offset.x * 7), container.position.y + (ub.offset.y * 7));

                        ub.objects[view]['pattern_' + target] = container;
                        ub[view].addChild(container);
                        container.zIndex = mask.zIndex + (-1);

                        ub.updateLayersOrder(ub[view]);
                        _container = container;

                    });

                    ub.refresh_thumbnails();
                    ub.save_pattern (target, clone, pattern);

                });

                $("button#update-pattern-" + target + "").click();

            };

            /// End Change Pattern ///

            /// Change Gradient - UI ///

                $('.change-gradient').on('click', function (e) {

                   var gradient = $(this).data('gradient');
                   var target = $(this).data('target-gradient');
                   var panel = $(this).data('panel');
                   var gradient_element = $(this);

                   window.ce = gradient_element;

                   var selection = $(window.ce).data('selection');

                   gradient_element.parent().data("active_gradient", gradient);
                   ub.change_gradient(target, gradient, panel);

                   $("button[data-target-gradient='" + target +"']").html('');

                   var path = '/images/sidebar/';
                   var highlighter = '';

                   path = path + 'highlighter_1.png';
                   highlighter = "<img src = '" + path + "'>"
                   
                   $(this).html(highlighter);
                    
                }); 

            /// End Change Gradient - UI ///

        };


        /// Change Gradient - Methods ///

        ub.change_gradient = function (target, gradient, panel) {

            var el = _.find(ub.data.gradients.items, { code: gradient });
            var clone = {};
            var clone = _.clone(el);

            var cont = $("[data-group=gradients][data-option=" + target + "]").find('div.color_stops_container');
            cont.html('');

            var elements = "";

            if (el.color_stops.length > 0) {
                elements = "<br />Color Stops<br /><br />";
            }

            _.each(el.color_stops, function (e, index) {

                var val = e.value;
                var col = e.color;
                
                elements += ub.create_color_picker(index, val, col, target, el.code); 

            });
            
            if (el.code === "custom" ) {

                var add_button = "<button id='add_gradient_color_stop'><i class='fa fa-plus-circle'></i></button>";
                var delete_button = "<button id='delete_gradient_color_stop'><i class='fa fa-minus-circle'></i></button>";

                var add_color_stop_button = "<div class='color_picker_container add_delete_color_stop'>" + add_button + "&nbsp;" + delete_button + "</div>";
                elements += "<br />";
                elements += add_color_stop_button;

            }

            elements += "<div id='gradient_slider_" + target + "' class='gradient_slider'></div>";
            elements += "<hr />";

            elements += "<div id='angle_gradient_slider_" + target + "' class='gradient_slider_angle'></div>";
            elements += "<hr />";
            
            elements += "<button style='width: 100%;' id='update-gradient-" + target + "' data-target='" + target + "' data-gradient='" + el.code + "'>Update Gradient</button>";

            cont.html(elements);

            $('input.gradient_' + target).ubColorPicker({
                target: target,
                type: 'gradient',
            });

            var stops = _.pluck(clone.color_stops, 'value');
            var stops_clone = [];

            _.each(stops, function (e) {
                stops_clone.push(e * 100);
            });

            $('#' + 'gradient_slider_' + target).limitslider({
                
                values: stops_clone,
                min: 0,
                max: 100,
                gap: 0,
                change: function (event, ui) {

                    $("button#update-gradient-" + target).click();

                },

             });

            $('#' + 'angle_gradient_slider_' + target).roundSlider({
                value: el.angle,
                min: 0,
                max: 360,
                startAngle: 90,
                width: 5,
                handleSize: "+14",
                change: function (event, ui) {
                    
                    $("button#update-gradient-" + target).click();

                },
             });

            $("button#update-gradient-" + target).click('click', function (e) {

                _.each(clone.color_stops, function (e, index) {

                    var temp_selector = 'gradient_' + target.toLowerCase() + '_' + index;
                    var $input = $('input[data-elid="' + temp_selector + '"]');
                    
                    $("#gradient_slider_" + target).find('span:eq(' + index + ')').css('background', $input.val());
                    
                    e.color = $input.val();

                    var temp = ($('#' + 'gradient_slider_' + target).limitslider("values")[index]);
                    temp = Math.floor(temp / 10);
                    temp = temp / 10;

                    e.value = temp;

                });

                clone.angle = parseInt($('#' + 'angle_gradient_slider_' + target).find('span.edit').html()); 
                ub.generate_gradient(clone, target);

            });

            if (el.code === "custom") {

                $('#add_gradient_color_stop').on('click', function () {

                    var obj_colors = _.find(ub.current_material.material.options, { name:  window.util.toTitleCase(target) });
                    var color_code = JSON.parse(obj_colors.colors)[clone.color_stops.length + 1];

                    color_obj = _.find(ub.data.colors, { color_code: color_code })

                    var new_color_stop = {

                        id: clone.color_stops.length + 1,
                        value: 0,
                        color: '#' + color_obj.hex_code,

                    };

                    clone.color_stops.push(new_color_stop);
                    var spacing = 1 / (clone.color_stops.length - 1);

                    _.each(clone.color_stops, function (color_stop, index) {
                        color_stop.value = index * spacing;
                    });

                    ub.change_gradient(target, gradient, panel);

                });

                $('#delete_gradient_color_stop').on('click', function () {

                    if (clone.color_stops.length > 2) {

                        clone.color_stops.pop();

                        var spacing = 1 / (clone.color_stops.length - 1);
                        
                        _.each(clone.color_stops, function (color_stop, index) {
                            color_stop.value = index * spacing;
                        });

                        ub.change_gradient(target, gradient, panel);
    
                    }
                   
                });

            }

            $("button#update-gradient-" + target + "").click();

        };

        /// End Change Gradient - Methods /// 



        ub.create_mascot_color_picker = function (index, value, color, target, mascot) {

            var element = "";
            element = "<div class='mascot_color_picker_container'><label class='color_stop_label'>" + (index + 1) + ".</label><input readonly='true' class='mascot_" + target + "' type='text' data-elid='mascot_" + target + "_" + index + "' data-index='" + index + "' data-target='" + target +"' data-value='" + value + "' data-mascot='" + mascot + "'  value='" + color + "'/></div>";

            return element;

        };

        ub.create_pattern_color_picker = function (index, value, color, target, pattern) {

            var element = "";
            element = "<div class='pattern_color_picker_container'><label class='color_stop_label'>" + (index + 1) + ".</label><input readonly='true' class='pattern_" + target + "' type='text' data-elid='pattern_" + target + "_" + index + "' data-index='" + index + "' data-target='" + target +"' data-value='" + value + "' data-pattern='" + pattern + "'  value='" + color + "'/></div>";

            return element;

        };

        ub.create_color_picker = function (index, value, color, target, gradient) {

            var element = "";
            element = "<div class='color_picker_container'><label class='color_stop_label'>" + (index + 1) + ".</label><input readonly='true' class='gradient_" + target + "' type='text' data-elid='gradient_" + target + "_" + index + "' data-index='" + index + "' data-target='" + target +"' data-value='" + value + "' data-gradient='" + gradient + "'  value='" + color + "'/></div>";

            return element;

        };

        ub.bind_design_sets_tab_handlers = function () {

            $('button.button_tabs').click(function (e) {

                $('button.button_tabs').css('background-color', '#f8f8f8');
                $('button.button_tabs').css('color', '#353536');

                var current_button = $(e.currentTarget);
                var category       = current_button.data('category');
                var gender         = current_button.data('gender');
                var type           = current_button.data('type');
                
                ub.display_design_sets(category, gender, type);
    
            });

        }

        ub.bind_left_sidebar_tab_handlers = function () {

            $('.color_base').click(function (e) {

                var option = $(this).data('option');

                $("div[data-group='colors']").css('display','none');
                $("div[data-option='" + option + "']").show(100);

                $('.color_base').removeClass('tether_button');

                var current_button = $(this);
                var down_arrow = '<div id="arrow_design_sets" class="down_arrow">';

                $("body").append(down_arrow);

                var arrow_obj = $('#arrow_design_sets');

                var t = new Tether({
                  element: arrow_obj,
                  target: current_button,
                  attachment: 'top center',
                  targetAttachment: 'bottom center'
                });

                current_button.addClass('tether_button');
                $('.down_arrow:not(.tether-element)').remove();

                ub.tethers['modifiers'] = t;

            });

            $("div[data-group='colors']").hide();
            $("div[data-option='body']").fadeIn('fast');


            $('.gradient_base').click(function (e) {

                var option = $(this).data('option');

                $("[data-group='gradients']").css('display','none');
                $("div[data-option='" + option + "']").show(100);

                $('.gradient_base').removeClass('tether_button');

                var current_button = $(this);
                var down_arrow = '<div id="arrow_design_sets" class="down_arrow">';

                $("body").append(down_arrow);

                var arrow_obj = $('#arrow_design_sets');

                var t = new Tether({

                  element: arrow_obj,
                  target: current_button,
                  attachment: 'top center',
                  targetAttachment: 'bottom center'

                });

                current_button.addClass('tether_button');
                $('.down_arrow:not(.gra-element)').remove();

                ub.tethers['modifiers'] = t;

            });

            $("div[data-group='patterns']").hide();
            $("div[data-group='gradients']").hide();
            $("div[data-option='body']").fadeIn('fast');

            $('.pattern_base').click(function (e) {

                var option = $(this).data('option');

                $("[data-group='patterns']").css('display','none');
                $("div[data-option='" + option + "']").show(100);

                $('.pattern_base').removeClass('tether_button');

                var current_button = $(this);
                var down_arrow = '<div id="arrow_design_sets" class="down_arrow">';

                $("body").append(down_arrow);

                var arrow_obj = $('#arrow_design_sets');

                var t = new Tether({

                  element: arrow_obj,
                  target: current_button,
                  attachment: 'top center',
                  targetAttachment: 'bottom center'

                });

                current_button.addClass('tether_button');
                $('.down_arrow:not(.pattern-element)').remove();

                ub.tethers['modifiers'] = t;

            });

            $("div[data-group='patterns']").hide();
            $("div[data-group='gradients']").hide();
            $("div[data-option='body']").fadeIn('fast');

        }

        ub.generate_gradient = function (gradient_obj, target) {

            var uniform_type = ub.current_material.material.type;
            var bounds;
            var guides;

            guides = { x1: 23, y1: 67, x2: 466, y2: 464 };

            var gradient_width  = 496;
            var gradient_height = 550;
            var canvas = document.createElement('canvas');

            canvas.width = ub.dimensions.width;
            canvas.height = ub.dimensions.height;

            var ctx = canvas.getContext('2d');

            var gradient;

            if (gradient_obj.code === "radial" ) {

                var center_x = 250;
                var center_y = 250;

                var radius_inner_circle = 20;
                var radius_outer_circle = 100;

                var canvas_width = 496;
                var canvas_height = 550;

                var origin_x = canvas_width / 2;
                var origin_y = canvas_height / 2;

                gradient = ctx.createRadialGradient(center_x, center_y, radius_inner_circle, center_x, center_y, radius_outer_circle);

            }
            else {

                gradient = ctx.createLinearGradient(0,22,0,410);

            }

            _.each(gradient_obj.color_stops, function (color_stop) {

                if( color_stop.color.length === 6 ){
                    color_stop.color = "#" + color_stop.color;
                }

                gradient.addColorStop(color_stop.value, color_stop.color);
              
            });

            ctx.fillStyle = gradient;

            var rotation = gradient_obj.angle;

            ctx.fillRect(0,0, ub.dimensions.height, ub.dimensions.height);
            
            var dURL = canvas.toDataURL();

            ctx.clearRect(0,0, ub.dimensions.height, ub.dimensions.height);
            ctx.translate(canvas.width/2, canvas.height/2);
            ctx.rotate(rotation*Math.PI/180);
            ctx.translate(-canvas.width/2, -canvas.height/2);
            ctx.fillRect(0,0, ub.dimensions.height, ub.dimensions.height);

            var texture = PIXI.Texture.fromCanvas(canvas);
            var temp_pattern = {};
            var gradient_layer = new PIXI.Sprite(texture);

            gradient_layer.zIndex = 1;

            if (typeof(ub.objects.pattern_view.gradient_layer) === "object") {
                ub.pattern_view.removeChild(ub.objects.pattern_view.gradient_layer);
            }

            ub.objects.pattern_view.gradient_layer = gradient_layer;
            ub.pattern_view.addChild(ub.objects.pattern_view.gradient_layer);
            ub.updateLayersOrder(ub.pattern_view);

            var views = ['front', 'back', 'left', 'right'];

            _.each(views, function (v) {

                var view = v + '_view';

                temp_pattern[v] = new PIXI.Sprite(texture);

                if (typeof(ub.objects[view]['gradient_' + target]) !== 'undefined') {
                    
                    ub[view].removeChild(ub.objects[view]['gradient_' + target]);

                }

                temp_pattern[v].zIndex = 1;

                if (target === 'body') {
                    temp_pattern[v].mask = ub.objects[view].shape_mask;
                }    
                else{

                    var mask = ub.objects[view][target + "_mask"];

                    if (typeof mask === 'undefined') {
                        return;
                    }
               
                    temp_pattern[v].mask = mask;
                    temp_pattern[v].zIndex = mask.zIndex;
                   
                }
        
                ub.objects[view]['gradient_' + target] = temp_pattern[v];
                ub[view].addChild(temp_pattern[v]);
          
                ub.updateLayersOrder(ub[view]);

            });

            ub.refresh_thumbnails();

            var data_url = 'url(' + dURL + ')';
            var $slider = $('#' + 'gradient_slider_' + target);
            var $angle_slider = $('#' + 'angle_gradient_slider_' + target);
           
            $slider.find('.range_container').remove();
            $slider.prepend('<div class="range_container"><div class="range"></div></div>').find('div.range').css('background-image', data_url);

            var rad = (90 + parseInt($angle_slider.find('span.edit').html()));
            
            $angle_slider.find('div.rs-bg-color').css({
                'background-image': data_url,
                "-webkit-transform": "rotate(" + rotation + "deg)",
            });

            ub.save_gradient(target, gradient_obj, gradient_obj.angle);

        };

        /// End Process Changes /// 

        /// Utilities ///

            $('#view_pattern').hide();

            $('button#toggle_pattern_preview').on('click', function (e) {
                $('#view_pattern').toggle();
            });

            // Save Color in Configuration Object

            // Process
            // 
            // New -> Blank UDID, Create UDID, Save Config File 
            // (this is when a design is created from a material code)
            // When loaded from UDID, the material / uniform code is loaded from the settings object
            // 
            // Load -> From UDID, doesn't need to create a new one
            // Save as Another design, Create another UDID

            ub.save_color = function (material_option, color) {

                var uniform_type = ub.current_material.material.type; // upper or lower
                var uniform = ub.current_material.settings[uniform_type];

                var object = _.find(ub.current_material.settings[uniform_type], {code: material_option});
                object.color = color;

                return object;

            };

            ub.save_gradient = function (material_option, gradient_obj, rotation) {

                var uniform_type = ub.current_material.material.type; // upper or lower
                var uniform = ub.current_material.settings[uniform_type];

                var object = _.find(ub.current_material.settings[uniform_type], {code: material_option});
                object.gradient['gradient_obj'] = gradient_obj;
                object.gradient['rotation'] = rotation;

                return object;

            }

            ub.save_pattern = function (material_option, pattern_obj, pattern_id) {

                var uniform_type = ub.current_material.material.type; // upper or lower
                var uniform = ub.current_material.settings[uniform_type];
                var object = _.find(ub.current_material.settings[uniform_type], {code: material_option});
                
                object.pattern.pattern_id = pattern_id;
                object.pattern.pattern_obj = pattern_obj;
                
            };

            ub.save_pattern_color = function (material_option, layer, color) {

                var uniform_type = ub.current_material.material.type; // upper or lower
                var uniform = ub.current_material.settings[uniform_type];
                var object = _.find(ub.current_material.settings[uniform_type], {code: material_option});
                
                object.pattern.pattern_obj.layers[layer].color = color;

            };

            /// Create Text Type Applications on load ( Player Name, Number and Team Name )
            ub.create_application = function (application_obj, overrideSize, overrideOffsetX, overrideOffsetY, overrideScaleX, overrideScaleY) {

                if (application_obj.text.length === 0) { return; }

                window.at = application_obj;

                /// Overrides are used by the GA Font Tool

                var _overrideSize = undefined;
                var _overrideOffsetX = undefined;
                var _overrideOffsetY = undefined;
                var _overrideScaleX = undefined;
                var _overrideScaleY = undefined;

                if (typeof overrideSize !== 'undefined') {

                    _overrideSize = overrideSize;

                }
                
                if (typeof overrideOffsetX !== 'undefined') {

                    _overrideOffsetX = overrideOffsetX;

                }

                if (typeof overrideOffsetY !== 'undefined') {

                    _overrideOffsetY = overrideOffsetY;

                }

                if (typeof overrideScaleX !== 'undefined') {

                    _overrideScaleX = overrideScaleX;

                }

                if (typeof overrideScaleY !== 'undefined') {

                    _overrideScaleY = overrideScaleY;

                }

                var input_object = {
                    text_input: application_obj.text,
                    font_name: application_obj.font_obj.name,
                    application: application_obj.application,
                    settingsObject: ub.current_material.settings,
                    applicationObj: application_obj,
                    fontSize: application_obj.font_size,
                    accentObj: application_obj.accent_obj,
                    typeofWindowTemp: typeof application_obj.accent_obj,
                    overrideSize: _overrideSize,
                    overrideOffsetX: _overrideOffsetX,                
                    overrideOffsetY: _overrideOffsetY,                
                    overrideScaleX: _overrideScaleX,                
                    overrideScaleY: _overrideScaleY,                
                };

                var uniform_type = ub.current_material.material.type;
                var sprite_collection = ub.funcs.renderApplication($.ub.create_text, input_object, application_obj.application.id.toString());
                var app = ub.current_material.settings.applications[application_obj.application.id];
                var app_containers = ub.current_material.containers[uniform_type].application_containers;

                if (typeof app_containers[application_obj.id] === 'undefined') {
    
                    app_containers[application_obj.code] = {};

                    app_containers[application_obj.code].object = {};
                    app_containers[application_obj.code].object.sprite = sprite_collection;
                    
                }

                if (typeof input_object.applicationObj === 'object') {

                    if(typeof input_object.applicationObj.gradient_obj === 'object') {

                        $.ub.mvChangeGradient(input_object.applicationObj, input_object.applicationObj.gradient_obj, sprite_collection);

                    }

                    if(typeof input_object.applicationObj.pattern_obj === 'object') {

                        $.ub.mvChangePattern(input_object.applicationObj.application, input_object.applicationObj.id, input_object.applicationObj.pattern_obj, sprite_collection);

                    }


                    // Does not work or disable, crossing_sword, line fade body (use line fade sleeve instead)

                    // var _patternObj = _.find(ub.data.patterns.items, {code: "referee_stripes"});
                    // input_object.applicationObj.pattern_obj = _patternObj;

                    // if (typeof input_object.applicationObj.pattern_obj === 'object') {

                    //     $.ub.mvChangePattern(input_object.applicationObj.application, input_object.applicationObj.id, _patternObj, sprite_collection);

                    // }

                }

            };

            ub.save_text_pattern_color = function (application, layer, color) {

                ub.current_material.settings.applications[application.id].pattern_obj.layers[layer].default_color = color;

            };

            ub.generate_pattern_for_text = function (target, pattern_obj, application, text_sprite, pattern_settings){

                var main_text_obj = _.find(text_sprite.children, {ubName: 'Mask'});
                main_text_obj.alpha = 1;
                var uniform_type = ub.current_material.material.type;
                var clone = pattern_obj;
                var val_rotation = pattern_settings.rotation;
                var val_opacity = 1;
                var val_scale = pattern_settings.scale;
                var val_x_position = pattern_settings.position.x;
                var val_y_position = pattern_settings.position.y;
                var target_name = target.toTitleCase();
                
                ub.current_material.containers[application.id] = {};
                var application_settings = ub.current_material.containers[application.id];
                
                if(typeof application_settings.pattern === 'undefined') {

                    application_settings.pattern = new PIXI.Container();

                }

                var container = application_settings.pattern;
                var v = application.perspective;
                
                container.sprites = {};

                _.each(clone.layers, function (layer, index) {

                    container.sprites[index] = ub.pixi.new_sprite(layer.filename);

                    var sprite = container.sprites[index];

                    sprite.zIndex = layer.layer_number * -1;
                    sprite.tint = parseInt(layer.default_color,16);
                    sprite.anchor.set(0.5, 0.5);

                    container.addChild(sprite);

                    container.alpha = val_opacity;

                    var x = val_x_position;
                    var y = val_y_position;

                    container.position = new PIXI.Point(x,y);

                });

                ub.updateLayersOrder(container);

                var view = v + '_view';
                var mask = main_text_obj;

                if(typeof mask === 'undefined') {
                    return;
                }

                var mask = main_text_obj;

                text_sprite.pattern_layer = container;
                container.mask = mask;
                container.zIndex = -11;

                ub.pl = container;

                text_sprite.addChild(text_sprite.pattern_layer);

                ub.updateLayersOrder(text_sprite);
                ub.refresh_thumbnails();

        };

        ub.generate_gradient_for_text = function (gradient_obj, target, text_sprite, application) {

            var base_color_obj = _.find(text_sprite.children, {ubName: 'Base Color'});
            if (gradient_obj.code === "none") {
                base_color_obj.alpha = 1;                  
            }
            else {
                base_color_obj.alpha = 0;                     
            }

            var main_text_obj = _.find(text_sprite.children, {ubName: 'Mask'});
            main_text_obj.alpha = 1;
            var uniform_type = ub.current_material.material.type;
            var bounds;
            var guides;

            guides = { x1: 23, y1: 67, x2: 466, y2: 464 }; 

            var gradient_width  = 496;
            var gradient_height = 550;
            var canvas = document.createElement('canvas');
            
            canvas.width  = ub.dimensions.width;
            canvas.height = ub.dimensions.height;

            var ctx = canvas.getContext('2d');

            var gradient;

            if (gradient_obj.code === "radial" ) {

                var center_x = 250;
                var center_y = 250;

                var radius_inner_circle = 20;
                var radius_outer_circle = 100;

                var canvas_width = 496;
                var canvas_height = 550;

                var origin_x = canvas_width / 2;
                var origin_y = canvas_height / 2;

                gradient = ctx.createRadialGradient(center_x, center_y, radius_inner_circle, center_x, center_y, radius_outer_circle);

            }
            else {

                gradient = ctx.createLinearGradient(0,22,0,410);

            }
            
            _.each(gradient_obj.color_stops, function (color_stop) {
                gradient.addColorStop(color_stop.value, color_stop.color);
            });

            ctx.fillStyle = gradient;

            var rotation = gradient_obj.angle;
            ctx.fillRect(0,0, ub.dimensions.height, ub.dimensions.height);
            var dURL = canvas.toDataURL();

            ctx.clearRect(0,0, ub.dimensions.height, ub.dimensions.height);
            ctx.translate(canvas.width/2, canvas.height/2);
            ctx.rotate(rotation * Math.PI/180);
            ctx.translate(-canvas.width/2, -canvas.height/2);
            ctx.fillRect(0,0, ub.dimensions.height, ub.dimensions.height);

            var texture = PIXI.Texture.fromCanvas(canvas);
            var temp_pattern = {};

            var gradient_layer = new PIXI.Sprite(texture);
            gradient_layer.zIndex = 1;

            var v = application.perspective;
            var view = v + '_view';

            temp_pattern[v] = new PIXI.Sprite(texture);
            temp_pattern[v].zIndex = 1;
  
            var mask = main_text_obj;

            text_sprite.gradient_layer = temp_pattern[v];
            temp_pattern[v].anchor.set(0.5, 0.5);
            temp_pattern[v].mask = mask;
            temp_pattern[v].zIndex = -10;

            temp_pattern[v].height = main_text_obj.height;
            text_sprite.addChild(temp_pattern[v]);
      
            ub.updateLayersOrder(text_sprite);
            ub.refresh_thumbnails();

            var data_url = 'url(' + dURL + ')';
            var $slider = $('#' + 'gradient_slider_' + target);
            var $angle_slider = $('#' + 'angle_gradient_slider_' + target);
           
            $slider.find('.range_container').remove();
            $slider.prepend('<div class="range_container"><div class="range"></div></div>').find('div.range').css('background-image', data_url);

            var rad = (90 + parseInt($angle_slider.find('span.edit').html()));
            
            $angle_slider.find('div.rs-bg-color').css({
                'background-image': data_url,
                "-webkit-transform": "rotate(" + rotation + "deg)",
            });


        };

            ub.create_text = function (text_input, font_name, application, accent_obj, font_size) {

                ub.funcs.removeUIHandles();

                var text_layers = {};
                var container = new PIXI.Container();
                var accent_id = $('div.accent_drop[data-id="' + application.id + '"]').data('accent-id');
                
                _.each(accent_obj.layers, function (layer) {

                    var text_layer = '';

                    text_layers[layer.layer_no] = {};
                    text_layer = text_layers[layer.layer_no];

                    text_layer.no = layer.layer_no;
                    text_layer.accent_obj = layer;

                    var style = {font: font_size + "px " + font_name, fill: "white", padding: 10};

                    if (layer.outline === 1) {

                        style.stroke = '#ffffff';
                        style.strokeThickness = 6;

                    }

                    if (layer.outline === 2) {

                        style.stroke = '#ffffff';
                        style.strokeThickness = 12;

                        if (typeof layer.type === 'string') {
                            style.stroke = '#ffffff';
                        }

                    }

                    if (layer.type === 'middle_stroke' && layer.outline === 1) {

                        style.stroke = '#ffffff';
                        style.strokeThickness = 6;

                    }

                    if (layer.type === 'outer_stroke' && layer.outline === 2) {

                        style.stroke = '#ffffff';0
                        style.strokeThickness = 12;

                    }

                    if (layer.type === 'outer_stroke' && layer.outline === 1) {
                        style.stroke = '#ffffff';
                        style.strokeThickness = 6;
                    }

                    if (layer.type === 'shadow' && layer.outline > 0) {
                        style.fill = '#ffffff';
                        style.stroke = '#ffffff';
                    }

                    text_layer.text_sprite = new PIXI.Text(" " + text_input + " ", style);
                    
                    /// Custom Properties

                    text_layer.text_sprite.ubName = layer.name;
                    text_layer.text_sprite.ubDefaultColor = layer.default_color;
                    text_layer.text_sprite.ubLayerNo = layer.layer_no;

                    var dummy = new PIXI.Text("A", style) // To get the glyph width and height 

                    text_layer.text_sprite.zIndex = layer.zIndex;
                    text_layer.text_sprite.x += dummy.width * layer.increment_x;
                    text_layer.text_sprite.y += dummy.height * layer.increment_y;
                    text_layer.text_sprite.anchor.set(0.5, 0.5);

                    container.addChild(text_layer.text_sprite);

                    if (layer.name === 'Mask') {
                        text_layer.text_sprite.alpha = 0                
                    }

                });

                ub.updateLayersOrder(container);

                return container;
                
            }

            ub.get_colors_obj = function (layer) {

                var colors_obj = '';

                var material_option_obj = _.find(ub.current_material.materials_options, {name: window.util.toTitleCase(layer)});
                var material_colors = JSON.parse(material_option_obj.colors);

                var colors_obj = _.filter(ub.data.colors, function(color){
                    
                    var s = _.indexOf(material_colors, color.color_code);
                    return s !== -1;

                });

                return colors_obj;

            }

            ub.recreate_gradient_obj = function (gradient_obj) {

                /// Recreate Gradient Object into new structure
            
                var gradient_output = {};

                gradient_output.angle = gradient_obj.angle;
                gradient_output.code = gradient_obj.code;
                gradient_output.name = gradient_obj.name;
                gradient_output.color_stops = [];

                _.each (gradient_obj.color_stops, function (color_stop, index) {

                    var new_cs = {
                        index: color_stop.index,
                        color: color_stop.color,
                        value: color_stop.value,
                    }

                    gradient_output.color_stops.push(new_cs);

                })

                return gradient_output;

                /// End Recreate 

            }

        // load logo

            ub.update_application_logo = function(application_obj) {

            var application = application_obj.application;
            var x = ub.dimensions.width * application.position.x;
            var y = ub.dimensions.height * application.position.y;
            var settings = ub.current_material.settings;

            var filename = application_obj.filename;
            var view = ub[application.perspective + '_view'];
            var view_objects = ub.objects[application.perspective + '_view'];
            
            var sprite = PIXI.Sprite.fromImage(filename);

            var mask = _.find(ub.current_material.material.options, {
                perspective: application.perspective,
                name: application.layer
            });

            var mask = ub.pixi.new_sprite(mask.material_option_path);

            sprite.mask = mask;

            var s = view_objects['objects_' + application.id];

            view_objects['objects_' + application.id] = sprite;
            view.addChild(sprite);

            sprite.position = new PIXI.Point(x,y);
            sprite.rotation = application.rotation;

            if(sprite.width === 1) {
            
                sprite.position.x -= (sprite.width / 2);
                sprite.position.y -= (sprite.height / 2);

            }
      
            sprite.anchor.set(0.5, 0.5);

            sprite.position = application_obj.position;
            sprite.rotation = application_obj.rotation;
            sprite.scale    = application_obj.scale;
            sprite.alpha    = application_obj.alpha;

            var layer_order = ( 10 + application.layer_order ) 

            sprite.originalZIndex = layer_order * (-1);
            sprite.zIndex = layer_order * (-1);
            settings.applications[application.id].layer_order = layer_order;
        
            ub.updateLayersOrder(view);

            ub.funcs.createDraggable(sprite, application, view);
            ub.funcs.createClickable(sprite, application, view, 'application');

        };

        // end load logo

        ub.update_application_mascot = function(application_obj) {

            console.log('Here...');
            console.log(application_obj)

            var application = application_obj.application;
            var mascot = application_obj.mascot;

            var x = ub.dimensions.width * application.position.x;
            var y = ub.dimensions.height * application.position.y;
            var settings = ub.current_material.settings;
            var application_mascot_code = application.id + '_' + mascot.id;
            var view = ub[application.perspective + '_view'];
            var view_objects = ub.objects[application.perspective + '_view'];
            var container = new PIXI.Container();

            var elements = "";

            _.each(mascot.layers, function(layer, index){

                var mascot_layer = PIXI.Sprite.fromImage(layer.filename);
                mascot_layer.tint = layer.color;

                mascot_layer.anchor.set(0.5, 0.5);
                container.addChild(mascot_layer);

                var val = layer.default_color;
                var col = layer.default_color;
                var filename = layer.filename;
                
                elements += ub.create_mascot_color_picker(index, val, col, application.id, mascot.code); 

            });

            container.scale = new PIXI.Point(0.5, 0.5);

            var sprite = container;
            var mask = _.find(ub.current_material.material.options, {
                
                perspective: application.perspective,
                name: application.layer

            });

            var mask = ub.pixi.new_sprite(mask.material_option_path);
            var temp = {}

            sprite.mask = mask;

            var s = view_objects['objects_' + application.id];

            var position = '';
            var scale = '';
            var rotation = '';
            var alpha = '';

            view_objects['objects_' + application.id] = sprite;
            view.addChild(sprite);

            sprite.position = application_obj.position;
            sprite.rotation = application_obj.rotation;
            sprite.scale    = application_obj.scale;
            sprite.alpha    = application_obj.alpha;

            var layer_order = ( 10 + application_obj.layer_order );

            sprite.originalZIndex = layer_order * (-1);
            sprite.zIndex = layer_order * (-1);
            settings.applications[application.id].layer_order = layer_order;
        
            ub.updateLayersOrder(view);

            ub.funcs.createClickable(sprite, application, view, 'application');

        };

        ub.save_property = function (obj) {

            if (typeof obj.application_id === 'undefined' || typeof obj.property === 'undefined' || typeof obj.value === 'undefined') {

                console.warning ('Incomplete Input');
                return;

            }

            ub.current_material.settings.applications[obj.application_id][obj.property] = obj.value;

        }

        ub.funcs.setActiveIcon = function (view) {

            _.each(ub.views, function (_view) {

                if (_view !== view) { $('a.change-view[data-view="' + _view + '"]').removeClass('active-icon'); }

            });

            $('a.change-view[data-view="' + view + '"]').addClass('active-icon');

        }

    ub.funcs.createQuickRegistrationPopup = function () {

        if ($('div#primaryQuickRegistrationPopup').is(':visible')) { return; }

        ub.status.quickRegistrationPopup = true;

        var sampleSize = '1.9em';
        var paddingTop = '40px';

        var data = {

        };

        var template = $('#m-quick-registration-popup').html();
        var markup = Mustache.render(template, data);

        $('body').append(markup);
        
        $popup = $('div#primaryQuickRegistrationPopup');

        $('label.quickRegistrationPassword, input.quickRegistrationPassword, div.quickPasswordContainer').hide();
        $popup.fadeIn();
        $('input.quickRegistrationEmail').focus();

        ub.funcs.centerPatternPopup();

        // convenience method
        $('input.quickRegistrationEmail').on('keypress', function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            
            if (code == 13) { 

                if (!$('input.quickRegistrationPassword').is(':visible')){

                    $('span.next').trigger('click');

                } else {

                    $('div.quickRegistrationPassword').focus();

                }

                e.preventDefault();

            }

        });

        $('input.quickRegistrationPassword').on('keypress', function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            
            if (code == 13) { 

                $('span.next').trigger('click');
                e.preventDefault();

            }

        });
        // end convenience method

        $('span.next').unbind('click');
        $('span.next').on('click', function () {

            $('em.message').html('Logging In...');

            if ($('input.quickRegistrationPassword').is(':visible')) {

                var _e = $('input.quickRegistrationEmail').val();
                var _p = $('input.quickRegistrationPassword').val();

                ub.funcs.lRest(_e, _p, true);

            }

            var _email = $('input.quickRegistrationEmail').val();
            var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

            if (!email_regex.test(_email)) { 

                $('em.message').html('Please enter a valid email: ');
                return false;

            } else {

                if (typeof $.ajaxSettings.headers !== "undefined") {
                    delete $.ajaxSettings.headers["X-CSRF-TOKEN"];    
                }
        
                $.ajax({
                    data: JSON.stringify({ email: _email }),
                    url: ub.config.api_host + "/api/user/quickRegistration",
                    dataType: "json",
                    type: "POST", 
                    crossDomain: true,
                    contentType: 'application/json',
                    headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
                
                    success: function (response){
                        
                        if(response.success) {

                            window.ub.user = {
                                id: response.data.user_id,
                                fullname: "New User",
                                email: _email,
                                headerValue: response.accessToken,
                            };

                            $popup.remove();
                            ub.status.quickRegistrationPopup = false;

                            ub.funcs.initRoster();
                            return true;

                        }
                        else{

                            $('a.login-link').trigger('click');

                            return false;

                        }

                    }
                
                });

                return true;

            }

        });

        $('a.login-link').unbind('click');
        $('a.login-link').on('click', function () {

            if ($('div.quickPasswordContainer').is(':visible')) {

                $('em.instructions').fadeOut();
                $('em.instructions').html("You're not logged in, please enter your email so we can create an account for you. A temporary password will be emailed to you.");
                $('em.instructions').fadeIn();

                $('span.text').html('Quick Registration');

                $('a.login-link').html('Already have an account?');
                $('label.quickRegistrationPassword, input.quickRegistrationPassword, div.quickPasswordContainer').hide();

                
            } else {
                
                $('em.instructions').fadeOut();
                $('em.instructions').html("You already have an account, please enter your password below to login.");
                $('em.instructions').fadeIn();

                $('em.message').html('');

                $('label.quickRegistrationPassword, input.quickRegistrationPassword, div.quickPasswordContainer').show();
                $('input.quickRegistrationPassword').focus();
                $('span.text').html('Login');
                $('a.login-link').html('');

            }

        });

        $('div.close-popup').on('click', function (){

            $popup.remove();
            ub.status.quickRegistrationPopup = false;

        });

        // $popup.bind('clickoutside', function () {

        //     var _status = $(this).data('status');

        //     if (_status === 'hidden') {

        //         $(this).data('status', 'visible');
        //         return;

        //     }

        //     $(this).data('status', 'hidden');
        //     $(this).hide();
        //     $(this).remove();
        //     ub.status.quickRegistrationPopup = false;

        // });


    }

    ub.funcs.getOrderAndDetailsInfo = function () {

        var _url = window.ub.config.api_host + '/api/order/user/orderswItems/' + ub.user.id;

        ub.loader(_url, 'orders', function (result) {

            var _orderInfo = _.find(result, {'order_id': ub.config.orderCode});
            ub.data.orderInfo = _orderInfo;
            ub.funcs.initRoster(_orderInfo);
            
        });

    }

    ub.funcs.quickRegistration = function () {

        ub.funcs.createQuickRegistrationPopup();

    }

    ub.funcs.initOrderProcess = function () {

        ub.funcs.resetHighlights();

        var _exit = false;

        bootbox.confirm("Are you sure you want to go to the order form?", function (result) { 
        
            if (!result) {

                return true;

            } else {

                if (ub.data.afterLoadCalled === 0) { return; }

                if (typeof (window.ub.user.id) === "undefined") {

                    ub.funcs.quickRegistration();
                    return true;

                }

                if (typeof ub.temp !== "undefined") {

                    ub.funcs.getOrderAndDetailsInfo();
                    
                } else {

                    ub.funcs.initRoster();

                }

            } 

        });

    }

    ub.funcs.removeApplicationsPanel = function () {

        if ($('div#layers-order').is(':visible')) {

            $('div.layers-header > span.close').trigger('click');

        }

    }

        /// End Utilities ///

        /// Bottom Nav Handlers

            $('div.drop.parts').on('click', function () {

                if ($('div#primaryQuickRegistrationPopup').is(':visible')) { return; }
                $('#select_part').click();

            });

            //$('#select_part').hide();
            
            // Toolbar Event Handler
            $('a.change-view').on('click', function (e) {

                var view = $(this).data('view');

                if (view === 'parts') {

                    $('#select_part').click();
                    return;

                }

                if (view === 'refresh') {

                    window.location.reload();
                    return;
                    
                }

                if (view === 'colors') { 

                    ub.funcs.activateColorPickers();
                    ub.funcs.activeStyle('colors');
                    return;
                    
                }

                if (view === 'patterns') {

                    if (ub.current_part === 0) { return; }

                    ub.funcs.hideOtherPanels();
                    ub.funcs.activatePatterns();
                    return;
                    
                }

                if (view === 'pipings') {

                    if($(this).hasClass('disabled')) {

                        return;

                    }

                    ub.funcs.removeApplicationsPanel();
                    ub.funcs.removeRandomFeedsPanel();
                    ub.funcs.showPipingsPanel();

                    return;

                }

                if (view === 'randomFeed') {

                    if($(this).hasClass('disabled')) {

                        return;

                    }

                    ub.funcs.removeApplicationsPanel();
                    ub.funcs.showRandomFeedPanel();

                    return;

                }

                if (view === 'start-over') {

                    window.location.href = window.ub.config.host + '/builder/0/' + ub.current_material.material.id;
                    //ub.funcs.initGenderPicker();
                    return;

                }

                if (view === 'home') {

                    window.location.href = ub.config.host;

                    return;

                }

                if (view === 'locations') {

                    ub.funcs.deActivateZoom();

                    ub.funcs.hidePipingFunctions();

                    if(!ub.showLocation) {

                        ub.funcs.gotoFirstMaterialOption();
                        $(this).addClass('zoom_on');

                    }
                    else {

                        ub.funcs.removeLocations();
                        $(this).removeClass('zoom_on');
                    }

                    return;

                }

                if (view === 'locations-add') {

                    ub.funcs.deActivateZoom();
                    ub.funcs.addLocation();
                    
                    return;

                }

                if (view === 'layers') {
                    
                    ub.funcs.removePipingsPanel();
                    ub.funcs.removeRandomFeedsPanel();
                    ub.funcs.showLayerTool();
                    
                    return;

                }

                if (view === 'zoom') {

                    ub.funcs.deActivateLocations();

                    if (e.altKey) {
                        ub.funcs.removeUI();
                        return;
                    }

                    if (!ub.zoom) {

                        ub.zoom_on(true);
                        $(this).addClass('zoom_on');

                    }
                    else {

                        ub.zoom_off();
                        $(this).removeClass('zoom_on');

                    }

                    return;

                }

                if (view === 'team-info') {

                    ub.funcs.initOrderProcess()
                    return;

                }


                if (view === 'open-design') {

                    if(typeof (window.ub.user.id) === "undefined") {
                        alert('Only logged-in users can open their saved designs.')
                        return;
                    }

                    window.location.href = window.ub.config.host + '/my-saved-designs';
                    return;

                }


                if (view === 'save') {

                    if(typeof (window.ub.user.id) === "undefined") {
                        alert('Only logged-in users can save their designs.')
                        return;
                    }

                    ub.funcs.initSaveDesign();
                    return;

                }

                if (view === "left" || view === "right") {

                    if ($(this).hasClass('disabled')) { return; }

                }

                ub.zoom_off();

                var w = window.innerWidth * 5;
                var _newX  = w;

                ub.left_view.position.x     = _newX;
                ub.right_view.position.x    = _newX;
                ub.front_view.position.x    = _newX;
                ub.back_view.position.x     = _newX;
                ub.pattern_view.position.x  = _newX;

                ub[view + '_view'].position.set(ub.offset.x, ub.offset.y);
                ub.funcs.setActiveIcon(view);

                $('#main_view').fadeIn();

                ub.active_view = view;

                if (e.altKey) {

                    ub.showThumbnail2();
                    $.smkAlert({text: 'Thumbnail Generated for [' + ub.active_view + ' view]' , type:'warning', time: 3, marginTop: '80px'});

                }

            });

            $('a.change-view[data-view="front"]').click();

        /// End Bottom Nav Handlers

    /// UI Functions ///
   
    // Reposition All Tethers

        $(window).scroll(function (e) {

            _.each(ub.tethers, function (obj) {
                obj.position();
            });

        });

    /// End Reposition All Tethers

    /// Generate Pattern

    ub.getAngleofPattern = function (view, materialOptionName)  {

        var _materialOption = _.find(ub.current_material.materials_options, {name: materialOptionName, perspective: view});

        if (typeof _materialOption === 'undefined') {
            util.log("Can't find material option " + materialOptionName);
            return undefined;
        }

        var _patternProperties          = ub.funcs.cleanPatternProperties(_materialOption.pattern_properties);
        var patternPropertiesParsed     = JSON.parse(_patternProperties);

        var _obj                        = {

            angle: ub.funcs.translateAngle(_materialOption.angle),
            px: _materialOption.patternOffsetX,
            py: _materialOption.patternOffsetY,

        }

      return _obj;

    }

    ub.funcs.coordinateAdjustments = function (target_name, clone, v) {

        var _adjustment = {x: 0, y: 0};

        // Recalculate Offset 

            var _offsetX = (($(window).width() - $('#right-pane-column').width()) - 550) / 2;
            var _yDivisor = 3;
                
            if ($(window).height() > 800) {

                _yDivisor = 5;
            
            }

            var _offsetY = ($(window).height() - 580) / _yDivisor;

            ub.offset = {x: _offsetX, y: _offsetY};

        // End Recalculate Offset


        if (target_name === 'Body' || target_name === 'Back Body') {


                _adjustment = {x: 0, y: ub.front_view.position.y};

                if (clone.name === "NK Stripe") {

                    _adjustment.y += 200;                    

                    if ($(window).height() > 800) {

                        _adjustment.y += 50;                    

                    }

                }

            }

            if (v === 'front' && target_name === 'Left Sleeve Insert' ) {

                _adjustment = {x: 50, y: -40};

            }

            if (v === 'front' && target_name === 'Left Arm Trim' ) {

                _adjustment = {x: 50, y: -40};

            }


            if (v === 'front' && target_name === 'Left Sleeve Insert' ) {

                _adjustment = {x: 50, y: -40};

            }

            if (v === 'back' && target_name === 'Right Shoulder Cowl Insert' ) {

                _adjustment = {x: 0, y: -185};

            }

            if (v === 'back' && target_name === 'Right Sleeve Insert' ) {

                _adjustment = {x: 0, y: -18};

            }

            if (v === 'front' && target_name === 'Right Sleeve Insert' ) {

                _adjustment = {x: 10, y: 0};

            }

            if (v === 'back' && target_name === 'Right Sleeve Insert' ) {

                _adjustment = {x: 100, y: 0};

            }

            if (v === 'back' && target_name === 'Right Arm Trim' ) {

                _adjustment = {x: 100, y: 0};

            }

            var _windowSize = ub.funcs.getWindowSize();

            if (_windowSize.height > 800) {

               if (v === 'front' && target_name === 'Right Sleeve Insert' ) {

                    _adjustment = {x: -200, y: 7};

                }


               if (v === 'back' && target_name === 'Left Sleeve Insert' ) {

                    _adjustment = {x: -200, y: 7};

                }


               if (v === 'front' && target_name === 'Right Arm Trim' ) {

                    _adjustment = {x: -200, y: 0};

                }

                if (v === 'back' && target_name === 'Left Arm Trim' ) {

                    _adjustment = {x: -200, y: 0};

                }

                if (v === 'back' && target_name === 'Left Shoulder Cowl Insert' ) {

                    _adjustment = {x: 0, y: -220};

                }

            }

        if (ub.funcs.getCurrentUniformCategory() === "Wrestling") { _adjustment = {x: 0, y: 0}; }

        return _adjustment;

    }

    ub.funcs.getMaxTeamColorID = function () {

        max = _.max(_.pluck(ub.data.colorsUsed, 'teamColorID'));

        _.each(ub.data.colorsUsed, function (cu) {

            if(typeof cu.teamColorID !== 'undefined') {

                if(cu.teamColorID > max) { max = cu.teamColorID; }
          
            }

        });

        return max;

    };

    ub.generate_pattern = function (target, clone, opacity, position, rotation, scale) {

        var uniform_type = ub.current_material.material.type;
        var target_name = target.toTitleCase();
        var pattern_settings = '';
        var views = ub.data.views;
        var _rotationAngle = 0;
        var _extra         = {};
        var _positiion     = {x: 0, y: 0};
        target_name        = util.toTitleCase(target_name);

        pattern_settings = ub.current_material.containers[uniform_type][target_name];
        pattern_settings.containers = {};

        _.each(views, function (v) {

           var _adjustment    = {x: 0, y: 0};

           _adjustment        = ub.funcs.coordinateAdjustments(target_name, clone, v);
           _extra = ub.getAngleofPattern(v, target_name)

            if (typeof _extra !== 'undefined') {

                _rotationAngle = _extra.angle;    

            }
            else {

                _rotationAngle = 0;

            }

            pattern_settings.containers[v] = {};
            
            var namespace = pattern_settings.containers[v];
            namespace.container = new PIXI.Container();
            var container = namespace.container;
            container.sprites = {};

            _.each(clone.layers, function (layer, index) {

                var s = $('[data-index="' + index + '"][data-target="' + target + '"]');
                container.sprites[index] = ub.pixi.new_sprite(layer.filename);

                var sprite = container.sprites[index];

                sprite.zIndex = layer.layer_number * -1;
                sprite.tint = parseInt(layer.default_color,16);

                ///
                var _hexCode = (sprite.tint).toString(16);
                var _paddedHex = util.padHex(_hexCode, 6);

                if (typeof ub.data.colorsUsed[_paddedHex] === 'undefined') {

                    ub.data.colorsUsed[_paddedHex] = {hexCode: _paddedHex, parsedValue: util.decimalToHex(sprite.tint, 6), teamColorID: ub.funcs.getMaxTeamColorID() + 1};
                }
                ///

                sprite.anchor.set(0.5, 0.5);
                sprite.pivot.set(0.5, 0.5);

                sprite.tint = clone.layers[index].color;
                container.addChild(sprite);

                var _positionAdjusted = {
                    x: 0,
                    y: 0,
                };

                container.position = _positionAdjusted;
                container.alpha = layer.container_opacity;
                container.rotation = _rotationAngle;
                container.scale = layer.container_scale;

                var s = '';
                
            });

            ub.updateLayersOrder(container);

            var view = v + '_view';
            var mask = ub.objects[view][target + "_mask"];

            if(typeof mask === 'undefined') {
                return;
            }
            
            container.mask = mask;
            container.name = 'pattern_' + target;

            if (typeof ub.objects[view]['pattern_' + target] === 'object') {
                ub[view].removeChild(ub.objects[view]['pattern_' + target]);
            }

            ub.objects[view]['pattern_' + target] = container;

            var _p = ub.objects[view]['pattern_' + target];

            ub[view].addChild(container);
            container.zIndex = mask.zIndex + (-1);

            _p.position.x += ub.dimensions.width / 2;
            _p.position.y += ub.dimensions.height / 2;

            _p.anchor = {x: 0.5, y: 0.5};
            _p.pivot = {x: 0.5, y: 0.5};

            ub.updateLayersOrder(ub[view]);

        });

    }

    $('input[name="design_name"]').on('change', function () {

        $('span#design_name_input').text($(this).val());

    });

    $('span#design_name_input').bind('click', function() {

            $(this).attr('contentEditable', true);

        }).blur(
        
            function() {
                
                $(this).attr('contentEditable', false);
                var text = $('span#design_name_input').text();
                $('input[name="design_name"]').val(text);

            });

    $('a#pencil_link').on('click', function () {

        // TODO: Fill this with notes popup
        return false;

    })

    // $('input#simple_toggle').onoff();
    // $("input#simple_toggle").change(function() {

    //     _header_text = ub.funcs.match(ub.active_part);
    //     $("#primary_options_header").html(_header_text.toUpperCase());
    //     ub.active_lock = true;

    // });

    /// End Generate Pattern

    ub.funcs.identify = function (applicationCode) {

        $('button[data-action="identify"][data-id=' + applicationCode + ']').click();

    }

    /// Initialize

    $('a.mod_primary').click();
    $('#right-sidebar > a.sidebar-buttons').hide();

    /// End Initialize


    /// New UI Code 

    ub.funcs.fadeOutElements = function () {

        var $element = $('#main-picker-scroller');
        $element.hide();

        var $uniformDetailsElement = $('div.uniform_details');
        $uniformDetailsElement.hide();

        var $pickerHeader = $('.picker-header');
        $pickerHeader.hide();

        var $backLink = $('div.back-link');
        $backLink.hide();

    }

    ub.funcs.scrollize = function (containerSelector, groupSelector, itemSelector, widthOfItems) {
        
        // Sample Usage
        //
        // ub.funcs.scrollize ('div#main-picker-container', 'div#main-picker-scroller', 'div.main-picker-items', 280)
        //
        // containerSelector:   'div#main-picker-container'
        // groupSelector:       'div#main-picker-scroller'        
        // itemSelector:        'div.main-picker-items'

        var _noOfItems  = $(itemSelector).length;
        var _temp       = _noOfItems * (widthOfItems + 22);
        var _damp       = 60;

        if (itemSelector === '.color_picker_item') {
            _temp   = _temp / 2;
            _damp   = 30;
        }
        
        var $bl  = $(containerSelector),
                $th    = $(groupSelector),
                blW    = $bl.outerWidth(),
                blSW   = _temp                                          // $bl[0].scrollWidth,
                wDiff  =  2;   // (blSW/blW)-1                          // Widths Difference Ratio
                mPadd  = 60,                                            // Mousemove Padding
                damp   = _damp,                                         // Mousemove response softness
                mX     = 0,                                             // Real mouse position
                mX2    = 0,                                             // Modified mouse position
                posX   = 0,
                mmAA   = blW,                                           // Mousemove Available Area
                mmAAr  = (blW/mmAA);                                    // Available Mousemove Fidderence Ratio

        var _mouseX, _resultingMargin;

        ub.th = $th;

        $bl.mousemove(function(e) {

            if (itemSelector !== '.color_picker_item') {

                var _upperBound = $th.offset().top;
                var _lowerBound = $th.offset().top + $th.height();
                var _mouseY = e.clientY;

                if (_mouseY < _upperBound || _mouseY > _lowerBound) { return; }

            }    
            
            if ($(itemSelector).length - 4 < 5) {                       // Prevent Scrolling if items is less than 4
                return;
            }

            mX = e.pageX - this.offsetLeft;
            mX2 = Math.min( Math.max(0, mX-mPadd), mmAA ) * mmAAr;

            _mouseX          = (e.clientX - this.offsetLeft);
            ub.vars.travel   = _mouseX / blW;
            _resultingMargin =  (ub.vars.travel * _temp) * -1;

            if (itemSelector !== '.color_picker_item' && _noOfItems > 15) {
                $th.css({marginLeft: _resultingMargin});
            }
            else {
                $th.css({marginLeft: _resultingMargin});   
            }

        });

        ub.data.intervalFunction = setInterval(function() {

             posX        += (mX2 - posX) / damp;                       // Zeno's Paradox Equation "catching delay" 

            // Turn off intertia for now
            //
            // if (itemSelector === '.color_picker_item' || _noOfItems < 15) {
            //     $th.css({marginLeft: -posX * wDiff});
            // }

        }, 10);

    };

    ub.funcs.hideSecondaryBar = function () {

        $('div.secondary-bar').hide();
        $('div.secondary-bar').css('margin-top', "-50px");

        $('div.tertiary-bar').hide();
        $('div.secondary-bar').css('margin-top', "-50px");

    }

    ub.funcs.reBindEventsPickers = function () {

        $('div.main-picker-items, span.main-picker-items').on('click', function () {

            $picker_item = $(this);

            var _picker_type = $(this).data('picker-type');
            var _item        = $(this).data('item');
            var _id          = $(this).data('id');

            if (_picker_type === 'gender') {

                if (_item === "Home") {

                    ub.funcs.initGenderPicker();
                    ub.funcs.hideSecondaryBar();

                    return; 

                }
                
                if (_item !== "Men") { return; }
                ub.funcs.initSportsPicker(_item);

            }

            if (_picker_type === 'sports') {

                if (_item !== "Football" && _item !== "Wrestling" && !ub.data.tempSports.isSportOK(_item)) { return; }
                if ($('#search_field').attr('placeholder') === 'Preparing search, please wait...') { return; }

                if (ub.data.tempSports.isSportOK(_item) && !_.contains(ub.fontGuideIDs, ub.user.id)) { return; }

                ub.funcs.initUniformsPicker(_item);

            }

            if (_picker_type === 'uniforms') {

                ub.funcs.fadeOutElements();
                $('body').removeClass('pickers-enabled');

                $('#main-picker-container').hide();
                $('.header-container').removeClass('forceHide');

                window.location.href = window.ub.config.host + '/builder/0/' + _id;

            }

            if (_picker_type === 'search-result') {

                var $searchField = $('input#search_field');
                $searchField.hide();

                ub.funcs.fadeOutElements();
                $('body').removeClass('pickers-enabled');

                var _item_type = $(this).data('uniform-type');
                var _id = $(this).data('id');

                if (_item_type === 'materials') {

                    window.location.href = window.ub.config.host + '/builder/0/' + _id;

                }
                else if (_item_type === 'orders') {

                    window.location.href = window.ub.config.host + '/orders/' + _id;

                }
                
            }

        });

        $(".grow" ).hover(
        
            function() {

               var $caption = $(this).find('span.main-picker-item-caption');
               //$caption.css('margin-top', '-336px');

               if ($(this).data('picker-type') === 'uniforms') {

                    $('div.uniform_details').hide();
                    $('span.uniform_name').html($(this).data('item'));

                    var s = _.find(ub.materials, {name: $(this).data('item')}).description

                    $('span.uniform_description').html(s);
                    $('div.uniform_details').fadeIn();

               }
               else {
                    
                    $('div.uniform_details').hide();

               }

            }, function() {

                var $caption = $(this).find('span.main-picker-item-caption');
                $caption.css('margin-top', '0px');

            }

        );
        
        // ub.funcs.scrollize ('div#main-picker-container', 'div#main-picker-scroller', 'div.main-picker-items', 280)

    };

    ub.funcs.prepareSecondaryBar = function (sport) {

        $('span.slink[data-item="Jersey"]').html("Jersey");
        $('span.slink[data-item="Pant"]').html("Pant");
        $('span.slink[data-item="Jersey"]').show();
        $('span.slink[data-item="Pant"]').show();
        $('span.slink[data-item="Twill"]').show();

        var _secondaryBarLabels = ub.data.secondaryBarLabels.getLabel(sport);

        if (typeof _secondaryBarLabels !== "undefined") {

            if (_secondaryBarLabels.type === "upper") {

                $('span.slink[data-item="Jersey"]').html(_secondaryBarLabels.upperLabel);
                $('span.slink[data-item="Pant"]').hide();
                $('span.slink[data-item="Twill"]').hide();

            } else if (_secondaryBarLabels.type === "lower") {
                
                $('span.slink[data-item="Jersey"]').hide();
                $('span.slink[data-item="Pant"]').html(_secondaryBarLabels.lowerLabel);
                $('span.slink[data-item="Twill"]').hide();

            }

        }

    }

    ub.funcs.hideIpadUniforms = function () {

        var _iPadUniforms = ['Trial'];

        _.each(_iPadUniforms, function (uniform) {

            $('div.main-picker-items[data-item="' + uniform + '"]').hide();

        });

    }

    // Group by block pattern and also group upper and lower uniforms
    ub.funcs.sortPickerItems = function (items) {

        var _sorted = _.sortBy(items, function(item) { 

            var _weight = parseInt(item.block_pattern_id);
            (item.type === 'upper') ? _weight += 100 : _weight += 200;

            return _weight;

        });

        return _sorted;

    }
    
    ub.funcs.cleanupPricesPerSport = function (sport) {

        var _sport = sport;

        switch (_sport) {
          
          case 'Crew Socks (Apparel)', 'Compression (Apparel)':
            
            $('span.youthPrice').hide();
            $('span.youthPriceSale').hide();
            $('span.adult-label').html('Price starts from ');

            break;
          
          default:

            // $('span.youthPrice').show();
            // $('span.youthPriceSale').show();
            // $('span.adult-label').html('Adult from ');

            ub.utilities.info('No Per Sport Cleanup for Picker')
            
        }

    }

    ub.funcs.initScroller = function (type, items, gender, fromTertiary, _apparel) {

        ub.funcs.fadeOutElements();

        var $scrollerElement = $('#main-picker-scroller');
        var $uniformDetailsElement = $('div.uniform_details');
        var $pickerHeader = $('.picker-header');

        var $searchField = $('input#search_field');
        $searchField.show();

        if (typeof ub.data.intervalFunction === 'number') {

            $("#main-picker-container").unbind('mousemove');
            clearInterval(ub.data.intervalFunction);

        }

        if (type === 'gender') {

            var _genders = items;
            var template = $('#m-picker-items').html();

            var data = {
                picker_type: 'gender',
                picker_items: _genders,
            }

            var markup = Mustache.render(template, data);
            $scrollerElement.html(markup);

            $('.picker-header').html('Choose a Gender');
            $('div.back-link').html('');
            
        }

        if (type !== 'gender') {

            var $backLink = $('div.back-link');
            $backLink.fadeIn();

        }

        if(type === 'sports') {

            ub.funcs.hideSecondaryBar();
            
            var template = $('#m-picker-items-sport').html();
            var data = {
                gender: gender,
                picker_type: type,
                picker_items: items,
                apparel: _apparel,
            }
            
            var markup = Mustache.render(template, data);
            $scrollerElement.html(markup);

            $('.picker-header').html('Choose a Sport');

            $('div.back-link').html('<img src="/images/main-ui/back.png" /> <span> | </span>');
            $('div.back-link').on('click', function () {

                ub.funcs.initGenderPicker();
                ub.funcs.reBindEventsPickers();        

            });

            $( ".cSoon" ).each(function() {
                var cText = $(this).text();
                if(!cText){
                    $(this).hide();
                }
            });

            ub.filters = {};

            ub.filters.primary = "All";
            ub.filters.secondary = "All";

            $('span.secondary-filters').removeClass('active');
            $('span.primary-filters').removeClass('active');

            $('span.secondary-filters[data-item="All"]').addClass('active');
            $('span.primary-filters[data-item="All"]').addClass('active');
                
        }

        if(type === 'uniforms') {

            var _sport = gender;

            ub.funcs.prepareSecondaryBar(_sport);
            
            $('div.secondary-bar').fadeIn();
            $('div.secondary-bar').css('margin-top', "0px");

            var template = $('#m-picker-items-uniforms').html();

            ub.tempItems = ub.funcs.sortPickerItems(items);

            var data = {
                sport: gender,
                picker_type: type,
                picker_items: ub.tempItems,
                filters: _.find(ub.data.sportFilters, {sport: gender}).filters,
              
                uniform_type: function () {

                    return function (text, render) {

                        var _type = '';

                        _type  = render(text).replace('_', ' '); 

                        return "<b>" + render(_type) + "</b>";

                    }

                }

            }

            var markup = Mustache.render(template, data);
            $.when($scrollerElement.html(markup)).then(

                $('.main-picker-items').each(function(item) {

                    var _resultPrice = $(this).find('span.calculatedPrice').html();

                    if (_resultPrice === "Call for Pricing") {

                        $(this).find('span.callForTeamPricing').html('');

                    }

                })

            );

            ub.funcs.hideIpadUniforms();
            ub.funcs.cleanupPricesPerSport(_sport);

            $('.picker-header').html('Choose a Style');
            $('div.back-link').html('<img src="/images/main-ui/back.png" /> <span> | </span>');

            $('div.back-link').on('click', function () {

                ub.funcs.initGenderPicker();

            });

            /* Tertiary Links */

            var itemsWOUpper = _.filter(items, {type: 'lower'});
            var _blockPatterns = _.uniq(_.pluck(itemsWOUpper,'block_pattern'));    

            if (typeof fromTertiary !== 'boolean') {
            
                setTimeout(function () { 

                    $('.tertiary-bar').html('');

                    $('.tertiary-bar').hide();
                    $('.tertiary-bar').css('margin-top','-50px');

                    var t = $('#m-tertiary-links').html();

                    var _str = '';
                    
                    var d = {

                        block_patterns: _blockPatterns,
                
                    }

                    var m = Mustache.render(t, d);
                    $('.tertiary-bar').html(m);
                
                    $('div.tertiary-bar').fadeIn();        
                    $('div.tertiary-bar').css('margin-top', "0px");

                    window.origItems = items;
                    
                    $('span.slink-small').unbind('click');
                    $('span.slink-small').on('click', function () {

                        var _dataItem = $(this).data('item');

                        if (_dataItem === "All") {

                            _newSet = window.origItems;

                        } else {

                            _newSet = _.filter(window.origItems, {block_pattern: _dataItem});
                            
                        }

                        
                        ub.funcs.initScroller('uniforms', _newSet, gender, true);

                        $('span.slink-small').removeClass('active');
                        $(this).addClass('active');

                    });

                }, 1000);

            }

            /* End Tertiary Links */

            // Secondary Filters

            $('span.secondary-filters').unbind('click');
            $('span.primary-filters').unbind('click');

            $('span.secondary-filters').on('click', function () {

                var _dataItem = $(this).data('item');

                if (_dataItem === "separator") { return; }

                $('span.secondary-filters').removeClass('active');
                $(this).addClass('active');

                if (_dataItem === "Sublimated") {

                    ub.filters.secondary = "sublimated";
                    
                } else if (_dataItem === "Twill") {

                    ub.filters.secondary = "tackle_twill";

                } else {

                    ub.filters.secondary = "All";

                }

                if (_dataItem === "All") {

                    if (ub.filters.primary !== 'All') {

                        items = _.filter(ub.materials, { uniform_category: gender, type: ub.filters.primary });    

                    } else {
                        
                        items = _.filter(ub.materials, { uniform_category: gender});    

                    }

                } else {

                    if (ub.filters.primary !== 'All') {

                        items = _.filter(ub.materials, { uniform_category: gender, uniform_application_type: ub.filters.secondary,  type: ub.filters.primary });    

                    } else {

                        items = _.filter(ub.materials, { uniform_category: gender, uniform_application_type: ub.filters.secondary });

                    }

                }

                $('div#main-picker-scroller').fadeOut().html('');
                ub.funcs.initScroller('uniforms', items, gender);

            });

            $('span.primary-filters').on('click', function () {

                $('span.primary-filters').removeClass('active');
                $(this).addClass('active');

                var _dataItem = $(this).data('item');

                if (_dataItem === "Jersey") {

                    ub.filters.primary = "upper";
                    
                } else if (_dataItem === "Pant") {

                    ub.filters.primary = "lower";

                } else {

                    ub.filters.primary = 'All';

                }

                if (_dataItem === "All") {

                    if (ub.filters.secondary !== 'All') {

                        items = _.filter(ub.materials, { uniform_category: gender, uniform_application_type: ub.filters.secondary  });    

                    } else {
                        
                        items = _.filter(ub.materials, { uniform_category: gender }); 

                    }

                } else {

                    if (ub.filters.secondary !== 'All') {

                        items = _.filter(ub.materials, { uniform_category: gender, type: ub.filters.primary, uniform_application_type: ub.filters.secondary  });    

                    } else {

                        items = _.filter(ub.materials, { uniform_category: gender, type: ub.filters.primary });

                    }

                }

                $('div#main-picker-scroller').fadeOut().html('');
                ub.funcs.initScroller('uniforms', items, gender);

            });

        }

        if(type === 'search_results') {

            ub.funcs.hideSecondaryBar();

            var template = $('#m-picker-items-search-results').html();
            var uniques = _.map(_.groupBy(items, function(doc) {
              return doc.id;
            }),function(grouped){
              return grouped[0];
            });

            if (!_.contains(ub.fontGuideIDs, ub.user.id)) {
                uniques = _.reject(uniques, function (item) { 
                    return item.uniform_category === "Baseball"; 
                });
            }

            var data = {
                picker_type: type,
                picker_items: uniques,
            }
            
            var markup = Mustache.render(template, data);
            $scrollerElement.html(markup);

            $('div.back-link').html('<img src="/images/main-ui/back.png" /> <span> | </span>');

            $('div.back-link').on('click', function () {

                ub.funcs.initGenderPicker();        

            });

        }

        $scrollerElement.fadeIn();
        $pickerHeader.fadeIn();
        ub.funcs.reBindEventsPickers();

        $(window).trigger('resize');
    
    };

    ub.funcs.initGenderPicker = function () {

        $('body').removeClass('generic-canvas');

        $('div#main-picker-container').css('background-image','url(/images/main-ui/_unleash.png)');
        $('body').css('background-image',"url('/images/main-ui/_unleashbg.jpg')");

        ub.funcs.hideRosterAndOrderForm();

        // $('.header-container').removeClass('forceHide');

        $('body').addClass('pickers-enabled');

        $('.main_viewport').hide();

        $('div#main-row').hide();
        $('span.undo-btn').hide();
        $('div.special_modifiers').hide();
        $('div#main-picker-container').show();

        var items = ub.data.genders;

        ub.funcs.initScroller('gender', items);
        $('div.main-picker-items').hide();

    };

    ub.funcs.fadeOutBackgrounds = function () {

        $('div#main-picker-container').css('background-image','none');
        $('body').css('background-image','none');
    
    };

    ub.funcs.initSportsPicker = function (sport) {

        ub.funcs.fadeOutBackgrounds();

        $('body').addClass('pickers-enabled');

        $('div#main-row').hide();
        $('div.special_modifiers').hide();

        var $searchField = $('input#search_field');
        $searchField.fadeIn();


        if (_.contains(ub.fontGuideIDs, ub.user.id)) {

            var a = _.find(ub.data.sports, {gender: 'Men'});
            var _bsb = _.find(a.sports, {code: 'baseball'});

            _bsb.active = "1";
            _bsb.tooltip = "";
            _bsb.disabledClass = "";

            var a = _.find(ub.data.apparel, {gender: 'Men'});
            var _csc = _.find(a.sports, {code: 'crew_sock'});

            _csc.active = "1";
            _csc.tooltip = "";
            _csc.disabledClass = "";

            var a = _.find(ub.data.apparel, {gender: 'Men'});
            var _tct = _.find(a.sports, {code: 'tech_tee'});

            _tct.active = "1";
            _tct.tooltip = "";
            _tct.disabledClass = "";

            var a = _.find(ub.data.apparel, {gender: 'Men'});
            var _tct = _.find(a.sports, {code: 'tech_tee'});

            _tct.active = "1";
            _tct.tooltip = "";
            _tct.disabledClass = "";

            var a = _.find(ub.data.apparel, {gender: 'Men'});
            var _cmp = _.find(a.sports, {code: 'compression'});

            _cmp.active = "1";
            _cmp.tooltip = "";
            _cmp.disabledClass = "";

        } else {

            var a = _.find(ub.data.sports, {gender: 'Men'});
            var _bsb = _.find(a.sports, {code: 'baseball'});

            _bsb.active = "0";
            _bsb.tooltip = "COMING SOON";
            _bsb.disabledClass = "disabledClass";

            var a = _.find(ub.data.apparel, {gender: 'Men'});
            var _csc = _.find(a.sports, {code: 'crew_sock'});

            _csc.active = "0";
            _csc.tooltip = "COMING SOON";
            _csc.disabledClass = "disabledClass";

            var a = _.find(ub.data.apparel, {gender: 'Men'});
            var _tct = _.find(a.sports, {code: 'tech_tee'});

            _tct.active = "0";
            _tct.tooltip = "COMING SOON";
            _tct.disabledClass = "disabledClass";

            var a = _.find(ub.data.apparel, {gender: 'Men'});
            var _tct = _.find(a.sports, {code: 'compression'});

            _tct.active = "0";
            _tct.tooltip = "COMING SOON";
            _tct.disabledClass = "disabledClass";


        }

        var _apparel = _.find(ub.data.apparel, {gender: 'Men'});

        var items = _.find(ub.data.sports, {gender: sport});
        ub.funcs.initScroller('sports', items.sports,undefined,undefined,_apparel.sports);

    };

    ub.funcs.initUniformsPicker = function (sport) {

        $('body').addClass('pickers-enabled');

        $('div#main-row').hide();
        $('div.special_modifiers').hide();
        $('div#main-picker-container').show();

        var items = _.filter(ub.materials, {uniform_category: sport });
        ub.funcs.initScroller('uniforms', items, sport);

    };

    ub.funcs.initSearchPicker = function (term, items) {

        ub.funcs.fadeOutBackgrounds();

        $('body').addClass('pickers-enabled');

        $('div#main-row').hide();
        $('div.special_modifiers').hide();
        $('div#main-picker-container').show();

        var items = items;
        ub.funcs.initScroller('search_results', items, term);

    };

    $('input#search_field').on('keyup', function (evt) {

        if ($(this).val().length === 0) { 
            ub.funcs.initMen();           
        }        

    });

    ub.funcs.initMen = function () {
         
        $('span.slink[data-item="Men"]').click();

    }

    ub.funcs.backHome = function () {

        ub.funcs.initGenderPicker();
        return;

    };

    ub.funcs.showPartsDropdown = function () {

        var $partsdropdown = $('div#parts_dropdown');

        if ($partsdropdown.data('status') === 'closed') {

            $partsdropdown.data('status','open');
            $partsdropdown.fadeIn();    
            $('.mod_primary_panels').hide();

        }
        else {

            $partsdropdown.data('status','closed');
            $partsdropdown.css('display', 'none');    
            $('.mod_primary_panels').fadeIn('fast');

        } 

    };

    $('div#select_part').on('click', function () {

        ub.funcs.showPartsDropdown();

    });

    /// End New UI Code 

    // /// Show Builder Pickers is there's no Uniform or Order that's being loaded

    if (window.ub.config.material_id === -1 && typeof window.ub.temp === 'undefined') {

        // $('a.btn-new.new').click();
        ub.funcs.initGenderPicker();

    } 

    // End Show Builder Picker

    /// New Sidebar




        ub.funcs.turnOffMTAB = function (type) {

            $('div.mTab').each(function (index) {

                var _type = $(this).data('type');

                if (_type === type) { return; }

                $(this).find('img').attr('src', "/images/uiV1/modifier_tabs/inactive/" + _type + ".png?v=0.01");
                $(this).css('border-top-color','#d7d7d7');
                $(this).css('background-color','#e6e6e6');

                $(this).css('padding-bottom','7px');
                $(this).css('padding-top','7px');

            });

            $('div.mod_primary_panels').each(function () {

                var _type = $(this).data('type');

                if (_type === type) { 

                    return; 

                }

                $(this).hide();

            });

        };

        ub.funcs.turnOnMTAB = function (type) {

            var $tab = $('div.mTab[data-type="' + type + '"]');

            $tab.find('img').attr('src', "/images/uiV1/modifier_tabs/active/" + type + ".png?v=0.01");
            $tab.css('border-top-color','#ffffff');
            $tab.css('background-color','#ffffff');
            $tab.css('margin-left','0px');
            $tab.css('margin-right','0px');
            $tab.css('padding','10px');

            var $tabContainer = $('div.mod_primary_panels[data-type="' + type + '"]');
            
            $tabContainer.fadeIn();
            
            ub.funcs.turnOffMTAB(type); 

        };

        $('div.mTab').on('click', function () {

            var _type = $(this).data('type');
            ub.funcs.turnOnMTAB(_type);

        });

        $('div.mTab[data-type="color"]').click();

        $("body").dblclick(function() {

            if(ub.status.onText) { return; }
            if(!ub.states.canDoubleClick) { return; }

            if($('div#cogPopupContainer').is(':visible')) { return; }
            
            ub.zoom_on();
            $('a.change-view[data-view="zoom"]').addClass('zoom_on');

        });

    /// End Sidebar 

        ub.funcs.displayLoginForm = function () {
        
            $('a.dropdown-toggle').trigger('click');

        };

    /// Orders

        ub.funcs.getOrders = function () {

        };

        ub.funcs.parseJSON = function (orders) {

            var _parsedOrders = orders;

            _.each(orders, function (order) {

                _.each(order.items, function (item){

                    var _bc = JSON.parse(item.builder_customizations);
                    item.thumbnails = _bc.thumbnails;

                }) 
                
            });

            return _parsedOrders;

        }

        /// My Saved Designs

        ub.funcs.shareSavedDesign = function (id, name) {

            // var txt;
            
            // var r = confirm("Are you sure you want to share '" + name + "'?");
            
            // if (r !== true) { return; }

            // data = {
            //     emails: 'arthur@qstrike.com',
            //     id: id,
            //     sharer_name: 'Arthur Abogadil',
            //     sharer_message: 'Hey, can you checkout this uniform and tell me your feedback? Thanks!',
            // }

            // $.ajax({

            //     url: ub.config.api_host + '/api/saved_design/sendToEmails/',
            //     data: JSON.stringify(data),
            //     type: "POST", 
            //     crossDomain: true,
            //     contentType: 'application/json',
            //     headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

            //     success: function (response) {

            //         console.log(response);
            //         console.log('Save Design Shared Successfully');

            //     }
                
            // });
   
        }

        ub.funcs.deleteSavedDesign = function (id, name) {

            var txt;
            
            var r = confirm("Are you sure you want to delete '" + name + "'?");
            
            if (r !== true) { return; }

            data = {
                id: id,
            }

            $.ajax({

                url: ub.config.api_host + '/api/saved_design/delete/',
                data: JSON.stringify(data),
                type: "POST", 
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

                success: function (response) {

                    $('tr.saved-design-row[data-id="' + id + '"]').fadeOut();

                }
                
            });
   
        }
        ub.funcs.runDataTable = function () {

            $.getScript("/data-tables/datatables.min.js", function( data, textStatus, jqxhr ) {

              $('.data-table').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "searching": true,
                    "ordering": false,
                    "info": true,
                    "autoWidth": true,
                    initComplete: function () {
                        this.api().columns().every( function () {

                            var column = this;
                            var select = $('<select><option value=""></option></select>')
                                .appendTo( $(column.footer()).empty() )
                                .on( 'change', function () {
                                    var val = $.fn.dataTable.util.escapeRegex(
                                        $(this).val()
                                    );

                                    column
                                    .search( val ? '^'+val+'$' : '', true, false )
                                        .draw();
                                } );

                            column.data().unique().sort().each( function ( d, j ) {

                                select.append( '<option value="'+d+'">'+d+'</option>' )
                            } );
                        } );
                        $(".data-table-filter-hide select").hide();                      
                        $(".dataTables_filter,.dataTables_paginate").attr( "style","float: right;" );
                        $(".dataTables_filter label").attr( "style","margin-bottom: 10px;" );
                        $(".dataTables_info").attr( "style","margin-top: 10px;" );
                        $(".dataTables_filter input").attr( "style","width: 300px;margin-left: 10px;" );
                        $(".active a").attr( "style","background: #3d3d3d;border-color: #3d3d3d" );

                
  
                    }
                }); 
            });
            
            $(".dropdown-toggle").on('click', function () {                       

                if($( ".btn-group" ).hasClass( "open" )){
                    $( ".btn-group" ).removeClass("open");
                }else{
                    $( ".btn-group" ).addClass("open");
                }
            });
           


        }

        ub.funcs.displayMySavedDesigns = function () {
         
            $.ajax({
                url: ub.config.api_host + '/api/saved_design/getByUserId/' + ub.user.id,
                type: "GET", 
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
                
                success: function (response) {

                  $('div.my-saved-designs-loading').hide();
                  
                  var $container = $('div.saved-designs-list');
                  var template = $('#m-saved-designs-table').html();
                  var data = {

                        savedDesigns: ub.funcs.parseJSON(response.saved_designs),

                  }
         
                data.savedDesigns.forEach(function (value, i) {
                    data.savedDesigns[i].created_at_time = util.dateFormat(value.created_at);
                    data.savedDesigns[i].created_at_time = data.savedDesigns[i].created_at_time.split(' ').slice(3, 5).join(' ');
                });
          
                var markup = Mustache.render(template, data);
                $container.html(markup);
                $( ".created-at" ).each(function( index ) {
                  var date = util.dateFormat($( this ).text());
                  date = date.split(' ').slice(0, 3).join(' ');
                  $( this ).text(date);
                });
                ub.funcs.runDataTable();
                var $imgThumbs = $('img.tview');
                
                $imgThumbs.unbind('click');
                $imgThumbs.on('click', function () {

                    var _file = $(this).data('file');
                    var _str = "<img src ='" + _file + "' />";
                    
                    ub.showModalTool(_str);

                });

  
               

                  $('span.action-button.view').on('click', function () {

                        var _savedDesignID = $(this).data('saved-design-id');
                        window.location.href =  '/my-saved-design/' + _savedDesignID + '/render';
                        
                  });

                  $('span.action-button.share').on('click', function () {

                        // var _shareDesignID = $(this).data('saved-design-id');
                        // var _name = $(this).data('name');
                        
                        // ub.funcs.shareSavedDesign(_shareDesignID, _name);

                        // $('.share-uniform-design')

                  });

                  $('span.action-button.delete').on('click', function () {

                        var _deleteDesignID = $(this).data('saved-design-id');
                        var _name = $(this).data('name');

                        ub.funcs.deleteSavedDesign(_deleteDesignID, _name);

                  });
                  $(document).on('change', '.fil-to,.fil-from', function(){
                    var filterFrom = $('.fil-from').val();
                    var filterTo = $('.fil-to').val();
                    var template = $('#m-saved-designs-table').html();
                    var filteredDataString = JSON.stringify(data.savedDesigns);
                    var filteredData =JSON.parse(filteredDataString);

                    filteredData.forEach(function (value, i) {
                        value.created_at = value.created_at.split(' ').slice(0, 1).join(' ');
                       if(filterFrom <= value.created_at && filterTo >= value.created_at){    
                        }else{
                         delete filteredData[i];   
                        }
                    });
                   var filteredDataRemoveEmpty = filteredData.filter(function(x){
                      return (x !== (undefined || ''));
                    });
                    var filtered_data = {savedDesigns: filteredDataRemoveEmpty,}        
                    
                    var markup = Mustache.render(template, filtered_data);
                    $container.html(markup); 
                    console.log(filteredData);
                    $( ".created-at" ).each(function( index ) {
                      var date = util.dateFormat($( this ).text());
                      date = date.split(' ').slice(0, 3).join(' ');
                      $( this ).text(date);
                    });
                    ub.funcs.runDataTable();    
                  });   
                  bindShareDesigns();
            
                }
                
            });
   
        }

        if (ub.page === 'my-saved-designs') {

            $('div#main-picker-container').remove();
            $('body').css('background-image', 'none');

            if (!window.ub.user) { 
                ub.funcs.displayLoginForm(); 
                return;
            }          
            ub.funcs.displayMySavedDesigns();          


        }

    /// End My Saved Designs

        ub.funcs.deleteSavedOrder = function (id, code) {

            var txt;
            
            var r = confirm("Are you sure you want to delete saved order [" + code + "]?");
            
            if (r !== true) { return; }

            data = {
                id: id,
            }

            $.ajax({

                url: ub.config.api_host + '/api/order/delete/',
                data: JSON.stringify(data),
                type: "POST", 
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

                success: function (response) {

                    $.smkAlert({text: 'Saved Order [' + code + '] Deleted.', type:'success', time: 3, marginTop: '80px'});
                    $('tr.saved-order-row[data-id="' + id + '"]').fadeOut();

                }
                
            });
   
        }

        ub.funcs.displayMyOrders = function () {

            $.ajax({
            
                url: ub.config.api_host + '/api/order/user/orderswItems/' + ub.user.id,
                type: "GET", 
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
                success: function (response){
   

                    $('div.my-orders-loading').hide();

                    var $containerSaved         = $('div.order-list.saved');
                    var template                = $('#m-orders-table').html();
                    var dataSaved               = { orders: _.filter(ub.funcs.parseJSON(response.orders), {submitted: '0'}) };     

                    dataSaved.orders.forEach(function (value, i) {
                        value.created_at = util.dateFormat(value.created_at);
                        value.created_at_time = util.dateFormat(value.created_at);
                        value.created_at = value.created_at.split(' ').slice(0, 3).join(' ');
                        value.created_at_time = value.created_at_time.split(' ').slice(3, 5).join(' ');

                    }); 
                    var markup = Mustache.render(template, dataSaved);
                    $containerSaved.html(markup);
                    var $containerSubmitted     = $('div.order-list.submitted');
                    var template                = $('#m-orders-table').html();
                    var dataSubmitted           = { orders: _.filter(ub.funcs.parseJSON(response.orders), {submitted: '1'}) };

                    dataSubmitted.orders.forEach(function (value, i) {
                        value.created_at = util.dateFormat(value.created_at);
                        value.created_at_time = util.dateFormat(value.created_at);
                        value.created_at = value.created_at.split(' ').slice(0, 3).join(' ');
                        value.created_at_time = value.created_at_time.split(' ').slice(3, 5).join(' ');

                    }); 
                    console.log(dataSubmitted.orders);                   
                    var markup                  = Mustache.render(template, dataSubmitted);
                    $containerSubmitted.html(markup);

                    ub.funcs.runDataTable();

                    $('div.order-list.submitted').find('span.action-button.delete').hide();

                    var $imgThumbs = $('img.thumbs');
                    
                    $imgThumbs.unbind('click');
                    $imgThumbs.on('click', function () {

                        var _file = $(this).data('file');
                        var _str = "<img src ='" + _file + "' />";

                        ub.showModalTool(_str);

                    });

                    $('span.action-button.edit').unbind('click');
                    $('span.action-button.edit').on('click', function () {

                        var _dataID = $(this).data('order-id');
                        var _ID     = $(this).data('id');

                        window.location.href =  '/order/' + _dataID;

                    });

                    $('span.action-button.delete').unbind('click');
                    $('span.action-button.delete').on('click', function () {

                        var _dataID = $(this).data('order-id');
                        var _ID     = $(this).data('id');

                        ub.funcs.deleteSavedOrder(_ID, _dataID);

                    });

                    $('div.order-tabs > span.tab').unbind('click');
                    $('div.order-tabs > span.tab').on('click', function () {

                        var _type = $(this).data('type');

                        $('div.order-list').hide();
                        $('div.order-list.' + _type).fadeIn();

                        $('span.tab').removeClass('active');
                        $(this).addClass('active');

                        $('span.orders.header').html('My ' + _type + ' Orders');

                    });



                    // Init 

                    $('div.order-list.submitted').hide();

                }
                
            });
   
        }

        if (ub.page === 'my-orders') {

            $('div#main-picker-container').remove();
            $('body').css('background-image', 'none');

            if (!window.ub.user) { 
                ub.funcs.displayLoginForm(); 
                return;
            } 

            ub.funcs.displayMyOrders();

        }

        ub.funcs.messagesCallBack = function (messageBlock) {

            var _items = messageBlock;
            var _count = _.size(_items);

            $('div.my-messages-loading').hide();
            $('div.messages-loading').hide();

            var $container          = $('div.message-list');
            var _messages           = ub.funcs.parseJSON(_items);

            _messages               = _.chain(_messages)
                                        .map(function (item)    { 

                                            item.statusPreview = (item.read === '0') ? "New!": ""; 
                                            
                                            if (typeof item.content !== "undefined" && item.content !== null) { item.contentPreview = item.content.substring(0,33) + '...'; }
                                            
                                            item.numericId = parseInt(item.id); 
                                            return item; 

                                        })
                                        .sortBy(function (item) { return item.numericId * -1; })
                                        .value();

            var data                = { messages: _messages, };
            var $messagesContainer  = $('div.message-list.right-pane');
            var _messagesTemplate   = $('#messages-table').html();

            _messagesMarkup         = Mustache.render(_messagesTemplate, data);

            $.when(
                $messagesContainer.html(_messagesMarkup)
            ).then (function () {

                $.each($('td.time'), function (index, value){

                    var _utcDate = $(value).data('time');
                    var date = new Date(_utcDate);

                    var _d = moment.utc(_utcDate).tz(moment.tz.guess()).format('MMMM d, YYYY ha z');

                    $(value).html(_d);

                });

            });

            var $viewMessageButton = $('span.action-button.view-message');
            
            $viewMessageButton.unbind('click');
            $viewMessageButton.on('click', function () {

                var _id             = $(this).data('id');
                var _type           = $(this).data('type');
                var _messagePopup   = $('#m-message-popup').html();
                var _message        = _.find(_messages, {id: _id.toString()});

                _messagesPopupMarkup = Mustache.render(_messagePopup, _message);

                $('#primaryMessagePopup').remove();
                $('body').append(_messagesPopupMarkup);

                $('#primaryMessagePopup').fadeIn();
                $('body').scrollTop(0);

                ub.funcs.centerPatternPopup();

                if ($('div#messages > span.header').html() === "sent") {

                    $('div.reply-box').hide();

                } else {

                    // mark as read if the one viewwing the message is not the one who sent it....
                    ub.funcs.markAsRead(_id);

                }

                $('span.submit-reply').unbind('click');
                $('span.submit-reply').on('click', function () {

                    var _messageEntered = $('textarea[name="reply"]').val();

                    if(_messageEntered === "") { 

                        $.smkAlert({text: 'Please put in a message.', type:'warning', time: 3, marginTop: '80px'});
                        return; 

                    }

                    ub.funcs.createMessage(_message.type, 'N/A','Re: ' + _message.subject, _messageEntered, _id);
                    $('#primaryMessagePopup').remove();

                });

                $('div.close-popup').unbind('click');
                $('div.close-popup').on('click', function () {

                    $('#primaryMessagePopup').remove();

                });

            });

            var $msgType = $('span.message-type');
            $msgType.unbind('click');
            $msgType.on('click', function () {

                var _type = $(this).data('type');
                $('div#messages > span.header').html(_type);

                $('tr.message-row').remove();
                $('div.messages-loading').fadeIn();

                ub.funcs.filterMessages(_type);

            });

        }

        ub.funcs.filterMessages = function (type) {

            if (type !== "unread") {

                var _message = _.find(ub.data.notificationMessage, {type: type});
                $('div.notification-description').html(_message.description);

            }

            $('div#messages > span.header').html(type);

            if (type !== "unread") {

                ub.funcs.displayMyMessages(type);
                    
            } else {

                ub.funcs.displayMyMessages();

            }
            
        }

        ub.funcs.markAsRead = function (messageId) {

            if (typeof $.ajaxSettings.headers !== 'undefined') { delete $.ajaxSettings.headers["X-CSRF-TOKEN"]; }

            $.ajax({
            
                url: ub.config.api_host + '/api/message/' + messageId,
                type: "GET", 
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
                success: function (response){

                    ub.funcs.updateMessageCount();

                    if ($('div#messages > span.header').html() === "unread") {

                        $('tr.message-row[data-id="' +  messageId + '"]').remove();

                    }

                }
                
            });

        }

        ub.funcs.displayMyMessages = function (type) {

            if (typeof $.ajaxSettings.headers !== 'undefined') { delete $.ajaxSettings.headers["X-CSRF-TOKEN"]; }

            var _url = ub.config.api_host + '/api/messages/recipient/unread/' + ub.user.id;

            if (typeof type !== 'undefined') {

               _url = ub.config.api_host + '/api/messages/recipient/' + ub.user.id

            }

            if (type === 'sent') {

                _url = ub.config.api_host + '/api/messages/sender/' + ub.user.id; 

            }

            $.ajax({
            
                url: _url,
                type: "GET", 
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
                success: function (response){

                    if (typeof type === 'undefined' || type === 'sent') {

                        ub.funcs.messagesCallBack(response.messages);

                    } else {

                        var _typeConverted = type.toTitleCase();

                        if (_typeConverted === 'Pm') { _typeConverted = "PM"; }

                        var _filteredMessages = _.filter (response.messages, {type: _typeConverted});
                        ub.funcs.messagesCallBack(_filteredMessages);

                    }
                    
                }
                
            });
   
        }

        if (ub.page === 'my-messages') {

            $('div#main-picker-container').remove();
            $('body').css('background-image', 'none');

            if (!window.ub.user) { 
                ub.funcs.displayLoginForm(); 
                return;
            } 

            ub.funcs.displayMyMessages();

        }

    /// End Orders

    /// Profile

        ub.funcs.updateProfile = function (firstName, lastName) {

            var _postData = {
                id: ub.user.id,
                first_name: firstName,
                last_name: lastName,
            }

            var _url = ub.config.api_host + '/api/user/update';

            $.ajax({
                
                url: _url,
                type: "POST", 
                data: JSON.stringify(_postData),
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

                success: function (response){

                    ub.user.firstName = firstName;
                    ub.user.lastName = lastName;

                    window.location.href = '/my-profile';

                }
                
            });

        };

        ub.funcs.displayMyProfile = function () {

            var $container = $('div.profile-container');
          
            var template = $('#m-profile-page').html();
            var data = {
                email: ub.user.email,
                firstName: ub.user.firstName,
                lastName: ub.user.lastName,
                application_id: '1',
            }

            var markup = Mustache.render(template, data);
            $container.html(markup);

            $('span.update-profile').unbind('click');
            $('span.update-profile').on('click', function () {

                var _firstName = $('input[name="first-name"]').val();
                var _lastName = $('input[name="last-name"]').val();

                ub.funcs.updateProfile(_firstName, _lastName);

            });

        }

        if (ub.page === 'my-profile') {

            $('div#main-picker-container').remove();
            $('body').css('background-image', 'none');

            if (!window.ub.user) { 
                ub.funcs.displayLoginForm(); 
                return;
            } 

            ub.funcs.displayMyProfile();

        }

    /// End Profile

    /// Signup

        ub.funcs.displaySignup = function () {

            var $container = $('div.signup-container');
          
            var template = $('#m-signup-page').html();
            var data = {
                application_id: '1',
            }

            var markup = Mustache.render(template, data);
            
            $container.html(markup);

        }

        if (ub.page === 'signup') {

            $('div#main-picker-container').remove();
            $('body').css('background-image', 'none');

            if (!window.ub.user) { 
                //ub.funcs.displayLoginForm(); 
                return;
            } 

            ub.funcs.displaySignup();

        }

    /// End Signup

    /// Change Password Post

    ub.funcs.submitChangePasswordPOST = function () {

            var _postData = {

                user_id: $('input.user_id').val(),
                hash: $('input.hash').val(),
                _token: $('input.csrf-token').val(),
                old_password: $('input#old-password').val(),
                new_password: $('input#new-password').val(),

            };

            $.ajax({
                
                url: '/saveChangedPassword',
                type: "POST", 
                data: JSON.stringify(_postData),
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
                success: function (response){

                    if (response.success) {
                        $.smkAlert({text: 'Your Password has been changed successfully', type:'success', permanent: false, time: 5, marginTop: '90px'});
                        window.location.href = window.ub.config.host;
                    } else {

                        $.smkAlert({text: 'There is an error processing this request', type:'error', permanent: false, time: 5, marginTop: '90px'});

                    }

                }
                
            });

        };

    /// End Change Password Post

    /// Forgot Password

        ub.funcs.submitForgotPasswordPOST = function () {

            var _postData = {

                user_id: $('input.user-id').val(),
                hash: $('input.hash').val(),
                _token: $('input.csrf-token').val(),
                password: $('input#rpassword').val(),

            };

            $.ajax({
                
                url: '/saveNewPassword',
                type: "POST", 
                data: JSON.stringify(_postData),
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
                success: function (response){

                    if (response.success) {
                        $.smkAlert({text: 'Your Password has been changed successfully', type:'success', permanent: false, time: 5, marginTop: '90px'});
                        window.location.href = window.ub.config.host;
                    } else {

                        $.smkAlert({text: 'There is an error processing this request', type:'error', permanent: false, time: 5, marginTop: '90px'});

                    }

                }
                
            });

        };

        ub.funcs.forgotPasswordPOST = function () {

            var _postData = {

                email: $('input#forgot-password-email').val(),
                _token: $('input[name="_token"]').val(),

            };

            $.ajax({
                
                url: '/recoverPassword',
                type: "POST", 
                data: JSON.stringify(_postData),
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
                success: function (response){

                    if (response.success) {
                        $.smkAlert({text: 'A password reset link has been sent to your email', type:'success', permanent: false, time: 5, marginTop: '90px'});
                        window.location.href = window.ub.config.host;
                    } else {

                        $.smkAlert({text: 'You have entered an invalid email!', type:'error', permanent: false, time: 5, marginTop: '90px'});

                    }

                }
                
            });

        };

        ub.funcs.forgotPassword = function () {

            var $container = $('div.forgot-password-container');
          
            var template = $('#m-forgot-password').html();
            var data = {
                application_id: '1',
            }

            var markup = Mustache.render(template, data);
            
            $container.html(markup);
            $('div#main-row').css('display','block')

        }

        if (ub.page === 'forgot-password') {

            $('div#main-picker-container').remove();
            $('body').css('background-image', 'none');

            if (!window.ub.user) { 
                //ub.funcs.displayLoginForm(); 
                return;
            } 

            ub.funcs.forgotPassword();

        }

    /// End Forgot Password

    /// Reset Password

        ub.funcs.resetPassword = function () {

            var $container = $('div.forgot-password-container');
          
            var template = $('#m-forgot-password').html();
            var data = {
                application_id: '1',
            }

            var markup = Mustache.render(template, data);
            
            $container.html(markup);

        }

        if (ub.page === 'reset-password') {

            $('div#main-picker-container').remove();
            $('body').css('background-image', 'none');

            if (!window.ub.user) { 
                //ub.funcs.displayLoginForm(); 
                return;
            } 

            ub.funcs.resetPassword();

        }

    /// End Forgot Password
    
    
    /// Saving, Loading and Sharing /// 

    // New Design
    $('.new-design').on('click', function () {
        // To Do
    });

    // Open Design
    $('.open-design').on('click', function () {

        openSavedUniformDesigns(ub.user.id);

    });

    // Compare Designs
    $('.compare-design').on('click', function () {
        // To Do
    });

    // Save Design Modal
    $('.open-save-design-modal').on('click', function () {

        if (ub.user === false) {
            
            showSignUpModal();
            return;

        } else {

            var obj_settings = ub.exportSettings();
            obj_settings['upper']['preview'] = '';

            $('#builder_customizations').val(JSON.stringify(obj_settings));
            $('#save-design-modal').modal('show');

        }

    });

    // Remove Uniform Design Trigger
    function bindDeleteUniformDesign() {
        $('.delete-uniform-design').on('click', function() {
            var data = {
                id: $(this).data('order-id')
            };
            $.ajax({
                url: ub.config.api_host + '/api/order/delete',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(data),
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
                success: function(response) {
                    if (response.success) {
                        $('.delete-uniform-design[data-order-id="' + data.id + '"]').parents('.uniform-design-item').fadeOut();
                    }
                }
            });
        });
    }

    function openSavedUniformDesigns(userId) {
        var options = {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        };
        $.ajax({
            url: ub.config.api_host + '/api/order/user/' + userId,
            type: 'GET',
            dataType: 'json',
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
            success: function (response) {
                if (response.success) {
                    var orders = response.orders;
                    $('#orders-list').html(''); // Clear the list
                    $.each(orders, function (i, order) {
                        var template = $('#list-saved-designs').html();
                        var date_ordered = new Date(order.created_at);
                        order.created_at = date_ordered.toLocaleTimeString("en-us", options);
                        var row = Mustache.to_html(template, order)
                        $('#orders-list').append(row);
                    });
                    $('#orders-list [data-toggle="tooltip"]').tooltip();
                    $('#open-design-modal').modal('show');
                }
                bindShareDesigns();
                bindDeleteUniformDesign();
            }
        });
    }


    function saveUniformDesign() {
        var data = {
            uniformType: $('#save-design-modal .uniform-type').val(),
            builder_customizations: ub.exportSettings(),
            athletic_director: {
                organization: $('#athletic-director .organization').val(),
                contact: $('#athletic-director .contact').val(),
                email: $('#athletic-director .email').val(),
                phone: $('#athletic-director .phone-number').val(),
                fax: $('#athletic-director .fax-number').val()
            },
            billing: {
                organization: $('#billing-information .organization').val(),
                contact: $('#billing-information .contact').val(),
                address: $('#billing-information .address').val(),
                city: $('#billing-information .city').val(),
                state: $('#billing-information .state').val(),
                zip: $('#billing-information .zip').val(),
                email: $('#billing-information .email').val(),
                phone: $('#billing-information .phone-number').val(),
                fax: $('#billing-information .fax-number').val()
            },
            shipping: {
                organization: $('#shipping-information .organization').val(),
                contact: $('#shipping-information .contact').val(),
                address: $('#shipping-information .address').val(),
                city: $('#shipping-information .city').val(),
                state: $('#shipping-information .state').val(),
                zip: $('#shipping-information .zip').val(),
                phone: $('#shipping-information .phone-number').val(),
            },
            credit_card: {
                number: $('#credit-card-information .credit-card-number').val(),
                verification: $('#credit-card-information .security-code').val(),
                card_type: $('#credit-card-information .card-type').val(),
                card_holder_name: $('#credit-card-information .billing-address-name').val(),
                expiration_date: $('#credit-card-information .expiration-month-and-year').val(),
            }
        };
        if (ub.user === false) {
            showSignUpModal();
            return;
        } else {
            data.user_id = ub.user.id;
            data.client = ub.user.fullname;
            data.email = ub.user.email;
        }
        $('#save-design-modal').modal('hide');

        // Notification Message
        $.smkAlert({text: 'Saving your order. Please wait...', type:'info', permanent: true, marginTop: '90px'});

        var endpoint = ub.config.api_host + '/api/order';
        if (typeof(ub.order) !== "undefined") {
            endpoint = ub.config.api_host + '/api/order/update';
        }

        var use_perspectives = 0;
        if (use_perspectives) {
            data.image_perspectives = {
                front: ub.getThumbnailImage('front_view'),
                back: ub.getThumbnailImage('back_view'),
                left: ub.getThumbnailImage('left_view'),
                right: ub.getThumbnailImage('right_view')
            };
        }

        $.ajax({
            url: endpoint,
            data: JSON.stringify(data),
            type: 'POST',
            dataType: 'json',
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
            success: function (response) {
                if (response.success) {
                    // Notification Message
                    $.smkAlert({text: 'Finished Saving Uniform Design', type:'success', permanent: false, 'time': 10, marginTop: '90px'});
                    // Redirect to Order Page
                    location.href = location.protocol + '//' + location.host + '/order/' + response.order.order_id;
                }
                saveImagePerspectives('front_view', ub.getThumbnailImage('front_view'));
                saveImagePerspectives('front_view', ub.getThumbnailImage('back_view'));
                saveImagePerspectives('front_view', ub.getThumbnailImage('left_view'));
                saveImagePerspectives('front_view', ub.getThumbnailImage('right_view'));
            }
        });
    }

    // Save Uniform Design
    $('.save-uniform-design').on('click', function() {
        // Uniform Codes
        $('#save-uniform-design-form .upper_body_uniform').val(ub.current_material.settings.upper.code);
        $('#save-uniform-design-form .lower_body_uniform').val(ub.current_material.settings.lower.code);
        // Team Roster Counts
        var countRoster = 0;
        if (typeof(ub.current_material.team_roster) !== "undefined") {
            countRoster = ub.current_material.team_roster.length;
        }
        $('#save-uniform-design-form .total_upper_uniforms').val(countRoster);
        $('#save-uniform-design-form .total_lower_uniforms').val(countRoster);
        // Perspectives: Base64 format images
        $('#save-uniform-design-form .upper_front_view').val(ub.getThumbnailImage('front_view'));
        $('#save-uniform-design-form .upper_back_view').val(ub.getThumbnailImage('back_view'));
        $('#save-uniform-design-form .upper_right_view').val(ub.getThumbnailImage('right_view'));
        $('#save-uniform-design-form .upper_left_view').val(ub.getThumbnailImage('left_view'));

        // Show spinner
        $('#save-design-modal .fa-save').removeClass('fa-save').addClass('fa-spin fa-circle-o-notch');
        $(this).attr('disabled', 'disabled');

        // disable the modal-close behaviour
        $('#save-uniform-design-form').submit();
    });

    if (ub.user !== false) {
        // Credit Card Validator
        var creditly = Creditly.initialize(
              '.creditly-wrapper .expiration-month-and-year',
              '.creditly-wrapper .credit-card-number',
              '.creditly-wrapper .security-code',
              '.creditly-wrapper .card-type');
        $(".creditly-card-form .validate-cc").click(function (e) {
            e.preventDefault();
            var output = creditly.validate();
            if (output) {
              // Your validated credit card output
       
            }
        });
    }

    $('.open-team-roster-modal').on('click', function () {
        $('#team-roster-modal').modal('show');
    });

    $('.add-roster-record').on('click', createNewRosterRecordForm);

    function createNewRosterRecordForm() {
        var template = $('#roster-record').html();
        var item = Mustache.to_html(template, {uniformSizes: ub.uniformSizes});
        $('#team-roster-form .table-roster-list').append(item);
        bindRemoveButtonBehavior();
    }

    function refreshUniformSizesInRosterSelect() {
        $('.row-roster-size').each(function(i, item){
            $(item).html('');
            var template = $('#roster-sizes-options').html();
            var cell_content = Mustache.to_html(template, {uniformSizes: ub.uniformSizes});
            $(item).html(cell_content);
        });
    }

    $('.close-share-uniform-design-modal').on('click', function(){
        $('#open-design-modal').modal('show');
        $('#share-design-modal .team-email').val('');
    });

    $('.share-uniform-design-by-email').on('click', function(){
        
        // var data = {
        //     email_list: $('#share-design-modal .team-email').val(),
        //     order_id: $(this).data('order-id'),
        //     sharer_name: ub.user.fullname
        // };

        var _id = $(this).data('order-id');

        var data = {
            emails: $('#share-design-modal .team-email').val(),
            id: _id,
            sharer_name: ub.user.fullname,
            sharer_message: $('#share-design-modal .message').val(),
        }

        var captcha_response = $('#share-design-modal .g-recaptcha-response').val();
        if (captcha_response.length == 0) {
            $.smkAlert({text: 'Please answer the reCAPTCHA verification', type:'warning', permanent: false, time: 5, marginTop: '90px'});
            return false;
        }

        $.ajax({
            //url: ub.config.api_host + '/api/order/share',
            url: ub.config.api_host + '/api/saved_design/sendToEmails/',
            data: JSON.stringify(data),
            type: 'POST',
            dataType: 'json',
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
            success: function(response) {
                $('#share-design-modal').modal('hide');
                // Notification Message
                var messageType = (response.success) ? 'success' : 'warning';
                $.smkAlert({text: response.message, type:messageType, permanent: false, time: 10, marginTop: '90px'});

                // Reload reCAPTCHA
                grecaptcha.reset();
            }
        });
    });

    function bindShareDesigns() {
        $('.share-uniform-design').on('click', function(){
            var order_id = $(this).data('saved-design-id');
            $('#open-design-modal').modal('hide');
            $('#share-design-modal .share-uniform-design-by-email').data('order-id', order_id);
            $('#share-design-modal').modal('show');
        });
    }

    function bindRemoveButtonBehavior() {
        $('.remove-roster-record').on('click', function () {
            $(this).parents('tr').remove();
        });
    }

    $('.save-team-roster').on('click', saveTeamRoster);

    function saveTeamRoster() {
        var roster = [];
        var i = 0;
        $('.table-roster-list tr').each(function (i, row) {
            // 0th element contains the headers
            if (i > 0) {
                var number = $(row).find('td').eq(0).find('input').val();
                var name = $(row).find('td').eq(1).find('input').val();
                var application = $(row).find('td').eq(2).find('select').val();
                var size = $(row).find('td').eq(3).find('select').val();
                if ((number != "") && (name != "")) {
                    roster.push({
                        number: number,
                        name: name,
                        application: application,
                        size: size
                    });
                }
            }
        });

        $('.roster-list').html(''); // Clear current roster list
        $.each(roster, function(i, template_data) {
            var template = $('#roster-list').html();
            var row = Mustache.to_html(template, template_data);
            $('.roster-list').append(row);
        });

        $('#team-roster-modal').modal('hide');

        // Notification Message
        $.smkAlert({text: 'Updated team roster list', type:'info', permanent: false, time: 5, marginTop: '90px'});
    }

    // function getUniformSuggestions(categoryId) {
    //     $.ajax({
    //         url: ub.config.api_host + '/api/materials/suggestions/' + categoryId,
    //         success: function (response) {
    //             if (response.success) {
    //                 $.each(response.materials, function (i, material){
    //                     if (material.id != ub.config.material_id) {
    //                         $('.suggestions').append('<a href="#loadMaterial' + material.id + '"><img src="' + material.thumbnail_path + '"></a>');
    //                     }
    //                 });
    //             }
    //         }
    //     });
    // }
    // getUniformSuggestions(ub.config.category_id);

    // Uniform Sizes - Size Clicked Behavior
    $('.uniform-sizes .uniform-size').on('click', onSizeSelect);

    function onSizeSelect() {
        var isSelected = parseInt($(this).data('is-selected'));
        var size = $(this).data('size');
        // Toggle Size Selection
        if (isSelected) {
            // Turn Size Off
            $(this).removeClass('selected');
            $(this).data('is-selected', 0);
            ub.uniformSizes[size].active = false;
        } else {
            // Turn Size On
            $(this).addClass('selected');
            $(this).data('is-selected', 1);
            ub.uniformSizes[size].active = true;
        }
        refreshUniformSizesInRosterSelect();
    }

    // Initial Roster Item
    createNewRosterRecordForm();

});
