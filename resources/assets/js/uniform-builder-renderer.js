$(document).ready(function() {

    var _frontOldPosition = ub.front_view.position;
    var _backOldPosition = ub.back_view.position;
    var _leftOldPosition = ub.left_view.position;
    var _rightOldPosition = ub.right_view.position;

    var _frontOldScale = ub.front_view.scale;
    var _backOldScale = ub.back_view.scale;
    var _leftOldScale = ub.left_view.scale;
    var _rightOldScale = ub.right_view.scale;

    ub.funcs.removePanels = function () {

        $('div#right-pane-column').hide();
        $('div#left-side-toolbar').hide();
        $('div#livechat-compact-container').hide();
        $('div#main_container').css('margin-top','0px');
        $('button#button-return-to-customizer').show();
        $('button#button-return-to-customizer').html('<i class="fa fa-arrow-left" aria-hidden="true"></i> Go back to Customizer [ESC]');
        
        if (ub.savedDesignName !== "") {
            $('div#saved_design_name').show();
            $('div#saved_design_name').html(ub.savedDesignName);
        }

        $('nav.navbar').hide();
    }

    ub.funcs.removeUI = function () {

        ub.front_view.visible = true;
        ub.back_view.visible = true;
        ub.left_view.visible = true;
        ub.right_view.visible = true;

        if (ub.zoom) {
            ub.zoom_off();
        }

        ub.funcs.removePanels();
        ub.funcs.resetZoom();
        ub.funcs.deactivateMoveTool();
        
        if (ub.render) {
            ub.funcs.prepareThumbnails();

            // Save perspectives when set to save rendered images
            if (ub.save_rendered) {
                setTimeout(function() {
                    // Call method once again due to rendering addendums
                    ub.funcs.prepareThumbnails();
                    ub.funcs.savePerspectives();
                }, ub.save_rendered_timeout * 1000);
            }
        }

        ub.status.fullView.setStatus(true);

    };

    ub.funcs.prepareThumbnails = function () {

        // Prepare thumbnails 

            ub.utilities.info('Preparing Thumbnails ...');

            var _frontThumb = ub.getThumbnailImage2('front_view');
            var _backThumb = ub.getThumbnailImage2('back_view');
            var _leftThumb = ub.getThumbnailImage2('left_view');
            var _rightThumb = ub.getThumbnailImage2('right_view');

            ub.utilities.info('Thumbnails Generated!');

            ub.front = _frontThumb;
            ub.back = _backThumb;
            ub.left = _leftThumb;
            ub.right = _rightThumb;

        // End Prepare thumbnails 

    };

    ub.funcs.savePerspectives = function () {
        var save_uniform_perspectives_url = '/save_uniform_perspectives';
        var material_data = {
            material_id: ub.config.material_id,
            product_id: ub.product_id,
            store_code: ub.store_code,
            team_colors: ub.team_colors,
            front: ub.front,
            back: ub.back,
            right: ub.right,
            left: ub.left
        };
        if (ub.store_code.length > 0) {
            save_uniform_perspectives_url = TeamStoreAPI.endpoints.save_customized_thumbnails;
            if (ub.store_code == 'TEAMSTORE-DEFAULT-TEMPLATE') {
                material_data.settings = JSON.stringify(ub.current_material.settings);
            }
        }

        $.ajax({
            url: save_uniform_perspectives_url,
            data: material_data,
            method: 'POST',
            success: function(response) {
                if (response.success) {
                    ub.utilities.info('Store Code: ' + response.store_code);
                    ub.utilities.info('Material ID: ' + response.material_id);
                    ub.utilities.info('Product ID: ' + response.product_id);
                    ub.utilities.info('Team Colors: ' + response.team_colors);
                    ub.utilities.info('Saved as images');
                    ub.utilities.info('Front: ' + response.front);
                    ub.utilities.info('Back: ' + response.back);
                    ub.utilities.info('Right: ' + response.right);
                    ub.utilities.info('Left: ' + response.left);
                }
            }
        });
    };

    ub.funcs.updateTeamStoreImages = function () {
        var save_uniform_perspectives_url = TeamStoreAPI.endpoints.save_customized_thumbnails;
        var material_data = {
            teamstore_product_id: $('#team-store-toolbox').data('product-id'),
            material_id: ub.config.material_id,
            store_code: ub.store_code,
            team_colors: ub.team_colors,
            front: ub.front,
            back: ub.back,
            right: ub.right,
            left: ub.left
        };
        var teamstore_product_id = 0;
        if ($('#team-store-toolbox').data('product-id')) {
            teamstore_product_id = $('#team-store-toolbox').data('product-id');
            material_data.settings = JSON.stringify(ub.current_material.settings);
        }

        $.ajax({
            url: save_uniform_perspectives_url,
            data: material_data,
            method: 'POST',
            success: function(response) {
                if (response.success) {
                    ub.utilities.info('Store Code: ' + response.store_code);
                    ub.utilities.info('Material ID: ' + response.material_id);
                    ub.utilities.info('Product ID: ' + response.teamstore_product_id);
                    ub.utilities.info('Team Colors: ' + response.team_colors);
                    ub.utilities.info('Saved as images');
                    ub.utilities.info('Front: ' + response.front);
                    ub.utilities.info('Back: ' + response.back);
                    ub.utilities.info('Right: ' + response.right);
                    ub.utilities.info('Left: ' + response.left);

                    $.smkAlert({
                        text: 'Product has been added to your team store.',
                        type:'success',
                        permanent: false,
                        time: 5,
                        marginTop: '90px'
                    });
                }
            }
        });
    };

    ub.funcs.restoreUI = function () {

        $('div#right-pane-column').show();
        $('div#livechat-compact-container').show();
        $('div#left-side-toolbar').show();
        $('div#main_container').css('margin-top','70px');
        $('button#button-return-to-customizer').hide();

        $('nav.navbar').show();

        if (ub.savedDesignName !== "") {
            $('div#saved_design_name').hide();
        }

        // Rearrange UI

            ub['front_view'].position = _frontOldPosition;
            ub['back_view'].position = _backOldPosition;
            ub['left_view'].position = _leftOldPosition;
            ub['right_view'].position = _rightOldPosition;

            ub['front_view'].scale = _frontOldScale;
            ub['back_view'].scale = _backOldScale;
            ub['left_view'].scale = _leftOldScale;
            ub['right_view'].scale = _rightOldScale;

        // End Rearrange UI

        
        $('a.change-view[data-view="front"]').click();
        ub.status.fullView.setStatus(false);
        ub.status.fullViewZoom.setStatus(false, undefined);
        ub.funcs.restorePointer();
        ub.funcs.setVisibleView('front');

        ub[ub.active_view + '_view'].alpha = 1

    };

 
    // Zoom Functions while in fullview

        ub.funcs.resetZoom = function () {

            // Rearrange UI

                var _y = 190;

                var _scale = 0.40;

                // ub['left_view'].position.set(30, _y);
                // ub['front_view'].position.set(380, _y);
                // ub['back_view'].position.set(850, _y);
                // ub['right_view'].position.set(1200, _y);

                ub['front_view'].scale.set(_scale,_scale);
                ub['back_view'].scale.set(_scale,_scale);
                ub['left_view'].scale.set(_scale,_scale);
                ub['right_view'].scale.set(_scale,_scale);

            // End Rearrange UI

            // Center

                var _windowWidth;
                var _widthOfElement;
                var _totalWidthOfElements;
                var _space;
                var _p1;
                var _p2;
                var _x;
                
                _windowWidth = window.innerWidth;
                // _widthOfElement = ub['front_view'].width;
                _widthOfElement = 400;
                _totalWidthOfElements = _widthOfElement * 4;
                _space = _windowWidth - _totalWidthOfElements;
                _p1 = (_space / 2) - 30;

                _fx = function (no) { return _p1 + ((no - 1)  * _widthOfElement) };

                ub['left_view'].position.set(_fx(1), _y);
                ub['front_view'].position.set(_fx(2), _y);
                ub['back_view'].position.set(_fx(3), _y);
                ub['right_view'].position.set(_fx(4), _y);

                ub.funcs.showViews();

            // End Center


        };

        ub.funcs.hitTest = function (viewObjPositionX, coorsX) {

            var _widthOfElement = 400; 
            var _margin = 50;
            return coorsX >= viewObjPositionX + _margin && coorsX <= viewObjPositionX + _widthOfElement - _margin;

        }

        ub.funcs.getZoomView = function (coors) {

            var _result = undefined;

            if (typeof coors !== "undefined") {

                var _coorsX = coors.x;

                if (ub.funcs.hitTest(ub.front_view.position.x, _coorsX)) { _result = ub.front_view; }
                if (ub.funcs.hitTest(ub.back_view.position.x, _coorsX))  { _result = ub.back_view;  }
                if (ub.funcs.hitTest(ub.left_view.position.x, _coorsX))  { _result = ub.left_view;  }
                if (ub.funcs.hitTest(ub.right_view.position.x, _coorsX)) { _result = ub.right_view; }

            }

            return _result;

        };

        ub.funcs.showViews = function () {

            ub.front_view.alpha = 1;
            ub.back_view.alpha = 1;
            ub.left_view.alpha = 1;
            ub.right_view.alpha = 1;

            ub.funcs.restorePointer();

            ub.front_view.visible = true;
            ub.back_view.visible = true;
            ub.left_view.visible = true;
            ub.right_view.visible = true;


        }

        ub.funcs.hideViews = function () {

            ub.front_view.alpha = 0;
            ub.back_view.alpha = 0;
            ub.left_view.alpha = 0;
            ub.right_view.alpha = 0;

            ub.front_view.visible = false;
            ub.back_view.visible = false;
            ub.left_view.visible = false;
            ub.right_view.visible = false;

        }

        ub.funcs.zoomView = function (viewObj) {

            var _innerWidth = window.innerWidth;
            var _viewWidth = 1000;
            var _diff = _innerWidth - _viewWidth;

            viewObj.alpha = 1;
            viewObj.scale.set(1, 1);
            viewObj.position.x = _diff / 2;

            ub.funcs.setZoomOutPointer();

            viewObj.visible = true;

        }

        ub.funcs.partialZoomOut = function () {

            var _level = 0.1;

            ub.funcs.resetZoom();

            ub.front_view.alpha = _level;
            ub.back_view.alpha = _level;
            ub.left_view.alpha = _level;
            ub.right_view.alpha = _level;

        }

        ub.funcs.partialZoomView = function (viewObj) { 

            ub.funcs.setZoomInPointer();
            viewObj.alpha = 1; 

        }
        
        // Utility Functions 

        ub.funcs.restorePointer    = function () { $('body').css('cursor', 'auto');     }
        ub.funcs.setZoomInPointer  = function () { $('body').css('cursor', 'zoom-in');  }
        ub.funcs.setZoomOutPointer = function () { $('body').css('cursor', 'zoom-out'); }

        
        // Setup Events

        $('button#button-return-to-customizer').on('click', function () {
            $("div.verbiage-container").removeClass('preview-verbiage-container');
            $("p.verbiage-text").removeClass('preview-verbiage-text');
            $("div#main_view").css('background-color', '');
            ub.funcs.restoreUI();
        });

        $('span.fullscreen-btn').on('click', function (e) {
            $("div.verbiage-container").addClass('preview-verbiage-container');
            $("p.verbiage-text").addClass('preview-verbiage-text');
            $("div#main_view").css('background-color', '#61605e');
            ub.funcs.removeUI();
        });

});