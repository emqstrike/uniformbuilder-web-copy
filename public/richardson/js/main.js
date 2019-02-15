jQuery(function($) {
    var ctrg="";
    var confRedirect="";
    var confQuestion="";
    var confAction="";

    function singleSelect (){
        $('.con-select .btn-selection-choice').click(function () {
            $(this).closest('.con-select').find('.btn-selection-choice').removeClass('uk-active');
            $(this).addClass('uk-active');
        });
    }

    function toggleBtnEditPattenColor (){

        $('.con-select.con-palettes.w-btn-toggle .btn-selection-choice').click(function() {
            $(this).addClass('uk-active');
            if ($(this).hasClass('palette-pattern')) {
                $(this).closest('.con-select.con-palettes ').find('.modal-edit-palette-pattern').show();
            }
            else
                $(this).closest('.con-select.con-palettes ').find('.modal-edit-palette-pattern').hide();
        });
        $('.con-select.con-palettes.w-btn-toggle .btn-selection-choice.palette-pattern').each(function(){
            if ($(this).hasClass('uk-active')) {
                $(this).closest('.con-select.con-palettes ').find('.modal-edit-palette-pattern').show();
            }
            else
                $(this).closest('.con-select.con-palettes ').find('.modal-edit-palette-pattern').hide();
        });
    }

    function toggleConChooseNumbersColors () {
        $('.con-select.con-toggle .btn-selection-choice').click(function() {
            if ($(this).hasClass('toggle-hide')) {
                $(this).closest('li').find('.con-choose-numbers-colors').hide();
            }
            else
                $(this).closest('li').find('.con-choose-numbers-colors').show();
        });
        $('.con-select.con-toggle .btn-selection-choice.toggle-hide').each(function(){
            if ($(this).hasClass('uk-active')) {
                $(this).closest('li').find('.con-choose-numbers-colors').hide();
            }
            else
                $(this).closest('li').find('.con-choose-numbers-colors').show();
        });
    }

    function pipingNumberSelection () {
        $(".btn-piping-modal").click(function () {

            UIkit.switcher("#color-palette-nav-list").show("0");
            var ctr = 1 + $(this).siblings(".choose-numbers-colors").find(".btn-selection-choice.uk-active").parent().index();
            $('li', '#modal-edit-palette-color #color-palette-nav-list').slice(0, ctr).each(function() {
                $(this).addClass("show").removeClass("hidden");
            });
            $('li', '#modal-edit-palette-color #color-palette-nav-list').slice(ctr).each(function() {
                $(this).addClass("hidden").removeClass("show");
            });

            $('li', '#modal-edit-palette-color #color-palette-list').slice(0, ctr).each(function() {
                $(this).addClass("show").removeClass("hidden");
            });
            $('li', '#modal-edit-palette-color #color-palette-list').slice(ctr).each(function() {
                $(this).addClass("hidden").removeClass("show");
            });

            var lishow = $("#modal-edit-palette-color #color-palette-list li.show");
            var ctrpa = lishow.find(".btn-no-color:not(.uk-active)").length;

            ctrg = ctrpa;
            // $("#title-test").text(ctrg);
            if (ctrg < 2) {
                lishow.eq(0).find(".btn-no-color").removeClass("uk-active").parent().hide();
            }
            else if (ctrg > 1) {
                lishow.find(".btn-no-color").parent().show();
            }


            $("#modal-edit-palette-color #color-palette-list .btn-selection-choice").click(function () {
                $(this).closest('.con-select').find('.btn-selection-choice').removeClass('uk-active');
                $(this).addClass('uk-active');

                var ctrpa = $("#modal-edit-palette-color #color-palette-list li.show .btn-no-color:not(.uk-active)").length;
                ctrg = ctrpa;
                // $("#title-test").text(ctrg);
                if (ctrg < 2) {
                    $("#modal-edit-palette-color #color-palette-list").find(".btn-no-color:not(.uk-active)").closest("div").hide();
                }
                else if (ctrg > 1) {
                    $("#modal-edit-palette-color #color-palette-list").find(".btn-no-color:not(.uk-active)").closest("div").show();
                }
            });

        });
    }

    function toggleConInputObject (){
        $('.con-select.con-toggle .btn-selection-choice').click(function() {
            if ($(this).hasClass('toggle-hide')) {
                $(this).closest('li').find('.toggle-me').hide();
            }
            else
                $(this).closest('li').find('.toggle-me').show();
        });
        $('.con-select.con-toggle .btn-selection-choice.toggle-hide').each(function(){
            if ($(this).hasClass('uk-active')) {
                $(this).closest('li').find('.toggle-me').hide();
            }
            else
                $(this).closest('li').find('.toggle-me').show();
        });
    }

    function enDisableMe (){
        $('.con-select.con-toggle .btn-selection-choice').click(function() {
            if ($(this).hasClass('toggle-hide')) {
                $(this).closest('li').find('.con-en-disable-me .en-disable-me').addClass("uk-disabled");
            }
            else {
                $(this).closest('li').find('.con-en-disable-me .en-disable-me').removeClass("uk-disabled");
            }
        });
        $('.con-select.con-toggle .btn-selection-choice.toggle-hide').each(function(){
            if ($(this).hasClass('uk-active')) {
                $(this).closest('li').find('.con-en-disable-me .en-disable-me').addClass("uk-disabled");
            }
            else {
                $(this).closest('li').find('.con-en-disable-me .en-disable-me').removeClass("uk-disabled");
            }
        });
    }

    function toggleConAddApplication (){
        $('.btn-selection-choice.toggle-hide').click(function() {
            $(this).closest('li').find('.con-add-application').addClass("uk-active");
            $(this).closest('.con-toggle').find('.toggle-show').removeClass("uk-active");
        });
    }

    function sliders (){

        $(".slider").roundSlider({
            radius: 70,
            width: 12,
            handleSize: "+14",
        });

        $(".slider-range")
            .slider({
                min: -100,
                max: 100
            })

            .slider("float", {

                handle: true,
                pips: false,
                labels: false,
                prefix: "",
                suffix: ""

            });

        $(".slider-range.range-small-large")
            .slider("pips", {
                labels: {first:"Small", last:"Large"},
            });

        $(".slider-range.range-left-right")
            .slider("pips", {
                labels: {first:"Left", last:"Right"},
            });

        $(".slider-range.range-up-down")
            .slider("pips", {
                labels: {first:"Down", last:"Up"},
            });
    }

    function mascotLogo () {
        $("#imgInp").change(function(){
            readURL(this);
        });
        $('#modal-select-mascot .con-select .btn-selection-choice').click(function() {
            if ($(this).hasClass('uk-active')) {
                var pel = $(this).find('img').attr('src');
                $('#btn-add-to-uniform').removeClass("uk-disabled");
                $('.con-preview-mascot').show();
            }
            else {
                $('#btn-add-to-uniform').addClass("uk-disabled");
                $('.con-preview-mascot').hide();
            }
            $('#preview-existing-logo').attr('src', pel);
        });

        $('#modal-select-mascot .con-select .btn-selection-choice').each(function() {
            if ($(this).hasClass('uk-active')) {
                var pel = $(this).find('img').attr('src');
                $('.con-preview-mascot').show();
                $('#btn-add-to-uniform').removeClass("uk-disabled");
            }
            else {
                $('#btn-add-to-uniform').addClass("uk-disabled");
                $('.con-preview-mascot').hide();
                var pel = "./img/no-preview.png";
            }
            $('#preview-existing-logo').attr('src', pel);
        });


        $('.btn-delete.btn-archive').click(function() {
            confRedirect = "#modal-select-mascot";
            confQuestion = ("move this to archive");
            confAction = ("Do It");
            confirmation();
        });
        $('.btn-delete.btn-active').click(function() {
            confRedirect = "#modal-select-mascot";
            confQuestion = ("set this to active");
            confAction = ("Do It");
            confirmation();
        });
    }

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.custom-logo-upload-preview').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    function confirmation () {
        $( "#modal-confirmation" ).load( "m-modal-confirmation.html",function(){
            $('.btn-confirm-yes').attr("uk-toggle", confRedirect);
            $('.btn-confirm-no').attr("uk-toggle", confRedirect);
            $('.text-confirmation-question').text(confQuestion);
            $('.text-confirmation-action').text(confAction);
        });
    }



    // function productItems (){
    //
    //     var data =
    //         {
    //             all: [
    //                 {
    //                     name: '3000-1',
    //                     img: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/984010a0a226dc207ee5430a1e00a1b7.png',
    //                     price: '86.00'
    //                 },
    //                 {
    //                     name: '3000-2',
    //                     img: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/984010a0a226dc207ee5430a1e00a1b7.png',
    //                     price: '86.00'
    //                 },
    //                 {
    //                     name: '3000-3',
    //                     img: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/984010a0a226dc207ee5430a1e00a1b7.png',
    //                     price: '86.00'
    //                 },
    //                 {
    //                     name: '3000-4',
    //                     img: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/984010a0a226dc207ee5430a1e00a1b7.png',
    //                     price: '86.00'
    //                 },
    //                 {
    //                     name: '3000-5',
    //                     img: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/984010a0a226dc207ee5430a1e00a1b7.png',
    //                     price: '86.00'
    //                 },
    //                 {
    //                     name: '3000-6',
    //                     img: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/984010a0a226dc207ee5430a1e00a1b7.png',
    //                     price: '86.00'
    //                 },
    //                 {
    //                     name: '3000-7',
    //                     img: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/984010a0a226dc207ee5430a1e00a1b7.png',
    //                     price: '86.00'
    //                 },
    //                 {
    //                     name: '3000-8',
    //                     img: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/984010a0a226dc207ee5430a1e00a1b7.png',
    //                     price: '86.00'
    //                 }
    //             ],
    //             twoButtons: [
    //                 {
    //                     name: '3000-1',
    //                     img: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/e2d11662bd4a544a557e21893da67277.png',
    //                     price: '86.00'
    //                 },
    //                 {
    //                     name: '3000-2',
    //                     img: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/e2d11662bd4a544a557e21893da67277.png',
    //                     price: '86.00'
    //                 },
    //                 {
    //                     name: '3000-3',
    //                     img: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/e2d11662bd4a544a557e21893da67277.png',
    //                     price: '86.00'
    //                 },
    //                 {
    //                     name: '3000-4',
    //                     img: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/e2d11662bd4a544a557e21893da67277.png',
    //                     price: '86.00'
    //                 },
    //                 {
    //                     name: '3000-5',
    //                     img: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/e2d11662bd4a544a557e21893da67277.png',
    //                     price: '86.00'
    //                 },
    //                 {
    //                     name: '3000-6',
    //                     img: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/e2d11662bd4a544a557e21893da67277.png',
    //                     price: '86.00'
    //                 },
    //                 {
    //                     name: '3000-7',
    //                     img: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/e2d11662bd4a544a557e21893da67277.png',
    //                     price: '86.00'
    //                 },
    //                 {
    //                     name: '3000-8',
    //                     img: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/e2d11662bd4a544a557e21893da67277.png',
    //                     price: '86.00'
    //                 }
    //             ]
    //         };
    //
    //     var template = $('#all-products').html();
    //     var markup = Mustache.render(template, data);
    //     $('#m-all-products').html(markup);
    //
    //     var template = $('#2-button').html();
    //     var markup = Mustache.render(template, data);
    //     $('#m-2-button').html(markup);
    // }

    function preview (){

        var data =
            {previewLinks: [
                    {links: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/984010a0a226dc207ee5430a1e00a1b7.png'},
                    {links: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/ff11e98804c31eace338c140fc3b4e2f.png'},
                    {links: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/decdfb5513247463255f68634de2bcfb.png'},
                    {links: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/801f4aaa30cc9cb9f960d7c04ece745c.png'}
                ]};

        $.get('templates.html', function(templates) {
            var template = $(templates).filter('#preview-pane-thumb-nav').html();
            var markup = Mustache.render(template, data);
            $('#m-preview-pane-thumb-nav').html(markup);

            var template = $(templates).filter('#preview').html();
            var markup = Mustache.render(template, data);
            $('#m-preview').html(markup);
            singleSelect();
        });
    }

    function fabrics (){

        var data =
            {fabrics: [
                    {
                        name: 'Etx',
                        fabric: './img/fabric-texture.jpg',
                        description: 'Lorem ipsum dolor amet, asdasd consectetur.',
                        description2: 'Lorem ipsum dolor amet, asdasd consectetur.',
                        description3: 'Lorem ipsum dolor amet, asdasd consectetur.',
                        description4: 'Lorem ipsum dolor amet, asdasd consectetur.'
                    },
                    {
                        name: 'Extxx',
                        fabric: './img/fabric-texture-2.jpg',
                        description: 'Lorem ipsum dolor amet, asdasd consectetur.',
                        description2: 'Lorem ipsum dolor amet, asdasd consectetur.',
                        description3: 'Lorem ipsum dolor amet, asdasd consectetur.',
                        description4: 'Lorem ipsum dolor amet, asdasd consectetur.'
                    },
                    {
                        name: 'Etxxx',
                        fabric: './img/fabric-texture-3.jpg',
                        description: 'Lorem ipsum dolor amet, asdasd consectetur.',
                        description2: 'Lorem ipsum dolor amet, asdasd consectetur.',
                        description3: 'Lorem ipsum dolor amet, asdasd consectetur.',
                        description4: 'Lorem ipsum dolor amet, asdasd consectetur.'
                    },
                    {
                        name: 'Etxxxx',
                        fabric: './img/fabric-texture-4.jpg',
                        description: 'Lorem ipsum dolor amet, asdasd consectetur.',
                        description2: 'Lorem ipsum dolor amet, asdasd consectetur.',
                        description3: 'Lorem ipsum dolor amet, asdasd consectetur.',
                        description4: 'Lorem ipsum dolor amet, asdasd consectetur.'
                    },
                ]};

        $.get('templates.html', function(templates) {
            var template = $(templates).filter('#fabrics').html();
            var markup = Mustache.render(template, data);
            $('#m-fabrics').html(markup);
            singleSelect();

            // Default selected palette
            $("#m-fabric-selection").each(function() {
                $(this).find(".btn-selection-choice").eq(0).addClass("uk-active");
            });
        });
    }

    function paletteColor (){
        var data =
            {
                paletteColor:[
                    {color:'black'},
                    {color:'lightBlue'},
                    {color:'charcoalGray'},
                    {color:'maroon'},
                    {color:'green'},
                    {color:'gold'},
                    {color:'grey'},
                    {color:'silverGray'},
                    {color:'green-2'},
                    {color:'maroonBrown'},
                    {color:'darkBlue'},
                    {color:'orange'},
                    {color:'purple'},
                    {color:'cardinal'},
                    {color:'cornBlue'},
                    {color:'seminol'},
                    {color:'creamYellow'},
                    {color:'white'},
                    {color:'neonPink'}
                ]
            };

        $.get('templates.html', function(templates) {
            var template = $(templates).filter('#paletteColor').html();
            var markup = Mustache.render(template, data);
            $('.m-palette-color').html(markup);

            // Add palette disable to the palette list
            $("#modal-edit-palette-color #color-palette-list .m-palette-color").prepend('<div><button class="uk-inline box-palette btn-selection-choice btn-no-color palette-color"><div class="palette palette-blank"></div><div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray"><span class="icon icon-check uk-text-bold uk-position-center"></span></div></button></div>');
            singleSelect();
            toggleBtnEditPattenColor();

            // Default selected palette
            $(".m-palette-color.conAutoSelect").each(function() {
                $(this).find(".btn-selection-choice").eq(0).addClass("uk-active");
            });
        });

    }

    function palettePattern (){
        var data =
            {
                palettePattern: [
                    {pattern: 'camo'},
                    {pattern: 'check'},
                    {pattern: 'diamonds'},
                    {pattern: 'digital-camo'},
                    {pattern: 'distressed'},
                    {pattern: 'fiber'},
                    {pattern: 'lockdown'},
                    {pattern: 'pixel-fade-body'},
                    {pattern: 'pixel-fade-sleeve'},
                    {pattern: 'quake'},
                    {pattern: 'score'},
                    {pattern: 'thick-stripe'},
                    {pattern: 'thin-stripes'},
                    {pattern: 'trips-arrow'},
                    {pattern: 'upper-stripes'},
                    {pattern: 'upper-stripes-body'},
                    {pattern: 'wave-stripe'},
                    {pattern: 'wave-stripes'},
                    {pattern: 'gradient-2'}
                ]
            };

        $.get('templates.html', function(templates) {
            var template = $(templates).filter('#palettePattern').html();
            var markup = Mustache.render(template, data);
            $('.m-palette-pattern').html(markup);
            singleSelect();
            toggleBtnEditPattenColor();
        });
    }

    function pipings (){
        var data =
            {
                Titles: [
                    {titleName: 'Neck Piping'},
                    {titleName: 'Yoke Piping'},
                    {titleName: 'Set-In Piping'},
                    {titleName: 'Sleeve Piping 1" Up'},
                    {titleName: 'End of Sleeve Piping'}
                ]
            };

        $.get('templates.html', function(templates) {
            var template = $(templates).filter('#pipings').html();
            var markup = Mustache.render(template, data);
            $('#m-pipings-list').html(markup);
            singleSelect();
            toggleConChooseNumbersColors();
            pipingNumberSelection();
        });
    }

    function accents (){
        var data =
            {
                accents: [
                    {accent: 'http://customizer.prolook.com/images/sidebar/no-accent.png'},
                    {accent: 'http://customizer.prolook.com/images/sidebar/outlined.png'},
                    {accent: 'http://customizer.prolook.com/images/sidebar/single_outline_with_shadow.png'},
                    {accent: 'http://customizer.prolook.com/images/sidebar/drop_shadow.png'},
                    {accent: 'http://customizer.prolook.com/images/sidebar/no-accent.png'}
                ]
            };

        $.get('templates.html', function(templates) {
            var template = $(templates).filter('#accents').html();
            var markup = Mustache.render(template, data);
            $('.m-accents').html(markup);
            singleSelect();
        });
    }

    function layouts (){
        var data =
            {
                layouts: [
                    {layout: './img/font-layout-plain.png'},
                    {layout: './img/font-layout-arc.png'}
                ]
            };

        $.get('templates.html', function(templates) {
            var template = $(templates).filter('#layouts').html();
            var markup = Mustache.render(template, data);
            $('.m-layouts').html(markup);
            singleSelect();
        });
    }

    function logo () {
        var data =
            {
                mascotLogoActive: [
                    {
                        name: "136: Beavers_2",
                        logo: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/materials/staging/Beavers_2/00585c46c4acd535948bae93.png'
                    },
                    {
                        name: "160: Bess_13",
                        logo: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/materials/staging/Bees_13/29d9294061ff1b3a9c94db30.png'
                    },
                    {
                        name: "156: Bees_9",
                        logo: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/materials/staging/Bees_9/fb64165e078cb5a51cdecbec.png'
                    },
                    {
                        name: "162: Bees_15",
                        logo: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/materials/staging/Bees_15/183ef20c4c605d3a47a6cb6d.png'
                    }
                ],
                mascotLogoArchive: [
                    {
                        name: "137: Beavers_3",
                        logo: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/materials/staging/Beavers_3/ddb5886e0ba6d61aa108bc44.png'
                    },
                    {
                        name: "189: Bulldog_9",
                        logo: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/materials/staging/Bulldog_9/10811cf29ca6cd7665c8ac72.png'
                    },
                    {
                        name: "182: Bulldog_2",
                        logo: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/materials/staging/Bulldog_2/59cc873d2f8f47bf1898846c.png'
                    }
                ],
            };

        $.get('templates.html', function(templates) {
            var template = $(templates).filter('.logo-active').html();
            var markup = Mustache.render(template, data);
            $('.m-logo-active').html(markup);

            var template = $(templates).filter('.logo-archive').html();
            var markup = Mustache.render(template, data);
            $('.m-logo-archive').html(markup);
            singleSelect();
            mascotLogo();
            $('#modal-select-mascot .modal-title').text("Decoration Custom logo");
            $('#modal-select-mascot .modal-menu-mascot li:first-child * span:last-child').text("from existing design");
            $('#modal-select-mascot .menu-tab-mascot li').eq(2).show();
        });
    }

    function mascot () {
        var data =
            {
                mascotLogoActive: [
                    {
                        name: "148: Bees_1",
                        logo: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/materials/staging/Bees_1/826a848d3281e1e5cb962608.png'
                    },
                    {
                        name: "247: Duck_1",
                        logo: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/materials/staging/Duck_1/04eb4d8010cc0a209a667143.png'
                    },
                    {
                        name: "248: Duck_2",
                        logo: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/materials/staging/Duck_2/209b3e397aeeabc71a120314.png'
                    },
                    {
                        name: "249: Duck_3",
                        logo: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/materials/staging/Duck_3/399326009fe075c211d8abea.png'
                    }
                ],
                mascotLogoArchive: [
                    {
                        name: "191: Cardinal_2",
                        logo: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/materials/staging/Cardinal_2/e3d436933b8246f95735cfd5.png'
                    },
                    {
                        name: "192: Cardinal_3",
                        logo: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/materials/staging/Cardinal_3/a025c5d2fcd2197302ec5cff.png'
                    },
                    {
                        name: "193: Cardinal_4",
                        logo: 'https://s3-us-west-2.amazonaws.com/uniformbuilder/materials/staging/Cardinal_4/a0d89abc2ac4b164adcab046.png'
                    }
                ],
            };

        $.get('templates.html', function(templates) {
            var template = $(templates).filter('.logo-active').html();
            var markup = Mustache.render(template, data);
            $('.m-logo-active').html(markup);

            var template = $(templates).filter('.logo-archive').html();
            var markup = Mustache.render(template, data);
            $('.m-logo-archive').html(markup);
            singleSelect();
            mascotLogo();
            $('#modal-select-mascot .modal-title').text("Decoration stock mascot");
            $('#modal-select-mascot .modal-menu-mascot li:first-child * span:last-child').text("from stock mascot");
            $('#modal-select-mascot .menu-tab-mascot li').eq(2).hide();
        });
    }

    function applications () {
        var data =
            {applications: [
                    {
                        appNumber:'2',
                        appName: 'Letters - Player Name'
                    },
                    {
                        appNumber:'3',
                        appName: 'Front Numbers'
                    },
                    {
                        appNumber:'1',
                        appName: 'Letters - Team Name'
                    },
                    {
                        appNumber:'5',
                        appName: 'Custom Logo - Bear'
                    },
                ]};

        $.get('templates.html', function(templates) {
            var template = $(templates).filter('#applications').html();
            var markup = Mustache.render(template, data);
            $('#m-applications').html(markup);
            singleSelect();
            $('.btn-delete').click(function() {
                confRedirect = "#modal-all-application";
                confQuestion = ("delete this application");
                confAction = ("Delete It");
                confirmation();
            });
        });
    }

    function previewLogo (){

        var data =
            {previewLogo: [
                    {logo: './img/branding-right-chest.jpg'},
                    {logo: './img/branding-left-sleeve.jpg'},
                    {logo: './img/branding-back.jpg'}
                ]};

        $.get('templates.html', function(templates) {
            var template = $(templates).filter('#preview-logo').html();
            var markup = Mustache.render(template, data);
            $('#m-preview-logo').html(markup);
            singleSelect();
        });
    }


        //CHANGE FABRIC BUTTON
    // $('.btn-bt-0').click(function() {
    //     $(this).closest('div').removeClass('uk-active');
    //     $('.left-nav div div').removeClass('uk-active').first().addClass('uk-active');
    // });

    // $( "sublimated-fabric.html" ).ready(function() {
    //     productItems();
    // });

    $( "#con-preview-pane" ).load( "preview-pane.html"  ,function() {
        preview();
    });

    $( "#m-fabric-selection" ).load( "m-fabric-selection.html" ,function() {
        fabrics();
    });

     $( "#m-sleeve-inserts" ).load( "m-sleeve-inserts.html",function(){
        paletteColor();
        palettePattern();
        singleSelect();
        toggleBtnEditPattenColor();
    });

    $( "#m-base-color-selection" ).load( "m-base-color-selection.html",function(){
        paletteColor();
        palettePattern();
    });

    $( "#m-pipings" ).load( "m-pipings.html",function(){
        pipings();
    });

    $( "#m-decorations-letters" ).load( "m-decorations-letters.html",function(){
        singleSelect();
        paletteColor();
        toggleBtnEditPattenColor();
        toggleConInputObject();
        enDisableMe();
        sliders();
        accents();
        layouts();
        toggleConAddApplication();

    });

    $( "#m-decorations-numbers" ).load( "m-decorations-numbers.html",function(){
        singleSelect();
        paletteColor();
        toggleBtnEditPattenColor();
        toggleConInputObject();
        enDisableMe();
        sliders();
        accents();
        toggleConAddApplication();
    });

    $( "#m-decorations-mascots" ).load( "m-decorations-mascots.html",function(){
        singleSelect();
        paletteColor();
        toggleBtnEditPattenColor();
        toggleConInputObject();
        toggleConAddApplication();
        enDisableMe();
        sliders();
    });

    $( "#m-richardson-logo" ).load( "m-richardson-logo.html",function(){
        previewLogo();
    });

    $( "#modal-all-application" ).load( "m-modal-all-application.html",function(){
        applications();
        singleSelect();
    });

    $( "#modal-edit-palette-pattern" ).load( "m-modal-palette-pattern.html",function(){
        paletteColor();
        singleSelect();
        toggleBtnEditPattenColor();
    });

    $( "#modal-edit-palette-color" ).load( "m-modal-palette-color.html",function(){
        paletteColor();
        toggleBtnEditPattenColor();

        $("#modal-edit-palette-color #color-palette-list li").each(function() {
            $(this).find(".btn-selection-choice").eq(1).addClass("uk-active");
        });
    });

    $( "#modal-select-mascot" ).load( "m-modal-select-mascot.html",function(){
        $('.btn-open-modal-mascot').click(function() {
            mascot();
        });

        $('.btn-open-modal-logo').click(function() {
            logo();
        });
    });
});