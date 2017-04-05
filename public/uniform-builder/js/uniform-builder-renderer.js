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
        ub.funcs.resetZoom();

        ub.bg.alpha = 0.5;

        ub.funcs.prepareThumbnails();
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
            ub.left = _frontThumb;
            ub.right = _rightThumb;

        // End Prepare thumbnails 

    }

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

        ub.funcs.showViews();
        ub.bg.alpha = 1;

        $('a.change-view[data-view="front"]').click();
        ub.status.fullView.setStatus(false);
        ub.status.fullViewZoom.setStatus(false, undefined);

    };

 
    // Zoom Functions while in fullview

        ub.funcs.resetZoom = function () {

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

                ub.funcs.showViews();

            // End Center


        };

        ub.funcs.hitTest = function (viewObjPositionX, coorsX) {

            var _widthOfElement = 500; 
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

        }

        ub.funcs.hideViews = function () {

            ub.front_view.alpha = 0;
            ub.back_view.alpha = 0;
            ub.left_view.alpha = 0;
            ub.right_view.alpha = 0;

        }

        ub.funcs.zoomView = function (viewObj) {

            var _innerWidth = window.innerWidth;
            var _viewWidth = 1000;
            var _diff = _innerWidth - _viewWidth;

            viewObj.alpha = 1;
            viewObj.scale.set(1, 1);
            viewObj.position.x = _diff / 2;

        }

        ub.funcs.partialZoomOut = function () {

            var _level = 0.1;

            ub.funcs.resetZoom();

            ub.front_view.alpha = _level;
            ub.back_view.alpha = _level;
            ub.left_view.alpha = _level;
            ub.right_view.alpha = _level;
            
        }

        ub.funcs.partialZoomView = function (viewObj) { viewObj.alpha = 1; }


    // Setup Events

        $('button#button-return-to-customizer').on('click', function () {
            ub.funcs.restoreUI();
        });

        $('span.fullscreen-btn').on('click', function (e) {
            ub.funcs.removeUI();
        });

});