<script type="text/mustache" id="m-parts">
<div class="cp-padding-medium cp-padding-remove-vertical" id="primary_options_colors">
    <ul style="list-style:none; padding: 0 !important" class="parts-container">
        @{{ #parts }}
            <li class="panel-index-@{{ index }}">
                <div class="row modifier-wrapper">
                    <div class="col-md-12 cp-padding-medium cp-padding-remove-vertical">
                        <div class="cp-text-uppercase cp-fc-white">
                            <h4 class="header cp-text-bold">@{{ name }}</h4>
                            <p style="font-weight: bold;">Choose Color @{{#hasPattern}} / Pattern @{{/hasPattern}}</p>
                        </div>
                    </div>
                </div>
                <div class="row modifier-wrapper">
                    <div class="col-md-12 cp-margin-bottom-medium cp-padding-remove">
                        <p class="cp-padding-left-medium cp-fc-white">COLOR</p>
                        <div class="color-main-container-@{{ fullname }}" data-modifier-name="@{{ name }}">
                            @{{ #colors }}
                                <div class="color_element color-container-button">
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
                                    <span class="label">@{{ name }}</span>
                                </div>
                            @{{ /colors }}
                        </div>
                    </div>
                </div>

                @{{#hasPattern}}

                <div class="row modifier-wrapper">
                    <div class="col-md-12 cp-padding-remove">
                        <p class="cp-padding-left-medium cp-fc-white">PATTERN</p>
                        <div class="pattern-main-container-@{{ fullname }}">
                            @{{ #patterns }}
                                <div class="color_element">
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
                            <div class="color_element">
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
                    <div class="col-md-12 cp-margin-top-small cp-padding-small cp-margin-remove">
                        <div class="edit-pattern-modal-container-@{{ fullname }} pattern-modal-selector-container cp-margin-remove">
                        </div>
                    </div>
                </div>

                @{{/hasPattern}}

                <div class="row modifier-wrapper">
                    <div class="col-md-12 cp-margin-top-small cp-padding-medium cp-padding-remove-vertical cp-margin-remove">
                        <hr class="cp-margin-remove-top">
                    </div>
                </div>
            </li>
        @{{ /parts }}
    </ul>
</div>

<div class="bootbox modal fade in" id="pattern-change-color" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-md" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <div>
                    <a type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>
                </div>
                <div>
                    <h4 class="modal-title cp-fc-black" id="myModalLabel">Pattern Color</h4>
                </div>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12 cp-padding-left-xlarge">
                        <div id="patternPreviewUI">

                        </div>
                    </div>
                    <div class="col-md-12">
                        <h3 class="cp-text-center cp-fc-black cp-margin-small modal-pattern-name"></h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="cp-padding-top-medium">
                            <ul class="nav nav-tabs pattern-color-categories" role="tablist">
                                <li role="presentation" class="active cp-float-none">
                                    <div class="col-sm-3 cp-padding-remove pattern-color-item">
                                        <a href="#pattern-color-category-1"
                                                aria-controls="pattern-category-1"
                                                role="tab" data-toggle="tab"
                                                class="cp-button-active cp-width-1-1 pattern-color-selector cp-tab-button pattern-category-1"
                                        >
                                            Color 1
                                        </a>
                                    </div>
                                </li>

                                <li role="presentation" class="cp-float-none">
                                    <div class="col-sm-3 cp-padding-remove pattern-color-item">
                                        <a href="#pattern-color-category-2"
                                                aria-controls="pattern-category-2"
                                                role="tab" data-toggle="tab"
                                                class="cp-width-1-1 pattern-color-selector cp-tab-button pattern-category-2"
                                        >
                                            Color 2
                                        </a>
                                    </div>
                                </li>

                                <li role="presentation" class="cp-float-none">
                                    <div class="col-sm-3 cp-padding-remove pattern-color-item">
                                        <a href="#pattern-color-category-3"
                                                aria-controls="pattern-category-3"
                                                role="tab" data-toggle="tab"
                                                class="cp-width-1-1 pattern-color-selector cp-tab-button pattern-category-3"
                                        >
                                            Color 3
                                        </a>
                                    </div>
                                </li>

                                <li role="presentation" class="cp-float-none">
                                    <div class="col-sm-3 cp-padding-remove pattern-color-item">
                                        <a href="#pattern-color-category-4"
                                                aria-controls="pattern-category-4"
                                                role="tab" data-toggle="tab"
                                                class="cp-width-1-1 pattern-color-selector cp-tab-button pattern-category-4"
                                        >
                                            Color 4
                                        </a>
                                    </div>
                                </li>

                            </ul>
                        </div>

                        <div class="col-md-12 cp-padding-top-xs">
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
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div>
                    <button type="button" class="btn btn-default cp-button-medium close-pattern-color-modal">Close</button>
                    <button type="button" class="btn btn-default cp-button-medium apply-pattern-color">Apply Pattern</button>
                </div>
            </div>
        </div>
    </div>
</div>
</script>

<script type="text/mustache" id="m-tab-patterns-colors">
@{{ #colors }}
    {{-- <div class="col-md-2 cp-padding-remove cp-margin-top-small tab-patterns-colors-@{{ modifier_category }}">
        <div>
            <button
            class="pattern-color-selector-button cp-modal-color"
            style="background-color: #@{{ hex_code}};"
            data-color-name="@{{ name}}"
            data-color-label="@{{ color_code }}"
            data-color-id="@{{ id }}"
            >

            </button>
        </div>
        <p class="label cp-fc-black">@{{ name }}</p>
    </div> --}}
    <div class="color_element tab-patterns-colors-@{{ modifier_category }}">
        <button
            class="grow change-color whitebtn cp-new-color-box pattern-color-selector-button"
            style="background-color: #@{{ hex_code }};"
            data-color-name="@{{ name}}"
            data-color-label="@{{ color_code }}"
            data-color-id="@{{ id }}"
            data-modifier-category=@{{ modifier_category }}
        >
        </button>
        <span class="label cp-fc-black">@{{ name }}</span>
    </div>
@{{ /colors }}
</script>