function SummaryPreviewPanel() {};


SummaryPreviewPanel.events = {
    is_init_events_called: 0,

    init: function() {
        var _this = this;
        if (SummaryPreviewPanel.events.is_init_events_called === 0) {
            $("#right-pane-column").on('click', '.richardson-footer .uniform-summary-preview', function(event) {
                event.preventDefault();
                /* Act on the event */
                _this.pdfBuilder();
                UIkit.modal("#richardson-summary-preview").show();
            });
            SummaryPreviewPanel.events.is_init_events_called = 1
        }
    },

    pdfBuilder: function() {
        var data = {
          "selectedSource":"Prolook Customizer",
          "selectedTemplate":"Richardson",
          "searchKey":"2018-PCY",
          "thumbnails": {
            "front_view":"https:\/\/s3.us-west-2.amazonaws.com\/uniformbuilder\/uploads\/local\/0ee11aa60c27172c5a2fc67a190abdbc.png",
            "back_view":"https:\/\/s3.us-west-2.amazonaws.com\/uniformbuilder\/uploads\/local\/468b114e15f07cc92356c86411a08ccc.png",
            "left_view":"https:\/\/s3.us-west-2.amazonaws.com\/uniformbuilder\/uploads\/local\/f5652bede172f91c5079d71bb1421b65.png",
            "right_view":"https:\/\/s3.us-west-2.amazonaws.com\/uniformbuilder\/uploads\/local\/224e4e89c93f3f0223208bd39918e8dd.png"
          },
          "category":"",
          "fullName":"",
          "client":"",
          "orderId":"",
          "foid":"",
          "description": ub.data.modifierLabels,
          "cutPdf":"",
          "stylesPdf":"",
          "roster":"",
          "pipings": ub.current_material.settings.pipings,
          "createdDate":"",
          "notes":"",
          "sizeBreakdown":"",
          "applications": ub.current_material.settings.applications,
          "sizingTable":"",
          "upper":"",
          "lower":"",
          "hiddenBody":"",
          "randomFeeds":"",
          "legacyPDF":"",
          "applicationType":""
        }
        var url = "http://34.214.34.246/api/upload";

        $(".pdf-iframe-container").hide();

        _.delay(function() {
            console.log(data);
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
                    } else {
                        console.log("Something went wrong")
                    }
                }
            });
        }, 2000)
    },

    prepareThumbnails: function() {
        ub.front_view.visible = true;
        ub.back_view.visible = true;
        ub.left_view.visible = true;
        ub.right_view.visible = true;

        var thumbnails = {
            "front_view": ub.getThumbnailImage("front_view"),
            "back_view": ub.getThumbnailImage("back_view"),
            "left_view": ub.getThumbnailImage("left_view"),
            "right_view": ub.getThumbnailImage("right_view")
        }

        return thumbnails;
    },

    base64ToBlob: function(base64ImageContent, mime)
    {
        mime = mime || '';
        var sliceSize = 1024;
        var byteChars = window.atob(base64ImageContent);
        var byteArrays = [];

        for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
            var slice = byteChars.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, {type: mime});
    },

    uploadBase64Image: function(base64Image, callback) {
        var formData = new FormData();
        var base64ImageContent = base64Image.replace(/^data:image\/(png|jpg);base64,/, "");
        var blob = ub.utilities.base64ToBlob(base64ImageContent, "image/png")
        formData.append('file', blob);

        $.ajax({
            url: ub.config.api_host + "/api/fileUpload",
            type: "POST",
            dataType: 'JSON',
            cache: false,
            contentType: false,
            processData: false,
            data: formData,

            success: function(response) {
                callback(response);
            }
        });
    },
}