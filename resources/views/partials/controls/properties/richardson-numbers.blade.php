<script type="mustache/x-tmpl" id="richardson-numbers">
    <div class="richardson-numbers-container">
        <div class="uk-padding-small">
            <h5 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-uppercase uk-text-bold fc-darker abrade-ultra-italic">Numbers</h5>
            <div class="">
                <input class="en-disable-me uk-input bgc-light bdr-lightGray uk-form-width-xsmall" type="text" placeholder="00" id="richardson-numbers-input-number">
            </div>

            <div class="">
                <div id="richardson-numbers-locations" class="uk-margin-small">
                    @{{! to be fill of js }}
                </div>

                <div id="richardson-numbers-font-bar">
                    @{{! to be fill of js }}
                </div>

                <div id="richardson-numbers-font-accents" class="uk-margin-small">
                    @{{! to be fill of js }}
                </div>

                <div id="richardson-numbers-font-colors" class="uk-margin-small">
                    @{{! to be fill of js }}
                </div>

                <div id="richardson-numbers-loading" style="position: relative; height: 300px;">
                    <div class="uk-position-cover uk-flex uk-flex-center"" uk-spinner="ratio: 5"></div>
                </div>
            </div>
        </div>
    </div>
</script>

<script type="mustache/x-tmpl" id="richardson-numbers-locations-tmpl">
    @{{ #locationsFlag }}
        <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">Locations</h6>
        <div class="uk-grid-small grid-tiny uk-grid-match uk-text-center con-panel-numbers location-buttons uk-margin-" uk-grid>
            @{{ #locations }}
                <div class="uk-width-auto uk-width-1-5@m">
                    <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice uk-btn @{{ #enabled }}btn-enabled@{{ /enabled }} @{{ #active }}uk-active@{{ /active }}"
                        data-app-code="@{{ code }}">@{{ text }}</button>

                    <a href="javascript:void(0)" class="removeMascot en-disable-me fc-red fc-italic remove-location @{{ ^enabled }}invisible@{{ /enabled }}" data-app-code="@{{ code }}">(remove)</a>
                </div>
            @{{ /locations }}
        </div>
    @{{ /locationsFlag }}

    @{{ ^locationsFlag }}
        <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">No Location</h6>
    @{{ /locationsFlag }}
</script>

<script type="mustache/x-tmpl" id="richardson-numbers-font-bar-tmpl">
    <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">Team Number font</h6>
    <div class="uk-grid-collapse uk-grid-match uk-text-center" uk-grid>
        <div class="uk-width-auto ">
            <a href="javascript:void(0)" class="fontStyleLeft uk-button uk-button-small uk-width-1-1 uk-button-default" data-app-code="@{{ app_code }}" data-direction="@{{ previous_font }}">
                <span class="fc-red"><i class="glyphicon glyphicon-arrow-left"></i></span>
            </a>
        </div>
        <div class="uk-width-expand ">
            <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-bold fc-dark open-fonts-modal" data-app-code="@{{ app_code }}">
                <span style="font-family: @{{ font_family }} !important">@{{ font_text }}</span>
            </button>
        </div>
        <div class="uk-width-auto ">
            <a href="javascript:void(0)" class="fontStyleRight uk-button uk-button-small uk-width-1-1 uk-button-default" data-app-code="@{{ app_code }}" data-direction="@{{ next_font }}">
                <span class="fc-red"><i class="glyphicon glyphicon-arrow-right"></i></span>
            </a>
        </div>
    </div>
</script>

<script type="mustache/x-tmpl" id="richardson-numbers-font-accents-tmpl">
    @{{ #fontAccentsFlag }}
        <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-small uk-margin-remove-horizontal abrade-black">Choose font Accent</h6>
        <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-expand con-select m-accents active-bdr-red font-accents" uk-grid uk-switcher>
            @{{ #fontAccents }}
                <button class="uk-inline bgc-transparent box-palette btn-selection-choice change-font-accent @{{ active }}" data-app-code="@{{ app_code }}" data-accent-id="@{{ accent_id }}" uk-tooltip="title: @{{ title }}; pos: left;" style="margin-top: 6px;">
                    <div class=" bdr-thin bdr-gray">
                        <img src="@{{ image }}" uk-img>
                    </div>
                    <div class="uk-position-cover choice-icon bdr-lightGray">
                        <span uk-icon="icon: check; ratio: 1.5" class="uk-text-bold uk-position-center uk-overlay-primary "></span>
                    </div>
                </button>
            @{{ /fontAccents }}
        </div>
    @{{ /fontAccentsFlag }}

    @{{ ^fontAccentsFlag }}
        <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-small uk-margin-remove-horizontal abrade-black">No Font Accent</h6>
    @{{ /fontAccentsFlag }}
</script>

<script type="mustache/x-tmpl" id="richardson-numbers-font-colors-tmpl">
    @{{ #fontColorsFlag }}
        <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">Choose font color</h6>
        <div class="uk-grid-small grid-tiny active-bgc-red" uk-switcher uk-grid>
            @{{ #fontColors }}
                <div>
                    @{{ #has_multiple_colors }}
                        <button class="uk-button-small uk-button-default uk-text-capitalize">
                            @{{ layer_name }}
                        </button>
                    @{{ /has_multiple_colors }}

                    @{{ ^has_multiple_colors }}
                        <div class="uk-button-small uk-button-default uk-text-capitalize">
                            @{{ layer_name }}
                        </div>
                    @{{ /has_multiple_colors }}
                </div>
            @{{ /fontColors }}
        </div>
        <ul class="uk-switcher uk-margin uk-padding-remove font-colors">
            @{{ #fontColors }}
                <li>
                    <div class="con-select con-palettes">
                        <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-auto uk-text-center m-palette-color" uk-grid>
                            @{{ #colors }}
                                <div>
                                    <button class="uk-inline box-palette btn-selection-choice palette-color change-font-color" style="margin-bottom: 6px;"
                                        data-app-code="@{{ app_code }}"
                                        data-layer-name="@{{ layer_name }}"
                                        data-layer-number="@{{ layer_number }}"
                                        data-color-code="@{{ color_code }}">

                                        <div class="palette" style="background-color: #@{{ hex_code }};"></div>

                                        @{{ #active }}
                                            <span class="fa fa-check fa-1x cp-check-color-font-size uk-position-cover" style="color:#ffffff; padding-top: 5px;"></span>
                                        @{{ /active }}
                                    </button>
                                </div>
                            @{{ /colors }}
                        </div>
                    </div>
                </li>
            @{{ /fontColors }}
        </ul>
    @{{ /fontColorsFlag }}

    @{{ ^fontColorsFlag }}
        <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">No Font Colors</h6>
    @{{ /fontColorsFlag }}
</script>

<script type="mustache/x-tmpl" id="richardson-numbers-font-colors-active-state-tmpl">
    <span class="fa fa-check fa-1x cp-check-color-font-size uk-position-cover" style="color:#ffffff; padding-top: 5px;"></span>
</script>