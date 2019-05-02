<script type="text/mustache" id="m-piping-sidebar-new">
    <ul class="uk-list uk-list-large uk-list-divider uk-padding-small uk-margin-remove richardson-piping-ui">
        @{{ #piping_set_items }}
            <li class="piping-item" data-piping-type="@{{ type }}" data-piping-modifier="@{{ modifier }}">
                <h5 uk-margin class="uk-margin-remove-vertical uk-text-uppercase uk-text-bold fc-darker abrade-ultra-italic">@{{ type_wo_left_prefix }}</h5>
                <h6 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold uk-text-uppercase fc-dark">Choose size</h6>
                <div class="sizes">
                    <div class="uk-grid-small grid-tiny uk-grid-match uk-text-center con-select con-toggle active-bgc-dark" uk-grid>
                        <div class="uk-width-auto uk-width-expand@s">
                            <a class="uk-button uk-button-small uk-width-1-1 uk-button-default btn-selection-choice piping-sizes-buttons" data-size="none">None</a>
                        </div>
                        @{{ #sizes }}
                            <div class="uk-width-auto uk-width-expand@s">
                                <a class="uk-button uk-button-small uk-width-1-1 uk-button-default btn-selection-choice piping-sizes-buttons" data-type="@{{ name }}" data-size="@{{ size }}">@{{ size }}</a>
                            </div>
                        @{{ /sizes }}
                    </div>
                </div>
                <div class="con-choose-numbers-colors piping-color-modifier-container">
                </div>
            </li>
        @{{ /piping_set_items }}
    </ul>
</script>

<script type="text/mustache" id="m-piping-colors-new">
    <h6 uk-margin class="uk-margin-small-top uk-margin-small-bottom uk-text-bold uk-text-uppercase">Choose Number of Colors</h6>
    <div class="choose-numbers-colors uk-grid-small grid-tiny uk-grid-match uk-text-center con-select active-bgc-dark colors" uk-grid>
        @{{#colors}}
            <div class="uk-width-expand piping-size-button-container">
                <a class="uk-button uk-button-small uk-button-default btn-selection-choice piping-colors-buttons" data-type="@{{name}}" data-size="@{{size}}" data-value="@{{val}}">
                    @{{val}}
                </a>
            </div>
        @{{/colors}}
    </div>
    <a class="uk-button uk-button-default uk-margin-small-top uk-text-capitalize edit-piping-modal-button uk-padding-remove-vertical" data-piping-type="@{{type}}" data-piping-modifier="@{{ modifier }}">
        <div class="uk-flex uk-flex-middle">
            <i class="fa fa-edit"></i>&nbsp; &nbsp;Edit Color
        </div>
    </a>
</script>

<script type="text/mustache" id="m-piping-sizes-new">
    @{{#items}}
        <span class="piping-sizes-buttons" data-type="@{{name}}" data-size="@{{size}}">
            @{{size}}
        </span>
    @{{/items}}
</script>

<script type="text/mustache" id="m-tab-piping-colors">
    <div class="color_element cp-color-element-auto">
        <button class="grow change-color whitebtn cp-new-color-box piping-color-selector-button none-color
        style="background-color: #ffff"
        data-modifier="@{{ modifier }}"
        data-color-code="none"
        >
            <span class="fa fa-ban cp-padding-remove-vertical cp-text-medium"></span>
        </button>
    </div>
    @{{ #colors }}
        <div class="color_element cp-color-element-auto">
            <button
                class="grow change-color whitebtn cp-new-color-box piping-color-selector-button"
                style="background-color: #@{{ hex_code }};"
                data-color-name="@{{ name}}"
                data-color-code="@{{ color_code }}"
                data-color-id="@{{ id }}"
                data-modifier="@{{ modifier }}"
            >
            </button>
        </div>
    @{{ /colors }}
</script>

<script type="text/mustache" id="m-no-piping-message">
    <div class="uk-padding-small">
        <h5 uk-margin class="uk-margin-remove-vertical uk-text-uppercase uk-text-bold fc-darker abrade-ultra-italic">Notice</h5>
            <h6 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold uk-text-uppercase fc-dark">Piping is not available for this uniform.</h6>
    </div>
</script>

<script type="text/mustache" id="m-tab-piping-colors-uikit">
    <div class="pattern-color-button-container">
        <button class="uk-inline box-palette btn-selection-choice palette-color pattern-color-selector-button piping-color-selector-button none-color palette palette-blank"
            style="background-color: #ffff"
            data-modifier="@{{ modifier }}"
            data-color-code="none"
            uk-tooltip="title: none; pos: left;"
        >
        </button>
    </div>
    @{{#colors}}
        <div class="pattern-color-button-container">
            <button class="uk-inline box-palette btn-selection-choice palette-color pattern-color-selector-button palette piping-color-selector-button"
                style="background-color: #@{{ hex_code }};"
                data-color-name="@{{ name}}"
                data-color-code="@{{ color_code }}"
                data-color-id="@{{ id }}"
                data-modifier="@{{ modifier }}"
                uk-tooltip="title: @{{ alias }}; pos: left;"
            >
            </button>
        </div>
    @{{ /colors}}
</script>