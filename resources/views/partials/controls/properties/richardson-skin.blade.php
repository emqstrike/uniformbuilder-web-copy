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
            <div class="cp-border cp-border-black">
                <div class="row">
                    <a href="javascript:void(0)" class="richardson-onPrevious cp-fc-black">
                        <div class="col-md-1 cp-padding-remove">
                            <div class="richardson-arrow-left cp-padding-tiny">
                                <span class="fa fa-arrow-left cp-fc-red cp-text-center"></span>
                            </div>
                        </div>
                        <div class="col-md-5 cp-padding-remove cp-border cp-border-black cp-remove-border-vertical">
                            <h4 class="cp-text-uppercase cp-text-center">Previous</h4>
                        </div>
                    </a>
                    <a href="javascript:void(0)" class="richardson-onNext cp-fc-black">
                        <div class="col-md-5 cp-padding-remove cp-border cp-border-black cp-remove-border-vertical">
                            <h4 class="cp-text-uppercase cp-text-center">Next</h4>
                        </div>
                        <div class="col-md-1 cp-padding-remove">
                            <div class="richardson-arrow cp-padding-tiny">
                                <span class="fa fa-arrow-right cp-fc-red cp-text-center"></span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="cp-width-1-1">
                <div class="cp-padding-xs cp-bgc-darkerGray">
                    <h4 class="cp-text-uppercase cp-text-center cp-margin-remove cp-fc-white">Finish / View Summary</h4>
                </div>
            </div>
            <div class="cp-width-1-1">
                <div class="cp-padding-xs">
                    
                </div>
            </div>
        </div>
    </div>
</script>