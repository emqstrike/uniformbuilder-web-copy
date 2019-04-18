// UBJS
$(document).ready(function () {
 
    /// NEW RENDERER ///

        /// Initialize Uniform Builder

        window.ub.initialize = function () {
            // ub.utilities.maintenanceMessage();
            ub.errorCodes.prepareShortcuts();

            if (parseInt(ub.render) === 1) { ub.funcs.removePanels(); }

            ub.funcs.beforeLoad();
            ub.config.print_version();

            /// Initialize Assets
            ub.current_material.id = window.ub.config.material_id;
            ub.current_material.code = window.ub.config.code;

            // Hide Main Links on Load
            ub.funcs.hideMainLinks();

            // Set Feature Flags
            ub.config.setFeatureFlags();

            ub.current_material.taggedStyles = window.ub.config.api_host + '/api/tagged_styles/';
            ub.loader(ub.current_material.taggedStyles, 'tagged_styles', ub.callback);

            if (window.ub.config.material_id !== -1) { ub.funcs.loadHomePickers(); }

            if (ub.config.material_id !== -1) {

                ub.funcs.initCanvas();
                ub.startTime();

                // prevent apostrophe problem
                ub.config.sport         = ub.utilities.domParserDecoder(ub.config.sport);
                ub.config.option        = ub.utilities.domParserDecoder(ub.config.option);
                ub.config.blockPattern  = ub.utilities.domParserDecoder(ub.config.blockPattern);

                ubsv.mascotScales.fetchValues();

                ub.current_material.colors_url = ub.config.api_host + '/api/colors/';
                ub.current_material.fonts_url = ub.config.api_host + '/api/fonts/' + ub.config.brand.toLowerCase() + '/';
                ub.current_material.patterns_url = ub.config.api_host + '/api/patterns/';
                ub.current_material.mascots_url = ub.config.api_host + '/api/mascots/';
                ub.current_material.cutlinks_url = ub.config.api_host + '/api/cut_links/';
                ub.current_material.block_patterns_url = ub.config.api_host + '/api/block_patterns/';
                ub.current_material.mascot_categories_url = ub.config.api_host + '/api/mascot_categories';
                ub.current_material.mascot_groups_categories_url = ub.config.api_host + '/api/mascots_groups_categories/';
                ub.current_material.single_view_applications = ub.config.api_host + '/api/v1-0/single_view_applications/';
                ub.current_material.fabrics = ub.config.api_host + '/api/fabrics/';

                ub.loader(ub.current_material.patterns_url, 'patterns', ub.callback);
                ub.loader(ub.current_material.mascots_url, 'mascots', ub.callback);
                ub.loader(ub.current_material.mascot_categories_url, 'mascots_categories', ub.callback);
                ub.loader(ub.current_material.mascot_groups_categories_url, 'mascots_groups_categories', ub.callback);
                ub.loader(ub.current_material.colors_url, 'colors', ub.callback);
                ub.loader(ub.current_material.block_patterns_url, 'block_patterns', ub.callback);
                ub.loader(ub.current_material.cutlinks_url, 'cuts_links', ub.callback);
                ub.loader(ub.current_material.single_view_applications, 'single_view_applications', ub.callback);
                ub.loader(ub.current_material.fabrics, 'fabrics', ub.callback);
                ub.loader(ub.current_material.fonts_url, 'fonts', ub.callback);

                // Get the Color Sets from the backend API
                ub.current_material.colors_sets = ub.config.api_host + '/api/colors_sets/';
                ub.loader(ub.current_material.colors_sets, 'colors_sets', ub.callback);


                // Custom Artwork Request, replace this with a get_by_user_id
                ub.current_material.logo_request_url = window.ub.config.api_host + '/api/v1-0/logo_request/user_id/' + ub.user.id;
                ub.loader(ub.current_material.logo_request_url, 'logo_request', ub.callback);

                // Application Sizes
                ub.current_material.application_sizes_url = window.ub.config.api_host + '/api/application_sizes/' + ub.config.sport + '/' + ub.config.blockPattern + '/' + ub.config.option;
                ub.loader(ub.current_material.application_sizes_url, 'application_size', ub.callback);

                // Hidden Bodies
                ub.current_material.hidden_bodies_url = window.ub.config.api_host + '/api/v1-0/hidden_bodies/' + ub.config.sport + '/' + ub.config.blockPattern + '/' + ub.config.option + '/' + ub.config.type;
                ub.loader(ub.current_material.hidden_bodies_url, 'hidden_bodies', ub.callback);  

                // Disable Tailsweeps for now
                // ub.current_material.tailsweeps_url = window.ub.config.api_host + '/api/tailsweeps/';
                // ub.loader(ub.current_material.tailsweeps_url, 'tailSweeps', ub.callback);

            }

            if (window.ub.config.material_id === -1) {

                ub.pickersStartTime();

                // ub.design_sets_url = window.ub.config.api_host + '/api/design_sets/';
                // ub.loader(ub.design_sets_url, 'design_sets', ub.load_design_sets);

                ub.categories_url = ub.config.api_host + '/api/categories';
                ub.materials_url = ub.config.api_host + '/api/materials/styleSheets';

                ub.displayDoneAt('Loading Categories ...');
                ub.loader(ub.categories_url, 'categories', ub.loadCategories);

                ub.displayDoneAt('Loading Styles ...');
                ub.loader(ub.materials_url, 'materials', ub.load_materials);

                ub.afterLoadScripts();

            }


            if (typeof ub.user.id !== 'undefined' && ub.config.material_id === -1) {

                ub.orders_url = ub.config.api_host + '/api/order/user/' + ub.user.id;
                ub.loader(ub.orders_url, 'orders', ub.load_orders);

            } else {

                $('.open-save-design-modal').hide();

            }

            if (typeof ub.user.id !== 'undefined' && ub.config.material_id !== -1) {

                ub.funcs.updateEmbellishmentList();

            }

            ub.zoom_off();

        };



        ub.funcs.loggedInUsers = function () {

            if (typeof ub.user.id !== "undefined") { 
                ub.funcs.checkDefaultRepID();  
            }

        }

        ub.funcs.initCanvas = function () { $('body').addClass('generic-canvas'); }
        ub.funcs.preprocessGenderTerm = function (gender) { return gender.toTitleCase(); }
        ub.funcs.preprocessSportTerm = function (sport) { return sport.toTitleCase(); }

        ub.funcs.callDirectLinks = function () {

            var _gender = ub.data.urlAlias.getAlias(ub.config.styles.gender);
            var _sport = ub.data.urlAlias.getAlias(ub.config.styles.sport);

            ub.funcs.directLinks(_gender.urlAlias, _sport.urlAlias);

        }

        ub.funcs.loadHomePickers = function () {
            
            $('div.backlink').addClass('back-link-on');

            ub.current_material.material_url         = ub.config.api_host + '/api/material/' + ub.current_material.id;
            ub.current_material.material_options_url = ub.config.api_host + '/api/materials_options/' + ub.current_material.id;

            ub.loader(ub.current_material.material_url, 'material', ub.callback);
            ub.loader(ub.current_material.material_options_url, 'materials_options', ub.callback);

            $('#main_view').parent().fadeIn();
            $('div.header-container').fadeIn(); 
            
            ub.refresh_thumbnails();

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

                    $('a#messages > span.message-badge').hide();
                    $('a#messages > span.message-badge').html(_count);
                    $('a#messages > span.message-badge').fadeIn();

                    _.each(ub.data.messageTypes, ub.funcs.updateMessageBadges);

                }
                
            });

        };

        ub.funcs.isCustomizerAvailable = function () {
            
            var _one = 1;

            if (window.ub.config.toString) { _one = "1"; }
            return ub.current_material.material.customizer_available === _one;
            
        }

        ub.funcs.turnOnOrderButton = function () {
            $('a.footer-buttons[data-view="team-info"]').removeClass('disabled');
        }

        ub.funcs.turnOffOrderButton = function () {
            $('a.footer-buttons[data-view="team-info"]').addClass('disabled');
        }

        ub.funcs.beforeLoad = function () {

            ub.funcs.turnOffOrderButton();

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

            $('div#roster-input').fadeIn();
            $('div#validate-order-form, div#order-form').hide();

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

                    $.smkAlert({text: 'Ability to go back to the customizer is not yet implemented.', type:'warning', time: 3, marginTop: '80px'});

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

            $('a.change-view[data-view="save"]').removeClass('disabled');

            if(ub.funcs.isCurrentSport('Baseball') || ub.funcs.isCurrentSport('Fastpitch')) {
                $('a.change-view[data-view="pipings"]').removeClass('hidden');                                
            } else {
                $('a.change-view[data-view="pipings"]').addClass('hidden');                
            }

            if(ub.funcs.isSocks() && ub.config.blockPattern !== 'Hockey Sock' && !ub.data.randomFeedExemptions.isExempted(ub.config.option)) {                
                $('a.change-view[data-view="randomFeed"]').removeClass('hidden'); 
            } else {
                $('a.change-view[data-view="randomFeed"]').addClass('hidden');             
            }

            $('a.change-view[data-view="team-info"]').removeClass('disabled');

            if (ub.funcs.isCurrentSport("Cinch Sack (Apparel)")) {

                $('a.footer-buttons[data-view="right"], a.footer-buttons[data-view="left"]').addClass('disabled')

            }           

            if (ub.data.hasProcessedArtworks) {
                
                // Hide Save and Order buttons, this will be processed manually
                $('a.footer-buttons[data-view="save"]').addClass('disabled');
                ub.funcs.turnOffOrderButton();
                
            }

            if (!ub.funcs.isCustomizerAvailable()) { ub.funcs.turnOffOrderButton(); }

        }

        ub.funcs.perUniformPriceCustomizerCleanup = function () {

            var _sport = ub.current_material.material.uniform_category;

            if (ub.data.sportsWithHiddenYouthPrices.isHidden(_sport) || ub.current_material.material.neck_option === "Fight Short") {

                $('span.youthPriceCustomizer').hide();
                $('span.youthPriceCustomizerSale').hide();
                $('span.adult-label').html('Price starts from ');
                $('div#uniform-price-youth').hide();

                $('span.adult-str').html('Price Starts ');

                $('div#uniform-price-adult').addClass('single');
                $('div#uniform-price-call-for-team-pricing').addClass('single');

            }

        }

        ub.funcs.afterLogin = function () {

            ub.funcs.updateEmbellishmentList();

        };

        ub.data.afterLoadCalled = 0;
        ub.funcs.afterLoad = function () {

            if (ub.data.afterLoadCalled > 0) {return;}

            ub.sport = ub.current_material.material.uniform_category;
            ub.neckOption = ub.current_material.material.neck_option;
            ub.current_material.settings.hiddenBody = ub.config.hiddenBody;

            ub.funcs.activatePartByIndex(0);

            $('div.left-pane-column-full').fadeIn();
            $('span.fullscreen-btn').fadeIn();

            ub.funcs.afterLoadEmbellishments();

            if (_.contains(ub.fontGuideIDs, window.ub.valid)) {

                $('div.activate_qa_tools').fadeIn();

            }

            var _type = ub.current_material.material.uniform_application_type.replace('_', ' ');
            var _getPrice = ub.funcs.getPriceElements(ub.current_material.material);
            var _adultStr = '<span class="adult-str">Adult &nbsp</span>';

            $('div#uniform_name').html('<span class="type">' + _type + '</span><br />' + ub.current_material.material.name);
            $('div#uniform-price-youth').html("Youth <span class='youthPriceCustomizer " + _getPrice.youth_sale + "'> from $" + _getPrice.youth_min_msrp + "</span> <span class='youthPriceCustomizerSale " + _getPrice.youth_sale + "'>"  +  'now from $' + _getPrice.youth_min_web_price_sale + '<span class="sales-badge">Sale!</span></span><br />');
            $('div#uniform-price-adult').html(_adultStr + "<span class='adultPriceCustomizer " + _getPrice.adult_sale + "'>from $" + _getPrice.adult_min_msrp + "</span> <span class='adultPriceCustomizerSale " + _getPrice.adult_sale + "'>"  +  'now from $' + _getPrice.adult_min_web_price_sale + '<span class="sales-badge">Sale!</span></span><br />');
            // $('div#uniform-price-call-for-team-pricing').addClass(_getPrice.callForPricing);

            if (typeof _getPrice.youth_min_msrp === "undefined") { $('div#uniform-price-youth').addClass('hide'); }
            if (typeof _getPrice.adult_min_msrp == "undefined") { $('div#uniform-price-adult').hide(); }

            $('div.header-container').css('display','none !important');

            ub.funcs.perUniformPriceCustomizerCleanup();
            ub.funcs.restoreTeamColorSelectionsFromInitialUniformColors();

            ub.hideFontGuides();
            ub.data.afterLoadCalled = 1;

            ub.funcs.initToolBars();

            // TEAM STORE TOOLBOX INITIALIZER
            if (TeamStoreToolBox.is_enabled)
            {
                TeamStoreToolBox.init();
                if (window.is_show_teamstore_toolbox) {
                    if (ub.render) {
                        TeamStoreToolBox.hide();
                    } else {
                        TeamStoreToolBox.show();
                    }
                }
            }

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

            // var orig_query_string = location.search;
            // var suffix_query_string = '';
            // if (orig_query_string.indexOf('customize-uniform&')) {
            //     suffix_query_string = orig_query_string.replace('customize-uniform&', '');
            // } else {
            //     suffix_query_string = orig_query_string.replace('customize-uniform', '');
            // }
            // if (orig_query_string.length > 0) {
            //     suffix_query_string = '&' + suffix_query_string.slice(1);
            // }

            // 
            if (ub.config.pageType === "Order") {

                ub.funcs.getCustomArtworRequestStatus(function (status) {

                    ub.config.orderArtworkStatus = status.order.artwork_status;

                    if (ub.config.orderArtworkStatus === "rejected") {

                        // $('a[data-view="team-info"]').find('span').html('Resubmit Order');
                        
                        $('a[data-view="team-info"]').hide();

                        var $resubmitOrderButton = $('span.resubmit-order-btn')
                        $resubmitOrderButton.show();

                        $('div#order-status').html('Artwork Rejected, please upload a new one.');
    
                        $('div#order-status').addClass('rejected');
                        $('div#order-status').show();

                        $('div#order-status').attr('data-intro', 'This order has a rejected custom artwork, please upload a new file and resubmit the order.');
                        $('div#order-status').attr('data-position', 'right');

                        $('a[data-view="layers"]').attr('data-step', '2');
                        $('a[data-view="layers"]').attr('data-position', 'left');
                        $('a[data-view="layers"]').attr('data-intro', 'Please select the application here where you have previously uploaded the custom artwork request to reupload a new image.');

                        $resubmitOrderButton.attr('data-step', '3');
                        $resubmitOrderButton.attr('data-position', 'right');
                        $resubmitOrderButton.attr('data-intro', 'After uploading a new one, please click here to resubmit your order.');

                        // $('a[data-view="layers"]').show();

                        introJs().start();

                        // Initialize Events

                        $resubmitOrderButton.unbind('click');
                        $resubmitOrderButton.on('click', function () {

                            ub.funcs.initOrderProcess();

                        });

                    }

                });

            }

            if (ub.config.pageType === "Saved Design") { ub.funcs.initGuideSavedDesign(); }
            if (ub.config.pageType === "Order") { ub.funcs.initGuideOrder(); }

            if (ub.render !== "1") {

                ub.funcs.pushState({
                    data: 'customize-uniform',
                    title: 'Customize Uniform',
                    url: '?customize-uniform',
                });

            }

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

            ub.funcs.initUniformSizesAndPrices();
            ub.funcs.initMiscUIEvents();

            // ub.displayDoneAt('Awesomness loading completed.');

            ub.afterLoadScripts();
            ub.funcs.afterLoadChecks();

            // Cut PDF when coming from a saved design
            if (typeof ub.current_material.settings.cut_pdf === "undefined") { 
                ub.current_material.settings.cut_pdf = ub.config.cut_pdf;
            }

            if (typeof ub.current_material.settings.styles_pdf === "undefined") {
                ub.current_material.settings.styles_pdf = (ub.current_material.material.styles_pdf !== null) ? ub.current_material.material.styles_pdf : '';
            }

            ub.funcs.updateLabels();

            // Info
            ub.funcs.printUniformInfo(ub.current_material.material, ub.current_material.settings);

            // FG
            if (typeof ub.user.id !== 'undefined') {
                if (ub.user.id === 1979 && ub.config.material_id === 3810) { ub.showFontGuides(); }
            }

            if (ub.branding.useAllColors) { ub.funcs.addAllColorToTeamColors(); }

            if (ub.fabric.fabricSelectionBlocks.isFabricSelectionEnabled().length > 0) { ub.fabric.fabricInitSample(); }

            ub.funcs.changeControls();

            // executeAfterLoadFunctionList()

            ub.funcs.executeAfterLoadFunctionList();
        };

        // afterLoad function container
        ub.funcs.afterLoadFunctionList = [];

        // create desc here
        ub.funcs.executeAfterLoadFunctionList = function () {
  
             _.each(ub.funcs.afterLoadFunctionList, function (func){
                 func();
            });

        };

        ub.funcs.updateLabels = function () {

            if (ub.funcs.isSocks()) {
                $('a.change-view[data-view="left"]').html('I<br><span>Inside View</span>');
                $('a.change-view[data-view="right"]').html('O<br><span>Outside View</span>');

                // on Free Form Modal (add application) change `Left` label to Inside and `Right` label to Outside
                $('span.perspective[data-id="left"]').text('Inside');
                $('span.perspective[data-id="right"]').text('Outside');

                // Exception: on Hockey Sock block pattern, set Left to Outside View and Right to Inside View
                if ( _.isEqual(ub.config.blockPattern,  'Hockey Sock') ) {
                    $('a.change-view[data-view="left"]').html('O<br><span>Outside View</span>');
                    $('a.change-view[data-view="right"]').html('I<br><span>Inside View</span>');

                    $('span.perspective[data-id="left"]').text('Outside');
                    $('span.perspective[data-id="right"]').text('Inside');
                }
            }

        }

        ub.funcs.isAFavoriteItem = function (uniformID) {

            var _result = _.find(ub.data.tagged_styles, {uniform_id: uniformID.toString()});

            if (typeof _result !== "undefined") { ub.config.favoriteID = _result.id; }

            return typeof  _result !== "undefined";

        }

        ub.funcs.initFavorite = function () {

            var $favoriteBtn = $('span.favorite-btn');

            $favoriteBtn.fadeIn();
            $('hr.left-side-divider').fadeIn();

            if (ub.funcs.isAFavoriteItem(ub.current_material.material.id)) {

                ub.utilities.info('This is a favorite item! [' + ub.config.favoriteID + ']');
                ub.funcs.setFavoriteStatusOn();

            }

            $favoriteBtn.unbind('click');
            $favoriteBtn.on('click', function (e) {

                if ($favoriteBtn.hasClass('added')) {

                    ub.funcs.removeFromFavorites();    

                } else {
                
                    ub.funcs.addToFavorites();    
                
                }
                
            });

        }

        ub.funcs.ok = function (postLoad) {

            if (typeof postLoad !== "undefined") {

                ub.current_material.taggedStyles = window.ub.config.api_host + '/api/tagged_styles/';
                ub.loader(ub.current_material.taggedStyles, 'tagged_styles', ub.callBackPostLoad);

            } else {

                ub.funcs.initFavorite();

            }

        }

        ub.funcs.notOk = function () {

            $('span.favorite-btn').hide();
            $('hr.left-side-divider.bottom').fadeIn();
            $('hr.left-side-divider.middle').fadeIn();
            $('hr.left-side-divider.fav-top').hide();

        }

        ub.funcs.initMiscUIEvents = function () {

            $('span.undo-btn').fadeIn();

            if (typeof ub.user.id !== 'undefined') {

                ub.funcs.ok();

            } else {

                ub.funcs.notOk();

            }

        }

        ub.funcs.addToFavorites = function () {

             var $favoriteBtn = $('span.favorite-btn');
             $favoriteBtn.fadeOut();

             var _postData = {

                "uniform_id": ub.config.material_id.toString(),
                "type": 'stock',
                "tags": 'favorites',

            }

            var _url = ub.config.api_host + '/api/tagged_style';

            $.ajax({
                        
                url: _url,
                type: "POST", 
                data: JSON.stringify(_postData),
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
                success: function (response) {

                    ub.config.favoriteID = response.id;

                    $.smkAlert({text: 'Added [' + ub.config.uniform_name + '] To Favorites!', type:'warning', time: 3, marginTop: '80px'});
                   
                    ub.funcs.setFavoriteStatusOn();

                    $favoriteBtn.fadeIn();

                }
                        
            });

        }

        ub.funcs.setFavoriteStatusOn = function () {

            var $favoriteBtn = $('span.favorite-btn');
            var _favString = ' <i class="fa fa-star" aria-hidden="true"></i><span class="toolbar-item-label">FAVORITE!</span>';

            $favoriteBtn.html(_favString);
            $favoriteBtn.addClass('added');

        }

        ub.funcs.setFavoriteStatusOff = function () {

            var $favoriteBtn = $('span.favorite-btn');
            var _favString = ' <i class="fa fa-star-o" aria-hidden="true"></i><span class="toolbar-item-label">ADD TO<br />FAVORITES!</span>';

            $favoriteBtn.html(_favString);
            $favoriteBtn.removeClass('added');

        }

        ub.funcs.removeFromFavorites = function () {

            var $favoriteBtn = $('span.favorite-btn');
            $favoriteBtn.fadeOut();

            var _postData = { "id": ub.config.favoriteID, }

            var _url = ub.config.api_host + '/api/tagged_style/delete';

            $.ajax({
                        
                url: _url,
                type: "POST", 
                data: JSON.stringify(_postData),
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
                success: function (response) {

                    $.smkAlert({text: 'Removed [' + ub.config.uniform_name + '] from Favorites!', type:'warning', time: 3, marginTop: '80px'});
                   
                    ub.funcs.setFavoriteStatusOff();

                    $favoriteBtn.fadeIn();

                }
                        
            });

        }

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

        /// Load Assets 

        ub.callback_update = function (obj, object_name) {

            ub.data[object_name] = obj;

            if (object_name === 'fonts') {

                ub.data.fonts = _.filter(ub.data.fonts, {active: "1"});
                ub.data.fonts = _.sortBy(ub.data.fonts, "name");

            }

        }

        // Fix for returned ints, ub expects string
        ub.convertToString = function (obj) {

            var _toConverList = ['id', 'active', 'debug_mode', 'sublimation_only', 'is_blank']; 

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

        ub.funcs.optimize = function () {

            var _items = ub.data.placeHolderOverrides;

            ub.pha = _.find(ub.pha, {name: ub.current_material.material.block_pattern});

            if (typeof ub.pha !== "undefined") {
                _items = JSON.parse(ub.pha.placeholder_overrides);
                ub.data.placeHolderOverrides.items = _items;
            }
            
        };

        ub.callBackPostLoad = function (obj, object_name) {

            var _alias = ub.data.loadingOptionsAlias.getAlias(object_name);

            ub.displayDoneAt(_alias + ' loaded.');
            ub.convertToString(obj);

            if (object_name === 'tagged_styles') {

                ub.data.tagged_styles = _.filter(ub.data.tagged_styles, {user_id: ub.user.id.toString()});
                ub.funcs.initFavorite();

            }

        }

        ub.funcs.updateTagStyleCount = function () {
            $('span.slink > span.count').html(_.size(ub.data.tagged_styles));
        };
 
        ub.callback = function (obj, object_name) {

            var _alias = ub.data.loadingOptionsAlias.getAlias(object_name);

            ub.displayDoneAt(_alias + ' loaded.');
            ub.convertToString(obj);

            var _createObjectList = [
                'colors',
                'patterns',
                'fonts',
                'mascots',
                'mascots_categories',
                'tagged_styles',
                'mascots_groups_categories',
                'cuts_links',
                // 'tailsweeps',
                'logo_request',
                'application_size',
                'single_view_applications',
                'colors_sets',
                'hidden_bodies'
                ];

            if (_.contains(_createObjectList, object_name)) {

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

            if (object_name === 'block_patterns') {

                var _items = _.filter(obj, function (block_pattern) {

                    return  (block_pattern.placeholder_overrides !== null && block_pattern.placeholder_overrides !== "");

                });

                ub.pha = _items;

            }

            // TODO: Refactor all types like this where processing goes inside a function, so it can used in other pages e.g. like processLogoRequests
            if (object_name === "application_size") {  ub.funcs.setupApplicationSizes(obj); }
            if (object_name === 'fonts') { ub.funcs.processFonts(); }
            if (object_name === 'logo_request') { ub.funcs.processLogoRequests(); }
            if (object_name === 'patterns') { ub.funcs.transformPatterns(obj); }
            if (object_name === 'mascots') { ub.funcs.transformMascots(); }
            if (object_name === 'colors') { ub.funcs.prepareColors(); }
            if (object_name === 'single_view_applications') { ub.funcs.processSingleViewApplications(); }

            if (object_name === 'colors_sets') { 
                
                var isThreadColor = true;

                // get Thread Colors from the backend API
                if (isThreadColor) ub.funcs.getThreadColors();

            }

            if (object_name === 'hidden_bodies') { ub.funcs.setupHiddenBody(obj); }

            if (object_name === 'cuts_links') {

                ub.current_material.settings.cut_pdf = "";
                ub.current_material.settings.cuts_links = undefined;
                ub.current_material.settings.cuts_links = _.find(obj, {sport_name: ub.config.sport, block_pattern: ub.config.blockPattern, neck_option: ub.config.option});

                if (typeof ub.current_material.settings.cuts_links !== "undefined") {
                    ub.current_material.settings.cut_pdf = ub.current_material.settings.cuts_links.cuts_pdf; 
                    ub.config.cut_pdf = ub.current_material.settings.cuts_links.cuts_pdf;
                }

            }

            if (typeof ub.user.id !== "undefined") {

                if (object_name === 'tagged_styles') {

                    ub.data.tagged_styles = _.filter(ub.data.tagged_styles, {user_id: ub.user.id.toString()});

                    ub.funcs.updateTagStyleCount();

                } 
                
            }

            var ok = typeof(ub.current_material.material) !== 'undefined' &&
                    typeof(ub.current_material.materials_options) !== 'undefined' &&
                    typeof(ub.current_material.fabrics) !== 'undefined' &&
                    typeof(ub.data.colors) !== 'undefined' &&
                    typeof(ub.data.patterns) !== 'undefined' && _.size(ub.data.patterns) !== 0 &&
                    typeof(ub.data.fonts) !== 'undefined' && 
                    typeof(ub.data.mascots) !== 'undefined' && _.size(ub.data.mascots) !== 0 && 
                    typeof(ub.data.mascots_categories) !== 'undefined' &&
                    typeof(ub.data.tagged_styles) !== 'undefined' &&
                    typeof(ub.data.mascots_groups_categories) !== 'undefined';
            if (ok) {
                ub.displayDoneAt('Loading assets completed');
                ub.load_assets();
                ub.displayDoneAt('Configuration of style - ' + ub.config.uniform_name + ' started');
                ub.utilities.info(' ');
                ub.funcs.transformedApplications();
                ub.funcs.transformedBoundaries();
                ub.funcs.get_modifier_labels();
                ub.init_settings_object();
                ub.init_style();
                ub.funcs.optimize();
                ub.funcs.setupRetain();
                ub.displayDoneAt('Configuration of style done.');
                ub.displayDoneAt('Rendering awesomeness ...');
            }
        };

        ub.loader = function (url, object_name, cb) {

            if (window.Worker) {
                data = {
                    url: url
                }
                var worker = new Worker('/workers/json-loader-worker.js');

                worker.onmessage = function(e) {
                    if (e.data.response) {
                        key = object_name;
                        if (object_name === "tailSweeps") {
                            key = 'tailsweeps';
                        }
                        cb(e.data.response[key], object_name);
                    }
                }
                worker.postMessage(JSON.parse(JSON.stringify(data)));
            } else {
                $.ajax({
                    url: url,
                    type: "GET", 
                    dataType: "json",
                    crossDomain: true,
                    contentType: 'application/json',
                    headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

                    success: function (response) {
                        if (object_name === "tailSweeps") {
                            cb(response['tailsweeps'], object_name);
                        } else {
                            cb(response[object_name], object_name);
                        }
                    }
                });
            }

        };

        ub.loaderWOToken = function (url, object_name, cb) {

            //delete $.ajaxSettings.headers["X-CSRF-TOKEN"];

            $.ajax({
            
                url: url,
                type: "GET", 
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

                success: function (response){

                    if (object_name === "tailSweeps") {
                        cb(response['tailsweeps'], object_name);
                    } else {
                        cb(response[object_name], object_name);
                    }

                }
            
            });

        };

        // For transaction pages
        ub.callbackSimple = function (obj, object_name) {

            var _alias = ub.data.loadingOptionsAlias.getAlias(object_name);

            ub.displayDoneAt(_alias + ' loaded.');
            ub.convertToString(obj);

            var _createObjectList = [
                'mascots',
                'mascots_categories',
                'mascots_groups_categories',
            ];

            if (_.contains(_createObjectList, object_name)) {

                ub.data[object_name] = obj;

            } else {

                ub.current_material[object_name] = obj;

            }
            
            if (object_name === 'mascots') { ub.funcs.transformMascots(); }

            var ok = typeof(ub.data.mascots) !== 'undefined' && 
                     typeof(ub.data.mascots_categories) !== 'undefined' &&
                     typeof(ub.data.mascots_groups_categories) !== 'undefined';

            if (ok) {

                ub.displayDoneAt('Loading mascots completed');

            }
            
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
            
            var matches = [];

            // Use a simplier matcher
            $.each(strs, function(i, str) {
              if (str.toLowerCase().indexOf(q.toLowerCase()) !== -1) { matches.push(str); }
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

                _object = _.find(ub.materials, {searchName: name});
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

            var _key = $('input#search_field').val();
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
                uniform_application_type: _object.object.uniform_application_type,
                id: _object.id,
            });

            $('.picker-header').html('Search Results: ' + $('input#search_field').val()); // Term is passed on gender, refactor this

            ub.funcs.initSearchPicker(_key, _searchResultsObject[_key]);

        };

        ub.funcs.hideMainLinks = function () {

            $('span.slink').hide();
            $('span.slink[data-item="Loading"]').fadeIn();

        }        

        ub.funcs.showMainLinks = function () {

            $('span.slink').fadeIn();
            $('span.slink[data-item="Loading"]').hide();

        }

        ub.prepareTypeAhead = function () {

            if (typeof ub.user.id !== 'undefined') { // Logged In

                if (typeof ub.data.searchSource['materials'] === 'object' && typeof ub.data.searchSource['orders'] === 'object') {

                    $('.typeahead').typeahead({
                        minLength: 3,
                        highlight: true,
                        limit: 30,
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

                    $('#search_field').attr("placeholder","Search: Style");
                    ub.funcs.showMainLinks();

                    ub.funcs.closePickersDialog();

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
                    ub.funcs.showMainLinks();

                    ub.funcs.closePickersDialog();
                    
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

                    callForPricing: 'callForPricingOn';

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

        ub.funcs.getSearchName = function (material) {
            return material.name.trim() + ' (' + material.gender + ')';
        }



        ub.load_materials = function (obj, object_name) {

            ub.displayDoneAt('Styles loaded.');
            ub.materials = {};
            ub.convertToString(obj);

            ub.materials = _.filter(obj, {debug_mode: '0'});
            ub.materials = _.filter(ub.materials, {asset_target: 'web'});

            _.each (ub.materials, function (material) {

                material.searchName = ub.funcs.getSearchName(material);
                material.calculatedPrice = ub.funcs.getPrice(material);
                ub.funcs.processMaterialPrice(material);

                _result = _.find(ub.data.tagged_styles, {uniform_id: material.id});
                        
                material.is_favorite = (typeof _result !== "undefined"); // Mark Favorite items

                if (material.thumbnail_path_left === "") {
                    material.thumbnail_path_left = material.thumbnail_path;
                }

                if ((material.uniform_category === "Baseball" && material.type === "lower") || 
                    (material.uniform_category === "Fastpitch" && material.type === "lower") || 
                    (material.uniform_category === "Basketball" && material.type === "lower") || 
                    (material.uniform_category === "Lacrosse" && material.type === "lower") || 
                    (material.uniform_category === "Football" && material.type === "lower") ||
                    (material.uniform_category === "Football 2017" && material.type === "lower") ||
                    (material.uniform_category === "Compression Pant (Apparel)" && material.type === "lower") ||
                    (material.uniform_category === "Crew Socks (Apparel)") || (material.uniform_category === "Socks (Apparel)") ||
                    (material.uniform_category === "SFN Jogger (Apparel)") ||
                    (material.uniform_category === "Yoga Pant (Apparel)")) {

                    var tempLeftThumbnail = material.thumbnail_path_left;
                
                    material.thumbnail_path_left = material.thumbnail_path_front;

                    if (material.block_pattern === "Hockey Sock") {
                        material.thumbnail_path_left = tempLeftThumbnail;
                    }

                }

                if (material.uniform_category === "Cinch Sack (Apparel)") {
                    material.thumbnail_path_left = material.thumbnail_path_back;
                }

                if (material.uniform_category === "Tech Tee (eSports)") {
                    material.thumbnail_path_left = material.thumbnail_path_back;
                }
                
            });

            var _searchSource = _.map(ub.materials, function (material) {
                return ub.funcs.getSearchName(material);
            });

            // ub.data.searchSource['materials'] = _.pluck(ub.materials, 'name');
            ub.data.searchSource['materials'] = _searchSource;
            ub.displayDoneAt('Price Preparation Complete.');
            ub.displayDoneAt('Preparing Search...');

            if (ub.page === "builder") { ub.prepareTypeAhead(); }
            if (ub.config.styles) { ub.funcs.callDirectLinks(); }

            var _mapped = _.map(ub.data.tagged_styles, function (tagStyle) { return _.find(ub.materials, {id: tagStyle.uniform_id}); });

            // Remove inactive styles that were tagged
            ub.data.tagged_styles = _.filter(ub.data.tagged_styles, function (tagStyle) { return typeof _.find(_mapped, {id: tagStyle.uniform_id}) !== "undefined"; });
            ub.funcs.updateTagStyleCount();

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

            ub.funcs.load_fonts();
            ub.setup_views();
            ub.setup_material_options(); 
            ub.pass = 0;

            requestAnimationFrame(ub.render_frames);

            var material_name = ub.current_material.material.name
            $('span#design_name_input').text(material_name);
            $('input[name="design_name"]').val(material_name);

            ub.funcs.showViewports();

            $('#main-row').fadeIn();
            $('div#design_name_container').fadeIn();

            var _hold = 500;

            if (ub.render !== "1" && ub.status.fullView.getStatus()) {
                ub.funcs.setVisibleView('front');    
            } else {
                _hold = 3000;
            }
            
            setTimeout(function () {
                ub.funcs.afterLoad(); 
            }, _hold);

        }

        ub.funcs.setVisibleView = function (viewStr) {

            if (ub.render) { return; }

            _.each(ub.views, function (view) {

                if (view === viewStr) { 

                    ub[view + '_view'].visible = true;
                    return;

                }

                if (!ub.render) {
                    ub[view + '_view'].visible = false;    
                }

            });

        }

        /// Main Render Loop

        // var frames_to_refresh = 1 * 10; // 60 frames in one sec, average


        window.ub.render_frames = function () {

            if (ub.data.rosterInitialized) { return }
            if (!ub.status.render.getRenderStatus()) { return; }

            ub.renderer.render(ub.stage);
            requestAnimationFrame(ub.render_frames);

            /// Refresh Thumbnail Initially only on (-10) frames after 3 seconds (3 * 60)

            // if (ub.pass > (frames_to_refresh - 10) && (ub.pass < frames_to_refresh)) {
            //     // ub.refresh_thumbnails();
            // }   
            

            // if (ub.pass < frames_to_refresh) {

            //     if (ub.pass > (frames_to_refresh - 2)) {
            
            //         ub.funcs.afterLoad(); 
            //         console.log('Calling Afterload....')

            //     }
            
            //     ub.pass += 1; 

            // }

        }

        /// Render Different Views ///

            window.ub.setup_views = function () {

                _.each(ub.views, function (view) {

                    var view_name = view + '_view';
                    // var shape = ub.pixi.new_sprite(ub.assets[view_name].shape);
                    // var shape_mask = ub.pixi.new_sprite(ub.assets[view_name].shape);

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

        if (_app.hasLogo === 1 || ub.funcs.isSublimated()) { _set.push ('logo'); }
        if (_app.hasNumber === 1 || ub.funcs.isSublimated()) { _set.push ('number'); }
        if (_app.hasPlayerName === 1 || ub.funcs.isSublimated()) { _set.push ('player_name'); }
        if (_app.hasTeamName === 1 || ub.funcs.isSublimated()) { _set.push ('team_name'); }
        if (_app.hasEmbellishment === 1 || ub.funcs.isSublimated()) { _set.push ('embellishments'); }

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

                var isflip              = 0;

                if (_application.name === "Mascot") {

                    if (view.application.isFlipped === 1) { view.application.flip = 1; }

                }

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

                    if (typeof _fontObj === "undefined") { ub.utilities.warn('Invalid Font ID detected for #' + _application.id + ' (font ID: ' + view.application.defaultFont + ')'); }

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

                    var _mascotID = view.application.defaultMascot;
                    var _mascotObj  = _.find(ub.data.mascots, {id: _mascotID});
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

    ub.funcs.applicationObjHasCustomArtwork = function (code) {

        var _applicationObj = ub.funcs.getApplicationSettings(code)

        return (typeof _applicationObj.customFilename !== "undefined" && _applicationObj.customFilename !== "" &  _applicationObj.customFilename.length > 0);

    };
    
    ub.funcs.updateArtworkRequest = function (data, cb) {

        delete $.ajaxSettings.headers["X-CSRF-TOKEN"];

         $.ajax({
            
            url: ub.endpoints.getFullUrlString('updateArtworkRequest'),
            type: "POST", 
            dataType: "json",
            data: JSON.stringify(data),
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

            success: function (response) {
                
                cb(response);

            }
            
        });

    }

    ub.funcs.approveRejectArtwork = function (artworks, parsedArtworks) {

        var _data = { 
            artworks: parsedArtworks,
            note: "Click the approve or reject button for the custom artwork request so that we can adjust the mascot if it was rejected or proceed to the order processing if everthing is ok. You can use the notes field to enter your comment to give the reason why you rejected the processed mascot."
        };

        var _markup = ub.utilities.buildTemplateString('#m-car-approve-dialog', _data);

        var dialog = bootbox.dialog({
            title: 'Approve / Reject Artwork',
            message: _markup,
            size: 'large',
        });

        dialog.init(function() {

            $('span.approve').unbind('click');
            $('span.approve').on('click', function () {

                var _code = $(this).data('code');

                $('span.btn[data-code="' + _code +'"]').removeClass('active');
                $(this).addClass('active');

            });

            $('span.reject').unbind('click');
            $('span.reject').on('click', function () {

                var _code = $(this).data('code');

                $('span.btn[data-code="' + _code +'"]').removeClass('active');
                $(this).addClass('active');

            });

            $('span.btn.cancel').unbind('click');
            $('span.btn.cancel').on('click', function () {
                
                dialog.modal('hide')

            });

            $('span.btn.submit').unbind('click');
            $('span.btn.submit').on('click', function () {

                dialog.modal('hide');

                _artworksField = JSON.parse(artworks.artworks);
                artworks.item = 'test';
                artworks.user_id = ub.user.id;

                var _artWorksTemp = [];

                
                $('td.approve-reject').find('span.btn.active').each(function (index) {

                    var _code = $(this).data('code');
                    var _state = $(this).data('state'); 
                    var _item = _.find(_artworksField, {code: _code.toString()});

                    if (typeof _item !== "undefined") {

                        _item.approved = _state === "approve" ? '1': '0';

                        if (_state === "reject") {
                            _item.user_rejected = '1';
                        }

                        _item.user_notes = $('textarea[data-code="' + _code + '"]').val();
                        _artWorksTemp.push(_item);
                        
                    }

                });

                artworks.artworks =  JSON.stringify(_artWorksTemp);
                ub.data.artworks = artworks;
                $('span.approve-reject-artwork-btn').hide();

                ub.funcs.initOrderProcess()

            });

        });

    };

    ub.funcs.initGuide = function () {

        // If the artwork has been processed already 

        if (ub.data.hasProcessedArtworks) {
            
            $('span.approve-reject-artwork-btn').show();
            $('div#order-status').html('Artwork Processed, please review and approve or reject.');
            $('div#order-status').show();

            $('div#order-status').attr('data-intro', 'This order has its artwork ready for your review.');
            $('div#order-status').attr('data-position', 'right');

            $('span.approve-reject-artwork-btn').attr('data-step', '2');
            $('span.approve-reject-artwork-btn').attr('data-position', 'right');
            $('span.approve-reject-artwork-btn').attr('data-intro', 'After reviewing the mascots, please click here to approve or reject, so we can make the necessary changes or if you approve we can submit this order for processing.');

            introJs().start();

        } else {

            console.log('No Processed Artworks...');

        }

    }

    ub.funcs.customArtworkRequestCheck = function (applicationObj) {

        ub.funcs.getOrdersWItems(function (response) {

            var _hasProcessedArtworks = false;

            if (typeof response.order_info.artworks[0] !== "undefined") {

                var _artWorks = response.order_info.artworks[0];
                var _parsedArtworks = JSON.parse(_artWorks.artworks);

                _hasProcessedArtworks = true;

                if (ub.funcs.applicationObjHasCustomArtwork(applicationObj.code)) {

                    var _artworkEntry = _.find(_parsedArtworks, {code: applicationObj.code});

                    if (typeof _artworkEntry !== "undefined") {

                        if (typeof parseInt(_artworkEntry.mascot_id) === "number") {

                            var _mascot = ub.funcs.getMascotByID(_artworkEntry.mascot_id);
                            ub.data.hasProcessedArtworks = _hasProcessedArtworks;

                            ub.config.orderArtworkStatus = 'artwork processed';

                            applicationObj.mascotOld = applicationObj.mascot;
                            applicationObj.mascot = _mascot;
                            applicationObj.preview = true;

                            ub.funcs.update_application_mascot(applicationObj.application, _mascot);

                            $('span.approve-reject-artwork-btn').fadeIn();

                            // Approve Artwork
                            $('span.approve-reject-artwork-btn').unbind('click');
                            $('span.approve-reject-artwork-btn').on('click', function () {
                                ub.funcs.approveRejectArtwork(_artWorks, _parsedArtworks);
                            });

                            ub.funcs.initGuide();

                        }

                    }

                }

            }

        });

    }

    ub.loadSettings = function (settings) {

        ub.current_material.settings            = settings;
        var uniform_type                        = ub.current_material.material.type;
        var _hasFrontBody                       = false;
        var _hasBody                            = false;

        // Init Richardson Palette
        ColorPalette.funcs.prepareRichardsonPalette();

        ub.current_material.settings.styles_pdf = (ub.current_material.material.styles_pdf !== null) ? ub.current_material.material.styles_pdf : '';
        
        if (typeof ub.config.savedDesignInfo !== "undefined" && ub.config.savedDesignInfo.frontBodyOverride && ub.current_material.material.type === "upper") {

            _hasFrontBody = typeof ub.current_material.settings[uniform_type]['Front Body'] === "object";
            _hasBody = typeof ub.current_material.settings[uniform_type]['Body'] === "object";

            if (ub.config.hiddenBody && (_hasBody && !_hasFrontBody)) {

                ub.current_material.settings[uniform_type]['Front Body'] = JSON.parse(JSON.stringify(ub.current_material.settings[uniform_type]['Body']));
                ub.current_material.settings[uniform_type]['Front Body'].code = 'front_body';

            }

            delete ub.current_material.settings[uniform_type]['Body'];

        }
        
        // For Team Stores

        if (typeof ub.team_colors !== "undefined" && ub.team_colors.length > 0) { ub.current_material.settings = ub.prepareForTeamStoresMaterialOptions(ub.current_material.settings) }

        var _patternLog = "";

        _.each(ub.current_material.settings[uniform_type], function (e) {

            if (e.setting_type === 'highlights' || 
                e.setting_type === 'shadows' || 
                e.setting_type === 'mesh_highlights' || 
                e.setting_type === 'mesh_shadows' || 
                e.setting_type === 'static_layer') { return; }

            if (typeof e.code === "undefined") { return; }

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
                e.has_pattern       = _allowPattern;

                if (e.has_pattern === 1) {
                 
                    if (_materialOption.pattern_properties !== null && _materialOption.pattern_properties !== "") {

                        if (typeof e.pattern === "undefined" || e.pattern.pattern_id === "") {

                            if (typeof _materialOption.pattern_properties !== 'undefined' && _materialOption.pattern_properties.length !== 0 ) { 
                                
                                e.pattern = ub.funcs.getPatternObjectFromMaterialOption(_materialOption);

                                if (typeof ub.team_colors !== "undefined" && ub.team_colors.length > 0) { e.pattern = ub.prepareForTeamStoresPatterns(e.pattern); }

                            }    

                        }

                        // For unprocessed pattern

                        if (typeof e.pattern === "undefined") { e.pattern = ub.funcs.getPatternObjectFromMaterialOptionBlank(_materialOption); }

                        _patternLog += e.pattern.pattern_id + ' set for ' + _materialOption.name + '\n';
                        
                    } else {

                        if (typeof e.pattern === "undefined") {
                            _patternLog += 'No Default Pattern is set for ' + _materialOption.name + ' using Blank.\n';
                            e.pattern = ub.funcs.getPatternObjectFromMaterialOptionBlank(_materialOption);
                        }   
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

                   if (_paddedHex === "000000") { ub.utilities.errorWithCode(ub.errorCode.namesDontMatch, e.code); }

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
    
        ub.utilities.info('');
        ub.utilities.info('----- Patterns -----');
        ub.utilities.info(_patternLog);
        ub.utilities.info('--------------------');

        /// Transform Applications

        if (typeof ub.temp === "undefined") {

            ub.data.convertDefaultApplications();

        }

        /// Apply Data Patches 

        ub.dataPatches.run();

        /// End Apply Data Patches 

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

        // For Team Stores
        // 
        if (typeof ub.team_colors !== "undefined" && ub.team_colors.length > 0) { ub.current_material.settings.applications = ub.prepareForTeamStoresApplications(ub.current_material.settings.applications); }

        _.each(ub.current_material.settings.applications, function (application_obj) {

            if (typeof ub.config.savedDesignInfo !== "undefined" && ub.config.savedDesignInfo.frontBodyOverride && ub.current_material.material.type === "upper") {

                if (ub.config.hiddenBody && (_hasBody && !_hasFrontBody)) {

                    if (application_obj.application.layer === "Body") {

                        application_obj.application.layer = "Front Body";

                    }

                }

            }

            if (typeof application_obj.patternID === "undefined") {
                application_obj = ub.funcs.prepBackendPatternSettings(application_obj);
                if (application_obj.withPattern && application_obj.patternID !== null) { ub.funcs.changePatternFromBackend(application_obj, application_obj.patternID, application_obj.patternConfigFromBackend); }
            }
            // Application Pattern
    
            // Application Opacity
            application_obj = ub.funcs.prepareBackendOpacitySettings(application_obj);
            if (application_obj.withOpacity) { ub.funcs.changeMascotOpacityFromBackend(application_obj, application_obj.opacityConfig); }

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
                            
                            if (application_obj.status === "off") {
                                ub.utilities.info('Disabled application detected: #' + application_obj.code);
                                ub.funcs.toggleApplication(application_obj.code, "off"); 
                            }
                            
                        },

                    });

                }

            }

            if (application_obj.type === "embellishments") {

                ub.funcs.update_application_embellishments(application_obj.application, application_obj.embellishment);

                if (ub.page === "order") { ub.funcs.customArtworkRequestCheck(application_obj); }

            }

            if (application_obj.type === "mascot") {

                var _primaryView = ub.funcs.getPrimaryViewObject(application_obj.application);
                var _inksoftID = _primaryView.application.inksoftDesignID;

                if (typeof _primaryView !== "undefined") {

                    if (typeof _inksoftID !== "undefined") {

                        if (_inksoftID.length > 0) { 

                            window.is.isMessage(_inksoftID, application_obj.code, true);
                            
                        } else {

                            ub.funcs.processMascots(application_obj);
                        
                        }

                    } else {

                        ub.funcs.processMascots(application_obj);
                        
                    }

                } 
                
                // if (ub.page === "saved-design" || ub.page === "order") { ub.funcs.customArtworkRequestCheckSavedDesign(application_obj); }

            }

            if (application_obj.type === "logo") {

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
                    
                    // ub.funcs.afterLoadFunctionList.push(logoObj.processColors); 

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

        // Process Prolook Logo Here
        LogoPanel.init();

        // Process Gradient
        GradientPanel.init();

        if (ub.funcs.isSocks() && ub.config.blockPattern !== 'Hockey Sock') {

            // Activate Left View on all Socks (Apparel) except on 'Hockey Sock' block pattern
            ub.funcs.activateLeftView();

        }

        // use all color if config value is set

    };

    ub.funcs.processMascots = function (application_obj) {

        ub.funcs.update_application_mascot(application_obj.application, application_obj.mascot);

        // if (ub.page === "order") { ub.funcs.customArtworkRequestCheck(application_obj); }
        if (ub.page === "order") { ub.funcs.customArtworkRequestCheckOrders(application_obj); }
        if (ub.page === "saved-design") { ub.funcs.customArtworkRequestCheckSavedDesign(application_obj); }

    }

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

        ub.fabric.fabricCollections = [];

        ub.current_material.options_distinct_names = {};

        ub.maxLayers = 0;

        ub.utilities.info(' ');
        
        _.each(ub.views, function (view) {

            var material_options = _.where(ub.current_material.material.options, {perspective: view});
            var current_view_objects = ub.objects[view + '_view']; 
            var _layerCount = 0;

            _.each(material_options, function (obj, index) {

                _layerCount +=1;

                var name = obj.name.toCodeCase();

                var _sprite = ub.pixi.new_sprite(obj.material_option_path);

                current_view_objects[name] = _sprite;
                var current_object = current_view_objects[name];

                current_object.name = name;

                if (name === "highlights" || name === "shadows") {
                    var fabric_type;

                    switch(true) {
                        case "highlights" == name:
                        case "shadows" == name:
                            fabric_type = "base";
                            break;

                        case name.includes("Insert"):
                            fabric_type = "insert";
                            break;
                    }

                    ub.fabric.fabricCollections.push({
                        code: name,
                        name: name + '_' + obj.layer_level,
                        id: obj.layer_level,
                        perspective: obj.perspective,
                        obj: _sprite,
                        type: fabric_type
                    });
                }
                
                // Multiplied to negative one because
                // UpdateLayers order puts the least zIndex on the topmost position

                current_object.spriteID = name + '_' + obj.layer_level;
                current_object.zIndex = (obj.layer_level * ub.zIndexMultiplier) * (-1); 
                current_object.originalZIndex = (obj.layer_level * 2) * (-1);
                
                // So these static layers will be above the random feed layers in 

                if (ub.funcs.isSocks()) {

                    if (name === "back_tab")  {
                        current_object.zIndex = ub.data.backTabLayer;
                        current_object.originalZIndex = ub.data.backTabLayer;
                    }

                    if (name === "prolook")  {
                        current_object.zIndex = ub.data.prolookLayer;
                        current_object.originalZIndex = ub.data.prolookLayer;
                    }

                }

                if (obj.setting_type === "mesh_highlights") {
                   current_object.blendMode = PIXI.BLEND_MODES.SCREEN;
                } else if (obj.setting_type === "mesh_shadows") {
                   current_object.blendMode = PIXI.BLEND_MODES.MULTIPLY;
                }
                
                if (obj.setting_type === 'highlights') {

                    current_object.blendMode = PIXI.BLEND_MODES.SCREEN;
                    current_object.layerID = obj.layer_level;

                } else if (obj.setting_type === 'shadows') {

                    current_object.layerID = obj.layer_level;
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

                    if (ub.data.excludedColors.isExcluded(ub.config.sport, ub.config.uniform_application_type, default_color)) {
                        ub.utilities.error(default_color + ' is turned off for football / tackle twill uniforms');
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

        ub.utilities.info(' ');   

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

                            console.log('response (from Get Customizations) ---- ');
                            console.log(response);

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

                var texture = new PIXI.RenderTexture(ub.renderer, 1000, 1100);
                texture.render(ub[view]);
                
                return texture.getImage().src;

            }

            ub.getThumbnailImage2 = function (view, rotate) {

                var texture = new PIXI.RenderTexture(ub.renderer, 1000, 1100);
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
                var _str = "<img src ='" + img + "' />" ;

                ub.showModalTool(_str);

            }

            ub.showThumbnail3 = function () {

                var img = ub.getThumbnailImage2(ub.active_view + '_view');
                var _str    = "Current: <img width='388px;' src ='" + img + "' />" ;
                var _str2   = "Saved Thumbnail: <img src='" + ub.current_material.material.thumbnail_path + "'/>";

                ub.showModalTool(_str + _str2);

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

                        var _settingsObj = ub.current_material.settings.applications[input_object.applicationObj.code];
                        var _primaryView = ub.funcs.getPrimaryView(_settingsObj.application);
                        var _spriteCollection = ub.objects[_primaryView + '_view']['objects_' + input_object.applicationObj.code];

                        if (typeof _settingsObj.pattern_settings === "undefined" || _settingsObj.pattern_settings.length > 0) {

                            _settingsObj.pattern_settings = {

                                rotation: 0,
                                scale: {x: 1, y: 1},
                                position: {x: 1, y: 1},
                                opacity: 1, 

                            };

                        }

                        $.ub.mvChangePattern(input_object.applicationObj.application, input_object.applicationObj.code, input_object.applicationObj.pattern_obj, _spriteCollection);

                    }

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

    // src = ['order' | 'save']
    ub.funcs.createQuickRegistrationPopup = function (src) {

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

                ub.funcs.lRest(_e, _p, true, src);

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
                                type: "quickRegistration",
                            };

                            $.smkAlert({text: 'You have sucessfully registered an account using ' + _email + '! Please check your email for your temp password', type:'success', time: 3, marginTop: '80px'});

                            $popup.remove();
                            ub.status.quickRegistrationPopup = false;

                            if (src === "order") {
                                ub.funcs.initRoster();
                            } else if (src === "save") {
                                ub.funcs.initSaveDesign();
                            }
                            
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

        ub.funcs.uiPrepBeforeOrderForm();

        var dialog = bootbox.dialog({
            message: ub.utilities.buildTemplateString('#m-loading', { type: 'Order Form' }),
        });

        var _url = window.ub.config.api_host + '/api/order/orderswItems/' + ub.config.orderCode;

        ub.loaderWOToken(_url, 'order_info', function (result) {

            dialog.modal('hide');

            var _orderInfo = result;
            ub.data.orderInfo = _orderInfo;
            ub.funcs.initRoster(_orderInfo);
            
        });

    }

    ub.funcs.quickRegistration = function (src) {

        ub.funcs.createQuickRegistrationPopup(src);

    }

    ub.funcs.cleanupBeforeOrder = function () {

        $('div.preview-panel').hide();
        ub.funcs.resetHighlights();

    }

    ub.funcs.initOrderProcess = function () {

        ub.funcs.cleanupBeforeOrder();

        var _exit = false;

        if (typeof ub.current_material.material.parsedPricingTable.properties === "undefined") {
            ub.utilities.warn('No Price Table set for this uniform, cancelling order form.'); 
            return;
        }

        var _msg = "Are you sure you want to go to the order form?";

        if (ub.config.orderArtworkStatus === "rejected") { _msg = "Press OK to resubmit this order with your new artwork."; }
        if (ub.data.updateOrderFromCustomArtworkRequest ) { _msg = "Press OK to resubmit this order with your new artwork."; }

        bootbox.confirm(_msg, function (result) { 
        
            if (!result) {

                return true;

            } else {

                if (ub.data.afterLoadCalled === 0) { return; }

                if (typeof (window.ub.user.id) === "undefined") {
                    ub.funcs.quickRegistration("order");
                    return true;
                }

                if (typeof ub.temp !== "undefined" && ub.config.orderCode !== "none") {
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

                    if (!ub.data.useScrollingUI) {
                        ub.funcs.activateColorPickers();
                    } else {
                        ub.modifierController.activateColorAndPatternPanel();
                    }

                    ub.funcs.activeStyle('colors');
                    return;
                    
                }

                if (view === 'patterns') {

                    if (_.size(ub.current_material.settings.team_colors) <= 1) { return; }
                    if (ub.current_part === 0) {  $('div.pd-dropdown-links[data-ctr="1"]').trigger('click'); } // Trigger First Part

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

                    if (ub.data.useScrollingUI) {
                        $("#parts-with-insert-container").hide();
                        $(".parts-container").hide();
                    }
                    
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

                    ub['front_view'].visible = true;
                    ub['left_view'].visible = true;
                    ub['right_view'].visible = true;
                    ub['back_view'].visible = true;

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

                    var _msg = "Are you sure you want to save this design?";

                    bootbox.confirm(_msg, function (result) { 
                    
                        if (result) {

                            if (typeof (window.ub.user.id) === "undefined") {
                                ub.funcs.quickRegistration("save");
                            } else {
                                ub.funcs.initSaveDesign();    
                            }

                        }


                    });

                    return;

                }

                if (view === "left" || view === "right") {

                    if ($(this).hasClass('disabled')) { return; }

                }

                ub.zoom_off();

                var w = window.innerWidth * 5;
                var _newX  = w;

                ub.funcs.setVisibleView(view);

                ////

                ub.left_view.position.x     = _newX;
                ub.right_view.position.x    = _newX;
                ub.front_view.position.x    = _newX;
                ub.back_view.position.x     = _newX;
                ub.pattern_view.position.x  = _newX;

                ub[view + '_view'].position.set(ub.offset.x, ub.offset.y);
                ub.funcs.setActiveIcon(view);

                ////

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

        // var _patternProperties          = ub.funcs.cleanPatternProperties(_materialOption.pattern_properties);
        // var patternPropertiesParsed     = JSON.parse(_patternProperties);

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

            ub.data.adjustmentX = 550; 
            ub.data.divisor = 2.3;

            if ($(window).width() <= 1440) { 
                ub.data.divisor = 2.2; 
            }

            _offsetX = (($(window).width() - $('#right-pane-column').width()) - ub.data.adjustmentX) / ub.data.divisor;
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
        // var _positiion     = {x: 0, y: 0};
        var _positiion = position;
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

                    if (typeof layer.team_color_id !== "undefined") {
                        ub.data.colorsUsed[_paddedHex] = {hexCode: _paddedHex, parsedValue: util.decimalToHex(sprite.tint, 6), teamColorID: layer.team_color_id };    
                    } else {
                        ub.data.colorsUsed[_paddedHex] = {hexCode: _paddedHex, parsedValue: util.decimalToHex(sprite.tint, 6), teamColorID: ub.funcs.getMaxTeamColorID() + 1};    
                    }
                    
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

            var _soPattern = ub.funcs.getMaterialOptionSettingsObject(target_name).pattern

            if (_soPattern.dirty) {
                _p.position = position;
            }
            
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
        $('div.quarternary-bar').hide();
        $('div.secondary-bar').css('margin-top', "-50px");

    }

    ub.funcs.setActiveGender = function (gender) {

        var _activeClass = 'active'

        $('span.slink').removeClass('active');
        $('span.slink[data-item="' +  gender +'"]').addClass(_activeClass);

    }

    ub.funcs.prepPickers = function () {

        ub.funcs.fadeOutBackgrounds();

        $('body').addClass('pickers-enabled');

        $('div#main-row').hide();
        $('div.special_modifiers').hide();

        var $searchField = $('input#search_field');
        $searchField.fadeIn();

        ub.funcs.enableBetaSports();

    }

    ub.funcs.directLinks = function (gender, sport) {

        ub.funcs.prepFilters();
        ub.funcs.prepPickers();

        $('span.slink[data-item="' + gender + '"]').addClass('active');

        if (sport === '') {

            ub.funcs.setActiveGender(gender.toTitleCase());
            ub.funcs.initSportsPicker(gender.toTitleCase());

            return;

        }

        if (sport === "Wrestling") { sport = "Wrestling 2018"; }

        ub.funcs.initUniformsPicker(sport, gender, true);
        ub.funcs.setupEvents();

    }

    ub.funcs.reBindEventsPickers = function () {

        $('div.main-picker-items, span.main-picker-items').on('click', function () {

            $picker_item = $(this);

            var _picker_type = $(this).data('picker-type');
            var _item        = $(this).data('item');
            var _id          = $(this).data('id');
            var _gender      = $(this).data('gender');

            if (_picker_type === 'my-favorites') { return; }

            if (_picker_type === 'gender') { return; }

            if (_picker_type === 'sports') {

                var itemExcemptions = ['Apparel', 'eSports'];

                if (!_.contains(itemExcemptions, _item)) {

                    if (!ub.data.activeSports.isSportOK(_item) && !ub.data.tempSports.isSportOK(_item)) { return; }
                    if ($('#search_field').attr('placeholder') === 'Preparing search, please wait...')  { return; }

                    var _betaUniformsOk = ub.config.features.isOn('uniforms','betaSportUniforms');

                    if (ub.data.tempSports.isSportOK(_item) && (!_betaUniformsOk)) { return; }

                }
                
                ub.funcs.initUniformsPicker(_item, _gender);

            }

            if (_picker_type === 'uniforms') {

                ub.funcs.fadeOutElements();
                $('body').removeClass('pickers-enabled');

                $('#main-picker-container').hide();
                $('.header-container').removeClass('forceHide');


                window.location.href = window.ub.config.host + '/builder/0/' + _id;

            }

            if (_picker_type === 'search-result' || _picker_type === 'favorites') {

                var $searchField = $('input#search_field');
                $searchField.hide();

                ub.funcs.fadeOutElements();
                $('body').removeClass('pickers-enabled');

                var _item_type = $(this).data('uniform-type');
                var _id = $(this).data('id');
                var _baseURL = window.ub.config.host;

                if (_item_type === 'materials') {

                    window.location.href = _baseURL + '/builder/0/' + _id;

                }
                else if (_item_type === 'orders') {

                    window.location.href = _baseURL + '/orders/' + _id;

                } else {
                    
                    // Favorites 
                    window.location.href = _baseURL + '/builder/0/' + _id;

                }
                
            }

        });

        ub.funcs.setupEvents();


        
        // ub.funcs.scrollize ('div#main-picker-container', 'div#main-picker-scroller', 'div.main-picker-items', 280)

    };

    ub.funcs.setupEvents = function () {

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


        /// Refactored Handler starts here ... 

        // Gender Picker 

        $('div#topbar > span.slink[data-picker-type="gender"]').unbind('click');
        $('div#topbar > span.slink[data-picker-type="gender"]').on('click', function () {

            $picker_item = $(this);

            var _picker_type = $(this).data('picker-type');
            var _item        = $(this).data('item');
            var _id          = $(this).data('id');
            var _gender      = $(this).data('gender');

            if (_item === "My-Favorites") { return; }
            
            if (_item === "Home") {

                ub.funcs.setActiveGender(_item);

                ub.funcs.initGenderPicker();
                ub.funcs.hideSecondaryBar();

                return; 

            }
            
            if (_item !== "Men" && _item !== "Women") { return; }

            ub.funcs.setActiveGender(_item);
            ub.funcs.initSportsPicker(_item);

        });

        // End Gender Picker 

        // Favorites

        $('span.slink.my-favorites').unbind('click');
        $('span.slink.my-favorites').on('click', function () {

            ub.funcs.initGenderPicker();
            ub.funcs.initFavoritesPicker();

        });

        // End Favorites 

    }

    ub.funcs.prepareSecondaryBar = function (sport, gender) {

        $('span.slink.primary-filters[data-item="All"]').attr('data-gender', gender);
        $('span.slink.secondary-filters[data-item="All"]').attr('data-gender', gender);

        $('span.slink[data-item="Jersey"]').attr('data-gender', gender);
        $('span.slink[data-item="Pant"]').attr('data-gender', gender);
        $('span.slink[data-item="Twill"]').attr('data-gender', gender);
        $('span.slink[data-item="Sublimated"]').data('gender', gender);
        $('span.slink[data-item="Knitted"]').data('gender', gender);

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

                if (sport === "Socks (Apparel)") {
                    $('span.slink[data-item="Twill"]').hide();
                    $('span.slink[data-item="Knitted"]').show();
                }

            } else if (_secondaryBarLabels.type === "both") {

                $('span.slink[data-item="Jersey"]').html(_secondaryBarLabels.upperLabel);
                $('span.slink[data-item="Pant"]').html(_secondaryBarLabels.lowerLabel);
                $('span.slink[data-item="Twill"]').hide();

            }

        }

        if (sport !== "Socks (Apparel)") { $('span.slink[data-item="Knitted"]').hide(); }
        
        if (ub.data.nonTackleTwillItems.isNonTackleTwill(sport)) { 
            $('span.slink[data-item="Twill"]').hide(); 
        }

        // Todo get this from the actual available uniform list
        if (ub.data.tackleTwillOnly.isTackleTwillOnly(sport)) { 
            $('span.slink[data-item="Twill"]').show(); 
            $('span.slink[data-item="Sublimated"]').hide(); 
        } else {
            $('span.slink[data-item="Sublimated"]').show();
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

        var _sorted = _.sortBy(items, function (item) { 

            var _weight = parseInt(item.block_pattern_id);
            (item.type === 'upper') ? _weight += 100 : _weight += 200;

            // Blank styles goes to the bottom ...
            if (parseInt(item.is_blank) === 1) { _weight += 1000; }

            // Exemption on Volleyball with block pattern of `Volleyball Round Neck`
            // as per Robbie's request, all `Volleyball Round Neck` block pattern should be displayed first, 
            if (_.isEqual(item.block_pattern, 'Volleyball Round Neck')) { _weight -= 100; }

            return _weight;

        });

        return _sorted;

    }

    ub.funcs.cleanupPricesPerSport = function (sport, gender) {

        var _sport = sport;

        if (ub.data.sportsWithHiddenYouthPrices.isHidden(sport)) {

            $('span.youthPrice').hide();
            $('span.youthPriceSale').hide();
            $('span.adult-label').html('Price starts from ');

        }

        // Temp Fight Shorts
        $('div.main-picker-items[data-option="Fight Short"]').find('span.youthPrice').hide();
        $('div.main-picker-items[data-option="Fight Short"]').find('span.youthPriceSale').hide();
        $('div.main-picker-items[data-option="Fight Short"]').find('span.adult-label').html('Price starts from ');

    }

    // Get all set block pattern's aliases
    // @param Array ub.tempItems
    ub.funcs.getBlockPatternsAlias = function (items) {

        var blockPatterns = [];

        _.uniq(_.map(items, function(item) {

             if (item.block_pattern_alias !== '' && typeof item.block_pattern_alias !== 'undefined') {

                    blockPatterns.push(item.block_pattern_alias);

             } else {

                    blockPatterns.push(item.block_pattern);

             }

        }));

        return _.uniq(blockPatterns);

    }

    // Get all set neck option's aliases
    // @param Array ub.tempItems
    ub.funcs.getNeckOptionsAlias = function (items) {

        var neckOptions = [];

        _.each(items, function(item) {

            var parsedBlockPatternOptions = JSON.parse(item.block_pattern_options);
            
            var bOptions = _.find(parsedBlockPatternOptions, {name: item.neck_option});

            item.neck_option_alias = (typeof bOptions.alias !== 'undefined' 
                                        && bOptions.alias !== 'undefined' 
                                        && bOptions.alias !== '') 
                                     ? bOptions.alias 
                                     : item.neck_option;

        });

        _.uniq(_.map(items, function(item) {

             if (item.neck_option_alias !== '' && typeof item.neck_option_alias !== 'undefined') {

                    neckOptions.push(item.neck_option_alias);

             } else {

                    neckOptions.push(item.neck_option);

             }

        }));

        return _.uniq(neckOptions);

    }

    ub.funcs.updateTertiaryBar = function (items, gender) {

        setTimeout(function () {

            $('.tertiary-bar').html('');

            $('.tertiary-bar').hide();
            $('.tertiary-bar').css('margin-top','-50px');

            var t = $('#m-tertiary-links').html();
            var _str = '';
            var d = { block_patterns: _blockPatternsCollection, }

            var m = Mustache.render(t, d);
            $('.tertiary-bar').html(m);
        
            $('div.tertiary-bar').fadeIn();        
            $('div.tertiary-bar').css('margin-top', "0px");

            window.origItems = items;
            
            $('span.slink-small.tertiary').unbind('click');
            $('span.slink-small.tertiary').on('click', function () {

                var _dataItem = $(this).data('item');

                if (_dataItem === "All") {

                    _newSet = window.origItems;

                } else {

                    _newSet = _.filter(window.origItems, function (item) {

                        return item.block_pattern === _dataItem || item.block_pattern_alias === _dataItem;

                    });

                    if (_dataItem === "Blank Styles") {

                         _newSet = _.filter(window.origItems, function (item) { return item.is_blank === '1'; });

                    }

                    if (_dataItem === "Favorites") {

                         _newSet = _.filter(window.origItems, function (item) { return item.is_favorite === true; });

                    }

                }

                ub.funcs.initScroller('uniforms', _newSet, gender, true);

                $('span.slink-small.tertiary').removeClass('active');
                $(this).addClass('active');

                ub.funcs.updateQuarternaryBar(items, gender, _dataItem);

            });

        }, 100);

    }

    ub.funcs.updateQuarternaryBar = function (items, gender, dataItem) {

        setTimeout(function () {

            $('.quarternary-bar').html('');

            $('.quarternary-bar').hide();
            $('.quarternary-bar').css('margin-top','-50px');

            var t = $('#m-quarternary-links').html();
            var _str = '';
            
            var d = { block_patterns: _optionsCollection, }

            // Don't include Crew in the Quarternary options, todo: move this to a config list
            d.block_patterns = _.filter(d.block_patterns, function (item) { return !ub.data.filterExclusions.isExcluded(item.alias); });

            var m = Mustache.render(t, d);

            $('.quarternary-bar').html(m);

            // Don't show quarternary bar if there's no items
            if (_optionsCollection.length > 0) {
                $('div.quarternary-bar').fadeIn();            
            }

            // Side effect of whitelist
            if (d.block_patterns.length === 0) { $('div.quarternary-bar').hide(); }

            $('div.quarternary-bar').css('margin-top', "0px");

            window.origItems = items;
            
            $('span.slink-small.quarternary').unbind('click');
            $('span.slink-small.quarternary').on('click', function () {

                var _dataItem = $(this).data('item');
                var _activeBlockPattern = $('span.tertiary.active').data('item');

                if (_dataItem === "All") {

                    _newSet = _.filter(window.origItems, function (item) {

                        return item.block_pattern === _activeBlockPattern;

                    });

                } else {

                    if (_activeBlockPattern === "All") {

                        _newSet = _.filter(window.origItems, function (item) {

                            return item.neck_option === _dataItem || item.neck_option_alias === _dataItem;

                        });

                    } else {

                        _newSet = _.filter(window.origItems, function (item) {

                            return item.block_pattern === _activeBlockPattern && item.neck_option === _dataItem || item.neck_option_alias === _dataItem;

                        });

                        if (dataItem === "Blank Styles") {

                            _newSet = _.filter(window.origItems, function (item) {

                                return item.neck_option === _dataItem || item.neck_option_alias === _dataItem && item.is_blank === "1";

                            });

                        }

                        if (dataItem === "Favorites") {

                            _newSet = _.filter(window.origItems, function (item) {

                                return item.neck_option === _dataItem || item.neck_option_alias === _dataItem && item.is_favorite === true;

                            });

                        }

                    }
 
                }

                ub.funcs.initScroller('uniforms', _newSet, gender, true);

                $('span.slink-small.quarternary').removeClass('active');
                $(this).addClass('active');


            });

        }, 100);

    }

    ub.funcs.prepFilters = function () {

        ub.filters = {};

        ub.filters.primary = "All";
        ub.filters.secondary = "All";

        $('span.secondary-filters').removeClass('active');
        $('span.primary-filters').removeClass('active');

        $('span.secondary-filters[data-item="All"]').addClass('active');
        $('span.primary-filters[data-item="All"]').addClass('active');

    }

    ub.funcs.sortBlockPatternForFilters = function (sport, blockPatterns) {

        var _results = blockPatterns;
        var _temp = []; 
        var _plucked;

        if (sport === "Wrestling 2018") {

            _.each (blockPatterns, function (blockPattern) {

                var _sortID = ub.data.sortIDs.getSortID(blockPattern);
                
                _temp.push({
                    blockPattern: blockPattern,
                    sortID: _sortID,
                });

                _temp = _.sortBy(_temp, "sortID");

            });

            _plucked = _.pluck(_temp, "blockPattern");
            _results = _plucked;

        }

        return _results;

    };

    ub.funcs.initScroller = function (type, items, gender, fromTertiary, _apparel, actualGender, esports) {

        ub.funcs.fadeOutElements();

        var $active = $('span.slink.main-picker-items.active[data-picker-type="gender"]');
    
        actualGender = $active.data('item').toLowerCase();    
    
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

            if (typeof ub.user.id !== 'undefined')   { 

                $('span.slink.my-favorites').show(); 

            } else { 

                $('span.slink.my-favorites').addClass('hidden'); 

            }

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
                esports: esports,
            }

            _.isEqual(gender, 'Men')    ? data.is_men   = true : '';
            _.isEqual(gender, 'Women')  ? data.is_women = true : '';
            _.isEqual(gender, 'Youth')  ? data.is_youth = true : '';
            
            var markup = Mustache.render(template, data);
            $scrollerElement.html(markup);

            $('.picker-header').html('Choose a Sport');

            $('div.back-link').html('<img src="/images/main-ui/back.png" /> <span> | </span>');
            $('div.back-link').on('click', function () {

                ub.funcs.initGenderPicker();
                ub.funcs.reBindEventsPickers();        

            });

            $( ".cSoon" ).each(function () {
                var cText = $(this).text();
                if(!cText){
                    $(this).hide();
                }
            });

           ub.funcs.prepFilters();
                
        }

        if (type === 'uniforms') {

            var _sport = gender;

            ub.funcs.prepareSecondaryBar(_sport, actualGender);

            var _sizeSec = _.size(items);

            ub.funcs.updateActivePrimaryFilter(items, _sport, actualGender);
            ub.funcs.updateActiveSecondaryFilter(items, _sport, actualGender);

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

                    var imgt = $(this).find('img');

                    // If the uniform doesnt have a thumbnail use the sports picker thumb
                    if (imgt.attr('src') === ("?v=" + ub.config.asset_version)) {
                        var _filename =  '/images/main-ui/pickers/' + actualGender.toTitleCase() + '/' + ub.data.sportAliases.getAlias(gender).alias + '.png';
                        imgt.attr('src', _filename);
                    }

                    var _resultPrice = $(this).find('span.calculatedPrice').html();

                    // if (_resultPrice === "Call for Pricing") { $(this).find('span.callForTeamPricing').html(''); }

                    if (typeof ub.user.id !== 'undefined' && window.ub.config.material_id === -1) {

                        var _uid = $(this).data('id');

                        if (typeof _uid !== "undefined") {
                            _uid = _uid.toString();
                        }

                        _result = _.find(ub.data.tagged_styles, {uniform_id: _uid});
                        
                        if (typeof _result !== "undefined") {
                            $(this).find('div.favorite').show();
                        }

                    }

                    _priceItemName = ub.config.features.isOn('uniforms','priceItemName');

                    if (typeof _priceItemName !== "undefined") {

                        if (_priceItemName) {
                            $(this).find('div.price_item_template_name').show();
                            $(this).find('div.material_id').show();
                        } else {
                            $(this).find('div.price_item_template_name').hide();    
                            $(this).find('div.material_id').hide();    
                        }

                    }

                    if ($(this).data('youth-price') === "") {

                        console.warn('Hiding Youth Price for ' + $(this).data('item') + ' (' + $(this).data('id') + ')');

                        $(this).find('span.youthPrice').addClass('hide');
                        $(this).find('span.youthPriceSale').addClass('hide');

                    }

                    if ($(this).data('adult-price') === "") {

                        console.warn('Hiding Adult Price for ' + $(this).data('item') + ' (' + $(this).data('id') + ')');

                        $(this).find('span.adultPrice').addClass('hide');                        
                        $(this).find('span.adultPriceSale').addClass('hide');                        

                    }

                })

            );

            ub.funcs.hideIpadUniforms();

            // Disable this to provide for the new way of price cleanup
            // ub.funcs.cleanupPricesPerSport(_sport);

            $('.picker-header').html('Choose a Style');
            $('div.back-link').html('<img src="/images/main-ui/back.png" /> <span> | </span>');

            $('div.back-link').on('click', function () {

                ub.funcs.initGenderPicker();

            });

            /* Tertiary Links */
            
            var _blockPatterns = [];
            var itemsWOUpper = items;
            var _options = [];

            if (gender === "Football" || gender === "Football 2017") {

                itemsWOUpper = _.filter(items, {type: 'lower'});
                _blockPatterns = ub.funcs.getBlockPatternsAlias(itemsWOUpper);

            } else {

                _blockPatterns = ub.funcs.getBlockPatternsAlias(itemsWOUpper);
                _options = ub.funcs.getNeckOptionsAlias(itemsWOUpper);

            }

            var _tertiaryOptions = _.union(_blockPatterns, _options);  // leaving this here, maybe they will change their mind

            _blockPatternsCollection = [];
            _optionsCollection = [];

            var _tertiaryFiltersBlackList = ['BASEBALL', 'WRESTLING', 'Fight Short', 'Baseball Pants', 'Compression', 'Volleyball'];
            var _sortedBlockPattern = ub.funcs.sortBlockPatternForFilters(gender, _blockPatterns);

            _.each(_sortedBlockPattern, function (option) {

                if (_.contains(_tertiaryFiltersBlackList, option)) { return; }

                if (option === null) { return; }

                var _alias = option.replace('Baseball Jersey','').toTitleCase(); 

                _alias = ub.data.blockPatternsAlias.getAlias(_alias);

                _blockPatternsCollection.push({

                    alias: _alias,
                    item: option,

                });

            });

            // Add Blanks

            if (ub.filters.secondary !== "knitted" && ub.filters.secondary !== "tackle_twill") {

                _blockPatternsCollection.push({

                    alias: 'Blank Styles',
                    item: 'Blank Styles',

                });    

            }
            
            // Add Favorites
            _blockPatternsCollection.push({

                alias: 'Favorites',
                item: 'Favorites',

            });


            _.each(_options, function (option) {

                if (_.contains(_tertiaryFiltersBlackList, option)) { return; }

                if (option === null) { return; }

                var _alias = option.replace('Baseball Jersey','').toTitleCase(); 

                _alias = ub.data.neckOptionsAlias.getAlias(_alias);

                _optionsCollection.push({

                    alias: _alias,
                    item: option,

                });

            });

            if (typeof fromTertiary !== 'boolean') {
            
                ub.funcs.updateTertiaryBar(items, gender);
                ub.funcs.updateQuarternaryBar(items, gender);

            }

            /* End Tertiary Links */

            // Secondary Filters

            $('span.secondary-filters').unbind('click');
            $('span.primary-filters').unbind('click');

            $('span.secondary-filters').on('click', function () {

                var _dataItem = $(this).data('item');
                var _gender = $(this).data('gender').toLowerCase();
                var _sport = gender;

                if (_dataItem === "separator") { return; }

                var _availableForUnisex = ub.data.uniSexSports.isUniSex(_sport);
                if (_availableForUnisex) {
                    actualGender = 'unisex'    
                }

                $('span.secondary-filters').removeClass('active');
                $(this).addClass('active');

                if (_dataItem === "Sublimated") {

                    ub.filters.secondary = "sublimated";
                    
                } else if (_dataItem === "Twill") {

                    ub.filters.secondary = "tackle_twill";

                } else if (_dataItem === "Knitted") {

                    ub.filters.secondary = "knitted";

                } else {

                    ub.filters.secondary = "All";

                }

                if (_dataItem === "All") {

                    if (ub.filters.primary !== 'All') {

                        if (gender === "Football") {
                            items = _.filter(ub.materials, function (material)  {
                                return (material.uniform_category === 'Football' || material.uniform_category === 'Football 2017') && material.type === ub.filters.primary && material.gender === actualGender;
                            });
                        } else {
                            items = _.filter(ub.materials, { uniform_category: gender, type: ub.filters.primary, gender: actualGender });    
                        }

                    } else {

                        if (gender === "Football") {
                            items = _.filter(ub.materials, function (material)  {
                                return (material.uniform_category === 'Football' || material.uniform_category === 'Football 2017') && material.gender === actualGender;
                            });
                        } else {
                            items = _.filter(ub.materials, { uniform_category: gender, gender: actualGender });    
                        }                       
                        
                    }

                } else {

                    if (ub.filters.primary !== 'All') {

                        if (gender === "Football") {

                            items = _.filter(ub.materials, function (material)  {
                                return (material.uniform_category === 'Football' || material.uniform_category === 'Football 2017') && material.uniform_application_type === ub.filters.secondary && material.type === ub.filters.primary && material.gender === actualGender;
                            });

                        } else {

                            items = _.filter(ub.materials, { uniform_category: gender, uniform_application_type: ub.filters.secondary,  type: ub.filters.primary, gender: actualGender });    

                        }                

                    } else {
                        
                        if (gender === "Football") {

                            items = _.filter(ub.materials, function (material)  {
                                return (material.uniform_category === 'Football' || material.uniform_category === 'Football 2017') && material.uniform_application_type === ub.filters.secondary && material.gender === actualGender;
                            });
                        } else {

                            items = _.filter(ub.materials, { uniform_category: gender, uniform_application_type: ub.filters.secondary, gender: actualGender });

                        }       

                    }

                }

                $('div#main-picker-scroller').fadeOut().html('');
                ub.funcs.initScroller('uniforms', items, gender);

            });

            $('span.primary-filters').on('click', function () {

                var _gender = $(this).data('gender').toLowerCase();
                var _sport = gender;
                var _availableForUnisex = ub.data.uniSexSports.isUniSex(_sport);

                if (_availableForUnisex) { actualGender = 'unisex'; }

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

                        if (gender === "Football") {
                            items = _.filter(ub.materials, function (material)  {
                                return (material.uniform_category === 'Football' || material.uniform_category === 'Football 2017') && material.uniform_application_type === ub.filters.secondary && material.gender === actualGender;
                            });
                        } else {
                            items = _.filter(ub.materials, { uniform_category: gender, uniform_application_type: ub.filters.secondary, gender: actualGender });    
                        }


                    } else {

                        if (gender === "Football") {
                            items = _.filter(ub.materials, function (material)  {
                                return (material.uniform_category === 'Football' || material.uniform_category === 'Football 2017') && material.gender === actualGender;
                            });
                        } else {
                            items = _.filter(ub.materials, { uniform_category: gender, gender: actualGender }); 
                        }

                    }

                } else {

                    if (ub.filters.secondary !== 'All') {

                        if (gender === "Football") {
                            items = _.filter(ub.materials, function (material)  {
                                return (material.uniform_category === "Football" || material.uniform_category === "Football 2017") && material.type === ub.filters.primary && material.uniform_application_type === ub.filters.secondary && material.gender === actualGender;
                            });
                        } else {
                            items = _.filter(ub.materials, { uniform_category: gender, type: ub.filters.primary, uniform_application_type: ub.filters.secondary, gender: actualGender });    
                        }

                    } else {

                        if (gender === "Football") {

                            items = _.filter(ub.materials, function (material)  {
                                return (material.uniform_category === "Football" || material.uniform_category === "Football 2017") && material.type === ub.filters.primary && material.gender === actualGender;
                            });
                        } else {
                            items = _.filter(ub.materials, { uniform_category: gender, type: ub.filters.primary, gender: actualGender });
                        }

                    }

                }

                $('div#main-picker-scroller').fadeOut().html('');
                ub.funcs.initScroller('uniforms', items, gender);

            });

            $(window).scrollTop(0);

        }

        if (type === 'search_results') {

            ub.funcs.hideSecondaryBar();

            var template = $('#m-picker-items-uniforms').html();
            var _plucked = _.pluck(items, 'id');
            var _transformed = _.map (_plucked, function (item) { return _.find(ub.materials, {id: item}); });
            var _betaUniformsOk = ub.config.features.isOn('uniforms','betaSportUniforms');

            if (!_betaUniformsOk) {

                _transformed = _.reject(_transformed, function (item) { return ub.data.tempSports.isSportOK(item.uniform_category); });

            } 

            _transformedUnique = _.uniq(_transformed);
                
            var data = {
                picker_type: type,
                picker_items: _transformedUnique,
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

                    var imgt = $(this).find('img');

                    // If the uniform doesnt have a thumbnail use the sports picker thumb
                    if (imgt.attr('src') === ("?v=" + ub.config.asset_version)) {
                        var _filename =  '/images/main-ui/pickers/' + actualGender.toTitleCase() + '/' + ub.data.sportAliases.getAlias(gender).alias + '.png';
                        imgt.attr('src', _filename);
                    }

                    var _resultPrice = $(this).find('span.calculatedPrice').html();

                    // if (_resultPrice === "Call for Pricing") { $(this).find('span.callForTeamPricing').html(''); }

                    if (typeof ub.user.id !== 'undefined' && window.ub.config.material_id === -1) {

                        var _uid = $(this).data('id');

                        if (typeof _uid !== "undefined") {
                            _uid = _uid.toString();
                        }

                        _result = _.find(ub.data.tagged_styles, {uniform_id: _uid});
                        
                        if (typeof _result !== "undefined") {
                            $(this).find('div.favorite').show();
                        }

                    }

                    _priceItemName = ub.config.features.isOn('uniforms','priceItemName');

                    if (typeof _priceItemName !== "undefined") {

                        if (_priceItemName) {
                            $(this).find('div.price_item_template_name').show();
                            $(this).find('div.material_id').show();
                        } else {
                            $(this).find('div.price_item_template_name').hide();    
                            $(this).find('div.material_id').hide();    
                        }

                    }

                    if ($(this).data('youth-price') === "") {

                        console.warn('Hiding Youth Price for ' + $(this).data('item') + ' (' + $(this).data('id') + ')');

                        $(this).find('span.youthPrice').addClass('hide');
                        $(this).find('span.youthPriceSale').addClass('hide');

                    }

                    if ($(this).data('adult-price') === "") {

                        console.warn('Hiding Adult Price for ' + $(this).data('item') + ' (' + $(this).data('id') + ')');

                        $(this).find('span.adultPrice').addClass('hide');                        
                        $(this).find('span.adultPriceSale').addClass('hide');                        

                    }

                })

            );

            $('div.back-link').html('<img src="/images/main-ui/back.png" /> <span> | </span>');

            $('div.back-link').on('click', function () {

                ub.funcs.initGenderPicker();

            });

        }

        if (type === 'favorites') {

            ub.funcs.hideSecondaryBar();

            var template = $('#m-picker-items-favorites').html();
            var uniques = items;
            var _betaUniformsOk = ub.config.features.isOn('uniforms','betaSportUniforms');

            if (!_betaUniformsOk ) {

                uniques = _.reject(uniques, function (item) { return ub.data.tempSports.isSportOK(item.uniform_category); });

            } 
                
            var data = {
                picker_type: type,
                picker_items: uniques,
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

                    if (typeof ub.user.id !== 'undefined' && window.ub.config.material_id === -1) {

                        var _uid = $(this).data('id');


                        if (typeof _uid !== "undefined") {

                            _uid = _uid.toString();

                        }

                        _result = _.find(ub.data.tagged_styles, {uniform_id: _uid});
                        
                        if (typeof _result !== "undefined") {

                            $(this).find('div.favorite').show();

                        }
                    }

                })

            );

            // No Favorite
            if(_.size(uniques) === 0) {

                var template = $('#m-no-favorite').html();
                var markup = Mustache.render(template, {});

                $scrollerElement.html(markup);

            }

            $('span.slink').removeClass('active');
            $('span.slink.my-favorites').addClass('active');

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

        $('div#main-picker-container').css('background-image','url(/images/main-ui/_unleash_new.png)');
        //$('body').css('background-image',"url('/images/main-ui/_unleashbg.jpg')");

        ub.funcs.hideRosterAndOrderForm();

        // $('.header-container').removeClass('forceHide');

        $('body').addClass('pickers-enabled');

        $('.main_viewport').hide();

        $('div#main-row').hide();
        // $('span.undo-btn').hide();
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

    ub.funcs.enableSport = function (source, gender, code) {

        var a = _.find(source, {gender: gender});
        var _sport = _.find(a.sports, {code: code});

        _sport.active = "1";
        _sport.tooltip = 'BETA';
        _sport.disabledClass = "";

    }

    ub.funcs.disableSport = function (source, gender, code) {

        var a = _.find(source, {gender: gender});
        var _sport = _.find(a.sports, {code: code});

        _sport.active = "0";
        _sport.tooltip = "COMING SOON";
        _sport.disabledClass = "disabledClass";

    }

    ub.funcs.enableBetaSports = function () {

        var _betaUniformsOk = ub.config.features.isOn('uniforms','betaSportUniforms');

        if (_betaUniformsOk) {

        } else {

        }

    }

    ub.funcs.initSportsPicker = function (sport) {

        ub.funcs.prepPickers();

        // var _apparel = _.find(ub.data.apparel, {gender: sport});
        var items = _.find(ub.data.sports, {gender: sport});
        var esports = _.find(ub.data.sportsCategory['esports'], {gender: sport});
        var apparel = _.find(ub.data.sportsCategory['apparel'], {gender: sport});

        ub.funcs.initScroller('sports', items.sports, sport, undefined, apparel.sports, undefined, esports.sports);

    };

    ub.funcs.initFavoritesPicker = function () {
        
        ub.funcs.prepPickers();

        $('div#main-picker-container').show();

        var items = _.filter(ub.materials, {is_favorite: true});
        ub.funcs.initScroller('favorites', items, "", undefined, undefined);

    };

    ub.funcs.showPickerMessage = function (obj) { // obj = {msg: 'msg', didYouMean: '', link: ''}

        var $scrollerElement = $('#main-picker-scroller');
        var template = $('#m-picker-message').html();
        var markup = Mustache.render(template, obj);

        $scrollerElement.html(markup);

    }

    ub.funcs.initUniformsPicker = function (sport, gender, fromDirectLink) {

        var _availableForUnisex = ub.data.uniSexSports.isUniSex(sport);
        if (_availableForUnisex) { gender = 'unisex'; }

        $('body').addClass('pickers-enabled');

        $('div#main-row').hide();
        $('div.special_modifiers').hide();
        $('div#main-picker-container').show();

        var _actualGender = gender;

        if (sport === "Football") {
            items = _.filter(ub.materials, function (material)  {
                return (material.uniform_category === 'Football' || material.uniform_category === 'Football 2017') && material.gender === gender.toLowerCase();
            });
        } else if (sport === "eSports") {
            $(window).scrollTop(0);
            var esports = _.find(ub.data.esports, {gender: gender});
            ub.funcs.initScroller('sports', esports.sports, gender, undefined, undefined, undefined, undefined);
            return;
        } else if (sport === "Apparel") {
            $(window).scrollTop(0);
            var apparel = _.find(ub.data.apparel, {gender: gender});
            ub.funcs.initScroller('sports', apparel.sports, gender, undefined, undefined, undefined, undefined);
            return;
        } else if (_availableForUnisex) {
            items = _.filter(ub.materials, {uniform_category: sport, gender: gender }); // All socks are in men
        } else {
            items = _.filter(ub.materials, {uniform_category: sport, gender: gender.toLowerCase() });
        }

        if (typeof fromDirectLink !== "undefined" && _.size(items) === 0) {

            var _msg = 'No Styles Found for ' + ub.config.styles.gender + ' / ' + ub.config.styles.sport;
            var _didYouMean = '';
            var _markup = ''
            var _template = '';

            ub.nlp.query(ub.config.styles.sport, function(output){ 
                
                if (_.size(output.result) > 0) {

                    var _firstResult = output.result[0][0];
                    var _alias;

                    _didYouMean = 'Did you mean ' + _firstResult + '?';

                    var _alias = ub.data.urlAlias.getAlias(_firstResult);
                    
                    if (typeof _alias !== "undefined") {

                        _template = $('#m-did-you-mean-link-templates').html();

                        _markup = Mustache.render(_template, {
                            alias: _alias,
                            gender: _alias.gender,
                            toUpper : function () {
                              return function(val, render) {
                                
                                var str = render(val);
                                str = (str === "men") ? "Men": "Women";

                                return render(str);
                                
                              };
                            }

                        });

                    }

                }

            });
        
            ub.funcs.showPickerMessage({message: _msg, didYouMean: _didYouMean });
            $('div.generic-message').append(_markup);

            return;

        }

        ub.funcs.setupItemTotals (items);
        ub.funcs.initScroller('uniforms', items, sport, undefined, undefined, _actualGender);
        
    };

    ub.funcs.setupItemTotals = function (items) {

        var _totalSize = _.size(items);

        var _totalSizeType = _.countBy(items, function (item) {
            if (item.type === "upper") { return "upper"; } 
            if (item.type === "lower") { return "lower"; } 
        });

        var _totalSizeApplicationType = _.countBy(items, function (item) {
            if (item.uniform_application_type === "sublimated") { return "sublimated" }
            if (item.uniform_application_type === "tackle_twill") { return "tackle_twill" }
            if (item.uniform_application_type === "knitted") { return "knitted" }
            if (item.uniform_application_type === "infused") { return "infused" }
        });

        ub.filterStructure = {

            primary: [
                {name: 'all', count: _totalSize},
                {name: 'upper', count: typeof _totalSizeType.upper !== "undefined" ? _totalSizeType.upper : 0},
                {name: 'lower', count: typeof _totalSizeType.lower !== "undefined" ? _totalSizeType.lower : 0},
            ],

            secondary: [
                {name: 'all', count: 0}, // this depends on the selected item on the primary filters
                {name: 'tackle_twill', count: typeof _totalSizeApplicationType.tackle_twill !== "undefined" ? _totalSizeApplicationType.tackle_twill : 0},
                {name: 'sublimated', count: typeof _totalSizeApplicationType.sublimated !== "undefined" ? _totalSizeApplicationType.sublimated : 0},
                {name: 'knitted', count: typeof _totalSizeApplicationType.knitted !== "undefined" ? _totalSizeApplicationType.knitted : 0},
                {name: 'infused', count: typeof _totalSizeApplicationType.infused !== "undefined" ? _totalSizeApplicationType.infused : 0},
            ],

            // Block Patterns, fill in dynamically 
            tertiary: [
            ],

            // Neck Options, fill in dynamically
            quarternary: [
            ],

        };

    }

    ub.funcs.updateActivePrimaryFilter = function (items, sport, gender) {

        // TODO: Apply Sport Filter Labels .

        var _item = $('span.primary-filters.active').data('item');
        var _type = _item === "Jersey" ? 'upper' : _item === "All" ? 'all' : 'lower';
        var _result = _.find(ub.filterStructure.primary, {name: _type});
        var _sportFilters = _.find(ub.data.sportFilters, {sport: sport}).filters;

        // create exception on Tennis _sportFilters array
        // men: Shorts
        // women: Skorts
        if ( _.isEqual(sport, 'Tennis') ) {

            // get Shorts/Skorts index on _sportFilters array
            var index = (_.contains(_sportFilters, 'Shorts')) 
                        ? _sportFilters.indexOf('Shorts') 
                        : (_.contains(_sportFilters, 'Skorts')) 
                        ? _sportFilters.indexOf('Skorts') 
                        : _sportFilters.indexOf('Shorts');

            if (gender === 'men') {
                _sportFilters[index] = 'Shorts';
            } else {
                _sportFilters[index] = 'Skorts';
            }

        }

        $('span.primary-filters').each(function (index, value) {

            var _matchingFilter = _sportFilters[index];
            
            if (typeof _matchingFilter !== "undefined") {
                $(value).data('filter-name', _matchingFilter);
            } else {
                $(value).data('filter-name', $(value).data('item'));
            }

            $(value).html($(value).data('filter-name'));

        });

        $('span.primary-filters[data-item="' + _item + '"]').html( $('span.primary-filters[data-item="' + _item + '"]').data('filter-name') + ' (' + _result.count + ')');

    }

    ub.funcs.updateActiveSecondaryFilter = function (items, sport, gender) {

        var _sizeSec = _.size(items);

        $('span.secondary-filters').each(function (index, value) {
            if($(value).data('item') === "separator") { return; }
            $(value).html($(value).data('item')); 
        });

        var _caption = $('span.secondary-filters.active').data('item');
        $('span.secondary-filters.active').html(_caption + ' (' + _sizeSec + ')');

    }

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
                        });
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

        ub.funcs.rebindSaveButtons = function (data) {

            var $container = $('div.saved-designs-list');
            var $imgThumbs = $('img.tview');
                
            $imgThumbs.unbind('click');
            $imgThumbs.on('click', function () {

                var _file = $(this).data('file');
                var _str = "<img src ='" + _file + "' />";
                
                ub.showModalTool(_str);

            });

            $('span.action-button.view').on('click', function () {

                var _savedDesignID = $(this).data('saved-design-id');

                var url = '/my-saved-design/' + _savedDesignID + '/render';
                window.open(url, '_blank');
                
            });

            $('span.action-button.delete').on('click', function () {

                var _deleteDesignID = $(this).data('saved-design-id');
                var _name = $(this).data('name');

                ub.funcs.deleteSavedDesign(_deleteDesignID, _name);

            });

            bindShareDesigns();

            $(document).on('change', '.fil-to,.fil-from', function () {

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

                var filteredDataRemoveEmpty = filteredData.filter(function (x) {
                    return (x !== (undefined || ''));
                });

                var filtered_data = {savedDesigns: filteredDataRemoveEmpty,}        
            
                var markup = Mustache.render(template, filtered_data);
                $container.html(markup); 
                
                $( ".created-at" ).each(function( index ) {
                  var date = util.dateFormat($( this ).text());
                  date = date.split(' ').slice(0, 3).join(' ');
                  $( this ).text(date);
                });
                
                ub.funcs.runDataTable();    
                ub.funcs.rebindSaveButtons();

            });

        };

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

                    ub.funcs.rebindSaveButtons(data); 
            
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

                    var _zero = 0;
                    var _one = 1;

                    if (ub.config.toString) {
                        _zero = '0';
                        _one = '1';
                    }
   
                    $('div.my-orders-loading').hide();

                    var $containerSaved         = $('div.order-list.saved');
                    var template                = $('#m-orders-table').html();
                    var dataSaved               = { orders: _.filter(ub.funcs.parseJSON(response.orders), {submitted: _zero}) };     

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

                    var dataSubmitted           = { orders: _.filter(ub.funcs.parseJSON(response.orders), {submitted: _one}) };

                    dataSubmitted.orders.forEach(function (value, i) {
                        value.created_at = util.dateFormat(value.created_at);
                        value.created_at_time = util.dateFormat(value.created_at);
                        value.created_at = value.created_at.split(' ').slice(0, 3).join(' ');
                        value.created_at_time = value.created_at_time.split(' ').slice(3, 5).join(' ');

                    }); 


                    var markup                  = Mustache.render(template, dataSubmitted);
                    $containerSubmitted.html(markup);

                    ub.funcs.runDataTable();

                    $('div.order-list.submitted').find('span.action-button.delete, span.action-button.edit').hide();
                    $('div.order-list.saved').find('span.action-button.delete, span.action-button.view').hide();

                    var $imgThumbs = $('img.thumbs');
                    
                    $imgThumbs.unbind('click');
                    $imgThumbs.on('click', function () {

                        var _file = $(this).data('file');
                        var _str = "<img src ='" + _file + "' />";

                        ub.showModalTool(_str);

                    });

                    // Edit Order
                    $('span.action-button.edit').unbind('click');
                    $('span.action-button.edit').on('click', function () {

                        var _dataID = $(this).data('order-id');
                        var _ID     = $(this).data('id');

                        window.location.href =  '/order/' + _dataID;

                    });

                    // Delete Order
                    $('span.action-button.delete').unbind('click');
                    $('span.action-button.delete').on('click', function () {

                        var _dataID = $(this).data('order-id');
                        var _ID     = $(this).data('id');

                        ub.funcs.deleteSavedOrder(_ID, _dataID);

                    });

                    // View Order Details
                    $('span.action-button.view').unbind('click');
                    $('span.action-button.view').on('click', function () {

                        var _dataID = $(this).data('order-id');
                        var _ID     = $(this).data('id');

                        $('div.order-list.submitted').hide();
                        $('div.order-list.saved').hide();
                        $('div.my-orders-loading').fadeIn();
                        $('span.orders.header').hide();
                        $('div.order-tabs').hide();

                        window.location.href =  '/order/view/' + _dataID;

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
                    $('span.tab[data-type="submitted"]').trigger('click');

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

        ub.funcs.previewEmbellishment = function () {

            var _html = '';
            var _filename = '';

            a = ub.embellishmentDetails;
            a.design_summary = JSON.parse(a.design_summary);
            a.design_details = JSON.parse(a.design_details);

            _filename = ub.data.inkSoftBaseURL + a.design_summary.Canvases[0].SvgRelativeUrl;

            $('img.previewSVG').attr('src', _filename);
            $('a.main-preview-window').attr('href', _filename);
            
            $('span.design-id').html(a.design_id);
            $('span.design-name').html(a.design_name);
            $('em.filename').html(_filename);

            var elements = typeof a.design_details.Data !== "undefined" ? a.design_details.Data.Canvases[0].Elements : a.design_details.Canvases[0].Elements;

            _.each(elements, function (f) {
            
                if (typeof f.Colors === "object") {
            
                    _html += ub.utilities.buildTemplateString('#m-embellishment-preview-vector', {
                        
                        name: _.last(f.ArtName.split('/')),
                        baseVectorPath: ub.data.inkSoftBaseURL + f.OriginalArtPath,
                        mainObject: f,

                        colors: _.map(_.uniq(f.Colors), function (color) {

                            var _colorCode = undefined;
                            var _result =  ub.funcs.getSublimationColorCodeByHexCode(color.toLowerCase());
                            var returnObject;

                            if (typeof _result === "undefined") {
                                _colorCode = 'Color code not found';
                            } else {
                                _colorCode = _result.color_code;
                            }

                            returnObject = {
                                hexCode: color, 
                                colorCode: _colorCode,
                            }

                            return returnObject;

                        }),

                  });

                } else {

                    _html += ub.utilities.buildTemplateString('#m-embellishment-preview-font', {
                    style: f.Font.FontStyleName,
                    fillcolor: f.FillColor,
                    name: f.Font.FamilyName,
                    curveShape: f.CurveShape,
                    fontPath: ub.data.inksoftFontsFolder + f.Font.FontStyleName + '/' + f.Font.FamilyName + '.ttf',
                    mainObject: f,
                    text: f.Text,
                    displayStroke: (f.StrokeWidth === 0) ? 'none' : 'block',
                    strokeColor: _.map(_.uniq([f.StrokeColor]), function (color) {

                        var _colorCode = undefined;
                        var _result =  ub.funcs.getSublimationColorCodeByHexCode(color.toLowerCase());
                        var returnObject; 

                        if (typeof _result === "undefined") {
                            _colorCode = 'Color code not found';
                        } else {
                            _colorCode = _result.color_code;
                        }

                        returnObject = {
                            hexCode: color, 
                            colorCode: _colorCode,
                        }

                        return returnObject;
                        
                    }),
                    fillColor: _.map(_.uniq([f.FillColor]), function (color) {

                        var _colorCode = undefined;
                        var _result =  ub.funcs.getSublimationColorCodeByHexCode(color.toLowerCase());
                        if (typeof _result === "undefined") {
                            _colorCode = 'Color code not found';
                        } else {
                            _colorCode = _result.color_code;
                        }

                        var returnObject = {
                            hexCode: color, 
                            colorCode: _colorCode,
                        }

                        return returnObject;
                        
                    }),

                  });
            
                }
            
            }); 

            $('div.debug-panel').hide();
            $('div.embellishmentInfo').html(_html);
            $('div.mainPreviewLink').fadeIn();
            $('h3.header').fadeIn();

        };

        ub.funcs.getSublimationColorCodeByHexCode = function (hexCode) {

            var _hexCode = hexCode;
            var _colorObj = undefined;

            if (_hexCode.indexOf('#') !== -1) { _hexCode = _hexCode.replace('#', ''); }

            _colorObj = _.find(ub.data.colors, {hex_code: _hexCode, sublimation_only: 0});

            return _colorObj;

        }

        if (ub.page === "preview-embellishment") {

            $('div#main-picker-container').remove();
            $('body').css('background-image', 'none');

            var _url = window.ub.config.api_host + '/api/colors';

                ub.loader(_url, 'colors', function (result) {
                ub.data.colors = result;
                ub.funcs.previewEmbellishment();
            
            });

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

                // $.each($('td.time'), function (index, value){

                //     var _utcDate = $(value).data('time');
                //     var date = new Date(_utcDate);
                //     // var _d = moment.utc(_utcDate).tz(moment.tz.guess()).format('MMMM d, YYYY ha z');
                //     // $(value).html(_d);

                // });

            });

            $('span.message-count').html('Messages: ' + _.size(_messages));

            var $viewMessageButton = $('span.action-button.view-message');
            
            $viewMessageButton.unbind('click');
            $viewMessageButton.on('click', function () {

                var _id             = $(this).data('id');
                var _type           = $(this).data('type');
                var _messagePopup   = $('#m-message-popup').html();
                var _message        = _.find(_messages, {id: _id});

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

                $msgType.removeClass('active');
                $(this).addClass('active');

                $('div#messages > span.header').html(_type);

                $('tr.message-row').remove();
                $('div.messages-loading').fadeIn();

                ub.funcs.filterMessages(_type);

            });

        }

        ub.funcs.filterMessages = function (type) {

            var _message = _.find(ub.data.notificationMessage, {type: type});
            $('div.notification-description').html(_message.description);

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

                        var _typeConverted = type.toUpperCase();

                        // Force uppercase on message types 
                        var _messages = _.map(response.messages, function (message){

                            message.type = message.type.toUpperCase();
                            return message;

                        });

                        if (_typeConverted === 'Pm') { _typeConverted = "PM"; }

                        var _filteredMessages = _.filter (_messages, {type: _typeConverted});
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

        ub.funcs.sortRepsDropDown = function () {
            
            $selectOptionsTemp = $('select[name="rep"] > option');

            $selectOptionsTemp.sort(function(a,b){

                aSort = $(a).data('sort');
                bSort = $(b).data('sort');

                return aSort-bSort;

            });

            $('select[name="rep"]').html($selectOptionsTemp);

        }

        ub.funcs.prependSeparators = function (noneFound, zipCode) {
                
            $('select[name="rep"]').append('<option data-sort="0" data-name="disabled" disabled>--- Local Reps (ZIP CODE: ' + zipCode + ') ---</option>');
            
            if (noneFound) {
                $('select[name="rep"]').append('<option data-sort="1" value="-1" data-name="Anyone is ok (if no Rep is within the areas)">Anyone is ok for me (if no Rep is within the area)</option>');
            }
            
            $('select[name="rep"]').append('<option data-sort="2" data-name="disabled" disabled>---------------------------</option>');

        }

        ub.funcs.markLocalReps = function (sales_reps, selectedID, zipCode) {

            var _string = ub.utilities.buildTemplateString('#m-sales-reps-options', {rep: sales_reps});

            var cleanup = function () { $('select[name="rep"]').find('option[data-sort="1"], option[data-sort="0"], option[data-sort="2"]').remove(); };

            cleanup();

            if (sales_reps.length > 0) {

                var $selectOptions = $('select[name="rep"] > option');

                // Reset Previous Local Marks
                $selectOptions.each(function (i, val) {
                
                    $(this).html($(this).data('name') + ' - (' + $(this).data('dealer') + ')');
                    $(this).data('sort', '3');

                });
                // End Reset

                // Mark Local Reps
                _.each(sales_reps, function (rep) {

                    $option = $('select[name="rep"]').find('option[value="' + rep.id + '"]');
                    $option.html($option.data('name') + ' - (' + rep.dealer + ') (LOCAL REP)');
                    $option.data('sort', '1');

                });

                ub.funcs.prependSeparators(false, zipCode);
                // End Mark Local Reps

                ub.funcs.sortRepsDropDown();

                // Select First Rep
                var firsRepID = sales_reps[0].id;
                $('select[name="rep"]').val(firsRepID);
                
                // Misc
                $('span.message-rep').html('Found: ' + sales_reps.length + ' local reps.');
                $('select[name="rep"]').removeAttr("disabled");

            } else {

                ub.funcs.prependSeparators(true, zipCode);
                ub.funcs.sortRepsDropDown();

                $('select[name="rep"]').val(-1);         

                $('span.message-rep').html('No reps found for your zip code [' + zipCode + '], It is still ok to proceed without a sales rep, we will just assign a default rep to you in case you submit an order, you can still use the customizer, but please do check that you entered a correct zip code before proceeding.');

            }

            // Highlight Selected ID
            if (typeof selectedID !== "undefined" && selectedID.length > 0) { 

                $('select[name="rep"]').val(selectedID); 
                $('select[name="rep"]').attr('disabled','disabled');
                $('input[name="find-rep"]').attr('disabled','disabled');
                $('input[name="zip"]').attr('disabled','disabled');
                $('span.message-rep').html('');

            } 

            // Displaying my profile and no valid rep is selected
            if (selectedID === "0" || selectedID === '-1') { 
                $('select[name="rep"]').val(-1); 
                $('select[name="rep"]').removeAttr('disabled');
                $('input[name="find-rep"]').removeAttr('disabled');
                $('input[name="zip"]').removeAttr('disabled');
            }

        }

        ub.funcs.updateRepsList = function (sales_reps, selectedID) {

            var _string = ub.utilities.buildTemplateString('#m-sales-reps-options', {rep: sales_reps});
                       
            $('select[name="rep"]').html(_string);
            $('span.message-rep').html('Found: ' + sales_reps.length + ' reps.');
            
            if (sales_reps.length > 0) {

                $('select[name="rep"]').removeAttr("disabled");

            } else {

                $('select[name="rep"]').attr('disabled', 'disabled');
                $('span.message-rep').html('No reps found for your zip code [' + _id + '], It is still ok to proceed without a sales rep, we will just assign a default rep to you in case you submit an order, you can still use the customizer, but please do check that you entered a correct zip code before proceeding.');

            }

            if (typeof selectedID !== "undefined" && selectedID.length > 0 & selectedID !== -1) {

               $('select[name="rep"]').val(selectedID);
               $('select[name="rep"]').attr('disabled', 'disabled');

               $('input[name="zip"]').attr('disabled', 'disabled');
               $('input[name="find-rep"]').attr('disabled', 'disabled');

            }

            if (ub.page === "signup") {

                ub.funcs.prependSeparators(true, 'blank');
                ub.funcs.sortRepsDropDown();
                $('select[name="rep"]').val(-1); 

            }

        }

        ub.funcs.getAllReps = function (cb, id) {

            var _id = id;

            $('span.message-rep').html('Loading...');

            $.ajax({

                url: ub.endpoints.getFullUrlString('getAllSalesReps'),
                type: "GET", 
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

                success: function (response) {

                    if (response.success) {

                        // Remove M and JS here ...
                        var _reps = _.without(response.sales_reps, _.findWhere(response.sales_reps, {rep_id: '4321'})); // M
                        _reps = _.without(_reps, _.findWhere(_reps, {rep_id: '179'})); // JS

                        cb(_reps);

                    }

                }
                
            });


        }

        ub.funcs.getRepsByZipCode = function (id, cb, selectedID) {

            var _id = id;

            $('span.message-rep').html('Searching...');

            $.ajax({

                url: ub.endpoints.getFullUrlString('getSalesRepByZipCode') + _id,
                type: "GET", 
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

                success: function (response) {

                    if (response.success) {

                       cb(response.sales_reps, selectedID, id);

                    }

                }
                
            });

        }

        if (ub.page === 'signup') {

            $('div#main-picker-container').remove();
            $('body').css('background-image', 'none');

            $('input.findRep').unbind('click');
            $('input.findRep').on('click', function () {

                var _id = $('input[name="zip"]').val();

                if (_id.trim().length === 0) {

                    $('span.message-rep').html('Please enter a valid Zip Code!');
                    return;

                }
                ub.funcs.getRepsByZipCode(_id, ub.funcs.markLocalReps);

            });

            ub.funcs.getAllReps(ub.funcs.updateRepsList);


            if (!window.ub.user) { 
                //ub.funcs.displayLoginForm(); 
                return;
            } 

            ub.funcs.displaySignup();

        }

    /// End Signup

    /// Profile

        ub.funcs.updateProfile = function (obj) {

            var _postData = {

                id: ub.user.id,
                first_name: obj.firstName,
                last_name: obj.lastName,
                state: obj.state,
                zip: obj.zip,
                default_rep_id: parseInt(obj.repID),

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

                success: function (response) {

                    ub.user.firstName = obj.firstName;
                    ub.user.lastName = obj.lastName;

                    var _url = ub.config.team_store_api_host + '/team-store-user/' + ub.user.id + '/update';

                    $.ajax({
                        
                        url: _url,
                        type: "PATCH",
                        data: JSON.stringify(_postData),
                        datatype: "json",
                        crossDomain: true,
                        contentType: "applicatin/json",
                        headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

                        success: function(response) {
                            window.location.href = '/my-profile';
                        }

                    });

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
                state: ub.user.state,
                zip: ub.user.zip,

                application_id: '1',
            }

            var markup = Mustache.render(template, data);
            $container.html(markup);

            $('span.update-profile').unbind('click');
            $('span.update-profile').on('click', function () {

                var _firstName = $('input[name="first-name"]').val();
                var _lastName = $('input[name="last-name"]').val();
                var _state = $('input[name="state"]').val();
                var _zip = $('input[name="zip"]').val();
                var _repID = $('select[name="rep"]').val();

                $(this).attr('disabled', 'disabled');

                ub.funcs.updateProfile({

                    firstName: _firstName,
                    lastName: _lastName,
                    state: _state,
                    zip: _zip,
                    repID: _repID,

                });

            });

            // Rep Search 

            $('input.findRep').unbind('click');
            $('input.findRep').on('click', function () {

                var _id = $('input[name="zip"]').val();

                if (_id.trim().length === 0) {

                    $('span.message-rep').html('Please enter a valid Zip Code!');

                    return;

                }
                
                ub.funcs.getRepsByZipCode(_id, ub.funcs.markLocalReps);
                
            });

            // End Rep Search

            /// Init After Load 

                ub.funcs.getAllReps(ub.funcs.updateRepsList);
                $('select[name="rep"]').removeAttr('disabled');

                // Load Reps for the users zip

                if (typeof ub.user.zip && ub.user.zip.length > 0) {
                    ub.funcs.getRepsByZipCode(ub.user.zip, ub.funcs.markLocalReps, ub.user.defaultRepID);
                } else {
                    ub.funcs.getRepsByZipCode('blank', ub.funcs.markLocalReps, ub.user.defaultRepID);
                }

                // Lock down rep selection when the system detected that there's one that is already selected
                // if (typeof ub.user.defaultRepID !== "undefined" && ub.user.defaultRepID.length > 0) { $('input[name="find-rep"]').attr('disabled', 'disabled'); // }

            /// End Init After Load 

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
                        window.location.href = '/logout';
                    } else {

                        $.smkAlert({text: response.message, type:'error', permanent: false, time: 5, marginTop: '90px'});

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

                        $.smkAlert({text: response.message, type:'error', permanent: false, time: 5, marginTop: '90px'});

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

    /// Order Info

        ub.funcs.displayOrderDetails = function (order) {

            var _bc = JSON.parse(order.builder_customizations);
            var _fileName = JSON.parse(order.additional_attachments);
            var _applicationSrc = '';

            // Thumbnails 

                $('img.right').attr('src', _bc.thumbnails.right_view);
                $('img.front').attr('src', _bc.thumbnails.front_view);
                $('img.back').attr('src', _bc.thumbnails.back_view);
                $('img.left').attr('src', _bc.thumbnails.left_view);

                $('img.right').attr('data-src', _bc.thumbnails.right_view);
                $('img.front').attr('data-src', _bc.thumbnails.front_view);
                $('img.back').attr('data-src', _bc.thumbnails.back_view);
                $('img.left').attr('data-src', _bc.thumbnails.left_view);

                $('img.thumbs').unbind('click');
                $('img.thumbs').on('click', function () {

                    var _dtSrc = $(this).attr('data-src');
                    var _str = "<img src ='" + _dtSrc + "' />";

                    ub.showModalTool(_str);

                });

            // End Thumbnails

            if (_fileName !== null && typeof _fileName !== "undefined" && _fileName.length > 0) {

                $('img.attachments').attr('src', _fileName);
                $('img.attachments').attr('data-src', _fileName);
                $('a.download-attachment').attr('href', _fileName);

            } else {

                $('img.attachments').hide();
                $('a.download-attachment').hide();

            }
            
            $('span.order-id').html(order.order_id);
            $('span.description').html(order.description);

            $('a.pdfOrderForm').html('View Order Form PDF (' + _bc.pdfOrderForm + ')');
            $('a.pdfOrderForm').attr('href', _bc.pdfOrderForm);

            $('span.notes').html(order.notes);
            $('span.additional-attachments').html(order.additional_attachments);
            
            // PDF
            var _url = "/pdfjs/web/viewer.html?file=" + _bc.pdfOrderForm;
            $('iframe#pdfViewer').attr('src', _url);
            // End PDF

        };

        ub.funcs.hightlightItemInGroup = function (group, item) {

            $(group).removeClass('active');
            $(item).addClass('active')

        }

        ub.funcs.showTab = function (group, item) {

            $(group).hide();
            $(item).show();

        }

        ub.funcs.customArtworkRequestNotificationThread = function (messages) {

            //TODO: Request message subtype field here (subtype:'CUSTOM ARTWORK REQUESTS')
            var _messagesForCarFilter = [
                                            'Custom Artwork Request Received.', 
                                            'Artwork finished.',
                                            "This order was rejected because of the following reasons: ",
                                        ];

            var _messagesForCar = _.filter(messages, function (message) {

                return _.contains(_messagesForCarFilter, message.subject);

            });

            _messagesForCar = _.sortBy(_messagesForCar, function(message){ return parseInt(message.id); }).reverse();

            var _content = ub.utilities.buildTemplateString('#m-car-notification-thread-container', {messages: _messagesForCar});

            $('div.car-notification-thread-container').html(_content);

            //<span class="field-value custom-artwork-status"></span>

            ub.content = _messagesForCar;

            if (_.size(_messagesForCar) > 0) {

                // Sorted by max id 

                var _firstContent = _.first(_messagesForCar);

                if (typeof _firstContent !== "undefined") {

                    $('span.last-message').html(_firstContent.content);
                    $('a.edit-order-link').show();

                } else {

                    $('span.last-message').hide();
                    $('a.edit-order-link').hide();

                    $('span.edit-order-link').hide();

                }

            }

        }

        ub.funcs.displayMessagesForOrder = function (messages, orderID) {

            var _messages = _.filter(messages, {order_code: orderID});
            var _markup = ub.utilities.buildTemplateString('#m-order-info-messages', {messages: _messages});

            $.when($('div.order-info-messages').html(_markup)).then($('span.message-count').html('Messages: ' + _.size(_messages)));

            // get all messages for Custom Artwork Requests
            ub.funcs.customArtworkRequestNotificationThread(_messages);

        }

        ub.funcs.setupOrderInfoEvents = function () {

            // Main Info
            $('span.tab[data-type="main-info"]').unbind('click');
            $('span.tab[data-type="main-info"]').on('click', function () {

                ub.funcs.hightlightItemInGroup('div.order-tabs > span.tab', 'span.tab[data-type="main-info"]');
                ub.funcs.showTab('div.order-info', 'div.order-info.main-info');

            });

            // Custom Artwork Request Status
            $('span.tab[data-type="custom-artwork-request-status"]').unbind('click');
            $('span.tab[data-type="custom-artwork-request-status"]').on('click', function () {

                ub.funcs.hightlightItemInGroup('div.order-tabs > span.tab', 'span.tab[data-type="custom-artwork-request-status"]');
                ub.funcs.showTab('div.order-info', 'div.order-info.custom-artwork-request-status');

            });

            // Status Thread
            $('span.tab[data-type="status-thread"]').unbind('click');
            $('span.tab[data-type="status-thread"]').on('click', function () {

                ub.funcs.hightlightItemInGroup('div.order-tabs > span.tab', 'span.tab[data-type="status-thread"]');
                ub.funcs.showTab('div.order-info', 'div.order-info.status-thread');

            });

            // PDF            
            $('span.tab[data-type="pdf"]').unbind('click');
            $('span.tab[data-type="pdf"]').on('click', function () {

                ub.funcs.hightlightItemInGroup('div.order-tabs > span.tab', 'span.tab[data-type="pdf"]');
                ub.funcs.showTab('div.order-info', 'div.order-info.pdf');

            });

        }

        ub.funcs.processCustomArtworkRequestStatus = function (status) {

            $('td.custom-artwork-requests.action').hide();
            if(status === "rejected") { 
                $('span.custom-artwork-status').addClass('rejected'); 

            } else {

                $('span.last-message').hide();
                $('a.edit-order-link').hide();

                $('span.edit-order-link').hide();

            }
            
        }

        ub.funcs.viewOrderInfo = function () {

            // Prep Mascots

                ub.current_material.mascots_url = window.ub.config.api_host + '/api/mascots/';
                ub.current_material.mascot_categories_url = window.ub.config.api_host + '/api/mascot_categories';
                ub.current_material.mascot_groups_categories_url = window.ub.config.api_host + '/api/mascots_groups_categories/';            

                ub.loader(ub.current_material.mascots_url, 'mascots', ub.callback);
                ub.loader(ub.current_material.mascot_categories_url, 'mascots_categories', ub.callbackSimple);
                ub.loader(ub.current_material.mascot_groups_categories_url, 'mascots_groups_categories', ub.callbackSimple);
                
            // End Prep Mascots

            // Get Order Info 
            var _url = ub.endpoints.getFullUrlString('getOrderInfoByOrderID') + ub.config.orderID;

            $.ajax({
                
                url: _url,
                type: "Get",
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

                success: function (response) {

                    var _orderLink = ub.config.host + "/order/" + ub.config.orderID;

                    $('span.status').html(response.order.status);
                    $('a.view-submitted-design').attr('src', _orderLink);
                    $('a.view-submitted-design').attr('href', _orderLink);

                    $('a.view-submitted-design').html(_orderLink);

                }
                
            });

            // Get Order Items 
            var _url = ub.endpoints.getFullUrlString('getOrderItemsByOrderID') + ub.config.orderID;

            $.ajax({
                
                url: _url,
                type: "Get", 
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

                success: function (response) {

                    ub.funcs.displayOrderDetails(response.order[0]);
                    ub.data.orderInfo = response.order[0];

                    $('div.my-orders-loading').hide();

                    ub.funcs.hightlightItemInGroup('div.order-tabs > span.tab', 'span.tab[data-type="main-info"]');
                    ub.funcs.showTab('div.order-info', 'div.order-info.main-info');

                }
                
            });


            // Messages
            $.ajax({
                
                url: ub.endpoints.getFullUrlString('getMessagesByRecipientID') + ub.user.id,
                type: "Get", 
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

                success: function (response) {

                    ub.funcs.displayMessagesForOrder(response.messages, ub.config.orderID);

                }
                
            });


            // Custom Artwork Request
            ub.funcs.getCustomArtworRequestStatus(function (response, status) {

                $('span.custom-artwork-status').html(status);
                ub.funcs.processCustomArtworkRequestStatus(status);

            });

            // Get Orders w/ items
            ub.funcs.getOrdersWItems(function (response) {

                var _hasProcessedArtworks = false;

                if (typeof response.order_info.artworks[0] !== "undefined") {

                    var _parsedArtworks = JSON.parse(response.order_info.artworks[0].artworks);
                    
                    if (typeof _parsedArtworks === "string") { _parsedArtworks = JSON.parse(_parsedArtworks); }
                    _.each(_parsedArtworks, function (parsedArtwork) {

                        if(parsedArtwork.mascot_id !== null) {

                            var _orderLink = ub.config.host + "/order/" + ub.config.orderID;

                            _hasProcessedArtworks = true;
                            $('span.custom-artwork-status').html('Mascot Ready for Review');
                            $('span.last-message').html('You can now review to approve / reject the mascot/s you submitted for custom artwork processing in your design. <br /> Click this link to load the design: <a target="_new" href="' + _orderLink + '">' + _orderLink + '</a>');
                            $('span.last-message').show();

                        }

                    });

                }

                var _bc = JSON.parse(response.order_info.items[0].builder_customizations);
                var _applicationSrc = '';
                var _table = '<table class="">';
                var _applications = _bc.applications;
                var carColumnHeader = '<td>Mscot</td>';

                _table += '<thead><tr> <td>Application #</td> <td class="notes">Notes</td> <td>Images / Link</td> <td>Status / Mascot ID</td> <td class="custom-artwork-requests action"></td></tr> </thead>';

                _.each (_bc.applications, function (application) {

                    if (application.customLogo) {

                        var _extension = application.customFilename.substr(application.customFilename.length - 3);
                        var _validImages = ['png', 'jpg', 'bmp', 'gif'];

                        _applicationSrc = '<tr >';

                        _applicationSrc += '<td>';
                        _applicationSrc +=      application.code + "<br /><br />";
                        _applicationSrc += '</td>';

                        _applicationSrc += '<td class="notes">';
                        _applicationSrc +=      application.additionalNotes + "<br />";
                        _applicationSrc += '</td>';

                        _applicationSrc += '<td>';

                        if (_.contains(_validImages,_extension)) { _applicationSrc += "<img class='grow customFilename' data-src='" + application.customFilename + "' src='" + application.customFilename + "' /><br />"; }

                        _applicationSrc +=      "<a href='" + application.customFilename + "' target='new'>Open In New Tab</a><br />";
                        _applicationSrc += '</td>';

                        if (_hasProcessedArtworks) {

                            var _result = _.find(_parsedArtworks, {code: application.code });

                            _applicationSrc += '<td class="status">';

                            if (typeof _result !== "undefined") {

                                _applicationSrc += _result.mascot_id;

                            }

                            _applicationSrc += '</td>';

                            _applicationSrc += '<td class="custom-artwork-requests action">';
                            _applicationSrc +=      "<span class='btn approve-artwork' data-application-code='" + application.code + "'>Approve</span><br />";
                            _applicationSrc += '</td>';

                        } else {

                            _applicationSrc += '<td class="status">';
                            _applicationSrc +=      "Processing" + "<br />";
                            _applicationSrc += '</td>';

                            _applicationSrc += '<td class="custom-artwork-requests action">';
                            _applicationSrc +=      "";
                            _applicationSrc += '</td>';

                        }

                        _applicationSrc += "</tr>";

                        _table += _applicationSrc;

                    }
                    
                });

                _table += '</table>';

                $('span.custom-artwork-applications').html(_table);

                // Show View Design with the new mascot
                if (_hasProcessedArtworks) {

                    var _orderLink = ub.config.host + "/order/" + ub.config.orderID;
                    $('a.show-design').attr('href', _orderLink);

                } else {

                    // hide the link
                    $('div.link-row').hide();

                }

                // Approve Artwork
                $('span.btn.approve-artwork').unbind('click');
                $('span.btn.approve-artwork').on('click', function () {

                    var _applicationCode = $(this).data('application-code');

                });

                $('span.btn.approve-artwork').hide();

                $('img.customFilename, img.attachments').unbind('click');
                $('img.customFilename, img.attachments').on('click', function () {

                    var _dtSrc = $(this).attr('data-src');
                    var _str = "<img src ='" + _dtSrc + "' />";

                    ub.showModalTool(_str);

                });

            });

            ub.funcs.setupOrderInfoEvents();

        }

        ub.funcs.updateArtworkRequestStatus = function (data, cb) {

             $.ajax({
                
                url: ub.config.api_host + ub.endpoints.getFullUrlString('updateArtworkRequest'),
                type: "POST", 
                data: JSON.stringify(data),
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

                success: function (response) {

                }
                
            });

        }

        ub.funcs.getCustomArtworRequestStatus = function (cb) {

             $.ajax({
                
                url: ub.config.api_host + '/' + 'api/order/' + ub.config.orderCode + '/artworkStatus',
                type: "Get", 
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

                success: function (response) {

                    cb(response, response.order.artwork_status);

                }
                
            });

        }

        ub.funcs.getOrdersWItems = function (cb) {

             $.ajax({
                
                url: ub.endpoints.getFullUrlString('getOrdersWItems') + ub.config.orderCode,
                type: "Get", 
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

                success: function (response) {

                    cb(response);

                }
                
            });

        }

        if (ub.page === 'view-order-info') {

            $('div#main-picker-container').remove();
            $('body').css('background-image', 'none');

            if (!window.ub.user) { 
                ub.funcs.displayLoginForm(); 
                return;
            } 

            ub.funcs.viewOrderInfo();

        }

    /// End Order Info

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
