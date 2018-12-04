<script type="text/mustache" id="m-piping-sidebar-new">
    <div id="pipingsUI">
        <div class="header">
            <div class="body">
                @{{ #piping_set_items }}
                    <div class="piping-item" data-piping-type="@{{type}}">
                        <span class="piping-type" style="font-weight: bold; font-style: italic;">
                            @{{type_wo_left_prefix}}
                        </span>
                        <div class="toggle">
                            <div class="valueContainer">
                                <div class="toggleOption on">ON</div>
                                <div class="toggleOption off">OFF</div>
                            </div>
                        </div>
                        <br>
                        <div class="content-wrapper @{{ modifier }}">
                            <span style="font-size: 0.8em;">CHOOSE SIZE</span>

                            <div class="ui-row size-row">
                                @{{#sizes}}
                                    <span class="piping-sizes-buttons" data-type="@{{name}}" data-size="@{{size}}">
                                        @{{size}}
                                    </span>
                                @{{/sizes}}
                            </div>
                            <div class="ui-row colors-row">
                                <div class="ui-row">
                                    <label class="applicationLabels colors" style="width: 100%;">CHOOSE NUMBER OF COLORS</label>
                                </div>

                                @{{#colors}}
                                    <span class="piping-colors-buttons" data-type="@{{name}}" data-size="@{{size}}" data-value="@{{val}}">
                                        @{{val}}
                                    </span>
                                @{{/colors}}
                            </div>
                            <div class="ui-row cp-margin-remove">
                                <div class="cp-padding-top-small">
                                    <button class="edit-piping-modal-button cp-margin-remove" data-modifier="@{{ modifier }}" data-piping-type="@{{ type }}">Edit Color</button>
                                </div>
                            </div>

                            <div class="row modifier-wrapper">
                                <div class="col-md-12 cp-margin-top-small cp-margin-remove">
                                    <hr>
                                </div>
                            </div>
                        </div>
                    </div>
                @{{ /piping_set_items }}
            </div>
        </div>
        <div class="bootbox modal fade in" id="piping-change-color" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog modal-md" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <div>
                            <a type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>
                        </div>
                        <div>
                            <h4 class="modal-title cp-fc-black" id="myModalLabel">Piping Color</h4>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="cp-margin-bottom-small piping-preview" id="piping-preview"></div>
                            </div>
                            <div class="col-md-12">
                                <div>
                                    <ul class="nav nav-tabs piping-color-categories" role="tablist">
                                        <li role="presentation" class="active cp-float-none">
                                            <div class="col-sm-4 cp-padding-remove piping-color-item">
                                                <a href="#piping-color-category-1"
                                                        aria-controls="piping-category-1"
                                                        role="tab" data-toggle="tab"
                                                        class="cp-button-active cp-width-1-1 piping-color-selector cp-tab-button piping-category-1"
                                                >
                                                    Color 1
                                                </a>
                                            </div>
                                        </li>

                                        <li role="presentation" class="cp-float-none">
                                            <div class="col-sm-4 cp-padding-remove piping-color-item">
                                                <a href="#piping-color-category-2"
                                                        aria-controls="piping-category-2"
                                                        role="tab" data-toggle="tab"
                                                        class="cp-width-1-1 piping-color-selector cp-tab-button piping-category-2"
                                                >
                                                    Color 2
                                                </a>
                                            </div>
                                        </li>

                                        <li role="presentation" class="cp-float-none">
                                            <div class="col-sm-4 cp-padding-remove piping-color-item">
                                                <a href="#piping-color-category-3"
                                                        aria-controls="piping-category-3"
                                                        role="tab" data-toggle="tab"
                                                        class="cp-width-1-1 piping-color-selector cp-tab-button piping-category-3"
                                                >
                                                    Color 3
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div class="col-md-12">
                                    <div id="piping-color-tab-content">
                                        <div class="tab-content">
                                            <div role="tabpanel" class="tab-pane active" id="piping-color-category-1" data-piping-category="1">
                                                <div class="piping-color-main-container-1">
                                                    <div class="row piping-color-button-container">

                                                    </div>
                                                </div>
                                            </div>
                                            <div role="tabpanel" class="tab-pane" id="piping-color-category-2" data-piping-category="2">
                                                <div class="piping-color-main-container-2">
                                                    <div class="row piping-color-button-container">

                                                    </div>
                                                </div>
                                            </div>
                                            <div role="tabpanel" class="tab-pane" id="piping-color-category-3" data-piping-category="3">
                                                <div class="piping-color-main-container-3">
                                                    <div class="row piping-color-button-container">

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
                            <button type="button" class="btn btn-default cp-button-medium cancel-application">Cancel</button>
                            <button type="button" class="btn btn-default cp-button-medium" data-dismiss="modal">Apply Piping</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</script>

<script type="text/mustache" id="m-piping-colors-new">
    <div class="ui-row">
        <label class="applicationLabels colors" style="width: 100%;">CHOOSE NUMBER OF COLORS</label>
    </div>

    @{{#items}}
        <span class="piping-colors-buttons" data-type="@{{name}}" data-value="@{{val}}">
            @{{val}}
        </span>
    @{{/items}}
</script>

<script type="text/mustache" id="m-piping-sizes-new">
    @{{#items}}
        <span class="piping-sizes-buttons" data-type="@{{name}}" data-size="@{{size}}">
            @{{size}}
        </span>
    @{{/items}}
</script>

<script type="text/mustache" id="m-tab-piping-colors">
<div class="color_element">
    <button class="grow change-color whitebtn cp-new-color-box piping-color-selector-button none-color
    style="background-color: #ffff"
    data-modifier="@{{ modifier }}"
    data-color-code="none"
    >
        <span class="fa fa-ban cp-padding-remove-vertical cp-text-medium"></span>
    </button>
    <span class="label cp-fc-black">None</span>
</div>
@{{ #colors }}
    <div class="color_element">
        <button
            class="grow change-color whitebtn cp-new-color-box piping-color-selector-button"
            style="background-color: #@{{ hex_code }};"
            data-color-name="@{{ name}}"
            data-color-code="@{{ color_code }}"
            data-color-id="@{{ id }}"
            data-modifier="@{{ modifier }}"
        >
        </button>
        <span class="label cp-fc-black">@{{ name }}</span>
    </div>
@{{ /colors }}
</script>

<script type="text/mustache" id="m-no-piping-message">
    <div id="no-piping-message" class="no-piping-message">
        <h3 class="cp-fc-white">Notice</h3>
        <div class="cp-fc-white">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, atque ad dolor architecto, corporis repudiandae eveniet ducimus deleniti minus ab libero quibusdam, voluptates ipsam aut fugit nostrum quas esse, perferendis!
        </div>

        <div class="cp-padding-top-small">
            <div class="cp-off-button">OFF</div>
        </div>
    </div>
</script>