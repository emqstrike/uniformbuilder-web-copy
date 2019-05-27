/**
 * NewApplicationPanel.js
 * - handler for the adding new application
 * @since March 26, 2019
 * @author 
 * - Aron Joshua Bagtas <aaron@qstrike.com>
 *
 * Requirements:
 * - jQuery
 * - Mustache
 *
 * Usage:
 *  For adding of new application
 */

function NewApplicationPanel() {}

NewApplicationPanel.events = {
    isInit: true,

    init: function() {
        var _this = this;
        if (NewApplicationPanel.events.isInit) {
            // For adding of Application
            $("#primary_options_container").on('click', '.new-application-container .show-add-application-options', _this.showAddApplicationBlock);
            // Add another account
            $("#primary_options_container").on('click', '.add-another-application-container .add-another-application', _this.showAddAnotherApplication);
            // Cancel Adding
            $("#primary_options_container").on('click', '.add-new-application-block .cancel-adding-application', _this.onCancelAddApplication);
            // Cancel Adding another account
            $("#primary_options_container").on('click', '.add-another-application-container .cancel-adding-another-application', _this.onCancelAddAnotherApplication);
            // On Add Application
            $("#primary_options_container").on('click', '.add-new-application-block .add-new-application', _this.onAddNewApplication);
            // On Select Design type
            $("#primary_options_container").on('click', '.design-type-container .design-type-button', _this.onSelectDesignType);
            // On Select Perpective
            $("#primary_options_container").on('click', '.perspective-container .perspective', _this.onSelectPerspective);
            //On Select Uniform Part
            $("#primary_options_container").on('click', '.parts-container .part', _this.onSelectPart);
            // On Select part side
            $("#primary_options_container").on('click', '.side-container .side', _this.onSelectPartSide);

            // View Application List
            $("#primary_options_container").on('click', '.view-application-list', _this.onViewApplicationList);
            // Remove Application
            $("#application-list-modal").on('click', '.remove-application-button', _this.removeApplicationOnList);
            // Show location marker
            $("#application-list-modal").on('click', '.show-location-markers', _this.onShowLocationMarker);
            // On click on application
            $("#application-list-modal").on('click', 'li.layer', _this.onClickApplicationLayer);
            // Remove Application
            $("#primary_options_container").on('click', '.applicationUIBlockNew .remove-decoration', _this.onRemoveDecoration);
            NewApplicationPanel.events.isInit = false;
        }
    },

    showAddAnotherApplication: function() {
        $(".container-add-another-view-application").hide();
        $(".container-add-view-application").show();
        var title = $(this).data("application-title");
        var type = $(this).data("application-type");
        
        var data = ub.funcs.getNewApplicationContainer(title, type);
        var _htmlBuilder = ub.utilities.buildTemplateString('#m-add-another-application', data);

        $(".modifier_main_container .add-another-application-block").html("");
        $(".modifier_main_container .add-application-block").html("");
        $(".modifier_main_container .add-another-application-block").html(_htmlBuilder);

        $("#add-another-decoration-modal .uk-moda").html("");
        $("#add-another-decoration-modal .uk-moda").html(_htmlBuilder);

        // Activate first button
        if (typeof ub.data.modifierLabels.Base !== "undefined") {
            $('.parts-container div button[data-id="Base"]').click();
        } else {
            $('.perspective-container button.perspective[data-id="' + ub.active_view + '"]').click();
        }
    },

    onCancelAddAnotherApplication: function() {
        $(".container-add-another-view-application").show();
        $(".modifier_main_container .add-another-application-block").html("");
    },

    showAddApplicationBlock: function() {
        $(".container-add-view-application").hide();
        $(".container-add-another-view-application").show();
        var type = $(this).data("application-type");
        var title = $(this).data("application-title").toLowerCase();

        var data = ub.funcs.getNewApplicationContainer(title, type);
        var _htmlBuilder = ub.utilities.buildTemplateString('#m-add-new-application', data);

        $(".modifier_main_container .add-another-application-block").html("");
        $(".modifier_main_container .add-application-block").html("");
        $(".modifier_main_container .add-application-block").html(_htmlBuilder);

        // Activate first button
        if (typeof ub.data.modifierLabels.Base !== "undefined") {
            $('.parts-container div button[data-id="Base"]').click();
        } else {
            $('.perspective-container button.perspective[data-id="' + ub.active_view + '"]').click();
        }
    },

    onCancelAddApplication: function() {
        $(".container-add-view-application").show();
        $(".modifier_main_container .add-application-block").html("");
    },

    onSelectDesignType: function() {
        var _perspective = $('.perspective-container button.perspective.uk-active').data('id');
        var _part = $('.parts-container button.part.uk-active').data('id');
        var _type = $(this).data('type');
        var _side;
        if (_part === "Sleeve") {
            _side = $('.parts-container button.part.uk-active').data("perspective");
        }

        ub.funcs.newApplication(_perspective, _part, _type, _side);

        $(".container-add-view-application").show();
        $(".modifier_main_container .add-application-block").html("");
    },

    onSelectPerspective: function() {
        $(".perspective-container").find("button.uk-active").removeClass('uk-active');
        var view = $(this).data('id');
        var _partToMakeActive = "";
        if ($(this).data('id') === "front" || $(this).data('id') === "back") {
            _partToMakeActive = $(this).data("id").toTitleCase();
            $('div.parts-container button').each(function() {
                var part = $(this).data("id");
                if (part.includes(_partToMakeActive)) {
                    $(".parts-container").find('button.part.uk-active').removeClass('uk-active');
                    $(".parts-container").find('button[data-id="'+ part +'"].part').addClass("uk-active");
                }
            });
        } else if ($(this).data('id') === "left" || $(this).data('id') === "right") {
            // If LEFT or RIGHT perspective is clicked,
            var activePart = $(".parts-container").find('button.part.uk-active');
            activePart.removeClass('uk-active');
            var part = $(".parts-container").find('button[data-id="Sleeve"][data-perspective="'+ view +'"].part');

            if (part.length > 0) {
                part.addClass('uk-active');
            } else {
                $(".parts-container button.part").first().addClass("uk-active");
            }
        }

        if (ub.active_view !== view) {
            var perspective = new PerspectiveController();
            perspective.setPerspective(view)
        }

        $(this).addClass('uk-active')
    },

    onSelectPart: function() {
        $(".parts-container").find("button.uk-active").removeClass('uk-active');
        var part = $(this).data("id");

        if (part.includes("Front")) {
            $(".perspective-container").find('button[data-id="front"].perspective').trigger('click');
        } else if (part.includes("Back")) {
            $(".perspective-container").find('button[data-id="back"].perspective').trigger('click');
        } else if (part === "Sleeve") {
            var perspective = $(this).data("perspective");
            $(".perspective-container").find('button[data-id="' + perspective + '"].perspective').trigger('click');
        }
        
        $(this).addClass('uk-active');
    },

    onSelectPartSide: function() {
        $(".side-container").find("button.uk-active").removeClass('uk-active');
        $(this).addClass('uk-active')

        // Change active perspective along with the side that is clicked
        $(".perspective-container").find('button[data-id="' + $(this).data('id') + '"].perspective').trigger('click');
    },

    onAddNewApplication: function() {
        var _perspective = $('.perspective-container button.perspective.uk-active').data('id');
        var _part = $('.parts-container button.part.uk-active').data('id');
        var _type = $('.design-type-container button.design-type-button.uk-active').data('type');
        var _side;
        if (_part === "Sleeve") {
            _side = $('.parts-container button.part.uk-active').data("perspective");
        }

        ub.funcs.newApplication(_perspective, _part, _type, _side);

        $(".container-add-view-application").show();
        $(".modifier_main_container .add-application-block").html("");
    },

    // Application List
    onViewApplicationList: function() {
        ApplicationList.events.init();
    },

    removeApplicationOnList: function() {
        /* Act on the event */
        var application_id = $(this).data("application-id");
        var application_type = $(this).data("application-type");

        _.delay(function() {
            $('li.applicationUIBlockNew[data-application-id="'+ application_id +'"] .hide-letters-opt').trigger('click');

            if (application_type === "embellishments" || application_type === "mascot") {
                $('li.applicationUIBlockNew[data-application-id="'+ application_id +'"] .hide-show-button-container .hide-application').trigger('click');
            }
        }, 50);

        $("#application-list-modal .application-list li.application-item-" + application_id).fadeOut();
    },

    onShowLocationMarker: function() {
        var status = $(this).data("status");

        if (status === "show") {
            $(this).data("status", "hide");
            $(this).html("");
            $(this).html("Hide Location Marker")
            ub.funcs.showLocations();
        }

        if (status === "hide") {
            $(this).data("status", "show");
            $(this).html("");
            $(this).html("Show Location Marker")
            ub.funcs.removeLocations();
        }

        $("#application-list-modal").modal("hide")
    },

    onClickApplicationLayer: function() {
        /* Act on the event */
        var location = $(this).data("location-id");
        var application_type = $(this).data("application-type");

        $("#primary_options_container").scrollTo('li.applicationUIBlockNew[data-application-id="'+ location +'"]', {duration: 700});
    },

    onRemoveDecoration: function() {
        var application_id = $(this).closest(".applicationUIBlockNew").data('application-id');
        var applicationSettings = ub.funcs.getApplicationSettings(application_id);
        var isLetters = applicationSettings.application_type === "player_name" || applicationSettings.application_type === "team_name" ? true : false;
        var isMascots = applicationSettings.application_type === "mascot" || applicationSettings.application_type === "embellishments" ? true : false;
        var isNumbers = applicationSettings.application_type === "front_number" || applicationSettings.application_type === "back_number" || applicationSettings.application_type === "sleeve_number" ? true : false;
        var message = isMascots ? "logo" : applicationSettings.application.name;

        UIkit.modal.confirm('Are you sure you want to delete ' + message + ' #' + applicationSettings.code + '?').then(function() {
            $('.modifier_main_container').find($('li[data-application-id=' + applicationSettings.code + '].applicationUIBlockNew')).remove();
            
            if (!ub.funcs.isTackleTwill()) {
                ub.funcs.deleteLocation(applicationSettings.code);
                var count;
                if (isLetters) {
                    count = ub.funcs.countApplicationByApplicationType("letters");
                } else if (isMascots) {
                    count = ub.funcs.countApplicationByApplicationType("logos");
                } else if (isNumbers) {
                    count = ub.funcs.countApplicationByApplicationType("numbers");
                }

                if (typeof count.applications === "undefined") {
                    $(".add-another-application-container").hide();
                }
            } else {
                
                ub.funcs.richardsonDeleteApplicaiton(applicationSettings.code, applicationSettings.application_type);

                if (isMascots) {
                    MascotPanel.init();
                } else if (isNumbers) {
                    NumbersPanel.init();
                } else if (isLetters) {
                    LetterPanel.init();
                }
            }
        
        }, function () {
            console.log('Rejected.') 
        });
    }
}