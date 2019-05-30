function StockMascot() {

}

StockMascot.events = {
    isInit: true,
    init: function(categoryID = ub.data.stockMascotCategoryID, designID = undefined) {
        var that = this;
        if (that.isInit) {
            $(".inksoft-stock-mascot").on("click", ".stock-mascot-categories a", that.onClickStockMascotCategory);
            $(".inksoft-stock-mascot").on("click", ".stock-mascot-list-container .mascot-item a", that.onClickMascotItem);
            $(".inksoft-stock-mascot").on("click", ".stock-mascot-preview-container .edit-stock-logo", that.onClickEditStockMascot);
            $(".inksoft-stock-mascot").on("click", ".add-to-uniform", that.onClickAddToUniform);
            $("#richardson-stock-mascot").on("click", ".cancel-add-uniform", that.onClickCancel);
        }
        that.isInit = false;
        StockMascot.funcs.changeModalTitle(categoryID);
        $(".inksoft-stock-mascot .stock-mascot-main-content").addClass("uk-hidden")
        $(".inksoft-stock-mascot .stock-mascot-loading-screen").removeClass("uk-hidden");
        StockMascot.funcs.loadStockMascot(categoryID, designID);
    },

    onClickStockMascotCategory: function() {
        var that = this;
        var categoryID = $(this).data("category-id");
        $(".inksoft-stock-mascot .stock-mascot-loading-screen-content").removeClass("uk-hidden");
        $(".inksoft-stock-mascot .stock-mascot-list-container").addClass("uk-hidden");
        StockMascot.funcs.loadArtByCategory(categoryID, function(response) {
            if (response.OK) {
                StockMascot.funcs.prepareStockMascots(response.Data, undefined);
                $(".inksoft-stock-mascot .stock-mascot-loading-screen-content").addClass("uk-hidden");
                $(".inksoft-stock-mascot .stock-mascot-list-container").removeClass("uk-hidden");
            }
        });

        $(".stock-mascot-categories li.uk-active").removeClass("uk-active");
        $(this).parent().addClass("uk-active");
    },

    onClickMascotItem: function() {
        var that = this;
        var image = $(this).data("image");
        var name = $(this).data("name");
        var stockID = $(this).data("stock-mascot-id");

        ub.data.currentStockMascotID = stockID;

        StockMascot.funcs.previewStockMascotPreview(name, image, stockID);
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
        var stockID = ub.data.currentStockMascotID;

        if (typeof stockID !== "undefined") {
            var _settingsObject = ub.data.currentApplication;
            var _matchingID = undefined;

            is.isMessage(stockID, _settingsObject.code, undefined);
            _matchingID = ub.data.matchingIDs.getMatchingID(_settingsObject.code);

            if (typeof _matchingID !== "undefined") {
                var _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});
                is.isMessage(stockID, _settingsObject.code, undefined);
            }
        } else {
            ub.utilities.warn("Missing design id")
        }

        UIkit.modal("#richardson-stock-mascot").hide();
    },

    onClickCancel: function() {
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
        UIkit.modal("#richardson-stock-mascot").hide();
    }
}

