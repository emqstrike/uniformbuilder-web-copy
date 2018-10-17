/**
 * ColorWheelPanel.js
 * - handle color wheel behavior
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

function ColorWheelPanel(element) {
    this.panel = document.getElementById(element);
}

ColorWheelPanel.prototype = {
    constructor: ColorWheelPanel,

    setItems: function(items) {
        alert('setting items');
        alert(items.length);
    },

    getPanel: function() {
        var panel = Mustache.render(this.panel.innerHTML);
        return panel;
    },

    draw: function() {
        var that = this;
        var _teamColorObj           = ub.current_material.settings.team_colors;
        var _strBuilder             = '';
        var _sortedModifierLabels   = _.sortBy(ub.data.modifierLabels, 'index');
        var _tempIndex              = 1;
        var _colorSet               = ub.funcs.getBaseColors();

        _strBuilder                 += '<div id="color-wheel-container">';

            _.each(_sortedModifierLabels, function (modLabel) {

                var fill = 'white';

                _strBuilder     += '<div class="color-wheel" id="cw_' + modLabel.index + '">';
                _strBuilder     += '<svg id="svg_cw_' + modLabel.index + '" class="svg-color-wheel">';
                _tempIndex      += 1;
                _strBuilder     += '<circle class="preview growCircle" cx="275" cy="215" r="100"  fill="#3d3d3d" />';
                _strBuilder     += '<text class="previewColorCode growTextCode" x="275" y="215" font-family="Avenir Next LT W04 Thin" font-size="48px" text-anchor="middle" fill="' + fill + '">RB</text>';
                _strBuilder     += '<text class="previewColorName growTextName" x="275" y="240" font-family="Avenir Next LT W04 Bold" font-size="18px" text-anchor="middle" fill="' + fill + '">Royal Blue</text>';


                /// Process Limited Colorset
                
                var _colorSet = undefined;
                var _limitedColorSet = ub.data.materialOptionWithLimitedColors.getLimitedColorSet(modLabel.name);

                if (typeof _limitedColorSet !== "undefined") {

                    _alternateColorSet = [];

                    _.each(_limitedColorSet.valid_colors, function (item) {

                        _alternateColorSet.push(ub.funcs.getColorByColorCode(item));

                    });

                    ub.utilities.info ('Limited Color Set detected for ' + modLabel.name);
                    _colorSet = _alternateColorSet;

                }

                if (typeof _limitedColorSet === "undefined") {
                    _colorSet = ub.current_material.settings.team_colors;
                }

                /// End Process Limited Colorset

                _.each(_colorSet, function (colorObj, index) {

                    // Only Update Material Option Colors when colors selected is less than the colors used count, to prevent updating uniform colors in case the user is just adding another color
                    if (_.size(ub.current_material.settings.team_colors) < _.size(ub.data.colorsUsed)) {

                        ub.funcs.setGroupColor((index + 1).toString(), colorObj.hex_code, colorObj); 

                    }

                    _strBuilder +=  '<path class="growStroke arc-' + modLabel.fullname + '" id="arc' + index + '-' + modLabel.fullname + '" data-color-id="' + colorObj.id + '" fill="none" stroke="#' + colorObj.hex_code + '" stroke-width="50" />'; 

                });

                _strBuilder     += '</svg>';
                _strBuilder     += '</div>';

            });

        _strBuilder         += '</div>';

        $('div#primary_options_container > div#cw').html(_strBuilder);

        _.each(_sortedModifierLabels, function (modLabel) {

            var _elements   = _teamColorObj.length;
            var _length     = 360 / _elements;
            var _start      = 0;

            /// Process Limited Colorset
                
            var _colorSet = undefined;
            var _limitedColorSet = ub.data.materialOptionWithLimitedColors.getLimitedColorSet(modLabel.name);

            if (typeof _limitedColorSet !== "undefined") {

                _alternateColorSet = [];

                _.each(_limitedColorSet.valid_colors, function (item) {

                    _alternateColorSet.push(ub.funcs.getColorByColorCode(item));

                });

                ub.utilities.info ('Limited Color Set detected for ' + modLabel.name);

                _colorSet = _alternateColorSet;

                _elements   = _alternateColorSet.length;
                _length     = 360 / _elements;

            }

            if (typeof _limitedColorSet === "undefined") {
                _colorSet = ub.current_material.settings.team_colors;
            }

            /// End Process Limited Colorset

            _.each(_colorSet, function (colorObj, index) {

                var _nth    = index;
                var _start  = _nth * _length;
                var _end    = _start + _length;
                var _id     = "arc" + index + '-' + modLabel.fullname;

                document.getElementById(_id).setAttribute("d", that.describeArc(275, 215, 150, _start, _end));

                $("path#arc" + index + '-' + modLabel.fullname).parent().find('circle').css('cursor', 'pointer');
                $("path#arc" + index + '-' + modLabel.fullname).parent().find('circle').on('click', function () {

                    $('div.pd-dropdown-links[data-fullname="team-colors"]').trigger('click');

                });

                $("path#arc" + index + '-' + modLabel.fullname).parent().find('text.previewColorName').css('cursor', 'pointer');
                $("path#arc" + index + '-' + modLabel.fullname).parent().find('text.previewColorName').on('click', function () {

                    $('div.pd-dropdown-links[data-fullname="team-colors"]').trigger('click');

                });

                $("path#arc" + index + '-' + modLabel.fullname).parent().find('text.previewColorCode').css('cursor', 'pointer');
                $("path#arc" + index + '-' + modLabel.fullname).parent().find('text.previewColorCode').on('click', function () {

                    $('div.pd-dropdown-links[data-fullname="team-colors"]').trigger('click');

                });

                $("path#arc" + index + '-' + modLabel.fullname).css('cursor','pointer');

                $("path#arc" + index + '-' + modLabel.fullname).on("click", function () {

                    $("path.arc-" + modLabel.fullname).attr("class", "growStroke arc-" + modLabel.fullname);
                    $(this).attr("class", "selectedStroke growStroke arc-" + modLabel.fullname);

                   var _colorID           = $(this).data('color-id');
                   var _colorOBJ          = _.find(_colorSet, {id: _colorID.toString()});

                   ub.funcs.ui.setMaterialOptionColor(modLabel.name, _colorOBJ, 'from color picker');

                   var $previewCircle     = $(this).parent().find('circle');
                   $previewCircle.css('fill', '#' + _colorOBJ.hex_code);

                   if (_colorOBJ.color_code === 'W') {
                    
                        $previewCircle.css('fill', '#ffffff');

                   }

                   var fill = "white";

                   if (_colorOBJ.color_code === 'W' || _colorOBJ.color_code === 'Y' || _colorOBJ.color_code === 'CR' || _colorOBJ.color_code === 'S' || _colorOBJ.color_code === 'PK'  || _colorOBJ.color_code === 'OP' || _colorOBJ.color_code === 'SG') {
                        fill = 'black';
                   }

                   var $previewColorCode = $(this).parent().find('text.previewColorCode');
                   $previewColorCode.html(_colorOBJ.color_code);
                   $previewColorCode.css('fill', fill);

                   var $previewColorName = $(this).parent().find('text.previewColorName');
                   $previewColorName.html(_colorOBJ.name);
                   $previewColorName.css('fill', fill);

                });

            });

        });    

        var _sizeOf     = _.size(ub.data.modifierLabels);
        var _widthOfCW  = $('div.color-wheel').first().width();

        $('#color-wheel-container').css('width', (_sizeOf * _widthOfCW) + 'px');
    },

    polarToCartesian: function(centerX, centerY, radius, angleInDegrees) {

        var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    },

    describeArc: function(x, y, radius, startAngle, endAngle) {
        var start = this.polarToCartesian(x, y, radius, endAngle);
        var end = this.polarToCartesian(x, y, radius, startAngle);
        var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

        var d = [
            "M", start.x, start.y,
            "A", radius, radius, 0, arcSweep, 0, end.x, end.y
        ].join(" ");

        return d;
    }

}