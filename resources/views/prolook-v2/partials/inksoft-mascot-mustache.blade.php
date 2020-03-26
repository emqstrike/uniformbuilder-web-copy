<!-- Categories -->
<script type="text/mustache" id="inksoft-design-categories">
    @{{ #categories }}
        @{{ #isParent }}
            <li class="uk-parent">
                <a href="#">@{{ Name }}</a>

                <ul class="uk-nav-sub">
                    @{{ #Children }}
                        <li>
                            <a href="javascript:void(0)" class="category-item uk-text-break" data-category-id="@{{ ID }}">@{{ Name }}</a>
                        </li>
                    @{{ /Children }}
                </ul>
            </li>
        @{{ /isParent }}

        @{{ ^isParent }}
            <li>
                <a href="javascript:void(0)" class="category-item" data-category-id="@{{ ID }}">@{{ Name }}</a>
            </li>
        @{{ /isParent }}
    @{{ /categories }}
</script>

<!-- List of mascots -->
<script type="text/mustache" id="inksoft-stock-mascot-items">
    @{{ #mascots }}
        <div class="mascot-item" data-stock-mascot-id="@{{ ID }}">
            <a class="uk-inline-clip pointer bgc-white mascot-btn" tabindex="0" data-type="@{{ type }}" data-name="@{{ Name }}" data-stock-mascot-id="@{{ ID }}" data-image="@{{ ImageUrl }}">
                <div class="uk-padding-small uk-button-default uk-box-shadow-hover-medium">
                    <img class="" src="@{{ ImageUrl }}" alt="img" loading="lazy">
                </div>
                
                <div class="uk-position-cover uk-overlay uk-overlay-primary uk-flex uk-flex-center uk-flex-middle uk-hidden activation-container">
                </div>
            </a>

            <div class="uk-margin-small-top uk-text-center">
                <h6 class="uk-margin-remove uk-text-small text-mini">@{{ Name }}</h6>
            </div>
        </div>
    @{{ /mascots }}
</script>

<!-- Preview Mascot -->
<script type="text/mustache" id="inksoft-stock-mascot-preview">
    <div class="uk-inline-clip pointer bgc-white mascot-btn">
        <div class="uk-padding-small">
            <img class="" src="@{{ image }}" alt="img" loading="lazy">
        </div>

        <div class="uk-margin-small-top">
            <h6 class="uk-margin-remove uk-text-small text-mini uk-text-truncate uk-text-center">@{{ name }}</h6>
        </div>
    </div>
    <hr>
    <div class="">
        <a href="javascript:void(0)" 
            class="uk-button uk-button-small uk-button-secondary uk-width-1-1 uk-text-capitalize edit-current-mascot"
            data-stock-mascot-id="@{{ id }}"
            data-type="@{{ type }}"
        >
            Edit mascots
        </a>
    </div>
</script>

<!-- List of User design -->
<script type="text/mustache" id="user-stock-mascot-items">
    @{{ #mascots }}
        <div class="mascot-item" data-stock-mascot-id="@{{ ID }}">
            <a class="uk-inline-clip pointer bgc-white mascot-btn" tabindex="0" data-type="@{{ type }}" data-name="@{{ Name }}" data-stock-mascot-id="@{{ ID }}" data-image="@{{ ImageUrl }}">
                <div class="uk-padding-small uk-button-default uk-box-shadow-hover-medium">
                    <img class="" src="@{{ ImageUrl }}" alt="img" loading="lazy">
                </div>
                
                <div class="uk-position-cover uk-overlay uk-overlay-primary uk-flex uk-flex-center uk-flex-middle uk-hidden activation-container">
                </div>
            </a>

            <div class="uk-grid-small uk-margin-small-top" uk-grid>
                <div class="uk-width-expand">
                    <div>
                        <h6 class="uk-text-small text-mini uk-margin-small uk-margin-small-right uk-text-break">@{{ Name }}</h6>
                    </div>
                </div>

                <div class="uk-width-auto uk-padding-remove">
                    @{{ #status }}
                        <button class="uk-icon-link update-design-status"
                                uk-icon="icon: refresh; ratio: .8"
                                uk-tooltip="title: Move to active; pos: bottom-right"
                                data-status="archive"
                                data-id="@{{ item_id }}"
                                data-design-id="@{{ ID }}"
                            >
                        </button>
                    @{{ /status }}

                    @{{ ^status }}
                        <button class="uk-icon-link update-design-status"
                                uk-icon="icon: trash; ratio: .8"
                                uk-tooltip="title: Move to archive; pos: bottom-right"
                                data-status="active"
                                data-id="@{{ item_id }}"
                                data-design-id="@{{ ID }}"
                            >
                        </button>
                    @{{ /status }}
                </div>
            </div>
        </div>
    @{{ /mascots }}
</script>