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
    <h5 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-uppercase uk-text-bold fc-darker abrade-ultra-italic">Player Name</h5><span>(remove)</span>
    <div class="lettersOptsContainer">
        <div class="con-input-object con-en-disable-me">
            <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">Select @{{ type}} Font Style</h6>
            <div class="app-letters-wrapper">
                <input class="uk-input bgc-light bdr-lightGray sampleText app-letters-input" type="text" placeholder="@{{ placeholder }}" value="@{{ defaultText }}" @{{ isPlayerName }}>
            </div>
        </div>

        @{{#fonts}}
            @{{{ fontsData }}}
        @{{/fonts}}

        @{{#slider}}
            @{{{ sliderContainer }}}
        @{{/slider}}

        @{{#accents}}
            @{{{ accentsData }}}
        @{{/accents}}

        @{{#colorPicker}}
            @{{{ colorsSelection }}}
        @{{/colorPicker}}
    </div>
</script>


