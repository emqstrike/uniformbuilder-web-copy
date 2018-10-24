<!-- Colors Properties -->
<script type="text/mustache" id="m-colors">

    <div id="properties-colors">
        @{{ #colors }}
        <li>@{{ id }} @{{ name }}</li>
        @{{ /colors }}
    </div>

</script>
<!-- /Colors Properties -->

<!-- Color Wheel Properties -->
<script type="text/mustache" id="m-color-wheel">

    <div id="team-color-picker"></div>
    <div id="cw"></div>

</script>
<!-- /Colors Wheel Properties -->


<!-- Patterns Properties -->
<script type="text/mustache" id="m-patterns">

    <div id="properties-patterns">
        @{{ #patterns }}
        <li>@{{ id }} @{{ name }}</li>
        <img src="@{{ icon }}">
        @{{ /patterns }}
    </div>

</script>
<!-- /Patterns Properties -->

<!-- Colors&Patterns Properties -->
<script type="text/mustache" id="m-colors-patterns">
<div class="cp-padding-medium cp-padding-remove-vertical" id="primary_options_colors">
@{{ #parts }}
    <div class="row modifier-wrapper" data-modifier-name="@{{ name }}">
        <div class="col-md-12 cp-padding-medium cp-padding-remove-vertical">
            <div class="cp-text-uppercase cp-fc-white">
                <h4 class="header cp-text-bold">@{{ name }}</h4>
                <p style="font-weight: bold;">Choose Color / Pattern</p>
            </div>
        </div>
    </div>
    <div class="row modifier-wrapper" data-modifier-name="@{{ name }}">
        <div class="col-md-12 cp-margin-bottom-medium cp-padding-remove">
            <p class="cp-padding-left-medium">COLOR</p>
            <div class="color-main-container-@{{ fullname }}" data-modifier-name="@{{ name }}" >
                @{{ #colors }}
                    <div class="color_element sublimated color-container-button">
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
    <div class="row modifier-wrapper">
        <div class="col-md-12 cp-padding-remove">
            <p class="cp-padding-left-medium">PATTERN</p>
            <div class="pattern-main-container-@{{ fullname }}">
                @{{ #patterns }}
                    <div class="color_element sublimated">
                        <div class="pattern-container-button" data-toggle="tooltip" data-placement="top" title="@{{ name }}">
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
            </div>
        </div>
    </div>
    <div class="row modifier-wrapper" data-modifier-name="@{{ name }}">
        <div class="col-md-12 cp-margin-top-small cp-padding-medium cp-padding-remove-vertical cp-margin-remove">
            <div class="edit-pattern-modal-container-@{{ fullname }} pattern-modal-selector-container cp-margin-remove">
            </div>
            <hr>
        </div>
    </div>
@{{ /parts }}
</div>

<div class="bootbox modal fade in" id="pattern-change-color" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg" role="document">
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
                    <div class="col-md-4">
                        <div class="patternPreviewContainer" style="height:100% !important; width: 100% !important;">
                            <canvas id="patternPreview" class="patternPreview"></canvas>
                        </div>
                        <h3 class="cp-text-center cp-fc-black cp-margin-small modal-pattern-name"></h3>
                    </div>
                    <div class="col-md-8">
                        <div class="pattern-color-categories">
                            <ul class="nav nav-tabs" role="tablist">
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

                        <div id="pattern-color-tab-content">
                            <div class="tab-content">
                                <div role="tabpanel" class="tab-pane active" id="pattern-color-category-1" data-pattern-category="1">
                                    <div class="pattern-color-main-container-1">
                                        @{{ #colors }}
                                            <div class="col-md-2 cp-padding-remove cp-margin-top-small pattern-color-button-container">
                                                <div data-toggle="tooltip" data-placement="top" title="@{{ name }}">
                                                    <button
                                                    class="pattern-color-selector-button cp-modal-color"
                                                    style="background-color: #@{{ hex_code}};"
                                                    data-color-id="@{{ id }}"
                                                    data-color-name="@{{ name }}"
                                                    data-color-label="@{{ color_code }}"
                                                    >
                                                    </button>
                                                </div>
                                            </div>
                                        @{{ /colors }}
                                    </div>
                                </div>
                                <div role="tabpanel" class="tab-pane" id="pattern-color-category-2" data-pattern-category="2">
                                    <div class="pattern-color-main-container-2">
                                        @{{ #colors }}
                                            <div class="col-md-2 cp-padding-remove cp-margin-top-small pattern-color-button-container">
                                                <div data-toggle="tooltip" data-placement="top" title="@{{ name }}">
                                                    <button
                                                    class="pattern-color-selector-button cp-modal-color"
                                                    style="background-color: #@{{ hex_code}};"
                                                    data-color-name="@{{ name}}"
                                                    data-color-label="@{{ color_code }}"
                                                    data-color-id="@{{ id }}"
                                                    >
                                                    </button>
                                                </div>
                                            </div>
                                        @{{ /colors }}
                                    </div>
                                </div>
                                <div role="tabpanel" class="tab-pane" id="pattern-color-category-3" data-pattern-category="3">
                                    <div class="pattern-color-main-container-3">
                                        @{{ #colors }}
                                            <div class="col-md-2 cp-padding-remove cp-margin-top-small pattern-color-button-container">
                                                <div data-toggle="tooltip" data-placement="top" title="@{{ name }}">
                                                    <button
                                                    class="pattern-color-selector-button cp-modal-color"
                                                    style="background-color: #@{{ hex_code}};"
                                                    data-color-name="@{{ name}}"
                                                    data-color-label="@{{ color_code }}"
                                                    data-color-id="@{{ id }}"
                                                    >
                                                    </button>
                                                </div>
                                            </div>
                                        @{{ /colors }}
                                    </div>
                                </div>
                                <div role="tabpanel" class="tab-pane" id="pattern-color-category-4" data-pattern-category="4">
                                    <div class="pattern-color-main-container-4">
                                        @{{ #colors }}
                                            <div class="col-md-2 cp-padding-remove cp-margin-top-small pattern-color-button-container">
                                                <div data-toggle="tooltip" data-placement="top" title="@{{ name }}">
                                                    <button
                                                    class="pattern-color-selector-button cp-modal-color"
                                                    style="background-color: #@{{ hex_code}};"
                                                    data-color-name="@{{ name}}"
                                                    data-color-label="@{{ color_code }}"
                                                    data-color-id="@{{ id }}"
                                                    >
                                                    </button>
                                                </div>
                                            </div>
                                        @{{ /colors }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div>
                    <button type="button" class="btn btn-default cp-button-medium" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-default cp-button-medium">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</div>
</script>
<!-- /Colors&Patterns Properties