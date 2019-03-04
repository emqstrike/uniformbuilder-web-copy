<script type="text/mustache" id="m-parts">
<div id="primary_options_colors">
    <ul class="parts-container uk-list uk-list-large uk-list-divider uk-padding-small">
        @{{ #parts }}
            <li class="panel-index-@{{ index }}">
                <h5 uk-margin class="uk-margin-remove-vertical uk-text-uppercase uk-text-bold fc-darker abrade-ultra-italic">@{{ name }}</h5>
                <h6 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold uk-text-uppercase fc-dark">Choose Color @{{#hasPattern}} / Pattern @{{/hasPattern}}</h6>

                <div class="con-select con-palettes w-btn-toggle">
                    <h6 class="uk-margin-small uk-margin-remove-horizontal uk-text-uppercase">Color</h6>
                    <div class="uk-grid-small grid-tiny-1 uk-grid-match uk-child-width-auto uk-text-center m-palette-color conAutoSelect color-main-container-@{{ fullname }}" data-modifier-name="@{{ name }}" uk-grid>
                        @{{#colors}}
                            <div class="color-container-button" uk-tooltip="title: @{{ name }}; pos: left;">
                                <button class="uk-inline box-palette btn-selection-choice palette-color color-selector-button palette"
                                    style="background-color: #@{{ hex_code }};"
                                    data-color-id="@{{ id }}"
                                    data-color-name="@{{ name }}"
                                    data-color-label="@{{ color_code }}"
                                    data-color-id="@{{ id }}"
                                    data-modifier-category="@{{ fullname }}"
                                >
                                </button>
                            </div>
                        @{{ /colors}}
                    </div>
                    @{{#hasPattern}}
                    <h6 class="uk-margin-small uk-margin-remove-horizontal uk-text-uppercase">Pattern</h6>
                    <div class="uk-grid-small grid-tiny-1 uk-grid-match uk-child-width-auto uk-text-center m-palette-pattern pattern-main-container-@{{ fullname }}" uk-grid>
                        @{{ #patterns }}
                            <div class="pattern-container-button" uk-tooltip="title: @{{ name }}; pos: left;">
                                <button class="uk-inline box-palette btn-selection-choice palette-pattern palette pattern-selector-button"
                                    style="background-image: url('@{{ icon }}');"
                                    data-pattern-id="@{{ id }}"
                                    data-pattern-name="@{{ name }}"
                                    data-modifier-category="@{{ fullname }}"
                                    data-modifier-index="@{{ index }}"
                                >
                                </button>
                            </div>
                        @{{ /patterns }}
                        @{{#hasGradient}}
                            <div class="gradient-container-button" uk-tooltip="title: Gradient; pos: left;">
                                <button class="uk-inline box-palette btn-selection-choice palette-pattern palette gradient-selector-button"
                                    style="background-image: linear-gradient(red, yellow)"
                                    data-gradient-name="gradient"
                                    data-modifier-category="@{{ fullname }}"
                                    data-modifier-index="@{{ index }}"
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
<div class="bootbox modal fade in" id="pattern-change-color" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false" style="top: 50% !important; margin-top: -250px !important;">
    <div class="modal-dialog modal-md" role="document">
        <div class="modal-content cp-padding-large">
            <div class="modal-header cp-bgc-light cp-text-center">
                <div>
                    <h4 class="modal-title cp-text-uppercase cp-text-bold" id="myModalLabel">Pattern Color</h4>
                </div>
            </div>
            <div class="modal-body cp-padding-remove-horizontal">
                <div class="row">
                    <div class="col-md-3 cp-padding-remove-right">
                        <div id="patternPreviewUI" style="width: 100% !important">
                            <canvas id="patternPreview" class="patternPreview"></canvas>
                        </div>
                        <div>
                            <p class="cp-text-center cp-width-1-1 cp-text-uppercase cp-text-small cp-text-bold cp-margin-small modal-pattern-name"></p>
                        </div>
                    </div>
                    <div class="col-md-9 cp-padding-left-p35">
                        <ul class="nav nav-tabs pattern-color-categories cp-border-none" role="tablist">
                            <li role="presentation" class="active cp-float-none">
                                <div class="col-md-3 cp-padding-remove pattern-color-item cp-border">
                                    <a href="#pattern-color-category-1"
                                            aria-controls="pattern-category-1"
                                            role="tab" data-toggle="tab"
                                            class="cp-button-active cp-width-1-1 pattern-color-selector cp-tab-button pattern-category-1"
                                    >
                                        1
                                    </a>
                                </div>
                            </li>

                            <li role="presentation" class="cp-float-none">
                                <div class="col-md-3 cp-padding-remove pattern-color-item cp-border">
                                    <a href="#pattern-color-category-2"
                                            aria-controls="pattern-category-2"
                                            role="tab" data-toggle="tab"
                                            class="cp-width-1-1 pattern-color-selector cp-tab-button pattern-category-2"
                                    >
                                        2
                                    </a>
                                </div>
                            </li>

                            <li role="presentation" class="cp-float-none">
                                <div class="col-md-3 cp-padding-remove pattern-color-item cp-border">
                                    <a href="#pattern-color-category-3"
                                            aria-controls="pattern-category-3"
                                            role="tab" data-toggle="tab"
                                            class="cp-width-1-1 pattern-color-selector cp-tab-button pattern-category-3"
                                    >
                                        3
                                    </a>
                                </div>
                            </li>

                            <li role="presentation" class="cp-float-none">
                                <div class="col-md-3 cp-padding-remove pattern-color-item cp-border">
                                    <a href="#pattern-color-category-4"
                                            aria-controls="pattern-category-4"
                                            role="tab" data-toggle="tab"
                                            class="cp-width-1-1 pattern-color-selector cp-tab-button pattern-category-4"
                                    >
                                        4
                                    </a>
                                </div>
                            </li>
                        </ul>

                        <div class="col-md-12 pattern-colorpicker-container">
                            <div id="pattern-color-tab-content">
                                <div class="tab-content">
                                    <div role="tabpanel" class="tab-pane active" id="pattern-color-category-1" data-pattern-category="1">
                                        <div class="pattern-color-main-container-1">
                                            <div class="row pattern-color-button-container">

                                            </div>
                                        </div>
                                    </div>
                                    <div role="tabpanel" class="tab-pane" id="pattern-color-category-2" data-pattern-category="2">
                                        <div class="pattern-color-main-container-2">
                                            <div class="row pattern-color-button-container">

                                            </div>
                                        </div>
                                    </div>
                                    <div role="tabpanel" class="tab-pane" id="pattern-color-category-3" data-pattern-category="3">
                                        <div class="pattern-color-main-container-3">
                                            <div class="row pattern-color-button-container">

                                            </div>
                                        </div>
                                    </div>
                                    <div role="tabpanel" class="tab-pane" id="pattern-color-category-4" data-pattern-category="4">
                                        <div class="pattern-color-main-container-4">
                                            <div class="row pattern-color-button-container">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 cp-padding-remove-horizontal">
                            <div class="row cp-margin-top-xs">
                                <div class="col-md-6">
                                    <button type="button" class="col-md-6 piping-button cp-width-1-1 cp-text-uppercase apply-pattern-color">Done</button>
                                </div>

                                <div class="col-md-6 pattern-footer-button">
                                    <button type="button" class="piping-button cancel-application cp-width-1-1 cp-text-uppercase close-pattern-color-modal">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</script>

<script type="text/mustache" id="m-tab-patterns-colors">
@{{ #colors }}
    <div class="color_element cp-color-element-auto tab-patterns-colors-@{{ modifier_category }}">
        <button
            class="grow change-color whitebtn cp-new-color-box pattern-color-selector-button"
            style="background-color: #@{{ hex_code }};"
            data-color-name="@{{ name}}"
            data-color-label="@{{ color_code }}"
            data-color-id="@{{ id }}"
            data-modifier-category=@{{ modifier_category }}
        >
        </button>
    </div>
@{{ /colors }}
</script>