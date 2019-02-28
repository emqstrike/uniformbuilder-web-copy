function SummaryPreviewPanel() {};


SummaryPreviewPanel.events = {
    is_init_events_called: 0,

    init: function() {
        var _this = this;
        if (SummaryPreviewPanel.events.is_init_events_called === 0) {
            $("#right-pane-column").on('click', '.richardson-footer .uniform-summary-preview', function(event) {
                event.preventDefault();
                // Show loader
                $(".pdf-iframe-container").hide();
                $(".loading").show();

                // Check if all thumbnails uploaded
                if (_this.isUniformChange() || typeof ub.current_material.settings.uniformPreviewPdf === "undefined") {
                    _this.prepareThumbnails();
                } else {
                    $(".pdf-iframe-container").show();
                    $(".loading").hide();
                }

                // Show Modal
                UIkit.modal("#richardson-summary-preview").show();
            });
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
            "applicationType": ub.config.uniform_application_type
        }

        var url = "http://34.214.34.246/api/upload";

        $(".pdf-iframe-container .pdf-iframe").prop('src', '');

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
                    $(".pdf-iframe-container").show();
                    $(".loading").hide();
                    $(".pdf-iframe-container .pdf-iframe").prop('src', response.pdfUrl)
                    ub.current_material.settings.uniformPreviewPdf = response.pdfUrl;
                } else {
                    console.log("Something went wrong")
                }
            },

            error: function(error) {
                $.smkAlert({
                    text: 'Something went wrong while generating the PDF. Please try again later. Send your feedback if the problem persists. We appreciate your comments. Our team will be working on it as soon as possible.',
                    type: 'warning'
                });

                UIkit.modal("#richardson-summary-preview").hide();
            }
        });
    },

    prepareThumbnails: function() {
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
                    if (ub.funcs.thumbnailsUploaded()) {
                        _.delay(function(){SummaryPreviewPanel.events.pdfBuilder();}, 1000)
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