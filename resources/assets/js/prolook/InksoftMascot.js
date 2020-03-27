function InksoftMascot() {

}


InksoftMascot.events = {
    isInit: true,
    designIdeasCategories: [],

    init: function() {
        var that = this;

        if (that.isInit) {
            $("#select-mascot-inksoft-modal").on("click", ".existing-mascot-category a.mascot-type", that.onSelectMascotCategory);
            $("#select-mascot-inksoft-modal").on("click", ".mascot-categories a.category-item", that.onClickCategoryItem);
            $("#select-mascot-inksoft-modal").on("click", ".stock-mascot-container a.mascot-btn", that.onClickMascotItem);
            $("#select-mascot-inksoft-modal").on("click", ".edit-current-mascot", that.onEditMascot);
            $("#select-mascot-inksoft-modal").on("click", ".apply-mascot", that.onApplyMascot);
            $("#select-mascot-inksoft-modal, #inksoft-design-editor-modal").on("click", ".cancel-mascot", that.onCancelCustomMascot);
            that.isInit = false;
        }
    },

    onSelectMascotCategory: function() {
        var type = $(this).data("type");

        if (type === "inksoft") {
            InksoftMascot.uiHandler.showLoader();
            InksoftMascot.funcs.loadDesignIdeaCategories();
        } else {
            var type = $("#select-mascot-inksoft-modal .my-design-category li.uk-active a").data("type");
            if (type === "archive") {
                UserStockMascot.funcs.loadMyStockMascotArchive();
            } else {
                UserStockMascot.funcs.loadMyStockMascotActive();
            }
        }
    },

    onShowStockMascot: function() {
        UserStockMascot.events.init();
        InksoftMascot.events.init();
        if (ub.user) {
            $("#select-mascot-inksoft-modal .existing-mascot-category a.mascot-type").first().parent().removeClass("uk-hidden");
            $("#select-mascot-inksoft-modal .existing-mascot-category a.mascot-type").first().trigger("click");
        } else {
            $("#select-mascot-inksoft-modal .existing-mascot-category a.mascot-type").first().parent().addClass("uk-hidden");
            UIkit.switcher(".existing-mascot-category").show(1);
            $("#select-mascot-inksoft-modal .existing-mascot-category a.mascot-type").last().trigger("click");
        }
        UIkit.modal("#select-mascot-inksoft-modal").show();
    },

    onClickCategoryItem: function() {
        var category_id = $(this).data("category-id");
        
        InksoftMascot.uiHandler.showLoader();
        InksoftMascot.funcs.loadDesignIdeasPerCategories(category_id, function(data) {
            InksoftMascot.uiHandler.renderMascots(data);

            // Select First Item
            $("#select-mascot-inksoft-modal .stock-mascot-container .mascot-item").first().find("a.mascot-btn").trigger("click");

            InksoftMascot.uiHandler.hideLoader();
        });

        $("ul.mascot-categories").find("li.uk-active").removeClass("uk-active");
        $(this).parent().addClass("uk-active");
    },

    onClickMascotItem: function() {
        ub.data.currentStockMascotID = $(this).data('stock-mascot-id')
        var data = {
            id: ub.data.currentStockMascotID,
            image: $(this).data('image'),
            name: $(this).data("name"),
        }

        $("#select-mascot-inksoft-modal .stock-mascot-container .mascot-item").find(".activation-container").addClass("uk-hidden");
        $(this).find("div.activation-container").removeClass("uk-hidden");

        InksoftMascot.uiHandler.renderMascotPreivew(data);
    },

    onEditMascot: function() {
        var design_id = $(this).data("stock-mascot-id");
        var application = ub.data.newApplication;
        InksoftMascot.funcs.onShowEditDesignModal(design_id, application.code, function() {
            UIkit.modal("#select-mascot-inksoft-modal").hide();
            UIkit.modal("#inksoft-design-editor-modal").show();
        });
    },

    onApplyMascot: function() {
        var that = this;
        var stockID = ub.data.currentStockMascotID;
        var application = ub.data.newApplication;

        if (typeof stockID !== "undefined") {
            var _matchingID = undefined;
            ub.isMessageIsCalled = true;
            console.log(application.code)
            is.isMessage(stockID, application.code, undefined);
            _matchingID = ub.data.matchingIDs.getMatchingID(application.code);

            if (typeof _matchingID !== "undefined") {
                ub.isMessageIsCalled = true;
                var _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});
                is.isMessage(stockID, _matchingSettingsObject.code, undefined);
            }
        } else {
            ub.utilities.warn("Missing design id")
        }

        UIkit.modal("#select-mascot-inksoft-modal").hide();
    },

    onCancelCustomMascot: function() {
        var application = ub.data.newApplication;
        if (typeof application !== "undefined") {
            ub.funcs.deleteLocation(application.code);
        }
        // Note
        console.log("When updating the design, the application must not delete.")
        
        UIkit.modal("#inksoft-design-editor-modal").hide();
        UIkit.modal("#select-mascot-inksoft-modal").hide();
    }
}

