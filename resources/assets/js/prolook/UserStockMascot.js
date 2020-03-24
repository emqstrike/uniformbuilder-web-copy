function UserStockMascot() {

}

UserStockMascot.archive = {};
UserStockMascot.active = {};

UserStockMascot.events = {
    isInit: true,

    init: function() {
        var self = this;

        if (self.isInit) {
            $("#select-mascot-inksoft-modal").on("click", ".my-design-category .filter-my-design", self.onFilterDesign);
            $("#select-mascot-inksoft-modal").on("click", ".my-designs-container .mascot-btn", self.onSelectMascotItem);
            
            self.isInit = false;
        }
    },

    onFilterDesign: function() {
        var type = $(this).data("type");

        if (type === "active") {
            UserStockMascot.funcs.loadMyStockMascotActive();
        } else {
            UserStockMascot.funcs.loadMyStockMascotArchive();
        }

        $(".my-design-category li.uk-active").removeClass("uk-active");
        $(this).parent().addClass("uk-active");   
    },

    onSelectMascotItem: function() {
        var data = {
            id: $(this).data('stock-mascot-id'),
            image: $(this).data('image'),
            name: $(this).data("name"),
        }

        $("#select-mascot-inksoft-modal .my-designs-container .mascot-item").find(".activation-container").addClass("uk-hidden");
        $(this).find("div.activation-container").removeClass("uk-hidden");

        UserStockMascot.uiHandler.renderPreview(data);
    }
}

UserStockMascot.funcs = {
    loadMyStockMascotActive: function() {
        var self = this;

        UserStockMascot.uiHandler.showLoader();
        self.getActiveStockMascot(87, function(response) {
            if (response.success) {
                UserStockMascot.uiHandler.renderStockMascot(response.inksoft_designs);
            } else {
                console.log("ERROR");
            }
        }, function(error) {
            console.log(error);
        })
    },
    
    loadMyStockMascotArchive: function() {
        var self = this;
        UserStockMascot.uiHandler.showLoader();
        self.getArchiveStockMascot(87, function(response) {
            if (response.success) {
                UserStockMascot.uiHandler.renderStockMascot(response.inksoft_designs);
            } else {
                console.log("ERROR");
            }
        }, function(error) {
            console.log(error);
        })
    },

    getActiveStockMascot: function(user_id, successHandler, errorHandler) {
        var url = api_host + '/api/v1-0/inksoft_design/getByCreatedByUserID/'+ user_id +'/active';
        getJSON(url, successHandler, errorHandler);
    },

    getArchiveStockMascot: function(user_id, successHandler, errorHandler) {
        var url = api_host + '/api/v1-0/inksoft_design/getByCreatedByUserID/'+ user_id +'/archived';
        getJSON(url, successHandler, errorHandler);
    }
}

UserStockMascot.uiHandler = {
    renderStockMascot: function(mascots) {
        var data = [];
        _.map(mascots, function(mascot) {
            data.push({
                ImageUrl: mascot.png_filename,
                Name: mascot.design_name,
                ID: mascot.design_id
            });
        })

        var template = document.getElementById("inksoft-stock-mascot-items").innerHTML;
        var markup = Mustache.render(template, {
            mascots: data
        });

        $("#select-mascot-inksoft-modal .my-designs-container").html("");
        $("#select-mascot-inksoft-modal .my-designs-container").html(markup);

        $(".my-designs-container .mascot-item a.mascot-btn").first().trigger("click");

        UserStockMascot.uiHandler.hideLoader();
    },

    renderPreview: function(data) {
        var template = document.getElementById("inksoft-stock-mascot-preview").innerHTML;
        var markup = Mustache.render(template, {
            id: data.id,
            name: data.name,
            image: data.image,
            type: "design-idea"
        });

        $("#select-mascot-inksoft-modal div.my-mascot-preview").html("");
        $("#select-mascot-inksoft-modal div.my-mascot-preview").html(markup);
    },

    showLoader: function() {
        $("#select-mascot-inksoft-modal div.my-designs-container").addClass("uk-hidden");
        $("#select-mascot-inksoft-modal div.stock-mascot-loading-screen-content").removeClass("uk-hidden");
    },

    hideLoader: function() {
        $("#select-mascot-inksoft-modal div.stock-mascot-loading-screen-content").addClass("uk-hidden");
        $("#select-mascot-inksoft-modal div.my-designs-container").removeClass("uk-hidden");
    }
}