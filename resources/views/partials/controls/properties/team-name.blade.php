<script type="text/mustache" id="m-team-name-container">
    <div class="uk-padding-small" id="team-name-panel">
        <h5 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-uppercase uk-text-bold fc-darker abrade-ultra-italic">Add Team Name</h5>
        <div class="uk-grid-small grid-tiny uk-grid-match uk-text-center con-select uk-flex uk-flex-middle con-toggle active-bgc-red add-team-name" uk-grid>
            <div class="uk-width-1-3">
                <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice" data-type="team_name">Team Name</button>
            </div>
            <div class="uk-width-auto">
                <span>Or</span>
            </div>
            <div class="uk-width-1-3">
                <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice" data-type="embellishments">Custom Logo</button>
            </div>
        </div>
        <hr>
    </div>
</script>

<script type="text/mustache" id="m-team-name-modifier-control">
    <div class="uk-padding-small" id="team-name-panel">
        <h5 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-uppercase uk-text-bold fc-darker abrade-ultra-italic">
            Team Name <a href="javascript:void(0)" class="fc-red uk-text-small fc-italic uk-text-lowercase remove-team-name" data-code="@{{ code }}">(remove)</a>
        </h5>
        <input class="en-disable-me uk-input bgc-light bdr-lightGray uk-form-width-medium uk-text-uppercase app-letters-input uk-disabled" type="text" placeholder="@{{ defaultText }}" value="@{{ defaultText }}">
        <div class="teamOptionContainer" data-code="@{{ code }}">
            @{{ #hasFontStyle }}
                @{{{ fontStyle }}}
            @{{ /hasFontStyle }}

            @{{ #hasTeamLayout }}
                @{{{ teamLayout }}}
            @{{ /hasTeamLayout }}

            @{{ #hasFontSize }}
                @{{{ fontSizeSlider }}}
            @{{ /hasFontSize }}

            @{{ #hasAccents }}
                @{{{ accents }}}
            @{{ /hasAccents }}

            @{{ #hasColors }}
                @{{{ colorContainer }}}
            @{{ /hasColors }}
        </div>
    </div>
</script>

<script type="text/mustache" id="m-team-name-accent">
    <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-small-bottom uk-margin-small-top abrade-black">Choose font Accent</h6>
    <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-1-6@s con-select m-accents active-bdr-red" uk-grid>
        @{{ #accents }}
            <div uk-tooltip="title: @{{ title }}; pos: left;">
                <button class="uk-inline bgc-transparent box-palette btn-selection-choice @{{ active }}" data-accent-id="@{{ id }}">
                    <div class=" bdr-thin bdr-gray">
                        <img src="@{{ thumbnail }}" uk-img>
                    </div>
                </button>
            </div>
        @{{ /accents }}
    </div>
</script>

<script type="text/mustache" id="m-team-name-font">
    <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">Team Name font</h6>
    <div class="uk-grid-collapse uk-grid-match uk-text-center" id="font-styles-container" uk-grid>
        <div class="uk-width-auto">
            <a href="javascript:void(0)" class="change-font-style uk-button uk-button-small uk-width-1-1 uk-button-default" data-direction="previous">
                <span class="fc-red"><i class="glyphicon glyphicon-arrow-left"></i></span>
            </a>
        </div>
        <div class="uk-width-expand">
            <a href="javascript:void(0)" class="select-font-style" data-application-code="@{{ code }}">
                <span class="font_name uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-bold fc-dark" style="font-family: @{{ fontStyle }}">@{{ fontCaption }}</span>
            </a>
        </div>
        <div class="uk-width-auto">
            <a href="javascript:void(0)" class="change-font-style uk-button uk-button-small uk-width-1-1 uk-button-default" data-direction="next">
                <span class="fc-red"><i class="glyphicon glyphicon-arrow-right"></i></span>
            </a>
        </div>
    </div>
</script>

<script type="text/mustache" id="m-team-name-layout">
    <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">Team Name Layout</h6>
    <div class="uk-grid-collapse uk-grid-match uk-text-center" uk-grid>
        <div class="uk-width-auto">
            <a href="javascript:void(0)" class="fontLayoutLeft uk-button uk-button-small uk-width-1-1 uk-button-default" data-direction="previous">
                <span class="fc-red"><i class="glyphicon glyphicon-arrow-left"></i></span>
            </a>
        </div>
        <div class="uk-width-expand">
            <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-bold fc-dark"><span class="abrade-black">Maxim</span> Straight</button>
        </div>
        <div class="uk-width-auto">
            <a href="javascript:void(0)" class="fontLayoutRight uk-button uk-button-small uk-width-1-1 uk-button-default" data-direction="next">
                <span class="fc-red"><i class="glyphicon glyphicon-arrow-right"></i></span>
            </a>
        </div>
    </div>
</script>

<script type="text/mustache" id="m-team-name-font-size-slider">
    <div class="uk-padding-small uk-padding-remove-vertical">
        <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom">
            Font Size
        </h6>
        <div class="manipulator-type-container scale uk-padding uk-padding-remove-top">
            <div class="sc scale">
                <div id="scale-slider" class="slider-control-scale" data-id="@{{ code }}"></div>
            </div>
        </div>
    </div>
</script>

<script type="text/mustache" id="m-custom-text">
    <div class="uk-padding-small">
        <div class="logo-details-container">
            <div class="con-en-disable-me uk-grid-small" uk-grid>
                <div class="uk-width-1-2 uk-width-1-3@s uk-width-1-2@l uk-width-1-3@xl uk-text-center con-select active-bgc-dark">
                    <button type="button" class="bdr-thin bdr-gray con-img-added-mascot-logo bgc-transparent uk-padding-remove change-stock-mascot" 
                        data-application-code="@{{ code }}"
                        data-application-logo-type="@{{ logo_type }}"
                        data-application-design-id="@{{ design_id }}"
                    >
                        <img class="uk-padding-small" src="@{{ thumbnail }}" style="min-width: 100% !important; min-height: 150px !important">
                    </button>
                    <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-remove abrade-black">@{{ name }}</h6>
                    <a href="#" class="change-stock-mascot en-disable-me fc-red" data-application-code="@{{ code }}" data-application-logo-type="@{{ logo_type }}" data-application-design-id="@{{ design_id }}">
                        @{{ #isCustom }}
                        (Edit)
                        @{{/isCustom}}

                        @{{^isCustom}}
                        (Change)
                        @{{/isCustom}}
                    </a>
                    <a href="#" class="uk-button uk-button-small uk-button-default uk-width-1-1 uk-margin-small-top uk-text-capitalize flip-mascot @{{ flip }}" data-application-code="@{{ code }}">Flip</a>
                </div>
                <div class="uk-width-1-2 uk-width-2-3@s uk-width-1-2@l uk-width-2-3@xl">
                    <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-remove-bottom abrade-black">@{{ logo_type }} Logo</h6>
                    <div>
                        <a href="@{{ viewPrint }}" class="uk-text-small">View&nbsp;Print&nbsp;Ready&nbsp;File</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</script>


