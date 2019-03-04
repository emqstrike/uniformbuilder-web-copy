<script type="text/mustache" id="m-parts">
<div class="cp-padding-medium uk-padding-remove-bottom" id="primary_options_colors">
    <ul style="list-style:none; padding: 0 !important" class="parts-container">
        @{{ #parts }}
            <li class="panel-index-@{{ index }}">
                <div class="row modifier-wrapper">
                    <div class="col-md-12 cp-padding-tiny cp-padding-remove-vertical">
                        <div class="cp-text-uppercase">
                            <h4 class="header cp-text-bold abrade-ultra-italic cp-margin-remove uk-text-uppercase">@{{ name }}</h4>
                            <p class="cp-text-bold abrade-book uk-margin-small uk-margin-remove-top uk-text-uppercase">Choose Color @{{#hasPattern}} / Pattern @{{/hasPattern}}</p>
                        </div>
                    </div>
                </div>
                <div class="row modifier-wrapper">
                    <div class="col-md-12 uk-margin-small cp-padding-remove">
                        <p class="cp-padding-left-small abrade-book uk-margin-small uk-text-uppercase">COLOR</p>
                        <div class="color-main-container-@{{ fullname }}" data-modifier-name="@{{ name }}">
                            @{{ #colors }}
                                <div class="color_element color-container-button cp-color-element-auto">
                                    <button
                                        class="grow change-color whitebtn cp-new-color-box color-selector-button"
                                        style="background-color: #@{{ hex_code }};"
                                        data-color-id="@{{ id }}"
                                        data-color-name="@{{ name }}"
                                        data-color-label="@{{ color_code }}"
                                        data-color-id="@{{ id }}"
                                        data-modifier-category="@{{ fullname }}"
                                    >
                                    </button>
                                </div>
                            @{{ /colors }}
                        </div>
                    </div>
                </div>

                @{{#hasPattern}}

                <div class="row modifier-wrapper">
                    <div class="col-md-12 cp-padding-remove">
                        <p class="cp-padding-left-small abrade-book uk-margin-small uk-text-uppercase">PATTERN</p>
                        <div class="pattern-main-container-@{{ fullname }}">
                            @{{ #patterns }}
                                <div class="color_element cp-color-element-auto">
                                    <div class="pattern-container-button" tippy-pattern-name" data-tippy-content="@{{ name }}">
                                        <button
                                            class="grow change-color whitebtn cp-new-color-box pattern-selector-button"
                                            style="background-image: url('@{{ icon }}');"
                                            data-pattern-id="@{{ id }}"
                                            data-pattern-name="@{{ name }}"
                                            data-modifier-category="@{{ fullname }}"
                                            data-modifier-index="@{{ index }}"
                                        >
                                        </button>
                                    </div>
                                </div>
                            @{{ /patterns }}
                            @{{#hasGradient}}
                            <div class="color_element cp-color-element-auto">
                                <div class="gradient-container-button" tippy-pattern-name" data-tippy-content="@{{ name }}">
                                    <button
                                        class="grow change-color whitebtn cp-new-color-box gradient-selector-button"
                                        style="background-image: linear-gradient(red, yellow)"
                                        data-gradient-name="gradient"
                                        data-modifier-category="@{{ fullname }}"
                                        data-modifier-index="@{{ index }}"
                                    >
                                    </button>
                                </div>
                            </div>
                            @{{/hasGradient}}
                        </div>
                    </div>
                </div>
                <div class="row modifier-wrapper" data-modifier-name="@{{ name }}">
                    <div class="col-md-12 cp-margin-top-small cp-padding-tiny cp-margin-remove">
                        <div class="edit-pattern-modal-container-@{{ fullname }} pattern-modal-selector-container cp-margin-remove">
                        </div>
                    </div>
                </div>

                @{{/hasPattern}}

                <div class="row modifier-wrapper">
                    <div class="col-md-12 cp-margin-top-small cp-padding-tiny cp-padding-remove-vertical cp-margin-remove">
                        <p class="cp-margin-remove-top cp-border"></p>
                    </div>
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