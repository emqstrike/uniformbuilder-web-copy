function StockMascot() {

}

StockMascot.events = {
    isInit: true,
    init: function() {
        var that = this;
        if (that.isInit) {
            $(".inksoft-stock-mascot").on("click", ".stock-mascot-categories a", that.onClickStockMascotCategory);
            $(".inksoft-stock-mascot").on("click", ".stock-mascot-list-container .mascot-item a", that.onClickMascotItem);
            $(".inksoft-stock-mascot").on("click", ".stock-mascot-preview-container .edit-stock-logo", that.onClickEditStockMascot);
            $(".inksoft-stock-mascot").on("click", ".stock-mascot-preview-container .add-to-uniform", that.onClickAddToUniform);
        }
        that.isInit = false;

        StockMascot.funcs.loadStockMascot();
    },

    onClickStockMascotCategory: function() {
        var that = this;
        var categoryID = $(this).data("category-id");
        $(".inksoft-stock-mascot .stock-mascot-list-container").addClass("uk-hidden")
        $(".inksoft-stock-mascot .stock-mascot-loading-screen").removeClass("uk-hidden");
        StockMascot.funcs.loadArtByCategory(categoryID, function(response) {
            if (response.OK) {
                StockMascot.funcs.prepareStockMascots(response.Data);
            }
        });

        $(".stock-mascot-categories li.uk-active").removeClass("uk-active");
        $(this).parent().addClass("uk-active");
    },

    onClickMascotItem: function() {
        var that = this;
        var image = $(this).data("image");
        var stockID = $(this).data("stock-mascot-id");

        StockMascot.funcs.previewStockMascotPreview(image, stockID);
        $(".mascot-item a.uk-active").removeClass("uk-active");
        $(this).addClass("uk-active");
    },

    onClickEditStockMascot: function() {
        var that = this;
        var stockID = $(this).data("stock-mascot-id");
        InteropIsPanel.funcs.loadDesigner(stockID, ub.data.currentApplication.code, true);
    },

    onClickAddToUniform: function() {
        var that = this;
        var stockID = $(this).data("stock-mascot-id");

        var _settingsObject = ub.data.currentApplication;
        var _matchingID = undefined;

        is.isMessage(stockID, _settingsObject.code, true);
        _matchingID = ub.data.matchingIDs.getMatchingID(_settingsObject.code);

        if (typeof _matchingID !== "undefined") {
            var _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});
            is.isMessage(_designID, _matchingID, true);
        }

        UIkit.modal("#richardson-stock-mascot").hide();
    }
}

StockMascot.funcs = {
    loadStockMascot: function() {
        var stockMascotCategoryID = 1000281;
        var that = this;
        if (typeof ub.data.stockMascot === "undefined") {
            that.loadRichardsonCategories(function(response) {
                if (response.StatusCode) {
                    var richardsonStockMascots = _.find(response.Data, {ID: stockMascotCategoryID});
                    if (typeof richardsonStockMascots !== "undefined") {
                        ub.data.stockMascot = richardsonStockMascots;
                        that.prepareStockMascotCategories(ub.data.stockMascot);
                        StockMascot.funcs.loadArtByCategory(richardsonStockMascots.ID, function(response) {
                            if (response.OK) {
                                StockMascot.funcs.prepareStockMascots(response.Data);
                            }
                        });
                    }
                }
            })
        } else {
            that.prepareStockMascotCategories(ub.data.stockMascot);
        }
        
        UIkit.modal("#richardson-stock-mascot").show();
    },

    prepareStockMascotCategories: function(categories) {
        var renderContainer = ub.utilities.buildTemplateString('#m-inksoft-stock-mascot-categories-list', {
            categories: categories.Children
        });

        $(".inksoft-stock-mascot .stock-mascot-categories").html("");
        $(".inksoft-stock-mascot .stock-mascot-categories").html(renderContainer);
    },

    prepareStockMascots: function(mascots) {
        var data = [];
        _.each(mascots, function(mascot) {
            console.log(mascot)
            data.push({
                ImageUrl: mascot.Canvases[0].PngRelativeUrl,
                Name: mascot.Name,
                ID: mascot.DesignID
            });
        })

        var renderContainer = ub.utilities.buildTemplateString('#m-inksoft-stock-mascots-list', {
            mascots: data
        });

        $(".inksoft-stock-mascot .stock-mascot-list-container").removeClass("uk-hidden")
        $(".inksoft-stock-mascot .stock-mascot-loading-screen").addClass("uk-hidden");
        $(".inksoft-stock-mascot .stock-mascot-list-container").html("");
        $(".inksoft-stock-mascot .stock-mascot-list-container").html(renderContainer);

        $(".inksoft-stock-mascot .mascot-item a").first().trigger("click");
    },

    previewStockMascotPreview: function(image, stock_id) {
        var renderContainer = ub.utilities.buildTemplateString('#m-inksoft-stock-mascot-preview', {
            image: image,
            ID: stock_id
        });

        $(".inksoft-stock-mascot .stock-mascot-preview-container").html("");
        $(".inksoft-stock-mascot .stock-mascot-preview-container").html(renderContainer);
    },

    loadRichardsonCategories: function(cb) {
        var url = 'https://stores.inksoft.com/richardson_customizer/Api2/GetDesignCategories?Format=JSON';
        ub.utilities.getJSON(url, function(response) {
            console.log(response)
            cb(response);
        }, function(error) {
            console.log("ERROR while loading Inksoft Categories");
            console.log(error)
        })
    },

    loadArtByCategory: function(id, cb) {
        var url = 'https://stores.inksoft.com/richardson_customizer/Api2/GetDesignSummaries?DesignCategoryId='+ id +'&Format=JSON';
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            data: '',
            processData: false,
            crossDomain: true,
            success: function (response) {
                console.log(response)
                cb(response);
            },
            error: function (error) {
                console.log("ERROR while loading Inksoft Stock Mascot");
                console.log(error)
            }
        });
    }
}