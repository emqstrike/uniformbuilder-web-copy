/**
 * PatternPanelModal.js
 * - handle pattern's modal behavior
 * @since October 23, 2018
 * @authors
 * - Romack Natividad <romack@qstrike.com>
 * - Aron Joshua Bagtas <aaron@qstrike.com>
 * Requirements:
 * - jQuery
 * - Mustache
 *
 * Usage:
 *
 */

function PatternPanelModal(element, items) {
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
        $(".pattern-container-button").on('click', '.pattern-selector-button', function(event) {
            var modifier_category = $(this).data("modifier-category");

            var selected_pattern = $(".pattern-main-container-" + modifier_category).find('.active-pattern');
            selected_pattern.removeClass('active-pattern');
            selected_pattern.html("");

            $(".edit-pattern-modal-container-"  + modifier_category).html("");
            $(".edit-pattern-modal-container-"  + modifier_category).html("<button class='edit-pattern-modal-button' data-toggle='modal' data-target='#pattern-change-color'>Edit pattern color</button>");

            if (selected_pattern.length > 0)
            {
                $(".edit-pattern-modal-container-"  + modifier_category).html("<button class='edit-pattern-modal-button' data-toggle='modal' data-target='#pattern-change-color'>Edit pattern color</button>");
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

            $(this).addClass('active-color-pattern-category');
            $(this).addClass('cp-button-active');

        });
    },

    onSelectColorPerCategory: function() {
        $(".pattern-color-button-container").on('click', '.pattern-color-selector-button', function(event) {
            /* Act on the event */
            var active_pattern_color_category = $("#pattern-color-tab-content .tab-content").find('.tab-pane.active').data("pattern-category");

            var selected_color = $(".pattern-color-main-container-" + active_pattern_color_category).find('.active-pattern-color');
            selected_color.removeClass('active-pattern-color');
            selected_color.html("");

            var colorLabel = $(this).data("color-label");

            $(this).html('<span class="fa fa-check fa-1x cp-margin-remove cp-padding-remove"></span>');
            $(this).addClass('active-pattern-color');

            if (colorLabel === 'W' || colorLabel === 'Y' || colorLabel === 'CR' || colorLabel === 'S' || colorLabel === 'PK'  || colorLabel === 'OP' || colorLabel === 'SG') {
                $(this).css('color', '#3d3d3d');
                $(this).css('text-shadow', '1px 1px #d7d7d7');
            }
        });
    }

}