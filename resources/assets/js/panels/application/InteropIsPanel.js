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
        }

        that.isInit = false;
    },

    onFilterExistingDesign: function() {
        var type = $(this).data("type");
        var embellishments = undefined;

        if (type === "active") {
            embellishments = is.embellishments.userItems;
        } else if (type === "archive") {
            embellishments = is.embellishments.userItemsArchived
        }

        InteropIsPanel.funcs.renderMascots(embellishments);
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
    }
}

InteropIsPanel.funcs = {
    loadDesigner: function() {
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

        if ($(".inksoft-loader.create #embed-inksoft-create iframe").length === 0) {
            launchDesigner('HTML5DS', flashvars, document.querySelector(".inksoft-loader.create #embed-inksoft-create"));
        }
        UIkit.modal("#select-mascot-inksoft-modal").show();
    },

    loadDesignerUpload: function() {
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
        
        if ($(".inksoft-loader.upload #embed-inksoft-upload iframe").length === 0) {
            launchDesigner('HTML5DS', flashvars, document.querySelector(".inksoft-loader.upload #embed-inksoft-upload"));
        }
        UIkit.modal("#select-mascot-inksoft-modal").show();
    },

    loadExistingDesign: function(settingsObj) {
        ub.status.embellishmentPopupVisible = false;
        ub.is.settingsObj = settingsObj;
        ub.status.embellishmentPopupVisible = true;

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
            UIkit.modal("#select-mascot-inksoft-modal").show();
        });
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

    renderMascots: function(data) {
        var renderMascots = ub.utilities.buildTemplateString('#m-mascot-items', {embellishments: data});
        $("#select-mascot-inksoft-modal .mascot-container").html("");
        $("#select-mascot-inksoft-modal .mascot-container").html(renderMascots);
        $(".inksoft-existing-design .mascot-item .select-mascot-item").first().trigger("click");
    }
}
