<!-- Logo -->
<script type="text/mustache" id="m-mascot-panel">
    <div class="uk-padding-small">
        <h5 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-uppercase uk-text-bold fc-darker abrade-ultra-italic">Add Logo</h5>

        <div class="uk-grid-small grid-tiny uk-grid-match uk-text-center uk-flex uk-flex-middle con-select active-bgc-red logo-type-container" uk-grid>
            <div class="uk-width-1-3">
                <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice" data-type="stock">Stock Mascot</button>
            </div>
            <div class="uk-width-auto">
                <h6 uk-margin class="uk-margin-remove uk-text-bold uk-text-uppercase fc-dark">Or</h6>                
            </div>
            <div class="uk-width-1-3">
                <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice" data-type="custom">Custom Mascot</button>
            </div>
        </div>

        <h6 uk-margin class="uk-margin-small-top uk-margin-small-bottom uk-text-bold uk-text-uppercase fc-dark">Location</h6>
        <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-expand uk-text-center con-select active-bgc-red logo-location-container" uk-grid>
            @{{ #locations }}
                <div>
                    <button 
                        class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice"
                        data-part="@{{ part }}"
                        data-side="@{{ side }}"
                        data-perspective="@{{ perspective }}"                      
                    >
                        @{{ alias }}
                    </button>
                    <a href="javascript:void(0)" class="en-disable-me fc-red">(Remove)</a>
                </div>
            @{{ /locations }}
        </div>
        <hr>
        <div class="logo-details-container">

        </div>
    </div>
</script>


<script type="text/mustache" id="m-mascot-information">
    <div class="con-en-disable-me uk-grid-small" uk-grid>
        <div class="uk-width-1-2 uk-width-1-3@s uk-width-1-2@l uk-width-1-3@xl uk-text-center con-select active-bgc-dark">
            <button type="button" class="bdr-thin bdr-gray con-img-added-mascot-logo bgc-transparent uk-padding-remove open-inksoft-editor">
                <img class="uk-padding-small" src="@{{ thumbnail }}" style="min-width: 100% !important; min-height: 150px !important">
            </button>
            <a href="#" class="btn-open-modal-logo en-disable-me uk-link-reset">@{{ name }}</a>
            <a href="#" class="en-disable-me uk-link-reset fc-red" data-application-code="@{{ code }}">(Remove)</a>
            <a href="#" class="uk-button uk-button-small uk-button-default uk-width-1-1 uk-margin-small-top uk-text-capitalize flip-mascot" data-application-code="@{{ code }}">Flip</a>
        </div>
        <div class="uk-width-1-2 uk-width-2-3@s uk-width-1-2@l uk-width-2-3@xl">
            <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-remove-bottom abrade-black">@{{ logo_type }}</h6>
            <div>
                <a href="@{{ viewArtDetails }}" class="uk-text-small">View&nbsp;Art&nbsp;Details</a>
            </div>
            <div>
                <a href="@{{ viewPrint }}" class="uk-text-small">View&nbsp;Print&nbsp;Ready&nbsp;File</a>
            </div>
        </div>
    </div>
</script>
<!-- End Logo -->