InksoftMascot.funcs = {
    loadDesignIdeaCategories: function() {
        if (typeof InksoftMascot.events.designIdeasCategories !== "undefined" && _.size(InksoftMascot.events.designIdeasCategories) > 0) {
            InksoftMascot.uiHandler.renderCategoryies(InksoftMascot.events.designIdeasCategories);
        } else {
            Inksoft.funcs.getDesignIdeaCategories(function(response) {
                if (response.OK) {
                    _.map(response.Data, function(category) {
                        InksoftMascot.events.designIdeasCategories.push({
                            ID: category.ID,
                            Name: category.Name,
                            isParent: _.size(category.Children) > 0,
                            Children: category.Children
                        })
                    })

                    InksoftMascot.uiHandler.renderCategoryies(InksoftMascot.events.designIdeasCategories);
                } else {
                    UIkit.modal("#select-mascot-inksoft-modal").hide();
                    console.log("Failed to fetch design ideas categories");
                }
            }, function(error) {
                UIkit.modal("#select-mascot-inksoft-modal").hide();
                console.log(error)
            });
        }
    },

    loadDesignIdeasPerCategories: function(category_id, callback) {
        Inksoft.funcs.getDesignIdeasByCategory(category_id, function(response) {
            if (response.OK) {
                var data = [];

                _.map(response.Data, function(mascot) {
                    data.push({
                        ImageUrl: 'https://images.inksoft.com' + mascot.Canvases[0].PngRelativeUrl,
                        Name: mascot.Name,
                        ID: mascot.DesignID
                    });
                })

                callback(data);
            } else {
                console.log("Empty")
            }
        }, function(error) {
            UIkit.modal("#select-mascot-inksoft-modal").hide();
            console.log("Failed to fetch design ideas categories");
        });
    },

    onShowEditDesignModal: function(design_id, application_id, callback) {
        $("#inksoft-design-editor-modal #InksoftDesignEditor").html("");
        var element = document.getElementById("InksoftDesignEditor");
        
        Inksoft.funcs.loadInksoftDesigner(element, application_id, design_id, callback);
    }
}

InksoftMascot.uiHandler = {
    renderCategoryies: function(data) {
        var template = document.getElementById("inksoft-design-categories").innerHTML;
        var markup = Mustache.render(template, {
            categories: data
        });

        $("#select-mascot-inksoft-modal ul.mascot-categories").html("");
        $("#select-mascot-inksoft-modal ul.mascot-categories").html(markup);

        $("ul.mascot-categories li").first().find("a").trigger("click");
    },

    renderMascots: function(data) {
        var template = document.getElementById("inksoft-stock-mascot-items").innerHTML;
        var markup = Mustache.render(template, {
            mascots: data
        });

        $("#select-mascot-inksoft-modal div.stock-mascot-container").html("");
        $("#select-mascot-inksoft-modal div.stock-mascot-container").html(markup);
    },

    renderMascotPreivew: function(data) {
        var template = document.getElementById("inksoft-stock-mascot-preview").innerHTML;
        var markup = Mustache.render(template, {
            id: data.id,
            name: data.name,
            image: data.image,
            type: "design-idea"
        });

        $("#select-mascot-inksoft-modal div.stock-mascot-preview").html("");
        $("#select-mascot-inksoft-modal div.stock-mascot-preview").html(markup);
    },

    showLoader: function() {
        $("#select-mascot-inksoft-modal div.stock-mascot-container").addClass("uk-hidden");
        $("#select-mascot-inksoft-modal div.stock-mascot-loading-screen-content").removeClass("uk-hidden");
    },

    hideLoader: function() {
        $("#select-mascot-inksoft-modal div.stock-mascot-loading-screen-content").addClass("uk-hidden");
        $("#select-mascot-inksoft-modal div.stock-mascot-container").removeClass("uk-hidden");
    }
}