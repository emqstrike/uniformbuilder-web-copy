function RichardsonSaveDesign() {

}

RichardsonSaveDesign.events = {
    isInit: true,

    init: function() {
        var that = this;
        if (RichardsonSaveDesign.events.isInit) {
            $("#right-pane-column").on('click', '.richardson-footer .save-uniform', that.onClickSaveDesign);
            $(".save-design-buttons").on("click", '.save', that.onSaveToMyDesign);
            RichardsonSaveDesign.events.isInit = false;
        }
    },


    onClickSaveDesign: function() {
        if (RichardsonSaveDesign.events.isUniformChange()) {
            RichardsonSaveDesign.events.showSaveDesgin();
            $(".uniform-thumbnail-container").addClass("uk-hidden");
            $(".save-design-buttons").addClass("uk-hidden");
            $(".saving-please-wait").addClass("uk-hidden");
            $('.save-design-loading').fadeIn();
            console.log("Uniform is change")
        } else {
            $(".uniform-thumbnail-container").removeClass("uk-hidden");
            $(".save-design-buttons").removeClass("uk-hidden");
            $(".saving-please-wait").addClass("uk-hidden");
            $('.save-design-loading').fadeOut();

            console.log("Uniform is not change")
        }
        UIkit.modal("#richardson-saved-design").show();
    },

    showSaveDesgin: function() {
        ub['front_view'].visible = true;
        ub['left_view'].visible = true;
        ub['right_view'].visible = true;
        ub['back_view'].visible = true;

        ub.funcs.turnLocationsOff();

        $(".uniform-thumbnail-container .front_view img").attr('src', '');
        $(".uniform-thumbnail-container .back_view img").attr('src', '');
        $(".uniform-thumbnail-container .left_view img").attr('src', '');
        $(".uniform-thumbnail-container .right_view img").attr('src', '');

        ub.current_material.settings.thumbnails = {
            front_view: "",
            back_view: "",
            left_view: "",
            right_view: ""
        }

        if (typeof ub.current_material.settings.previousThumbnails === "undefined") {
            ub.current_material.settings.previousThumbnails = {
                front_view: "",
                back_view: "",
                left_view: "",
                right_view: "",
            }
        }

        ub.funcs.removeLocations();
        this.uploadThumbnailSaveDesign('front_view');
        this.uploadThumbnailSaveDesign('back_view');
        this.uploadThumbnailSaveDesign('left_view');
        this.uploadThumbnailSaveDesign('right_view');
    },

    onSaveToMyDesign: function() {
        $('div.save-design-buttons').addClass("uk-hidden");
        $('div.saving-please-wait').removeClass("uk-hidden");

        var _userID = ub.user.id;
        var _designName = $('input#design-name').val();
        var _materialID = ub.current_material.material.id;
        var _builderCustomizations = ub.current_material.settings;
        var _sport = ub.current_material.material.uniform_category;
        var _frontView = ub.current_material.settings.thumbnails.front_view;
        var _backView = ub.current_material.settings.thumbnails.back_view;
        var _leftView = ub.current_material.settings.thumbnails.left_view;
        var _rightView = ub.current_material.settings.thumbnails.right_view;
        var _notes = $('#design-notes').val();

        var _data = {
            user_id: _userID.toString(),
            name: _designName,
            material_id: _materialID,
            material_name: ub.current_material.material.name,
            user: ub.user.fullname,
            builder_customizations: _builderCustomizations,
            sport: _sport,
            front_thumbnail: _frontView,
            back_thumbnail: _backView,
            left_thumbnail: _leftView,
            right_thumbnail: _rightView,
            notes: _notes
        };

        if (ub.data.updateSaveDesignFromCustomArtworkRequest) {
            
            _data.id = ub.config.savedDesignInfo.savedDesignID;
            _data.builder_customizations = _data.builder_customizations;

            delete _data.user;
            delete _data.material_name;

        }

        // Add flag
        if (typeof($('#is_add_to_team_store').val()) !== "undefined") {
            _data.is_add_to_team_store = $('#is_add_to_team_store:checked').length;
        }

        // Add store code if exists
        if (ub.store_code) {
            _data.store_code = ub.store_code;
        }

        RichardsonSaveDesign.events.postSaveDesign(_data);
    },

    postSaveDesign: function(data) {
        var _url = window.ub.config.api_host + '/api/saved_design'

        if (ub.data.updateSaveDesignFromCustomArtworkRequest) {
            _url = window.ub.config.api_host + '/api/saved_design/update';
        }

        // Skip notification when coming from local
        if (ub.config.app_env === 'local') { data.test_data = '1'; }
        
        delete $.ajaxSettings.headers["X-CSRF-TOKEN"];

        $.ajax({
            url: _url,
            dataType: "json",
            type: "POST",
            data: JSON.stringify(data),
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
        
            success: function (response){
                if (response.success) {
                    // if (typeof window.ub.user.type !== "undefined") {
                    //     ub.funcs.checkEmailPopup();
                    // } else {
                    //     ub.funcs.updatePopup();    
                    // }
                    UIkit.modal("#richardson-saved-design").hide();
                    $.smkAlert({text: response.message + '!', type:'success', time: 3, marginTop: '80px'});
                    // var is_add_to_team_store = false;
                    // if (typeof($('#is_add_to_team_store').val()) == "undefined") {
                    //     is_add_to_team_store = false;
                    // } else {
                    //     if ($('#is_add_to_team_store:checked').length) {
                    //         is_add_to_team_store = true;
                    //     }
                    // }

                    // if (is_add_to_team_store) {
                    //     // Make ID available globally; TeamStoreToolBox.js needs this var
                    //     ub.team_stores_material_id = response.team_stores_material_id;

                    //     TeamStoreToolBox.add_to_team_store(ub.current_material.material.id);
                    // }

                } else {
                    console.log('Error Saving Design.');
                    console.log(response.message);
                    UIkit.modal("#richardson-saved-design").hide();
                }
            }
        });
    },

    uploadThumbnailSaveDesign: function(view) {
        var _dataUrl = ub.getThumbnailImage(view);
        ub.current_material.settings.previousThumbnails[view] = _dataUrl;

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            data: JSON.stringify({ dataUrl: _dataUrl }),
            url: ub.config.host + "/saveLogo",
            dataType: "json",
            type: "POST", 
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
        
            success: function (response){
                if(response.success) {
                    ub.current_material.settings.thumbnails[view] = response.filename;
                    $(".uniform-thumbnail-container ." + view + " img").attr('src', response.filename);

                    if (ub.funcs.thumbnailsUploaded()) {
                        $('.save-design-loading').fadeOut();
                        $(".uniform-thumbnail-container").removeClass("uk-hidden");
                        $(".save-design-buttons").removeClass("uk-hidden");
                    }
                } else {
                    console.log('Error generating thumbnail for ' + view);
                    console.log(response.message);   
                }
            }
        });
    },

    // Check if the uniform has been modified
    isUniformChange: function() {
        if (typeof ub.current_material.settings.previousThumbnails === "undefined") {
            return true;
        } else {
            var isChangeFront = ub.current_material.settings.previousThumbnails["front_view"] !== ub.getThumbnailImage("front_view");
            var isChangeBack = ub.current_material.settings.previousThumbnails["back_view"] !== ub.getThumbnailImage("back_view");
            var isChangeLeft = ub.current_material.settings.previousThumbnails["left_view"] !== ub.getThumbnailImage("left_view");
            var isChangeRight = ub.current_material.settings.previousThumbnails["right_view"] !== ub.getThumbnailImage("right_view");
            var isChangeThumbnails = false;

            var isChangeThumbnails = isChangeFront || isChangeBack || isChangeLeft || isChangeRight;

            return isChangeThumbnails;
        }
    }
}