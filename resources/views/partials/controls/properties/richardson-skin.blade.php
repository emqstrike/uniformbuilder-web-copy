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
        <div class="">
            <a href="/" class="cp-text-uppercase cp-fc-black pull-right">
                <h5 class="cp-text-uppercase cp-fc-black pull-right cp-margin-remove" style="font-family: Abrade-Book;">
                    SELECT NEW STYLE
                </h5>
            </a>
        </div>
        <br/>
        <div class="uniform-name">
            <div>
                <h4 class="cp-text-uppercase cp-text-bold cp-fc-black cp-margin-remove cp-padding-xs cp-padding-remove-horizontal oswald-regular">@{{ block_pattern }}</h4>
            </div>
            <div>
                <h2 class="cp-text-uppercase cp-text-bold cp-fc-darkGray cp-margin-remove cp-padding-xs cp-padding-remove-horizontal abrade-ultra-italic cp-text-large">@{{ uniform_name }}</h2>
            </div>
            <div>
                <h6 class="cp-text-uppercase cp-text-bold cp-fc-red cp-padding-xs cp-margin-remove cp-padding-remove-horizontal abrade-ultra cp-text-medium">@{{ application_type }}</h6>
            </div>
        </div>
    </div>
</script>

<script type="text/mustache" id="m-richardson-footer">
    <div class="richardson-footer">
        <div class="cp-padding-tiny cp-bgc-light">
            <div class="cp-width-1-1">
                <div class="cp-padding-xs">
                    <div class=" uk-grid-collapse uk-text-center" uk-grid>
                        <a href="javascript:void(0)" class="richardson-onPrevious uk-link-reset uk-width-1-2 abrade-medium" uk-switcher-item="previous">
                            <div class="uk-grid-collapse" uk-grid>
                                <div class="uk-width-auto uk-padding-small padding-tiny-vertical bdr-thin bdr-dark bdr-remove-right">
                                    <span class="fc-red fa fa-arrow-left"></span>
                                </div>
                                <div class="uk-width-expand uk-padding-small padding-tiny-vertical bdr-thin bdr-dark uk-text-uppercase bdr-remove-right">Prev<span class="hidden-xxs">ious</span></div>
                            </div>
                        </a>
                        <a href="javascript:void(0)" class="richardson-onNext uk-link-reset uk-width-1-2 abrade-medium"uk-switcher-item="next">
                            <div class="uk-grid-collapse" uk-grid>
                                <div class="uk-width-expand uk-padding-small padding-tiny-vertical bdr-thin bdr-dark uk-text-uppercase bdr-remove-right">Next</div>
                                <div class="uk-width-auto uk-padding-small padding-tiny-vertical bdr-thin bdr-dark">
                                    <span class="fc-red fa fa-arrow-right"></span>
                                </div>
                            </div>
                        </a>
                        <a href="#" class="link-reset uk-padding-small uk-padding-remove-horizontal padding-tiny-vertical bgc-darkerGray fc-light uk-text-bold uk-width-1-1 uk-text-capitalize abrade-ultra-italic">Finish / View &nbsp;Summary</a>
                    </div>
                </div>
            </div>
            <div class="cp-width-1-1 cp-padding-small">
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
    </div>
</script>