function InksoftMascot() {

}


InksoftMascot.events = {
    isInit: true,
    designIdeasCategories: [],

    init: function() {
        var that = this;

        if (that.isInit) {
            $("body").on("click", '.show-stock-mascot', that.onShowStockMascot);

            $("#select-mascot-inksoft-modal").on("click", ".mascot-categories a.category-item", that.onClickCategoryItem)
            that.isInit = false;
        }
    },

    onShowStockMascot: function() {
        InksoftMascot.funcs.loadDesignIdeaCategories();
        UIkit.modal("#select-mascot-inksoft-modal").show();
    },

    onClickCategoryItem: function() {
        var category_id = $(this).data("category-id");
        InksoftMascot.funcs.loadDesignIdeasPerCategories(category_id);
        console.log(category_id)
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

    loadDesignIdeasPerCategories: function(category_id) {
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

                InksoftMascot.uiHandler.renderMascots(data);
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
    },

    renderMascots: function(data) {
        var template = document.getElementById("inksoft-stock-mascot-items").innerHTML;
        var markup = Mustache.render(template, {
            mascots: data
        });

        $("#select-mascot-inksoft-modal div.stock-mascot-container").html("");
        $("#select-mascot-inksoft-modal div.stock-mascot-container").html(markup);
    }
}