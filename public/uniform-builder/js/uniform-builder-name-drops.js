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

                console.log('OK')

            });

        }

    }



});