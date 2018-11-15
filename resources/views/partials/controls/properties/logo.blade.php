<script type="text/mustache" id="m-logo">
    <div class="cp-padding-medium cp-padding-top-small" id="primary_option_logo">
        <div class="logo-header">
            <h3 class="cp-fc-white cp-margin-remove cp-text-uppercase cp-text-bold">Prolook Logo</h3>
            <p class="cp-text-uppercase cp-fc-white cp-text-medium cp-padding-small cp-padding-remove-horizontal cp-margin-remove">Choose Location</p>
        </div>
        <div class="row logo-perspective-btn-container">
            @{{ #logo_position }}
                <div class="col-md-4">
                    <button class="cp-width-1-1 cp-tab-button cp-border-none cp-text-medium logo-perspective-selector"
                            data-position="@{{ position }}"
                    >@{{ name }}</button>
                </div>
            @{{ /logo_position }}
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="cp-padding-small cp-padding-remove-horizontal cp-padding-top-xs">
                    <div class="logo-preview" id="logo-preview"></div>
                    <div class="col-md-6 col-md-offset-4 logo-image-loader" style="margin-top: 45px;">
                        <span class="fa fa-spinner fa-spin" style="font-size: 10em"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</script>