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
            $("#select-mascot-inksoft-modal").on("click", ".mascot-item .update-design-status", self.onUpdateDesignStatus);
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
    },

    onUpdateDesignStatus: function() {
        var self = this;
        var data = {
            type: $(this).data("status"),
            id: $(this).data("id"),
            design_id: $(this).data("design-id")
        }

        UserStockMascot.uiHandler.showLoader();
        
        UserStockMascot.funcs.updateDesignStatus(data, function(response) {
            console.log(response);
            if (response.success) {
                UserStockMascot.uiHandler.hideLoader();
                _.delay(function() {
                    $(self).closest(".mascot-item").fadeOut(function() {
                        $(this).remove();
                    });
                }, 1000)
            } else {
                UIkit.notification({
                    message: response.message,
                    status: 'danger',
                    pos: 'top-right',
                    timeout: 5000
                });
            }
        }, function(error) {
            console.log(error)
        })
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
    },

    updateDesignStatus: function(data, successHandler, errorHandler) {
        var _postData = {
            "archived": data.type === "active" ? '1' : '0',
            "id": data.id,
            "design_id": data.designID,
        }

        var url = api_host + '/api/v1-0/inksoft_design/update'

        $.ajax({
            url: url,
            type: "POST", 
            data: JSON.stringify(_postData),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {
                "accessToken": atob("YzcxMTU2NTUwNDBjMjliOTdkMGIxYTc1MmExMDZhMzcyNjUxMDkyZmUyMTE0MTIzMTRiNWE3MzNmYjQ0Mjc1NA==")
            },
            success: successHandler,
            error: errorHandler
        });
    }
}

UserStockMascot.uiHandler = {
    renderStockMascot: function(mascots) {
        var data = [];
        _.map(mascots, function(mascot) {
            data.push({
                ImageUrl: mascot.png_filename,
                Name: mascot.design_name,
                ID: mascot.design_id,
                status: mascot.archived,
                item_id: mascot.id
            });
        })

        var template = document.getElementById("user-stock-mascot-items").innerHTML;
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