

function ColorPalette () {

}


ColorPalette.funcs = {

    getColorsSets: function (name) {
        var colors = [];
        var colorSet = _.find(ub.data.colors_sets, { name: name});

        _.map(JSON.parse(colorSet.colors), function(color) {

            colors.push(ub.funcs.getColorByColorCode(color));

        });

        return colors;
    },

    prepareRichardsonPalette: function() {
        ub.data.firstColorPalette = ColorPalette.funcs.getColorsSets("Richardson Color Palette 1");
        ub.data.secondaryColorPalette = ColorPalette.funcs.getColorsSets("Richardson Color Palette 2");
        ub.data.tertiaryColorPalette = ColorPalette.funcs.getColorsSets("Richardson Color Palette 3");

        return;
    }
}