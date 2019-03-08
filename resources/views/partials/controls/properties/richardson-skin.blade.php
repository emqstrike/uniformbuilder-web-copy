<script type="text/mustache" id="m-left-panel-toolbar">
    <div class="perspective">
        @{{ #perspectives }}
            <a href="javascript:void(0)" class="change-perspective-button cp-padding-xs" data-perspective="@{{ perspective }}">
                <div class="cp-padding-xs cp-width-xs cp-padding-remove-horizontal cp-border">
                    <div class= cp-padding-xs">
                        <img src="@{{ image }}" alt="" width="100%" height="50">
                    </div>
                </div>
            </a>
        @{{ /perspectives }}
    </div>
</script>

<script type="text/mustache" id="m-richardson-right-panel-header">
    <div class="richardson-header">
        <div class=" uk-text-right">
            <a class="uk-link-reset uk-text-uppercase" href="">Select new style</a>
        </div>
        <h5 class="uk-text-uppercase uk-text-bold uk-margin-remove">@{{ block_pattern }}</h5>
        <div class="uk-grid-small" uk-grid>
            <div class="uk-width-expand">
                <h4 class="uk-text-uppercase uk-text-bold uk-margin-remove uk-text-truncate abrade-ultra-italic">@{{ uniform_name }}</h4>
                <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-remove fc-red abrade-ultra">@{{ application_type }}</h6>
            </div>
            <a href="#" class="uk-button uk-button-small padding-tiny-vertical uk-text-bold bgc-red fc-light uk-text-uppercase bdr-thin bdr-dark btn-bt-0 uk-flex uk-flex-middle ">
                <span uk-icon="pencil"></span>
                <span class="uk-visible@s uk-margin-small-left abrade-black">Change fabric</span>
            </a>
        </div>
    </div>
</script>

<script type="text/mustache" id="m-richardson-footer">
    <div class="richardson-footer">
        <div class="uk-padding-small bgc-light">
            <div class="uk-grid-collapse uk-text-center" uk-grid>
                <a href="javascript:void(0)" class="richardson-onPrevious uk-link-reset uk-width-1-2 abrade-medium" uk-switcher-item="previous">
                    <div class="uk-grid-collapse" uk-grid>
                        <div class="uk-width-auto cp-padding-tiny padding-tiny-vertical bdr-thin bdr-dark bdr-remove-right">
                            <span class="fc-red fa fa-arrow-left"></span>
                        </div>
                        <div class="uk-width-expand cp-padding-tiny padding-tiny-vertical bdr-thin bdr-dark uk-text-uppercase bdr-remove-right">Prev<span class="hidden-xxs">ious</span></div>
                    </div>
                </a>
                <a href="javascript:void(0)" class="richardson-onNext uk-link-reset uk-width-1-2 abrade-medium"uk-switcher-item="next">
                    <div class="uk-grid-collapse" uk-grid>
                        <div class="uk-width-expand cp-padding-tiny padding-tiny-vertical bdr-thin bdr-dark uk-text-uppercase bdr-remove-right">Next</div>
                        <div class="uk-width-auto cp-padding-tiny padding-tiny-vertical bdr-thin bdr-dark">
                            <span class="fc-red fa fa-arrow-right"></span>
                        </div>
                    </div>
                </a>
                <a href="#" class="link-reset uk-padding-small uk-padding-remove-horizontal padding-tiny-vertical bgc-darkerGray fc-light uk-text-bold uk-width-1-1 uk-text-capitalize abrade-ultra-italic">Finish / View &nbsp;Summary</a>
            </div>

            <div class="uk-grid-small uk-text-bold fc-red abrade-ultra-italic" uk-grid>
                <div class="uk-width-expand con-legend uk-grid-small grid-tiny uk-flex-middle" uk-grid>
                    <div class="uk-width-auto">
                        <div class="bdr-red bdr-reg box"></div>
                    </div>
                    <div class="uk-width-expand">
                        <span class="uk-text-middle">= Incomplete Step</span>
                    </div>
                </div>
                <div class="uk-width-auto">
                    <a href="#" class="uk-link-reset fc-red abrade-ultra-italic">User Login</a>
                </div>
            </div>
        </div>
    </div>
</script>