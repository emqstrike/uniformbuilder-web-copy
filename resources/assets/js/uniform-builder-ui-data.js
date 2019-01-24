$(document).ready(function() {

    ub.uiData = {};

    ub.uiData.patternSliderRange = {

        forCalibration: ['NK Stripe', 'Line Fade Body', 'Halftone Fade Sleeve', ],
        min: -350,
        max: 350,
        starts: 0,
        adjustedStart: 250,

    }

    ub.uiData.patternOffset = {
        items: [
            {
                patternCode: 'line_fade_body',
                partCodes: ['pocket'],
                blockPatterns: ['Hoodie'],
                offSet: 1000,
                max: 1100,
                min: 890
            },
            {
                patternCode: 'line_fade_body',
                partCodes: ['pocket_insert'],
                blockPatterns: ['Hoodie'],
                offSet: 1000,
                max: 1000,
                min: 850
            },
            {
                patternCode: "line_fade_sleeve",
                partCodes: ['pocket_insert'],
                blockPatterns: ['Hoodie'],
                offSet: 900,
                max: 1000,
                min: 800
            },
            {
                patternCode: "line_fade_sleeve",
                partCodes: ['pocket'],
                blockPatterns: ['Hoodie'],
                offSet: 1000,
                max: 1100,
                min: 850
            },
            {
                patternCode: "halftone_fade_chest",
                partCodes: ['pocket_insert'],
                blockPatterns: ['Hoodie'],
                offSet: 1100,
                max: 1200,
                min: 1000
            },
            {
                patternCode: "halftone_fade_chest",
                partCodes: ['pocket'],
                blockPatterns: ['Hoodie'],
                offSet: 1100,
                max: 1300,
                min: 1000
            },
            {
                patternCode: "halftone_fade_sleeve",
                partCodes: ['pocket_insert'],
                blockPatterns: ['Hoodie'],
                offSet: 1100,
                max: 1200,
                min: 1000
            },
            {
                patternCode: "halftone_fade_sleeve",
                partCodes: ['pocket'],
                blockPatterns: ['Hoodie'],
                offSet: 1100,
                max: 1300,
                min: 1000
            },
            {
                patternCode: 'line_fade_body',
                partCodes: ['hood_panel'],
                blockPatterns: ['Hoodie'],
                offSet: 325,
                max: 485,
                min: 250
            },
            {
                patternCode: "nk_stripe",
                partCodes: ['pocket_insert'],
                blockPatterns: ['Hoodie'],
                offSet: 1100,
                max: 1250,
                min: 1000
            },
            {
                patternCode: "nk_stripe",
                partCodes: ['pocket'],
                blockPatterns: ['Hoodie'],
                offSet: 1100,
                max: 1250,
                min: 1000
            }
        ],

        getOffset: function (patternCode, blockPattern, part) {
            var a = _.find(this.items, function (item) {
                return item.patternCode === patternCode && 
                    _.contains(item.blockPatterns, blockPattern) && 
                    _.contains(item.partCodes, part);
            });

            return typeof a !== "undefined" ? a : undefined;
        },
    };
});