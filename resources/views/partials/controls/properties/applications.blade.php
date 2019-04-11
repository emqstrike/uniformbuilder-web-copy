<!-- View application layers -->
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
            <h4 class="cp-padding-small cp-padding-remove-horizontal cp-margin-remove">No Decoration</h4>
        </div>
    @{{ /applications }}
</script>
<!-- End View application layers -->

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
    <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">@{{ title }}</h6>
    <div class="font-accent-container uk-grid-small grid-tiny uk-grid-match uk-child-width-1-5 uk-child-width-1-6@s uk-child-width-1-5@m con-select con-palettes" uk-grid>
        @{{#accentsData}}
            <div uk-tooltip="title: @{{ title }}; pos: left;">
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
            <li class="applicationUIBlockNew" data-application-id="@{{ code }}">
                <h5 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold fc-darker"><span class=" uk-text-uppercase abrade-ultra-italic">@{{ type }}</span> (@{{ perspective }} view) #@{{ code }}</h5>
                <div class="uk-grid-small grid-tiny uk-grid-match uk-text-center con-select con-toggle active-bgc-dark toggleApplicationContainer" uk-grid>
                    @{{ #appTypes }}
                        <div class="uk-width-1-2">
                            <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice change-free-app" data-type="@{{ name }}">@{{ defaultText }}</button>
                        </div>
                    @{{ /appTypes }}
                </div>
            </li>
        @{{/isVisible}}
    @{{/applications}}
</script>
<!-- End Free Applications Block -->

<!-- Start Slider Container -->
<script type="text/mustache" id="m-slider-container">
    <div class="uk-padding-small uk-padding-remove-vertical">
        <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom"><span class="uk-margin-small-right fa fa-font"></span>Font Size</h6>
        <div class="manipulator-type-container scale uk-padding uk-padding-remove-vertical">
            <div class="sc scale">
                <div id="scale-slider" class="slider-control-scale" data-id="@{{ code }}"></div>
            </div>
        </div>
        <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-small-bottom"><span class="uk-margin-small-right fa fa-arrows"></span>Position</h6>
        <div class="manipulator-type-container move uk-padding uk-padding-remove-vertical" data-type="move">
            <div class="sc move">
                <div id="move-slider-x" class="move x slider-control-move-x" data-id="@{{ code }}"></div>
            </div>
            <div class="sc move uk-margin-medium-top uk-padding-small uk-padding-remove-horizontal uk-padding-remove-bottom">
                <div id="move-slider-y" class="move y slider-control-move-y" data-id="@{{ code }}"></div>
            </div>
        </div>

        <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-small-bottom"><span class="uk-margin-small-right fa fa-undo"></span>Rotate</h6>
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

<!-- Application Letter Block -->
<script type="text/mustache" id="m-applications-letters-uikit">
    <ul class="uk-list uk-list-large uk-list-divider uk-padding-small uk-margin-remove application-container">
        <li class="new-application-container">
            <h5 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-uppercase uk-text-bold fc-darker abrade-ultra-italic">Names</h5>
            <div class="uk-grid-small grid-tiny uk-grid-match uk-text-center container-add-view-application" uk-grid>
                <div class="uk-width-1-2 ">
                    <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize show-add-application-options @{{ isTackleTwill }}" data-application-type="@{{ type }}" data-application-title="@{{ title }}" type="button">
                        <span class="uk-margin-small-right" uk-icon="plus-circle"></span>Add name
                    </button>
                </div>
                <div class="uk-width-1-2 ">
                    <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize view-application-list app-letters-button" data-type="@{{ type }}" type="button">
                        <span class="uk-margin-small-right fa fa-eye"></span>View all decoration 
                    </button>
                </div>
            </div>
            <div class="add-application-block">
            </div>
        </li>

        @{{ #applications }}
            <li class="applicationUIBlockNew" data-application-id="@{{ code }}">
                <div class="uk-grid-small" uk-grid>
                    <div class="uk-width-expand">
                        <h5 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold fc-darker"><span class=" uk-text-uppercase abrade-ultra-italic">@{{ type }}</span> (@{{perspective}} view) #@{{code}}</h5>
                    </div>
                    <div class="uk-width-auto">
                        <div class="uk-text-right">
                            <a href="javascript:void(0)" class="cp-fc-black remove-decoration"><span uk-icon="icon: close;"></span></a>
                        </div>
                    </div>
                </div>
                <div class="uk-grid-small grid-tiny uk-grid-match uk-text-center con-select con-toggle active-bgc-dark toggleApplicationContainer" uk-grid>
                    <div class="uk-width-1-2">
                        <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice view-letters-opt">View</button>
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
    <ul class="uk-list uk-list-divider uk-padding-small uk-margin-remove uk-padding-remove-top">
        <li></li>
        <li class="add-another-application-container">
            <div class="uk-grid-small grid-tiny uk-grid-match uk-text-center container-add-another-view-application uk-grid uk-grid-stack" uk-grid="">
                <div class="uk-width-1-1 uk-flex-center">
                    <button class="uk-button uk-button-small uk-width-1-2 uk-button-default uk-text-capitalize add-another-application" data-application-type="letters" data-application-title="name" type="button">
                        <span class="uk-margin-small-right" uk-icon="plus-circle"></span>Add another name
                    </button>
                </div>
            </div>
            <div class="add-another-application-block">
            </div>
        </li>
    </ul>
</script>
<!-- End Application Letter Block -->

<!-- Application Number Block -->
<script type="text/mustache" id="m-applications-numbers-uikit">
    <ul class="uk-list uk-list-large uk-list-divider uk-padding-small uk-margin-remove application-container">
        <li class="new-application-container">
            <h5 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-uppercase uk-text-bold fc-darker abrade-ultra-italic">Numbers</h5>
            <div class="uk-grid-small grid-tiny uk-grid-match uk-text-center container-add-view-application" uk-grid>
                <div class="uk-width-1-2 ">
                    <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize show-add-application-options @{{ isTackleTwill }}" data-application-type="@{{ type }}" data-application-title="@{{ title }}" type="button">
                        <span class="uk-margin-small-right" uk-icon="plus-circle"></span>Add number
                    </button>
                </div>
                <div class="uk-width-1-2">
                    <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize view-application-list app-letters-button" data-type="@{{ type }}" type="button">
                        <span class="uk-margin-small-right fa fa-eye"></span>View all decoration 
                    </button>
                </div>
            </div>
            <div class="add-application-block">
            </div>
        </li>

        @{{ #applications }}
            <li class="applicationUIBlockNew" data-application-id="@{{ code }}">
                <div class="uk-grid-small" uk-grid>
                    <div class="uk-width-expand">
                        <h5 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold fc-darker"><span class=" uk-text-uppercase abrade-ultra-italic">@{{ type }}</span> (@{{perspective}} view) #@{{code}}</h5>
                    </div>
                    <div class="uk-width-auto">
                        <div class="uk-text-right">
                            <a href="javascript:void(0)" class="cp-fc-black remove-decoration"><span uk-icon="icon: close;"></span></a>
                        </div>
                    </div>
                </div>
                <div class="uk-grid-small grid-tiny uk-grid-match uk-text-center con-select con-toggle active-bgc-dark toggleApplicationContainer" uk-grid>
                    <div class="uk-width-1-2">
                        <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice view-letters-opt">View</button>
                    </div>
                    <div class="uk-width-1-2 ">
                        <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice hide-letters-opt">Hide</button>
                    </div>
                </div>

                <div class="lettersOptsContainer">
                    <div class="con-input-object con-en-disable-me">
                        <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">Input team name</h6>
                        <div class="app-letters-wrapper">
                            <input class="en-disable-me uk-input uk-form-width-xsmall bgc-light bdr-lightGray sampleText app-letters-input" type="text" placeholder="@{{ placeholder }}" value="@{{ defaultText }}" @{{ isPlayerName }}>
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
    <ul class="uk-list uk-list-divider uk-padding-small uk-margin-remove uk-padding-remove-top">
        <li></li>
        <li class="add-another-application-container">
            <div class="uk-grid-small grid-tiny uk-grid-match uk-text-center container-add-another-view-application uk-grid uk-grid-stack" uk-grid="">
                <div class="uk-width-1-1 uk-flex-center">
                    <button class="uk-button uk-button-small uk-width-1-2 uk-button-default uk-text-capitalize add-another-application" data-application-type="numbers" data-application-title="number" type="button">
                        <span class="uk-margin-small-right" uk-icon="plus-circle"></span>Add another number
                    </button>
                </div>
            </div>
            <div class="add-another-application-block">
            </div>
        </li>
    </ul>
</script>
<!-- End Application Number Block -->

<!-- Application Mascot Block -->
<script type="text/mustache" id="m-applications-mascot-uikit">
    <ul class="uk-list uk-list-large uk-list-divider uk-padding-small uk-margin-remove application-container">
        <li class="new-application-container">
            <h5 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-uppercase uk-text-bold fc-darker abrade-ultra-italic">Logos</h5>
            <div class="uk-grid-small grid-tiny uk-grid-match uk-text-center container-add-view-application" uk-grid>
                <div class="uk-width-1-2 ">
                    <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize show-add-application-options @{{ isTackleTwill }}" data-application-type="@{{ type }}" data-application-title="@{{ title }}" type="button">
                        <span class="uk-margin-small-right" uk-icon="plus-circle"></span>Add logo
                    </button>
                </div>
                <div class="uk-width-1-2">
                    <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize view-application-list" data-type="@{{ type }}" type="button">
                        <span class="uk-margin-small-right fa fa-eye"></span>View all decoration 
                    </button>
                </div>
            </div>
            <div class="add-application-block">
            </div>
        </li>

        @{{ #applications }}
            <li class="applicationUIBlockNew" data-application-id="@{{ code }}">
                <div class="uk-grid-small" uk-grid>
                    <div class="uk-width-expand">
                        <h5 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold fc-darker"><span class=" uk-text-uppercase abrade-ultra-italic">@{{ type }}</span> (@{{perspective}} view) #@{{code}}</h5>
                    </div>
                    <div class="uk-width-auto">
                        <div class="uk-text-right">
                            <a href="javascript:void(0)" class="cp-fc-black remove-decoration"><span uk-icon="icon: close;"></span></a>
                        </div>
                    </div>
                </div>
                <div class="con-en-disable-me uk-grid-small" uk-grid>
                    <div class="uk-width-1-2 uk-width-1-3@s uk-width-1-2@l uk-width-1-3@xl uk-text-center con-select active-bgc-dark">
                        <button type="button" class="bdr-thin bdr-gray con-img-added-mascot-logo bgc-transparent uk-padding-remove">
                            <img class="uk-padding-small" src="@{{ thumbnail }}" style="min-width: 100% !important; min-height: 150px !important">
                        </button>
                        <a href="#" class="btn-open-modal-logo en-disable-me uk-link-reset">@{{ name }}</a>
                        <a href="#" class="uk-button uk-button-small uk-button-default uk-width-1-1 uk-margin-small-top uk-text-capitalize flip-mascot" data-application-code="@{{ code }}">Flip</a>
                    </div>
                    <div class="uk-width-1-2 uk-width-2-3@s uk-width-1-2@l uk-width-2-3@xl">
                        <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-remove-bottom abrade-black">@{{ type }}</h6>
                        @{{ #isEmbellishment }}
                        <div>
                            <a href="@{{ viewArtDetails }}" class="uk-text-small">View&nbsp;Art&nbsp;Details</a>
                        </div>
                        <div>
                            <a href="@{{ viewPrint }}" class="uk-text-small">View&nbsp;Print&nbsp;Ready&nbsp;File</a>
                        </div>
                        @{{ /isEmbellishment }}
                    </div>
                </div>
                <div class="uk-grid-small grid-tiny uk-grid-match uk-text-center uk-margin-top con-select con-toggle active-bgc-dark hide-show-button-container" uk-grid>
                    <div class="uk-width-1-2 ">
                        <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice view-application">View</button>
                    </div>
                    <div class="uk-width-1-2 ">
                        <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice hide-application">Hide</button>
                    </div>
                </div>

                <div class="mascot-options-container">
                    @{{#slider}}
                        @{{{ sliderContainer }}}
                    @{{/slider}}

                    @{{#colorPicker}}
                        @{{{ colorsSelection }}}
                    @{{/colorPicker}}
                </div>
            </li>
        @{{ /applications }}
    </ul>
    <ul class="uk-list uk-list-divider uk-padding-small uk-margin-remove uk-padding-remove-top">
        <li></li>
        <li class="add-another-application-container">
            <div class="uk-grid-small grid-tiny uk-grid-match uk-text-center container-add-another-view-application uk-grid uk-grid-stack" uk-grid="">
                <div class="uk-width-1-1 uk-flex-center">
                    <button class="uk-button uk-button-small uk-width-1-2 uk-button-default uk-text-capitalize add-another-application" data-application-type="mascots" data-application-title="logo" type="button">
                        <span class="uk-margin-small-right" uk-icon="plus-circle"></span>Add another logo
                    </button>
                </div>
            </div>
            <div class="add-another-application-block">
            </div>
        </li>
    </ul>
</script>
<!-- End Application Mascot Block -->

<!-- Reiniatialize Application -->
<script type="text/mustache" id="m-reinit-application">
    @{{ #applications }}
        <li class="applicationUIBlockNew" data-application-id="@{{ code }}">
            <div class="uk-grid-small" uk-grid>
                <div class="uk-width-expand">
                    <h5 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold fc-darker"><span class=" uk-text-uppercase abrade-ultra-italic">@{{ type }}</span> (@{{perspective}} view) #@{{code}}</h5>
                </div>
                <div class="uk-width-auto">
                    <div class="uk-text-right">
                        <a href="javascript:void(0)" class="cp-fc-black remove-decoration"><span uk-icon="icon: close;"></span></a>
                    </div>
                </div>
            </div>
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
</script>

<script type="text/mustache" id="m-reinit-application-numbers">
    @{{ #applications }}
        <li class="applicationUIBlockNew" data-application-id="@{{ code }}">
            <div class="uk-grid-small" uk-grid>
                <div class="uk-width-expand">
                    <h5 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold fc-darker"><span class=" uk-text-uppercase abrade-ultra-italic">@{{ type }}</span> (@{{perspective}} view) #@{{code}}</h5>
                </div>
                <div class="uk-width-auto">
                    <div class="uk-text-right">
                        <a href="javascript:void(0)" class="cp-fc-black remove-decoration"><span uk-icon="icon: close;"></span></a>
                    </div>
                </div>
            </div>
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
                        <input class="uk-input bgc-light uk-form-width-xsmall bdr-lightGray sampleText app-letters-input" type="text" placeholder="@{{ placeholder }}" value="@{{ defaultText }}" @{{ isPlayerName }}>
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

<script type="text/mustache" id="m-reinit-application-mascots">
    @{{ #applications }}
        <li class="applicationUIBlockNew" data-application-id="@{{ code }}">
            <div class="uk-grid-small" uk-grid>
                <div class="uk-width-expand">
                    <h5 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold fc-darker"><span class=" uk-text-uppercase abrade-ultra-italic">@{{ type }}</span> (@{{perspective}} view) #@{{code}}</h5>
                </div>
                <div class="uk-width-auto">
                    <div class="uk-text-right">
                        <a href="javascript:void(0)" class="cp-fc-black remove-decoration"><span uk-icon="icon: close;"></span></a>
                    </div>
                </div>
            </div>
            <div class="con-en-disable-me uk-grid-small" uk-grid>
                <div class="uk-width-1-2 uk-width-1-3@s uk-width-1-2@l uk-width-1-3@xl uk-text-center con-select active-bgc-dark">
                    <button type="button" class="bdr-thin bdr-gray con-img-added-mascot-logo bgc-transparent uk-padding-remove">
                        <img class="uk-padding-small" src="@{{ thumbnail }}" style="min-width: 100% !important; min-height: 150px !important">
                    </button>
                    <a href="#" class="btn-open-modal-logo en-disable-me uk-link-reset">@{{ name }}</a>
                    <a href="#" class="uk-button uk-button-small uk-button-default uk-width-1-1 uk-margin-small-top uk-text-capitalize flip-mascot" data-application-code="@{{ code }}">Flip</a>
                </div>
                <div class="uk-width-1-2 uk-width-2-3@s uk-width-1-2@l uk-width-2-3@xl">
                    <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-remove-bottom abrade-black">@{{ type }}</h6>
                    @{{ #isEmbellishment }}
                        <div>
                            <a href="@{{ viewArtDetails }}" class="uk-text-small">View&nbsp;Art&nbsp;Details</a>
                        </div>
                        <div>
                            <a href="@{{ viewPrint }}" class="uk-text-small">View&nbsp;Print&nbsp;Ready&nbsp;File</a>
                        </div>
                    @{{ /isEmbellishment }}
                </div>
            </div>
            <div class="uk-grid-small grid-tiny uk-grid-match uk-text-center uk-margin-top con-select con-toggle active-bgc-dark hide-show-button-container" uk-grid>
                <div class="uk-width-1-2 ">
                    <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize view-application uk-active">View</button>
                </div>
                <div class="uk-width-1-2 ">
                    <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize hide-application">Hide</button>
                </div>
            </div>

            <div class="mascot-options-container">
                @{{#slider}}
                    @{{{ sliderContainer }}}
                @{{/slider}}

                @{{#colorPicker}}
                    @{{{ colorsSelection }}}
                @{{/colorPicker}}
            </div>
        </li>
    @{{ /applications }}
</script>
<!-- End Reiniatialize Application -->

<!-- Add New Application -->
<script type="text/mustache" id="m-add-new-application">
    <div class="add-new-application-block">
        <div class="uk-hidden">
            <h6 uk-margin class="uk-padding-small uk-padding-remove-horizontal uk-padding-remove-bottom uk-margin-small uk-margin-small-top uk-margin-remove-horizontal uk-text-bold uk-text-uppercase fc-dark abrade-black"><span class="number-circle">2</span>&nbsp;Choose Perspective</h6>
            <div class="cp-padding-medium uk-padding-remove-vertical uk-grid-small grid-tiny uk-grid-match uk-child-width-expand uk-text-center con-select active-bgc-dark perspective-container" uk-grid>
                <div>
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
        </div>
        <h6 uk-margin class="uk-margin-remove-top uk-padding-remove-horizontal uk-padding-remove-bottom uk-margin-small uk-margin-remove-horizontal uk-text-bold uk-text-uppercase fc-dark abrade-black">
            <span class="number-circle">1</span>&nbsp;Choose Location
        </h6>
        <div class="cp-padding-medium uk-padding-remove-vertical uk-grid-small grid-tiny uk-grid-match uk-child-width-1-2 uk-text-center con-select active-bgc-dark parts-container" uk-grid>
            @{{ #part }}
                @{{ #partsData }}
                    <div class="">
                        <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize part" data-id="@{{ name }}">@{{ alias }}</button>
                    </div>
                @{{ /partsData }}
                @{{ #hasSleeve }}
                    <div class="">
                        <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize part"
                        data-id="Sleeve"
                        data-perspective="left">Left Sleeve</button>
                    </div>
                    <div class="">
                        <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize part"
                        data-id="Sleeve"
                        data-perspective="right">Right Sleeve</button>
                    </div>
                @{{ /hasSleeve }}
            @{{ /part }}
        </div>

        <div >
            <h6 uk-margin class="uk-padding-small uk-padding-remove-horizontal uk-padding-remove-bottom uk-margin-small uk-margin-remove-horizontal uk-text-bold uk-text-uppercase fc-dark abrade-black">
                <span class="number-circle">2</span>&nbsp;Choose design type
            </h6>
            <div class="cp-padding-medium uk-padding-remove-vertical uk-grid-small grid-tiny uk-grid-match uk-child-width-expand uk-text-center con-select active-bgc-dark design-type-container" uk-grid>
                @{{ #designType }}
                    @{{ #designTypeData }}
                        <div class="">
                            <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice design-type-button" data-type="@{{ type }}">
                                @{{ name }}
                            </button>
                        </div>
                    @{{ /designTypeData }}
                @{{ /designType }}
            </div>
        </div>
    </div>
</script>
<!-- End Add New Application -->

<!-- Add Another Application -->
<script type="text/mustache" id="m-add-another-application">
    <h5 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-uppercase uk-text-bold fc-darker abrade-ultra-italic">Add Another @{{ title }}</h5>
    <div class="add-new-application-block">
        <div class="uk-hidden">
            <h6 uk-margin class="uk-padding-small uk-padding-remove-horizontal uk-padding-remove-bottom uk-margin-small uk-margin-small-top uk-margin-remove-horizontal uk-text-bold uk-text-uppercase fc-dark abrade-black"><span class="number-circle">2</span>&nbsp;Choose Perspective</h6>
            <div class="cp-padding-medium uk-padding-remove-vertical uk-grid-small grid-tiny uk-grid-match uk-child-width-expand uk-text-center con-select active-bgc-dark perspective-container" uk-grid>
                <div>
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
        </div>
        <h6 uk-margin class="uk-margin-remove-top uk-padding-remove-horizontal uk-padding-remove-bottom uk-margin-small uk-margin-remove-horizontal uk-text-bold uk-text-uppercase fc-dark abrade-black">
            <span class="number-circle">1</span>&nbsp;Choose Location
        </h6>
        <div class="cp-padding-medium uk-padding-remove-vertical uk-grid-small grid-tiny uk-grid-match uk-child-width-1-2 uk-text-center con-select active-bgc-dark parts-container" uk-grid>
            @{{ #part }}
                @{{ #partsData }}
                    <div class="">
                        <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize part" data-id="@{{ name }}">@{{ alias }}</button>
                    </div>
                @{{ /partsData }}
                @{{ #hasSleeve }}
                    <div class="">
                        <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize part"
                        data-id="Sleeve"
                        data-perspective="left">Left Sleeve</button>
                    </div>
                    <div class="">
                        <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize part"
                        data-id="Sleeve"
                        data-perspective="right">Right Sleeve</button>
                    </div>
                @{{ /hasSleeve }}
            @{{ /part }}
        </div>

        <div >
            <h6 uk-margin class="uk-padding-small uk-padding-remove-horizontal uk-padding-remove-bottom uk-margin-small uk-margin-remove-horizontal uk-text-bold uk-text-uppercase fc-dark abrade-black">
                <span class="number-circle">2</span>&nbsp;Choose design type
            </h6>
            <div class="cp-padding-medium uk-padding-remove-vertical uk-grid-small grid-tiny uk-grid-match uk-child-width-expand uk-text-center con-select active-bgc-dark design-type-container" uk-grid>
                @{{ #designType }}
                    @{{ #designTypeData }}
                        <div class="">
                            <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice design-type-button" data-type="@{{ type }}">
                                @{{ name }}
                            </button>
                        </div>
                    @{{ /designTypeData }}
                @{{ /designType }}
            </div>
        </div>
    </div>
</script>
<!-- End Add Another Application -->

<!-- Existing Design -->
<script type="text/mustache" id="m-mascot-items">
    @{{ #embellishments }}
        <div class="mascot-item" data-id="@{{ id }}">
            <a class="box-palette uk-link-reset btn-selection-choice uk-text-center select-mascot-item"
                data-design-id="@{{ design_id }}"
                data-id="@{{ id }}"
                data-design-name="@{{ design_name }}"
                data-svg-filename="@{{ svg_filename }}"
                data-filename="@{{ png_filename }}"
            >
                <div class="bgc-white uk-text-right">
                    <h6 class="bgc-dark fc-light uk-text-center uk-margin-remove padding-tiny-vertical uk-text-truncate">@{{ design_name }}</h6>
                    <div class="uk-inline">
                        <div class="uk-padding-small uk-padding-remove-bottom">
                            <img src="@{{ png_filename }}" class="existing-mascot-item uk-height-small">
                        </div>

                        <div class="uk-position-cover choice-icon bdr-lightGray">
                            <span uk-icon="icon: check; ratio: 1.5" class="uk-text-bold uk-position-center uk-overlay-primary"></span>
                        </div>
                    </div>
                    @{{ #archived }}
                        <button class="uk-button uk-margin-small-right btn-restore bgc-transparent uk-padding-remove bdr-none" type="button" uk-tooltip="title:Move to Active; pos: left" 
                            data-type="restore"
                            data-design-id="@{{ design_id }}"
                            data-id="@{{ id }}"
                            data-design-name="@{{ design_name }}"
                        >
                            <span uk-icon="icon: refresh"></span>
                        </button>
                    @{{ /archived }}
                    @{{ ^archived }}
                        <button class="uk-button uk-margin-small-right btn-archive bgc-transparent uk-padding-remove bdr-none" type="button" uk-tooltip="title:Move to Archive; pos: left" 
                            data-type="archive"
                            data-design-id="@{{ design_id }}"
                            data-id="@{{ id }}"
                            data-design-name="@{{ design_name }}"
                        >
                            <span class="fa fa-archive"></span>
                        </button>
                    @{{ /archived }}
                </div>
            </a >
        </div>
    @{{ /embellishments }}
    @{{ ^embellishments }}
        <div class="uk-flex uk-flex-center">
            <div class="uk-text-center uk-padding-small">
                <p>No logo available</p>
            </div>
        </div>
    @{{ /embellishments }}
</script>

<script type="text/mustache" id="m-user-design-container">
    @{{ #user }}
        <div class="uk-grid-collapse uk-flex uk-flex-middle" uk-grid>
            <div class="uk-width-1-2@s uk-width-1-3@m mascot-image-preview-container">
                
            </div>
            <div class="uk-width-1-2@s uk-width-2-3@m uk-flex-first@s">
                <nav class="uk-navbar-container uk-navbar-transparent uk-margin-top" uk-navbar>
                    <div class="nav-overlay uk-navbar-left uk-padding-small uk-padding-remove-horizontal">
                        <ul class="menu-tab-mascot uk-subnav uk-margin-remove uk-grid-small grid-tiny active-bgc-dark" uk-switcher uk-grid>
                            <li>
                                <a href="#" class="uk-button uk-button-small uk-button-default padding-tiny-vertical uk-text-capitalize menu-tab-button" data-type="active">Active <span class="count-active">(@{{ active }})</span></a>
                            </li>
                            <li>
                                <a href="#" class="uk-button uk-button-small uk-button-default padding-tiny-vertical uk-text-capitalize menu-tab-button" data-type="archive">Archive <span class="count-archive"></span></a>
                            </li>
                        </ul>
                    </div>

                    <div class="uk-navbar-right uk-padding-small uk-padding-remove-left uk-visible@m">
                        <form class="uk-search uk-search-default search-mascot-form"> 
                            <input class="uk-search-input" type="search" placeholder="Search...">
                        </form>
                        <span class="uk-margin-small-left icon-search"></span>
                    </div>
                    <div class="nav-overlay uk-navbar-right uk-padding-small uk-padding-remove-left uk-hidden@m">
                        <a class="" uk-search-icon uk-toggle="target: .nav-overlay; animation: uk-animation-fade" href="#"></a>
                    </div>

                    <div class="nav-overlay uk-navbar-left uk-flex-1 uk-padding-small" hidden>
                        <div class="uk-width-expand">
                            <form class="uk-search uk-search-navbar uk-width-1-1">
                                <input class="uk-search-input" type="search" placeholder="Search..." autofocus>
                            </form>
                        </div>
                        <a class="" uk-close uk-toggle="target: .nav-overlay; animation: uk-animation-fade" href="#"></a>
                    </div>
                </nav>
                <ul class="uk-switcher con-select">
                    <li class="uk-active mascot-list-container">
                        <div class="uk-margin-top uk-padding-small bdr-thin bdr-gray bgc-light uk-height-max-medium uk-overflow-auto">
                            <div class="uk-text-center mascot-list-loader">
                                <span uk-spinner="ratio: 4.5"></span>
                            </div>
                            <div class="m-logo-active uk-grid-small uk-grid-match uk-child-width-1-2 uk-child-width-1-4@m con-palettes mascot-container uk-hidden" uk-grid>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    @{{ /user }}
    @{{ ^user }}
        <div class="bgc-light uk-padding-small">
            <div class="uk-text-center">
                You have to log-in to use your previous art.
            </div>
        </div>
    @{{ /user }}
</script>

<script type="text/mustache" id="m-mascot-preview">
    <div class="con-preview-mascot">
        <h4 class="uk-text-bold uk-text-center uk-text-uppercase uk-margin-remove fc-darkGray abrade-ultra-italic">@{{ name }}</h4>
        <p class="uk-text-center uk-margin-remove-top">
            <a href="@{{ svg }}" class="uk-button uk-button-text uk-text-capitalize" target="_blank">Fullsize Preview</a>
        </p>
    </div>
    <div class="uk-grid-collapse uk-flex-center" uk-grid>
        <div class="uk-width-1-1 uk-width-2-3@s uk-text-center">
            <div>
                <img id="preview-existing-logo uk-height-medium" src="@{{ filename }}">
            </div>
            <a href="javascript:void(0)" 
                class="uk-button uk-button-secondary uk-margin-top add-to-uniform"
                data-design-id="@{{ design_id }}"
            >Add to uniform</a>
        </div>
    </div>
</script>
<!-- End Existing Design -->

