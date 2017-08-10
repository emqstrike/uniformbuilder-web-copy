$(document).ready(function() {

    console.log('UB Data inside namedrops ...');
    console.log(ub.data);

    ub.data.namedrops = {

        items: [

            {

                name: 'Sub1',

                mascots: [
                    {
                        elementID: 0,
                        mascotId: '188',
                        name: 'Bulldog_8',
                        alias: '',
                        colorSet: ['GR', 'W', 'R','B'],
                        zIndex: 1,
                    },
                ],

                texts: [

                    {
                        id: 'north',

                    },
                    {
                        id: 'BULLDOGS FOOTBALL',
                          

                    },

                ], 

                decals: [

                    {



                    },

                ]

            }

        ],

        createNameDrop: function (nameDrop, colorSet) {


        }, 

        // SVG To Uniform
        createTestND: function () {

            var draw = SVG('namedrop-container').size(348, 348);
            var rect = draw.rect(174, 174).attr({ fill: '#f06' });

            var sid = $('svg').attr('id');
            var dataURL = draw.svg();
            var encodedData = window.btoa(dataURL);
            var encodedFinal = "data:image/svg+xml;base64," + encodedData;
            var shapeFromSVG = new PIXI.Sprite(PIXI.Texture.fromImage(encodedFinal));

            shapeFromSVG.zIndex = -(ub.funcs.generateZindex('namedrops'));

            ub.objects.front_view['namedrops_1'] = shapeFromSVG;
            ub.front_view.addChild(shapeFromSVG);
            shapeFromSVG.position = {x: 491.53846153846155, y: 476};
            ub.updateLayersOrder(ub.front_view);

        },

        showDialog: function () {

            var template = $('#m-name-drop-dialog').html();
            var data = { parts: ub.funcs.getFreeFormLayers(), };
            var markup = Mustache.render(template, data);

            var dialog = bootbox.dialog({
                title: 'Namedrop Editor',
                message: markup,
                size: 'large',
            });

            dialog.init(function () {

                // Prep Here ...

                ub.data.namedrops.createTestND();

            });

        }, 

    }

});