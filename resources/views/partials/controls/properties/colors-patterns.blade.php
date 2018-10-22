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
@{{ #modifiers }}
<div class="cp-padding-small cp-padding-remove-vertical">
    <div class="row">
        <div class="col-md-12 cp-padding-remove">
            <div class="cp-text-uppercase cp-fc-white">
                <h4 class="header cp-text-bold">@{{ name }}</h4>
                <p style="font-weight: bold;">Choose Color / Pattern</p>
            </div>
        </div>

        <div class="col-md-12 cp-margin-bottom-medium cp-padding-remove">
            <p>COLOR</p>
            <div class="color-main-container-@{{ fullname }}">
                @{{ #colors }}
                    <div class="color_element sublimated color-container-button">
                        <button
                            class="grow change-color whitebtn cp-new-color-box color-selector-button"
                            style="background-color: #@{{ hex_code }};"
                            data-color-name="@{{ name }}"
                            data-color-label="@{{ color_code }}"
                            data-modifier-category="@{{ fullname }}"
                        >
                        </button>
                        <span class="label">@{{ name }}</span>
                    </div>
                @{{ /colors }}
            </div>
        </div>

        <div class="col-md-12 cp-padding-remove">
            <p>PATTERN</p>
            <div class="pattern-main-container-@{{ fullname }}">
                @{{ #patterns }}
                    <div class="color_element sublimated">
                        <div class="pattern-container-button" data-toggle="tooltip" data-placement="top" title="@{{ name }}">
                            <button
                                class="grow change-color whitebtn cp-new-color-box pattern-selector-button"
                                data-modifier-category="@{{ fullname }}"
                                style="background-image: url('@{{ icon }}');"
                                data-modifier-category="@{{ fullname }}"
                            >
                            </button>
                        </div>
                    </div>
                @{{ /patterns }}
            </div>
        </div>
        <div class="col-md-12 cp-margin-top-small cp-padding-remove">
            <div class="edit-pattern-modal-container-@{{ fullname }}">
            </div>
            <hr>
        </div>
    </div>
</div>
@{{ /modifiers }}
<div class="modal fade" id="pattern-change-color" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
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
                    <div class="col-md-4">
                        <div>
                            <img src="https://s3-us-west-2.amazonaws.com/uniformbuilder/patterns/staging/armour318d1133a476537e23dd9e24/thumbnail.png" alt="" width="100%" height="150">
                        </div>
                        <div class="cp-text-center">
                            <p class="cp-text-uppercase cp-text-medium">Armour</p>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="pattern-color-categories">
                            <ul class="nav nav-tabs" role="tablist">
                                <li role="presentation" class="active cp-float-none">
                                    <div class="col-sm-3 cp-padding-remove pattern-color-item">
                                        <a href="#pattern-color-category-1" aria-controls="pattern-category-1" role="tab" data-toggle="tab" class="cp-button-active cp-width-1-1 pattern-color-selector cp-tab-button">Color 1</a>
                                    </div>
                                </li>

                                <li role="presentation" class="cp-float-none">
                                    <div class="col-sm-3 cp-padding-remove pattern-color-item">
                                        <a href="#pattern-color-category-2" aria-controls="pattern-category-2" role="tab" data-toggle="tab" class="cp-width-1-1 pattern-color-selector cp-tab-button">Color 2</a>
                                    </div>
                                </li>

                                <li role="presentation" class="cp-float-none">
                                    <div class="col-sm-3 cp-padding-remove pattern-color-item">
                                        <a href="#pattern-color-category-3" aria-controls="pattern-category-3" role="tab" data-toggle="tab" class="cp-width-1-1 pattern-color-selector cp-tab-button">Color 3</a>
                                    </div>
                                </li>

                                <li role="presentation" class="cp-float-none">
                                    <div class="col-sm-3 cp-padding-remove pattern-color-item">
                                        <a href="#pattern-color-category-4" aria-controls="pattern-category-4" role="tab" data-toggle="tab" class="cp-width-1-1 pattern-color-selector cp-tab-button">Color 4</a>
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
                                                    data-color-name="@{{ name}}"
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