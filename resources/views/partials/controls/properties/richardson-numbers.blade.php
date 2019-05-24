<script type="mustache/x-tmpl" id="richardson-numbers">
    <div class="richardson-numbers-container">
        <div class="uk-padding-small">
            <h5 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-uppercase uk-text-bold fc-darker abrade-ultra-italic">Numbers</h5>
            <div class="">
                <input class="en-disable-me uk-input bgc-light bdr-lightGray uk-form-width-xsmall" type="text" placeholder="00">
            </div>
            <div class="">
                <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">Locations</h6>
                <div class="uk-grid-small grid-tiny uk-grid-match uk-text-center con-panel-numbers" uk-grid>
                    <div class="uk-width-auto uk-width-1-4@m">
                        <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice" uk-toggle="target: .con-panel-numbers > button; cls: btn-active-bgc-red">Back</button>
                    </div>
                    <div class="uk-width-auto uk-width-1-4@m">
                        <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice" uk-toggle="target: .con-panel-numbers > button; cls: btn-active-bgc-red">Front</button>
                    </div>
                    <div class="uk-width-auto uk-width-1-4@m">
                        <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice" uk-toggle="target: .con-panel-numbers > button; cls: btn-active-bgc-red">R Sleeve</button>
                    </div>
                    <div class="uk-width-auto uk-width-1-4@m">
                        <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice" uk-toggle="target: .con-panel-numbers > button; cls: btn-active-bgc-red">L Sleeve</button>
                    </div>
                </div>

                <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-small uk-margin-remove-horizontal abrade-black">Choose font Accent</h6>
                <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-1-5 uk-child-width-1-6@s uk-child-width-1-5@m con-select m-accents active-bdr-red font-accents" uk-grid uk-switcher>
                    @{{ #fontAccents }}
                        <button class="uk-inline bgc-transparent box-palette btn-selection-choice @{{ active }}">
                            <div class=" bdr-thin bdr-gray">
                                <img src="@{{ image }}" uk-img>
                            </div>
                            <div class="uk-position-cover choice-icon bdr-lightGray">
                                <span uk-icon="icon: check; ratio: 1.5" class="uk-text-bold uk-position-center uk-overlay-primary "></span>
                            </div>
                        </button>
                    @{{ /fontAccents }}
                </div>

                <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">Choose font color</h6>
                <ul class="uk-switcher uk-margin uk-padding-remove">
                    <li>
                        <div class="uk-grid-small grid-tiny active-bgc-red " uk-switcher uk-grid>
                            <div>
                                <button class="uk-button-small uk-button-default uk-text-capitalize">Top Color</button>
                            </div>
                        </div>
                        <ul class="uk-switcher uk-margin uk-padding-remove">
                            <li>
                                <div class="con-select con-palettes">
                                    <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-auto uk-text-center m-palette-color" uk-grid>
                                        @{{ #paletteColor }}
                                            <div>
                                                <button class="uk-inline box-palette btn-selection-choice palette-color">
                                                    <div class="palette palette-c-@{{ color }}"></div>
                                                    <div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
                                                        <span class="icon icon-check uk-text-bold uk-position-center"></span>
                                                    </div>
                                                </button>
                                            </div>
                                        @{{ /paletteColor }}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div class="uk-grid-small grid-tiny active-bgc-red " uk-switcher uk-grid>
                            <div>
                                <button class="uk-button-small uk-button-default uk-text-capitalize">Top Color</button>
                            </div>
                            <div>
                                <button class="uk-button-small uk-button-default uk-text-capitalize">Shadow</button>
                            </div>
                        </div>
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
                    </li>
                    <li>
                        <div class="uk-grid-small grid-tiny active-bgc-red " uk-switcher uk-grid>
                            <div>
                                <button class="uk-button-small uk-button-default uk-text-capitalize">Top Color</button>
                            </div>
                            <div>
                                <button class="uk-button-small uk-button-default uk-text-capitalize">Outline 1</button>
                            </div>
                        </div>
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
                    </li>
                    <li>
                        <div class="uk-grid-small grid-tiny active-bgc-red " uk-switcher uk-grid>
                            <div>
                                <button class="uk-button-small uk-button-default uk-text-capitalize">Top Color</button>
                            </div>
                            <div>
                                <button class="uk-button-small uk-button-default uk-text-capitalize">Outline 1</button>
                            </div>
                            <div>
                                <button class="uk-button-small uk-button-default uk-text-capitalize">Shadow</button>
                            </div>
                        </div>
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
                            <li>
                                <div class="con-select con-palettes">
                                    <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-auto uk-text-center m-palette-color" uk-grid>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div class="uk-grid-small grid-tiny active-bgc-red " uk-switcher uk-grid>
                            <div>
                                <button class="uk-button-small uk-button-default uk-text-capitalize">Top Color</button>
                            </div>
                            <div>
                                <button class="uk-button-small uk-button-default uk-text-capitalize">Outline 1</button>
                            </div>
                            <div>
                                <button class="uk-button-small uk-button-default uk-text-capitalize">Outline 2</button>
                            </div>
                        </div>
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
                            <li>
                                <div class="con-select con-palettes">
                                    <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-auto uk-text-center m-palette-color" uk-grid>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</script>