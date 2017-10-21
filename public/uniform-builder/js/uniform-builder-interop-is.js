$(document).ready(function() {

    // users

    // Load this from API
    window.is.embellishments = {

        items: [

            {

                id: 1,
                name: 'Default',
                design_id: 1722182,
                user_id: 771,
                png_filename: "https://stores.inksoft.com/images/publishers/10697/designs/1722182.front.480.png",
                svg_filename: "https://stores.inksoft.com/images/publishers/10697/designs/1722182.front.svg",
                thumbnail: "https://stores.inksoft.com/ProLook_Sports/JITImage/10697-1722182/front/FFFFFF/80.gif",
                design_summary: "",
                design_details: "",
                category: "Defaults", // Use this category for all the default embellishments when it will be moved to the backend
                type: "user_design",
                is_public: "1",
                created_by_user_id: "43",
                status: "Final Approval OK",
                comments: "",
                update_history: "",
                first_name: "Arthur",
                last_name: "Abogadil",
                cfirst_name: "Jared",
                clast_name: "Blanchard",

            },
            {

                id: 2,
                name: 'Default',
                design_id: 1722184,
                user_id: 771,
                png_filename: "https://stores.inksoft.com/images/publishers/10697/designs/1722182.front.480.png",
                svg_filename: "https://stores.inksoft.com/images/publishers/10697/designs/1722182.front.svg",
                thumbnail: "https://stores.inksoft.com/ProLook_Sports/JITImage/10697-1722182/front/FFFFFF/80.gif",
                design_summary: "",
                design_details: "",
                category: "Defaults", // Use this category for all the default embellishments when it will be moved to the backend
                type: "user_design",
                is_public: "1",
                created_by_user_id: "43",
                status: "Final Approval OK",
                comments: "",
                update_history: "",
                first_name: "Arthur",
                last_name: "Abogadil",
                cfirst_name: "Jared",
                clast_name: "Blanchard",

            },
            {

                id: 3,
                name: 'Default',
                design_id: 1722186,
                user_id: 771,
                png_filename: "https://stores.inksoft.com/images/publishers/10697/designs/1722182.front.480.png",
                svg_filename: "https://stores.inksoft.com/images/publishers/10697/designs/1722182.front.svg",
                thumbnail: "https://stores.inksoft.com/ProLook_Sports/JITImage/10697-1722182/front/FFFFFF/80.gif",
                design_summary: "",
                design_details: "",
                category: "Defaults", // Use this category for all the default embellishments when it will be moved to the backend
                type: "user_design",
                is_public: "1",
                created_by_user_id: "43",
                status: "Final Approval OK",
                comments: "",
                update_history: "",
                first_name: "Arthur",
                last_name: "Abogadil",
                cfirst_name: "Jared",
                clast_name: "Blanchard",

            },

        ],
        userItems: [],
        getEmbellismentsByType: function () {},
        getEmbellishmentByID: function (id) { ub.funcs.getDesignSummary(id); },
        getDefaultEmbellishment: function (_settingsObject) {

            // TODO: Have embellishment Samples for Each Sport Type
            var _embellishmentObj = _.first(this.items);
            return _.first(this.items);

        }

    };

    window.is.getDefaultEmbellishment = function () {

        var defaultEmbellishement

    }

    window.is.loadDesigner = function (designID, applicationID) {

        var _applicationID = typeof applicationID !== "undefined" ? applicationID : 0;
        var flashvars = {

            DesignerLocation: "https://images.inksoft.com/designer/html5",
            EnforceBoundaries: "1",
            Background: "",
            VectorOnly: true,
            DigitalPrint: false,
            ScreenPrint: true,
            Embroidery: false,
            MaxScreenPrintColors: "8",
            RoundPrices: false,
            StoreID: "80974",
            PublisherID: "10697",
            SessionID: "",
            SessionToken: "",
            CartRetailItemID: "",
            UserID: "1000001",
            UserName: "",
            UserEmail: "",
            DesignID: typeof designID !== "undefined" ? designID : "", // "1722139",
            DefaultProductID: "", // "1000000",
            DefaultProductStyleID: "", // "1000043",
            ProductID: "", // "1000000",
            ProductStyleID: "", // "1000043",
            ProductCategoryID: "",
            ClipArtGalleryID: "",
            DisableAddToCart: true,
            DisableUploadImage: false,
            DisableClipArt: false,
            DisableUserArt: true,
            DisableProducts: true,
            DisableDesigns: false,
            DisableDistress: true,
            DisableResolutionMeter: true,
            DisableUploadVectorArt: false,
            DisableUploadRasterArt: false,
            StartPage: "",
            StartPageCategoryID: "",
            StartPageHTML: "",
            StartBanner: "",
            OrderID: "",
            CartID: "",
            ArtID: "",
            FontID: "",
            Domain: "stores.inksoft.com",
            SSLEnabled: true,
            SSLDomain: "stores.inksoft.com",
            StoreURI: "ProLook_Sports",
            Admin: "",
            NextURL: "javascript:designID=0;window.is.isMessage(designID," + _applicationID + ");",
            CartURL: "https://stores.inksoft.com/ProLook_Sports/Cart",
            OrderSummary: true,
            VideoLink: "http://www.youtube.com/watch?v=EfXICdRwt4E",
            Phone: "801-404-4022",
            WelcomeScreen: "",
            ContactUsLink: "/ProLook_Sports/Stores/Contact",
            WelcomeVideo: "",
            GreetBoxSetting: "LANDING",
            HelpVideoOverview: "",
            AutoZoom: true,
            EnableNameNumbers: true,
            AddThisPublisherId: "xa-4fccb0966fef0ba7",
            EnableCartPricing: true,
            EnableCartCheckout: false,
            EnableCartBilling: false,
            EnableCartShipping: true,
            PaymentDisabled: false,
            PaymentRequired: true,
            BillingAddressRequired: true,
            PasswordLength: "4",
            DefaultCountryCode: "PH",
            CurrencyCode: "USD",
            CurrencySymbol: "$",
            HideProductPricing: false,
            PB: true,
            HideClipArtNames: false,
            HideDesignNames: false,
            ThemeName: "flat",
            FullScreen: true,
            Version: "3.11.0.0",
            BackgroundColor: "",
            StoreLogo: "//stores.inksoft.com/images/publishers/10697/stores/ProLook_Sports/img/logo.png",
            StoreName: "ProLook Sports.",
            StoreEmail: "jared@prolook.com",
            EnableEZD: false,
            EmbedType: "iframe",
            ArtCategoryID: "1000002",
            DesignCategoryID: "1000004"

        };

        launchDesigner('HTML5DS', flashvars, document.getElementById("embeddedDesigner"));

        $("#isModal").modal({                    // wire up the actual modal functionality and show the dialog
              "backdrop"  : "static",
              "keyboard"  : true,
              "show"      : false                // ensure the modal is shown immediately
        });

        var _isModalVisible = $('#isModal').is(':visible');

        if (_isModalVisible) {

           window.is.closeDesignStudio();

        } else {

            $('#isModal').modal('show');
            ub.status.render.stopRendering();

        }

    };

    window.is.loadDesignerUpload = function (designID, applicationID) {

        var _applicationID = typeof applicationID !== "undefined" ? applicationID : 0;
        var flashvars = {

            DesignerLocation: "https://images.inksoft.com/designer/html5",
            EnforceBoundaries: "1",
            Background: "",
            VectorOnly: true,
            DigitalPrint: false,
            ScreenPrint: true,
            Embroidery: false,
            MaxScreenPrintColors: "8",
            RoundPrices: false,
            StoreID: "80974",
            PublisherID: "10697",
            SessionID: "",
            SessionToken: "",
            CartRetailItemID: "",
            UserID: "1000001",
            UserName: "",
            UserEmail: "",
            DesignID: typeof designID !== "undefined" ? designID : "", // "1722139",
            DefaultProductID: "", // "1000000",
            DefaultProductStyleID: "", // "1000043",
            ProductID: "", // "1000000",
            ProductStyleID: "", // "1000043",
            ProductCategoryID: "",
            ClipArtGalleryID: "",
            DisableAddToCart: true,
            DisableUploadImage: false,
            DisableClipArt: true,
            DisableUserArt: true,
            DisableProducts: true,
            DisableDesigns: true,
            DisableDistress: true,
            DisableResolutionMeter: true,
            DisableUploadVectorArt: false,
            DisableUploadRasterArt: false,
            StartPage: "",
            StartPageCategoryID: "",
            StartPageHTML: "",
            StartBanner: "",
            OrderID: "",
            CartID: "",
            ArtID: "",
            FontID: "",
            Domain: "stores.inksoft.com",
            SSLEnabled: true,
            SSLDomain: "stores.inksoft.com",
            StoreURI: "ProLook_Sports",
            Admin: "",
            NextURL: "javascript:designID=0;window.is.isMessage(designID," + _applicationID + ");",
            CartURL: "https://stores.inksoft.com/ProLook_Sports/Cart",
            OrderSummary: true,
            VideoLink: "http://www.youtube.com/watch?v=EfXICdRwt4E",
            Phone: "801-404-4022",
            WelcomeScreen: "",
            ContactUsLink: "/ProLook_Sports/Stores/Contact",
            WelcomeVideo: "",
            GreetBoxSetting: "LANDING",
            HelpVideoOverview: "",
            AutoZoom: true,
            EnableNameNumbers: true,
            AddThisPublisherId: "xa-4fccb0966fef0ba7",
            EnableCartPricing: true,
            EnableCartCheckout: false,
            EnableCartBilling: false,
            EnableCartShipping: true,
            PaymentDisabled: false,
            PaymentRequired: true,
            BillingAddressRequired: true,
            PasswordLength: "4",
            DefaultCountryCode: "PH",
            CurrencyCode: "USD",
            CurrencySymbol: "$",
            HideProductPricing: false,
            PB: true,
            HideClipArtNames: false,
            HideDesignNames: false,
            ThemeName: "flat",
            FullScreen: true,
            Version: "3.11.0.0",
            BackgroundColor: "",
            StoreLogo: "//stores.inksoft.com/images/publishers/10697/stores/ProLook_Sports/img/logo.png",
            StoreName: "ProLook Sports.",
            StoreEmail: "jared@prolook.com",
            EnableEZD: false,
            EmbedType: "iframe",
            ArtCategoryID: "1000002",
            DesignCategoryID: "1000004"

        };

        launchDesigner('HTML5DS', flashvars, document.getElementById("embeddedDesigner"));

        $("#isModal").modal({                    // wire up the actual modal functionality and show the dialog
              "backdrop"  : "static",
              "keyboard"  : true,
              "show"      : false                // ensure the modal is shown immediately
        });

        var _isModalVisible = $('#isModal').is(':visible');

        if (_isModalVisible) {

           window.is.closeDesignStudio();

        } else {

            $('#isModal').modal('show');
            ub.status.render.stopRendering();

        }

    };

    $('span.art-btn').unbind('click');
    $('span.art-btn, div#cancel-art').on('click', function () {

       window.is.loadDesigner();

    });

    window.is.closeDesignStudio = function () {

        $('#isModal').modal('hide');
        $('div#embeddedDesigner').html('');

        ub.status.render.resumeRendering();
        window.ub.render_frames();

    }

    window.is.openDesignEdit = function (storeId, userId, designId, artId, storeAdmin) {
        $overlay = $('#ajax-Page-overlay');
        $overlay.fadeIn(); 
        serializedData = "StoreId=" + storeId + "&UserId=" + userId + "&DesignId=" + designId + "&ArtId=" + artId;
        if (storeAdmin == "1")
            serializedData += "&StoreAdmin=Store";
        $.ajax({
            url: "https://stores.inksoft.com/ProLook_Sports/Config/EditDesignInStudio",
            type: "POST",
            data: serializedData,                        
            success: function (response, textStatus, jqXHR) {
                $("#divDesignerContainerCustomerDesign").html(response);
                $("html, body").animate({ scrollTop: 0 }, "slow");
                $("#DivSearchResult").slideUp(500);
            },
            error: function (jqXHR, textStatus, errorThrown) {   
                $("#errorbox").show();
            },
            complete: function () {
                $overlay.fadeOut();
            }
        });
    };

    window.is.createSession = function () { /* TODO: Fill this in ... */ };

    ub.funcs.updateEmbellishmentData = function () { /* TODO: Fill this in ... */ }    

    ub.funcs.createNewEmbellishmentData = function (obj) {

        var _postData;
        var _url = ub.endpoints.getFullUrlString('createNewEmbellishmentData');

        _postData = {

            design_id: obj.designSummary.DesignID,
            design_name: obj.designSummary.Name,
            user_id: (typeof ub.user.id !== "undefined") ? ub.user.id : 2, 
            created_by_user_id: (typeof ub.user.id !== "undefined") ? ub.user.id : 2, 
            design_summary: JSON.stringify(obj.designSummary),
            design_details: JSON.stringify(obj.designDetails),
            png_filename: ub.data.inkSoftBaseURL + obj.designSummary.Canvases[0].PngRelativeUrl,
            svg_filename: ub.data.inkSoftBaseURL + obj.designSummary.Canvases[0].SvgRelativeUrl,
            thumbnail: ub.data.inkSoftBaseURL + obj.designSummary.Canvases[0].ThumbnailRelativeUrl,
            type: "User Design",
            category: "User Design",
            is_public: 0,
            status: 'In Development',
            archived: 0,

        };

        $.ajax({
            
            url: _url,
            type: "POST", 
            data: JSON.stringify(_postData),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
            success: function (response) { ub.utilities.info('Created Embellisment Data ...'); }
            
        });

    }

    window.is.isMessage = function (designID, applicationID) {

        ub.data.embellismentDetails = {
            designSummary: {},
            designSummaryLoaded: false, 
            designDetails: {},
            designDetailsLoaded: false,

            setStatus: function (varName, value) {

                ub.data.embellismentDetails[varName] = value;
                ub.data.embellismentDetails[varName + 'Loaded'] = true;

                if (this.designSummaryLoaded && this.designDetailsLoaded) {
                    ub.funcs.createNewEmbellishmentData(ub.data.embellismentDetails);
                }

            }
        }

        window.is.closeDesignStudio();
        ub.funcs.getDesignSummary(designID, applicationID);
        ub.funcs.getDesignDetails(designID, applicationID);

    }

    window.is.addDesignToUniform = function (response, applicationID) {

        if (typeof ub.objects.front_view.decal_1 !== "undefined") {
            ub.front_view.removeChild(ub.objects.front_view.decal_1);
            delete ub.objects.front_view.decal_1;
        }

        var _usePNG = true;
        var _svgFilename = ub.data.inkSoftBaseURL + response.Canvases[0].PngRelativeUrl;
        var _name = 'decal_1';
        var shape = ub.pixi.new_sprite(_svgFilename);
        var current_view_objects = ub.objects['front_view'];
        var current_object;
        var mask; 

        current_view_objects[_name] = ub.pixi.new_sprite(_svgFilename);
        current_object = current_view_objects[_name];

        current_object.zIndex = ub.funcs.generateZindex('namedrops') * (-1); 
        
        //current_object.scale.set(0.3,0.3); // for SVG 
        current_object.scale.set(0.7,0.7); // for PNG
        current_object.position = {x: 500, y: 400};
        current_object.anchor = {x: 0.5, y: 0.5};

        ub.front_view.addChild(current_object);
        ub.objects.front_view.decal_1 = current_object;

        mask = _.find(ub.current_material.material.options, {
            perspective: 'front_view',
            name: 'Extra',
        });

        if (typeof mask !== "undefined") {
            var shape_mask = ub.pixi.new_sprite(mask);
            current_object.mask = shape_mask
        }

        ub.updateLayersOrder(ub['front_view']);

    }

    ub.funcs.getDesignSummary = function (designID, applicationID) {

        var _url = 'http://stores.inksoft.com/GetDesignSummary/80974/' + designID;
        var _settingsObject = ub.funcs.getApplicationSettings(applicationID);

        $.ajax({
            
            url: _url,
            type: "GET", 
            dataType: "json",
            crossDomain: true,
            success: function (response) {

                var _embellishmentOBJ = {

                    id: 2,
                    design_id: designID,
                    name: response.Name,
                    user_id: typeof ub.user !== "undefined" ? ub.user.id : -1,
                    png_filename: ub.data.inkSoftBaseURL + response.Canvases[0].PngRelativeUrl,
                    svg_filename: ub.data.inkSoftBaseURL + response.Canvases[0].SvgRelativeUrl,
                    thumbnail: ub.data.inkSoftBaseURL + response.Canvases[0].ThumbnailRelativeUrl,
                    design_summary: JSON.stringify(response),
                    design_details: "",
                    category: "Defaults", // Use this category for all the default embellishments when it will be moved to the backend
                    type: "user_design",
                    is_public: "1",
                    created_by_user_id: "43",
                    status: "Final Approval OK",
                    comments: "",
                    update_history: "",
                    first_name: "Arthur",
                    last_name: "Abogadil",
                    cfirst_name: "Jared",
                    clast_name: "Blanchard",

                };

                _settingsObject.embellishment = _embellishmentOBJ;
                ub.funcs.update_application_embellishments(_settingsObject.application, _settingsObject.embellishment); 
                ub.data.embellismentDetails.setStatus('designSummary', response);

            }
            
        });

    }

    ub.funcs.getDesignDetails = function (designID, applicationID) {

        var _url = 'https://stores.inksoft.com/ProLook_Sports/Api2/GetDesignDetail?designId=' + designID + '&Format=JSON';
        
        $.ajax({
            
            url: _url,
            type: "GET", 
            dataType: "json",
            crossDomain: true,
            success: function (response) {
                ub.data.embellismentDetails.setStatus('designDetails', response);
            }
            
        });

    }

    ub.funcs.update_application_embellishments = function (application, embellishment, options) {

        var settings = ub.current_material.settings;
        var application_embellishment_code = application.id + '_' + embellishment.id;
        var scale_settings;
        var _status;

        if(typeof settings.applications[application.id] !== 'undefined'){
            scale_settings = settings.applications[application.id].scale;            
        }

        var settings_obj = settings.applications[application.id];
        var embellishment_obj = settings_obj.embellishment;
        var view = ub[application.perspective + '_view'];
        var view_objects = ub.objects[application.perspective + '_view'];
        var input_object = {

            application: application,
            embellishment: embellishment,
            fromChangeColor: (typeof options !== "undefined"),

        };

        var sprite_collection = ub.funcs.renderApplication($.ub.create_embellishment, input_object, application.id);
        var uniform_type = ub.current_material.material.type;
        var app_containers = ub.current_material.containers[uniform_type].application_containers;
        var sprite = sprite_collection;  

        app_containers[application.id] = {};
        app_containers[application.id].object = {

            sprite: sprite_collection, 

        };

        _status = settings_obj.status;

        if (typeof settings_obj.status === "undefined") {
            _status = "on";
        }

        ub.funcs.toggleApplication(application.id, _status); 
        ub.funcs.activateEmbellishments(application.id);

    };

    ub.funcs.activateEmbellishments = function (application_id) {

        if (ub.funcs.popupsVisible()) { return; }
        if (!ub.funcs.okToStart())    { return; }

        ub.funcs.activatePanelGuard();

        var _appInfo = ub.funcs.getApplicationSettings(application_id);

        ub.funcs.activateMoveTool(application_id);

        if (_appInfo.application_type !== "embellishments") {
            ub.funcs.activateApplications(application_id);
            return;
        }

        if (ub.funcs.isBitFieldOn()) {

            var _marker = _.find(ub.data.markerBitField, {value: true});

            if (_marker.code.toString() !== application_id.toString()) {
                return;
            }

        }

        $('div#changeApplicationUI').remove();

        var _id                 = application_id.toString();
        var _settingsObject     = _.find(ub.current_material.settings.applications, {code: _id});
        var _applicationType    = _settingsObject.application_type;
        var _uniformCategory    = ub.current_material.material.uniform_category;
        var _alias              = ub.data.sportAliases.getAlias(_uniformCategory);
        var _sizes              = ub.funcs.getApplicationSizes(_applicationType, _alias.alias);
        var _isFreeFormEnabled  = ub.funcs.isFreeFormToolEnabled(_id);


        // Change This for Embellishment Specific Size Settings   

            if (ub.current_material.material.uniform_category === "Football") {

                if (_id === '2' && _applicationType === 'mascot') {
                    _sizes = ub.funcs.getApplicationSizes('mascot_2');            
                }

                if (_id === '5' && _applicationType === 'mascot') {
                    _sizes = ub.funcs.getApplicationSizes('mascot_5');            
                }

            } else if (ub.current_material.material.uniform_category === "Wrestling") {

                _sizes = ub.funcs.getApplicationSizes('mascot_wrestling');

            } else if (_uniformCategory !== "Football" && _uniformCategory !== "Wrestling" && typeof _alias !== "undefined") {
                
                if (ub.funcs.isCurrentType('upper')) {
                    
                    _sizes = ub.data.applicationSizes.getSizes(_alias.alias, 'mascot', parseInt(application_id));

                } else if (ub.funcs.isCurrentType('lower') && _uniformCategory === "Crew Socks (Apparel)" ) {

                    _sizes = ub.funcs.getApplicationSizes(_applicationType, _alias.alias, _id);

                } else {

                    _sizes = ub.funcs.getApplicationSizesPant(_applicationType, _alias.alias, _id);

                }

            } else {

                console.warn('no sizes setting defaulting to generic');
                _sizes        = ub.funcs.getApplicationSizes(_applicationType);    

            }

        // End Change This for Embellishment Specific Size Settings

        var _embellishmentObj   = _settingsObject.embellishment;
        var _currentSize        = _settingsObject.size;
        var _colorArray         = _settingsObject.color_array;
        var _mascotName         = _embellishmentObj.design_id;
        var _mascotIcon         = _embellishmentObj.thumbnail;
        var _title              = _applicationType.toTitleCase();
        var _htmlBuilder        = "";
        var _appActive          = 'checked';
        var _maxLength          = 12;

        ub.funcs.deactivatePanels();
        ub.funcs.preProcessApplication(application_id);
        
        if (_settingsObject.type.indexOf('number') !== -1) { _maxLength = 2; }

        var _status = 'on';
        if (typeof _settingsObject.status !== 'undefined') { var _status = _settingsObject.status; } 

        _htmlBuilder        =  '<div id="applicationUI" data-application-id="' + _id + '">';
        _htmlBuilder        +=      '<div class="header">';
        _htmlBuilder        +=      '<div class="toggle" data-status="' + _status + '"><div class="valueContainer"><div class="toggleOption on">ON</div><div class="toggleOption off">OFF</div></div></div>';
        _htmlBuilder        +=      '<div class="applicationType">' + _title + ' (Beta) <span class="changeApplicationType"><i class="fa fa-caret-down" aria-hidden="true"></i></span></div><span class="cog"><i class="fa fa-cog" aria-hidden="true"></i></span></div>';
        _htmlBuilder        +=      '<div class="body">';
        _htmlBuilder        +=          '<div class="cover"></div>';

        _htmlBuilder        +=          '<div class="ui-row">';

        _htmlBuilder        +=              '<label class="applicationLabels font_name">Embellishment</label>';
        _htmlBuilder        +=              '<span class="fontLeft" data-direction="previous" style="opacity: 0;"><i class="fa fa-chevron-left" aria-hidden="true"></i></span>';                       
        _htmlBuilder        +=              '<span class="font_name" style="font-size: 1.2em; font-family: ' + _mascotName + ';">' + _settingsObject.embellishment.name + '</span>';                       
        _htmlBuilder        +=              '<span class="fontRight" data-direction="next"  style="opacity: 0;"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>';

        _htmlBuilder        +=          '</div>';

        _htmlBuilder        +=          '<div class="ui-row">';

        var _label = 'Size';
        var _class = '';
        if (_isFreeFormEnabled) { 
            _label = 'Measurements'; _class = "custom"; 
        }
        _htmlBuilder        +=              '<label class="applicationLabels font_size ' + _class + '">' + _label + '</label>'; 

        var _inputSizes;

        if (_id === '4') {

            _inputSizes = [{size: '0.5', }];

        } else {

            _inputSizes = ['4'];

        }

        if (typeof _settingsObject.size === 'undefined') {

            if (application_id !== 2 || application_id !== 5) {
                _settingsObject.size = 4;
            } else {
                _settingsObject.size = 10;
            }

            if (application_id === 4) {
                _settingsObject.size = 0.5;
            }

        }
   
        _htmlBuilder += ub.funcs.generateSizes(_applicationType, _inputSizes, _settingsObject, _id);

        _htmlBuilder        +=          '</div>';

        _htmlBuilder        +=          '<div class="clearfix"></div>';

        _htmlBuilder        +=          '<div class="ui-row">';
        _htmlBuilder        +=              '<div class="column1 column1-embellishments">'

        _htmlBuilder        +=              '<div class="sub1">';
        _htmlBuilder        +=                  '<br />';        
        _htmlBuilder        +=                  '<span class="accentThumb embellishmentThumb"><img src="' + _mascotIcon + '"/></span><br />';                                                             
        _htmlBuilder        +=                  '<span class="accent">' + _settingsObject.embellishment.name + ' (' + _settingsObject.embellishment.design_id + ')' + '</span>';  
        _htmlBuilder        +=                  ' | ';        
        _htmlBuilder        +=                  '<a class="filePreview" target="_new" href="' + _settingsObject.embellishment.svg_filename + '">' + 'View Print Ready File' + '</a>';  

        if (_settingsObject.embellishment.name === 'Custom Logo') {

            _htmlBuilder        +=                  '<a class="view-file" data-file="' + _settingsObject.customFilename + '" target="_new">View File</a>';
            _htmlBuilder        +=                  '<br /><br />';

        }

        _htmlBuilder        +=                  '<span class="flipButton">Flip</span>'; 
       
        _htmlBuilder        +=              '</div>';

        _htmlBuilder        +=              '</div>';

        _htmlBuilder        +=          '<div class="ui-row">';
        _htmlBuilder        +=              '<div class="colorContainer embellishment-buttons-container">';

        _htmlBuilder        +=                  '<span class="btn edit-embellishment">Edit Current</span>';
        _htmlBuilder        +=                  '<span class="btn select-embellishment">Upload File (.ai, etc)</span>';
        _htmlBuilder        +=                  '<span class="btn new-embellishment">Create New</span>';

        _htmlBuilder        +=              '</div">';


        _htmlBuilder        +=          '</div>';

        _htmlBuilder        +=          '</div>';
        _htmlBuilder        +=      '</div>';
        _htmlBuilder        +=  '</div>';
        
        $('.modifier_main_container').append(_htmlBuilder);
        $('a.view-file').unbind('click');
        $('a.view-file').on('click', function () {

            var _file = $(this).data('file');
            var _extension = util.getExtension(_file);
            var _str = "";

            if (_extension === "pdf" || _extension === "ai" ) {

                _str     += "Open File (" + _extension + ") on a new window<br />";
                _str     += "<a class='displayFilename' target='_new' href = '" + _file + "'>" + _file + "</a>";

            } else {

                _str     += "<img src ='" + _file + "' /> <br />";
                _str     += "<a class='displayFilename' target='_new' href = '" + _file + "'>" + _file + "</a>";

            }

            ub.showModalTool(_str);
            
        });

        // Events 

            // Embellishment Events 

                $('span.edit-embellishment').unbind('click');
                $('span.edit-embellishment').on('click', function () {

                    is.loadDesigner(_settingsObject.embellishment.design_id, _id);

                });

                $('span.new-embellishment').unbind('click');
                $('span.new-embellishment').on('click', function () {

                    is.loadDesigner(undefined, _id);

                });

                $('span.select-embellishment').unbind('click');
                $('span.select-embellishment').on('click', function () {

                    is.loadDesignerUpload(undefined, _id);

                });

            // End Embellishment Events


            // In-place preview 

            if (_settingsObject.embellishment.name === 'Custom Logo' && typeof _settingsObject.customFilename !== "undefined") {

                var _filename  = _settingsObject.customFilename;
                var _extension = _filename.split('.').pop();

                $prevImage = $('span.accentThumb > img');
    
                if (_extension === 'gif' || _extension === 'jpg' || _extension === 'bmp' || _extension === 'png' || _extension === 'jpeg') {

                    $prevImage.attr('src', _filename);                        

                } else if (_extension === 'pdf') {

                    $prevImage.attr('src', '/images/uiV1/pdf.png');

                } else if (_extension === 'ai') {

                    $prevImage.attr('src', '/images/uiV1/ai.png');

                } 

            }

            $('span.inPlacePreviewButton').unbind('click');
            $('span.inPlacePreviewButton').on('click', function (){

                if (!$(this).hasClass('active')){

                    $(this).addClass('active');

                } else {

                    $(this).removeClass('active');

                }
                
            });

            // End In-place preview

            ub.funcs.updateCoordinates(_settingsObject);

            var s       = ub.funcs.getPrimaryView(_settingsObject.application);
            var sObj    = ub.funcs.getPrimaryViewObject(_settingsObject.application);

            if (typeof sObj.application.flip !== "undefined") {

                if (sObj.application.flip === 1) {
                    $('span.flipButton').addClass('active');    
                } else {
                    $('span.flipButton').removeClass('active');    
                }
                
            } else {
                $('span.flipButton').removeClass('active');
            }

            $('span.flipButton').unbind('click');
            $('span.flipButton').on('click', function () {

                var _settingsObject         = _.find(ub.current_material.settings.applications, {code: _id});
                ub.funcs.flipMascot(_settingsObject);
                
            });

            $('div.applicationType').on('click', function () {

                if ($('div#changeApplicationUI').length > 1) {

                    var _status = $('div#changeApplicationUI').data('status');

                    if (_status === 'visible') {

                        $('div#changeApplicationUI').hide().data('status', 'hidden');
                        $('div.applicationType').removeClass('toggledApplicationType');
                        
                    } else {

                        $('div#changeApplicationUI').fadeIn().data('status', 'visible');
                        $('div.applicationType').addClass('toggledApplicationType');

                    }

                    return;

                }

                var _settingsObject         = _.find(ub.current_material.settings.applications, {code: _id});
                var _validApplicationTypes  = _settingsObject.validApplicationTypes;

                _htmlBuilder        =  '<div id="changeApplicationUI" data-status="hidden" data-application-id="' + _id + '">';
                _htmlBuilder        +=      '<div class="header">';
                _htmlBuilder        +=      '<div class="">Select Application Type for Location <strong>#' + _id + '</strong></div>';
                _htmlBuilder        +=      '<div class="close-popup closeApplicationChanger"><i class="fa fa-times" aria-hidden="true"></i></div>';
                _htmlBuilder        +=      '<div class="body">';

                var _deactivated ='';
                var _currentlySelectedType = '';
                var _selected = ''

                if (!_.contains(_validApplicationTypes, 'number')) { _deactivated = 'deactivatedOptionButton'; }
                if (_applicationType === 'front_number' || _applicationType === 'back_number' ) { _currentlySelectedType = 'currentlySelectedType'; _selected = '(current)'; }

                _htmlBuilder        +=           '<div data-type="player_number" class="optionButton ' + _deactivated + ' ' + _currentlySelectedType + '">';
                _htmlBuilder        +=                 '<div class="icon">' + '<img src="/images/main-ui/icon-number-large.png">' + '</div>';
                _htmlBuilder        +=                 '<div class="caption">Player Number ' + _selected + '</div>';
                _htmlBuilder        +=           '</div>';
                _deactivated ='';
                _currentlySelectedType = '';
                _selected = '';

                if (!_.contains(_validApplicationTypes, 'team_name')) { _deactivated = 'deactivatedOptionButton'; } 
                if (_applicationType === 'team_name') { _currentlySelectedType = 'currentlySelectedType'; _selected = '(current)'; }

                _htmlBuilder        +=           '<div data-type="team_name" class="optionButton ' + _deactivated + ' ' + _currentlySelectedType + '">';
                _htmlBuilder        +=                 '<div class="icon">' + '<img src="/images/main-ui/icon-text-large.png">' + '</div>';
                _htmlBuilder        +=                 '<div class="caption">Team Name ' + _selected + '</div>';                
                _htmlBuilder        +=           '</div>';

                _htmlBuilder        +=           '<br />';
                _deactivated = '';
                _currentlySelectedType = '';
                _selected = '';

                if (!_.contains(_validApplicationTypes, 'player_name')) { _deactivated = 'deactivatedOptionButton'; } 
                if (_applicationType === 'player_name') { _currentlySelectedType = 'currentlySelectedType'; _selected = '(current)'; }

                _htmlBuilder        +=           '<div data-type="player_name" class="optionButton ' + _deactivated + ' ' + _currentlySelectedType + '">';
                _htmlBuilder        +=                 '<div class="icon">' + '<img src="/images/main-ui/icon-text-large.png">' + '</div>';
                _htmlBuilder        +=                 '<div class="caption">Player Name ' + _selected + '</div>';
                _htmlBuilder        +=           '</div>';
                _deactivated = '';
                _currentlySelectedType = '';
                _selected = '';

                if (!_.contains(_validApplicationTypes, 'logo')) { _deactivated = 'deactivatedOptionButton'; }
                if (_applicationType === 'mascot') { _currentlySelectedType = 'currentlySelectedType'; _selected = '(current)'; }

                _htmlBuilder        +=           '<div data-type="mascot" class="optionButton ' + _deactivated + ' ' + _currentlySelectedType + '">';
                _htmlBuilder        +=                 '<div class="icon">' + '<img src="/images/main-ui/icon-mascot-large.png">' + '</div>';
                _htmlBuilder        +=                 '<div class="caption">Mascot ' + _selected + '</div>';
                _htmlBuilder        +=           '</div>';

                if (ub.config.uniform_application_type !== "sublimated") {
                    if (!_.contains(_validApplicationTypes, 'embellishments')) { _deactivated = 'deactivatedOptionButton'; }    
                }

                _htmlBuilder        +=           '<div class="optionButton ' + _deactivated + '" data-type="embellishments">';
                _htmlBuilder        +=                 '<div class="icon">' + '<img src="/images/main-ui/icon-embellishments-large.png">' + '</div>';
                _htmlBuilder        +=                 '<div class="caption">Embellishments</div>';
                _htmlBuilder        +=           '</div>';

                _htmlBuilder        +=      '</div>';
                _htmlBuilder        += "</div>";
                _deactivated = '';
                _currentlySelectedType = '';
                _selected = '';

                $('.modifier_main_container').append(_htmlBuilder);
                $('div#changeApplicationUI').fadeIn().data('status', 'visible');
                $('div.applicationType').addClass('toggledApplicationType');

                $('div.optionButton').on('click', function () {

                    if ($(this).hasClass('deactivatedOptionButton')) { return; }

                    var _type = $(this).data('type');

                    ub.funcs.changeApplicationType(_settingsObject, _type);
                    $('div#changeApplicationUI').remove();

                });

                $('div.closeApplicationChanger').on('click', function () {

                    $('div#changeApplicationUI').hide().data('status', 'hidden');
                    $('div.applicationType').removeClass('toggledApplicationType');

                });

            });

            var _matchingID = undefined;
            
            _matchingID = ub.data.matchingIDs.getMatchingID(_id);
            if (typeof _matchingID !== "undefined") {

                ub.funcs.toggleApplication(_matchingID.toString(), _status); 

            }
 
            $('span.font_size').on('click', function () {

                var _selectedSize = $(this).data('size');
                $('.font_size').removeClass('active');
                $(this).addClass('active');

                var _isCustom = $(this).hasClass('custom');
                var _isScale = $(this).hasClass('scale');
                var _isRotate = $(this).hasClass('rotate');
                var _isMove = $(this).hasClass('move');
                
                if (_isCustom && _isScale) {

                    ub.funcs.initializeScalePanel(_settingsObject, _applicationType);
                    return;

                }

                if (_isCustom && _isMove) {

                    ub.funcs.initializeMovePanel(_settingsObject, _applicationType);
                    return;

                }

                if (_isCustom && _isRotate) {

                    ub.funcs.initializeRotatePanel(_settingsObject, _applicationType);
                    return;

                }

                var oldScale = ub.funcs.clearScale(_settingsObject);
                _settingsObject.oldScale = oldScale;

                ub.funcs.changeMascotSize(_selectedSize, _settingsObject);

                var _matchingID = undefined;
                _matchingID = ub.data.matchingIDs.getMatchingID(_id);

                if (typeof _matchingID !== "undefined") {

                    var _matchingSettingsObject     = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});
                    ub.funcs.changeMascotSize(_selectedSize, _matchingSettingsObject);

                }

            });

            $('span.font_name').on('click', function () {

                is.loadDesigner(_settingsObject.embellishment.design_id, _id);

            });

            $('span.accentThumb, span.accent').on('click', function () {

                is.loadDesigner(_settingsObject.embellishment.design_id, _id);
                //ub.funcs.createEmbellishmentPopup(_title, _embellishmentObj, _settingsObject);

            });

            $('span.colorItem').on('click', function () {

                var _layer_no   = $(this).data('layer-no');
                var _color_code = $(this).data('color-code');
                var _layer_name = $(this).data('layer-name');
                var _temp = $(this).data('temp');
                var _colorObj = ub.funcs.getColorByColorCode(_color_code);

                var _oldVal = {

                    layerNo: _layer_no,
                    color: _settingsObject.color_array[_layer_no - 1],
                    applicationCode: _settingsObject.code,

                }

                if (_temp !== 'undo') {

                    ub.funcs.pushOldState('color change', 'application', _settingsObject, _oldVal);
                    
                }

                ub.funcs.changeMascotColor(_colorObj, _layer_no, _settingsObject); 
                ub.funcs.changeActiveColorSmallColorPicker(_layer_no, _color_code, _colorObj);

                var _processMatchingSide = true;
                var _matchingID = undefined;
                var _matchingSettingsObject = undefined;

                _matchingID = ub.data.matchingIDs.getMatchingID(_id);

                if (typeof _matchingID !== "undefined") {
                    _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});    
                }
                
                // On Crew Socks, only change the color of the matching side if its the same mascot id
                if (typeof _matchingSettingsObject !== "undefined") {
                    
                    if (_matchingSettingsObject.type !== "free" && ub.funcs.isCurrentSport("Crew Socks (Apparel)")) { 
                    
                        _processMatchingSide = false; 
                        
                    }
                    
                    if (typeof _settingsObject.mascot === "object" && typeof _matchingSettingsObject.mascot === "object") {
                        
                        if (_settingsObject.mascot.id === _matchingSettingsObject.mascot.id) { 
                            _processMatchingSide = true; 
                        }

                    }

                }

                if (typeof _matchingID !== "undefined") {
        
                    if(_processMatchingSide) {

                        ub.funcs.changeMascotColor(_colorObj, _layer_no, _matchingSettingsObject); 

                    }

                }
   
            });

        // End Small Color Pickers

        // End Events

        $("div.toggleOption").unbind('click');
        $("div.toggleOption").on("click", function () {

            var _currentStatus = $('div.toggle').data('status');
            var s;

            if(_currentStatus === "on") {
                s = 'off';
            }
            else {
                s = 'on';
            }

            if (s === "on") { ub.funcs.LSRSBSFS(parseInt(_id)); }

            ub.funcs.toggleApplication(_id,s);    

            var _matchingSide;
            var _matchingID = undefined;
            var _processMatchingSide = true;
            var _matchingSettingsObject = undefined;
            
            _matchingID = ub.data.matchingIDs.getMatchingID(_id);

            if (typeof _matchingID !== "undefined") {

                _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});
                
            }
            
            if (typeof _matchingSettingsObject !== "undefined") {

                if (typeof _settingsObject.mascot === "object" && typeof _matchingSettingsObject.mascot === "object") {
                            
                    // Toggle matching mascot if the same mascot is selected 
                    _processMatchingSide = _settingsObject.mascot.id === _matchingSettingsObject.mascot.id

                }

            }

            if (typeof _matchingID !== "undefined") {

                if (_processMatchingSide) { ub.funcs.toggleApplication(_matchingID,s); }
                
            }

        });

        $('div#applicationUI').fadeIn();
        ub.funcs.activateMoveTool(application_id);
        ub.funcs.activateLayer(application_id);
        ub.funcs.toggleApplication(_id, _status);
        
        // Is this needed ??? 
        // ub.funcs.afterActivateMascots(_id);

    }

    // ub.status.embellishmentPopupVisible = false;
    ub.funcs.createEmbellishmentPopup = function (applicationType, mascot, settingsObj) {

        var mascot_category = undefined;
        var mascots_group_category = undefined;

        mascot_category = _.find(ub.data.mascots_categories, {name: mascot.category});
        mascots_group_category = _.find(ub.data.mascots_groups_categories, { name: mascot_category.group_name });

        ub.status.mascotPopupVisible = true;

        var sampleSize = '1.9em';
        var paddingTop = '40px';

        var data = {
            label: 'Choose Mascot: ',
            mascots: _.filter(ub.data.mascots, {active: "1", category: 'Bulldogs'}),
            categories: _.sortBy(ub.data.mascots_categories, 'name'),
            groups_categories: _.sortBy(ub.data.mascots_groups_categories, 'name'),
            paddingTop: paddingTop,
        };

        var template = $('#m-new-mascot-popup').html();
        var markup = Mustache.render(template, data);

        $('body').append(markup);

        $popup = $('div#primaryMascotPopup');
        $popup.fadeIn();

        $('div.patternPopupResults > div.item').hover(

          function() {
            $( this ).find('div.name').addClass('pullUp');
          }, function() {
            $( this ).find('div.name').removeClass('pullUp');
          }

        );

        var $myMascotItem = $('span.groups_category_item[data-category-name="My Mascots"]');
        if (typeof ub.user.id !== "number")  {

            $myMascotItem.hide();

        } else {

            var _appendage = "<br /><em>Mascots that went through custom artwork requests will appear on the [My Mascots] category after we have processed it, so that you can use it on your other designs.</em>";
            $myMascotItem.append(_appendage);

        }

        /// Type Ahead

        var _mascotNames = _.pluck(ub.data.mascots, "name");

        $('input.mascot_search').typeahead({
          hint: true,
          highlight: true,
          minLength: 1
        },
        {
          name: 'Mascots',
          source: ub.funcs.substringMatcher(_mascotNames),
        });

        $('.patternPopupResults').isotope({
          // options
          itemSelector: '.item',
          layoutMode: 'fitRows'
        });

        $('.patternPopupResults').isotope({ filter: '.all' });

        $('input.mascot_search').on('change', function (){

            var _term = $(this).val().toLowerCase();
            var _mascots = _.filter(ub.data.mascots, function(mascot){ return mascot.name.toLowerCase().indexOf(_term.toLowerCase()) !== -1; });

            var data = {
                category: '',
                mascot_category_id: '',
                mascots: _mascots,
            };

            var template = $('#m-new-mascot-items').html();
            var markup = Mustache.render(template, data);

            $('div.main-content').scrollTo(0);
            $('div.patternPopupResults').html(markup);

             $('div.patternPopupResults > div.item').on('click', function () {

                var _id = $(this).data('mascot-id');

                ub.funcs.changeMascotByID(_id, settingsObj);

            });

        });

        $('span.category_item').on('click', function (){

            var _dataCategory = $(this).data('category');
            
            $('.patternPopupResults').isotope({ filter: "." + _dataCategory });

            $('span.category_item').removeClass('active_category');
            $(this).addClass('active_category');

            $('div.patternPopupResults > div.item').hover(

                function() {
                  $( this ).find('div.name').addClass('pullUp');
                }, function() {
                  $( this ).find('div.name').removeClass('pullUp');
                }

            );

        });

        /// End Type Ahead

            $('div.patternPopupResults > div.item').hover(

                function() {
                  $( this ).find('div.name').addClass('pullUp');
                }, function() {
                  $( this ).find('div.name').removeClass('pullUp');
                }

            );

        $('span.groups_category_item').on('click', function () {

            var _groups_category_id = ($(this).data('category')).toString();
            var _groups_category_name = $(this).data('category-name');
            var _categories = _.filter(ub.data.mascots_categories, {mascots_group_category_id: _groups_category_id});

            if (_groups_category_id === "all") {

                $('div.popup_header').html("Mascots: All");
                return;

            }

            var data = {
                categories: _.sortBy(_categories, 'name'),
            };

            var template = $('#m-new-mascot-popup-categories').html();
            var markup = Mustache.render(template, data);

            $('div.popup_header').html("Mascots: " + _groups_category_name);
            $('div.categories').html(markup);

            $('div.groups_categories').hide();
            $('div.categories').fadeIn();

            $('div.patternPopupResults > div.item').hover(

                function() {
                  $( this ).find('div.name').addClass('pullUp');
                }, function() {
                  $( this ).find('div.name').removeClass('pullUp');
                }

            );

            $('span.category_item').unbind('click');
            $('span.category_item').on('click', function () {

                var _category_id = $(this).data('category');
                var _category_name = $(this).data('category-name');
                var _current = $('div.popup_header').html();

                $('span.category_item').removeClass('active');
                $(this).addClass('active');

                $('div.popup_header').html('MASCOTS: ' + _groups_category_name + ', ' + _category_name );

                if (_category_id === "back") {

                    $('div.categories').hide();
                    $('div.groups_categories').fadeIn();
                    
                    $('div.popup_header').html('MASCOTS');

                    return;

                }

                var _mascots = _.filter(ub.data.mascots, {category: _category_name});

                if (_category_name === "My Mascots") {

                    var _id = ub.user.id;

                    if (typeof ub.user.id === "number")  {
                        _mascots = _.filter(_mascots, function (mascot) {
                            return mascot.user_id.toString() === _id.toString() || _.contains(ub.fontGuideIDs, _id);
                        });

                    } else {

                        _mascots = _.filter(_mascots, function (mascot) {
                            return typeof mascot.user_id !== 'string';
                        });

                    }
                    
                }

                var data = {
                    category: _category_name,
                    mascot_category_id: _category_id,
                    mascots: _.sortBy(_mascots, 'name'),
                };

                var template = $('#m-new-mascot-items').html();
                var markup = Mustache.render(template, data);

                $('div.patternPopupResults').html(markup)
                $('div.main-content').scrollTo(0);

                $('div.patternPopupResults > div.item').hover(

                    function() {
                      $( this ).find('div.name').addClass('pullUp');
                    }, function() {
                      $( this ).find('div.name').removeClass('pullUp');
                    }

                );

                $('div.patternPopupResults > div.item').on('click', function () {

                    var _id = $(this).data('mascot-id');

                    ub.funcs.changeMascotByID(_id, settingsObj);

                });

            });

            if(_groups_category_name === "My Mascots") {
                
                $('span.category_item[data-category-name="My Mascots"]').trigger('click');

            }

        });

        $('div.patternPopupResults > div.item').on('click', function () {

            var _id = $(this).data('mascot-id');

            ub.funcs.changeMascotByID(_id, settingsObj);
            $('div#primaryMascotPopup').remove();
            ub.status.mascotPopupVisible = false;

        });

        $('span.mascot-tab').on('click', function () {

            var _btn = $(this).data('button');

            $('span.mascot-tab').removeClass('active');
            $(this).addClass('active');

        });

        ub.funcs.centerPatternPopup();

        $('div.close-popup, span.close-popup').on('click', function (){

            $popup.remove();
            ub.status.mascotPopupVisible = false;

        });

        $popup.bind('clickoutside', function () {

            var _status = $(this).data('status');

            if (_status === 'hidden') {

                $(this).data('status', 'visible');
                return;

            }

            $(this).data('status', 'hidden');
            $(this).hide();
            $(this).remove();
            ub.status.mascotPopupVisible = false;

        });


        /// Custom Artwork Request

            $('span[data-button="browse"]').on('click', function () {

                $('div.upload').fadeOut();

            }); 

            $('span[data-button="upload"]').on('click', function () {

                $('div.upload').fadeIn();

            });    

            $("input#custom-artwork").change( function() {

                // if (this.files && this.files[0]) {

                //     var reader = new FileReader();

                //     console.log('This Files: ');
                //     console.log(this.files);

                //     reader.onload = function (e) {

                //         console.log('Uploaded (e): ');
                //         console.log(e);
                        
                //         $('img#preview').attr('src', e.target.result);
                //         ub.uploadLogo(e.target.result);

                //     }

                //     reader.readAsDataURL(this.files[0]);

                // }

                if (this.files && this.files[0]) {

                    var _filename = ub.funcs.fileUpload(this.files[0], settingsObj, function (filename) {

                        // TODO: Implement Assignment here to remove global variable [window.uploaded_filename]

                    });
                    
                }

            });

            $('span.ok_btn').on('click', function () {

                if ($(this).attr('data-status') === "ok") {

                    ub.current_material.settings.custom_artwork = window.uploaded_filename;

                    var _additionalNotes = $('textarea[name="custom-artwork-additional-notes"]').val();

                    settingsObj.customLogo = true;
                    settingsObj.customFilename = window.uploaded_filename;
                    settingsObj.additionalNotes = _additionalNotes;

                    $popup = $('div#primaryMascotPopup');
                    $popup.remove();
                    ub.funcs.changeMascotByID('1038', settingsObj, window.uploaded_filename, _additionalNotes);

                }
                
            }); 

        /// End Custom Artwork Request 

        /// Select current mascot

            $('span.groups_category_item[data-category-name="' + mascots_group_category.name + '"]').click();
            $('span.category_item[data-category-name="' + mascot_category.name + '"]').click();
            $('div.item[data-mascot-id="' + mascot.id + '"]').addClass('active');

            if (typeof settingsObj.customFilename !== "undefined" && settingsObj.customFilename.length > 0) {

                // display uploaded file if preview is not set
                // Preview is true if theres a custom artwork but was replaced with a temp from the prepared mascot
                // see ubj@ub.funcs.customArtworkRequestCheck 
                if (typeof settingsObj.preview === "undefined") { 

                    $('textarea[name="custom-artwork-additional-notes"]').val(settingsObj.additionalNotes);
                    $('img#preview').attr('src', settingsObj.customFilename);
                    $('span[data-button="upload"]').trigger('click');

                }

            }
            
        /// End After load Events

    }

    ub.funcs.afterLoadEmbellishments = function () {

          if (ub.config.uniform_application_type === "sublimated") {
              $('span.add-art').addClass('sublimated');
          } else {
              $('span.add-art').addClass('non-sublimated');
          }

    }

    ub.funcs.changeEmbellishmentFromPopup = function (mascotId, settingsObj, source) {

        if (typeof source === "undefined") {

            ub.funcs.pushOldState('change mascot', 'application', settingsObj, { mascotID: settingsObj.mascot.id });

        }

        var _mascotID     = mascotId.toString();
        var _mascotObj    = _.find(ub.data.mascots, {id: _mascotID});
        var _id           = settingsObj.id;

        ub.funcs.removeApplicationByID(_id);

        settingsObj.mascot = _mascotObj;

        if (_mascotID !== '1039') {

            settingsObj.color_array = ub.funcs.getDefaultColors();    
        
        } else {

            settingsObj.color_array = [];
            settingsObj.color_array.push(ub.funcs.getColorByColorCode('W'));
            settingsObj.color_array.push(ub.funcs.getColorByColorCode('RB'));
            settingsObj.color_array.push(ub.funcs.getColorByColorCode('R'));

        }
        
        // Reset flip when changing new mascot
        _.each(settingsObj.application.views, function (v){
            
            v.application.flip = 0;
            
        });

        ub.funcs.update_application_mascot(settingsObj.application, settingsObj.mascot);

        $popup = $('div#primaryPatternPopup, div#primaryMascotPopup');
        $popup.remove();
        ub.status.mascotPopupVisible = false;

    }

    $('span.add-art').unbind('click');
    $('span.add-art').on('click', function () {

       // Guard Expression for non-sublimated styles 
       if (ub.config.uniform_application_type !== "sublimated") {
    
           var dialog = bootbox.dialog({
                title: 'Sorry! This is not allowed here.',
                message: 'Create Art / Upload File (embellishments) is currently enabled for sublimated styles only.',
                size: 'medium',
            });

            return;

        }

        ub.funcs.deActivateZoom();
        ub.funcs.addLocation(true);

    });

});