<!-- Richardson Stock Mascot -->
<script type="text/mustache" id="m-inksoft-stock-mascots-list">
    @{{ #mascots }}
        <div class="mascot-item" data-stock-mascot-id="@{{ ID }}">
            <a class="box-palette uk-link-reset btn-selection-choice uk-text-center mascot-btn" data-name="@{{ Name }}" data-stock-mascot-id="@{{ ID }}" data-image="https://images.inksoft.com@{{ ImageUrl }}">
                <div class="bgc-white uk-text-right">
                    <h6 class="uk-text-center uk-margin-remove padding-tiny-vertical">@{{ Name }}</h6>
                    <div class="uk-inline uk-inline uk-width-1-1 uk-flex uk-flex-center">
                        <div class="uk-padding-small uk-padding-remove-bottom">
                            <img class="uk-height-small" src="https://images.inksoft.com@{{ ImageUrl }}" uk-img>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    @{{ /mascots }}
</script>

<script type="text/mustache" id="m-inksoft-stock-mascot-categories-list">
    <li class="stock-mascot-category cp-padding-tiny bdr-bottom uk-margin-remove uk-active bdr-thin bdr-gray" data-category-id="1000281">
        <a href="javascript:void(0)" class="uk-link-reset category-btn" data-category-id="1000281">All</a>
    </li>
    @{{ #categories }}
        <li class="stock-mascot-category cp-padding-tiny bdr-bottom uk-margin-remove" data-category-id="@{{ ID }}">
            <a href="javascript:void(0)" class="uk-link-reset category-btn" data-category-id="@{{ ID }}">@{{ Name }}</a>
        </li>
    @{{ /categories }}
</script>


<script type="text/mustache" id="m-inksoft-stock-mascot-preview">
    <div class="uk-padding-small">
        <div class="">
            <h6 class="uk-padding-small uk-text-bold uk-text-center uk-text-uppercase uk-margin-small abrade-ultra-italic">@{{ name }}</h6>
            <img id="preview-existing-logo uk-height-small" src="@{{ image }}" uk-img style="height: 300px !important; min-height: 300px !important">
        </div>
        <div class="uk-grid-collapse uk-grid-match uk-child-width-1-2@s uk-text-center uk-margin-top uk-flex uk-flex-center" uk-grid>
            <div>
                <button class="uk-button uk-button-secondary uk-text-capitalize edit-stock-logo" data-stock-mascot-id="@{{ ID }}">Edit</button>
            </div>
        </div>
    </div>
</script>
<!-- End Richardson Stock Mascot -->