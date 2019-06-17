function SummaryPreviewPanel() {};


SummaryPreviewPanel.events = {
    is_init_events_called: 0,

    init: function() {
        var _this = this;
        if (SummaryPreviewPanel.events.is_init_events_called === 0) {
            $("#right-pane-column").on('click', '.richardson-footer .uniform-summary-preview', function(event) {
                // // Show loader
                // Check if all thumbnails uploaded
                if (_this.isUniformChange() || ub.data.rosterIsChange) {
                    $("#richardson-saving-option .uniform-thumbnail-container").addClass("uk-hidden");
                    $('#richardson-saving-option .save-design-loading').fadeIn();
                    if (typeof ub.current_material.settings.uniformPreviewPdf === "undefined" || ub.data.rosterIsChange) {
                        _this.prepareThumbnails();
                    }
                } else {
                    $("#richardson-saving-option .uniform-thumbnail-container").removeClass("uk-hidden");
                    $('#richardson-saving-option .save-design-loading').fadeOut();
                }

                var template = '';
                if (ub.funcs.isDealer()) {
                    template = document.getElementById("m-summary-dealer").innerHTML;
                } else if (ub.funcs.isPlayer()) {
                    template = document.getElementById("m-summary-player").innerHTML;
                } else {
                    template = document.getElementById("m-summary-guest").innerHTML;
                }

                var renderTemplate = Mustache.render(template);
                $("#richardson-saving-option .summary-content").html("");
                $("#richardson-saving-option .summary-content").html(renderTemplate);

                // RichardsonSaveDesign.events.showSaveDesgin();
                UIkit.modal("#richardson-saving-option").show();
            });

            $("#richardson-saving-option").on("click", ".switch-reg-login", function() {
                var type = $(this).data("type");

                if (type === "login") {
                    $("#richardson-saving-option .login-container").removeClass("uk-hidden");
                    $("#richardson-saving-option .registration-container").addClass("uk-hidden");
                } else {
                    $("#richardson-saving-option .registration-container").removeClass("uk-hidden");
                    $("#richardson-saving-option .login-container").addClass("uk-hidden");
                }
            })

            SummaryPreviewPanel.events.is_init_events_called = 1
        }
    },

    // Generate PDF
    pdfBuilder: function() {
        var data = {
            "selectedSource":"Richardson Customizer",
            "selectedTemplate":"Richardson",
            "searchKey": Math.random().toString(36).substring(2, 15) + "-RCY-" + new Date().getFullYear(),
            "thumbnails": ub.current_material.settings.thumbnails,
            "category": ub.config.sport,
            "fullName": ub.user ? ub.user.fullname : "Guest User",
            "client": ub.user ? ub.user.fullname : "Guest User",
            "orderId":"",
            "foid":"",
            "description": ub.config.blockPattern,
            "cutPdf": ub.current_material.settings.cut_pdf,
            "stylesPdf": ub.current_material.settings.styles_pdf,
            "roster": ub.current_material.settings.roster,
            "pipings": ub.current_material.settings.pipings,
            "createdDate": moment().format('LL'),
            "notes":"",
            "sizeBreakdown": ub.current_material.settings.size_breakdown,
            "applications": ub.current_material.settings.applications,
            "sizingTable":"",
            "upper": ub.config.type === "upper" ? ub.current_material.settings.upper : "",
            "lower": ub.config.type === "lower" ? ub.current_material.settings.lower : "",
            "hiddenBody": ub.current_material.settings.hiddenBody,
            "randomFeeds": ub.funcs.isSocks() ? ub.current_material.settings.randomFeeds: "",
            "legacyPDF":"",
            "applicationType": ub.config.uniform_application_type,
        }


        $(".pdf-iframe-container .pdf-iframe").prop('src', '');

        var url = "https://pdf-generator.prolook.com/api/upload";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {
                "accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null
            },
            success: function (response) {
                if (response.success) {
                    $('#richardson-saving-option .save-design-loading').fadeOut();
                    $("#richardson-saving-option .design-preview").removeClass("uk-hidden");
                    $("#richardson-saving-option .uniform-thumbnail-container").removeClass("uk-hidden");
                    ub.current_material.settings.uniformPreviewPdf = response.pdfUrl;

                    $("#richardson-saving-option .pdf-container").html("");
                    $("#richardson-saving-option .pdf-container").html('<span class="uk-text-bold">PDF: </span> <a href="'+ response.pdfUrl +'" class="pdf-link" target="_blank">'+ response.pdfUrl +'</a>');
                    ub.data.rosterIsChange = false;
                } else {
                    $.smkAlert({
                        text: 'Something went wrong while generating the PDF. Please try again later. Send your feedback if the problem persists. We appreciate your comments. Our team will be working on it as soon as possible.',
                        type: 'warning'
                    });

                    UIkit.modal("#richardson-summary-preview").hide();
                    UIkit.modal("#richardson-saving-option").hide();
                }
            },

            error: function(error) {
                $.smkAlert({
                    text: 'Something went wrong while generating the PDF. Please try again later. Send your feedback if the problem persists. We appreciate your comments. Our team will be working on it as soon as possible.',
                    type: 'warning'
                });

                UIkit.modal("#richardson-summary-preview").hide();
                UIkit.modal("#richardson-saving-option").hide();
            }
        });
    },

    prepareThumbnails: function() {
        ub.front_view.visible = true;
        ub.back_view.visible = true;
        ub.left_view.visible = true;
        ub.right_view.visible = true;

        ub.funcs.deactivateMoveTool();

        ub.current_material.settings.thumbnails = {
            front_view: "",
            back_view: "",
            left_view: "",
            right_view: "",
        }

        if (typeof ub.current_material.settings.previousThumbnails === "undefined") {
            ub.current_material.settings.previousThumbnails = {
                front_view: "",
                back_view: "",
                left_view: "",
                right_view: "",
            }
        }

        this.uploadThumbnailUniformPreview("front_view")
        this.uploadThumbnailUniformPreview("back_view")
        this.uploadThumbnailUniformPreview("left_view")
        this.uploadThumbnailUniformPreview("right_view")
    },

    // Upload uniform images to be used for the PDF Viewer
    uploadThumbnailUniformPreview: function (view) {
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
                    $("#richardson-saving-option .uniform-thumbnail-container ." + view + " img").attr('src', response.filename);
                    if (ub.funcs.thumbnailsUploaded()) {
                        _.delay(function() {
                            if (ub.funcs.isDealer()) {
                                SummaryPreviewPanel.events.pdfBuilder();
                            } else {
                                $('#richardson-saving-option .save-design-loading').fadeOut();
                                $("#richardson-saving-option .design-preview").removeClass("uk-hidden");
                                $("#richardson-saving-option .uniform-thumbnail-container").removeClass("uk-hidden");
                            }
                        }, 1000);
                    }
                } else {
                    console.log('Error generating thumbnail for ' + view);
                    console.log(response.message);
                }
            },

            error: function(error) {
                console.log(error);
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