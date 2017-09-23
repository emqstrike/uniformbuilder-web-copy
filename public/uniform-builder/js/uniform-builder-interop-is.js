$(document).ready(function() {

    // $('#isModal').modal('show');
    // $('#isModal').modal('hide');

    $('span.art-btn').unbind('click');
    $('span.art-btn, div#cancel-art').on('click', function () {

        var _isModalVisible = $('#isModal').is(':visible');

        if (_isModalVisible) {
            $('#isModal').modal('hide');

            ub.status.render.resumeRendering();
            window.ub.render_frames();

        } else {

            $('#isModal').modal('show');
            ub.status.render.stopRendering();

        }

    });


    /// Found in inksoft documentation 

    /// They're sample is: window.ub.openDesignEdit('80974','0','1001947','0','1')

    window.ub.openDesignEdit = function (storeId, userId, designId,artId,storeAdmin) {
        $overlay = $('#ajax-Page-overlay');
        $overlay.fadeIn(); 
        serializedData = "StoreId=" + storeId + "&UserId=" + userId + "&DesignId=" + designId + "&ArtId=" + artId;
        if (storeAdmin == "1")
            serializedData += "&StoreAdmin=Store";
        $.ajax({
            url: "https://stores.inksoft.com/ProLook_Sports/Config/EditDesignInStudio",
            type: "POST",
            data: serializedData,                        
            success: function (response, textStatus, jqXHR) {
                $("#divDesignerContainerCustomerDesign").html(response);
                $("html, body").animate({ scrollTop: 0 }, "slow");
                $("#DivSearchResult").slideUp(500);
            },
            error: function (jqXHR, textStatus, errorThrown) {   
                $("#errorbox").show();
            },
            complete: function () {
                $overlay.fadeOut();
            }
        });
    };


});