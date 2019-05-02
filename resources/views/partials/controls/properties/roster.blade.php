<script type="text/mustache" id="m-richardson-roster-sizes">
    @{{ #uniformSizes }}
        <h6 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-uppercase fc-darkGray uk-text-bold">@{{ category }} Sizes</h6>
        <div class="uk-grid-small uk-child-width-1-6@s uk-child-width-1-6@m uk-child-width-auto@l grid-tiny uk-grid-match uk-padding-small uk-padding-remove-horizontal size-category" data-catergory="@{{ category }}" uk-grid>
            @{{ #sizes }}
                <div>
                    <a href="javascript:void(0)" class="uniform-size-button fc-darkGray" data-size="@{{ . }}" data-category="@{{ category }}">
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
                <a href="javascript:void(0)" class="player-number-button fc-darkGray @{{ status }}" data-status="@{{ status }}" data-number="@{{ number }}">
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
        <tr class="player-info" data-number="@{{ number }}" data-category="@{{ category }}">
            <td class="uk-padding-remove-horizontal">
                <input class="uk-input roster-uniform-size" type="text" placeholder="" value="@{{ size }}" readonly=true>
            </td>
            <td>
                <input class="uk-input roster-uniform-name" type="text" placeholder="Player Name" value="@{{ lastName }}">
            </td>
            <td>
                <input class="uk-input roster-uniform-number" type="text" placeholder="00" value="@{{ number }}">
            </td>
            <td>
                <input class="uk-input roster-uniform-qty" type="number" min="0" max="99" value="@{{ qty }}">
            </td>
            <td>
                <a href="javascript:void(0)" class="remove-player-info fc-darkGray">
                    <span class="fa fa-close">
                    </span>
                </a>
            </td>
        </tr>
    @{{ /players }}
</script>

