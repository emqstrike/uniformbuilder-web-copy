<script type="text/mustache" id="m-parts-no-scroll">
    <div id="primary_options_colors" class="uk-padding-small">
        <h5 uk-margin class="uk-margin-remove-vertical uk-text-uppercase uk-text-bold fc-darker abrade-ultra-italic">Jersey Colors</h5>
        <h6 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold uk-text-uppercase fc-dark">Locations</h6>

        <div class="uk-grid-small grid-tiny uk-grid-match uk-text-center con-select con-toggle active-bgc-dark uk-flex uk-flex-center" uk-grid>
            @{{ #parts }}
                <div class="uk-width-1-5@s">
                    <a class="uk-button uk-button-small uk-width-1-1 uk-button-default btn-selection-choice jersey-location-buttons uk-text-capitalize uk-text-truncate" uk-tooltip="title: @{{ alias }}; pos: left;" 
                    data-modifier-fullname="@{{ fullname }}"
                    data-modifier-name="@{{ name }}">
                        @{{ alias }}
                    </a>
                </div>
            @{{ /parts }}
        </div>

        <div class="parts-modifier-panel">

        </div>
    </div>
</script>

<script type="text/mustache" id="m-parts">
    <div id="primary_options_colors">
        <ul class="parts-container uk-list uk-list-large uk-list-divider uk-padding-small">
            @{{ #parts }}
                <li class="panel-index-@{{ index }}">
                    <h5 uk-margin class="uk-margin-remove-vertical uk-text-uppercase uk-text-bold fc-darker abrade-ultra-italic">@{{ alias }}</h5>
                    <h6 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold uk-text-uppercase fc-dark">Choose Color @{{#hasPattern}} / Pattern @{{/hasPattern}}</h6>

                    <div class="con-select con-palettes w-btn-toggle">
                        <h6 class="uk-margin-small uk-margin-remove-horizontal uk-text-uppercase">Color</h6>
                        <div class="uk-grid-small grid-tiny-1 uk-grid-match uk-child-width-auto uk-text-center m-palette-color conAutoSelect color-main-container-@{{ fullname }}" data-modifier-name="@{{ name }}" uk-grid>
                            @{{#colors}}
                                <div class="color-container-button">
                                    <button class="uk-inline box-palette btn-selection-choice palette-color color-selector-button palette"
                                        style="background-color: #@{{ hex_code }};"
                                        data-color-id="@{{ id }}"
                                        data-color-name="@{{ name }}"
                                        data-color-label="@{{ color_code }}"
                                        data-color-id="@{{ id }}"
                                        data-modifier-category="@{{ fullname }}"
                                        data-modifier-index="@{{ index }}"
                                        uk-tooltip="title: @{{ alias }}; pos: left;"
                                    >
                                    </button>
                                </div>
                            @{{ /colors}}
                        </div>
                        @{{#hasPattern}}
                        <h6 class="uk-margin-small uk-margin-remove-horizontal uk-text-uppercase">Pattern</h6>
                        <div class="uk-grid-small grid-tiny-1 uk-grid-match uk-child-width-auto uk-text-center m-palette-pattern pattern-main-container-@{{ fullname }}" uk-grid>
                            @{{ #patterns }}
                                <div class="pattern-container-button">
                                    <button class="uk-inline box-palette btn-selection-choice palette-pattern palette pattern-selector-button"
                                        style="background-image: url('@{{ icon }}');"
                                        data-pattern-id="@{{ id }}"
                                        data-pattern-name="@{{ name }}"
                                        data-modifier-category="@{{ fullname }}"
                                        data-modifier-index="@{{ index }}"
                                        uk-tooltip="title: @{{ name }}; pos: left;"
                                    >
                                    </button>
                                </div>
                            @{{ /patterns }}
                            @{{#hasGradient}}
                                <div class="gradient-container-button">
                                    <button class="uk-inline box-palette btn-selection-choice palette-pattern palette gradient-selector-button"
                                        style="background-image: linear-gradient(red, yellow)"
                                        data-gradient-name="gradient"
                                        data-modifier-category="@{{ fullname }}"
                                        data-modifier-index="@{{ index }}"
                                        uk-tooltip="title: Gradient; pos: left;"
                                    >
                                    </button>
                                </div>
                            @{{/hasGradient}}
                        </div>
                        <div class="edit-pattern-modal-container-@{{ fullname }} pattern-modal-selector-container uk-margin-small-top">
                        </div>
                        @{{/hasPattern}}
                    </div>
                </li>
            @{{ /parts }}
        </ul>
    </div>
</script>

<script type="text/mustache" id="m-tab-patterns-colors-uikit">
    @{{#colors}}
        <div class="pattern-color-button-container">
            <button class="uk-inline box-palette btn-selection-choice palette-color pattern-color-selector-button palette"
                style="background-color: #@{{ hex_code }};"
                data-color-id="@{{ id }}"
                data-color-name="@{{ name }}"
                data-color-label="@{{ color_code }}"
                data-color-id="@{{ id }}"
                data-modifier-category="@{{ modifier_category }}"
                uk-tooltip="title: @{{ alias }}; pos: left;"
            >
            </button>
        </div>
    @{{ /colors}}
</script>

<script type="text/mustache" id="m-tab-patterns-layers">
    @{{ #layers }}
        <li class="uk-padding-remove" data-layer-id="@{{ layer_no }}">
            <a class="uk-width-1-1 padding-tiny-vertical uk-button-default fc-dark">@{{ layer_no }}</a>
        </li>
    @{{ /layers }}
</script>

<script type="text/mustache" id="m-parts-modifier">
    <div class="con-select con-palettes w-btn-toggle">
        <h6 class="uk-margin-small uk-margin-remove-horizontal uk-text-uppercase">Color</h6>
        <div class="uk-grid-small grid-tiny-1 uk-grid-match uk-child-width-auto uk-text-center m-palette-color conAutoSelect color-main-container-@{{ fullname }}" data-modifier-name="@{{ name }}" uk-grid>
            @{{#colors}}
                <div class="color-container-button">
                    <button class="uk-inline box-palette btn-selection-choice palette-color color-selector-button palette"
                        style="background-color: #@{{ hex_code }};"
                        data-color-id="@{{ id }}"
                        data-color-name="@{{ name }}"
                        data-color-label="@{{ color_code }}"
                        data-color-id="@{{ id }}"
                        data-modifier-category="@{{ fullname }}"
                        data-modifier-index="@{{ index }}"
                        uk-tooltip="title: @{{ alias }}; pos: left;"
                    >
                    </button>
                </div>
            @{{ /colors}}
        </div>
        @{{#hasPattern}}
        <h6 class="uk-margin-small uk-margin-remove-horizontal uk-text-uppercase">Pattern</h6>
        <div class="uk-grid-small grid-tiny-1 uk-grid-match uk-child-width-auto uk-text-center m-palette-pattern pattern-main-container-@{{ fullname }}" uk-grid>
            @{{ #patterns }}
                <div class="pattern-container-button">
                    <button class="uk-inline box-palette btn-selection-choice palette-pattern palette pattern-selector-button"
                        style="background-image: url('@{{ icon }}');"
                        data-pattern-id="@{{ id }}"
                        data-pattern-name="@{{ name }}"
                        data-modifier-category="@{{ fullname }}"
                        data-modifier-index="@{{ index }}"
                        uk-tooltip="title: @{{ name }}; pos: left;"
                    >
                    </button>
                </div>
            @{{ /patterns }}
            @{{#hasGradient}}
                <div class="gradient-container-button">
                    <button class="uk-inline box-palette btn-selection-choice palette-pattern palette gradient-selector-button"
                        style="background-image: linear-gradient(red, yellow)"
                        data-gradient-name="gradient"
                        data-modifier-category="@{{ fullname }}"
                        data-modifier-index="@{{ index }}"
                        uk-tooltip="title: Gradient; pos: left;"
                    >
                    </button>
                </div>
            @{{/hasGradient}}
        </div>
        <div class="edit-pattern-modal-container-@{{ fullname }} pattern-modal-selector-container uk-margin-small-top">
        </div>
        @{{/hasPattern}}
    </div>
</script>