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
                <a href="javascript:void(0)" class="player-number-button fc-dark" data-status="@{{ status }}" data-number="@{{ number }}" data-size="@{{ size }}" data-category="@{{ category }}">
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
                <input class="uk-input roster-form-padding roster-uniform-number" type="text" placeholder="00" value="@{{ number }}" min="0" max="999" oninput="ApplicationEvent.maxLengthCheck(this)" onkeypress="return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57">
            </td>
            <td>
                <input class="uk-input roster-form-padding roster-uniform-qty" type="number" min="0" max="999" value="@{{ qty }}" oninput="ApplicationEvent.maxLengthCheck(this)" onkeypress="return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57">
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

<script type="text/mustache" id="m-richardson-application-item">
    @{{ #applications }}
        @{{ #isEmbellishment }}
            <tr class="application-sizing-item" data-code="@{{ code }}">
                <td class="uk-table-link">
                    <span class="uk-text-uppercase">@{{ type }}</span>
                </td>
                <td>
                    <div class="uk-grid-small uk-flex uk-flex-middle" uk-grid>
                        <div class="uk-width-auto">
                            <img src="@{{ thumbnail }}" width="80" height="80">
                        </div>
                        <div class="uk-width-expand">
                            <ul class="uk-list">
                                <li class="uk-margin-remove">Name:<span> @{{ name }}</span></li>
                            </ul>
                        </div>
                    </div>
                </td>
                <td class="">
                    <div class="uk-form-controls">
                        <select class="uk-select application-size">
                            <option value="best_fit">Best Fit</option>
                            @{{ #sizes }}
                                <option value="@{{ size }}">@{{ size }}"</option>
                            @{{ /sizes }}
                        </select>
                    </div>

                    <form>
                        <div class="uk-margin-small-top uk-grid-small uk-child-width-auto uk-grid uk-flex uk-flex-middle" uk-grid>
                            <label><input class="uk-radio uk-margin-remove application-size-type" name="application-size-type" value="tall" type="radio"> Tall</label>
                            <label><input class="uk-radio uk-margin-remove application-size-type" name="application-size-type" value="wide" type="radio"> Wide</label>
                        </div>
                    </form>
                </td>
                <td>
                    <a href="@{{ details }}" class="uk-text-small" target="_blank">View&nbsp;Art&nbsp;Details</a>
                </td>
                <td class="">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                </td>
            </tr>

        @{{ /isEmbellishment }}

        @{{ ^isEmbellishment }}
            <tr class="application-sizing-item" data-code="@{{ code }}">
                <td class="uk-table-link">
                    <span class="uk-text-uppercase">@{{ type }}</span>
                </td>
                <td>
                    <div class="uk-grid-small uk-flex uk-flex-middle" uk-grid>
                        <div class="uk-width-auto">
                            <img src="@{{ thumbnail }}" width="80" height="80">
                        </div>
                        <div class="uk-width-expand">
                            <ul class="uk-list">
                                <li class="uk-margin-remove">Accent:<span> @{{ accent }}</span></li>
                                <li class="uk-margin-remove">Font:<span> @{{ font }} </span></li>
                                <li class="uk-margin-remove">Text:<span> @{{ text }}</span></li>
                            </ul>
                        </div>
                    </div>
                </td>
                <td class="">
                    <div class="uk-form-controls">
                        <select class="uk-select application-size">
                            <option value="best_fit">Best Fit</option>
                            @{{ #sizes }}
                                <option value="@{{ size }}">@{{ size }}"</option>
                            @{{ /sizes }}
                        </select>
                    </div>

                    <form>
                        <div class="uk-margin-small-top uk-grid-small uk-child-width-auto uk-grid uk-flex uk-flex-middle" uk-grid>
                            <label><input class="uk-radio uk-margin-remove application-size-type" name="application-size-type" value="tall" type="radio"> Tall</label>
                            <label><input class="uk-radio uk-margin-remove application-size-type" name="application-size-type" value="wide" type="radio"> Wide</label>
                        </div>
                    </form>
                </td>
                <td class="uk-text-uppercase">
                    @{{ #colors }}
                        @{{ color_code_alias }}/
                    @{{ /colors }}
                </td>
                <td class="">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                </td>
            </tr>
        @{{ /isEmbellishment }}
    @{{ /applications }}

    @{{ ^applications }}
        <tr class="application-sizing-item uk-text-center" data-code="@{{ code }}">
            <td colspan="5"><h5>No applications</h5></td>
        </tr>
    @{{ /applications }}
</script>


<script type="text/mustache" id="m-richardson-roster-pants">
    <div class="uk-width-1-2@m uk-width-1-3@l">
        <div class="uk-width-1-1@m uk-width-1-1@l">
            <div class="uk-padding-small uk-padding-remove-vertical">
                <h5 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold uk-text-uppercase fc-dark">Select Sizes</h5>
                <div class="roster-uniform-size-container">
                    
                </div>
                <div class="uk-padding-small uk-padding-remove-horizontal">
                    <button class="uk-button uk-button-secondary uk-text-capitalize add-player">Add Player</button>
                </div>
            </div>
        </div>
    </div>

    <div class="uk-width-1-2@m uk-width-expand@l">
        <div class="uk-padding-small uk-padding-remove-vertical">
            <h5 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold uk-text-uppercase fc-dark">Edit Roster</h5>
            <table class="uk-table uk-table-small uk-table-divider roster-player-list-table uk-margin-remove-top fixed_header">
                <thead>
                    <tr>
                        <th class="fc-dark uk-padding-remove-top uk-width-1-6">Size</th>
                        <th class="fc-dark uk-padding-remove-top uk-width-expand">Last Name</th>
                        <th class="fc-dark uk-padding-remove-top uk-width-1-6">Number</th>
                        <th class="fc-dark uk-padding-remove-top uk-width-expand">Quantity</th>
                        <th class="fc-dark uk-padding-remove-top uk-table-shrink"></th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>
</script>

