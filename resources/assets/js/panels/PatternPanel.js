/**
 * PatternPanel.js
 * - handle pattern behavior
 * @since October 17, 2018
 * @author Romack Natividad <romack@qstrike.com>
 *
 * Requirements:
 * - jQuery
 * - Mustache
 *
 * Usage:
 *
 */

function PatternPanel(element, items) {
    this.panel = document.getElementById(element);
    this.items = {
        patterns: items
    };
}

PatternPanel.prototype = {
    constructor: PatternPanel,

    setItems: function(items) {
        alert('setting items');
        alert(items.length);
    },

    getPanel: function() {
        var panel = Mustache.render(this.panel.innerHTML, this.items);
        return panel;
    },

    onSelect: function() {
        $(".pattern-main-container .pattern-container-button").on('click', '.pattern-selector-button', function(event) {
            var selected_color = $(".pattern-main-container").find('.active-pattern');
            selected_color.removeClass('active-pattern');
            selected_color.html("");
            $(".edit-pattern-modal-container").html("");
            $(".edit-pattern-modal-container").html("<button class='edit-pattern-modal-button' data-toggle='modal' data-target='#pattern-change-color'>Edit pattern color</button>");

            if (selected_color.length > 0)
            {
                $(".edit-pattern-modal-container").html("<button class='edit-pattern-modal-button' data-toggle='modal' data-target='#pattern-change-color'>Edit pattern color</button>");
            }

            $(this).html('<span class="fa fa-check fa-1x cp-pattern-check cp-padding-remove"></span>');
            $(this).addClass('active-pattern');
        });
    },

    onChangeColorPaternCategory: function() {
        $(".pattern-color-categories .pattern-color-item").on('click', '.pattern-color-selector', function(event) {
            event.preventDefault();
            /* Act on the event */
            var selected_category = $(".pattern-color-categories").find(".cp-button-active");
            selected_category.removeClass('active-color-pattern-category');
            selected_category.removeClass('cp-button-active');

            var selected_color = $(".color-main-container").find('.active-color');
            if(selected_color.length > 0)
            {
                selected_color.removeClass('active-color');
                selected_color.html("");
            }


            $(this).addClass('active-color-pattern-category');
            $(this).addClass('cp-button-active');

        });
    },

    onSelectColorPerCategory: function() {
        var active_pattern_color_category = $("#pattern-color-tab-content .tab-content").find('.tab-pane.active').data("pattern-category");
        $(".pattern-color-main-container .pattern-color-button-container").on('click', '.pattern-color-selector-button-' + active_pattern_color_category, function(event) {
            event.preventDefault();
            /* Act on the event */
            var color_category = $(this).data("pattern-category");

            console.log(active_pattern_color_category, color_category);

            var colorLabel = $(this).data("color-label");

            var selected_color = $(".pattern-color-main-container").find('.active-pattern-color');
            selected_color.removeClass('active-pattern-color');
            selected_color.html("");

            $(this).html('<span class="fa fa-check fa-1x cp-margin-remove cp-padding-remove"></span>');
            $(this).addClass('active-pattern-color');

            if (colorLabel === 'W' || colorLabel === 'Y' || colorLabel === 'CR' || colorLabel === 'S' || colorLabel === 'PK'  || colorLabel === 'OP' || colorLabel === 'SG') {
                $(this).css('color', '#3d3d3d');
                $(this).css('text-shadow', '1px 1px #d7d7d7');
            }
        });
    }

}