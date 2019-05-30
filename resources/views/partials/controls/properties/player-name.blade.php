<script type="text/mustache" id="m-player-name-container">
    <div class="uk-padding-small" id="player-name-panel">
        <h5 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-uppercase uk-text-bold fc-darker abrade-ultra-italic">Add Player Name</h5>
        <div class="uk-grid-small grid-tiny uk-grid-match uk-text-center con-select con-toggle active-bgc-red add-player-name" uk-grid>
            <div class="uk-width-1-2">
                <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice">Player Name</button>
            </div>
        </div>
        <hr>
    </div>
</script>

<script type="text/mustache" id="m-player-name-modifier-control">
    <div class="uk-padding-small" id="player-name-panel" data-code="@{{ code }}">
        <div class="uk-grid-small" uk-grid>
            <div class="uk-width-1-2">
                <h5 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-uppercase uk-text-bold fc-darker abrade-ultra-italic">
                    Player Name <a href="javascript:void(0)" class="fc-red uk-text-small fc-italic uk-text-lowercase remove-player-name" data-code="@{{ code }}">(remove)</a>
                </h5>
            </div>
            <div class="uk-width-1-2">
                <div class="uk-flex uk-flex-right">
                    <a href="javascript:void(0)" class="uk-text-small fc-italic uk-link-text view-all-application"><span class="fa fa-eye"></span>&nbsp;View all application</a>
                </div>
            </div>
        </div>
        <input class="en-disable-me uk-input bgc-light bdr-lightGray uk-form-width-medium app-letters-input uk-disabled" type="text" placeholder="Player Name" value="@{{ defaultText }}">
        <div class="playerOptionContainer" data-code="@{{ code }}">
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

<script type="text/mustache" id="m-player-name-accent">
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

<script type="text/mustache" id="m-player-name-font">
    <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">Player name font</h6>
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

<script type="text/mustache" id="m-player-name-layout">
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

<script type="text/mustache" id="m-player-name-font-size-slider">
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


