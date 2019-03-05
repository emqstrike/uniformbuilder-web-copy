<!-- Application UI Block - LETTERS -->

    <script type="text/mustache" id="add-new-application-letters">
        {{-- <div class="application-letters-container cp-padding-medium">
            <h4 class="app-letters-title abrade-ultra-italic">@{{ title }}</h4>
            @{{^isTwill}}
            <div class="addApplicationsOpts hide">

                @{{#designType}}
                    <div class="posContainer clearfix app-letters-wrapper @{{ showTypes }}">
                        <h5 class="uk-margin-small abrade-black">CHOOSE A DESIGN TYPE</h5>
                        @{{#designTypeData}}
                            <button type="button" class="app-btn w-45 optionButton" data-type="@{{ type }}">@{{ name }}</button>
                        @{{/designTypeData}}
                    </div>
                @{{/designType}}

                @{{#perspective}}
                    <div class="posContainer clearfix app-letters-wrapper">
                        <h5 class="uk-margin-small abrade-black">CHOOSE PERSPECTIVE</h5>
                        <button type="button" class="app-btn w-45 pull-left perspective" data-id="front">Front</button>
                        <button type="button" class="app-btn w-45 pull-right perspective" data-id="back">Back</button>
                        <button type="button" class="app-btn w-45 pull-left perspective" data-id="left">Left</button>
                        <button type="button" class="app-btn w-45 pull-right perspective" data-id="right">Right</button>
                    </div>
                @{{/perspective}}

                @{{#part}}
                    <div class="posContainer clearfix app-letters-wrapper">
                        <h5 class="uk-margin-small abrade-black">CHOOSE PART</h5>
                        @{{#partsData}}
                        <button type="button" class="app-btn w-45 part" data-id="@{{ name }}">@{{ name }}</button>
                        @{{/partsData}}
                    </div>
                @{{/part}}

                @{{#side}}
                    <div class="posContainer clearfix sideOptions hide app-letters-wrapper">
                        <h5 class="uk-margin-small abrade-black">CHOOSE SIDE</h5>
                        <button class="side" data-id="na" style="display: none;">N/A</button>
                        <button class="app-btn w-45 side" data-id="right">Right</button>
                        <button class="app-btn w-45 side" data-id="left">Left</button>
                    </div>
                @{{/side}}
            </div>
            @{{/isTwill}}

            <div class="add-new-application-letters">
                <button type="button" class="app-btn w-45 pull-left add-app-letters app-letters-button @{{ disabled }}" @{{ disabled }}><span class="fa fa-plus-circle"></span> Add Application</button>
                <button type="button" class="app-btn w-45 pull-right view-app-letters app-letters-button" data-type="@{{ type }}"><span class="fa fa-eye"></span> View All Application</button>
            </div>

            <div class="clearfix"></div>
        </div> --}}
        <h5 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-uppercase uk-text-bold fc-darker abrade-ultra-italic">@{{ title }}</h5>

        {{-- <div class="uk-grid-small grid-tiny uk-grid-match uk-text-center" uk-grid>
            <div class="uk-width-1-2 ">
                <button class="toggle-decor-letter uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize uk-text-capitalize btn-selection-choice" type="button">
                    <span class="uk-margin-small-right fa fa-add"></span>Add application
                </button>
            </div>
            <div class="uk-width-1-2 ">
                <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize uk-text-capitalize btn-selection-choice toggle-hide" type="button">
                    <span class="uk-margin-small-right fa fa-view"></span>View all application
                </button>
            </div>
        </div> --}}

        <div class="toggle-decor-letter con-add-application">
            <h6 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold uk-text-uppercase fc-dark abrade-black"><span>1.</span>&nbsp;Choose design type</h6>
            <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-expand uk-text-center con-select active-bgc-dark" uk-grid>
                @{{ #designType }}
                    @{{ #designTypeData }}
                        <div class="">
                            <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice" data-type="@{{ type }}">
                                @{{ name }}
                            </button>
                        </div>
                    @{{ /designTypeData }}
                @{{ /designType }}
            </div>

            <h6 uk-margin class="uk-margin-small uk-margin-remove-horizontal uk-text-bold uk-text-uppercase fc-dark abrade-black"><span>2.</span>&nbsp;Choose Perspective</h6>
            <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-expand uk-text-center con-select active-bgc-dark" uk-grid>
                <div class="">
                    <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice perspective" data-id="front">Front</button>
                </div>
                <div>
                    <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice perspective" data-id="back">Back</button>
                </div>
                <div>
                    <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice perspective" data-id="left">Left</button>
                </div>
                <div>
                    <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice perspective" data-id="right">Right</button>
                </div>
            </div>

            <h6 uk-margin class="uk-margin-small uk-margin-remove-horizontal uk-text-bold uk-text-uppercase fc-dark abrade-black"><span>3.</span>&nbsp;Choose Part</h6>
            <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-expand uk-text-center con-select active-bgc-dark" uk-grid>
                @{{ #part }}
                    @{{ #partsData }}
                        <div class="">
                            <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice toggle-hide" data-id="@{{ name }}">@{{ name }}</button>
                        </div>
                    @{{ /partsData }}
                @{{ /part }}
            </div>

            @{{#side}}
                <div class="posContainer sideOptions hide app-letters-wrapper">
                    <h6 uk-margin class="uk-margin-small uk-margin-remove-horizontal uk-text-bold uk-text-uppercase fc-dark abrade-black">Choose Side</h6>
                    <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-expand uk-text-center con-select active-bgc-dark" uk-grid>
                        <div class="">
                            <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice toggle-hide" data-id="right">Right</button>
                        </div>
                        <div class="">
                            <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice toggle-hide" data-id="left">Left</button>
                        </div>
                    </div>
                </div>
            @{{ /side }}

            <h6 uk-margin class="uk-margin-medium-top uk-margin-remove-bottom uk-margin-remove-horizontal uk-text-bold uk-text-uppercase fc-dark abrade-black"><span>4.</span></h6>
            <div class="uk-grid-small grid-tiny uk-grid-match uk-text-center" uk-grid>
                <div class="uk-width-1-2">
                    <button class="toggle-decor-letter uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize uk-text-capitalize btn-selection-choice" type="button">
                        <span class="uk-margin-small-right fa fa-add"></span>Add application
                    </button>
                </div>
                <div class="uk-width-1-2 ">
                    <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize uk-text-capitalize btn-selection-choice toggle-hide" type="button">
                        <span class="uk-margin-small-right fa fa-cancel"></span>Cancel
                    </button>
                </div>
            </div>
        </div>
    </script>

<script type="text/mustache" id="m-application-layer-list">
    @{{ #applications }}
        <li class="layer cp-border-bottom application-item-@{{ code }}" data-location-id="@{{ code }}" data-application-type="@{{ type }}" data-zindex="6">
            <div class="row cp-margin-remove cp-padding-small">
                <div class="col-md-10 cp-text-medium cp-padding-remove">
                    <span>#@{{ code }}</span>
                    <span>@{{ application_type }} - @{{ caption }}</span>
                    <span>(@{{ view }})</span>
                </div>
                <div class="col-md-2 cp-text-center pull-right cp-padding-remove" style="padding-left: 45px !important;">
                    <a href="javascript:void(0)" data-application-id="@{{ code }}" data-application-type="@{{ type }}" class="cp-fc-black remove-application-button">
                        <i class="fa fa-trash"></i>
                    </a>
                </div>
            </div>
        </li>
    @{{ /applications }}
    @{{ ^applications }}
        <div class="cp-text-center">
            <h4 class="cp-padding-small cp-padding-remove-horizontal cp-margin-remove">No application</h4>
        </div>
    @{{ /applications }}
</script>



<script type="text/mustache" id="m-application-ui-block-letters">
    @{{#newApplication}}
        @{{{ newApplicationContainer }}}
    @{{/newApplication}}

    @{{#applications}}
        <div class="applicationUIBlock cp-padding-medium cp-padding-remove-bottom cp-margin-remove" data-application-id="@{{ code }}">
            <h4 class="app-letters-title abrade-ultra-italic">@{{ type }} <span class="subtitle">(@{{ perspective }} view) #@{{ code }}</span></h4>

            <div class="toggleApplications posContainer clearfix app-letters-wrapper" data-status="on">
                <button type="button" class="toggleAppOpt app-btn w-45 pull-left active view-letters-opt app-letters-button">View</button>
                <button type="button" class="toggleAppOpt app-btn w-45 pull-right hide-letters-opt app-letters-button">Hide</button>
            </div>

            <div class="app-letters-wrapper">
                <h5 class="app-letters-subtitle abrade-black">INPUT @{{ type }}</h5>
                <input type="text" name="sampleText" class="sampleText app-letters-input" placeholder="@{{ placeholder }}" value="@{{ defaultText }}" @{{ isPlayerName }} />
            </div>

            <div class="lettersOptsContainer app-letters-wrapper">
                @{{#fonts}}
                    @{{{ fontsData }}}
                @{{/fonts}}

                @{{#slider}}
                    @{{{ sliderContainer }}}
                @{{/slider}}

                @{{#accents}}
                    @{{{ accentsData }}}
                @{{/accents}}

                @{{#colorPicker}}
                    @{{{ colorsSelection }}}
                @{{/colorPicker}}
            </div>
        </div>
    @{{/applications}}
</script>

<!-- End Application UI Block - LETTERS -->

<!-- Font Styles -->
<script type="text/mustache" id="m-font-styles-container">
    <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">@{{ type }} font</h6>
    <div class="uk-grid-collapse uk-grid-match uk-text-center" uk-grid>
        <div class="uk-width-auto">
            <a href="javascript:void(0)" class="fontStyleLeft uk-button uk-button-small uk-width-1-1 uk-button-default" data-direction="previous">
                <span class="fc-red"><i class="glyphicon glyphicon-arrow-left"></i></span>
            </a>
        </div>
        <div class="uk-width-expand">
            <span class="font_name uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-bold fc-dark" style="font-family: @{{ fontStyle }}">@{{ fontCaption }}</span>
        </div>
        <div class="uk-width-auto">
            <a href="javascript:void(0)" class="fontStyleRight uk-button uk-button-small uk-width-1-1 uk-button-default" data-direction="next">
                <span class="fc-red"><i class="glyphicon glyphicon-arrow-right"></i></span>
            </a>
        </div>
    </div>
</script>
<!-- End of Font Styles -->

<!-- Font Accents -->
<script type="text/mustache" id="m-font-accents-container">
    {{-- <div class="clearfix">
        <h5 class="app-letters-subtitle abrade-black">@{{ title }}</h5>
        @{{#accentsData}}
        <div class="thumbnailContainer @{{ active }}" data-accent-id="@{{ id }}">
            <img class="font-accent-thumbnail" src="@{{ thumbnail }}">
            @{{{ activeCheck }}}
        </div>
        @{{/accentsData}}
    </div> --}}

    <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">@{{ title }}</h6>
    <div class="font-accent-container uk-grid-small grid-tiny uk-grid-match uk-child-width-1-5 uk-child-width-1-6@s uk-child-width-1-5@m con-select con-palettes" uk-grid>
        @{{#accentsData}}
            <div>
                <button class="thumbnailContainer @{{ active }} uk-inline bgc-transparent box-palette btn-selection-choice" data-accent-id="@{{ id }}">
                    <div class="bdr-thin bdr-gray">
                        <img class="font-accent-thumbnail" src="@{{ thumbnail }}" uk-img>
                    </div>
                    @{{{ activeCheck }}}
                </button>
            </div>
        @{{/accentsData}}
    </div>
</script>
<!-- End of Font Accents -->

<!-- Free Applications Block -->
<script type="text/mustache" id="free-applications-container">
    @{{#applications}}
        @{{#isVisible}}
        <div class="applicationUIBlock cp-padding-medium cp-margin-remove" data-application-id="@{{ code }}">
            <h4 class="abrade-ultra-italic">@{{ type }} (@{{ perspective }} view) #@{{ code }}</h4>

            <div class="row">
                @{{#appTypes}}
                    <div class="col-md-6">
                        <button type="button" class="app-btn w-30 change-free-app" data-type="@{{ name }}">@{{ defaultText }}</button>
                    </div>
                @{{/appTypes}}
            </div>
        </div>
        @{{/isVisible}}
    @{{/applications}}
</script>
<!-- End Free Applications Block -->

<!-- Application UI Block -->

<script type="text/mustache" id="m-application-ui-block">

    @{{#newApplication}}
        @{{{ newApplicationContainer }}}
    @{{/newApplication}}

    <div class="clearfix"></div>

    @{{#applications}}
        <div class="applicationUIBlock cp-padding-medium" data-application-id="@{{ code }}">
            <h4 class="application-thumbnail-name abrade-ultra-italic">@{{ type }} (@{{ perspective }} view) #@{{ code }}</h4>

            <div class="thumb-container">
                <div class="row">
                    <div class="col-md-5">
                        <span>
                            <image src="@{{ thumbnail }}" class="thumbnail pull-left" />
                        </span>
                    </div>
                    <div class="col-md-7 cp-padding-remove">
                        <div class="thumb-links">
                            <h5 class="abrade-black">@{{ type }}</h5>
                            <a href="@{{ viewArtDetails }}"><p class="abrade-book">View Art Details</p></a>
                            <a href="@{{ viewPrint }}"><p class="abrade-book">View Print Ready File</p></a>
                        </div>
                    </div>
                </div>

                <div class="clearfix"></div>

                <span class="thumb-name">@{{ name }}</span>

                <span class="flip">
                    <button type="button" class="app-btn w-45 flipBtn" data-id="@{{ code }}">Flip</button>
                </span>
            </div>

            <div class="toggleApplications posContainer clearfix" data-status="on">
                <button type="button" class="toggleAppOpt app-btn w-45 pull-left view-sliders active">View</button>
                <button type="button" class="toggleAppOpt app-btn w-45 pull-right hide-sliders">Hide</button>
            </div>

            @{{#slider}}
                @{{{ sliderContainer }}}
            @{{/slider}}

            @{{#colorPicker}}
                @{{{ colorsSelection }}}
            @{{/colorPicker}}

       </div>
    @{{/applications}}

</script>

<!-- End Application UI Block -->

<!-- Start Slider Container -->
<script type="text/mustache" id="m-slider-container">
    <div class="uk-padding-small uk-padding-remove-vertical">
        <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom"><span class="uk-margin-small-right icon-font-size"></span>Font Size</h6>
        <div class="manipulator-type-container scale uk-padding uk-padding-remove-vertical">
            <div class="sc scale">
                <div id="scale-slider" class="slider-control-scale" data-id="@{{ code }}"></div>
            </div>
        </div>
        <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-small-bottom"><span class="uk-margin-small-right icon-move"></span>Position</h6>
        <div class="manipulator-type-container move uk-padding uk-padding-remove-vertical" data-type="move">
            <div class="sc move">
                <div id="move-slider-x" class="move x slider-control-move-x" data-id="@{{ code }}"></div>
            </div>
            <div class="sc move uk-margin-medium-top uk-padding-small uk-padding-remove-horizontal uk-padding-remove-bottom">
                <div id="move-slider-y" class="move y slider-control-move-y" data-id="@{{ code }}"></div>
            </div>
        </div>

        <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-small-bottom"><span class="uk-margin-small-right icon-rotate"></span>Rotate</h6>
        <div class="uk-flex-center" uk-grid>
            <div class=" manipulator-type-container rotate">
                <div class="sc rotate">
                    <div id="rotate-slider" class="slider-control-rotate" data-id="@{{ code }}"></div>
                </div>
            </div>
        </div>
    </div>
</script>
<!-- End Slider Container  -->

<script type="text/mustache" id="m-applications-letters-uikit">
    <ul class="uk-list uk-list-large uk-list-divider uk-padding-small uk-margin-remove application-container">
        <li class="con-add-view-application">

        </li>

        @{{ #applications }}
            <li class="applicationUIBlockNew" data-application-id="@{{ code }}">
                <h5 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold fc-darker"><span class=" uk-text-uppercase abrade-ultra-italic">@{{ type }}</span> (@{{ perspective }} view) #@{{ code }}</h5>
                <div class="uk-grid-small grid-tiny uk-grid-match uk-text-center con-select con-toggle active-bgc-dark" uk-grid>
                    <div class="uk-width-1-2">
                        <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice view-letters-opt uk-active">View</button>
                    </div>
                    <div class="uk-width-1-2 ">
                        <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice hide-letters-opt">Hide</button>
                    </div>
                </div>

                <div class="lettersOptsContainer">
                    <div class="con-input-object con-en-disable-me">
                        <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">Input team name</h6>
                        <div class="app-letters-wrapper">
                            <input class="uk-input bgc-light bdr-lightGray sampleText app-letters-input" type="text" placeholder="@{{ placeholder }}" value="@{{ defaultText }}" @{{ isPlayerName }}>
                        </div>
                    </div>

                    @{{#fonts}}
                        @{{{ fontsData }}}
                    @{{/fonts}}

                    @{{#slider}}
                        @{{{ sliderContainer }}}
                    @{{/slider}}

                    @{{#accents}}
                        @{{{ accentsData }}}
                    @{{/accents}}

                    @{{#colorPicker}}
                        @{{{ colorsSelection }}}
                    @{{/colorPicker}}
                </div>
            </li>
        @{{ /applications }}
    </ul>
</script>

<script type="text/mustache" id="m-color-blocks">
    <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">Choose font color</h6>
    <div>
        <ul class="uk-subnav uk-grid-collapse uk-text-center uk-padding-remove uk-child-width-expand bottom-arrow arrow-outward bac-dark active-bgc-dark active-bdr-dark " uk-switcher uk-grid>
            <li class="uk-padding-remove"><a href="#" class="uk-width-1-1 padding-tiny-vertical uk-button-default uk-text-capitalize">Main&nbsp;Color</a></li>
            <li class="uk-padding-remove"><a href="#" class="uk-width-1-1 padding-tiny-vertical uk-button-default uk-text-capitalize">Outline&nbsp;Color</a></li>
        </ul>
        <ul class="uk-switcher uk-margin uk-padding-remove">
            <li>
                <div class="con-select con-palettes">
                    <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-auto uk-text-center m-palette-color" uk-grid>
                    </div>
                </div>
            </li>
            <li>
                <div class="con-select con-palettes">
                    <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-auto uk-text-center m-palette-color" uk-grid>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</script>

<script type="text/mustache" id="m-add-new-application">
    <div class="toggle-decor-letter con-add-application uk-active">
        <h6 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold uk-text-uppercase fc-dark abrade-black">Choose location</h6>
        <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-1-2 uk-text-center con-select active-bgc-dark" uk-grid>
            <div class="">
                <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice toggle-hide uk-active">Front body</button>
            </div>
            <div class="">
                <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice">Back body</button>
            </div>
            <div class="">
                <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice">Left sleeve</button>
            </div>
            <div class="">
                <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice">Right sleeve</button>
            </div>
        </div>

        <h6 uk-margin class="uk-margin-small uk-margin-remove-horizontal uk-text-bold uk-text-uppercase fc-dark abrade-black">Choose perspective</h6>
        <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-1-3 uk-text-center con-select active-bgc-dark uk-margin-medium-bottom" uk-grid>
            <div class="">
                <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice toggle-hide uk-active">Front number</button>
            </div>
            <div class="">
                <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice">Back number</button>
            </div>
            <div class="">
                <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice">Sleeve number</button>
            </div>
        </div>
    </div>
</script>

<script type="text/mustache" id="m-reinit-application">
    @{{ #applications }}
        <li class="applicationUIBlockNew" data-application-id="@{{ code }}">
            <h5 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold fc-darker"><span class=" uk-text-uppercase abrade-ultra-italic">@{{ type }}</span> (@{{ perspective }} view) #@{{ code }}</h5>
            <div class="uk-grid-small grid-tiny uk-grid-match uk-text-center con-select con-toggle active-bgc-dark" uk-grid>
                <div class="uk-width-1-2">
                    <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice view-letters-opt uk-active">View</button>
                </div>
                <div class="uk-width-1-2 ">
                    <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice hide-letters-opt">Hide</button>
                </div>
            </div>

            <div class="lettersOptsContainer">
                <div class="con-input-object con-en-disable-me">
                    <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">Input team name</h6>
                    <div class="">
                        <input class="uk-input bgc-light bdr-lightGray" type="text" placeholder="@{{ placeholder }}" value="@{{ defaultText }}" @{{ isPlayerName }}>
                    </div>
                </div>

                @{{#fonts}}
                    @{{{ fontsData }}}
                @{{/fonts}}

                @{{#slider}}
                    @{{{ sliderContainer }}}
                @{{/slider}}

                @{{#accents}}
                    @{{{ accentsData }}}
                @{{/accents}}

                @{{#colorPicker}}
                    @{{{ colorsSelection }}}
                @{{/colorPicker}}
            </div>
        </li>
    @{{ /applications }}
</script>