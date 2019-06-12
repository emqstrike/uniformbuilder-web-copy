function InteropIsPanel() {

}

InteropIsPanel.events = {
    isInit: true,
    init: function() {
        var that = this;
        if (that.isInit) {
            $(".inksoft-existing-design").on("click", ".menu-tab-mascot .menu-tab-button", that.onFilterExistingDesign);
            $(".inksoft-existing-design").on("click", ".mascot-item .select-mascot-item", that.onClickMascotItem);
            $(".inksoft-existing-design").on("keyup", ".search-mascot-form input", _.debounce(that.onSearchMascot, 500));
            $(".inksoft-existing-design").on("click", ".add-to-uniform", that.onAddMascotOnUniform);
            $(".inksoft-existing-design").on("click", ".btn-restore, .btn-archive", that.onChangeMascotStatus);
            $("#select-mascot-inksoft-modal").on("click", ".modal-menu-mascot-header .mascot-menu-button", that.onChangeTab);
            $(".upload-tutorial-container").on("click", ".close-tutorial", that.onCloseTutorial);
            $("#inksoftEditor, #inksoftUploader").on("click", "a.cancel-add-uniform", that.cancelAddtoUniform)
        }

        that.isInit = false;
    },

    cancelAddtoUniform: function() {
        if (!ub.data.isChangeStockLogo) {
            var _settingsObject = ub.data.currentApplication;
            if (_settingsObject.logo_type === "custom_text") {
                TeamNamePanel.funcs.loadAddTeamName();
            } else {
                ub.funcs.afterRemoveStockLogo(_settingsObject);
            }
            ub.funcs.deleteLocation(_settingsObject.code);
        }
        ub.data.isChangeStockLogo = false;

        UIkit.modal("#inksoftUploader").hide();
        UIkit.modal("#inksoftEditor").hide();
        $("iframe[name='__privateStripeMetricsController0']").remove();
    },

    onCloseTutorial: function() {
        $(".upload-tutorial-container").addClass("uk-hidden");
    },

    onChangeTab: function() {
        var type = $(this).data("type");
        var applicationObject = ub.data.currentApplication;

        if (typeof applicationObject !== "undefined") {
            if (type === "existing") {
                InteropIsPanel.funcs.loadExistingDesign(applicationObject)
            } else if (type === "create") {
                if (applicationObject.application_type === "embellishments") {
                    InteropIsPanel.funcs.loadDesigner(applicationObject.embellishment.design_id, applicationObject.code);
                } else {
                    InteropIsPanel.funcs.loadDesigner(undefined, applicationObject.code);
                }
            } else if (type === "upload") {
                InteropIsPanel.funcs.loadDesignerUpload(undefined, applicationObject.code)
            }
        } else {
            ub.utilities.error("Cannot find current application");
        }
    },

    onFilterExistingDesign: function() {
        var type = $(this).data("type");
        var embellishments = undefined;
        $(".inksoft-existing-design .mascot-list-container .mascot-list-loader").removeClass("uk-hidden");
        $(".inksoft-existing-design .mascot-list-container .mascot-container").addClass("uk-hidden");

        if (type === "active") {
            InteropIsPanel.funcs.updateEmbellishmentList(function() {
                embellishments = is.embellishments.userItems;
                InteropIsPanel.funcs.renderMascots(embellishments);
                $(".inksoft-existing-design .mascot-list-container .mascot-list-loader").addClass("uk-hidden");
                $(".inksoft-existing-design .mascot-list-container .mascot-container").removeClass("uk-hidden");
                // Update Count
                $(".inksoft-existing-design .menu-tab-mascot .count-active").html("");
                $(".inksoft-existing-design .menu-tab-mascot .count-active").html("(" +_.size(embellishments) + ")");
                $(".inksoft-existing-design .menu-tab-mascot .count-archive").html("");
            });
        } else if (type === "archive") {
            InteropIsPanel.funcs.updateEmbellishmentListArchived(function() {
                embellishments = is.embellishments.userItemsArchived
                InteropIsPanel.funcs.renderMascots(embellishments);
                $(".inksoft-existing-design .mascot-list-container .mascot-list-loader").addClass("uk-hidden");
                $(".inksoft-existing-design .mascot-list-container .mascot-container").removeClass("uk-hidden");

                $(".inksoft-existing-design .menu-tab-mascot .count-archive").html("");
                $(".inksoft-existing-design .menu-tab-mascot .count-archive").html("(" + _.size(embellishments) + ")");
                $(".inksoft-existing-design .menu-tab-mascot .count-active").html("");
            });
        }
    },

    onClickMascotItem: function() {
        var _id = $(this).data('id');
        var _filename = $(this).data('filename');
        var _svgFilename = $(this).data('svg-filename');
        var _designID = $(this).data('design-id');
        var _designName = $(this).data('design-name');

        var data = {
            name: _designName,
            filename: _filename,
            svg: _svgFilename,
            design_id: _designID
        }

        var renderMascotPreview = ub.utilities.buildTemplateString('#m-mascot-preview', data);
        $("#select-mascot-inksoft-modal .mascot-image-preview-container").html("");
        $("#select-mascot-inksoft-modal .mascot-image-preview-container").html(renderMascotPreview);

        $(".mascot-item .select-mascot-item.uk-active").removeClass("uk-active");
        $(this).addClass("uk-active");
    },

    onSearchMascot: function() {
        var text = $(".search-mascot-form input").val();
        var type = $(".inksoft-existing-design .menu-tab-mascot li.uk-active a").data("type");
        var source = undefined;
        var _results = undefined;

        if (type === "active") {
            source = is.embellishments.userItems;
        } else if (type === "archive") {
            source = is.embellishments.userItemsArchived;
        }

        if (text.length > 0) {
            _results = _.filter(source, function (item) {
                var _designName = item.design_name.toLowerCase();
                var _input = text.toLowerCase();

                return _designName.indexOf(_input) !== -1;
            });
        } else {
            _results = source;
        }

        InteropIsPanel.funcs.renderMascots(_results);
    },

    onAddMascotOnUniform: function() {
        var _designID = $(this).data("design-id");
        var _settingsObject = ub.is.settingsObj;
        var _matchingID = undefined;

        is.isMessage(_designID, _settingsObject.code, true);
        _matchingID = ub.data.matchingIDs.getMatchingID(_settingsObject.code);

        if (typeof _matchingID !== "undefined") {
            var _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});
            is.isMessage(_designID, _matchingID, true);
        }

        UIkit.modal("#select-mascot-inksoft-modal").hide();
    },

    onChangeMascotStatus: function() {
        var type = $(this).data("type");
        var design_id = $(this).data("design-id");
        var design_name = $(this).data("design-name");
        var id = $(this).data("id");

        if (type === "archive") {
            InteropIsPanel.funcs.updateMascotStatus(1, id, design_id, type);
        } else {
            InteropIsPanel.funcs.updateMascotStatus(0, id, design_id, type);
        }
    },
}

