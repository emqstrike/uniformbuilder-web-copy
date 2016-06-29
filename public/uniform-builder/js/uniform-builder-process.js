$(document).ready(function() {

    ub.funcs.fadeOutCustomizer = function () {

        $('div#right-pane-column').fadeOut();        
        $('div#left-pane-column').fadeOut();

        $('div#roster-input').fadeIn();

    }

    ub.funcs.fadeInCustomizer = function () {

        $('div#roster-input').fadeOut();

        $('div#right-pane-column').fadeIn();        
        $('div#left-pane-column').fadeIn(); 

    }

    ub.funcs.addSizesTabs = function (size) {

        $('span.tabButton[data-size="' + size + '"]').css('display','inline-block');
        $('span.tabButton:visible').first().trigger('click');

        if ($('tr.roster-row[data-size="' + size + '"]').length === 0) {

            $('span.add-player[data-size="' + size + '"]').trigger('click');
            $('span.add-player[data-size="' + size + '"]').trigger('click');

        }

        if ($('span.tabButton[data-category="youth"]:visible').length > 0) {
            $('span.youth-header').show();
        }
        else {
            $('span.youth-header').hide();
        }

        if ($('span.tabButton[data-category="adult"]:visible').length > 0) {
            $('span.adult-header').show();
        }
        else {
            $('span.adult-header').hide();
        }

    }

    ub.funcs.removeSizesTabs = function (size) {

        $('span.tabButton[data-size="' + size + '"]').hide();
        $('span.tabButton:visible').first().trigger('click');
        $('div.tab[data-size="' + size + '"]').hide();

        if ($('span.tabButton[data-category="youth"]:visible').length > 0) {
            $('span.youth-header').show();
        }
        else {
            $('span.youth-header').hide();
        }

        if ($('span.tabButton[data-category="adult"]:visible').length > 0) {
            $('span.adult-header').show();
        }
        else {
            $('span.adult-header').hide();
        }

    }

    ub.funcs.reInitHover = function () {

        $('tr.roster-row').hover(
            function() {
                $(this).addClass("row-hover");
            }, function() {
                $(this).removeClass("row-hover");
            }
        );

    }

    ub.funcs.centerNumberSelectionPopup = function () {

        $popup = $('div#numbersPopup');
        $popup.fadeIn();

        if ($popup.length === 0) { return; } 

        var _wWidth     = window.innerWidth;
        var _wHeight    = window.innerHeight;
        var _pWidth     = $popup.width();
        var _pHeight    = $popup.height();

        var _left       = (_wWidth - _pWidth) / 2;
        var _top        = (_wHeight - _pHeight) /2;

        $popup.css({
            
            top: _top,
            left: _left,

        }); 

    };

    ub.funcs.setNumberStatus = function (number, status) {

        var _numberObj = _.find(ub.data.playerNumbers, { number: number.toString() });
        _numberObj.status = status;

    }

    ub.funcs.createNumbersSelectionPopup = function (_size) {

        $('div#numbersPopup').remove();

        var _htmlBuilder = "";

        _htmlBuilder += '<div id="numbersPopup" data-status="visible">';
        _htmlBuilder +=     '<div class="header">';
        _htmlBuilder +=         'SELECT PLAYER NUMBERS';
        _htmlBuilder +=     '</div>';

        _.each (ub.data.playerNumbers, function (_number){

            _htmlBuilder +=     '<span class="number ' + _number.status + '" data-status="' + _number.status + '" data-number="' + _number.number + '">'
            _htmlBuilder +=        _number.number;
            _htmlBuilder +=     '</span>';            

        });

        _htmlBuilder += '<br />';
        _htmlBuilder += '<span class="btn-cancel">Cancel</span> <span class="btn-ok">OK</span>';

        _htmlBuilder += '</div>';

        $('body').append(_htmlBuilder);
        ub.funcs.centerNumberSelectionPopup();
        $('div#numbersPopup').fadeIn();

        $('span.number.free, span.number.selected').on('click', function () {

            var _number = $(this).data('number');
            var _status = $(this).data('status');

            if (_status === 'selected') {

                $(this).data('status','free');
                $(this).removeClass('selected');
                $(this).addClass('free');

            } else if (_status === 'free' ) {

                $(this).data('status','selected');
                $(this).removeClass('free');
                $(this).addClass('selected');

            }

        });

        $('span.btn-cancel').on('click', function () {

            $('div#numbersPopup').remove();
    
        });

        $('span.btn-ok').on('click', function () {

            var _returnValue = [];

            $('span.number').each(function(){

                if ($(this).data('status') === 'selected') {

                    var _number = $(this).data('number');
                    ub.funcs.setNumberStatus(_number,'used');
                    _returnValue.push(_number);

                }

            });

            numbers = _returnValue;

            var _markup         = '';
            var $rosterTable    = $('table.roster-table[data-size="' + _size + '"] > tbody');
            var _length         = $rosterTable.find('tr').length;

            _.each (numbers, function (number){

                data = {
                    index: _length,
                    size: _size,
                    number: number,
                };

                template = $('#m-roster-table-field').html();
                markup = Mustache.render(template, data);

                $rosterTable.append(markup);

                _length += 1;

            });

            $('span.clear-row[data-size="' + _size + '"]').unbind('click');
            $('span.clear-row[data-size="' + _size + '"]').on('click', function () {

                var _index          = $(this).data('index');
                var _size           = $(this).data('size');
                var $table          = $('table.roster-table[data-size="' + _size + '"] > tbody');
                var $row            = $('tr[data-size="' + _size + '"][data-index="' + _index + '"]');
                var _number = $row.find('input[name="number"]').val();

                ub.funcs.setNumberStatus(_number, 'free');

                $row.remove();

                $('table.roster-table[data-size="' + _size + '"] > tbody').find('tr.roster-row').each(function (indexVar){

                    var index = indexVar + 1;

                    $(this).find('td').first().html(index);
                    $(this).find('span.clear-row').attr('data-index', index);
                    $(this).attr('data-index', index)

                });

            });

            ub.funcs.reInitHover();
            $('div#numbersPopup').remove();

        });

    };

    ub.funcs.initRoster = function () {

        ub.funcs.fadeOutCustomizer();

        var data = {
            tabs: ub.data.uniformSizes[0].sizes,
        };

        var template = $('#m-roster-table').html();
        var markup = Mustache.render(template, data);

        $('div.tabsContainer').append(markup);

        $('span.add-player').on('click', function () {

            var _size           = $(this).data('size');
            var numbers         = ub.funcs.createNumbersSelectionPopup(_size);

        });

        $('span.back-to-customizer-button').on('click', function (){

            ub.funcs.fadeInCustomizer();

        });

        $('span.size').on('click', function () {

            var _status = $(this).data('status');
            var _size   = $(this).data('size');

            if (_status === 'off') {

                $(this).addClass('active');
                $(this).data('status', 'on');
                ub.funcs.addSizesTabs(_size);

            }
            else {

                $(this).removeClass('active');
                $(this).data('status', 'off');
                ub.funcs.removeSizesTabs(_size);

            }

        });

        $('span.tabButton').on('click', function () {

            var _size = $(this).data('size');

            $('span.tabButton').removeClass('active');
            $(this).addClass('active');

            $('div.tabsContainer > div.tab').hide();
            $('div.tab[data-size="' + _size + '"]').fadeIn();

        });

        ub.funcs.reInitHover();
        
    }

});