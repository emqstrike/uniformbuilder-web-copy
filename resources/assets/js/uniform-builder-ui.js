$(document).ready(function () {

    ub.funcs.handle_mousedown = function (e) {

        window.my_dragging = {};
        my_dragging.pageX0 = e.pageX;
        my_dragging.pageY0 = e.pageY;
        my_dragging.elem = this;
        my_dragging.offset0 = $(this).offset();

        function handle_dragging (e) {
            
            // if a layer is being dragged in the layer tool cancel event via create sortable in uba@ub.funcs.updateLayerTool
            if (ub.data.sorting) { 
            
                $('body').off('mousemove', handle_dragging).off('mouseup', handle_mouseup);
                return; 

            }

            if (ub.data.justSorted) {

                ub.data.justSorted = false;
                $('body').off('mousemove', handle_dragging).off('mouseup', handle_mouseup);
                return;
                
            }

            var left = my_dragging.offset0.left + (e.pageX - my_dragging.pageX0);
            var top  = my_dragging.offset0.top + (e.pageY - my_dragging.pageY0);
            $(my_dragging.elem).offset({top: top, left: left});

        }

        function handle_mouseup (e) {

            $('body').off('mousemove', handle_dragging).off('mouseup', handle_mouseup);

        }

        $('body').on('mouseup', handle_mouseup).on('mousemove', handle_dragging).on('mouseup','span.layer',function(e) {
            e.stopPropagation();
            $('body').off('mousemove', handle_dragging).off('mouseup', handle_mouseup);
        }).on('mousedown','span.layer',function(e) {
            e.stopPropagation();
            $('body').off('mousemove', handle_dragging).off('mouseup', handle_mouseup);
        });

    }

    ub.startModal = function (type) {

        if (type === 1) {

            var _sizeOfColorsUsed = _.size(ub.data.colorsUsed);
            ub.showModal('At least 2 Team Colors is required to proceed');
                
        } else {

            ub.showModal('Max of 8 Team Colors is allowed');

        }

    }

    ub.showModal = function (message) {

        // $('div.modal').modal('hide');

        // $('div#messageModal').html(message);
        // $('button#modalButton').trigger('click');

        alert(message);

    };

    ub.showModalTool = function (message) {

         $('div.modal').modal('hide');

         $('div#messageModal').html(message);
         $('button#modalButton').trigger('click');

    };

    ub.zoom_off = function () {

        var _windowSize = ub.funcs.getWindowSize();
        var _xScale     = 0.55;
        var _yScale     = 0.55;

        if (_windowSize.height > 800) {

            _xScale     = 0.7;
            _yScale     = 0.7;

        }

        _.each(ub.views, function(view) {

             ub[view + '_view'].scale.set(_xScale, _yScale);
             
        });

        ub[ub.active_view + '_view'].position.set(ub.offset.x, ub.offset.y);

        ub.zoom = false;
        ub.show_all_views();

        $('a.change-view[data-view="zoom"]').removeClass('zoom_on');

    };

    ub.zoom_on = function (override) { 

        if (typeof override === 'undefined') {
            if (ub.status.onText) { return; }
            if(!ub.states.canDoubleClick) { return; }    
        }

        ub.funcs.resetHighlights();

        var _windowSize = ub.funcs.getWindowSize();
        
        _.each(ub.views, function(view) {

            if (_windowSize.height > 800) {

                ub[view + '_view'].scale.set(1.4, 1.4);

            } else {

                ub[view + '_view'].scale.set(1, 1);

            }
             
        });

        ub.hide_all_views();
        $('a.change-view[data-view="zoom"]').addClass('zoom_on');
        ub.zoom = true;
        ub.states.canDoubleClick = false;

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

        if (ub.status.fullView.getStatus()) { return; }

        var windowSize  = ub.funcs.getWindowSize();
        var w           = windowSize.width;
        var h           = windowSize.height;
        var _left       = (w - 630);
        var _offsetX;
        var _offsetY;
        var _windowSize = ub.funcs.getWindowSize();
        var _yDivisor = 3;

        $('div.debugPanel').css('top', (h) + "px")

        ub.renderer.resize(w,h);
        ub.renderer.view.style.width = w + "px";
        ub.renderer.view.style.height = h + "px";

        ub.data.adjustmentX = 550; 
        ub.data.divisor = 2.3;

        if ($(window).width() <= 1440) { 
            ub.data.divisor = 2.2; 
        }

        _offsetX = (($(window).width() - $('#right-pane-column').width()) - ub.data.adjustmentX) / ub.data.divisor;
            
        if (_windowSize.height > 800) {
            _yDivisor = 5;
        }

        _offsetY = ($(window).height() - 580) / _yDivisor;

        ub.offset = {x: _offsetX, y: _offsetY};

        if (ub.uiVersion === 'v1') {
            _left -= 100;
        }

        $('#change-views').css('left', _left);
        $('a.change-view[data-view="' + ub.active_view + '"]').click();
        ub.zoom_off();
        ub.funcs.centerPatternPopup();
        
    };

    ub.funcs.isMacintosh = function () {

        return navigator.platform.indexOf('Mac') > -1;

    };

    ub.funcs.changeControls = function() {
        if (ub.funcs.isAlternativeUIEnabled()) {

            // Overwrite config's brand
            if (ub.current_material.material.brand.toLowerCase() == 'richardson') {
                ub.config.brand = ub.current_material.material.brand;
            }

            if (ub.config.brand.toLowerCase() == 'richardson') {
                ub.modifierController = new ModifierController('#property-modifiers-menu', ub.config.brand);
                ub.funcs.changeStage();
            } else {
                if (typeof ub.modifierController !== 'undefined') {
                    ub.modifierController.disable();
                }
            }
        } else {
            alert('Branding UI is disabled');
        }
    };

    $(window).resize(function() {

        ub.funcs.resize();

        var w = window.innerWidth;
        var h = window.innerHeight;
        var _left = w - $('#right-pane-column').width();

        // if (window.innerWidth <= 1440) {
        //     $('div#main-picker-scroller').css('width', '94%');
        // }
        // else {
        //     $('div#main-picker-scroller').css('width', '75%');
        // }

        var _pickerLeft = ( window.innerWidth - $('div#main-picker-scroller').innerWidth() ) / 2;

        $('div#main-picker-scroller').css('margin-left', _pickerLeft + 'px');
        $('div#main-picker-container').css('height', (h - 75) + 'px');


        $('div#main-picker-container').css('width', '100%');
  
    });

    $(window).trigger('resize');

});