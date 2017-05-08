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
        $('button#button-return-to-customizer').html('Go back to the Customizer');
        
        if (ub.savedDesignName !== "") {
            $('div#saved_design_name').show();
            $('div#saved_design_name').html(ub.savedDesignName);
        }

        $('nav.navbar').hide();
    }

    ub.funcs.removeUI = function () {

        ub.utilities.warn('Removing UI...');

        ub.funcs.removePanels();

        // Rearrange UI

            ub['left_view'].position.set(30, 150);
            ub['front_view'].position.set(380, 150);
            ub['back_view'].position.set(850, 150);
            ub['right_view'].position.set(1200, 150);

            ub['front_view'].scale.set(0.5,0.5);
            ub['back_view'].scale.set(0.5,0.5);
            ub['left_view'].scale.set(0.5,0.5);
            ub['right_view'].scale.set(0.5,0.5);

        // End Rearrange UI

        // Center

            var _windowWidth;
            var _widthOfElement;
            var _totalWidthOfElements;
            var _space;
            var _p1;
            var _p2;
            var _y = 150;
            var _x;
            
            _windowWidth = window.innerWidth;
            // _widthOfElement = ub['front_view'].width;
            _widthOfElement = 500;
            _totalWidthOfElements = _widthOfElement * 4;
            _space = _windowWidth - _totalWidthOfElements;
            _p1 = _space / 2;

            _fx = function (no) { return _p1 + ((no - 1)  * _widthOfElement) };

            ub['left_view'].position.set(_fx(1), _y);
            ub['front_view'].position.set(_fx(2), _y);
            ub['back_view'].position.set(_fx(3), _y);
            ub['right_view'].position.set(_fx(4), _y);

        // End Center

        ub.bg.alpha = 0.5;

        if (ub.return_rendered_code) {
            ub.funcs.prepareThumbnails(ub.funcs.saveThumbnails);
        } else {
            ub.funcs.prepareThumbnails();
        }
        ub.status.fullView.setStatus(true);

    };

    ub.funcs.prepareThumbnails = function (callback) {

        // Prepare thumbnails 

            ub.utilities.info('Preparing Thumbnails ...');

            var _frontThumb = ub.getThumbnailImage2('front_view');
            var _backThumb = ub.getThumbnailImage2('back_view');
            var _leftThumb = ub.getThumbnailImage2('left_view');
            var _rightThumb = ub.getThumbnailImage2('right_view');

            ub.utilities.info('Thumbnails Generated!');
            
            ub.front = _frontThumb;
            ub.back = _backThumb;
            ub.left = _frontThumb;
            ub.right = _rightThumb;

        // End Prepare thumbnails 

        if (callback) {
            callback();
        }
    };

    ub.funcs.saveThumbnails = function () {
        $.ajax({
            url: ub.config.team_store_api_host + '/product/save_thumbnails',
            data: {
                code: ub.return_rendered_code,
                front: ub.front,
                back: ub.back
            },
            method: 'POST',
            success: function(response) {
                if (response.success) {
                    ub.utilities.info('Saved as images');
                    ub.utilities.info('Front: ' + response.front);
                    ub.utilities.info('Back: ' + response.back);
                }
            }
        });
    };

    ub.funcs.restoreUI = function () {

        ub.utilities.warn('Restoring UI...');

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

        ub.bg.alpha = 1;

        $('a.change-view[data-view="front"]').click();
        ub.status.fullView.setStatus(false);

    };

    $('button#button-return-to-customizer').on('click', function () {
        ub.funcs.restoreUI();
    });


});