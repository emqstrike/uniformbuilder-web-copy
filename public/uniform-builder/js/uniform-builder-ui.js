$(document).ready(function () {
    
    ub.funcs.ui.resize  = function () {

        var top_padding = 50;
        var w = window.innerWidth;
        var h = window.innerHeight - top_padding;

        ub.renderer.resize(w,h);
        ub.renderer.view.style.width = w + "px";
        ub.renderer.view.style.height = h + "px";

        var _left = (w - 630);
        var _offsetX = (($(window).width() - $('#right-pane-column').width()) - 550) / 2;
        
        ub.offset.x = _offsetX;

        var _offsetY = ($(window).height() - 580) / 3;
        ub.offset.y = _offsetY;

        if (ub.uiVersion === 'v1') {
            _left -= 100;
        }

        $('#change-views').css('left', _left);
        $('a.change-view[data-view="' + ub.active_view + '"]').click();

    };

    $(window).resize(function() {

        ub.funcs.ui.resize();
        
        var w = window.innerWidth;
        var _left = w - $('#right-pane-column').width();
          
    });

    $(window).trigger('resize');

});