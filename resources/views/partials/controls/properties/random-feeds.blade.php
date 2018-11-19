<script type="text/template" id="random-feeds-list">
    <div id="randomFeedsUI">
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
    </div>
</script>

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