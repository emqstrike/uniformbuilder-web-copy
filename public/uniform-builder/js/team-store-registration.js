$(document).ready(function() {
    var TeamStoreRegistration = {
        init: function() {
            console.log(window.ub.config.api_host + '/api/colors/');
            $.getJSON(window.ub.config.api_host + '/api/colors/', function(data) {
                console.log(data);
                if (data.success) {
                    console.log(data.colors);
                    var result = data.colors;
                    var colors = [];
                    for (i = 0; i < result.length; i++) {
                        if (result[i].active) {
                            colors.push('#' + result[i].hex_code);
                        }
                    }
                    if (colors.length > 0) {
                        TeamStoreRegistration.buildColorPicker('.team-color-1', colors, 1);
                        TeamStoreRegistration.buildColorPicker('.team-color-2', colors, 2);
                        TeamStoreRegistration.buildColorPicker('.team-color-3', colors, 3);
                        TeamStoreRegistration.buildColorPicker('.team-color-4', colors, 4);
                    }
                }
            });
        },

        buildColorPicker: function(targetElem, colors, level) {
            var picker = vanillaColorPicker(document.querySelector(targetElem));

            picker.set('customColors', colors);
            picker.on('colorChosen', function(color, targetElem) {
                TeamStoreRegistration.onChangeTeamColor(targetElem, level, color);
            });
        },

        onColorPickerMouseOver: function(e) {
            document.getElementById('uniform').style.backgroundColor = e.dataPoint.color;
            $(e.dataPoint.targetElem).val(e.dataPoint.color);
        },

        onChangeTeamColor: function(targetElem, level, color) {
            $(targetElem).css('background-color', color);
        },
    };

    TeamStoreRegistration.init();
});