function Inksoft () {
}

Inksoft.funcs = {
    baseUrl: 'https://stores.inksoft.com/ProLook_Sports/Api2',

    getDesignIdeaCategories: function(successHandler, errorHandler) {
        var url = this.baseUrl + '/GetDesignCategories?Format=JSON';
        ub.utilities.getJSON(url, successHandler, errorHandler)
    },

    getDesignIdeasByCategory: function(category_id, successHandler, errorHandler) {
        var url = this.baseUrl + '/GetDesignSummaries?DesignCategoryId=' + category_id + '&Format=JSON';
        ub.utilities.getJSON(url, successHandler, errorHandler)
    },

    loadInksoftUploader: function(element, applicationID, designID) {
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

        ub.isMessageIsCalled = true;
        Inksoft.funcs.launchInksoft(flashvars, element);  
    },

    loadInksoftDesigner: function(element, applicationID, designID, callback) {
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

        ub.isMessageIsCalled = true;
        Inksoft.funcs.launchInksoft(flashvars, element);

        if (_.isFunction(callback)) {
            callback();
        }
    },

    launchInksoft: function(flashvars, element) {
        launchDesigner('HTML5DS', flashvars, element);
    },

    closeInksoftModal: function() {
        UIkit.modal("#create-upload-inksoft-modal").hide();
        UIkit.modal("#select-mascot-inksoft-modal").hide();
        UIkit.modal("#inksoft-design-editor-modal").hide();
        UIkit.modal("#inksoft-design-editor-modal-with-conflict").hide();
    }
}