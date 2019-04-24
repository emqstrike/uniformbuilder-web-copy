$(document).ready(function() {
    $('ol.sortable').sortablelist({
        nested: true,
        vertical: false,
        isValidTarget: function ($item, container) {
            var depth = 1, maxDepth = 2, children = $item.find('ol').first().find('li');

            depth += container.el.parents('ol').length;

            while (children.length) {
                depth++;
                children = children.find('ol').first().find('li');
            }

            return depth <= maxDepth;
        },

        onDrop: function($item, container, _super, event) {
            var menuID = $item.closest('.menu-container').find('.sortable-container').attr('id');
            var menu = $('#' + menuID + '.menu');

            var parentMenuID = menu.closest('ol').prev('.menu').find('.menu-id').val();
            Menu.updateParentMenu(menu, parentMenuID);
            Menu.updateOrder();
         
            _super($item, container);
        }
    });

    $('#search-page').keyup(function() {
        Pages.search($(this).val());
    });

    $('body').on('keyup', '.menu-text', function() {
        var name = $(this).val();
        console.log(name);
        $(this).closest('.sortable-body').prev('.sortable-head').find('strong').html(name);
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

    $('body').on('click', '.sortable-head .arrow-down', function() {
        $(this).closest('.sortable-head').next('.sortable-body').animate({
            height: 'toggle',
        }, 100);
    })

    $('body').on('click', '.remove-menu', function() {
        $(this).closest('.sortable-container').remove();
    });

    $('#add-page-to-menu').click(function(event) {
        var menus = [];

        $('#page-list-container .page :checkbox:checked').each(function() {
            var menu = {
                'name': $(this).data('page-name'),
                'code': $(this).data('page-code')
            };

            menus.push(menu);
            $(this).attr('checked', false);
        });

        if (menus.length > 0) {
            Menu.createMenuItems(menus);
        }
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
        createMenuItems: function(items) {
            $.each(items, function(key, item) {
                var data = {
                    'route_name': item.code,
                    'menu_text': item.name,
                }

                var url = "//" + api_host + "/api/create_menu_item/";

                $.ajax({
                    url: url,
                    type: 'POST',
                    data: JSON.stringify(data),
                    dataType: 'json',
                    crossDomain: true,
                    contentType: 'application/json',
                    headers: {"accessToken": atob(headerValue)},
                    success: function(response) {
                        if (response.success == true) {
                            Menu.addToSortable(response.menu.id, response.menu.menu_text, response.menu.route_name, response.menu.menu_item_code);
                        }
                    }
                })
            });
        },

        addToSortable: function(id, menuText, routeName, menuItemCode) {
            var html = '<li class="menu-container">';
                html += '<div id="menu-' + id + '" class="menu sortable-container">'
                    html += '<div class="sortable-head">'
                        html += '<strong>' + menuText + '</strong>'

                        html += '<span class="arrow-down pull-right">'
                            html += '<i class="fa fa-caret-down" aria-hidden="true"></i>'
                        html += '</span>'
                    html += '</div>'

                    html += '<div class="sortable-body">';
                        html += '<input type="hidden" name="id[]" class="menu-id form-control" value="' + id + '">';
                        html += '<input type="hidden" name="order_id[]" class="order-id form-control">';
                        html += '<input type="hidden" name="parent_id[]" class="parent-id form-control" value="0">';
                        html += '<input type="hidden" name="menu_item_code[]" class="menu-item-code form-control" value="' + menuItemCode + '">';

                        html += '<div class="form-group">';
                            html += '<label>Route Name</label>';
                            html += '<input type="text" name="route_name[]" class="route-name form-control" value="' + routeName + '">';
                        html += '</div>';

                        html += '<div class="form-group">';
                            html += '<label>Menu Text</label>';
                            html += '<input type="text" name="menu_text[]" class="menu-text form-control" value="' + menuText + '">';
                        html += '</div>';

                        html += '<div class="form-group">';
                            html += '<label>Type</label>';
                            html += ' <div>';
                                html += '<select name="type[]" class="form-control">';
                                    html += '<option value="header">Header</option>';
                                    html += '<option value="link">Link</option>';
                                html += '</select>';
                            html += '</div>';
                        html += '</div>';

                        html += '<div class="form-group">';
                            html += '<label>Icon</label>';
                            html += '<div>';
                                html += '<span class="demo-icon fa fa-music" style="margin-right: 10px;"></span>';
                                html += '<button type="button" class="btn btn-primary picker-button">Pick an Icon</button>';

                                html += '<input type="hidden" name="icon_class[]" class="icon-class-input form-control" value="fa fa-music" />';
                            html += '</div>';
                        html += '</div>';

                        html += '<hr>';

                        html += ' <div class="form-group">';
                            html += ' <button class="btn btn-default remove-menu">Remove</button>';
                        html += '</div>';
                    html += '</div>';
                html += '</div>';

                html += '<ol></ol>';
            html += '</li>';

            $('ol.sortable').append(html);
            Menu.updateOrder();
        },

        updateParentMenu: function(menu, parentMenuID) {
            menu.find('.parent-id').val(parentMenuID);
        },

        updateOrder: function() {
            var parentMenuOrder = 1;
            var subMenuOrder = 1;

            $('.sortable > .menu-container').each(function(key, value) {
                $(this).find('.order-id').val(parentMenuOrder);
                
                if ($(this).find('ol').children().length > 0) {
                    var subMenus = $(this).find('ol').children();

                    subMenus.each(function(key, subMenu) {
                        $(subMenu).find('.order-id').val(subMenuOrder);
                        subMenuOrder++;
                    });
                }

                parentMenuOrder++;

                subMenuOrder = 1;
            });
        },
    };

    Menu.updateOrder();
});