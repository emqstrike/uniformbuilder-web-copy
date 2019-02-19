<script type="text/mustache" id="m-piping-sidebar-new">
    <div class="cp-padding-small richardson-piping-ui">
        @{{ #piping_set_items }}
            <div class="piping-item" data-piping-type="@{{type}}" data-piping-modifier="@{{ modifier }}">
                <div class="cp-text-uppercase">
                    <h4 class="header cp-text-bold abrade-ultra-italic">@{{ type_wo_left_prefix }}</h4>
                    <p class="cp-text-bold">Choose Size</p>
                </div>
                <div class="sizes">
                    <div class="row">
                            <div class="col-md-3 cp-padding-horizontal-tiny">
                                <button class="piping-button piping-sizes-buttons cp-width-1-1 cp-text-small cp-margin-remove" data-size="none">None</button>
                            </div>
                        @{{#sizes}}
                            <div class="col-md-3 cp-padding-horizontal-tiny">
                                <button class="piping-button piping-sizes-buttons cp-width-1-1 cp-text-small cp-margin-remove" data-type="@{{name}}" data-size="@{{size}}">@{{size}}</button>
                            </div>
                        @{{/sizes}}
                    </div>
                </div>
                <div class="piping-color-modifier-container">
                </div>

                <div class="row">
                    <div class="col-md-12 cp-margin-top-small cp-padding-tiny cp-margin-remove">
                        <p class="cp-margin-remove-top cp-border"></p>
                    </div>
                </div>
            </div>
        @{{ /piping_set_items }}
        <div class="bootbox modal fade in" id="piping-change-color" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false" style="top: 210px !important">
            <div class="modal-dialog modal-md" role="document">
                <div class="modal-content">
                    <div class="modal-header cp-bgc-light cp-text-center">
                        <div>
                            <h4 class="modal-title cp-text-uppercase" id="myModalLabel">Piping Color</h4>
                        </div>
                    </div>
                    <div class="modal-body cp-padding-remove-horizontal">
                        <div class="row">
                            <div class="col-md-5 cp-padding-remove-right">
                                <div class="cp-margin-bottom-small piping-preview" id="piping-preview"></div>
                            </div>
                            <div class="col-md-7 cp-padding-remove-left">
                                <div>
                                    <ul class="nav nav-tabs piping-color-categories cp-border-none" role="tablist">
                                        <li role="presentation" class="active cp-float-none">
                                            <div class="col-sm-4 cp-padding-remove piping-color-item cp-border">
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
                                            <div class="col-sm-4 cp-padding-remove piping-color-item cp-border">
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
                                            <div class="col-sm-4 cp-padding-remove piping-color-item cp-border">
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

                                <div class="col-md-12 piping-container">
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
                                <div class="col-md-12 cp-padding-remove-horizontal">
                                    <div class="row cp-margin-top-xs">
                                        <div class="col-md-6">
                                            <button type="button" class="col-md-6 piping-button cp-width-1-1 cp-text-uppercase" data-dismiss="modal">Done</button>
                                        </div>

                                        <div class="col-md-6" style="padding-left: 0 !important; padding-right: 31px;">
                                            <button type="button" class="piping-button cancel-application cp-width-1-1 cp-text-uppercase">Cancel</button>
                                        </div>
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

<script type="text/mustache" id="m-piping-colors-new">
    <div class="cp-text-uppercase cp-margin-top-small">
        <p class="cp-text-bold">CHOOSE NUMBER OF COLORS</p>
    </div>
    <div class="colors">
        <div class="row">
            @{{#colors}}
                <div class="col-md-3 cp-padding-horizontal-tiny">
                    <button class="piping-colors-buttons piping-button cp-width-1-1 cp-text-small cp-margin-remove" data-type="@{{name}}" data-size="@{{size}}" data-value="@{{val}}">
                        @{{val}}
                    </button>
                </div>
            @{{/colors}}
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 cp-margin-top-xs cp-padding-small">
            <div class="cp-margin-remove">
                <button class="edit-piping-modal-button richardson-button w-35" data-piping-type="@{{type}}" data-piping-modifier="@{{ modifier }}"><i class="fa fa-edit"></i>&nbsp;Edit Color</button>
            </div>
        </div>
    </div>
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
    <div id="no-piping-message" class="no-piping-message">
        <h3>Notice</h3>
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, atque ad dolor architecto, corporis repudiandae eveniet ducimus deleniti minus ab libero quibusdam, voluptates ipsam aut fugit nostrum quas esse, perferendis!
        </div>

        <div class="cp-padding-top-small">
            <div class="cp-off-button">OFF</div>
        </div>
    </div>
</script>