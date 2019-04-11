<div id="modal-edit-palette-gradient" class="uk-flex-top bootbox modal" uk-modal="esc-close: false; bg-close: false">
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
        <h6 class="uk-padding-small bgc-light uk-text-bold uk-text-center uk-text-uppercase uk-margin-bottom">Gradient Color</h6>
        <div class="uk-grid-medium uk-flex-center" uk-grid>
            <div class="uk-width-auto uk-width-1-3@m">
                <div>
                    <div class="gradient-preview">
                        <canvas id="gradientPreview" class="gradientPreview"></canvas>
                    </div>
                </div>
                <h6 class="uk-margin-remove uk-text-bold uk-text-center uk-text-uppercase modal-pattern-name"></h6>
            </div>
            <div class="uk-width-1-1 uk-width-2-3@m uk-text-center">
                <div>
                    <ul class="uk-subnav uk-grid-collapse uk-text-center uk-padding-remove uk-child-width-expand bottom-arrow arrow-outward bac-dark active-bgc-dark active-bdr-dark layer-container-gradient" uk-switcher uk-grid>
                        <li class="uk-padding-remove"><a class="uk-width-1-1 padding-tiny-vertical uk-button-default fc-dark">1</a></li>
                        <li class="uk-padding-remove"><a class="uk-width-1-1 padding-tiny-vertical uk-button-default fc-dark">2</a></li>
                    </ul>
                    <ul class="uk-switcher uk-margin uk-padding-remove gradient-color-main-container">
                        <li class="gradient-color-main-container-1">
                            <div class="con-select con-palettes">
                                <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-auto uk-text-center m-palette-color gradient-color-picker-1-container" uk-grid>
                                </div>
                            </div>
                        </li>
                        <li class="gradient-color-main-container-2">
                            <div class="con-select con-palettes">
                                <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-auto uk-text-center m-palette-color gradient-color-picker-2-container" uk-grid>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="uk-grid-small uk-grid-match uk-text-center footer-button" uk-grid>
                    <div class="uk-width-1-2 uk-width-1-2@s">
                        <button class="uk-button uk-button-default uk-button-small uk-width-1-1 apply-gradient-color" type="button">Done</button>
                    </div>
                    <div class="uk-width-1-2 uk-width-1-2@s">
                        <button class="uk-button uk-button-default uk-button-small uk-width-1-1 uk-modal-close" type="button">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/mustache" id="m-tab-gradient-colors-uikit">
    @{{#colors}}
        <div class="gradient-color-main-container">
            <button class="uk-inline box-palette btn-selection-choice palette-color gradient-color-selector-button palette"
                style="background-color: #@{{ hex_code }};"
                data-color-id="@{{ id }}"
                data-color-name="@{{ name }}"
                data-color-code="@{{ color_code }}"
                data-color-id="@{{ id }}"
                data-layer-name="@{{ layer }}"
                data-modifier="@{{ modifier }}"
                uk-tooltip="title: @{{ name }}; pos: left;"
            >
            </button>
        </div>
    @{{ /colors}}
</script>