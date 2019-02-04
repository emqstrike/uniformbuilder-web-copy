<script type="text/mustache" id="m-piping-sidebar-new">
    <div class="cp-padding-small richardson-piping-ui">
        @{{ #piping_set_items }}
            <div class="piping-item" data-piping-type="@{{type}}" data-piping-modifier="@{{ modifier }}">
                <div class="cp-text-uppercase">
                    <h4 class="header cp-text-bold">@{{ type_wo_left_prefix }}</h4>
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
                    @{{ #enabled }}
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
                                    <button class="edit-piping-modal-button richardson-button w-35"><i class="fa fa-edit"></i>&nbsp;Edit Color</button>
                                </div>
                            </div>
                        </div>
                    @{{ /enabled }}
                </div>

                <div class="row">
                    <div class="col-md-12 cp-margin-top-small cp-padding-tiny cp-margin-remove">
                        <p class="cp-margin-remove-top cp-border"></p>
                    </div>
                </div>
            </div>
        @{{ /piping_set_items }}
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
                <button class="edit-piping-modal-button richardson-button w-35"><i class="fa fa-edit"></i>&nbsp;Edit Color</button>
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