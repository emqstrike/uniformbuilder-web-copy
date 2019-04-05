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
                <h4 class="uk-text-uppercase uk-text-bold uk-margin-remove abrade-ultra-italic uk-text-truncate uniform-name">@{{ uniform_name }}</h4>
                <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-remove fc-red abrade-ultra">@{{ application_type }}</h6>
            </div>
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
                @{{ #user }}
                    <div class="uk-width-1-1">
                        <div class="uk-grid-collapse uk-child-width-expand@s" uk-grid>
                            <a href="#" class="link-reset uk-padding-small uk-padding-remove-horizontal padding-tiny-vertical bgc-darkGray fc-light uk-text-bold uk-text-capitalize abrade-ultra-italic">
                                Finish / View &nbsp;Summary
                            </a>
                            <a href="#" class="link-reset uk-padding-small uk-padding-remove-horizontal padding-tiny-vertical bgc-red fc-light uk-text-bold uk-text-capitalize abrade-ultra-italic save-uniform">
                                Save Design
                            </a>
                        </div>
                    </div>
                @{{ /user }}

                @{{ ^user }}
                    <a href="#" class="link-reset uk-padding-small uk-padding-remove-horizontal padding-tiny-vertical bgc-darkerGray fc-light uk-text-bold uk-width-1-1 uk-text-capitalize abrade-ultra-italic">Finish / View &nbsp;Summary</a>
                @{{ /user }}
            </div>

            <div class="uk-grid-small uk-text-bold fc-red abrade-ultra-italic uk-flex uk-flex-right" uk-grid>
                <div class="uk-width-auto">
                    @{{ #user }}
                        <div class="uk-inline">
                            <button class="uk-button uk-button-default cp-border-none fc-red uk-text-capitalize" type="button">Welcome, @{{ user.firstName }}</button>
                            <div class="uk-padding-small" uk-dropdown="pos: top-justify; mode: click">
                                <ul class="uk-nav uk-dropdown-nav">
                                    <li><a href="/richardson/my-saved-designs">My Saved Design</a></li>
                                    <li><a href="/richardson/orders">My Orders</a></li>
                                    <li><a href="/logout">Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    @{{ /user }}
                    @{{ ^user }}
                        <div class="uk-width-auto">
                            <a href="javascript:void(0)" class="uk-link-reset fc-red abrade-ultra-italic user-login">User Login</a>
                        </div>
                    @{{ /user }}
                </div>
            </div>
        </div>
    </div>
</script>

<script type="text/mustache" id="m-error-message">
    <div class="uk-alert-danger uk-form-width-large" uk-alert>
        <a class="uk-alert-close" uk-close></a>
        <p class="">@{{ message }}</p>
    </div>
</script>