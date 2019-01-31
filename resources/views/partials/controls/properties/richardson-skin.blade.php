<script type="text/mustache" id="m-left-panel-toolbar">
    <div class="perspective">
        @{{ #perspectives }}
            <a href="javascript:void(0)" class="change-perspective-button" data-perspective="@{{ perspective }}">
                <div class="cp-padding-xs cp-width-xs cp-padding-remove-horizontal">
                    <div class="cp-border cp-padding-xs">
                        <img src="@{{ image }}" alt="" width="100%" height="50">
                    </div>
                </div>
            </a>
        @{{ /perspectives }}
    </div>
</script>

<script type="text/mustache" id="m-richardson-right-panel-header">
    <div class="richardson-header">
        <div class="">
            <a href="/" class="cp-text-uppercase cp-fc-black pull-right">
                <h5 class="cp-text-uppercase cp-fc-black pull-right cp-margin-remove">
                    SELECT NEW STYLE
                </h5>
            </a>
        </div>
        <br/>
        <div class="uniform-name">
            <div>
                <h6 class="cp-text-uppercase cp-text-bold cp-fc-black cp-margin-remove cp-padding-xs cp-padding-remove-horizontal">@{{ block_pattern }}</h6>
            </div>
            <div>
                <h4 class="cp-text-uppercase cp-text-bold cp-fc-darkGray cp-margin-remove cp-padding-xs cp-padding-remove-horizontal">@{{ uniform_name }}</h4>
            </div>
            <div>
                <h6 class="cp-text-uppercase cp-text-bold cp-fc-red cp-padding-xs cp-margin-remove cp-padding-remove-horizontal">@{{ application_type }}</h6>
            </div>
        </div>
    </div>
</script>