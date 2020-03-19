function InksoftMascot() {

}


InksoftMascot.events = {
    isInit: true,
    designIdeasCategories: [],

    init: function() {
        var that = this;

        if (that.isInit) {
            $("body").on("click", '.show-stock-mascot', that.onShowStockMascot);

            $("#select-mascot-inksoft-modal").on("click", ".mascot-categories a.category-item", that.onClickCategoryItem);
            $("#select-mascot-inksoft-modal").on("click", ".stock-mascot-container a.mascot-btn", that.onClickMascotItem);
            $("#select-mascot-inksoft-modal").on("click", ".modal-menu-mascot-header .mascot-menu-button", that.onChangeTab);
            that.isInit = false;
        }
    },

    onShowStockMascot: function() {
        InksoftMascot.uiHandler.showLoader();
        InksoftMascot.funcs.loadDesignIdeaCategories();
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
        var data = {
            id: $(this).data('stock-mascot-id'),
            image: $(this).data('image'),
            name: $(this).data("name"),
        }

        $("#select-mascot-inksoft-modal .stock-mascot-container .mascot-item").find(".activation-container").addClass("uk-hidden");
        $(this).find("div.activation-container").removeClass("uk-hidden");

        InksoftMascot.uiHandler.renderMascotPreivew(data);
    },

    onChangeTab: function() {
        var type = $(this).data("type");

        if (type === "upload") {
            $("#embed-inksoft-upload").html("");
            var element = document.getElementById("embed-inksoft-upload");
            Inksoft.funcs.loadInksoftUploader(element);
        } else if (type === "create") {
            $("#embed-inksoft-create").html("");
            var element = document.getElementById("embed-inksoft-create");
            Inksoft.funcs.loadInksoftDesigner(element);
        }
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
                        ImageUrl: mascot.Canvases[0].PngRelativeUrl,
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