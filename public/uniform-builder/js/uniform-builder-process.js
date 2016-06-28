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

    ub.funcs.initRoster = function () {

        ub.funcs.fadeOutCustomizer();

        var data = {
            tabs: ub.data.uniformSizes[0].sizes,
        };

        var template = $('#m-roster-table').html();
        var markup = Mustache.render(template, data);

        $('div.tabsContainer').append(markup);

        $('span.add-player').on('click', function () {

            var _size = $(this).data('size');
            var $rosterTable = $('table.roster-table[data-size="' + _size + '"]');
            var _length = $rosterTable.find('tr').length;
            
            var data = {
                index: _length,
                size: _size,
            };

            var template = $('#m-roster-table-field').html();
            var markup = Mustache.render(template, data)

            $rosterTable.append(markup);

            $('span.clear-row[data-size="' + _size + '"]').unbind('click');
            $('span.clear-row[data-size="' + _size + '"]').on('click', function () {

                var $rosterTable = $('table.roster-table[data-size="' + _size + '"]');

                var _index  = $(this).data('index');
                var _size   = $(this).data('size');
                var $row = $('tr[data-size="' + _size + '"][data-index="' + _index + '"]');

                $row.remove();

                $rosterTable.find('tr').each(function (index){

                    // This is not working

                });

            });

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
        
    }

});