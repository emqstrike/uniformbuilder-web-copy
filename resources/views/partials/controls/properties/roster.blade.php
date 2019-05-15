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
                <a href="javascript:void(0)" class="player-number-button fc-dark @{{ status }}" data-status="@{{ status }}" data-number="@{{ number }}" data-size="@{{ size }}" data-category="@{{ category }}">
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
        <tr class="player-info player-number-@{{ number }}" data-category="@{{ category }}" data-size="@{{ size }}" data-number="@{{ number }}">
            <td>
                <input class="uk-input roster-form-padding roster-uniform-size" type="text" placeholder="" value="@{{ size }}" readonly="true">
            </td>
            <td>
                <input class="uk-input roster-form-padding roster-uniform-name" type="text" placeholder="Player Name" value="@{{ lastName }}">
            </td>
            <td>
                <input class="uk-input roster-form-padding roster-uniform-number" type="text" placeholder="00" value="@{{ number }}" readonly="true">
            </td>
            <td>
                <input class="uk-input roster-form-padding roster-uniform-qty" type="number" min="0" max="99" value="@{{ qty }}">
            </td>
            <td>
                <a href="javascript:void(0)" class="remove-player-info fc-darkGray" data-number="@{{ number }}" data-category="@{{ category }}">
                    <span class="fa fa-close"></span>
                </a>
            </td>
        </tr>
    @{{ /players }}
</script>


<script type="text/mustache" id="m-richardson-team-roster-summary">
    @{{ #rosters }}
        <li class="list">
            <div class="uk-grid-small uk-grid-match uk-flex-middle" uk-grid>
                <div class="uk-width-1-3">
                    <h6 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold uk-text-uppercase fc-dark">@{{ size }} (@{{ category }})</h6>
                </div>
                <div class="uk-width-2-3">
                    <div class="uk-grid-small grid-tiny uk-child-width-auto uk-flex-center" uk-grid>
                        @{{ #numbers }}
                            <div>
                                <h5 class="uk-margin-remove-top uk-margin-small-bottom uk-padding-small uk-text-bold uk-text-uppercase fc-dark comma">
                                    <a class="uk-link-heading click-player-number comma" href="javascript:void(0)" data-number="@{{ . }}" data-size="@{{ size }}" data-category="@{{ category }}">
                                        @{{ . }}
                                    </a>
                                </h5>
                            </div>
                        @{{ /numbers }}
                    </div>
                </div>
            </div>
        </li>
    @{{ /rosters }}
</script>

