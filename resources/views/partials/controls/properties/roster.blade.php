<script type="text/mustache" id="m-richardson-roster-sizes">
    @{{ #uniformSizes }}
        <h6 uk-margin class="uk-margin-small uk-text-uppercase fc-dark uk-text-bold">@{{ category }} Sizes</h6>
        <div class="uk-grid-small uk-child-width-1-6@s uk-child-width-1-6@m uk-child-width-auto@l grid-tiny uk-grid-match uk-padding-small uk-padding-remove-horizontal bdr-bottom-top size-category" data-catergory="@{{ category }}" uk-grid>
            @{{ #sizes }}
                <div>
                    <a href="javascript:void(0)" class="uniform-size-button fc-dark" data-size="@{{ . }}" data-category="@{{ category }}">
                        <div class="size-circle uk-text-center uk-text-uppercase">
                            <p class="uk-margin-remove oswald-regular">@{{ . }}</p>
                        </div>
                    </a>
                </div>
            @{{ /sizes }}
        </div>
    @{{ /uniformSizes }}
</script>

<script type="text/mustache" id="m-richardson-roster-player-number">
    <div class="uk-grid-small uk-child-width-1-6@s uk-child-width-1-6@m uk-child-width-auto@l grid-tiny uk-grid-match uk-padding-small uk-flex-center uk-padding-remove-horizontal" uk-grid>
        @{{ #numbers }}
            <div>
                <a href="javascript:void(0)" class="player-number-button fc-dark @{{ status }}" data-status="@{{ status }}" data-number="@{{ number }}">
                    <div class="numbers-circle uk-text-center uk-text-uppercase">
                        <p class="uk-margin-remove oswald-regular">@{{ number }}</p>
                    </div>
                </a>
            </div>
        @{{ /numbers }}
    </div>
</script>

<script type="text/mustache" id="m-richardson-roster-player-form">
    @{{ #players }}
        <li class="player-info uk-padding-small uk-padding-remove-bottom" data-number="@{{ number }}" data-category="@{{ category }}">
            <div class="uk-grid-small uk-flex uk-flex-middle" uk-grid>
                <div class="uk-width-1-6">
                    <input class="uk-input roster-form-padding roster-uniform-size" type="text" placeholder="" value="@{{ size }}" readonly="true">
                </div>
                <div class="uk-width-expand">
                    <input class="uk-input roster-form-padding roster-uniform-name" type="text" placeholder="Player Name" value="@{{ lastName }}">
                </div>
                <div class="uk-width-expand">
                    <input class="uk-input roster-form-padding roster-uniform-number" type="text" placeholder="00" value="@{{ number }}" readonly="true">
                </div>
                <div class="uk-width-auto">
                    <input class="uk-input roster-form-padding roster-uniform-qty" type="number" min="0" max="99" value="@{{ qty }}">
                </div>
                <div class="uk-width-auto">
                    <a href="javascript:void(0)" class="remove-player-info fc-darkGray" data-number="@{{ number }}" data-category="@{{ category }}">
                        <span class="fa fa-close"></span>
                    </a>
                </div>
            </div>
        </li>
    @{{ /players }}
</script>

