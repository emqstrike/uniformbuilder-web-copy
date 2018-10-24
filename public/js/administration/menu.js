$(document).ready(function() {
    // $('ol.sortable').sortablelist({
    //     nested: true,
    //     vertical: false,
    //     isValidTarget: function ($item, container) {
    //         var depth = 1, maxDepth = 2, children = $item.find('ol').first().find('li');

    //         depth += container.el.parents('ol').length;

    //         while (children.length) {
    //             depth++;
    //             children = children.find('ol').first().find('li');
    //         }

    //         return depth <= maxDepth;
    //     },
        
    //     onDrop: function($item, container, _super, event) {
    //         var menuID = $item.closest('.menu-container').find('.sortable-container').attr('id');
    //         var menu = $('#' + menuID + '.menu');

    //         var parentMenuID = menu.closest('ol').prev('.menu').find('.menu-id').val();
    //         Menu.updateParentMenu(menu, parentMenuID);
    //         Menu.updateOrder();
         
    //         _super($item, container);
    //     }
    // });



    $('#search-page').keyup(function() {
        Pages.search($(this).val());
    });

    $('#select-all-pages').click(function() {
        $('#page-list-container .page input[type="checkbox"]').each(function() {
            if ($(this).is(':checked')) {
                $(this).prop('checked', false);
            } else {
                $(this).prop('checked', true);
            }
        });
    });

    $('.sortable-head .arrow-down').click(function() {
        $(this).closest('.sortable-head').next('.sortable-body').animate({
            height: 'toggle',
        }, 100);
    });

    $('.remove-menu').click(function() {
        $(this).closest('.sortable-container').remove();
    });

    var Pages = {
        search: function(keyword) {
            keyword = keyword.toLowerCase();
            console.log(keyword);

            if (keyword) {
                $('#page-list-container .page').each(function(index, value) {
                    var pageName = $(this).data('page-name').toLowerCase();

                    if (pageName.startsWith(keyword)) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
            }

            if (keyword == '') {
                $('#page-list-container .page').show();
            }
        }
    };

    var Menu = {
        updateParentMenu: function(menu, parentMenuID) {
            menu.find('.parent-id').val(parentMenuID);
        },

        updateOrder: function() {
            var order = 0;

            $('.menu').each(function(key, val) {
                if (($(this).closest('.menu-container').find('ol').find('li').length > 0)) {
                    if (! $(this).closest('.menu-container').find('ol').find('li').hasClass('has-sub-menu')) {
                        $(this).find('.order-id').val(order);
                    } else {
                        $(this).find('.order-id').val(order += 1);
                    }

                    order = 0;
                } else {
                    $(this).find('.order-id').val(order += 1);
                }
            });
        },
    };

    Menu.updateOrder();
});