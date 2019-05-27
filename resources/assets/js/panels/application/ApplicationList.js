function ApplicationList() {

}

ApplicationList.events = {
    isInit: true,

    init: function() {
        var that = this;

        if (that.isInit) {
            // Remove Application
            $("#application-list-modal").on('click', '.remove-application-button', that.removeApplicationOnList);
            // Show location marker
            $("#application-list-modal").on('click', '.show-location-markers', that.onShowLocationMarker);
            // On click on application
            $("#application-list-modal").on('click', 'li.layer', that.onClickApplicationLayer);
            // Remove Application

            that.isInit = false;
        }

        that.loadApplicationList();
    },

    loadApplicationList: function() {
        // Filter active
        var activeApplications = _.filter(ub.current_material.settings.applications, function(application) {
            if (ub.funcs.isTackleTwill()) {
                if (application.application_type === "free") {
                    return application
                }
            }
            if (typeof application.status === "undefined" || application.status === "on") {
                return application;
            }
        });
        // Sort by zindex
        var _applicationCollection = _.sortBy(activeApplications, 'zIndex').reverse();

        var applicationObject = [];

        _.map(_applicationCollection, function(application) {
            var applicationType = "";

            if (application.application_type === "embellishments" || application.application_type === "mascot" ) {
                applicationType = "LOGO";
            } else {
                applicationType = application.application_type.toUpperCase().replace('_', ' ')
            }

            var item = {
                zindex: application.zIndex,
                code: application.code,
                caption: ub.funcs.getSampleCaption(application),
                view: ub.funcs.getPrimaryView(application.application).substring(0, 1).toUpperCase(),
                application_type: applicationType,
                type: application.application_type
            }

            applicationObject.push(item);
        });

        data = {
            applications: applicationObject
        };

        var applicationListUI = ub.utilities.buildTemplateString('#m-application-layer-list', data);

        $("#application-list-modal ul.application-list").html("")
        $("#application-list-modal ul.application-list").html(applicationListUI);

        ub.data.sorting = false;

        ub.sort = $("ul.application-list").sortable({
            handle: '.layer',
            animation: 150,
            onStart: function (evt) {
                ub.data.sorting = true;
                ub.data.justSorted = true;
            },
            onEnd: function (evt) {
                ub.data.sorting = false;
                ub.data.justSorted = true;

            },
            onUpdate: function (evt) {
                $.each($('li.layer'), function (key, value) {
                    var _length = _.size(ub.current_material.settings.applications);
                    var _index = _length - (key + 1);
                    var _locID = $(value).data('location-id');
                    var _app = ub.current_material.settings.applications[_locID];
                    _app.zIndex = _index;

                    $(this).find('li.zIndex').html(_index + 1);

                    if (_app.application_type === "free") {
                        return;
                    }

                    _.each(_app.application.views, function (view) {

                        var _obj = ub.objects[view.perspective + '_view']['objects_' + _locID];

                        if (_obj.zIndex !== 0) { // Skip changing zIndex if application is disabled
                            _obj.zIndex = -(ub.funcs.generateZindex('applications') + _index);
                        }
                    });
                });

                ub.updateLayersOrder(ub.front_view);
                ub.updateLayersOrder(ub.back_view);
                ub.updateLayersOrder(ub.left_view);
                ub.updateLayersOrder(ub.right_view);
            }
        });

        // $("#application-list-modal").modal("show")
        UIkit.modal("#application-list-modal").show();
    },

    removeApplicationOnList: function() {
        /* Act on the event */
        var application_id = $(this).data("application-id");
        var application_type = $(this).data("application-type");

        console.log(application_id, application_type)

        $("#application-list-modal .application-list li.application-item-" + application_id).fadeOut();
    },

    onShowLocationMarker: function() {
        var status = $(this).data("status");

        if (ub.showLocation) {
            $(this).html("");
            $(this).html("Hide Location Marker")
            ub.funcs.showLocations();
        } else {
            $(this).html("");
            $(this).html("Show Location Marker")
            ub.funcs.removeLocations();
        }

        UIkit.modal("#application-list-modal").hide();
    },

    onClickApplicationLayer: function() {
        /* Act on the event */
        var location = $(this).data("location-id");
        var application_type = $(this).data("application-type");

        console.log("location", location)
        console.log("location", application_type)

        // $("#primary_options_container").scrollTo('li.applicationUIBlockNew[data-application-id="'+ location +'"]', {duration: 700});
    },
}