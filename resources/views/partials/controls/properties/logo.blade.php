<script type="text/mustache" id="m-logo">
    <div class="cp-padding-medium cp-padding-top-small" id="primary_option_logo">
        <div class="logo-header">
            <h4 class="cp-margin-remove cp-text-uppercase cp-text-bold">@{{ brand }} Logo</h4>
            <p class="cp-text-uppercase cp-text-medium cp-padding-small cp-padding-remove-horizontal cp-margin-remove">Choose Location</p>
        </div>
        <div class="row logo-perspective-btn-container">
            @{{ #logo_position }}
                <div class="col-md-@{{ count }}">
                    <button class="change-logo-button cp-width-1-1 cp-text-small logo-perspective-selector"
                            data-position="@{{ position }}"
                    >@{{ name }}</button>
                </div>
            @{{ /logo_position }}
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="">
                    <div class="logo-preview" id="logo-preview"></div>
                    <div class="col-md-6 col-md-offset-4 logo-image-loader" style="margin-top: 45px;">
                        <span class="fa fa-spinner fa-spin" style="font-size: 10em"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</script>

<script type="text/mustache" id="m-no-logo-message">
    <div id="m-no-logo-message" class="m-no-logo-message cp-padding-medium cp-padding-remove-vertical">
        <div>
            <h3 class="abrade-ultra-italic">Notice</h3>
            <div class="abrade-book">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, atque ad dolor architecto, corporis repudiandae eveniet ducimus deleniti minus ab libero quibusdam, voluptates ipsam aut fugit nostrum quas esse, perferendis!
            </div>
        </div>
    </div>
</script>