StockMascot.funcs = {
    loadStockMascot: function(categoryID = ub.data.stockMascotCategoryID, designID = undefined) {
        var stockMascotCategoryID = categoryID;
        var that = this;
        that.loadRichardsonCategories(function(response) {
            if (response.StatusCode) {
                var richardsonStockMascots = _.find(response.Data, {ID: stockMascotCategoryID});
                if (typeof richardsonStockMascots !== "undefined") {
                    ub.data.stockMascot = richardsonStockMascots;
                    that.prepareStockMascotCategories(ub.data.stockMascot, stockMascotCategoryID);
                    StockMascot.funcs.loadArtByCategory(richardsonStockMascots.ID, function(response) {
                        if (response.OK) {
                            StockMascot.funcs.prepareStockMascots(response.Data, designID);
                            $(".inksoft-stock-mascot .stock-mascot-main-content").removeClass("uk-hidden")
                            $(".inksoft-stock-mascot .stock-mascot-loading-screen").addClass("uk-hidden");
                        } else {
                            $.smkAlert({
                                text: 'Something went wrong, Please try again',
                                type: 'warn',
                                time: 1,
                                marginTop: '90px'
                            });
                            UIkit.modal("#richardson-stock-mascot").hide();
                        }
                    });
                }
            }
        })
        
        UIkit.modal("#richardson-stock-mascot").show();
    },

    prepareStockMascotCategories: function(categories, parentID) {
        if (_.size(categories.Children) === 0) {
            $(".inksoft-stock-mascot .stock-mascot-categories").parent().parent().addClass("uk-hidden");
        } else {
            var renderContainer = ub.utilities.buildTemplateString('#m-inksoft-stock-mascot-categories-list', {
                categories: categories.Children,
                parentID
            });

            $(".inksoft-stock-mascot .stock-mascot-categories").html("");
            $(".inksoft-stock-mascot .stock-mascot-categories").html(renderContainer);
            $(".inksoft-stock-mascot .stock-mascot-categories").parent().parent().removeClass("uk-hidden");
        }
    },

    prepareStockMascots: function(mascots, designID) {
        var data = [];
        var isEdit = true;
        _.each(mascots, function(mascot) {
            if (mascot.DesignID === designID) {
                isEdit = false;
            }
            data.push({
                ImageUrl: mascot.Canvases[0].PngRelativeUrl,
                Name: mascot.Name,
                ID: mascot.DesignID
            });
        })

        var renderContainer = ub.utilities.buildTemplateString('#m-inksoft-stock-mascots-list', {
            mascots: data
        });

        $(".inksoft-stock-mascot .stock-mascot-list-container").html("");
        $(".inksoft-stock-mascot .stock-mascot-list-container").html(renderContainer);

        var is

        if (typeof designID === "undefined" || isEdit) {
            $(".inksoft-stock-mascot .mascot-item a").first().trigger("click");
        } else {
            $(".inksoft-stock-mascot .mascot-item a[data-stock-mascot-id='"+ designID +"']").click();
        }
    },

    previewStockMascotPreview: function(name, image, stock_id) {
        var renderContainer = ub.utilities.buildTemplateString('#m-inksoft-stock-mascot-preview', {
            name: name,
            image: image,
            ID: stock_id
        });

        $(".inksoft-stock-mascot .stock-mascot-preview-container").html("");
        $(".inksoft-stock-mascot .stock-mascot-preview-container").html(renderContainer);
    },

    loadRichardsonCategories: function(cb) {
        var url = 'https://stores.inksoft.com/richardson_customizer/Api2/GetDesignCategories?Format=JSON';
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            data: '',
            processData: false,
            crossDomain: true,
            success: function (response) {
                cb(response);
            },
            error: function (error) {
                $.smkAlert({
                    text: 'Something went wrong, Please try again',
                    type: 'warn',
                    time: 1,
                    marginTop: '90px'
                });
                UIkit.modal("#richardson-stock-mascot").hide();
                console.log("ERROR while loading Inksoft Stock Mascot");
                console.log(error)
            }
        });
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
                cb(response);
            },
            error: function (error) {
                $.smkAlert({
                    text: 'Something went wrong, Please try again',
                    type: 'warn',
                    time: 1,
                    marginTop: '90px'
                });
                UIkit.modal("#richardson-stock-mascot").hide();
                console.log("ERROR while loading Inksoft Stock Mascot");
                console.log(error)
            }
        });
    },

    changeModalTitle: function(id) {
        $("#richardson-stock-mascot .richardson-stock-mascot-header").html("");

        if (ub.data.customTextCategoryID === id) {
            $("#richardson-stock-mascot .richardson-stock-mascot-header").html("Richardson Custom Text");
        } else {
            $("#richardson-stock-mascot .richardson-stock-mascot-header").html("Richardson Stock Logos");
        }
    }
}