InteropIsPanel.funcs = {
    loadDesigner: function(designID, applicationID, editorOnly = false) {
        var nextUrl = '';
        var parentWindow = window.parent;
        var _applicationID = typeof applicationID !== "undefined" ? applicationID : 0;

        // When the customizer is embedded create function in the parent window to handle the event
        if (typeof parentWindow.customizerIframe !== "undefined") {
            nextUrl = "javascript:designID=0;window.isMessagePassThrough(designID," + _applicationID + ");";
        } else  {
            nextUrl = "javascript:designID=0;window.is.isMessage(designID," + _applicationID + ");";
        }

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
            StoreID: "148439",
            PublisherID: "10697",
            SessionID: "",
            SessionToken: "",
            CartRetailItemID: "",
            UserID: "1036747",
            UserName: "",
            UserEmail: "",
            DesignID: typeof designID !== "undefined" ? designID : "",
            DefaultProductID: "",
            DefaultProductStyleID: "",
            ProductID: "",
            ProductStyleID: "",
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
            StoreURI: "richardson_customizer",
            Admin: "",
            NextURL: nextUrl,
            CartURL: "https://stores.inksoft.com/richardson_customizer/Cart",
            OrderSummary: true,
            VideoLink: "http://www.youtube.com/watch?v=EfXICdRwt4E",
            Phone: "8007765665",
            WelcomeScreen: "",
            ContactUsLink: "/richardson_customizer/Stores/Contact",
            WelcomeVideo: "",
            GreetBoxSetting: "LANDING",
            HelpVideoOverview: "",
            AutoZoom: true,
            EnableNameNumbers: true,
            AddThisPublisherId: "xa-4fccb0966fef0ba7",
            EnableCartPricing: false,
            EnableCartCheckout: false,
            EnableCartBilling: false,
            EnableCartShipping: false,
            PaymentDisabled: false,
            PaymentRequired: false,
            BillingAddressRequired: false,
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
            Version: "3.51.0.0",
            BackgroundColor: "",
            StoreLogo: "//stores.inksoft.com/images/publishers/10697/stores/richardson_customizer/img/logo.png",
            StoreName: "Richardson Customizer",
            StoreEmail: "jared@prolook.com",
            EnableEZD: false,
            EmbedType: "iframe",
            ArtCategoryID: "1000002",
            DesignCategoryID: "1000004"
        };

        if (editorOnly) {
            $("#inksoftEditor .inksoft-design-editor").html("")
            launchDesigner('HTML5DS', flashvars, document.querySelector("#inksoftEditor .inksoft-design-editor"));
            UIkit.modal("#inksoftEditor").show();
            UIkit.modal("#richardson-stock-mascot").hide();
        } else {
            $(".inksoft-loader.create #embed-inksoft-create").html("")
            launchDesigner('HTML5DS', flashvars, document.querySelector(".inksoft-loader.create #embed-inksoft-create"));
            UIkit.switcher("#select-mascot-inksoft-modal .modal-menu-mascot-header").show(1);
            UIkit.modal("#select-mascot-inksoft-modal").show();
        }

        InteropIsPanel.events.init();
    },

    loadDesignerUpload: function(designID, applicationID, uploadOnly = false) {
        var nextUrl = '';
        var parentWindow = window.parent;
        var _applicationID = typeof applicationID !== "undefined" ? applicationID : 0;

        if (typeof parentWindow.customizerIframe !== "undefined") {
            nextUrl = "javascript:;designID=0;window.isMessagePassThrough(designID," + _applicationID + ");";
        } else  {
            nextUrl = "javascript:designID=0;window.is.isMessage(designID," + _applicationID + ");";
        }

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
            StoreID: "148439",
            PublisherID: "10697",
            SessionID: "",
            SessionToken: "",
            CartRetailItemID: "",
            UserID: "1036747",
            UserName: "",
            UserEmail: "",
            DesignID: typeof designID !== "undefined" ? designID : "",
            DefaultProductID: "",
            DefaultProductStyleID: "",
            ProductID: "",
            ProductStyleID: "",
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
            StoreURI: "richardson_customizer",
            Admin: "",
            NextURL: nextUrl,
            CartURL: "https://stores.inksoft.com/richardson_customizer/Cart",
            OrderSummary: true,
            VideoLink: "http://www.youtube.com/watch?v=EfXICdRwt4E",
            Phone: "8007765665",
            WelcomeScreen: "",
            ContactUsLink: "/richardson_customizer/Stores/Contact",
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
            Version: "3.51.0.0",
            BackgroundColor: "",
            StoreLogo: "//stores.inksoft.com/images/publishers/10697/stores/richardson_customizer/img/logo.png",
            StoreName: "Richardson Customizer",
            StoreEmail: "jared@prolook.com",
            EnableEZD: false,
            EmbedType: "iframe",
            ArtCategoryID: "1000002",
            DesignCategoryID: "1000004"
        };

        if (uploadOnly) {
            $("#inksoftUploader .inksoft-design-uploader").html("");
            launchDesigner('HTML5DS', flashvars, document.querySelector("#inksoftUploader .inksoft-design-uploader"));
            UIkit.modal("#inksoftUploader").show();
        } else {
            $(".inksoft-loader.upload #embed-inksoft-upload").html("");
            launchDesigner('HTML5DS', flashvars, document.querySelector(".inksoft-loader.upload #embed-inksoft-upload"));
            UIkit.switcher("#select-mascot-inksoft-modal .modal-menu-mascot-header").show(2)
            UIkit.modal("#select-mascot-inksoft-modal").show();
        }

        InteropIsPanel.events.init();
    },

    loadExistingDesign: function(settingsObj) {
        ub.status.embellishmentPopupVisible = false;
        ub.status.embellishmentPopupVisible = true;
        if (typeof settingsObj !== "undefined") {
            ub.is.settingsObj = settingsObj;
        }

        $(".inksoft-existing-design .mascot-list-container .mascot-list-loader").removeClass("uk-hidden");
        $(".inksoft-existing-design .mascot-list-container .mascot-container").addClass("uk-hidden");

        this.updateEmbellishmentListArchived(function() {
            var embellishments = _.sortBy(is.embellishments.userItems, function(item) {
                return parseInt(item.id);
            });

            var userData = {
                user: ub.user,
                archive: _.size(is.embellishments.userItemsArchived),
                active: _.size(is.embellishments.userItems)
            }

            var renderContainer = ub.utilities.buildTemplateString('#m-user-design-container', userData);
            $("#select-mascot-inksoft-modal .inksoft-existing-design").html("");
            $("#select-mascot-inksoft-modal .inksoft-existing-design").html(renderContainer);


            // Bind Events
            InteropIsPanel.events.init();
            InteropIsPanel.funcs.renderMascots(embellishments);

            $(".inksoft-existing-design .mascot-list-container .mascot-container").removeClass("uk-hidden");
            $(".inksoft-existing-design .mascot-list-container .mascot-list-loader").addClass("uk-hidden");
        });

        UIkit.switcher("#select-mascot-inksoft-modal .modal-menu-mascot-header").show(0)

        UIkit.modal("#select-mascot-inksoft-modal").show();
    },

    updateEmbellishmentListArchived: function(cb) {
        ub.current_material.is_url = window.ub.config.api_host + '/api/v1-0/inksoft_design/getByCreatedByUserID/' + ub.user.id + '/archived';
        ub.loader(ub.current_material.is_url, 'inksoft_designs', function (response, objectName) {
            is.embellishments.userItemsArchived = response;
            if (typeof cb !== "undefined") {
                cb();
            }
        });
    },

    updateEmbellishmentList: function(cb) {
        ub.current_material.is_url = window.ub.config.api_host + '/api/v1-0/inksoft_design/getByCreatedByUserID/' + ub.user.id + '/active';
        ub.loader(ub.current_material.is_url, 'inksoft_designs', function (response, objectName) {
            // Save data
            is.embellishments.userItems = response;
            
            if(typeof cb !== "undefined") {
                cb();
            }
        });
    },

    renderMascots: function(data) {
        var renderMascots = ub.utilities.buildTemplateString('#m-mascot-items', {embellishments: data.reverse()});
        $("#select-mascot-inksoft-modal .mascot-container").html("");
        $("#select-mascot-inksoft-modal .mascot-container").html(renderMascots);
        $(".inksoft-existing-design .mascot-item .select-mascot-item").first().trigger("click");
    },

    updateMascotStatus: function(status, id, designID, type) {
        var that = this;
        var _postData = {
            "archived": status,
            "id": id,
            "design_id": designID,
        }

        $.ajax({
            url: ub.endpoints.getFullUrlString('updateCustomArtwork'),
            type: "POST", 
            data: JSON.stringify(_postData),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
            success: function (response) {
                if (type === "archive") {
                    that.updateEmbellishmentList(function() {
                        that.renderMascots(is.embellishments.userItems);
                        $(".inksoft-existing-design .menu-tab-mascot .menu-tab-button[data-type='active']").addClass("uk-active")
                        // Update Count
                        $(".inksoft-existing-design .menu-tab-mascot .count-active").html("");
                        $(".inksoft-existing-design .menu-tab-mascot .count-active").html("(" +_.size(is.embellishments.userItems) + ")");
                    });
                } else {
                    that.updateEmbellishmentListArchived(function() {
                        that.renderMascots(is.embellishments.userItemsArchived);
                        $(".inksoft-existing-design .menu-tab-mascot .menu-tab-button[data-type='archive']").addClass("uk-active");
                        // Update Count
                        $(".inksoft-existing-design .menu-tab-mascot .count-archive").html("");
                        $(".inksoft-existing-design .menu-tab-mascot .count-archive").html("(" + _.size(is.embellishments.userItemsArchived) + ")");
                    });
                }
            }     
        });
    }
}
