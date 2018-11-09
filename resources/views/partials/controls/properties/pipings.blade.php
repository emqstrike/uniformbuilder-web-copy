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
                        <div class="content-wrapper">
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

                            <div class="ui-row">
                                <div class="column1"> &nbsp;
                                    <div class="colorContainer"></div>
                                </div>
                            </div>
                        </div>
                        <hr>
                    </div>
                @{{ /piping_set_items }}
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