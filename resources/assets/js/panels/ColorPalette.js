

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
    },

    getConfigurationPerTab: function(name) {
        var colorPalette = undefined;

        var configuration = ub.data.palleteConfiguration.getColorPaletteConfiguration(ub.config.blockPattern, ub.config.brand, ub.config.uniform_application_type, ub.config.type, ub.config.option);
        var config = configuration.colors[name];

        switch (config) {
            case "Palette 1":
                colorPalette = ub.data.firstColorPalette;
                break;
            case "Palette 2":
                colorPalette = ub.data.secondaryColorPalette;
                break;
            case "Palette 3":
                colorPalette = ub.data.tertiaryColorPalette;
                break;
        }

        return colorPalette;
    }
}