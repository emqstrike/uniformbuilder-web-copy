<script type="text/template" id="random-feeds-list">
    <div class="cp-padding-medium richardson-random-feed-ui">
        @{{ #random_feed_set_items }}
            <div class="random-feed-item" data-random-feed-type="@{{type}}">
                <div>
                    <div class="row cp-padding-small">
                        <div class="col-md-2 cp-padding-remove">
                            <select class="form-control random-feed-option">
                                <option value="on">On</option>
                                <option value="off">Off</option>
                            </select>
                        </div>
                        <div class="col-md-10 cp-padding-remove">
                            <h4 class="header cp-text-bold cp-padding-small cp-padding-remove-vertical">@{{ type }}</h4>
                        </div>
                    </div>
                </div>
                <div class="random-feed-color-container">
                    <div class="row">
                        <div class="col-md-6 cp-padding-horizontal-tiny">
                            <button class="piping-button random-feed-color-button cp-width-1-1 cp-text-small cp-text-uppercase cp-text-bold cp-margin-remove active" data-layer="1">Color 1</button>
                        </div>
                        <div class="col-md-6 cp-padding-horizontal-tiny">
                            <button class="piping-button random-feed-color-button cp-width-1-1 cp-text-small cp-text-uppercase cp-text-bold cp-margin-remove" data-layer="2">Color 2</button>
                        </div>

                        <div class="col-md-12 cp-padding-small">
                            @{{ #colors }}
                                <div class="color_element cp-color-element-auto">
                                    <button
                                        class="grow change-color whitebtn cp-new-color-box random-feed-color-selector-button"
                                        style="background-color: #@{{ hex_code }};"
                                        data-color-name="@{{ name}}"
                                        data-color-code="@{{ color_code }}"
                                        data-color-id="@{{ id }}"
                                        data-modifier="@{{ modifier }}"
                                    >
                                    </button>
                                </div>
                            @{{ /colors }}
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 cp-margin-top-small cp-padding-tiny cp-margin-remove">
                        <p class="cp-margin-remove-top cp-border"></p>
                    </div>
                </div>
            </div>
        @{{ /random_feed_set_items }}
    </div>
</script>

{{-- div id="randomFeedsUI">
        <div class="header">
            <div class="body">
                @{{ #random_feed_set_items }}
                    <div class="random-feed-item" data-random-feed-type="@{{type}}">
                        <span class="randomFeed-type">
                            @{{type}}
                        </span>
                        <div class="toggle">
                            <div class="valueContainer">
                                <div class="toggleOption on">ON</div>
                                <div class="toggleOption off">OFF</div>
                            </div>
                        </div>

                        <div class="ui-row">
                            <div class="column1" style="border-top: none; border-bottom: solid 1px #3d3d3d">
                                <div class="colorContainer"></div>
                            </div>
                        </div>
                    </div>
                @{{ /random_feed_set_items }}
            </div>
        </div>
    </div> --}}
{{-- <div id="randomFeedsUI">
    <div class="header">
        <div class="toggle" data-status="@{{status}}">
            <div class="valueContainer">
                <div class="toggleOption on">ON</div>
                <div class="toggleOption off">OFF</div>
            </div>
        </div>
        <div class="applicationType">Random Feed <span class="header-type">(@{{type}})</span></div>
        <div class="body">
            @{{ #random_feed_set_items }}
                <div class="cover"></div>
                <div class="ui-row">
                    <label class="applicationLabels">Location</label>
                    <span class="randomFeed-type">@{{type}}</span>
                </div>

                <div class="ui-row">
                    <div class="column1"> &nbsp;
                        <div class="colorContainer"></div>
                    </div>
                </div>
            @{{ /random_feed_set_items }}
        </div>
    </div>
</div> --}}