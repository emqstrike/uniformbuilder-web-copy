$(document).ready(function () {

    ub.zoom_off = function () {

        var _windowSize = ub.funcs.getWindowSize();
        var _xScale     = 0.5;
        var _yScale     = 0.5;

        if (_windowSize.height > 800) {

            _xScale     = 0.7;
            _yScale     = 0.7;

        }

        _.each(ub.views, function(view){

             ub[view + '_view'].scale.set(_xScale, _yScale);
             
        });

        ub[ub.active_view + '_view'].position.set(ub.offset.x, ub.offset.y);

        ub.zoom = false;
        ub.show_all_views();

    };

    ub.zoom_on = function () {

        _.each(ub.views, function(view) {

             ub[view + '_view'].scale.set(1, 1);
             
        });

        ub.zoom = true;
        ub.hide_all_views();

    };

    ub.hide_all_views = function () {

        _.each(ub.views, function(view){

            var _v = view + '_view'

            if (view !== ub.active_view) {
             ub[_v].alpha = 0;
            }
             
        });

    };

    ub.show_all_views = function () {

        _.each(ub.views, function(view){

            var _v = view + '_view'

            if (view !== ub.active_view) {
             ub[_v].alpha = 1;
            }
             
        });

    };


    ub.funcs.getWindowSize = function () {

        var top_padding     = 50;
        var w               = window.innerWidth;
        var h               =  window.innerHeight - top_padding;

        return {width: w, height: h};

    }
    
    ub.funcs.resize  = function () {

        var windowSize  = ub.funcs.getWindowSize();
        var w           = windowSize.width;
        var h           = windowSize.height;

        ub.renderer.resize(w,h);
        ub.renderer.view.style.width = w + "px";
        ub.renderer.view.style.height = h + "px";

        var _left = (w - 630);
        var _offsetX = (($(window).width() - $('#right-pane-column').width()) - 550) / 2;

        var _windowSize = ub.funcs.getWindowSize();
        var _yDivisor = 3;
            
        if (_windowSize.height > 800) {

            _yDivisor = 5;
        
        }

        var _offsetY = ($(window).height() - 580) / _yDivisor;

        ub.offset = {x: _offsetX, y: _offsetY};

        if (ub.uiVersion === 'v1') {
            _left -= 100;
        }

        $('#change-views').css('left', _left);
        $('a.change-view[data-view="' + ub.active_view + '"]').click();
        ub.zoom_off();

    };

    $(window).resize(function() {

        ub.funcs.resize();
        
        var w = window.innerWidth;
        var _left = w - $('#right-pane-column').width();
          
    });

    $(window).trigger('resize');

});