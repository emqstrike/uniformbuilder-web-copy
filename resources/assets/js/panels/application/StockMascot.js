function StockMascot() {

}

StockMascot.events = {
    isInit: true,
    init: function() {
        var that = this;
        if (that.isInit) {
            $(".inksoft-stock-mascot").on("click", ".stock-mascot-categories a", that.onClickStockMascotCategory);
        }
        that.isInit = false;

        StockMascot.funcs.loadStockMascot();
    },

    onClickStockMascotCategory: function() {
        var that = this;
        var categoryID = $(this).data("category-id");
        StockMascot.funcs.loadArtByCategory(categoryID, function(response) {
            console.log(response);
        });
    },
}

StockMascot.funcs = {
    loadStockMascot: function() {
        var stockMascotCategoryID = 1000683;
        var that = this;
        if (typeof ub.data.stockMascot === "undefined") {
            that.loadRichardsonCategories(function(response) {
                if (response.StatusCode) {
                    var richardsonStockMascots = _.find(response.Data, {ID: stockMascotCategoryID});
                    if (typeof richardsonStockMascots !== "undefined") {
                        ub.data.stockMascot = richardsonStockMascots;
                        that.prepareStockMascotCategories(ub.data.stockMascot);
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

        $("li.inksoft-stock-mascot .stock-mascot-categories").html("");
        $("li.inksoft-stock-mascot .stock-mascot-categories").html(renderContainer);
    },

    prepareStockMascot: function(data) {
        var renderContainer = ub.utilities.buildTemplateString('#m-inksoft-stock-mascot-categories-list', {
            categories: categories.Children
        });

        $("li.inksoft-stock-mascot .stock-mascot-list-container").html("");
        $("li.inksoft-stock-mascot .stock-mascot-list-container").html(renderContainer);
    },

    loadRichardsonCategories: function(cb) {
        var url = 'https://stores.inksoft.com/richardson_customizer/Api2/GetClipArtCategories?Format=JSON';
        ub.utilities.getJSON(url, function(response) {
            cb(response);
        }, function(error) {
            console.log("ERROR while loading Inksoft Categories");
            console.log(error)
        })
    },

    loadArtByCategory: function(id, cb) {
        var url = 'https://stores.inksoft.com/richardson_customizer/Api2/GetStoreArt?CategoryId='+ id +'&Format=JSON';
        ub.utilities.getJSON(url, function(response) {
            cb(response);
        }, function(error) {
            console.log("ERROR while loading Inksoft Categories");
            console.log(error)
        })
    }
}