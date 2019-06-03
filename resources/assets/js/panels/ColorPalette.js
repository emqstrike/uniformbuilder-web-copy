function ColorPalette () {}

ColorPalette.funcs = {

    init: function () {
        var that = this;
        that.prepareRichardsonPalette();
    },

    getColorsSets: function (name) {
        var colors = [];
        var colorSet = _.find(ub.data.colors_sets, { name: name});

        if (typeof colorSet !== "undefined") {
            _.map(JSON.parse(colorSet.colors), function(color) {
                colors.push(ub.funcs.getColorByColorCode(color));
            });
            
            return colors;
        } else {
            ub.utilities.warn("Cannot find color set " + name);
            return;
        }
    },

    prepareRichardsonPalette: function() {
        ub.data.firstColorPalette = ColorPalette.funcs.getColorsSets("Richardson Color Palette 1");
        ub.data.secondaryColorPalette = ColorPalette.funcs.getColorsSets("Richardson Color Palette 2");
        ub.data.tertiaryColorPalette = ColorPalette.funcs.getColorsSets("Richardson Color Palette 3");
        return;
    },

    getConfigurationPerTab: function(name) {
        var colors = undefined;
        var blockPattern = undefined;

        if (ub.config.blockPattern.includes("PTS Signature")) {
            blockPattern = "PTS Signature";
        } else if (ub.config.blockPattern.includes("PTS Pro Select")) {
            blockPattern = "PTS Pro Select";
        } else if (ub.config.blockPattern.includes("PTS Select")) {
            blockPattern = "PTS Select";
        }

        if (ub.config.brand === "prolook") {
            // Set team color if prolook brand
            colors = ub.current_material.settings.team_colors

        } else if (ub.config.brand === "richardson" || ub.config.brand === "Richardson") {
            // Get Color Palette configuration
            var configuration = ub.data.palleteConfiguration.getColorPaletteConfiguration(blockPattern, ub.config.brand, ub.config.uniform_application_type, ub.config.type);

            // Check which color palette to be used
            if (typeof configuration !== "undefined") {
                var config = configuration.colors[name];

                switch (config) {
                    case "Palette 1":
                        colors = ub.data.firstColorPalette;
                        break;
                    case "Palette 2":
                        colors = ub.data.secondaryColorPalette;
                        break;
                    case "Palette 3":
                        colors = ub.data.tertiaryColorPalette;
                        break;
                    default:
                        colors = ub.funcs.isSublimated() ? ub.data.secondaryColorPalette : ub.data.firstColorPalette;
                        break;
                }
            } else {
                if (ub.config.uniform_application_type === "sublimated") {
                    colors = ub.data.secondaryColorPalette;
                } else {
                    colors = ub.data.firstColorPalette;
                }
            }
        }

        return _.sortBy(colors, 'order');
    },
}