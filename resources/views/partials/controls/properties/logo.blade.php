<script type="text/mustache" id="m-logo">
    <div id="primary_option_logo" class="uk-padding-small uk-margin-remove">
        <h5 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-uppercase uk-text-bold fc-darker abrade-ultra-italic">Richardson Logo</h5>
        <h6 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-uppercase uk-text-bold fc-dark">Choose location</h6>
        <ul class="uk-grid-small grid-tiny uk-margin-bottom bac-dark active-bgc-dark active-bdr-dark logo-perspective-btn-container" uk-grid>
            @{{ #logo_position }}
                <li class="uk-width-expand" data-position="@{{ position }}">
                    <a href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize logo-perspective-selector">@{{ name }}</a>
                </li>
            @{{ /logo_position }}
        </ul>
        <div class="uk-grid-small uk-flex-center" uk-grid>
            <div class="uk-width-1-1 uk-width-2-3@s">
                <div class="bdr-reg bdr-gray uk-text-center">
                    <div class="logo-preview" id="logo-preview"></div>
                    <div class="logo-image-loader uk-text-center" uk-spinner="ratio: 10"></div>
                </div>
            </div>
        </div>
    </div>
</script>

<script type="text/mustache" id="m-no-logo-message">
    <div id="m-no-logo-message" class="m-no-logo-message uk-padding-small">
        <div>
            <h3 class="abrade-ultra-italic">Notice</h3>
            <div class="abrade-book">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, atque ad dolor architecto, corporis repudiandae eveniet ducimus deleniti minus ab libero quibusdam, voluptates ipsam aut fugit nostrum quas esse, perferendis!
            </div>
        </div>
    </div>
</script>